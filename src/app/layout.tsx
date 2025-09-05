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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'TickBase - NFT Ticketing Marketplace',
  description: 'Plataforma revolucionaria de venta y gestión de boletos NFT en Base Network',
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
      <body className={`${inter.variable} font-sans antialiased`} style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#000000',
        color: '#ffffff',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <ContextProvider cookies={cookies}>
          <div>
            <DemoBanner />
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
              {children}
            </div>
            <Footer />
            <TickBatoChatbot />
          </div>
        </ContextProvider>
      </body>
    </html>
  )
}
