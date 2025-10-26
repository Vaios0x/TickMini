import { Metadata } from 'next';
import { CompatibilityDashboard } from '@/components/compatibility/compatibility-dashboard';

export const metadata: Metadata = {
  title: 'Compatibility Demo - TickMini',
  description: 'Sistema completo de compatibilidad entre Base App y Farcaster',
  openGraph: {
    title: 'Compatibility Demo - TickMini',
    description: 'Compatibilidad y fallbacks para Mini Apps en Base Network',
    images: ['/images/og-image.svg'],
  },
};

export default function CompatibilityDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <CompatibilityDashboard />
      </div>
    </div>
  );
}
