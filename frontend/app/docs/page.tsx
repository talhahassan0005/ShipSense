'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function Docs() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-slate-950">
        {/* Hero */}
        <section className="border-b border-slate-700/50 bg-gradient-to-b from-slate-900/50 to-slate-950 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Documentation</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">API & Integration Guide</h1>
            <p className="mt-6 text-xl text-slate-300">
              Complete documentation and guides for integrating Supply Chain AI into your systems.
            </p>
          </div>
        </section>

        {/* Documentation Grid */}
        <section className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Getting Started',
                  description: 'Quick setup guide to get you up and running in minutes.',
                  sections: ['Installation', 'API Keys', 'First Request'],
                },
                {
                  title: 'API Reference',
                  description: 'Complete API endpoints documentation with examples.',
                  sections: ['Predict Endpoint', 'History Endpoint', 'Response Format'],
                },
                {
                  title: 'Authentication',
                  description: 'Learn about API key authentication and security best practices.',
                  sections: ['API Keys', 'Tokens', 'Security'],
                },
                {
                  title: 'Examples',
                  description: 'Code examples in multiple programming languages.',
                  sections: ['Python', 'JavaScript', 'cURL'],
                },
                {
                  title: 'Webhook Integration',
                  description: 'Setup webhooks to receive real-time prediction results.',
                  sections: ['Webhook Setup', 'Events', 'Retry Policy'],
                },
                {
                  title: 'Error Handling',
                  description: 'Understanding and handling API errors gracefully.',
                  sections: ['Error Codes', 'Troubleshooting', 'Support'],
                },
              ].map((doc, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 hover:border-cyan-500/30 transition-all">
                  <h3 className="mb-2 text-xl font-bold text-white">{doc.title}</h3>
                  <p className="mb-4 text-slate-400">{doc.description}</p>
                  <div className="space-y-2 border-t border-slate-700/30 pt-4">
                    {doc.sections.map((section, sidx) => (
                      <a
                        key={sidx}
                        href="#"
                        className="block text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        → {section}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API Example */}
        <section className="border-t border-slate-700/50 bg-slate-900/30 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">API Request Example</h2>
              <p className="mt-2 text-slate-400">Here's how to make a prediction request using cURL:</p>
            </div>

            <div className="rounded-2xl border border-slate-700/50 bg-slate-950/50 p-6 overflow-x-auto">
              <pre className="text-sm text-slate-300 font-mono">
{`curl -X POST https://api.supplychainai.com/predict \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "Shipping_days": 5,
    "Product_weight_g": 1500,
    "Product_price": 250.00,
    "Days_for_shipment": 3,
    "Reached_on_time": 1,
    "Sales_per_month": 50,
    "Days_for_shipping_real": 4
  }'

# Response:
{
  "prediction": 0,
  "confidence": 0.98,
  "status": "on_time",
  "risk_bucket": "low"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-slate-700/50 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  q: 'What is the API rate limit?',
                  a: 'Starter: 100/min, Professional: 1000/min, Enterprise: Unlimited. Contact support for custom limits.',
                },
                {
                  q: 'How long do predictions take?',
                  a: 'Predictions are generated in <500ms on average. 99.9% of requests complete within 1 second.',
                },
                {
                  q: 'Can I batch multiple predictions?',
                  a: 'Yes! Use our /batch endpoint to submit up to 100 predictions in a single request.',
                },
                {
                  q: 'What data do you store?',
                  a: 'We store prediction requests, results, and aggregated metrics for analytics. Raw input data can be deleted on request.',
                },
                {
                  q: 'How accurate is the model?',
                  a: '98% accuracy on our test set. Accuracy varies based on data quality and market conditions.',
                },
                {
                  q: 'Is the API always available?',
                  a: 'Yes, we guarantee 99.9% uptime with SLA compliance. Status page: status.supplychainai.com',
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

        {/* CTA */}
        <section className="border-t border-slate-700/50 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-slate-900/50 p-12 text-center backdrop-blur">
            <h2 className="text-3xl font-bold text-white">Need Help?</h2>
            <p className="mt-4 text-lg text-slate-300">
              Our support team is available 24/7 to help you integrate and succeed.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:talhafast0005@gmail.com"
                className="rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Email Support
              </a>
              <Link
                href="/contact"
                className="rounded-lg border border-cyan-500/30 px-8 py-3 text-cyan-300 hover:bg-cyan-500/10 font-semibold transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
