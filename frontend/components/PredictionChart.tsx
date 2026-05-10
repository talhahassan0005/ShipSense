'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import type { PredictionEntry } from '../lib/types';

type Props = {
  history: PredictionEntry[];
};

export default function PredictionChart({ history }: Props) {
  const chartData = history
    .slice()
    .reverse()
    .map((entry, index) => ({
      name: `${index + 1}`,
      status: entry.prediction === 1 ? 1 : 0,
      confidence: Math.round(entry.confidence * 100),
      timestamp: new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));

  return (
    <div className="h-72 rounded-3xl bg-slate-950/80 p-4">
      {chartData.length === 0 ? (
        <div className="flex h-full items-center justify-center text-slate-500">No trend data yet</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#1e293b" vertical={false} />
            <XAxis dataKey="timestamp" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              yAxisId="status"
              domain={[0, 1]}
              tickCount={3}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'Risk', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 12 }}
            />
            <YAxis
              yAxisId="confidence"
              orientation="right"
              domain={[0, 100]}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'Confidence', angle: 90, position: 'insideRight', fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155' }} labelStyle={{ color: '#f8fafc' }} />
            <Legend wrapperStyle={{ color: '#94a3b8' }} />
            <Line yAxisId="status" type="monotone" dataKey="status" name="Late (1) / On Time (0)" stroke="#22c55e" strokeWidth={3} dot={{ r: 3 }} />
            <Line yAxisId="confidence" type="monotone" dataKey="confidence" name="Confidence (%)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
