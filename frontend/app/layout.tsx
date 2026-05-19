import type { Metadata } from 'next';
import './globals.css';
import { AgentChat } from '@/components/AgentChat';

export const metadata: Metadata = {
  title: 'Supply Chain Late Delivery Predictor',
  description: 'Realtime supply chain late delivery prediction dashboard powered by FastAPI and Next.js.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <AgentChat isOpen={true} />
      </body>
    </html>
  );
}
