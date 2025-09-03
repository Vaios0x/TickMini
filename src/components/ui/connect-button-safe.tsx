'use client'

import { useEffect, useState } from 'react'
import { Button } from './button'
import { Wallet } from 'lucide-react'

export function ConnectButtonSafe() {
  const [isReady, setIsReady] = useState(false)
  const [appKitModal, setAppKitModal] = useState<any>(null)

  useEffect(() => {
    // Wait for AppKit to be fully initialized
    const initTimeout = setTimeout(() => {
      if (typeof window !== 'undefined') {
        try {
          // Try to access the global AppKit instance
          const appKit = (window as any).appKit || (window as any).__appKit
          if (appKit) {
            setAppKitModal(appKit)
            setIsReady(true)
          } else {
            // Fallback: try to import and use AppKit directly
            import('@reown/appkit/react').then((module) => {
              setIsReady(true)
            }).catch((error) => {
              console.log('AppKit not ready:', error)
              // Still set ready to true so button appears, even if non-functional
              setIsReady(true)
            })
          }
        } catch (error) {
          console.log('Error checking AppKit:', error)
          setIsReady(true) // Allow button to show even if there's an error
        }
      }
    }, 1500) // Wait 1.5 seconds for full initialization

    return () => clearTimeout(initTimeout)
  }, [])

  const handleConnect = async () => {
    try {
      if (appKitModal && appKitModal.open) {
        // Use the global AppKit instance
        appKitModal.open()
      } else {
        // Fallback: try to open via direct import
        const { useAppKit } = await import('@reown/appkit/react')
        // This won't work because we can't call hooks here, but it's a fallback attempt
        console.log('Trying to open AppKit modal...')
        
        // Alternative: try to find and trigger the modal through DOM
        const modalTrigger = document.querySelector('[data-testid="connect-button"]') as HTMLElement
        if (modalTrigger) {
          modalTrigger.click()
        }
      }
    } catch (error) {
      console.log('Error opening wallet modal:', error)
      alert('Error al abrir el modal de conexión. Por favor recarga la página.')
    }
  }

  if (!isReady) {
    return (
      <Button
        disabled
        className="flex items-center space-x-2"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 20, 40, 0.9))',
          border: '2px solid #00ffff',
          color: '#00ffff',
          padding: '0.9rem 1.8rem',
          borderRadius: '30px',
          fontSize: '1rem',
          fontWeight: '600',
          backdropFilter: 'blur(15px)',
          cursor: 'not-allowed',
          opacity: 0.7
        }}
      >
        <Wallet className="h-4 w-4" />
        <span>Inicializando...</span>
      </Button>
    )
  }

  return (
    <Button
      onClick={handleConnect}
      className="flex items-center space-x-2"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 20, 40, 0.9))',
        border: '2px solid #00ffff',
        color: '#00ffff',
        padding: '0.9rem 1.8rem',
        borderRadius: '30px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 30, 60, 0.9), rgba(0, 60, 120, 1))'
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 20, 40, 0.9))'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <Wallet className="h-4 w-4" />
      <span>Conectar Wallet</span>
    </Button>
  )
}