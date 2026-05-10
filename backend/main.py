import os
import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import insert, select
from models import PredictionRequest, PredictionResponse, PredictionRecord
from utils import predict_from_model, format_prediction_status
from database import engine, init_db, predictions_table
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Supply Chain Late Delivery Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
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
