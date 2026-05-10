'use client';

import type { PredictionResponse } from '../lib/types';

type Props = {
  result: PredictionResponse | null;
  loading: boolean;
  error: string | null;
};

const statusStyles = {
  OnTime: 'bg-emerald-500/15 text-emerald-300',
  Late: 'bg-rose-500/15 text-rose-300',
};

export default function ResultCard({ result, loading, error }: Props) {
  return (
    <div className="rounded-3xl border border-slate-700/70 bg-slate-900/90 p-6 shadow-soft">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Prediction result</h2>
          <p className="text-slate-400">Review the final outcome and confidence metrics.</p>
        </div>
        {loading ? (
          <span className="rounded-full bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-300">Loading</span>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-100">{error}</div>
      ) : result ? (
        <div className="space-y-5">
          <div className="flex flex-col gap-3 rounded-3xl bg-slate-950/80 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Predicted status</p>
                <p className="mt-2 text-3xl font-semibold text-white">{result.status}</p>
              </div>
              <span className={`rounded-full px-4 py-2 text-sm font-semibold ${result.status === 'Late' ? statusStyles.Late : statusStyles.OnTime}`}>
                {result.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-slate-400">Model confidence</p>
              <div className="mt-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-3 rounded-full bg-cyan-400 transition-all" style={{ width: `${Math.round(result.confidence * 100)}%` }} />
              </div>
              <p className="mt-2 text-sm text-slate-300">{Math.round(result.confidence * 100)}% confidence in prediction</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Confidence score</p>
              <p className="mt-3 text-2xl font-semibold text-white">{result.confidence.toFixed(2)}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Probability bucket</p>
              <p className="mt-3 text-2xl font-semibold text-white">{result.prediction === 1 ? 'High risk' : 'Low risk'}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-4">
              <p className="text-sm text-slate-400">Delivery outlook</p>
              <p className="mt-3 text-2xl font-semibold text-white">{result.prediction === 1 ? 'Prepare for delay' : 'On schedule'}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-700/50 p-8 text-center text-slate-400">
          Submit a new order prediction to see the results here.
        </div>
      )}
    </div>
  );
}
