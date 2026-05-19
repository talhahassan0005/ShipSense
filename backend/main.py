import os
import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import insert, select
from pydantic import BaseModel, ValidationError, Field
from models import PredictionRequest, PredictionResponse, PredictionRecord
from utils import predict_from_model, format_prediction_status
from database import engine, init_db, predictions_table
from fastapi.exceptions import RequestValidationError
from agent_tools import AGENT_TOOLS
from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Supply Chain Late Delivery Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.error(f"Validation error: {exc.errors()}")
    return JSONResponse(
        status_code=400,
        content={"detail": exc.errors()},
    )


@app.on_event("startup")
async def on_startup():
    await init_db()


@app.get("/health")
async def health():
    return {"status": "ok", "detail": "Supply Chain prediction API is healthy"}


@app.post("/predict", response_model=PredictionResponse)
async def predict(request: Request, payload: PredictionRequest):
    try:
        # Log request details for debugging
        try:
            body = await request.body()
            logger.info(f"Raw request body: {body}")
        except Exception as e:
            logger.error(f"Could not read request body: {e}")
        
        prediction, confidence = predict_from_model(payload)
        status_text = format_prediction_status(prediction)

        async with engine.begin() as conn:
            await conn.execute(
                insert(predictions_table).values(
                    prediction=prediction,
                    confidence=confidence,
                    status=status_text,
                    Days_for_shipping_real=payload.Days_for_shipping_real,
                    Days_for_shipment_scheduled=payload.Days_for_shipment_scheduled,
                    Benefit_per_order=payload.Benefit_per_order,
                    Sales_per_customer=payload.Sales_per_customer,
                    Order_Item_Discount_Rate=payload.Order_Item_Discount_Rate,
                    Order_Item_Profit_Ratio=payload.Order_Item_Profit_Ratio,
                    Order_Item_Quantity=payload.Order_Item_Quantity,
                    Sales=payload.Sales,
                )
            )

        return PredictionResponse(
            prediction=prediction,
            confidence=confidence,
            status=status_text,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Unable to generate prediction at this time") from exc


@app.get("/predictions", response_model=list[PredictionRecord])
async def recent_predictions(limit: int = 20):
    try:
        async with engine.connect() as conn:
            result = await conn.execute(
                select(predictions_table)
                .order_by(predictions_table.c.created_at.desc())
                .limit(limit)
            )
            rows = result.fetchall()

        records = [
            PredictionRecord(
                id=row.id,
                timestamp=row.created_at,
                prediction=row.prediction,
                confidence=row.confidence,
                status=row.status,
                input=PredictionRequest(
                    Days_for_shipping_real=row.Days_for_shipping_real,
                    Days_for_shipment_scheduled=row.Days_for_shipment_scheduled,
                    Benefit_per_order=row.Benefit_per_order,
                    Sales_per_customer=row.Sales_per_customer,
                    Order_Item_Discount_Rate=row.Order_Item_Discount_Rate,
                    Order_Item_Profit_Ratio=row.Order_Item_Profit_Ratio,
                    Order_Item_Quantity=row.Order_Item_Quantity,
                    Sales=row.Sales,
                ),
            )
            for row in rows
        ]
        return records
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Unable to load prediction history") from exc


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = [{"loc": err["loc"], "msg": err["msg"], "type": err["type"]} for err in exc.errors()]
    return JSONResponse(
        status_code=422,
        content={"detail": "Invalid request payload", "errors": errors},
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})


# ============================================
# AGENT CHAT ENDPOINTS
# ============================================

class AgentChatRequest(BaseModel):
    """Request model for agent chat endpoint"""
    message: str = Field(..., description="User message/question for the agent")
    user_id: str = Field(default="anonymous", description="Optional user identifier")
    conversation_id: str = Field(default="default", description="Optional conversation identifier for context")


class AgentChatResponse(BaseModel):
    """Response model for agent chat endpoint"""
    response: str = Field(..., description="Agent's response message")
    reasoning: str = Field(default="", description="Internal reasoning/tool calls made")
    success: bool = Field(default=True, description="Whether the request was successful")


# Initialize LangChain agent with Groq
try:
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY"),
        temperature=0.7
    )
    agent = create_react_agent(llm, AGENT_TOOLS)
    AGENT_INITIALIZED = True
    logger.info("Agent initialized successfully with Groq Llama 3.3 70B")
except Exception as e:
    logger.error(f"Failed to initialize agent: {str(e)}")
    AGENT_INITIALIZED = False
    agent = None


@app.post("/api/agent/chat", response_model=AgentChatResponse)
async def agent_chat(request: AgentChatRequest) -> AgentChatResponse:
    """
    Chat with the supply chain AI agent.
    
    The agent can:
    - Predict delivery delays using the ML model
    - Explain predictions and provide recommendations
    - Answer questions about supply chain management
    
    Example queries:
    - "Will order with 5 days shipping and $1000 sales be delayed?"
    - "What does a Late prediction with 85% confidence mean?"
    - "Analyze this order's delivery risk"
    """
    
    if not AGENT_INITIALIZED:
        return AgentChatResponse(
            response="Agent service is temporarily unavailable. Please try again later.",
            success=False
        )
    
    try:
        logger.info(f"[{request.user_id}] Agent chat: {request.message}")
        
        # Invoke agent with user message
        result = agent.invoke({
            "messages": [
                {
                    "role": "user",
                    "content": request.message
                }
            ]
        })
        
        # Extract response from agent output
        if "messages" in result and len(result["messages"]) > 0:
            last_message = result["messages"][-1]
            # LangChain message objects have a .content attribute
            response_text = getattr(last_message, "content", "No response generated")
        else:
            response_text = "No response generated"
        
        # Log successful interaction
        logger.info(f"[{request.user_id}] Agent response: {response_text[:100]}...")
        
        return AgentChatResponse(
            response=response_text,
            reasoning="Agent used ReAct framework with tools",
            success=True
        )
        
    except ValidationError as e:
        logger.error(f"Validation error in agent chat: {str(e)}")
        return AgentChatResponse(
            response=f"Invalid input: {str(e)}",
            success=False
        )
    except Exception as e:
        logger.error(f"Agent error: {str(e)}", exc_info=True)
        return AgentChatResponse(
            response=f"Error processing request: {str(e)}",
            success=False
        )
