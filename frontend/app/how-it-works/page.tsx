'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Submit Order Details',
      description: 'Enter your shipping order information including product weight, price, and destination.',
      icon: '📦',
    },
    {
      number: '2',
      title: 'AI Processing',
      description: 'Our XGBoost model analyzes patterns from 100k+ historical deliveries in milliseconds.',
      icon: '⚙️',
    },
    {
      number: '3',
      title: 'Get Prediction',
      description: 'Receive instant prediction with confidence score and risk assessment.',
      icon: '🎯',
    },
    {
      number: '4',
      title: 'Take Action',
      description: 'Use insights to optimize routes, adjust timelines, or communicate with customers.',
      icon: '✅',
    },
  ];

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-slate-950">
        {/* Hero */}
        <section className="border-b border-slate-700/50 bg-gradient-to-b from-slate-900/50 to-slate-950 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">How It Works</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Simple 4-Step Process</h1>
            <p className="mt-6 text-xl text-slate-300">
              From submission to prediction in under 500 milliseconds.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-12">
              {steps.map((step, idx) => (
                <div key={idx} className="grid gap-8 md:grid-cols-[1fr_2fr] items-center">
                  {idx % 2 === 0 ? (
                    <>
                      <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8 text-center">
                        <div className="mb-4 text-6xl">{step.icon}</div>
                        <div className="mb-4 inline-block rounded-full bg-cyan-500/20 border border-cyan-500/30 px-4 py-2">
                          <span className="text-2xl font-bold text-cyan-400">Step {step.number}</span>
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">{step.title}</h3>
                        <p className="text-slate-400">{step.description}</p>
                      </div>
                      <div className="h-32 rounded-3xl border border-slate-700/30 bg-slate-950/50 p-6 flex items-center justify-center">
                        {idx < steps.length - 1 && (
                          <div className="text-center">
                            <div className="text-4xl text-cyan-400">↓</div>
                            <p className="text-xs text-slate-500 mt-2">Next Step</p>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-32 rounded-3xl border border-slate-700/30 bg-slate-950/50 p-6 flex items-center justify-center order-2 md:order-1">
                        {idx < steps.length - 1 && (
                          <div className="text-center">
                            <div className="text-4xl text-cyan-400">↓</div>
                            <p className="text-xs text-slate-500 mt-2">Next Step</p>
                          </div>
                        )}
                      </div>
                      <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8 text-center order-1 md:order-2">
                        <div className="mb-4 text-6xl">{step.icon}</div>
                        <div className="mb-4 inline-block rounded-full bg-cyan-500/20 border border-cyan-500/30 px-4 py-2">
                          <span className="text-2xl font-bold text-cyan-400">Step {step.number}</span>
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">{step.title}</h3>
                        <p className="text-slate-400">{step.description}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="border-t border-slate-700/50 bg-slate-900/30 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white">Technical Architecture</h2>
              <p className="mt-4 text-slate-400">Built on proven, scalable technology</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: 'Frontend Layer',
                  tech: 'Next.js 14, React 18, TypeScript',
                  description: 'Modern, responsive UI with real-time updates and beautiful data visualizations.',
                },
                {
                  title: 'API Layer',
                  tech: 'FastAPI, Uvicorn',
                  description: 'High-performance REST API with auto-scaling and comprehensive error handling.',
                },
                {
                  title: 'ML Layer',
                  tech: 'XGBoost, Pandas, NumPy',
                  description: 'State-of-the-art gradient boosting trained on 100,000+ supply chain records.',
                },
                {
                  title: 'Database Layer',
                  tech: 'PostgreSQL, SQLAlchemy',
                  description: 'Enterprise-grade database with async connections and automatic backups.',
                },
                {
                  title: 'Deployment',
                  tech: 'Docker, AWS Fargate, RDS',
                  description: 'Containerized microservices with auto-scaling and 99.9% uptime SLA.',
                },
                {
                  title: 'Monitoring',
                  tech: 'CloudWatch, Custom Logging',
                  description: '24/7 monitoring with real-time alerts and performance analytics.',
                },
              ].map((tech, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-700/30 bg-slate-950/50 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-cyan-300">{tech.title}</h3>
                  <p className="mb-3 text-sm font-mono text-slate-400">{tech.tech}</p>
                  <p className="text-slate-400 text-sm">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="border-t border-slate-700/50 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white">Why Our Approach Works</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                '✅ Trained on real supply chain data',
                '✅ Sub-500ms prediction time',
                '✅ 98% accuracy rate',
                '✅ Handles edge cases gracefully',
                '✅ Continuous model improvement',
                '✅ Enterprise-grade security',
              ].map((feature, idx) => (
                <div key={idx} className="rounded-lg border border-slate-700/20 bg-slate-900/30 p-4">
                  <p className="text-slate-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
