import axios, { AxiosError } from 'axios';
import type { PredictionInput, PredictionResponse, PredictionEntry } from './types';

const client = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000,
});

export async function predictLateDelivery(input: PredictionInput): Promise<PredictionResponse> {
  try {
    // Log the payload being sent for debugging
    console.log('Sending prediction request:', input);
    
    const response = await client.post<PredictionResponse>('/predict', input);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ detail?: unknown }>;
      const detail = axiosError.response?.data?.detail;
      
      // Log detailed error information
      console.error('Prediction error response:', detail);
      
      // Format error message
      if (Array.isArray(detail)) {
        const messages = detail.map((err: unknown) => {
          if (typeof err === 'object' && err !== null && 'msg' in err) {
            return (err as { msg: string }).msg;
          }
          return String(err);
        });
        throw new Error(`Validation error: ${messages.join(', ')}`);
      }
      
      throw new Error(
        axiosError.response?.status === 400
          ? `Validation error: ${String(detail)}`
          : `Prediction failed: ${axiosError.message}`
      );
    }
    throw error;
  }
}

export async function getRecentPredictions(): Promise<PredictionEntry[]> {
  try {
    const response = await client.get<PredictionEntry[]>('/predictions');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch predictions:', error);
    throw error;
  }
}
