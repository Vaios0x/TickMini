'use client'

import { useState, useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

export interface MiniAppContext {
  // Context data (no confiable para operaciones sensibles)
  user: any
  location: any
  client: any
  features: any
  
  // Context state
  isInMiniApp: boolean
  isLoading: boolean
  error: string | null
}

export function useMiniAppContext(): MiniAppContext {
  const [context, setContext] = useState<MiniAppContext>({
    user: null,
    location: null,
    client: null,
    features: null,
    isInMiniApp: false,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const loadContext = async () => {
      try {
        console.log('🔍 Loading Mini App context...')
        
        // Verificar si estamos en Mini App
        const isInMiniApp = await sdk.context.isInMiniApp()
        console.log('📱 Is in Mini App:', isInMiniApp)

        if (isInMiniApp) {
          // Cargar contexto del usuario
          const user = await sdk.context.getUser()
          console.log('👤 User context:', user)

          // Cargar ubicación
          const location = await sdk.context.getLocation()
          console.log('📍 Location context:', location)

          // Cargar cliente
          const client = await sdk.context.getClient()
          console.log('💻 Client context:', client)

          // Cargar características
          const features = await sdk.context.getFeatures()
          console.log('⚡ Features context:', features)

          setContext({
            user,
            location,
            client,
            features,
            isInMiniApp: true,
            isLoading: false,
            error: null
          })
        } else {
          // No estamos en Mini App
          setContext({
            user: null,
            location: null,
            client: null,
            features: null,
            isInMiniApp: false,
            isLoading: false,
            error: null
          })
        }
      } catch (error) {
        console.error('❌ Error loading Mini App context:', error)
        setContext(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load context'
        }))
      }
    }

    loadContext()
  }, [])

  return context
}