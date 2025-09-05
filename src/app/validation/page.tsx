'use client'

import React, { useState, useEffect } from 'react'
import { useTicketValidation } from '@/hooks/use-ticket-validation'
import { TicketValidator } from '@/components/ui/ticket-validator'
import { ValidationHistoryAdvanced } from '@/components/ui/validation-history-advanced'
import { ValidationNav } from '@/components/layout/validation-nav'
import { useAccount } from 'wagmi'

export default function ValidationPage() {
  const { address, isConnected } = useAccount()
  const {
    isLoading,
    isValidating,
    error,
    validationHistory,
    validationStats,
    scannedTickets,
    currentTicketInfo,
    useIsAuthorizedValidator,
    exportValidationData,
    clearHistory,
    clearStats,
    clearScannedTickets
  } = useTicketValidation()

  // Estados locales
  const [activeTab, setActiveTab] = useState<'validator' | 'history' | 'analytics'>('validator')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showWelcome, setShowWelcome] = useState(true)

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

  // Ocultar welcome después de un tiempo
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Función para manejar validaciones completadas
  const handleValidationComplete = (result: any) => {
    console.log('Validación completada:', result)
  }

  // Función para manejar errores
  const handleError = (errorMessage: string) => {
    console.error('Error de validación:', errorMessage)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #000000 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efectos de fondo dinámicos */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${window.innerWidth - mousePosition.x}px ${window.innerHeight - mousePosition.y}px, rgba(255, 0, 255, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          transition: 'all 0.1s ease'
        }} 
      />

      {/* Patrón de cuadrícula */}
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
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * 13) % 100}%`,
            top: `${(i * 11) % 100}%`,
            width: '4px',
            height: '4px',
            background: `hsl(${i * 45}, 100%, 70%)`,
            borderRadius: '50%',
            filter: 'blur(1px)',
            animation: `float-particle ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
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
                🔍 Centro de Validación
              </h1>

              <p style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                color: '#b0b0b0',
                maxWidth: '800px',
                margin: '0 auto clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.6'
              }}>
                Sistema profesional de validación de tickets NFT con tecnología blockchain. 
                Valida, gestiona y analiza tickets de forma segura y eficiente.
              </p>

              {/* Dashboard de estadísticas */}
              {isConnected && isAuthorized && (
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
                      icon: '📱', 
                      value: scannedTickets.length, 
                      label: 'QR Escaneados',
                      color: '#ffff00'
                    }
                  ].map((stat, index) => (
                    <div key={index} style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: '15px',
                      padding: 'clamp(1rem, 3vw, 1.5rem)',
                      border: `1px solid ${stat.color}40`,
                      textAlign: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement
                      target.style.transform = 'translateY(-5px)'
                      target.style.borderColor = `${stat.color}80`
                      target.style.boxShadow = `0 10px 30px ${stat.color}30`
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement
                      target.style.transform = 'translateY(0)'
                      target.style.borderColor = `${stat.color}40`
                      target.style.boxShadow = 'none'
                    }}
                    >
                      <div style={{ 
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                        marginBottom: '0.5rem' 
                      }}>
                        {stat.icon}
                      </div>
                      <div style={{ 
                        color: stat.color, 
                        fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                        fontWeight: '700',
                        marginBottom: '0.25rem'
                      }}>
                        {stat.value}
                      </div>
                      <div style={{ 
                        color: '#ffffff',
                        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                        fontWeight: '500'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mensaje de bienvenida para nuevos validadores */}
        {showWelcome && isConnected && isAuthorized && validationStats.totalValidations === 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 200, 0, 0.1))',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px solid rgba(0, 255, 0, 0.3)',
            textAlign: 'center',
            marginBottom: '2rem',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
            <h3 style={{
              color: '#00ff00',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              ¡Bienvenido al Centro de Validación!
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: '1rem',
              lineHeight: '1.6'
            }}>
              Como validador autorizado, puedes verificar la autenticidad de tickets NFT. 
              Comienza escaneando un código QR o ingresando manualmente un Token ID.
            </p>
          </div>
        )}

        {/* Navegación de Validador */}
        {isConnected && isAuthorized && (
          <ValidationNav currentPath="/validation" />
        )}

        {/* Navegación por pestañas */}
        {isConnected && isAuthorized && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '20px',
              padding: '0.5rem',
              border: '2px solid rgba(0, 255, 255, 0.2)',
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => setActiveTab('validator')}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  border: 'none',
                  background: activeTab === 'validator' 
                    ? 'linear-gradient(135deg, #00ffff, #0080ff)'
                    : 'transparent',
                  color: activeTab === 'validator' ? '#ffffff' : '#b0b0b0',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                🔍 Validador
              </button>

              <button
                onClick={() => setActiveTab('history')}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  border: 'none',
                  background: activeTab === 'history' 
                    ? 'linear-gradient(135deg, #ff00ff, #8000ff)'
                    : 'transparent',
                  color: activeTab === 'history' ? '#ffffff' : '#b0b0b0',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                📋 Historial ({validationHistory.length})
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  border: 'none',
                  background: activeTab === 'analytics' 
                    ? 'linear-gradient(135deg, #ffff00, #ffa500)'
                    : 'transparent',
                  color: activeTab === 'analytics' ? '#000000' : '#b0b0b0',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                📊 Analytics
              </button>
            </div>
          </div>
        )}

        {/* Verificación de estado de usuario */}
        {!isConnected && (
          <div style={{
            background: 'rgba(255, 165, 0, 0.1)',
            borderRadius: '20px',
            padding: '3rem',
            border: '2px solid rgba(255, 165, 0, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔗</div>
            <h3 style={{
              color: '#ffa500',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              Conecta tu Wallet
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: '1rem',
              lineHeight: '1.6'
            }}>
              Para acceder al sistema de validación, conecta tu wallet de Base Network.
            </p>
          </div>
        )}

        {isConnected && isCheckingAuth && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#b0b0b0'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <div>Verificando permisos de validador...</div>
          </div>
        )}

        {isConnected && !isCheckingAuth && !isAuthorized && (
          <div style={{
            background: 'rgba(255, 0, 0, 0.1)',
            borderRadius: '20px',
            padding: '3rem',
            border: '2px solid rgba(255, 0, 0, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{
              color: '#ff6b6b',
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              Acceso Denegado
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: '1rem',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Tu dirección wallet no está autorizada como validador. Solo validadores autorizados 
              pueden acceder al sistema de validación. Contacta al administrador para solicitar acceso.
            </p>
          </div>
        )}

        {/* Contenido principal según la pestaña activa */}
        {isConnected && isAuthorized && (
          <>
            {activeTab === 'validator' && (
              <TicketValidator
                mode="single"
                onValidationComplete={handleValidationComplete}
                onError={handleError}
              />
            )}

            {activeTab === 'history' && (
              <ValidationHistoryAdvanced
                history={validationHistory}
                stats={validationStats}
                onExport={exportValidationData}
                onClear={clearHistory}
                onViewDetails={(record) => {
                  console.log('Ver detalles:', record)
                }}
              />
            )}

            {activeTab === 'analytics' && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 0, 0.05) 0%, rgba(255, 165, 0, 0.05) 100%)',
                borderRadius: '25px',
                padding: '2rem',
                border: '2px solid rgba(255, 255, 0, 0.2)',
                backdropFilter: 'blur(20px)'
              }}>
                <h2 style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #ffff00, #ffa500)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  📊 Analytics Avanzado
                </h2>

                {/* Analytics completo */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem'
                }}>
                  {/* Tasa de éxito */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '15px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 0, 0.2)'
                  }}>
                    <h3 style={{ color: '#ffff00', marginBottom: '1rem' }}>
                      ✅ Tasa de Éxito
                    </h3>
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: '700',
                      color: '#00ff00',
                      textAlign: 'center'
                    }}>
                      {validationStats.totalValidations > 0 
                        ? ((validationStats.validTickets / validationStats.totalValidations) * 100).toFixed(1)
                        : '0'
                      }%
                    </div>
                  </div>

                  {/* Validaciones recientes */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '15px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 0, 0.2)'
                  }}>
                    <h3 style={{ color: '#ffff00', marginBottom: '1rem' }}>
                      🕐 Validaciones Recientes
                    </h3>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {validationStats.recentValidations.slice(0, 5).map((validation, index) => (
                        <div key={index} style={{
                          padding: '0.5rem',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ color: '#ffffff' }}>
                            #{validation.tokenId}
                          </span>
                          <span style={{
                            color: validation.isValid ? '#00ff00' : '#ff0000'
                          }}>
                            {validation.isValid ? '✅' : '❌'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tickets escaneados */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '15px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 0, 0.2)'
                  }}>
                    <h3 style={{ color: '#ffff00', marginBottom: '1rem' }}>
                      📱 QR Escaneados
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      {scannedTickets.slice(0, 6).map((ticket, index) => (
                        <div key={index} style={{
                          background: 'rgba(0, 255, 255, 0.2)',
                          borderRadius: '8px',
                          padding: '0.5rem',
                          color: '#00ffff',
                          fontSize: '0.8rem',
                          fontFamily: 'monospace'
                        }}>
                          #{ticket.tokenId}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Información adicional para validadores */}
        {isConnected && isAuthorized && (
          <section style={{
            marginTop: '4rem',
            background: 'linear-gradient(135deg, rgba(0, 50, 50, 0.3), rgba(50, 0, 50, 0.3))',
            borderRadius: '25px',
            padding: '3rem 2rem',
            border: '2px solid rgba(0, 255, 255, 0.2)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '2rem'
            }}>
              🛡️ Sistema de Validación Blockchain
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {[
                {
                  icon: '🔗',
                  title: 'Base Network',
                  description: 'Validación descentralizada en la blockchain de Base'
                },
                {
                  icon: '⚡',
                  title: 'Tiempo Real',
                  description: 'Verificación instantánea con confirmación blockchain'
                },
                {
                  icon: '📊',
                  title: 'Analytics',
                  description: 'Métricas completas de rendimiento y estadísticas'
                },
                {
                  icon: '🛡️',
                  title: 'Seguridad',
                  description: 'Máxima seguridad con contratos auditados'
                }
              ].map((feature, index) => (
                <div key={index} style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '15px',
                  padding: '2rem',
                  border: '1px solid rgba(0, 255, 255, 0.2)'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    {feature.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '1rem'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: '#b0b0b0',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% { 
            opacity: 0.8;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  )
}