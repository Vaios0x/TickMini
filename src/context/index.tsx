'use client'

import { createAppKit } from '@reown/appkit'
import { wagmiAdapter, projectId, networks, metadata } from '@/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode, useEffect, useState } from 'react'
import { cookieToInitialState, WagmiProvider } from 'wagmi'

// Configure queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Variable global para evitar múltiples inicializaciones
let appKitModal: any = null

// Función para crear el modal de AppKit de forma segura
const createAppKitModal = () => {
  if (!appKitModal) {
    try {
      appKitModal = createAppKit({
        adapters: [wagmiAdapter],
        projectId,
        networks,
        metadata
      })
    } catch (error) {
      console.error('Error creating AppKit modal:', error)
    }
  }
  return appKitModal
}

// Export modal for direct access
export { appKitModal as modal }

function ContextProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Inicializar AppKit de forma segura
    try {
      createAppKitModal()
      setIsInitialized(true)
    } catch (error) {
      console.error('Error initializing AppKit:', error)
      setIsInitialized(true) // Continuar aunque haya error
    }
  }, [])

  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig, cookies)

  if (!isInitialized) {
    return <div>Inicializando...</div>
  }

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
