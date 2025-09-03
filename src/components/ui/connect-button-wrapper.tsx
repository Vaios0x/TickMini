'use client'

import dynamic from 'next/dynamic'
import { Wallet } from 'lucide-react'
import { Button } from './button'

const ConnectButton = dynamic(
  () => import('./connect-button').then((mod) => ({ default: mod.ConnectButton })),
  {
    ssr: false,
    loading: () => (
      <Button
        disabled
        className="flex items-center space-x-2"
        tabIndex={0}
        aria-label="Conectar wallet"
      >
        <Wallet className="h-4 w-4" />
        <span>Conectar Wallet</span>
      </Button>
    ),
  }
)

export { ConnectButton as default }