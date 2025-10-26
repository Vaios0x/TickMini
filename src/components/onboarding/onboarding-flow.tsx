'use client'

import * as React from 'react'
import { useState } from 'react'

interface OnboardingStep {
  id: number
  title: string
  description: string
  image: string
  icon: string
}

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Bienvenido a TickMini',
      description: 'Plataforma de tickets NFT para eventos en Base Network. Crea, compra y gestiona tickets únicos.',
      image: '/images/hero-optimized.svg',
      icon: '🎫'
    },
    {
      id: 2,
      title: 'Tickets NFT Únicos',
      description: 'Cada ticket es un NFT único, garantizando autenticidad y propiedad digital permanente.',
      image: '/images/screenshot1-optimized.svg',
      icon: '✨'
    },
    {
      id: 3,
      title: '¡Comienza Ahora!',
      description: 'Explora eventos increíbles y únete a la revolución del ticketing digital.',
      image: '/images/screenshot2.svg',
      icon: '🚀'
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      localStorage.setItem('tickmini-onboarding-seen', 'true')
      setIsVisible(false)
    }
  }

  const handleSkip = () => {
    localStorage.setItem('tickmini-onboarding-seen', 'true')
    setIsVisible(false)
  }

  const handleStart = () => {
    localStorage.setItem('tickmini-onboarding-seen', 'true')
    setIsVisible(false)
  }

  // Mostrar onboarding solo en la primera visita
  React.useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('tickmini-onboarding-seen')
    if (!hasSeenOnboarding) {
      // Pequeño delay para asegurar que la app esté cargada
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!isVisible) return null

  const currentStepData = steps[currentStep]

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(2rem, 5vw, 4rem)',
      color: '#ffffff'
    }}>
      {/* Progress Indicator */}
      <div style={{
        position: 'absolute',
        top: 'clamp(2rem, 5vw, 3rem)',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 'clamp(0.5rem, 1vw, 1rem)',
        zIndex: 1
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

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 5vw, 3rem)',
          right: 'clamp(2rem, 5vw, 3rem)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          padding: 'clamp(0.5rem, 1vw, 0.8rem) clamp(1rem, 2vw, 1.5rem)',
          color: '#ffffff',
          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 1
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
        }}
      >
        Saltar
      </button>

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: 'clamp(300px, 80vw, 500px)',
        width: '100%'
      }}>
        {/* Icon */}
        <div style={{
          fontSize: 'clamp(4rem, 10vw, 6rem)',
          marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
          filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))'
        }}>
          {currentStepData.icon}
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          lineHeight: '1.2'
        }}>
          {currentStepData.title}
        </h1>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          color: '#b0b0b0',
          lineHeight: '1.6',
          marginBottom: 'clamp(2rem, 5vw, 3rem)',
          maxWidth: '400px'
        }}>
          {currentStepData.description}
        </p>

        {/* Image */}
        <div style={{
          width: 'clamp(200px, 50vw, 300px)',
          height: 'clamp(150px, 40vw, 200px)',
          background: `url(${currentStepData.image})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          marginBottom: 'clamp(2rem, 5vw, 3rem)',
          borderRadius: 'clamp(15px, 3vw, 20px)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '0 10px 30px rgba(0, 255, 255, 0.2)'
        }} />

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
          width: '100%',
          maxWidth: '300px'
        }}>
          {currentStep < steps.length - 1 ? (
            <>
              <button
                onClick={handleSkip}
                style={{
                  flex: 1,
                  padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 'clamp(10px, 2vw, 15px)',
                  color: '#ffffff',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                }}
              >
                Saltar
              </button>
              
              <button
                onClick={handleNext}
                style={{
                  flex: 2,
                  padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                  background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                  border: 'none',
                  borderRadius: 'clamp(10px, 2vw, 15px)',
                  color: '#000000',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '600',
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
                Siguiente
              </button>
            </>
          ) : (
            <button
              onClick={handleStart}
              style={{
                width: '100%',
                padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                border: 'none',
                borderRadius: 'clamp(10px, 2vw, 15px)',
                color: '#000000',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
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
              ¡Comenzar!
            </button>
          )}
        </div>
      </div>
    </div>
  )
}