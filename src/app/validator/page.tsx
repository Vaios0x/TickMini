'use client'

import React, { useState, useEffect } from 'react'
import { useTicketValidation } from '@/hooks/use-ticket-validation-complex'
import { ValidationNav } from '@/components/layout/validation-nav'
import { useAccount } from 'wagmi'

export default function ValidatorPage() {
  const { address, isConnected } = useAccount()
  const {
    isLoading,
    validationStats,
    useIsAuthorizedValidator
  } = useTicketValidation()

  // Estados locales
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Verificar autorización
  const { data: isAuthorized, isLoading: isCheckingAuth } = useIsAuthorizedValidator()

  // Efectos de fondo
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Si no está conectado
  if (!isConnected) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000, #1a1a2e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.9)',
          borderRadius: '25px',
          padding: '3rem',
          border: '2px solid rgba(255, 165, 0, 0.3)',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
          <h2 style={{
            color: '#ffa500',
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Sistema de Validación
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: '1rem',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            Conecta tu wallet para acceder al sistema de validación de tickets
          </p>
        </div>
      </div>
    )
  }

  // Verificando autorización
  if (isCheckingAuth) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000, #1a1a2e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.9)',
          borderRadius: '25px',
          padding: '3rem',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          maxWidth: '500px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(0, 255, 255, 0.3)',
            borderTop: '4px solid #00ffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 2rem'
          }} />
          <h2 style={{
            color: '#00ffff',
            fontSize: '1.3rem',
            fontWeight: '600'
          }}>
            Verificando permisos de validador...
          </h2>
        </div>
      </div>
    )
  }

  // Si no está autorizado
  if (!isAuthorized) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000, #1a1a2e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.9)',
          borderRadius: '25px',
          padding: '3rem',
          border: '2px solid rgba(255, 0, 0, 0.3)',
          maxWidth: '600px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚫</div>
          <h2 style={{
            color: '#ff4444',
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Acceso Denegado
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: '1rem',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            Tu wallet no tiene permisos de validador. Solo usuarios autorizados pueden acceder a esta sección.
          </p>
          <div style={{
            background: 'rgba(255, 68, 68, 0.1)',
            border: '1px solid rgba(255, 68, 68, 0.3)',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <p style={{
              color: '#ff6b6b',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              margin: 0
            }}>
              <strong>Wallet actual:</strong> {address?.slice(0, 8)}...{address?.slice(-6)}
            </p>
          </div>
          <p style={{
            color: '#888',
            fontSize: '0.8rem'
          }}>
            Contacta al administrador del sistema para obtener permisos de validador.
          </p>
        </div>
      </div>
    )
  }

  // Si está autorizado - Página principal del validador
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Cursor glow effect */}
      <div style={{
        position: 'fixed',
        top: mousePosition.y - 150,
        left: mousePosition.x - 150,
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'all 0.1s ease'
      }} />

      {/* Grid background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite',
          pointerEvents: 'none'
        }} 
      />

      {/* Partículas flotantes */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * 15) % 100}%`,
            top: `${(i * 13) % 100}%`,
            width: '3px',
            height: '3px',
            background: `hsl(${i * 60}, 100%, 70%)`,
            borderRadius: '50%',
            filter: 'blur(1px)',
            animation: `float-particle ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Contenido principal */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Hero Section */}
        <section style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 6vw, 5rem)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.85) 100%)',
            borderRadius: '25px',
            padding: 'clamp(2rem, 5vw, 4rem)',
            border: '2px solid rgba(0, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Efecto de brillo */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #ffff00 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 'clamp(1rem, 3vw, 2rem)',
                lineHeight: '1.1'
              }}>
                🔍 Sistema de Validación
              </h1>

              <p style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                color: '#b0b0b0',
                maxWidth: '800px',
                margin: '0 auto clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.6'
              }}>
                Centro de control para validadores autorizados. Administra, valida y supervisa 
                tickets NFT con herramientas profesionales.
              </p>

              {/* Dashboard de estadísticas */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 'clamp(1rem, 3vw, 2rem)',
                marginBottom: 'clamp(2rem, 4vw, 3rem)'
              }}>
                {[
                  { 
                    icon: '🔍', 
                    value: validationStats.totalValidations, 
                    label: 'Validaciones Totales',
                    color: '#00ffff'
                  },
                  { 
                    icon: '✅', 
                    value: validationStats.validTickets, 
                    label: 'Tickets Válidos',
                    color: '#00ff00'
                  },
                  { 
                    icon: '❌', 
                    value: validationStats.invalidTickets, 
                    label: 'Tickets Inválidos',
                    color: '#ff0000'
                  },
                  { 
                    icon: '⏰', 
                    value: validationStats.recentValidations.length, 
                    label: 'Recientes',
                    color: '#ffaa00'
                  }
                ].map((stat, index) => (
                  <div key={index} style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    border: `1px solid ${stat.color}33`,
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}>
                    <div style={{
                      fontSize: '2rem',
                      marginBottom: '0.5rem',
                      filter: `drop-shadow(0 0 10px ${stat.color}80)`
                    }}>
                      {stat.icon}
                    </div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: stat.color,
                      marginBottom: '0.5rem',
                      textShadow: `0 0 10px ${stat.color}60`
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#b0b0b0',
                      fontWeight: '500'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Info de validador */}
              <div style={{
                background: 'rgba(0, 255, 0, 0.1)',
                border: '1px solid rgba(0, 255, 0, 0.3)',
                borderRadius: '15px',
                padding: '1.5rem',
                marginTop: '2rem'
              }}>
                <h3 style={{
                  color: '#00ff00',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <span>✅</span>
                  Validador Autorizado
                </h3>
                <p style={{
                  color: '#b0b0b0',
                  fontSize: '0.9rem',
                  margin: 0,
                  fontFamily: 'monospace'
                }}>
                  Wallet: {address?.slice(0, 8)}...{address?.slice(-6)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navegación de Validador */}
        <ValidationNav currentPath="/validator" />

        {/* Sección de próximas funciones */}
        <section style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: '#00ffff',
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            🚧 Módulo en Desarrollo
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: '1rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Esta página está preparada para futuras funcionalidades de validación avanzadas. 
            Mientras tanto, puedes usar las herramientas de validación disponibles en el menú de navegación.
          </p>
        </section>
      </div>

      {/* Estilos CSS */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(90deg); }
          50% { transform: translateY(-5px) rotate(180deg); }
          75% { transform: translateY(-15px) rotate(270deg); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}