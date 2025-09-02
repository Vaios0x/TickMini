'use client'

import React from 'react'

interface StepIndicatorProps {
  currentStep: number
  onStepClick: (step: number) => void
}

const stepLabels = [
  'Información Básica',
  'Fechas y Ubicación',
  'Configuración de Tickets',
  'Multimedia',
  'Configuración Final'
]

const stepIcons = ['🎯', '📅', '🎫', '🖼️', '⚙️']

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  const totalSteps = stepLabels.length

  return (
    <div style={{
      marginBottom: 'clamp(2rem, 5vw, 3rem)',
      position: 'relative'
    }}>
      {/* Mensaje de navegación libre */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
        padding: 'clamp(1rem, 2.5vw, 1.5rem)',
        background: 'rgba(0, 255, 255, 0.08)',
        border: '1px solid rgba(0, 255, 255, 0.2)',
        borderRadius: 'clamp(15px, 4vw, 20px)',
        backdropFilter: 'blur(15px)'
      }}>
        <p style={{
          color: '#00ffff',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
          margin: 0,
          fontWeight: '500'
        }}>
          💡 <strong>Navegación Libre:</strong> Haz clic en cualquier paso para navegar directamente
        </p>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
          margin: '0.5rem 0 0 0',
          opacity: 0.8
        }}>
          Todos los pasos están disponibles para navegación libre
        </p>
      </div>

      {/* Contenedor horizontal sin scroll - todos los pasos visibles */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 'clamp(1rem, 3vw, 2rem)',
        flexWrap: 'wrap',
        position: 'relative',
        padding: 'clamp(0.5rem, 2vw, 1rem)'
      }}>
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div
              key={stepNumber}
              onClick={() => {
                onStepClick(stepNumber)
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(0.8rem, 2vw, 1rem)',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 2,
                transition: 'all 0.3s ease',
                minWidth: 'clamp(120px, 20vw, 160px)',
                padding: 'clamp(0.5rem, 2vw, 1rem)',
                borderRadius: 'clamp(15px, 4vw, 20px)',
                background: isActive ? 'rgba(0, 255, 255, 0.05)' : 'transparent',
                border: isActive ? '1px solid rgba(0, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e: any) => {
                const target = e.currentTarget as HTMLDivElement
                target.style.transform = 'translateY(-5px)'
                target.style.background = isActive 
                  ? 'rgba(0, 255, 255, 0.1)' 
                  : 'rgba(255, 255, 255, 0.05)'
                target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)'
              }}
              onMouseLeave={(e: any) => {
                const target = e.currentTarget as HTMLDivElement
                target.style.transform = 'translateY(0)'
                target.style.background = isActive 
                  ? 'rgba(0, 255, 255, 0.05)' 
                  : 'transparent'
                target.style.boxShadow = 'none'
              }}
              tabIndex={0}
              role="button"
              aria-label={`Ir al paso ${stepNumber}: ${label}`}
              onKeyDown={(e: any) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onStepClick(stepNumber)
                }
              }}
            >
              {/* Círculo del paso */}
              <div style={{
                width: 'clamp(50px, 12vw, 70px)',
                height: 'clamp(50px, 12vw, 70px)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: isActive 
                  ? 'linear-gradient(135deg, #00ffff, #ff00ff)' 
                  : isCompleted 
                    ? 'linear-gradient(135deg, #00ff80, #00ffff)' 
                    : 'rgba(255, 255, 255, 0.1)',
                border: isActive 
                  ? '3px solid #00ffff' 
                  : isCompleted 
                    ? '3px solid #00ff80' 
                    : '3px solid rgba(255, 255, 255, 0.3)',
                boxShadow: isActive 
                  ? '0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 20px rgba(0, 255, 255, 0.2)' 
                  : isCompleted 
                    ? '0 0 15px rgba(0, 255, 128, 0.4), inset 0 0 15px rgba(0, 255, 128, 0.1)' 
                    : '0 0 10px rgba(255, 255, 255, 0.1)',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}>
                {/* Número del paso */}
                <span style={{
                  color: isActive || isCompleted ? '#000' : '#fff',
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  fontWeight: 'bold',
                  textShadow: 'none'
                }}>
                  {stepNumber}
                </span>
                
                {/* Glow interno para paso activo */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    animation: 'pulse 2s infinite'
                  }} />
                )}
              </div>

              {/* Icono del paso */}
              <div style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                opacity: isActive ? 1 : isCompleted ? 0.8 : 0.6,
                filter: isActive ? 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))' : 'none'
              }}>
                {stepIcons[index]}
              </div>

              {/* Etiqueta del paso */}
              <div style={{
                textAlign: 'center',
                maxWidth: '100%'
              }}>
                <p style={{
                  color: isActive 
                    ? '#00ffff' 
                    : isCompleted 
                      ? '#00ff80' 
                      : '#b0b0b0',
                  fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                  fontWeight: isActive ? '600' : isCompleted ? '500' : '400',
                  margin: 0,
                  lineHeight: 1.2,
                  textShadow: isActive 
                    ? '0 0 10px rgba(0, 255, 255, 0.5)' 
                    : 'none'
                }}>
                  {label}
                </p>
                

              </div>
            </div>
          )
        })}
      </div>

      {/* CSS para la animación de pulse */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
      `}</style>
    </div>
  )
}
