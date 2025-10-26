'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useComposeCast, useViewCast, useOpenUrl } from '@coinbase/onchainkit/minikit'
import { useAuthenticatedContext } from '@/hooks/use-authenticated-context'

interface OptimizedOnboardingProps {
  onComplete: () => void
  onSkip: () => void
}

export function OptimizedOnboarding({ onComplete, onSkip }: OptimizedOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)
  const [userContext, setUserContext] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const { isAuthenticated, user } = useAuthenticatedContext()
  const { composeCast } = useComposeCast()
  const { viewCast } = useViewCast()
  const { openUrl } = useOpenUrl()

  // Verificar si el usuario ya ha visto el onboarding
  useEffect(() => {
    const hasSeen = localStorage.getItem('tickmini-onboarding-optimized-seen')
    setHasSeenOnboarding(hasSeen === 'true')
  }, [])

  // Cargar contexto del usuario para personalización instantánea
  useEffect(() => {
    const loadUserContext = async () => {
      try {
        // Simular carga de contexto del usuario desde MiniKit
        const context = {
          fid: Math.floor(Math.random() * 1000000),
          username: 'user' + Math.floor(Math.random() * 1000),
          displayName: 'Usuario TickMini',
          pfpUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Math.random(),
          bio: 'Usuario de TickMini en Base Network',
          location: 'feed' // o 'messaging' para DMs
        }
        setUserContext(context)
      } catch (error) {
        console.log('Error cargando contexto:', error)
      }
    }

    loadUserContext()
  }, [])

  // Pasos del onboarding optimizado
  const steps = [
    {
      id: 'welcome',
      title: '¡Bienvenido a TickMini!',
      description: 'Descubre eventos increíbles y obtén tickets NFT únicos en Base Network',
      cta: 'Explorar Eventos',
      action: 'explore',
      showValue: true
    },
    {
      id: 'demo',
      title: 'Explora sin límites',
      description: 'Navega por eventos, ve detalles y descubre lo que te interesa',
      cta: 'Ver Eventos Destacados',
      action: 'demo',
      showValue: true
    },
    {
      id: 'personalize',
      title: 'Personaliza tu experiencia',
      description: 'Conecta tu cuenta para guardar tus eventos favoritos y recibir notificaciones',
      cta: 'Conectar Cuenta',
      action: 'authenticate',
      showValue: true,
      requiresAuth: true
    }
  ]

  const handleStepAction = async (action: string) => {
    setIsLoading(true)

    try {
      switch (action) {
        case 'explore':
          // Mostrar valor inmediato - eventos destacados
          await new Promise(resolve => setTimeout(resolve, 1000))
          setCurrentStep(1)
          break

        case 'demo':
          // Demostrar funcionalidad sin autenticación
          await new Promise(resolve => setTimeout(resolve, 1500))
          setCurrentStep(2)
          break

        case 'authenticate':
          // Solo autenticar cuando sea necesario
          if (!isAuthenticated) {
            // Trigger SIWF/Quick Auth solo cuando sea necesario
            await new Promise(resolve => setTimeout(resolve, 2000))
          }
          setCurrentStep(3)
          break

        case 'celebrate':
          // Celebrar y amplificar
          await handleCelebration()
          break

        default:
          break
      }
    } catch (error) {
      console.error('Error en acción:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCelebration = async () => {
    // Celebrar éxito y ofrecer acciones sociales
    try {
      // Componer cast de celebración
      if (composeCast) {
        await composeCast({
          text: `¡Acabo de descubrir TickMini! 🎫 Una plataforma increíble para tickets NFT en Base Network. ¡Explora eventos únicos!`,
          embeds: [window.location.href]
        })
      }

      // Marcar onboarding como completado
      localStorage.setItem('tickmini-onboarding-optimized-seen', 'true')
      localStorage.setItem('tickmini-onboarding-completed', 'true')
      
      onComplete()
    } catch (error) {
      console.error('Error en celebración:', error)
      onComplete()
    }
  }

  const handleSkip = () => {
    localStorage.setItem('tickmini-onboarding-optimized-seen', 'true')
    onSkip()
  }

  // No mostrar onboarding si ya se ha visto
  if (hasSeenOnboarding) {
    return null
  }

  const currentStepData = steps[currentStep]

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(1rem, 2vw, 2rem)'
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.9)',
        borderRadius: 'clamp(15px, 4vw, 25px)',
        padding: 'clamp(2rem, 4vw, 3rem)',
        border: '2px solid rgba(0, 255, 255, 0.3)',
        boxShadow: '0 20px 40px rgba(0, 255, 255, 0.1)',
        textAlign: 'center'
      }}>
        {/* Progress Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(0.5rem, 1.2vw, 0.8rem)',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          {steps.map((_, index) => (
            <div
              key={index}
              style={{
                width: 'clamp(8px, 2vw, 12px)',
                height: 'clamp(8px, 2vw, 12px)',
                borderRadius: '50%',
                background: index <= currentStep ? '#00ffff' : 'rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Step Content */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <h2 style={{
            color: '#00ffff',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: '700',
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {currentStepData.title}
          </h2>
          
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            margin: '0 0 clamp(1.5rem, 3vw, 2rem) 0',
            lineHeight: 1.6
          }}>
            {currentStepData.description}
          </p>

          {/* Personalized Context */}
          {userContext && (
            <div style={{
              background: 'rgba(0, 255, 255, 0.1)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.8rem, 2vw, 1.2rem)',
                justifyContent: 'center'
              }}>
                <img
                  src={userContext.pfpUrl}
                  alt="Avatar"
                  style={{
                    width: 'clamp(40px, 10vw, 60px)',
                    height: 'clamp(40px, 10vw, 60px)',
                    borderRadius: '50%',
                    border: '2px solid #00ffff'
                  }}
                />
                <div>
                  <div style={{
                    color: '#ffffff',
                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                    fontWeight: '600',
                    marginBottom: 'clamp(0.2rem, 0.5vw, 0.4rem)'
                  }}>
                    ¡Hola, {userContext.displayName}!
                  </div>
                  <div style={{
                    color: '#b0b0b0',
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)'
                  }}>
                    Personalizando tu experiencia...
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Value Demonstration */}
          {currentStepData.showValue && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
            }}>
              <h4 style={{
                color: '#00ffff',
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                fontWeight: '600',
                margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0'
              }}>
                🎯 Valor Inmediato
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 'clamp(0.8rem, 2vw, 1.2rem)'
              }}>
                <div style={{
                  textAlign: 'center',
                  padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                  background: 'rgba(0, 255, 255, 0.1)',
                  borderRadius: 'clamp(6px, 1.5vw, 8px)',
                  border: '1px solid rgba(0, 255, 255, 0.3)'
                }}>
                  <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)' }}>🎫</div>
                  <div style={{ color: '#00ffff', fontSize: 'clamp(0.8rem, 2vw, 1rem)', fontWeight: '600' }}>Tickets NFT</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                  background: 'rgba(0, 255, 255, 0.1)',
                  borderRadius: 'clamp(6px, 1.5vw, 8px)',
                  border: '1px solid rgba(0, 255, 255, 0.3)'
                }}>
                  <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)' }}>⚡</div>
                  <div style={{ color: '#00ffff', fontSize: 'clamp(0.8rem, 2vw, 1rem)', fontWeight: '600' }}>Transacciones Rápidas</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                  background: 'rgba(0, 255, 255, 0.1)',
                  borderRadius: 'clamp(6px, 1.5vw, 8px)',
                  border: '1px solid rgba(0, 255, 255, 0.3)'
                }}>
                  <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)' }}>🔒</div>
                  <div style={{ color: '#00ffff', fontSize: 'clamp(0.8rem, 2vw, 1rem)', fontWeight: '600' }}>Seguridad Blockchain</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(0.8rem, 2vw, 1.2rem)'
        }}>
          <button
            onClick={() => handleStepAction(currentStepData.action)}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: 'clamp(1rem, 2.5vw, 1.5rem)',
              background: isLoading 
                ? 'rgba(100, 100, 100, 0.5)'
                : 'linear-gradient(135deg, #00ffff, #0080ff)',
              border: 'none',
              borderRadius: 'clamp(8px, 2vw, 12px)',
              color: '#000000',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              fontWeight: '700',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.5rem, 1.2vw, 0.8rem)'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: 'clamp(16px, 4vw, 20px)',
                  height: 'clamp(16px, 4vw, 20px)',
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  borderTop: '2px solid #000000',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Procesando...
              </>
            ) : (
              <>
                {currentStepData.requiresAuth && !isAuthenticated ? '🔐 ' : '🚀 '}
                {currentStepData.cta}
              </>
            )}
          </button>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            style={{
              width: '100%',
              padding: 'clamp(0.8rem, 2vw, 1rem)',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 'clamp(6px, 1.5vw, 8px)',
              color: '#b0b0b0',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
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
            Omitir por ahora
          </button>
        </div>

        {/* Step-specific guidance */}
        {currentStepData.requiresAuth && !isAuthenticated && (
          <div style={{
            marginTop: 'clamp(1.5rem, 3vw, 2rem)',
            padding: 'clamp(1rem, 2.5vw, 1.5rem)',
            background: 'rgba(255, 170, 0, 0.1)',
            border: '1px solid rgba(255, 170, 0, 0.3)',
            borderRadius: 'clamp(8px, 2vw, 12px)'
          }}>
            <p style={{
              color: '#ffaa00',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              margin: 0,
              lineHeight: 1.5,
              textAlign: 'center'
            }}>
              💡 <strong>¿Por qué conectar?</strong> Para guardar tus eventos favoritos y recibir notificaciones personalizadas
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
