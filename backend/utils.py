from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
import xgboost as xgb
from models import PredictionRequest

MODEL_PATH = Path(__file__).parent / 'model.ubj'

try:
    MODEL = xgb.Booster()
    MODEL.load_model(str(MODEL_PATH))
except Exception as exc:
    MODEL = None
    MODEL_LOAD_ERROR = exc


def _get_model() -> xgb.Booster:
    if MODEL is None:
        raise RuntimeError(
            'Failed to load XGBoost model from model.ubj. ' f'Underlying error: {MODEL_LOAD_ERROR}'
        )
    return MODEL


def predict_from_model(payload: PredictionRequest) -> tuple[int, float]:
    model = _get_model()
    
    # Create a DataFrame with feature names to match the trained model
    features_dict = {
        'Days_for_shipping_real': payload.Days_for_shipping_real,
        'Days_for_shipment_scheduled': payload.Days_for_shipment_scheduled,
        'Benefit_per_order': payload.Benefit_per_order,
        'Sales_per_customer': payload.Sales_per_customer,
        'Order_Item_Discount_Rate': payload.Order_Item_Discount_Rate,
        'Order_Item_Profit_Ratio': payload.Order_Item_Profit_Ratio,
        'Order_Item_Quantity': payload.Order_Item_Quantity,
        'Sales': payload.Sales,
    }
    
    df = pd.DataFrame([features_dict])
    dmatrix = xgb.DMatrix(df)
    
    raw_pred = model.predict(dmatrix)
    if raw_pred.ndim == 2 and raw_pred.shape[1] == 2:
        probability = float(raw_pred[0, 1])
    else:
        probability = float(raw_pred[0])
        if probability < 0 or probability > 1:
            probability = 1 / (1 + np.exp(-probability))

    prediction = 1 if probability >= 0.5 else 0
    confidence = round(max(probability, 1 - probability), 2)
    confidence = max(0.05, min(1.0, confidence))
    return prediction, confidence


def format_prediction_status(prediction: int) -> str:
    return "Late" if prediction == 1 else "On Time"
