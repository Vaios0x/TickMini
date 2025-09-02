'use client'

import * as React from 'react'
import Link from 'next/link'
import { EventsSection } from '@/components/sections/events-section'
import { useAppKitConnection } from '@/hooks/use-appkit'
import { CheckoutModal } from '@/components/modals/checkout-modal'
import './animations.css'
import './events.css'

export default function HomePage() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 })
  const { connect, isConnected, address, formattedAddress } = useAppKitConnection()

  // Función para inicializar el componente
  const initializeComponent = () => {
    if (typeof window === 'undefined') return
    
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    handleResize()
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }

  // Ejecutar inicialización cuando el componente se monta
  React.useEffect(() => {
    const cleanup = initializeComponent()
    return cleanup
  }, [])

  const features = [
    {
      icon: '🎫',
      title: 'Tickets NFT Únicos',
      description: 'Cada ticket es un NFT único en Base Network, garantizando autenticidad y propiedad digital.',
      color: '#00ffff'
    },
    {
      icon: '⚡',
      title: 'Transacciones Instantáneas',
      description: 'Confirmaciones en segundos gracias a la tecnología L2 de Base Network.',
      color: '#ff00ff'
    },
    {
      icon: '💰',
      title: 'Bajas Tarifas',
      description: 'Hasta 100x más barato que Ethereum, perfecto para microtransacciones.',
      color: '#ffff00'
    },
    {
      icon: '🔒',
      title: 'Seguridad Blockchain',
      description: 'Herencia de seguridad de Ethereum con validación descentralizada.',
      color: '#00ff00'
    },
    {
      icon: '🌐',
      title: 'Interoperabilidad Total',
      description: 'Conecta con cualquier wallet y dApp compatible con EVM en Base Network.',
      color: '#ff6b35'
    },
    {
      icon: '📱',
      title: 'Experiencia Móvil',
      description: 'Diseño responsive y PWA para usar desde cualquier dispositivo móvil.',
      color: '#8a2be2'
    }
  ]

  const stats = [
    { value: '10K+', label: 'Tickets NFT Vendidos', icon: '🎫', color: '#00ffff' },
    { value: '500+', label: 'Eventos Activos', icon: '🎭', color: '#ff00ff' },
    { value: '99.9%', label: 'Uptime Blockchain', icon: '⚡', color: '#ffff00' },
    { value: '100x', label: 'Más Barato que ETH', icon: '💰', color: '#00ff00' }
  ]

  return (
    <div 
      style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '0px'
      }}
      className="home-page"
    >
      {/* Dynamic Background Effects */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${windowSize.width - mousePosition.x}px ${windowSize.height - mousePosition.y}px, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 0, 0.08) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          transition: 'all 0.1s ease'
        }} 
      />
      
      {/* Animated Grid Pattern */}
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

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => {
        const left = `${(i * 7.3) % 100}%`
        const top = `${(i * 5.5) % 100}%`
        const animationDuration = `${4 + (i % 4)}s`
        const animationDelay = `${(i % 4)}s`
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left,
              top,
              width: '3px',
              height: '3px',
              background: `hsl(${i * 24}, 100%, 70%)`,
              borderRadius: '50%',
              filter: 'blur(1px)',
              animation: `float-particle ${animationDuration} ease-in-out infinite`,
              animationDelay,
              pointerEvents: 'none'
            }}
          />
        )
      })}

      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '1rem',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Events Section - Cards de eventos directamente */}
        <div style={{ paddingTop: '2rem' }}>
          <EventsSection />
        </div>

        {/* Features Section - Completamente Responsivo */}
        <section 
          style={{
            marginBottom: '4rem'
          }}
          className="features-section"
          role="region"
          aria-label="Características principales"
        >
          <h2 
            style={{
              textAlign: 'center',
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              color: '#ffffff',
              marginBottom: 'clamp(2rem, 5vw, 3rem)',
              textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
              fontWeight: 'bold'
            }}
            className="section-title"
          >
            ✨ Características Principales
          </h2>
          
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 80vw, 350px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2rem)'
            }}
            className="features-grid"
          >
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'clamp(15px, 4vw, 20px)',
                  padding: 'clamp(2rem, 4vw, 2.5rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="feature-card"
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                tabIndex={0}
                role="button"
                aria-label={`Característica: ${feature.title}`}
              >
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${feature.color}, ${feature.color}80)`,
                    backgroundSize: '200% 100%'
                  }} 
                  className="gradient-shift-fast" 
                />
                
                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'clamp(150px, 40vw, 200px)',
                    height: 'clamp(150px, 40vw, 200px)',
                    background: `radial-gradient(circle, ${feature.color}10 0%, transparent 70%)`,
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    pointerEvents: 'none'
                  }} 
                />
                
                <h3 
                  style={{ 
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                    marginBottom: 'clamp(1rem, 2vw, 1rem)',
                    color: feature.color,
                    textShadow: `0 0 20px ${feature.color}50`,
                    fontWeight: 'bold',
                    position: 'relative',
                    zIndex: 1
                  }}
                  className="feature-title"
                >
                  {feature.icon} {feature.title}
                </h3>
                <p 
                  style={{ 
                    color: '#d0d0d0',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    lineHeight: '1.6',
                    position: 'relative',
                    zIndex: 1
                  }}
                  className="feature-description"
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Base Network Benefits Section - Completamente Responsivo */}
        <section 
          style={{
            marginBottom: '4rem'
          }}
          className="benefits-section"
          role="region"
          aria-label="Beneficios de Base Network"
        >
          <h2 
            style={{
              textAlign: 'center',
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              color: '#00ffff',
              marginBottom: 'clamp(2rem, 5vw, 3rem)',
              textShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
              fontWeight: 'bold'
            }}
            className="section-title"
          >
            🚀 ¿Por qué Base Network?
          </h2>
          
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 80vw, 400px), 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2rem)'
            }}
            className="benefits-grid"
          >
            {[
              {
                icon: '🔵',
                title: 'L2 de Coinbase',
                description: 'Construido sobre Ethereum con el respaldo de Coinbase, ofreciendo máxima seguridad y confiabilidad institucional.',
                color: '#00ffff'
              },
              {
                icon: '💰',
                title: 'Bajas Tarifas',
                description: 'Transacciones hasta 100x más baratas que Ethereum, perfecto para microtransacciones de tickets NFT.',
                color: '#ff00ff'
              },
              {
                icon: '⚡',
                title: 'Velocidad Extrema',
                description: 'Confirmaciones en segundos, no en minutos. Experiencia fluida para compra y venta de tickets.',
                color: '#ffff00'
              },
              {
                icon: '🔒',
                title: 'Máxima Seguridad',
                description: 'Herencia de seguridad de Ethereum con validación descentralizada y resistencia a ataques.',
                color: '#00ff00'
              },
              {
                icon: '🌍',
                title: 'Ecosistema Global',
                description: 'Acceso a un ecosistema completo de dApps, DeFi y herramientas de desarrollo en Base Network.',
                color: '#ff6b35'
              },
              {
                icon: '🔄',
                title: 'Escalabilidad Infinita',
                description: 'Arquitectura L2 que permite procesar millones de transacciones sin comprometer la descentralización.',
                color: '#8a2be2'
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${benefit.color}08 0%, ${benefit.color}05 100%)`,
                  backdropFilter: 'blur(20px)',
                  borderRadius: 'clamp(15px, 4vw, 25px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: 'clamp(2rem, 4vw, 2.5rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)'
                }}
                className="benefit-card"
              >
                <div 
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: `radial-gradient(circle, ${benefit.color}10 0%, transparent 70%)`,
                    animation: 'pulse 4s ease-in-out infinite'
                  }} 
                />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div 
                    style={{
                      fontSize: 'clamp(2rem, 5vw, 3rem)',
                      marginBottom: 'clamp(1rem, 2vw, 1rem)',
                      filter: `drop-shadow(0 0 20px ${benefit.color}50)`
                    }}
                    className="benefit-icon"
                  >
                    {benefit.icon}
                  </div>
                  <h3 
                    style={{
                      fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                      color: benefit.color,
                      marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                      fontWeight: 'bold'
                    }}
                    className="benefit-title"
                  >
                    {benefit.title}
                  </h3>
                  <p 
                    style={{
                      color: '#d0d0d0',
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                      lineHeight: '1.6'
                    }}
                    className="benefit-description"
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Section - Completamente Responsivo */}
        <section 
          style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'clamp(20px, 5vw, 30px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: 'clamp(2rem, 5vw, 4rem)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 100px rgba(0, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="final-cta-section"
          role="region"
          aria-label="Llamada a la acción final"
        >
          {/* Background Glow Effects */}
          <div 
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
              animation: 'pulse 4s ease-in-out infinite'
            }} 
          />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 
              style={{
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                color: '#ffffff',
                marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
                fontWeight: 'bold'
              }}
              className="cta-title"
            >
              🚀 ¿Listo para el Futuro?
            </h2>
            
            <p 
              style={{
                fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                color: '#b0b0b0',
                marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
                maxWidth: 'clamp(500px, 80vw, 700px)',
                margin: '0 auto clamp(1.5rem, 4vw, 2.5rem) auto',
                lineHeight: '1.6'
              }}
              className="cta-description"
            >
              Únete a la revolución del ticketing NFT en Base Network. 
              Experimenta la próxima generación de eventos digitales.
            </p>
            
            <div 
              style={{
                display: 'flex',
                gap: 'clamp(1rem, 3vw, 1.5rem)',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
              className="cta-buttons-final"
              role="group"
              aria-label="Botones de acción final"
            >
              <Link href="/events">
                <button 
                  style={{
                    background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                    color: '#000000',
                    padding: 'clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 3rem)',
                    borderRadius: 'clamp(30px, 8vw, 50px)',
                    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    minWidth: 'clamp(180px, 50vw, 250px)'
                  }}
                  className="btn-primary-neon"
                  onMouseEnter={(e: any) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 255, 255, 0.8)'
                  }}
                  onMouseLeave={(e: any) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 255, 255, 0.6)'
                  }}
                  tabIndex={0}
                  aria-label="Explorar eventos disponibles"
                >
                  🎫 Explorar Eventos
                </button>
              </Link>
              
              <Link href="/create-event">
                <button 
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    padding: 'clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 3rem)',
                    borderRadius: 'clamp(30px, 8vw, 50px)',
                    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                    fontWeight: '600',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    minWidth: 'clamp(180px, 50vw, 250px)'
                  }}
                  className="btn-secondary-neon"
                  onMouseEnter={(e: any) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                  }}
                  onMouseLeave={(e: any) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  }}
                  tabIndex={0}
                  aria-label="Crear un nuevo evento"
                >
                  🚀 Crear Evento
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* CSS Animations y Responsive */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes gradient-shift-fast {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) rotate(180deg);
            opacity: 1;
          }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-section {
            padding: 2rem 0;
          }
          
          .hero-container {
            padding: 2rem 1rem;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 480px) {
          .hero-stats {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons-final {
            flex-direction: column;
            align-items: center;
          }
        }
        
        /* Accessibility */
        .btn-primary-neon:focus,
        .btn-secondary-neon:focus,
        .feature-card:focus,
        .stat-card:focus {
          outline: 2px solid #00ffff;
          outline-offset: 2px;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Performance optimizations */
        .home-page {
          will-change: transform;
        }
        
        .hero-section,
        .features-section,
        .benefits-section,
        .final-cta-section {
          will-change: opacity, transform;
        }
      `}</style>
    </div>
  )
}
