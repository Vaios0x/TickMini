'use client'

import { useState, useEffect } from 'react'
import { CheckoutModal } from '@/components/modals/checkout-modal'
import { EventCard } from '@/components/ui/event-card'
import { EventsFilters } from '@/components/ui/events-filters'
import { useEvents } from '@/hooks/use-events'

export function EventsSection() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  const {
    events,
    categories,
    filteredAndSortedEvents,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    clearFilters,
    getCategoryColor,
    getCategoryInfo
  } = useEvents()

  // Track mouse position and window size for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    
    // Set initial window size
    handleResize()
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleBuyTicket = (event: any) => {
    console.log('handleBuyTicket llamado con:', event)
    setSelectedEvent(event)
    setIsCheckoutOpen(true)
    console.log('Estado del modal actualizado:', { selectedEvent: event, isCheckoutOpen: true })
  }

  // Calcular estadísticas
  const totalTickets = events.reduce((sum, event) => sum + event.totalTickets, 0)
  const availableTickets = events.reduce((sum, event) => sum + event.availableTickets, 0)
  const averagePrice = events.length > 0 
    ? (events.reduce((sum, event) => sum + parseFloat(event.price.split(' ')[0]), 0) / events.length).toFixed(2)
    : '0'

  return (
    <section className="events-section" style={{
      padding: 'clamp(2rem, 5vw, 4rem) 0',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Background Effects */}
      <div style={{
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
      }} />
      
      {/* Animated Grid Pattern */}
      <div style={{
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
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 3vw, 2rem)',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Hero Section - Completamente Responsivo */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem)',
          marginBottom: 'clamp(2rem, 5vw, 4rem)',
          position: 'relative'
        }}>
          {/* Hero Background */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(255, 0, 255, 0.08) 50%, rgba(0, 255, 255, 0.08) 100%)',
            backdropFilter: 'blur(30px)',
            borderRadius: 'clamp(20px, 5vw, 40px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: 'clamp(2rem, 5vw, 4rem)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 120px rgba(0, 255, 255, 0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Hero Glow Effects */}
            <div style={{
              position: 'absolute',
              top: '-60%',
              left: '-60%',
              width: '220%',
              height: '220%',
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, transparent 60%)',
              animation: 'pulse 8s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-60%',
              right: '-60%',
              width: '220%',
              height: '220%',
              background: 'radial-gradient(circle, rgba(255, 0, 255, 0.08) 0%, transparent 60%)',
              animation: 'pulse 8s ease-in-out infinite reverse'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                background: 'linear-gradient(45deg, #00ffff 0%, #ff00ff 25%, #ffff00 50%, #00ff00 75%, #00ffff 100%)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 'clamp(1rem, 3vw, 2rem)',
                fontWeight: '900',
                textShadow: '0 0 50px rgba(0, 255, 255, 0.8)',
                letterSpacing: 'clamp(2px, 1vw, 4px)',
                animation: 'gradient-shift 4s ease-in-out infinite',
                lineHeight: '1.1'
              }}>
                🎫 Eventos NFT 2026
              </h1>
              
              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.8rem)',
                color: '#e0e0e0',
                maxWidth: 'clamp(300px, 90vw, 900px)',
                margin: '0 auto clamp(1.5rem, 4vw, 3rem) auto',
                lineHeight: '1.8',
                fontWeight: '300',
                opacity: '0.9'
              }}>
                Descubre los eventos más increíbles del año. Compra tickets NFT únicos y forma parte de experiencias inolvidables en Base Network.
              </p>

              {/* Hero Stats - Completamente Responsivos */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(180px, 50vw, 200px), 1fr))',
                gap: 'clamp(1rem, 3vw, 2rem)',
                maxWidth: 'clamp(600px, 90vw, 800px)',
                margin: '0 auto'
              }}>
                {[
                  { icon: '🎭', value: events.length, label: 'Eventos', color: '#00ffff' },
                  { icon: '🎫', value: availableTickets.toLocaleString(), label: 'Tickets Disponibles', color: '#ff00ff' },
                  { icon: '💰', value: `${averagePrice} ETH`, label: 'Precio Promedio', color: '#ffff00' }
                ].map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: 'center',
                      padding: 'clamp(1.5rem, 4vw, 2rem)',
                      background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                      borderRadius: 'clamp(15px, 4vw, 25px)',
                      border: `1px solid ${stat.color}30`,
                      backdropFilter: 'blur(20px)',
                      boxShadow: `0 10px 30px ${stat.color}20`,
                      transition: 'all 0.4s ease',
                      transform: 'translateY(0)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)'
                      e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}40`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)'
                      e.currentTarget.style.boxShadow = `0 10px 30px ${stat.color}20`
                    }}
                  >
                    <div style={{
                      fontSize: 'clamp(2rem, 5vw, 3rem)',
                      marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                      filter: `drop-shadow(0 0 20px ${stat.color}60)`,
                      animation: 'pulse 3s ease-in-out infinite'
                    }}>
                      {stat.icon}
                    </div>
                    <div style={{
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                      color: stat.color,
                      fontWeight: '900',
                      marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)',
                      textShadow: `0 0 20px ${stat.color}50`
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      color: '#d0d0d0',
                      fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                      fontWeight: '500'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <EventsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />

        {/* Grid de eventos - Completamente Responsivo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(300px, 80vw, 400px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2rem)',
          marginBottom: 'clamp(2rem, 5vw, 4rem)'
        }}>
          {filteredAndSortedEvents.map(event => {
            const categoryInfo = getCategoryInfo(event.category)
            return (
              <EventCard
                key={event.id}
                event={event}
                categoryColor={categoryInfo.color}
                categoryName={categoryInfo.name}
                categoryIcon={categoryInfo.icon}
                onBuyTicket={handleBuyTicket}
              />
            )
          })}
        </div>

        {/* Mensaje cuando no hay eventos */}
        {filteredAndSortedEvents.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
            color: '#b0b0b0'
          }}>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 4rem)', marginBottom: 'clamp(1rem, 2vw, 1rem)' }}>🔍</div>
            <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginBottom: 'clamp(1rem, 2vw, 1rem)' }}>No se encontraron eventos</h3>
            <p style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>Intenta ajustar los filtros de búsqueda o categoría.</p>
            <button
              onClick={clearFilters}
              style={{
                marginTop: 'clamp(1rem, 2vw, 1rem)',
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.2rem, 3vw, 1.5rem)',
                background: 'rgba(0, 255, 255, 0.2)',
                border: '1px solid rgba(0, 255, 255, 0.4)',
                borderRadius: 'clamp(8px, 2vw, 10px)',
                color: '#00ffff',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 255, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Limpiar Filtros
            </button>
          </div>
        )}

        {/* Estadísticas de eventos - Completamente Responsivas */}
        <div style={{
          marginTop: 'clamp(2rem, 5vw, 4rem)',
          padding: 'clamp(1.5rem, 4vw, 2rem)',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: 'clamp(15px, 4vw, 20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#00ffff',
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
          }}>
            📊 Estadísticas de Eventos
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(120px, 40vw, 150px), 1fr))',
            gap: 'clamp(0.8rem, 2vw, 1rem)'
          }}>
            <div style={{
              padding: 'clamp(0.8rem, 2vw, 1rem)',
              background: 'rgba(0, 255, 255, 0.1)',
              borderRadius: 'clamp(10px, 3vw, 15px)',
              border: '1px solid rgba(0, 255, 255, 0.3)'
            }}>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)' }}>🎭</div>
              <div style={{ color: '#00ffff', fontWeight: 'bold', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>
                {filteredAndSortedEvents.length}
              </div>
              <div style={{ color: '#b0b0b0', fontSize: 'clamp(0.7rem, 2vw, 0.9rem)' }}>Eventos</div>
            </div>
            <div style={{
              padding: 'clamp(0.8rem, 2vw, 1rem)',
              background: 'rgba(255, 0, 255, 0.1)',
              borderRadius: 'clamp(10px, 3vw, 15px)',
              border: '1px solid rgba(255, 0, 255, 0.3)'
            }}>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)' }}>🎫</div>
              <div style={{ color: '#ff00ff', fontWeight: 'bold', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>
                {filteredAndSortedEvents.reduce((sum, event) => sum + event.availableTickets, 0)}
              </div>
              <div style={{ color: '#b0b0b0', fontSize: 'clamp(0.7rem, 2vw, 0.9rem)' }}>Tickets Disponibles</div>
            </div>
            <div style={{
              padding: 'clamp(0.8rem, 2vw, 1rem)',
              background: 'rgba(255, 255, 0, 0.1)',
              borderRadius: 'clamp(10px, 3vw, 15px)',
              border: '1px solid rgba(255, 255, 0, 0.3)'
            }}>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)' }}>💰</div>
              <div style={{ color: '#ffff00', fontWeight: 'bold', fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>
                {filteredAndSortedEvents.length > 0 
                  ? (filteredAndSortedEvents.reduce((sum, event) => sum + parseFloat(event.price.split(' ')[0]), 0) / filteredAndSortedEvents.length).toFixed(3)
                  : '0'
                } ETH
              </div>
              <div style={{ color: '#b0b0b0', fontSize: 'clamp(0.7rem, 2vw, 0.9rem)' }}>Precio Promedio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de checkout */}
      {selectedEvent && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          event={selectedEvent}
        />
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}
