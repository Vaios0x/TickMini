'use client'

import * as React from 'react'
import { useState, useEffect, createContext, useContext } from 'react'

interface ActivationMetrics {
  firstRender: number | null
  intentClick: number | null
  authPrompt: number | null
  success: number | null
  share: number | null
  save: number | null
  activationCompleted: boolean
  userType: 'create' | 'connect' | null
}

interface MetricsContextType {
  metrics: ActivationMetrics
  trackFirstRender: () => void
  trackIntentClick: (action: string) => void
  trackAuthPrompt: () => void
  trackSuccess: (action: string) => void
  trackShare: () => void
  trackSave: () => void
  getFunnelData: () => any
  resetMetrics: () => void
}

const MetricsContext = createContext<MetricsContextType | null>(null)

export function useActivationMetrics() {
  const context = useContext(MetricsContext)
  if (!context) {
    throw new Error('useActivationMetrics must be used within ActivationMetricsProvider')
  }
  return context
}

interface ActivationMetricsProviderProps {
  children: React.ReactNode
}

export function ActivationMetricsProvider({ children }: ActivationMetricsProviderProps) {
  const [metrics, setMetrics] = useState<ActivationMetrics>({
    firstRender: null,
    intentClick: null,
    authPrompt: null,
    success: null,
    share: null,
    save: null,
    activationCompleted: false,
    userType: null
  })

  // Cargar métricas guardadas
  useEffect(() => {
    const savedMetrics = localStorage.getItem('tickmini-activation-metrics')
    if (savedMetrics) {
      try {
        const parsed = JSON.parse(savedMetrics)
        setMetrics(parsed)
      } catch (error) {
        console.log('Error cargando métricas:', error)
      }
    }
  }, [])

  // Guardar métricas cuando cambien
  useEffect(() => {
    localStorage.setItem('tickmini-activation-metrics', JSON.stringify(metrics))
  }, [metrics])

  const trackFirstRender = () => {
    if (!metrics.firstRender) {
      setMetrics(prev => ({
        ...prev,
        firstRender: Date.now()
      }))
    }
  }

  const trackIntentClick = (action: string) => {
    if (!metrics.intentClick) {
      setMetrics(prev => ({
        ...prev,
        intentClick: Date.now(),
        userType: action.includes('create') ? 'create' : 'connect'
      }))
    }
  }

  const trackAuthPrompt = () => {
    if (!metrics.authPrompt) {
      setMetrics(prev => ({
        ...prev,
        authPrompt: Date.now()
      }))
    }
  }

  const trackSuccess = (action: string) => {
    if (!metrics.success) {
      setMetrics(prev => ({
        ...prev,
        success: Date.now(),
        activationCompleted: true
      }))
    }
  }

  const trackShare = () => {
    if (!metrics.share) {
      setMetrics(prev => ({
        ...prev,
        share: Date.now()
      }))
    }
  }

  const trackSave = () => {
    if (!metrics.save) {
      setMetrics(prev => ({
        ...prev,
        save: Date.now()
      }))
    }
  }

  const getFunnelData = () => {
    const data = {
      funnel: {
        firstRender: metrics.firstRender,
        intentClick: metrics.intentClick,
        authPrompt: metrics.authPrompt,
        success: metrics.success,
        share: metrics.share,
        save: metrics.save
      },
      timings: {
        renderToIntent: metrics.intentClick && metrics.firstRender 
          ? metrics.intentClick - metrics.firstRender 
          : null,
        intentToAuth: metrics.authPrompt && metrics.intentClick 
          ? metrics.authPrompt - metrics.intentClick 
          : null,
        authToSuccess: metrics.success && metrics.authPrompt 
          ? metrics.success - metrics.authPrompt 
          : null,
        successToShare: metrics.share && metrics.success 
          ? metrics.share - metrics.success 
          : null
      },
      completion: {
        activationCompleted: metrics.activationCompleted,
        userType: metrics.userType,
        totalTime: metrics.success && metrics.firstRender 
          ? metrics.success - metrics.firstRender 
          : null
      }
    }

    return data
  }

  const resetMetrics = () => {
    setMetrics({
      firstRender: null,
      intentClick: null,
      authPrompt: null,
      success: null,
      share: null,
      save: null,
      activationCompleted: false,
      userType: null
    })
    localStorage.removeItem('tickmini-activation-metrics')
  }

  const value: MetricsContextType = {
    metrics,
    trackFirstRender,
    trackIntentClick,
    trackAuthPrompt,
    trackSuccess,
    trackShare,
    trackSave,
    getFunnelData,
    resetMetrics
  }

  return (
    <MetricsContext.Provider value={value}>
      {children}
    </MetricsContext.Provider>
  )
}

