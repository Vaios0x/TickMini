'use client'

import { createAppKit } from '@reown/appkit'
import { wagmiAdapter, projectId, networks, metadata } from '@/config'
import { useEffect, useState } from 'react'

// Global flag to prevent multiple initializations
let appKitInitialized = false
let appKitInstance = null

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  const [isAppKitReady, setIsAppKitReady] = useState(false)

  useEffect(() => {
    if (!appKitInitialized && typeof window !== 'undefined') {
      try {
        console.log('Initializing AppKit with projectId:', projectId)
        
        const modal = createAppKit({
          adapters: [wagmiAdapter],
          projectId,
          networks,
          metadata,
          // Configuración del tamaño del modal para que quepa mejor
          modal: {
            size: 'compact', // Hacer el modal más compacto
            width: '400px',  // Ancho máximo del modal
            height: '600px', // Altura máxima del modal
            maxWidth: '90vw', // Máximo 90% del ancho de la ventana
            maxHeight: '80vh' // Máximo 80% de la altura de la ventana
          }
        })
        
        appKitInstance = modal
        appKitInitialized = true
        setIsAppKitReady(true)
        console.log('AppKit initialized successfully')
      } catch (error) {
        console.error('AppKit initialization error:', error)
        setIsAppKitReady(true) // Still set to true to avoid infinite loading
      }
    } else if (appKitInitialized) {
      setIsAppKitReady(true)
    }
  }, [])

  // Only render children after AppKit is ready
  if (!isAppKitReady) {
    return <div>Loading AppKit...</div>
  }

  return <>{children}</>
}