'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  eventName: string
  transactionHash: string
  eventDate: string
  location: string
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  eventName, 
  transactionHash, 
  eventDate, 
  location 
}: SuccessModalProps) {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  // Generar partículas flotantes
  useEffect(() => {
    if (isOpen) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3
      }))
      setParticles(newParticles)
      
      // Mostrar contenido después de un breve delay
      setTimeout(() => setShowContent(true), 300)
    } else {
      setShowContent(false)
      setParticles([])
    }
  }, [isOpen])

  if (!isOpen) return null

  const getBaseScanUrl = (hash: string) => {
    return `https://sepolia.basescan.org/tx/${hash}`
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Aquí podrías añadir un toast de confirmación
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  const handleClose = () => {
    onClose()
    // Redirigir a la página de eventos después de cerrar el modal
    setTimeout(() => {
      router.push('/events')
    }, 300) // Pequeño delay para que se vea la animación de cierre
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.5s ease-out'
    }}>
      {/* Partículas flotantes de fondo */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: '6px',
            height: '6px',
            background: 'radial-gradient(circle, #00ffff, transparent)',
            borderRadius: '50%',
            animation: `float-particle ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            opacity: 0.6
          }}
        />
      ))}

      {/* Anillos de pulso */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        border: '3px solid rgba(0, 255, 255, 0.3)',
        borderRadius: '50%',
        animation: 'pulse-ring 2s ease-out infinite'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
        border: '2px solid rgba(255, 0, 255, 0.2)',
        borderRadius: '50%',
        animation: 'pulse-ring 2s ease-out infinite 0.5s'
      }} />

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        border: '1px solid rgba(0, 255, 0, 0.1)',
        borderRadius: '50%',
        animation: 'pulse-ring 2s ease-out infinite 1s'
      }} />

      {/* Modal principal */}
      <div 
        className="success-modal"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(20, 20, 40, 0.9))',
          borderRadius: 'clamp(15px, 4vw, 25px)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 60px rgba(0, 255, 255, 0.2)',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          maxWidth: 'clamp(350px, 85vw, 500px)',
          maxHeight: '90vh',
          width: '100%',
          position: 'relative',
          overflow: 'auto',
          animation: showContent ? 'modalSlideIn 0.8s ease-out' : 'none',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Efecto de brillo interno */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #00ffff, #ff00ff, #ffff00, #00ff00)',
          animation: 'shimmer 3s ease-in-out infinite'
        }} />

        {/* Indicador de scroll */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 255, 255, 0.2)',
          borderRadius: '50%',
          width: '6px',
          height: '6px',
          animation: 'pulse 2s ease-in-out infinite',
          zIndex: 10,
          opacity: 0.7
        }} />

        {/* Contenido del modal */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Icono de éxito animado */}
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
          }}>
            <div style={{
              fontSize: 'clamp(3rem, 8vw, 4rem)',
              animation: 'bounce-celebration 1s ease-out',
              filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.8))'
            }}>
              🎉
            </div>
          </div>

          {/* Título principal */}
          <h2 style={{
            fontSize: 'clamp(1.4rem, 5vw, 2rem)',
            background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ff00)',
            backgroundSize: '400% 400%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '900',
            animation: 'gradient-shift 3s ease-in-out infinite, fadeInUp 0.8s ease-out 0.3s both'
          }}>
            ¡Evento Creado Exitosamente!
          </h2>

          {/* Información del evento */}
          <div style={{
            background: 'rgba(0, 255, 255, 0.1)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: 'clamp(10px, 2vw, 15px)',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            animation: 'fadeInUp 0.8s ease-out 0.5s both'
          }}>
            <h3 style={{
              color: '#00ffff',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
              fontWeight: '700'
            }}>
              📅 {eventName}
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.3rem, 1vw, 0.5rem)',
              color: '#b0b0b0',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🗓️</span>
                <span>{eventDate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📍</span>
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Información de la transacción */}
          <div style={{
            background: 'rgba(255, 0, 255, 0.1)',
            border: '1px solid rgba(255, 0, 255, 0.3)',
            borderRadius: 'clamp(10px, 2vw, 15px)',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            animation: 'fadeInUp 0.8s ease-out 0.7s both'
          }}>
            <h4 style={{
              color: '#ff00ff',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              marginBottom: 'clamp(0.5rem, 1.5vw, 0.8rem)',
              fontWeight: '700'
            }}>
              🔗 Transacción en Base Network
            </h4>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 'clamp(6px, 1.5vw, 10px)',
              padding: 'clamp(0.6rem, 1.5vw, 0.8rem)',
              marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
              fontFamily: 'monospace',
              fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
              color: '#ffffff',
              wordBreak: 'break-all',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {transactionHash}
            </div>

            <div style={{
              display: 'flex',
              gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
              flexWrap: 'wrap'
            }}>
              <a
                href={getBaseScanUrl(transactionHash)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                  color: '#ffffff',
                  padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 3vw, 1.5rem)',
                  borderRadius: 'clamp(8px, 2vw, 12px)',
                  textDecoration: 'none',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.4rem, 1vw, 0.6rem)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 255, 255, 0.3)',
                  flex: '1',
                  minWidth: '150px',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.5)'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 255, 0.3)'
                }}
              >
                <span>🔍</span>
                Ver en BaseScan
              </a>

              <button
                onClick={() => copyToClipboard(transactionHash)}
                style={{
                  background: 'linear-gradient(135deg, #ff00ff, #8000ff)',
                  color: '#ffffff',
                  padding: 'clamp(0.6rem, 1.5vw, 0.8rem) clamp(1rem, 3vw, 1.5rem)',
                  borderRadius: 'clamp(8px, 2vw, 12px)',
                  border: 'none',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.4rem, 1vw, 0.6rem)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 0, 255, 0.3)',
                  flex: '1',
                  minWidth: '150px',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 0, 255, 0.5)'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 0, 255, 0.3)'
                }}
              >
                <span>📋</span>
                Copiar Hash
              </button>
            </div>
          </div>

          {/* Mensaje de confirmación */}
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            animation: 'fadeInUp 0.8s ease-out 0.9s both'
          }}>
            <p style={{
              color: '#00ff00',
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              fontWeight: '600',
              marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)'
            }}>
              ✅ Tu evento ahora existe como NFTs en Base Network
            </p>
            <p style={{
              color: '#b0b0b0',
              fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
              lineHeight: '1.4'
            }}>
              Los tickets se pueden comprar y vender en el marketplace descentralizado
            </p>
          </div>

          {/* Botón de cerrar */}
          <div style={{
            textAlign: 'center',
            animation: 'fadeInUp 0.8s ease-out 1.1s both'
          }}>
            <button
              onClick={handleClose}
              style={{
                background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                color: '#ffffff',
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                borderRadius: 'clamp(12px, 3vw, 20px)',
                border: 'none',
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 6px 20px rgba(0, 255, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                margin: '0 auto'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 255, 255, 0.6)'
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.4)'
              }}
            >
              <span>🚀</span>
              ¡Continuar!
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        /* Scroll personalizado para el modal */
        .success-modal::-webkit-scrollbar {
          width: 8px;
        }
        
        .success-modal::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        .success-modal::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #00ffff, #ff00ff);
          border-radius: 4px;
        }
        
        .success-modal::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #00cccc, #cc00cc);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideIn {
          from { 
            opacity: 0; 
            transform: scale(0.8) translateY(50px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }

        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.6; 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 1; 
          }
        }

        @keyframes pulse-ring {
          0% { 
            transform: translate(-50%, -50%) scale(0.8); 
            opacity: 1; 
          }
          100% { 
            transform: translate(-50%, -50%) scale(2); 
            opacity: 0; 
          }
        }

        @keyframes bounce-celebration {
          0% { transform: scale(0.3) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
