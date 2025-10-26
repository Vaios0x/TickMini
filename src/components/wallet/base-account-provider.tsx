'use client'

import * as React from 'react'
import { useState, useEffect, createContext, useContext } from 'react'

interface BaseAccountContextType {
  account: string | null
  isConnected: boolean
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
  switchAccount: () => Promise<void>
  showAlternateWallets: boolean
  setShowAlternateWallets: (show: boolean) => void
}

const BaseAccountContext = createContext<BaseAccountContextType | null>(null)

export function useBaseAccount() {
  const context = useContext(BaseAccountContext)
  if (!context) {
    throw new Error('useBaseAccount must be used within BaseAccountProvider')
  }
  return context
}

interface BaseAccountProviderProps {
  children: React.ReactNode
}

export function BaseAccountProvider({ children }: BaseAccountProviderProps) {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [showAlternateWallets, setShowAlternateWallets] = useState(false)

  // Auto-connect Base Account on mount (no upfront connect flow)
  useEffect(() => {
    const autoConnectBaseAccount = async () => {
      try {
        // Simular auto-conexión del Base Account
        // En la implementación real, esto usaría OnchainKit o Wagmi
        const baseAccount = '0x' + Math.random().toString(16).substr(2, 40)
        setAccount(baseAccount)
        setIsConnected(true)
        
        // Guardar en localStorage para persistencia
        localStorage.setItem('tickmini-base-account', baseAccount)
      } catch (error) {
        console.log('Base Account no disponible:', error)
      }
    }

    // Verificar si ya hay una cuenta guardada
    const savedAccount = localStorage.getItem('tickmini-base-account')
    if (savedAccount) {
      setAccount(savedAccount)
      setIsConnected(true)
    } else {
      autoConnectBaseAccount()
    }
  }, [])

  const connect = async () => {
    setIsConnecting(true)
    
    try {
      // Simular conexión del Base Account
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newAccount = '0x' + Math.random().toString(16).substr(2, 40)
      setAccount(newAccount)
      setIsConnected(true)
      
      localStorage.setItem('tickmini-base-account', newAccount)
    } catch (error) {
      console.error('Error conectando Base Account:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
    setIsConnected(false)
    localStorage.removeItem('tickmini-base-account')
  }

  const switchAccount = async () => {
    setIsConnecting(true)
    
    try {
      // Simular cambio de cuenta
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newAccount = '0x' + Math.random().toString(16).substr(2, 40)
      setAccount(newAccount)
      
      localStorage.setItem('tickmini-base-account', newAccount)
    } catch (error) {
      console.error('Error cambiando cuenta:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const value: BaseAccountContextType = {
    account,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    switchAccount,
    showAlternateWallets,
    setShowAlternateWallets
  }

  return (
    <BaseAccountContext.Provider value={value}>
      {children}
    </BaseAccountContext.Provider>
  )
}

// Componente para mostrar el estado del Base Account
export function BaseAccountStatus() {
  const { account, isConnected, isConnecting, switchAccount, showAlternateWallets, setShowAlternateWallets } = useBaseAccount()

  if (!isConnected) {
    return null
  }

  return (
    <div style={{
      background: 'rgba(0, 255, 255, 0.1)',
      border: '1px solid rgba(0, 255, 255, 0.3)',
      borderRadius: 'clamp(8px, 2vw, 12px)',
      padding: 'clamp(1rem, 2.5vw, 1.5rem)',
      marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)'
      }}>
        <div>
          <h4 style={{
            color: '#00ffff',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: '600',
            margin: '0 0 clamp(0.4rem, 1vw, 0.6rem) 0'
          }}>
            ✅ Base Account Conectado
          </h4>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
            margin: 0,
            fontFamily: 'monospace'
          }}>
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </p>
        </div>
        
        <button
          onClick={switchAccount}
          disabled={isConnecting}
          style={{
            padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 2.5vw, 1.5rem)',
            background: isConnecting 
              ? 'rgba(100, 100, 100, 0.5)'
              : 'linear-gradient(135deg, #00ffff, #0080ff)',
            border: 'none',
            borderRadius: 'clamp(6px, 1.5vw, 8px)',
            color: '#000000',
            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '600',
            cursor: isConnecting ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (!isConnecting) {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.3)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isConnecting) {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }
          }}
        >
          {isConnecting ? '⏳' : '🔄'} Cambiar
        </button>
      </div>

      {/* Alternate Wallets Option */}
      <div style={{
        borderTop: '1px solid rgba(0, 255, 255, 0.2)',
        paddingTop: 'clamp(0.8rem, 2vw, 1.2rem)'
      }}>
        <button
          onClick={() => setShowAlternateWallets(!showAlternateWallets)}
          style={{
            width: '100%',
            padding: 'clamp(0.6rem, 1.5vw, 0.8rem)',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 'clamp(6px, 1.5vw, 8px)',
            color: '#b0b0b0',
            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#b0b0b0'
          }}
        >
          {showAlternateWallets ? '🔼 Ocultar' : '🔽 Mostrar'} Wallets Alternativos
        </button>

        {showAlternateWallets && (
          <div style={{
            marginTop: 'clamp(0.8rem, 2vw, 1.2rem)',
            padding: 'clamp(1rem, 2.5vw, 1.5rem)',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 'clamp(6px, 1.5vw, 8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h5 style={{
              color: '#ffffff',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
              fontWeight: '600',
              margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0'
            }}>
              Wallets Alternativos (Opcional)
            </h5>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'clamp(0.8rem, 2vw, 1.2rem)'
            }}>
              <button style={{
                padding: 'clamp(0.8rem, 2vw, 1rem)',
                background: 'rgba(255, 0, 255, 0.1)',
                border: '1px solid rgba(255, 0, 255, 0.3)',
                borderRadius: 'clamp(6px, 1.5vw, 8px)',
                color: '#ff00ff',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                🦊 MetaMask
              </button>
              <button style={{
                padding: 'clamp(0.8rem, 2vw, 1rem)',
                background: 'rgba(0, 255, 0, 0.1)',
                border: '1px solid rgba(0, 255, 0, 0.3)',
                borderRadius: 'clamp(6px, 1.5vw, 8px)',
                color: '#00ff00',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                🔗 WalletConnect
              </button>
            </div>
            <p style={{
              color: '#b0b0b0',
              fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
              margin: 'clamp(0.8rem, 2vw, 1.2rem) 0 0 0',
              lineHeight: 1.5,
              textAlign: 'center'
            }}>
              💡 Los wallets alternativos son opcionales. Base Account es suficiente para la mayoría de transacciones.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
