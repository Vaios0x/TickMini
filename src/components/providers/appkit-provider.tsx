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
          metadata
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