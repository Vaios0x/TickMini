'use client'

import * as React from 'react'
import Link from 'next/link'
import { HeroSection } from '@/components/sections/hero-section'
import { CheckoutModal } from '@/components/modals/checkout-modal'
import { useEvents, type Event } from '@/hooks/use-events'
import './animations.css'
import './events.css'
import './home.css'
import '@/components/modals/checkout-modal.css'

// Definir tipos para los eventos que coincidan con el hook
interface EventData {
  id: number
  title: string
  description: string
  price: string
  date: string
  time: string
  location: string
  organizer: string
  category: string
  availableTickets: number
  totalTickets: number
  image: string
  tags?: string[]
  featured?: boolean
  rating?: number
  eventType?: 'presential' | 'virtual' | 'hybrid'
  distance?: number
}

export default function HomePage() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 })
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<EventData | null>(null)


  // Hook de eventos para la búsqueda avanzada
  const {
    isLoading,
    clearAllFilters,
    getCategoryInfo,
    getTagInfo
  } = useEvents()

  // Función para abrir el modal de checkout
  const handleOpenCheckout = (event: EventData) => {
    console.log('🎫 handleOpenCheckout llamado con evento:', event)
    console.log('🎫 Estado actual - isCheckoutOpen:', isCheckoutOpen, 'selectedEvent:', selectedEvent)
    
    setSelectedEvent(event)
    setIsCheckoutOpen(true)
    
    console.log('🎫 Estado después de set - isCheckoutOpen:', true, 'selectedEvent:', event)
  }

  // Función para cerrar el modal de checkout
  const handleCloseCheckout = () => {
    console.log('🎫 handleCloseCheckout llamado')
    setIsCheckoutOpen(false)
    setSelectedEvent(null)
    console.log('🎫 Modal cerrado - isCheckoutOpen: false, selectedEvent: null')
  }

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

      <div className="home-content-container">
        
        {/* Hero Section */}
        <HeroSection />
        

        




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
                  const target = e.currentTarget as HTMLElement
                  target.style.transform = 'translateY(-5px) scale(1.02)'
                  target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)'
                }}
                onMouseLeave={(e: any) => {
                  const target = e.currentTarget as HTMLElement
                  target.style.transform = 'translateY(0) scale(1)'
                  target.style.boxShadow = 'none'
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
              {/* Botón PRIMARIO - Explorar Eventos */}
              <a href="/events" style={{ textDecoration: 'none' }}>
                <button 
                  style={{
                    position: 'relative',
                    padding: 'clamp(1.2rem, 3vw, 1.8rem) clamp(2.5rem, 5vw, 4rem)',
                    background: 'linear-gradient(135deg, #00ffff 0%, #0080ff 25%, #ff00ff 50%, #8000ff 75%, #00ffff 100%)',
                    backgroundSize: '400% 400%',
                    border: 'none',
                    borderRadius: 'clamp(25px, 6vw, 35px)',
                    color: '#000000',
                    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    boxShadow: '0 10px 40px rgba(0, 255, 255, 0.6), 0 0 80px rgba(0, 255, 255, 0.3)',
                    overflow: 'hidden',
                    minWidth: 'clamp(200px, 50vw, 280px)',
                    animation: 'gradient-shift 3s ease-in-out infinite'
                  }}
                  onMouseEnter={(e: any) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(-8px) scale(1.05)'
                    target.style.boxShadow = '0 20px 60px rgba(0, 255, 255, 0.8), 0 0 120px rgba(0, 255, 255, 0.5)'
                    target.style.animationPlayState = 'paused'
                  }}
                  onMouseLeave={(e: any) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(0) scale(1)'
                    target.style.boxShadow = '0 10px 40px rgba(0, 255, 255, 0.6), 0 0 80px rgba(0, 255, 255, 0.3)'
                    target.style.animationPlayState = 'running'
                  }}
                  tabIndex={0}
                  aria-label="Explorar eventos disponibles"
                >
                  {/* Efecto de brillo en hover */}
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    transform: 'rotate(45deg)',
                    pointerEvents: 'none'
                  }} 
                  onMouseEnter={(e: any) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.opacity = '1'
                  }}
                  onMouseLeave={(e: any) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.opacity = '0'
                  }}
                  />
                  
                  {/* Contenido del botón */}
                  <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2em' }}>🎫</span>
                    Explorar Eventos
                    <span style={{ fontSize: '1.2em', transition: 'transform 0.3s ease' }}>→</span>
                  </span>
                </button>
              </a>
              
              {/* Botón SECUNDARIO - Crear Evento */}
              <a href="/create-event" style={{ textDecoration: 'none' }}>
                <button 
                  style={{
                    position: 'relative',
                    padding: 'clamp(1.2rem, 3vw, 1.8rem) clamp(2.5rem, 5vw, 4rem)',
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: 'none',
                    borderRadius: 'clamp(25px, 6vw, 35px)',
                    color: '#ffff00',
                    fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                    fontWeight: '800',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    boxShadow: '0 10px 40px rgba(255, 255, 0, 0.4), 0 0 80px rgba(255, 255, 0, 0.2), inset 0 0 20px rgba(255, 255, 0, 0.1)',
                    overflow: 'hidden',
                    minWidth: 'clamp(200px, 50vw, 280px)',
                    backdropFilter: 'blur(20px)'
                  }}
                  onMouseEnter={(e: any) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(-8px) scale(1.05)'
                    target.style.boxShadow = '0 20px 60px rgba(255, 255, 0, 0.6), 0 0 120px rgba(255, 255, 0, 0.4), inset 0 0 30px rgba(255, 255, 0, 0.2)'
                    target.style.background = 'rgba(255, 255, 0, 0.1)'
                    target.style.color = '#ffffff'
                  }}
                  onMouseLeave={(e: any) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(0) scale(1)'
                    target.style.boxShadow = '0 10px 40px rgba(255, 255, 0, 0.4), 0 0 80px rgba(255, 255, 0, 0.2), inset 0 0 20px rgba(255, 255, 0, 0.1)'
                    target.style.background = 'rgba(0, 0, 0, 0.8)'
                    target.style.color = '#ffff00'
                  }}
                  tabIndex={0}
                  aria-label="Crear un nuevo evento"
                >
                  {/* Efecto de partículas flotantes */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 0, 0.1) 0%, transparent 50%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }} 
                  onMouseEnter={(e: any) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.opacity = '1'
                  }}
                  onMouseLeave={(e: any) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.opacity = '0'
                  }}
                  />
                  
                  {/* Contenido del botón */}
                  <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2em' }}>🚀</span>
                    Crear Evento
                    <span style={{ fontSize: '1.2em', transition: 'transform 0.3s ease' }}>✨</span>
                  </span>
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Checkout Modal */}
      {selectedEvent && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={handleCloseCheckout}
          event={selectedEvent}
        />
      )}
    </div>
  )
}
