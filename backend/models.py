from datetime import datetime
from pydantic import BaseModel, Field, PositiveInt, confloat


class PredictionRequest(BaseModel):
    Days_for_shipping_real: PositiveInt = Field(..., description="Actual shipping days")
    Days_for_shipment_scheduled: PositiveInt = Field(..., description="Scheduled shipping days")
    Benefit_per_order: confloat(ge=0) = Field(..., description="Benefit per order")
    Sales_per_customer: confloat(ge=0) = Field(..., description="Sales per customer")
    Order_Item_Discount_Rate: confloat(ge=0, le=1) = Field(..., description="Discount rate as decimal")
    Order_Item_Profit_Ratio: confloat(ge=0) = Field(..., description="Profit ratio as decimal")
    Order_Item_Quantity: PositiveInt = Field(..., description="Quantity of items in order")
    Sales: confloat(ge=0) = Field(..., description="Total order sales")


class PredictionResponse(BaseModel):
    prediction: int = Field(..., description="0 = On Time, 1 = Late")
    confidence: float = Field(..., ge=0, le=1, description="Model confidence score")
    status: str = Field(..., description="Human readable prediction status")


class PredictionRecord(BaseModel):
    id: int = Field(..., description="Database record id")
    timestamp: datetime = Field(..., description="Timestamp of the saved prediction")
    prediction: int = Field(..., description="0 = On Time, 1 = Late")
    confidence: float = Field(..., ge=0, le=1, description="Model confidence score")
    status: str = Field(..., description="Human readable prediction status")
    input: PredictionRequest = Field(..., description="Original prediction input")
