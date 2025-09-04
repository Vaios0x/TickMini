import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Documentación - TickBase',
  description: 'Documentación completa de TickBase - Plataforma de ticketing NFT en Base Network',
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="docs-layout">
      {children}
    </div>
  )
}
