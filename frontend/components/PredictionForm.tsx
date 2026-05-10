'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import type { PredictionInput } from '../lib/types';

const predictionSchema = z.object({
  Days_for_shipping_real: z.number().positive().int({ message: 'Enter a valid integer' }),
  Days_for_shipment_scheduled: z.number().positive().int({ message: 'Enter a valid integer' }),
  Benefit_per_order: z.number().nonnegative({ message: 'Value cannot be negative' }),
  Sales_per_customer: z.number().nonnegative({ message: 'Value cannot be negative' }),
  Order_Item_Discount_Rate: z.number().min(0).max(1, { message: 'Enter a value between 0 and 1' }),
  Order_Item_Profit_Ratio: z.number().nonnegative({ message: 'Cannot be negative' }),
  Order_Item_Quantity: z.number().positive().int({ message: 'Enter a valid integer' }),
  Sales: z.number().nonnegative({ message: 'Value cannot be negative' }),
});

export type PredictionFormValues = z.infer<typeof predictionSchema>;

type Props = {
  onSubmit: (values: PredictionInput) => void;
  disabled?: boolean;
};

const fields = [
  { name: 'Days_for_shipping_real', label: 'Actual Shipping Days', step: 1, placeholder: '7' },
  { name: 'Days_for_shipment_scheduled', label: 'Scheduled Shipping Days', step: 1, placeholder: '5' },
  { name: 'Benefit_per_order', label: 'Benefit per Order', step: 0.01, placeholder: '45.25' },
  { name: 'Sales_per_customer', label: 'Sales per Customer', step: 0.01, placeholder: '300.50' },
  { name: 'Order_Item_Discount_Rate', label: 'Discount Rate', step: 0.01, placeholder: '0.1' },
  { name: 'Order_Item_Profit_Ratio', label: 'Profit Ratio', step: 0.01, placeholder: '0.2' },
  { name: 'Order_Item_Quantity', label: 'Order Quantity', step: 1, placeholder: '12' },
  { name: 'Sales', label: 'Order Sales', step: 0.01, placeholder: '1420.00' },
] as const;

export default function PredictionForm({ onSubmit, disabled }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionSchema),
    defaultValues: {
      Days_for_shipping_real: 7,
      Days_for_shipment_scheduled: 5,
      Benefit_per_order: 45.5,
      Sales_per_customer: 300.0,
      Order_Item_Discount_Rate: 0.1,
      Order_Item_Profit_Ratio: 0.2,
      Order_Item_Quantity: 10,
      Sales: 1250.0,
    },
  });

  const handleFormSubmit = (data: PredictionFormValues) => {
    // Log the form data for debugging
    console.log('Form data before submit:', data);
    console.log('Data types:', {
      Days_for_shipping_real: typeof data.Days_for_shipping_real,
      Benefit_per_order: typeof data.Benefit_per_order,
      Order_Item_Quantity: typeof data.Order_Item_Quantity,
    });
    
    onSubmit(data);
    reset(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="rounded-3xl border border-slate-700/70 bg-slate-900/90 p-6 shadow-soft"
    >
      <div className="mb-6 flex flex-col gap-1">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Prediction form</p>
        <h2 className="text-2xl font-semibold text-white">Estimate late deliveries</h2>
        <p className="text-slate-400">Complete the order fields and submit to review a prediction in real time.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">{field.label}</span>
            <input
              type="number"
              step={field.step}
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 shadow-inner outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              {...register(field.name, { valueAsNumber: true })}
            />
            {errors[field.name] ? (
              <span className="mt-2 block text-sm text-rose-300">{errors[field.name]?.message}</span>
            ) : null}
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {disabled ? 'Predicting…' : 'Run prediction'}
      </button>
    </form>
  );
}
