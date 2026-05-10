'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'Real-time Predictions',
      description: 'Get instant delivery predictions with sub-500ms response times using advanced ML models.',
    },
    {
      icon: '📊',
      title: 'Confidence Scoring',
      description: 'Every prediction includes confidence metrics to help you make informed decisions.',
    },
    {
      icon: '📈',
      title: 'Analytics Dashboard',
      description: 'Track prediction trends, success rates, and key metrics in beautiful visualizations.',
    },
    {
      icon: '🔐',
      title: 'Enterprise Security',
      description: 'Bank-level security with encryption, VPC isolation, and multi-factor authentication.',
    },
    {
      icon: '🔌',
      title: 'Easy Integration',
      description: 'RESTful API with comprehensive documentation for seamless integration into your systems.',
    },
    {
      icon: '🚀',
      title: 'Auto-scaling',
      description: 'Handles unlimited concurrent predictions with automatic infrastructure scaling.',
    },
  ];

  const capabilities = [
    {
      title: 'XGBoost ML Model',
      description: 'State-of-the-art gradient boosting model trained on 100k+ real supply chain records.',
    },
    {
      title: 'PostgreSQL Database',
      description: 'Robust data persistence with automated backups and disaster recovery.',
    },
    {
      title: 'Advanced Analytics',
      description: 'Real-time trend analysis, anomaly detection, and predictive insights.',
    },
    {
      title: '24/7 Monitoring',
      description: 'Continuous system monitoring with automatic alerts and performance optimization.',
    },
  ];

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-slate-950">
        {/* Hero */}
        <section className="border-b border-slate-700/50 bg-gradient-to-b from-slate-900/50 to-slate-950 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Powerful Features</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Everything You Need</h1>
            <p className="mt-6 text-xl text-slate-300">
              Comprehensive tools for predicting late deliveries and optimizing your supply chain.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, idx) => (
                <div key={idx} className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8 backdrop-blur hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="border-t border-slate-700/50 bg-slate-900/30 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Technical Stack</p>
              <h2 className="mt-4 text-4xl font-bold text-white">Advanced Technology</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-700/30 bg-slate-950/50 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-cyan-300">{cap.title}</h3>
                  <p className="text-slate-400">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-slate-700/50 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-slate-900/50 p-12 text-center backdrop-blur">
            <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
            <p className="mt-4 text-lg text-slate-300">
              Start making predictions and optimize your supply chain today.
            </p>
            <Link
              href="/"
              className="mt-8 inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-8 py-3 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
