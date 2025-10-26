'use client'

import * as React from 'react'
import Link from 'next/link'
import { HeroSection } from '@/components/sections/hero-section'
import { CheckoutModal } from '@/components/modals/checkout-modal'
import { AdvancedSearch } from '@/components/ui/advanced-search'
import { EmbedShare } from '@/components/social/embed-share'
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
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    dateRange,
    setDateRange,
    selectedTags,
    setSelectedTags,
    showAdvancedFilters,
    setShowAdvancedFilters,
    categories,
    filteredAndSortedEvents,
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

  // Descripción clara y concisa según Featured Guidelines
  const appDescription = "Plataforma de tickets NFT para eventos en Base Network"
  const valueProposition = "Crea, compra y gestiona tickets únicos como NFTs con transacciones instantáneas y bajas tarifas"

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
        
        {/* Sección de Búsqueda Avanzada Hero */}
        <section 
          className="advanced-search-hero-section"
          style={{
            padding: 'clamp(3rem, 8vw, 6rem) 0',
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(255, 0, 255, 0.05) 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Effects */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.08) 0%, transparent 50%),
              radial-gradient(circle at ${windowSize.width - mousePosition.x}px ${windowSize.height - mousePosition.y}px, rgba(255, 0, 255, 0.08) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
            transition: 'all 0.1s ease'
          }} />
          
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 clamp(1rem, 3vw, 2rem)',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Título de la sección */}
            <div style={{
              textAlign: 'center',
              marginBottom: 'clamp(2rem, 5vw, 4rem)'
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                textAlign: 'center'
              }}>
                🔍 Descubre Eventos Increíbles
              </h2>
            <p style={{
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: '#b0b0b0',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              {valueProposition}
            </p>
            </div>

            {/* Componente de búsqueda avanzada */}
            <AdvancedSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              dateRange={dateRange}
              setDateRange={setDateRange}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              showAdvancedFilters={showAdvancedFilters}
              setShowAdvancedFilters={setShowAdvancedFilters}
              categories={categories}
              totalResults={filteredAndSortedEvents.length}
              isLoading={isLoading}
            />

            {/* Estadísticas PREMIUM con funcionalidad completa */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(180px, 45vw, 220px), 1fr))',
              gap: 'clamp(1.5rem, 4vw, 2.5rem)',
              marginTop: 'clamp(3rem, 6vw, 4rem)'
            }}>
              {[
                { 
                  icon: '🎭', 
                  value: filteredAndSortedEvents.length, 
                  label: 'Eventos Encontrados', 
                  color: '#00ffff',
                  gradient: 'linear-gradient(135deg, #00ffff, #0080ff)',
                  action: 'Ver Eventos',
                  link: '/events'
                },
                { 
                  icon: '🎫', 
                  value: filteredAndSortedEvents.reduce((sum: number, event: any) => sum + (event.availableTickets || 0), 0), 
                  label: 'Tickets Disponibles', 
                  color: '#ff00ff',
                  gradient: 'linear-gradient(135deg, #ff00ff, #8000ff)',
                  action: 'Comprar Tickets',
                  link: '/events'
                },
                { 
                  icon: '💰', 
                  value: filteredAndSortedEvents.length > 0 ? (filteredAndSortedEvents.reduce((sum: number, event: any) => sum + (parseFloat(event.price?.split(' ')[0] || '0')), 0) / filteredAndSortedEvents.length).toFixed(2) : '0', 
                  label: 'Precio Promedio (ETH)', 
                  color: '#ffff00',
                  gradient: 'linear-gradient(135deg, #ffff00, #ff8000)',
                  action: 'Ver Precios',
                  link: '/events'
                }
              ].map((stat, index) => (
                <div key={index} style={{
                  position: 'relative',
                  padding: 'clamp(1.5rem, 4vw, 2rem)',
                  background: `linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)`,
                  borderRadius: 'clamp(20px, 5vw, 25px)',
                  border: `2px solid ${stat.color}40`,
                  textAlign: 'center',
                  backdropFilter: 'blur(25px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  boxShadow: `0 10px 30px ${stat.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                }}
                onMouseEnter={(e: any) => {
                  const target = e.currentTarget as HTMLElement
                  target.style.transform = 'translateY(-8px) scale(1.02)'
                  target.style.boxShadow = `0 25px 50px ${stat.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
                  target.style.borderColor = `${stat.color}80`
                }}
                onMouseLeave={(e: any) => {
                  const target = e.currentTarget as HTMLElement
                  target.style.transform = 'translateY(0) scale(1)'
                  target.style.boxShadow = `0 10px 30px ${stat.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                  target.style.borderColor = `${stat.color}40`
                }}
                >
                  {/* Fondo animado */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: stat.gradient,
                    opacity: 0.1,
                    transition: 'opacity 0.3s ease'
                  }} />
                  
                  {/* Efecto de brillo en hover */}
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: `radial-gradient(circle, ${stat.color}20 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    transform: 'rotate(45deg)'
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
                  
                  {/* Contenido principal */}
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    {/* Icono con animación */}
                    <div style={{ 
                      fontSize: 'clamp(2.5rem, 7vw, 3.5rem)', 
                      marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
                      filter: `drop-shadow(0 0 20px ${stat.color}80)`,
                      animation: 'stat-icon-float 3s ease-in-out infinite',
                      animationDelay: `${index * 0.5}s`
                    }}>
                      {stat.icon}
                    </div>
                    
                    {/* Valor con efecto de contador */}
                    <div style={{ 
                      color: stat.color, 
                      fontWeight: '900', 
                      fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                      marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
                      textShadow: `0 0 30px ${stat.color}80`,
                      letterSpacing: '1px'
                    }}>
                      {stat.value}
                    </div>
                    
                    {/* Label mejorado */}
                    <div style={{ 
                      color: '#ffffff', 
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                      lineHeight: '1.4',
                      fontWeight: '500',
                      marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)',
                      opacity: 0.9
                    }}>
                      {stat.label}
                    </div>
                    
                    {/* Botón de acción FUNCIONAL */}
                    <a href={stat.link} style={{ textDecoration: 'none' }}>
                      <button style={{
                        width: '100%',
                        padding: 'clamp(0.8rem, 2vw, 1rem)',
                        background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                        border: `1px solid ${stat.color}60`,
                        borderRadius: 'clamp(12px, 3vw, 15px)',
                        color: stat.color,
                        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        backdropFilter: 'blur(10px)'
                      }}
                                             onMouseEnter={(e: any) => {
                         const target = e.currentTarget as HTMLElement
                         target.style.background = `linear-gradient(135deg, ${stat.color}40, ${stat.color}20)`
                         target.style.borderColor = `${stat.color}`
                         target.style.transform = 'scale(1.05)'
                         target.style.boxShadow = `0 5px 20px ${stat.color}40`
                       }}
                       onMouseLeave={(e: any) => {
                         const target = e.currentTarget as HTMLElement
                         target.style.background = `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`
                         target.style.borderColor = `${stat.color}60`
                         target.style.transform = 'scale(1)'
                         target.style.boxShadow = 'none'
                       }}
                      >
                        {stat.action}
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón de acción */}
            <div style={{
              textAlign: 'center',
              marginTop: 'clamp(2rem, 5vw, 3rem)'
            }}>
              <a href="/events">
                <button 
                  style={{
                    padding: 'clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 3rem)',
                    background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                    border: 'none',
                    borderRadius: 'clamp(15px, 4vw, 20px)',
                    color: '#000000',
                    fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)'
                  }}
                  onMouseEnter={(e: any) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(-3px)'
                    target.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.5)'
                  }}
                  onMouseLeave={(e: any) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(0)'
                    target.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.3)'
                  }}
                >
                  🚀 Ver Todos los Eventos
                </button>
              </a>
            </div>
          </div>
        </section>
        




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
            
            {/* Embed Share Section */}
            <div style={{
              marginTop: 'clamp(3rem, 6vw, 4rem)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: '600',
                color: '#ffffff',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
              }}>
                📤 Comparte TickMini
              </h3>
              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                color: '#b0b0b0',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                maxWidth: '600px',
                margin: '0 auto clamp(1.5rem, 3vw, 2rem) auto'
              }}>
                Invita a tus amigos a descubrir el futuro del ticketing digital
              </p>
              <div style={{
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                <EmbedShare />
              </div>
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
