import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Supply Chain Late Delivery Predictor',
  description: 'Realtime supply chain late delivery prediction dashboard powered by FastAPI and Next.js.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
