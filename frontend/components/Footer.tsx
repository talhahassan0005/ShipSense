'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-700/50 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-white">Supply Chain AI</span>
            </div>
            <p className="text-slate-400 text-sm">
              Intelligent late delivery prediction using machine learning and real-time analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {[
                { label: 'Dashboard', href: '/' },
                { label: 'Features', href: '/features' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'API Docs', href: '/docs' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookie Policy', href: '/cookies' },
                { label: 'Security', href: '/security' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} Supply Chain AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20v-7.21H5.93v-2.66h2.36V9.25c0-2.33 1.43-3.61 3.48-3.61.99 0 1.84.07 2.09.1v2.42h-1.44c-1.13 0-1.35.53-1.35 1.32v1.73h2.7l-.35 2.66h-2.35V20" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
