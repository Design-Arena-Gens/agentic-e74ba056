import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CallPilot | Autonomous Calling Agent Platform',
  description: 'Design, launch, and monitor AI-powered calling agents tailored to your business goals.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
