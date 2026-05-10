'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PredictionForm from '@/components/PredictionForm';
import ResultCard from '@/components/ResultCard';
import StatsCards from '@/components/StatsCards';
import PredictionChart from '@/components/PredictionChart';
import { predictLateDelivery, getRecentPredictions } from '@/lib/api';
import type { PredictionEntry, PredictionInput, PredictionResponse } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [history, setHistory] = useState<PredictionEntry[]>([]);
  const [latestResult, setLatestResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRecentPredictions()
      .then((predictions) => setHistory(predictions))
      .catch(() => setHistory([]));
  }, []);

  const stats = useMemo(() => {
    const total = history.length;
    const late = history.filter((item) => item.prediction === 1).length;
    const averageConfidence = total > 0 ? history.reduce((sum, item) => sum + item.confidence, 0) / total : 0;
    return {
      total,
      lateRate: total > 0 ? Math.round((late / total) * 100) : 0,
      onTimeRate: total > 0 ? Math.round(((total - late) / total) * 100) : 0,
      averageConfidence: total > 0 ? Math.round(averageConfidence * 100) / 100 : 0,
    };
  }, [history]);

  const handlePredict = async (values: PredictionInput) => {
    setLoading(true);
    setError(null);
    try {
      const result = await predictLateDelivery(values);
      setLatestResult(result);
      const recent = await getRecentPredictions();
      setHistory(recent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-20 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                  Predict Late Deliveries with
                  <span className="bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent"> AI</span>
                </h1>
                <p className="text-xl text-slate-300">
                  Leverage machine learning to forecast delivery delays, optimize logistics, and improve customer satisfaction in real-time.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#dashboard"
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  Start Predicting →
                </a>
                <Link
                  href="/features"
                  className="px-8 py-3 rounded-lg border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 font-semibold transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '98%', label: 'Prediction Accuracy' },
                { value: '<500ms', label: 'Response Time' },
                { value: '24/7', label: 'Monitoring' },
                { value: '∞', label: 'Scalability' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-6 text-center backdrop-blur">
                  <p className="text-3xl font-bold text-cyan-400">{stat.value}</p>
                  <p className="text-sm text-slate-400 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="bg-slate-950 px-4 py-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Prediction Engine</p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Late Delivery Prediction Dashboard</h1>
              <p className="mt-3 max-w-2xl text-slate-300">Enter order shipping details and receive an instant delivery prediction with confidence scoring and trend monitoring.</p>
            </div>
            <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-5 shadow-soft">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Status</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-300">Realtime AI pipeline ready</p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <div className="space-y-6">
              <PredictionForm onSubmit={handlePredict} disabled={loading} />
              <ResultCard result={latestResult} loading={loading} error={error} />
            </div>

            <div className="space-y-6">
              <StatsCards stats={stats} />
              <div className="rounded-3xl border border-slate-700/70 bg-slate-900/90 p-6 shadow-soft">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Prediction trends</h2>
                    <p className="text-sm text-slate-400">Recent late delivery likelihood by request.</p>
                  </div>
                </div>
                <PredictionChart history={history} />
              </div>
            </div>
          </div>

          {/* Recent Predictions Table */}
          <div className="mt-8 rounded-3xl border border-slate-700/70 bg-slate-900/90 p-6 shadow-soft">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white">Recent predictions</h2>
              <p className="text-sm text-slate-400">Latest entries and model outcomes.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Prediction</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Confidence</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Sales</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Days Real</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length > 0 ? (
                    history.map((entry, index) => (
                      <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3 text-slate-400">{new Date(entry.timestamp).toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${entry.prediction === 1 ? 'bg-rose-500/15 text-rose-300' : 'bg-emerald-500/15 text-emerald-300'}`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-300">{Math.round(entry.confidence * 100)}%</td>
                        <td className="px-4 py-3 text-slate-400">${entry.input.Sales.toLocaleString()}</td>
                        <td className="px-4 py-3 text-slate-400">{entry.input.Days_for_shipping_real}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                        No predictions yet. Submit the form to populate the history.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
