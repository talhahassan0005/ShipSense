'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Supply Chain AI</h1>
              <p className="text-xs text-cyan-400">Prediction Engine</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Dashboard', href: '/' },
              { label: 'Features', href: '/features' },
              { label: 'About', href: '/about' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900/50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900/50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-slate-700/50 pt-4">
            {[
              { label: 'Dashboard', href: '/' },
              { label: 'Features', href: '/features' },
              { label: 'About', href: '/about' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-slate-300 hover:text-cyan-300 hover:bg-slate-900/50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