// Componente para mostrar métricas de activación
export function ActivationMetricsDisplay() {
  const { metrics, getFunnelData } = useActivationMetrics()
  const [showDetails, setShowDetails] = useState(false)

  const funnelData = getFunnelData()

  const formatTime = (ms: number | null) => {
    if (!ms) return 'N/A'
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(1)}s`
  }

  const getCompletionRate = () => {
    const steps = [
      metrics.firstRender,
      metrics.intentClick,
      metrics.authPrompt,
      metrics.success
    ]
    const completed = steps.filter(step => step !== null).length
    return Math.round((completed / steps.length) * 100)
  }

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: 'clamp(12px, 3vw, 20px)',
      padding: 'clamp(1.5rem, 3vw, 2.5rem)',
      border: '2px solid rgba(0, 255, 255, 0.3)',
      marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
        paddingBottom: 'clamp(1rem, 2vw, 1.5rem)',
        borderBottom: '2px solid rgba(0, 255, 255, 0.2)'
      }}>
        <h3 style={{
          color: '#00ffff',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          fontWeight: '700',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          📊 Métricas de Activación
        </h3>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          style={{
            padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 2.5vw, 1.5rem)',
            background: 'linear-gradient(135deg, #00ffff, #0080ff)',
            border: 'none',
            borderRadius: 'clamp(6px, 1.5vw, 8px)',
            color: '#000000',
            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {showDetails ? '🔼 Ocultar' : '🔽 Ver'} Detalles
        </button>
      </div>

      {/* Completion Rate */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        <div style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '800',
          color: '#00ffff',
          marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)'
        }}>
          {getCompletionRate()}%
        </div>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
          margin: 0
        }}>
          Progreso de Activación
        </p>
      </div>

      {/* Funnel Steps */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'clamp(0.8rem, 2vw, 1.2rem)',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        {[
          { key: 'firstRender', label: 'Primera Carga', icon: '🚀' },
          { key: 'intentClick', label: 'Click de Intención', icon: '👆' },
          { key: 'authPrompt', label: 'Prompt de Auth', icon: '🔐' },
          { key: 'success', label: 'Éxito', icon: '✅' },
          { key: 'share', label: 'Compartir', icon: '📤' },
          { key: 'save', label: 'Guardar', icon: '💾' }
        ].map((step) => {
          const isCompleted = metrics[step.key as keyof ActivationMetrics] !== null
          return (
            <div
              key={step.key}
              style={{
                background: isCompleted 
                  ? 'rgba(0, 255, 0, 0.1)' 
                  : 'rgba(100, 100, 100, 0.1)',
                border: `2px solid ${isCompleted ? '#00ff00' : 'rgba(255, 255, 255, 0.2)'}`,
                borderRadius: 'clamp(8px, 2vw, 12px)',
                padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                marginBottom: 'clamp(0.5rem, 1vw, 0.8rem)'
              }}>
                {step.icon}
              </div>
              <div style={{
                color: isCompleted ? '#00ff00' : '#b0b0b0',
                fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                fontWeight: '600',
                marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)'
              }}>
                {step.label}
              </div>
              <div style={{
                color: '#b0b0b0',
                fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)'
              }}>
                {isCompleted ? 'Completado' : 'Pendiente'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Detailed Metrics */}
      {showDetails && (
        <div style={{
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          padding: 'clamp(1rem, 2.5vw, 1.5rem)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h4 style={{
            color: '#00ffff',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            fontWeight: '600',
            margin: '0 0 clamp(1rem, 2.5vw, 1.5rem) 0',
            textAlign: 'center'
          }}>
            📈 Métricas Detalladas
          </h4>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(0.8rem, 2vw, 1.2rem)'
          }}>
            <div>
              <h5 style={{
                color: '#ffffff',
                fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                fontWeight: '600',
                margin: '0 0 clamp(0.5rem, 1.2vw, 0.8rem) 0'
              }}>
                ⏱️ Tiempos de Respuesta
              </h5>
              <div style={{
                color: '#b0b0b0',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                lineHeight: 1.6
              }}>
                <div>Render → Intent: {formatTime(funnelData.timings.renderToIntent)}</div>
                <div>Intent → Auth: {formatTime(funnelData.timings.intentToAuth)}</div>
                <div>Auth → Success: {formatTime(funnelData.timings.authToSuccess)}</div>
                <div>Success → Share: {formatTime(funnelData.timings.successToShare)}</div>
              </div>
            </div>
            
            <div>
              <h5 style={{
                color: '#ffffff',
                fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                fontWeight: '600',
                margin: '0 0 clamp(0.5rem, 1.2vw, 0.8rem) 0'
              }}>
                🎯 Completación
              </h5>
              <div style={{
                color: '#b0b0b0',
                fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                lineHeight: 1.6
              }}>
                <div>Activación: {metrics.activationCompleted ? '✅' : '❌'}</div>
                <div>Tipo de Usuario: {metrics.userType || 'N/A'}</div>
                <div>Tiempo Total: {formatTime(funnelData.completion.totalTime)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
