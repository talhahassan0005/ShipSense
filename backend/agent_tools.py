"""
LangChain Agent Tools for Supply Chain Prediction
Wraps the ML model and database operations as tools for the AI agent
"""

import json
import logging
from typing import Any

from langchain.tools import tool

from models import PredictionRequest
from utils import predict_from_model, format_prediction_status

logger = logging.getLogger(__name__)


@tool
def predict_supply_late_delivery(
    days_for_shipping_real: int,
    days_for_shipment_scheduled: int,
    benefit_per_order: float,
    sales_per_customer: float,
    order_item_discount_rate: float,
    order_item_profit_ratio: float,
    order_item_quantity: int,
    sales: float,
) -> dict:
    """
    Supply chain order delivery prediction tool.
    
    Predicts whether an order will be delivered late or on-time based on shipping metrics.
    
    Args:
        days_for_shipping_real: Actual shipping days taken (integer > 0)
        days_for_shipment_scheduled: Scheduled shipping days (integer > 0)
        benefit_per_order: Benefit amount per order (float >= 0)
        sales_per_customer: Sales value per customer (float >= 0)
        order_item_discount_rate: Discount rate as decimal 0-1 (e.g., 0.1 for 10%)
        order_item_profit_ratio: Profit ratio as decimal (float >= 0)
        order_item_quantity: Quantity of items ordered (integer > 0)
        sales: Total order sales amount (float >= 0)
    
    Returns:
        dict with keys:
            - prediction: 0 = On Time, 1 = Late
            - confidence: Probability score 0-1
            - status: Human readable status ("On Time" or "Late")
            - risk_level: "Low", "Medium", or "High" based on confidence
    
    Use this when user asks about delivery delays, order status risks, or supply chain predictions.
    """
    try:
        # Create prediction request with validated data
        request = PredictionRequest(
            Days_for_shipping_real=days_for_shipping_real,
            Days_for_shipment_scheduled=days_for_shipment_scheduled,
            Benefit_per_order=benefit_per_order,
            Sales_per_customer=sales_per_customer,
            Order_Item_Discount_Rate=order_item_discount_rate,
            Order_Item_Profit_Ratio=order_item_profit_ratio,
            Order_Item_Quantity=order_item_quantity,
            Sales=sales,
        )
        
        # Get prediction from model
        prediction, confidence = predict_from_model(request)
        status = format_prediction_status(prediction)
        
        # Determine risk level based on confidence
        if prediction == 1:  # Late delivery
            if confidence > 0.8:
                risk_level = "High"
            elif confidence > 0.6:
                risk_level = "Medium"
            else:
                risk_level = "Low"
        else:  # On time
            risk_level = "Low" if confidence > 0.7 else "Medium"
        
        return {
            "prediction": int(prediction),
            "confidence": float(confidence),
            "status": status,
            "risk_level": risk_level,
            "message": f"Order is predicted to be {status} (confidence: {confidence*100:.1f}%)"
        }
    
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return {
            "error": f"Prediction failed: {str(e)}",
            "prediction": None,
            "confidence": 0.0,
            "status": "Error"
        }


@tool
def get_prediction_explanation(prediction_status: str, confidence: float) -> dict:
    """
    Provides explanation and recommendations based on prediction results.
    
    Args:
        prediction_status: "On Time" or "Late"
        confidence: Confidence score between 0 and 1
    
    Returns:
        dict with explanation and recommended actions
    
    Use this when user needs to understand what a prediction means.
    """
    confidence_pct = confidence * 100
    
    if prediction_status == "Late":
        if confidence > 0.8:
            recommendation = " HIGH PRIORITY: Take immediate action - increase inventory, notify customers, consider expedited shipping"
            insight = "Model is very confident this order will be delayed"
        elif confidence > 0.6:
            recommendation = " MEDIUM PRIORITY: Monitor this order closely, prepare contingency plans"
            insight = "Model predicts moderate likelihood of delay"
        else:
            recommendation = " LOW PRIORITY: Include in tracking but no urgent action needed yet"
            insight = "Model predicts possible delay but with low confidence"
    else:  # On Time
        if confidence > 0.8:
            recommendation = " Confident: Order should arrive on time"
            insight = "Model is very confident delivery will be on schedule"
        else:
            recommendation = " Monitor: Order might be delayed despite prediction"
            insight = "Model predicts on-time delivery but with moderate confidence"
    
    return {
        "status": prediction_status,
        "confidence_percentage": f"{confidence_pct:.1f}%",
        "insight": insight,
        "recommendation": recommendation,
        "next_steps": [
            "Review order details",
            "Check carrier status",
            "Communicate with customer if needed"
        ]
    }


# List of all tools for agent
AGENT_TOOLS = [
    predict_supply_late_delivery,
    get_prediction_explanation,
]