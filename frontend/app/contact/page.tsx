'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-slate-950">
        {/* Hero */}
        <section className="border-b border-slate-700/50 bg-gradient-to-b from-slate-900/50 to-slate-950 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Get in Touch</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Contact Us</h1>
            <p className="mt-6 text-xl text-slate-300">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="space-y-8">
                {[
                  {
                    icon: '📧',
                    title: 'Email',
                    value: 'talhafast0005@gmail.com',
                    link: 'mailto:talhafast0005@gmail.com',
                  },
                  {
                    icon: '📞',
                    title: 'Phone',
                    value: '+923021419651',
                    link: 'tel:+15551234567',
                  },
                  {
                    icon: '📍',
                    title: 'Address',
                    value: 'Badami Bagh, Lahore, Pakistan',
                    link: null,
                  },
                  {
                    icon: '🕐',
                    title: 'Business Hours',
                    value: '24/7 Support Available',
                    link: null,
                  },
                ].map((contact, idx) => (
                  <div key={idx} className="rounded-2xl border border-slate-700/30 bg-slate-900/50 p-6">
                    <p className="text-2xl mb-2">{contact.icon}</p>
                    <h3 className="font-semibold text-white">{contact.title}</h3>
                    {contact.link ? (
                      <a href={contact.link} className="mt-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                        {contact.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-slate-400">{contact.value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-8">
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-300">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition"
                        placeholder="Tell us about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 py-3 font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                    >
                      Send Message
                    </button>

                    {submitted && (
                      <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-300">
                        ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-slate-700/50 bg-slate-900/30 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white">Common Questions</h2>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  q: 'What is the typical response time?',
                  a: 'We aim to respond to all inquiries within 5 minutes during business hours and within 2 hours outside business hours.',
                },
                {
                  q: 'Do you offer phone support?',
                  a: 'Yes! Enterprise customers have access to 24/7 phone support. Standard plans have email support.',
                },
                {
                  q: 'Can I schedule a demo?',
                  a: 'Absolutely! Click the "Schedule Demo" button in our sales section or email us directly.',
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
