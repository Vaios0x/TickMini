'use client'

import { createAppKit } from '@reown/appkit'
import { wagmiAdapter, projectId, networks, metadata } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider } from 'wagmi'

// Configure queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Create AppKit modal - Configuración oficial según docs
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata
})

// Export modal for direct access
export { modal }

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies)

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
