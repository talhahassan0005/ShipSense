export type PredictionInput = {
  Days_for_shipping_real: number;
  Days_for_shipment_scheduled: number;
  Benefit_per_order: number;
  Sales_per_customer: number;
  Order_Item_Discount_Rate: number;
  Order_Item_Profit_Ratio: number;
  Order_Item_Quantity: number;
  Sales: number;
};

export type PredictionResponse = {
  prediction: number;
  confidence: number;
  status: string;
};

export type PredictionEntry = PredictionResponse & {
  id: string;
  timestamp: string;
  input: PredictionInput;
};
