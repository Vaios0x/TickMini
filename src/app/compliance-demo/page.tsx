'use client'

import * as React from 'react'
import { FeaturedGuidelinesChecker } from '@/components/compliance/featured-guidelines-checker'
import { OptimizedAppIcon } from '@/components/ui/optimized-app-icon'
import { AppCoverPhoto } from '@/components/ui/optimized-cover-photo'
import { UserProfile } from '@/components/user/user-profile'
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow'

export default function ComplianceDemoPage() {
  const [showOnboarding, setShowOnboarding] = React.useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      padding: 'clamp(2rem, 5vw, 4rem)',
      color: '#ffffff'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: 'clamp(3rem, 6vw, 4rem)'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
        }}>
          🏆 Featured Guidelines Demo
        </h1>
        
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.3rem)',
          color: '#b0b0b0',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Demostración completa del cumplimiento de las Featured Guidelines de Base.dev
        </p>
      </div>

      {/* Demo Components */}
      <div style={{
        display: 'grid',
        gap: 'clamp(2rem, 5vw, 3rem)',
        marginBottom: 'clamp(3rem, 6vw, 4rem)'
      }}>
        {/* App Icon Demo */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 'clamp(15px, 3vw, 20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            🎨 App Icon (1024×1024px PNG)
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(2rem, 5vw, 3rem)',
            flexWrap: 'wrap'
          }}>
            <OptimizedAppIcon size={64} showLabel={true} />
            <OptimizedAppIcon size={128} showLabel={true} />
            <OptimizedAppIcon size={256} showLabel={true} />
          </div>
          
          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#b0b0b0',
            marginTop: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            Icono optimizado con especificaciones correctas: 1024×1024px, PNG, sin transparencia
          </p>
        </div>

        {/* Cover Photo Demo */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 'clamp(15px, 3vw, 20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            🖼️ Cover Photo (1200×630px)
          </h2>
          
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <AppCoverPhoto />
          </div>
          
          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#b0b0b0',
            marginTop: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            Cover photo de alta calidad sin Base logo, diseño profesional y atractivo
          </p>
        </div>

        {/* User Profile Demo */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 'clamp(15px, 3vw, 20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            👤 User Profile
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            <UserProfile />
          </div>
          
          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#b0b0b0'
          }}>
            Perfil de usuario con avatar y username, evita mostrar 0x addresses
          </p>
        </div>

        {/* Onboarding Demo */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 'clamp(15px, 3vw, 20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            🚀 Onboarding Flow (3 pantallas máximo)
          </h2>
          
          <button
            onClick={() => setShowOnboarding(true)}
            style={{
              padding: 'clamp(0.8rem, 2vw, 1.2rem) clamp(2rem, 5vw, 3rem)',
              background: 'linear-gradient(135deg, #00ffff, #0080ff)',
              border: 'none',
              borderRadius: 'clamp(10px, 2vw, 15px)',
              color: '#000000',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
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
            Ver Onboarding Demo
          </button>
          
          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#b0b0b0',
            marginTop: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            Onboarding de máximo 3 pantallas con lenguaje conciso y claro
          </p>
        </div>
      </div>

      {/* Compliance Checker */}
      <FeaturedGuidelinesChecker />

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 'clamp(1rem, 3vw, 2rem)'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <button
              onClick={() => setShowOnboarding(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: '#ffffff',
                fontSize: '1.2rem',
                cursor: 'pointer',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
            <OnboardingFlow />
          </div>
        </div>
      )}
    </div>
  )
}