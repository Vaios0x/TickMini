'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { OptimizedOnboarding } from '@/components/onboarding/optimized-onboarding'
import { BaseAccountProvider, BaseAccountStatus } from '@/components/wallet/base-account-provider'
import { ActivationMetricsProvider, ActivationMetricsDisplay } from '@/components/analytics/activation-metrics'
import { useActivationMetrics } from '@/components/analytics/activation-metrics'
import { useComposeCast, useViewCast, useOpenUrl } from '@coinbase/onchainkit/minikit'

function OnboardingDemoContent() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingCompleted, setOnboardingCompleted] = useState(false)
  const { trackFirstRender, trackIntentClick, trackAuthPrompt, trackSuccess, trackShare, trackSave } = useActivationMetrics()
  const { composeCast } = useComposeCast()
  const { viewCast } = useViewCast()
  const { openUrl } = useOpenUrl()

  // Track first render
  useEffect(() => {
    trackFirstRender()
  }, [trackFirstRender])

  const handleStartOnboarding = () => {
    setShowOnboarding(true)
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setOnboardingCompleted(true)
    trackSuccess('onboarding-completed')
  }

  const handleOnboardingSkip = () => {
    setShowOnboarding(false)
  }

  const handleIntentClick = (action: string) => {
    trackIntentClick(action)
  }

  const handleAuthPrompt = () => {
    trackAuthPrompt()
  }

  const handleShare = async () => {
    try {
      if (composeCast) {
        await composeCast({
          text: '¡Acabo de completar el onboarding de TickMini! 🎫 Una experiencia increíble para tickets NFT en Base Network.',
          embeds: [window.location.href]
        })
        trackShare()
      }
    } catch (error) {
      console.error('Error compartiendo:', error)
    }
  }

  const handleSave = () => {
    trackSave()
    alert('App guardada en favoritos!')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: 'clamp(1rem, 2vw, 2rem)',
      color: '#ffffff'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          background: 'rgba(0, 255, 255, 0.1)',
          borderRadius: 'clamp(15px, 4vw, 25px)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 255, 255, 0.1)'
        }}>
          <h1 style={{
            color: '#00ffff',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
          }}>
            🚀 Onboarding Optimizado
          </h1>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '800px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Demostración de las mejores prácticas de onboarding para Mini Apps en Base
          </p>
        </div>

        {/* Onboarding Trigger */}
        {!onboardingCompleted && (
          <div style={{
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            textAlign: 'center'
          }}>
            <button
              onClick={handleStartOnboarding}
              style={{
                padding: 'clamp(1.2rem, 3vw, 1.8rem) clamp(2rem, 5vw, 3rem)',
                background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                border: 'none',
                borderRadius: 'clamp(12px, 3vw, 20px)',
                color: '#000000',
                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.3)'
              }}
            >
              🚀 Iniciar Onboarding Optimizado
            </button>
          </div>
        )}

        {/* Base Account Status */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <BaseAccountStatus />
        </div>

        {/* Activation Metrics */}
        <div style={{
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <ActivationMetricsDisplay />
        </div>

        {/* Onboarding Best Practices */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          borderRadius: 'clamp(12px, 3vw, 20px)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          marginBottom: 'clamp(2rem, 4vw, 3rem)'
        }}>
          <h2 style={{
            color: '#00ffff',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: '700',
            margin: '0 0 clamp(1.5rem, 3vw, 2rem) 0',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            📋 Mejores Prácticas de Onboarding
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            {[
              {
                title: 'Valor Inmediato',
                description: 'Mostrar valor sin autenticación',
                icon: '⚡',
                practices: [
                  'Demo content visible',
                  'Sample state disponible',
                  'Read-only mode funcional',
                  'Personalización instantánea'
                ]
              },
              {
                title: 'Autenticación Progresiva',
                description: 'Auth solo cuando sea necesario',
                icon: '🔐',
                practices: [
                  'SIWF/Quick Auth cuando se requiera',
                  'Base Account por defecto',
                  'Wallets alternativos opcionales',
                  'Exploración antes de sign-in'
                ]
              },
              {
                title: 'Celebración y Amplificación',
                description: 'Acciones sociales post-éxito',
                icon: '🎉',
                practices: [
                  'Prompt de compartir',
                  'Guardar en favoritos',
                  'Siguiente paso claro',
                  'Optimización de descubrimiento'
                ]
              }
            ].map((practice, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(0, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 255, 255, 0.2)',
                  borderRadius: 'clamp(10px, 2vw, 15px)',
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 255, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                  textAlign: 'center'
                }}>
                  {practice.icon}
                </div>
                <h3 style={{
                  color: '#00ffff',
                  fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                  fontWeight: '700',
                  margin: '0 0 clamp(0.8rem, 2vw, 1.2rem) 0',
                  textAlign: 'center'
                }}>
                  {practice.title}
                </h3>
                <p style={{
                  color: '#b0b0b0',
                  fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                  margin: '0 0 clamp(1rem, 2.5vw, 1.5rem) 0',
                  lineHeight: 1.6,
                  textAlign: 'center'
                }}>
                  {practice.description}
                </p>
                <ul style={{
                  color: '#e0e0e0',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  lineHeight: 1.6,
                  margin: 0,
                  paddingLeft: 'clamp(1rem, 2.5vw, 1.5rem)'
                }}>
                  {practice.practices.map((item, itemIndex) => (
                    <li key={itemIndex} style={{ marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Post-Onboarding Actions */}
        {onboardingCompleted && (
          <div style={{
            background: 'rgba(0, 255, 0, 0.1)',
            border: '2px solid rgba(0, 255, 0, 0.3)',
            borderRadius: 'clamp(12px, 3vw, 20px)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            textAlign: 'center',
            marginBottom: 'clamp(2rem, 4vw, 3rem)'
          }}>
            <h2 style={{
              color: '#00ff00',
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              fontWeight: '700',
              margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0'
            }}>
              🎉 ¡Onboarding Completado!
            </h2>
            <p style={{
              color: '#b0b0b0',
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              margin: '0 0 clamp(1.5rem, 3vw, 2rem) 0',
              lineHeight: 1.6
            }}>
              Ahora puedes celebrar y amplificar tu experiencia
            </p>
            
            <div style={{
              display: 'flex',
              gap: 'clamp(1rem, 2.5vw, 1.5rem)',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={handleShare}
                style={{
                  padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(2rem, 5vw, 3rem)',
                  background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                  border: 'none',
                  borderRadius: 'clamp(8px, 2vw, 12px)',
                  color: '#000000',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                📤 Compartir Experiencia
              </button>
              
              <button
                onClick={handleSave}
                style={{
                  padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(2rem, 5vw, 3rem)',
                  background: 'linear-gradient(135deg, #ff00ff, #8000ff)',
                  border: 'none',
                  borderRadius: 'clamp(8px, 2vw, 12px)',
                  color: '#ffffff',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 0, 255, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                💾 Guardar App
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(2rem, 4vw, 3rem)',
          background: 'rgba(0, 255, 255, 0.05)',
          borderRadius: 'clamp(12px, 3vw, 20px)',
          border: '1px solid rgba(0, 255, 255, 0.2)'
        }}>
          <h3 style={{
            color: '#00ffff',
            fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
            fontWeight: '700',
            margin: '0 0 clamp(1rem, 2vw, 1.5rem) 0'
          }}>
            🎯 Onboarding Optimizado Implementado
          </h3>
          <p style={{
            color: '#b0b0b0',
            fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            TickMini implementa las mejores prácticas de onboarding para maximizar la retención y activación de usuarios
          </p>
        </div>
      </div>

      {/* Optimized Onboarding Modal */}
      {showOnboarding && (
        <OptimizedOnboarding
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
    </div>
  )
}

export default function OnboardingOptimizationDemo() {
  return (
    <BaseAccountProvider>
      <ActivationMetricsProvider>
        <OnboardingDemoContent />
      </ActivationMetricsProvider>
    </BaseAccountProvider>
  )
}
