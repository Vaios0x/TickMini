'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'

interface InAppAuthProps {
  onAuthSuccess: (user: any) => void
  onAuthError: (error: string) => void
  children: React.ReactNode
}

export function InAppAuthentication({ 
  onAuthSuccess, 
  onAuthError, 
  children 
}: InAppAuthProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authMethod, setAuthMethod] = useState<'quick-auth' | 'wallet' | null>(null)

  // Verificar si estamos en Base app
  const isInBaseApp = typeof window !== 'undefined' && 
    (window.location.href.includes('base.app') || 
     window.navigator.userAgent.includes('Base'))

  useEffect(() => {
    if (isInBaseApp) {
      // Auto-detección de método de autenticación en Base app
      setAuthMethod('quick-auth')
    }
  }, [isInBaseApp])

  const handleQuickAuth = async () => {
    setIsAuthenticating(true)
    
    try {
      // Simular Quick Auth sin redirects externos
      const user = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // 90% success rate
            resolve({
              fid: Math.floor(Math.random() * 1000000),
              username: 'user' + Math.floor(Math.random() * 1000),
              displayName: 'Usuario TickMini',
              pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Math.random(),
              bio: 'Usuario de TickMini en Base Network'
            })
          } else {
            reject(new Error('Error en Quick Auth'))
          }
        }, 2000)
      })

      onAuthSuccess(user)
    } catch (error) {
      onAuthError(error instanceof Error ? error.message : 'Error en autenticación')
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleWalletAuth = async () => {
    setIsAuthenticating(true)
    
    try {
      // Simular autenticación con wallet sin redirects
      const user = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // 90% success rate
            resolve({
              address: '0x' + Math.random().toString(16).substr(2, 40),
              fid: Math.floor(Math.random() * 1000000),
              username: 'wallet' + Math.floor(Math.random() * 1000),
              displayName: 'Usuario Wallet',
              pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Math.random(),
              bio: 'Usuario con wallet conectada'
            })
          } else {
            reject(new Error('Error en conexión de wallet'))
          }
        }, 1500)
      })

      onAuthSuccess(user)
    } catch (error) {
      onAuthError(error instanceof Error ? error.message : 'Error en conexión de wallet')
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <div style={{
      background: 'rgba(0, 255, 255, 0.05)',
      border: '2px solid rgba(0, 255, 255, 0.3)',
      borderRadius: 'clamp(12px, 3vw, 20px)',
      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
      marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        paddingBottom: 'clamp(1rem, 2vw, 1.5rem)',
        borderBottom: '2px solid rgba(0, 255, 255, 0.2)'
      }}>
        <h3 style={{
          color: '#00ffff',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: '700',
          margin: '0 0 clamp(0.5rem, 1vw, 0.8rem) 0',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          🔐 In-App Authentication
        </h3>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
          margin: 0,
          lineHeight: 1.5
        }}>
          Autenticación sin redirects externos - Permanece en Base app
        </p>
      </div>

      {/* Base App Detection */}
      <div style={{
        background: isInBaseApp ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 170, 0, 0.1)',
        border: `2px solid ${isInBaseApp ? '#00ff00' : '#ffaa00'}`,
        borderRadius: 'clamp(8px, 2vw, 12px)',
        padding: 'clamp(1rem, 2.5vw, 1.5rem)',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)'
        }}>
          {isInBaseApp ? '✅' : '⚠️'}
        </div>
        <h4 style={{
          color: isInBaseApp ? '#00ff00' : '#ffaa00',
          fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
          fontWeight: '600',
          margin: '0 0 clamp(0.5rem, 1vw, 0.8rem) 0'
        }}>
          {isInBaseApp ? 'Base App Detectada' : 'Base App No Detectada'}
        </h4>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          margin: 0,
          lineHeight: 1.5
        }}>
          {isInBaseApp 
            ? 'Optimizado para Base app - Sin redirects externos'
            : 'Funciona en cualquier cliente - Compatible con Base app'
          }
        </p>
      </div>

      {/* Authentication Methods */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1rem, 2.5vw, 1.5rem)'
      }}>
        {/* Quick Auth */}
        <button
          onClick={handleQuickAuth}
          disabled={isAuthenticating}
          style={{
            width: '100%',
            padding: 'clamp(1rem, 2.5vw, 1.5rem)',
            background: isAuthenticating 
              ? 'rgba(100, 100, 100, 0.5)'
              : 'linear-gradient(135deg, #00ffff, #0080ff)',
            border: 'none',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            color: '#000000',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: '700',
            cursor: isAuthenticating ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.5rem, 1.2vw, 0.8rem)'
          }}
          onMouseEnter={(e) => {
            if (!isAuthenticating) {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.4)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isAuthenticating) {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }
          }}
        >
          {isAuthenticating && authMethod === 'quick-auth' ? (
            <>
              <div style={{
                width: 'clamp(16px, 4vw, 20px)',
                height: 'clamp(16px, 4vw, 20px)',
                border: '2px solid rgba(0, 0, 0, 0.1)',
                borderTop: '2px solid #000000',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Autenticando...
            </>
          ) : (
            <>
              ⚡ Quick Auth
            </>
          )}
        </button>

        {/* Wallet Auth */}
        <button
          onClick={handleWalletAuth}
          disabled={isAuthenticating}
          style={{
            width: '100%',
            padding: 'clamp(1rem, 2.5vw, 1.5rem)',
            background: isAuthenticating 
              ? 'rgba(100, 100, 100, 0.5)'
              : 'linear-gradient(135deg, #ff00ff, #8000ff)',
            border: 'none',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            color: '#ffffff',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: '700',
            cursor: isAuthenticating ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.5rem, 1.2vw, 0.8rem)'
          }}
          onMouseEnter={(e) => {
            if (!isAuthenticating) {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 0, 255, 0.4)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isAuthenticating) {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }
          }}
        >
          {isAuthenticating && authMethod === 'wallet' ? (
            <>
              <div style={{
                width: 'clamp(16px, 4vw, 20px)',
                height: 'clamp(16px, 4vw, 20px)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderTop: '2px solid #ffffff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Conectando...
            </>
          ) : (
            <>
              🦊 Wallet Connect
            </>
          )}
        </button>
      </div>

      {/* Features */}
      <div style={{
        marginTop: 'clamp(1.5rem, 3vw, 2rem)',
        padding: 'clamp(1rem, 2.5vw, 1.5rem)',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 'clamp(8px, 2vw, 12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h4 style={{
          color: '#00ffff',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          fontWeight: '600',
          margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0',
          textAlign: 'center'
        }}>
          ✅ Características de In-App Authentication
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(0.8rem, 2vw, 1.2rem)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
            padding: 'clamp(0.6rem, 1.5vw, 0.8rem)',
            background: 'rgba(0, 255, 0, 0.1)',
            borderRadius: 'clamp(4px, 1vw, 6px)',
            border: '1px solid rgba(0, 255, 0, 0.3)'
          }}>
            <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>🚫</span>
            <span style={{
              color: '#00ff00',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '500'
            }}>
              Sin redirects externos
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
            padding: 'clamp(0.6rem, 1.5vw, 0.8rem)',
            background: 'rgba(0, 255, 0, 0.1)',
            borderRadius: 'clamp(4px, 1vw, 6px)',
            border: '1px solid rgba(0, 255, 0, 0.3)'
          }}>
            <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>📱</span>
            <span style={{
              color: '#00ff00',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '500'
            }}>
              Sin verificación email/teléfono
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
            padding: 'clamp(0.6rem, 1.5vw, 0.8rem)',
            background: 'rgba(0, 255, 0, 0.1)',
            borderRadius: 'clamp(4px, 1vw, 6px)',
            border: '1px solid rgba(0, 255, 0, 0.3)'
          }}>
            <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>🔍</span>
            <span style={{
              color: '#00ff00',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              fontWeight: '500'
            }}>
              Exploración antes de sign-in
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        marginTop: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        {children}
      </div>
    </div>
  )
}
