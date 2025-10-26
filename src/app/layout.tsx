import type { Metadata } from 'next/types'
import { Inter } from 'next/font/google'
import './globals.css'
import './appkit-modal.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { DemoBanner } from '@/components/ui/demo-banner'
import { TickBatoChatbot } from '@/components/chatbot'
import { headers } from 'next/headers'
import ContextProvider from '@/context'
import { MiniAppProvider } from '@/components/providers/miniapp-provider'
import { NotificationProvider } from '@/components/providers/notification-provider'
import { BottomNavigation } from '@/components/layout/bottom-navigation'
import { ContextAwareWrapper } from '@/components/context/context-aware-wrapper'
import { BaseAccountIntegration } from '@/components/base-account/base-account-integration'
import { AddMiniAppButton } from '@/components/notifications/add-miniapp-button'
import { QuickAuthButton } from '@/components/auth/quick-auth-button'
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'
import { Preloader } from '@/components/performance/performance-optimizer'
import { BaseAccountProvider } from '@/components/wallet/base-account-provider'
import { ActivationMetricsProvider } from '@/components/analytics/activation-metrics'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'TickMini - NFT Ticketing Marketplace',
  description: 'Plataforma de tickets NFT para eventos en Base Network',
  keywords: ['NFT', 'tickets', 'events', 'Base Network', 'blockchain', 'ticketing'],
  authors: [{ name: 'TickMini Team' }],
  creator: 'TickMini',
  publisher: 'TickMini',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://tickmini.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TickMini - NFT Ticketing Marketplace',
    description: 'Plataforma de tickets NFT para eventos en Base Network',
    url: '/',
    siteName: 'TickMini',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'TickMini - NFT Ticketing Marketplace',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TickMini - NFT Ticketing Marketplace',
    description: 'Plataforma de tickets NFT para eventos en Base Network',
    images: ['/images/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'fc:miniapp': JSON.stringify({
      version: 'next',
      imageUrl: process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/images/embed-optimized.svg` : 'https://tickmini.vercel.app/images/embed-optimized.svg',
      button: {
        title: '🎫 Abrir TickMini',
        action: {
          type: 'launch_frame',
          name: 'TickMini',
          url: process.env.NEXT_PUBLIC_URL || 'https://tickmini.vercel.app',
          splashImageUrl: process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/images/splash-optimized.svg` : 'https://tickmini.vercel.app/images/splash-optimized.svg',
          splashBackgroundColor: '#000000',
        },
      },
    }),
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie')

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-optimized.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TickMini" />
        <meta name="application-name" content="TickMini" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#000000',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <ContextProvider cookies={cookies}>
          <MiniAppProvider>
            <NotificationProvider>
              <ContextAwareWrapper>
                <BaseAccountIntegration>
                  <BaseAccountProvider>
                    <ActivationMetricsProvider>
                      <div>
                        <DemoBanner />
                        <Navbar />
                        <div style={{ paddingTop: '120px' }}>
                          {children}
                        </div>
                        <Footer />
                        <TickBatoChatbot />
                        <BottomNavigation />
                        <OnboardingFlow />
                      </div>
                    </ActivationMetricsProvider>
                  </BaseAccountProvider>
                </BaseAccountIntegration>
              </ContextAwareWrapper>
            </NotificationProvider>
          </MiniAppProvider>
        </ContextProvider>
      </body>
    </html>
  )
}
