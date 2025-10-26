import { Metadata } from 'next';
import { RewardsDashboard } from '@/components/rewards/rewards-dashboard';

export const metadata: Metadata = {
  title: 'Rewards Demo - TickMini',
  description: 'Sistema completo de rewards para Mini Apps en Base Network',
  openGraph: {
    title: 'Rewards Demo - TickMini',
    description: 'Gana recompensas por construir Mini Apps de alta calidad en Base Network',
    images: ['/images/og-image.svg'],
  },
};

export default function RewardsDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <RewardsDashboard />
      </div>
    </div>
  );
}
