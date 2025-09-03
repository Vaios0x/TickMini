'use client'

import * as React from 'react'
import Link from 'next/link'
import { EventsSection } from '@/components/sections/events-section'
import { NeuralHero } from '@/components/sections/neural-hero'
import { useAppKitConnection } from '@/hooks/use-appkit'
import { CheckoutModal } from '@/components/modals/checkout-modal'
import './animations.css'
import './events.css'
import './home.css'
import './neural-hero.css'

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
    },
    {
      icon: '🎨',
      title: 'Personalización Avanzada',
      description: 'Crea eventos únicos con branding personalizado y metadatos NFT personalizables.',
      color: '#ff1493'
    },
    {
      icon: '🚀',
      title: 'Escalabilidad Infinita',
      description: 'Procesa millones de transacciones sin comprometer la velocidad o descentralización.',
      color: '#32cd32'
    }
  ]

  const stats = [
    { value: '10K+', label: 'Tickets NFT Vendidos', icon: '🎫', color: '#00ffff' },
    { value: '500+', label: 'Eventos Activos', icon: '🎭', color: '#ff00ff' },
    { value: '99.9%', label: 'Uptime Blockchain', icon: '⚡', color: '#ffff00' },
    { value: '100x', label: 'Más Barato que ETH', icon: '💰', color: '#00ff00' }
  ]

  return (
    <div className="home-page">
      {/* Neural Hero Section */}
      <NeuralHero />
      
      <div className="home-content-container">
        
        {/* Events Section - Cards de eventos directamente */}
        <div style={{ paddingTop: '2rem' }}>
          <EventsSection />
        </div>

        {/* Features Section - Completamente Responsivo */}
        <section 
          className="features-section"
          role="region"
          aria-label="Características principales"
        >
          <h2 className="section-title">
            ✨ Características Principales
          </h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card"
                style={{
                  '--feature-color': feature.color,
                  '--feature-color-50': `${feature.color}80`
                } as React.CSSProperties}
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
                
                <h3 className="feature-title">
                  {feature.icon} {feature.title}
                </h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Base Network Benefits Section - Completamente Responsivo */}
        <section 
          className="benefits-section"
          role="region"
          aria-label="Beneficios de Base Network"
        >
          <h2 className="section-title">
            🚀 ¿Por qué Base Network?
          </h2>
          
          <div className="benefits-grid">
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
                className="benefit-card"
                style={{
                  '--benefit-color': benefit.color,
                  '--benefit-color-08': `${benefit.color}15`,
                  '--benefit-color-05': `${benefit.color}0D`
                } as React.CSSProperties}
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
                  <div className="benefit-icon">
                    {benefit.icon}
                  </div>
                  <h3 className="benefit-title">
                    {benefit.title}
                  </h3>
                  <p className="benefit-description">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>





        {/* Final CTA Section - Completamente Responsivo */}
        <section 
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
            <h2 className="cta-title">
              🚀 ¿Listo para el Futuro?
            </h2>
            
            <p className="cta-description">
              Únete a la revolución del ticketing NFT en Base Network. 
              Experimenta la próxima generación de eventos digitales.
            </p>
            
            <div 
              className="cta-buttons-final"
              role="group"
              aria-label="Botones de acción final"
            >
              <Link href="/events">
                <button 
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
    </div>
  )
}
