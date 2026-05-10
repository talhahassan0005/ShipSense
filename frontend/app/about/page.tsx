'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function About() {
  const team = [
    {
      name: 'Dr. Ahmad Khan',
      role: 'CEO & Founder',
      bio: 'ML expert with 10+ years in supply chain optimization.',
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      bio: 'Full-stack engineer passionate about building scalable systems.',
    },
    {
      name: 'Michael Chen',
      role: 'Lead Data Scientist',
      bio: 'PhD in Machine Learning, specialized in predictive analytics.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      bio: 'Product strategist with background in logistics industry.',
    },
  ];

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-slate-950">
        {/* Hero */}
        <section className="border-b border-slate-700/50 bg-gradient-to-b from-slate-900/50 to-slate-950 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">About Us</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Revolutionizing Supply Chain</h1>
            <p className="mt-6 text-xl text-slate-300">
              We're on a mission to help businesses predict and prevent late deliveries using cutting-edge AI.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                <h2 className="mb-4 text-2xl font-bold text-white">Our Mission</h2>
                <p className="text-lg text-slate-300">
                  To empower businesses worldwide with AI-driven insights that transform supply chain operations, 
                  reduce delays, and create exceptional customer experiences through accurate, real-time predictions.
                </p>
              </div>
              
              <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8 backdrop-blur">
                <h2 className="mb-4 text-2xl font-bold text-white">Our Vision</h2>
                <p className="text-lg text-slate-300">
                  To become the most trusted AI platform in supply chain management, enabling every organization 
                  to achieve unprecedented levels of efficiency, transparency, and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="border-t border-slate-700/50 bg-slate-900/30 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white">Why Choose Us?</h2>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: 'Proven Accuracy',
                  description: '98% prediction accuracy backed by millions of real transactions.',
                },
                {
                  title: 'Expert Team',
                  description: 'Data scientists, engineers, and industry veterans working together.',
                },
                {
                  title: 'Enterprise Ready',
                  description: 'Trusted by Fortune 500 companies for mission-critical operations.',
                },
                {
                  title: 'Always Innovating',
                  description: 'Continuous improvements and new features based on customer feedback.',
                },
                {
                  title: 'World-Class Support',
                  description: '24/7 customer support with average response time < 5 minutes.',
                },
                {
                  title: 'Transparent Pricing',
                  description: 'No hidden fees, simple plans that scale with your business.',
                },
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-700/30 bg-slate-950/50 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-cyan-300">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="border-t border-slate-700/50 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white">Meet Our Team</h2>
              <p className="mt-4 text-slate-400">
                Brilliant minds dedicated to solving supply chain challenges.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-700/30 bg-slate-900/50 p-6 text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600" />
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="mt-1 text-sm text-cyan-300">{member.role}</p>
                  <p className="mt-3 text-sm text-slate-400">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-t border-slate-700/50 bg-slate-900/30 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-4 text-center">
              {[
                { value: '500K+', label: 'Predictions Daily' },
                { value: '98%', label: 'Accuracy Rate' },
                { value: '50+', label: 'Enterprise Clients' },
                { value: '100%', label: 'Uptime SLA' },
              ].map((stat, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-700/30 bg-slate-950/50 p-6">
                  <p className="text-4xl font-bold text-cyan-400">{stat.value}</p>
                  <p className="mt-2 text-slate-400">{stat.label}</p>
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
