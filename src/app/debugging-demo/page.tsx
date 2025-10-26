import { Metadata } from 'next';
import { DebuggingDashboard } from '@/components/debugging/debugging-dashboard';

export const metadata: Metadata = {
  title: 'Debugging Demo - TickMini',
  description: 'Herramientas completas de debugging y troubleshooting para Mini Apps',
  openGraph: {
    title: 'Debugging Demo - TickMini',
    description: 'Debugging y troubleshooting para Mini Apps en Base Network',
    images: ['/images/og-image.svg'],
  },
};

export default function DebuggingDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <DebuggingDashboard />
      </div>
    </div>
  );
}
