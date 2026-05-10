'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for small businesses',
      features: [
        'Up to 1,000 predictions/month',
        'Basic analytics dashboard',
        'Email support',
        'API access',
        '14-day data retention',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      description: 'For growing enterprises',
      features: [
        'Up to 50,000 predictions/month',
        'Advanced analytics & trends',
        'Priority email support',
        'REST API + WebSocket',
        '90-day data retention',
        'Custom models',
        'Real-time alerts',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large-scale operations',
      features: [
        'Unlimited predictions',
        'Full analytics suite',
        '24/7 phone support',
        'Dedicated API keys',
        'Unlimited data retention',
        'Custom models & training',
        'Webhooks & integrations',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-slate-950">
        {/* Hero */}
        <section className="border-b border-slate-700/50 bg-gradient-to-b from-slate-900/50 to-slate-950 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Pricing Plans</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Simple, Transparent Pricing</h1>
            <p className="mt-6 text-xl text-slate-300">
              Choose the perfect plan for your business needs.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-3xl border p-8 transition-all ${
                    plan.highlighted
                      ? 'border-cyan-500/50 bg-gradient-to-b from-cyan-500/10 to-slate-900/50 shadow-lg shadow-cyan-500/20 md:scale-105'
                      : 'border-slate-700/50 bg-slate-900/50 hover:border-slate-600/50'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 px-4 py-1 text-sm font-semibold text-white">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-slate-400">{plan.description}</p>
                  
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400">{plan.period}</span>
                  </div>
                  
                  <button
                    className={`mt-8 w-full rounded-lg py-3 font-semibold transition-all ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                        : 'border border-slate-600 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300'
                    }`}
                  >
                    {plan.cta}
                  </button>
                  
                  <div className="mt-8 space-y-4 border-t border-slate-700/50 pt-8">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        <svg className="mt-1 h-5 w-5 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-slate-700/50 bg-slate-900/30 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  q: 'Can I change plans anytime?',
                  a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
                },
                {
                  q: 'Is there a free trial?',
                  a: 'Yes! Professional and Enterprise plans come with a 14-day free trial. No credit card required.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, wire transfers, and ACH payments for Enterprise accounts.',
                },
                {
                  q: 'Do you offer discounts for annual billing?',
                  a: 'Yes, annual billing gets you 2 months free. Contact our sales team for custom pricing.',
                },
              ].map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-700/30 bg-slate-950/50 p-6">
                  <h3 className="font-semibold text-white text-lg">{faq.q}</h3>
                  <p className="mt-2 text-slate-400">{faq.a}</p>
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
