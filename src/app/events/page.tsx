'use client'

import React from 'react'
import { CheckoutModal } from '@/components/modals/checkout-modal'
import { AdvancedSearch } from '@/components/ui/advanced-search'
import { useEvents } from '@/hooks/use-events'
import { useBlockchainTickets } from '@/hooks/use-blockchain-tickets'
import Link from 'next/link'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  price: string
  image: string
  category: string
  organizer: string
  availableTickets: number
  totalTickets: number
}

interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export default function EventsPage() {
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
    availableTags,
    filteredAndSortedEvents,
    isLoading,
    clearAllFilters,
    toggleTag
  } = useEvents()
  
  // Hook para verificar tickets comprados
  const { tickets: purchasedTickets } = useBlockchainTickets()
  
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [hoveredEvent, setHoveredEvent] = React.useState<number | null>(null)
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 })
  const [isVisible, setIsVisible] = React.useState(false)

  // Inicialización del componente
  React.useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
    }
    
    // Set initial window size solo en el cliente
    if (typeof window !== 'undefined') {
      handleResize()
      
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  // Usar los eventos del hook useEvents
  const events = filteredAndSortedEvents




  // Función para verificar si un evento ya fue comprado
  const isEventPurchased = (eventId: number) => {
    return purchasedTickets.some(ticket => ticket.eventId === eventId)
  }

  const handleBuyTicket = (event: Event) => {
    // Verificar si el evento ya fue comprado
    if (isEventPurchased(event.id)) {
      alert('Ya has comprado un ticket para este evento. Puedes verlo en "Mis Tickets".')
      return
    }
    
    setSelectedEvent(event)
    setIsCheckoutOpen(true)
  }

  const getProgressPercentage = (available: number, total: number) => {
    return ((total - available) / total) * 100
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.color : '#00ffff'
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
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

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => {
        const left = `${(i * 5.5) % 100}%`
        const top = `${(i * 7.3) % 100}%`
        const animationDuration = `${5 + (i % 5)}s`
        const animationDelay = `${(i % 5)}s`
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left,
              top,
              width: '4px',
              height: '4px',
              background: `hsl(${i * 18}, 100%, 70%)`,
              borderRadius: '50%',
              filter: 'blur(1px)',
              animation: `float-particle ${animationDuration} ease-in-out infinite`,
              animationDelay,
              pointerEvents: 'none'
            }}
          />
        )
      })}

      <div style={{ position: 'relative', zIndex: 1, padding: '2rem 0' }}>
        {/* Hero Section - Completamente Renovado */}
        <div style={{
          textAlign: 'center',
          padding: '5rem 2rem',
          marginBottom: '4rem',
          position: 'relative'
        }}>
          {/* Hero Background */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(255, 0, 255, 0.08) 50%, rgba(0, 255, 255, 0.08) 100%)',
            backdropFilter: 'blur(30px)',
            borderRadius: '40px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '4rem',
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
                marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: '900',
                textShadow: '0 0 50px rgba(0, 255, 255, 0.8)',
                letterSpacing: 'clamp(2px, 1vw, 4px)',
                animation: 'gradient-shift 4s ease-in-out infinite',
                textAlign: 'center',
                lineHeight: '1.2'
              }}>
                🎫 Eventos NFT 2026
              </h1>
              
              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.8rem)',
                color: '#e0e0e0',
                maxWidth: 'clamp(600px, 85vw, 900px)',
                margin: '0 auto clamp(2rem, 5vw, 3rem) auto',
                lineHeight: '1.6',
                fontWeight: '300',
                opacity: '0.9',
                textAlign: 'center'
              }}>
                Descubre los eventos más increíbles del año. Compra tickets NFT únicos y forma parte de experiencias inolvidables en Base Network.
              </p>

              {/* Hero Stats - Rediseñados */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(180px, 25vw, 220px), 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2rem)',
                maxWidth: 'clamp(700px, 90vw, 900px)',
                margin: '0 auto',
                justifyItems: 'center',
                justifyContent: 'center'
              }}>
                {[
                  { icon: '🎭', value: events.length, label: 'Eventos', color: '#00ffff' },
                  { icon: '🎫', value: events.reduce((sum, event) => sum + event.availableTickets, 0), label: 'Tickets Disponibles', color: '#ff00ff' },
                  { icon: '💰', value: events.length > 0 ? (events.reduce((sum, event) => sum + parseFloat(event.price.split(' ')[0]), 0) / events.length).toFixed(2) + ' ETH' : '0 ETH', label: 'Precio Promedio', color: '#ffff00' }
                ].map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: 'center',
                      padding: 'clamp(1.5rem, 3vw, 2rem)',
                      background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                      borderRadius: 'clamp(20px, 4vw, 25px)',
                      border: `1px solid ${stat.color}30`,
                      backdropFilter: 'blur(20px)',
                      boxShadow: `0 10px 30px ${stat.color}20`,
                      transition: 'all 0.4s ease',
                      transform: 'translateY(0)',
                      cursor: 'pointer',
                      width: '100%',
                      maxWidth: 'clamp(180px, 25vw, 220px)',
                      minHeight: 'clamp(160px, 25vw, 200px)'
                    }}
                    onMouseEnter={(e: any) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)'
                      e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}40`
                    }}
                    onMouseLeave={(e: any) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)'
                      e.currentTarget.style.boxShadow = `0 10px 30px ${stat.color}20`
                    }}
                  >
                    <div style={{
                      fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                      marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                      filter: `drop-shadow(0 0 20px ${stat.color}60)`,
                      animation: 'pulse 3s ease-in-out infinite'
                    }}>
                      {stat.icon}
                    </div>
                    <div style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      color: stat.color,
                      fontWeight: '900',
                      marginBottom: 'clamp(0.4rem, 1vw, 0.5rem)',
                      textShadow: `0 0 20px ${stat.color}50`
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      color: '#d0d0d0',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
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

        {/* Advanced Search Component */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2rem)',
          marginBottom: 'clamp(2rem, 5vw, 4rem)'
        }}>
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
          
          {/* Create Event Button */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/create-event">
              <button style={{
                background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
                color: '#000000',
                border: 'none',
                padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(2rem, 4vw, 3rem)',
                borderRadius: 'clamp(20px, 5vw, 25px)',
                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                fontWeight: '900',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                boxShadow: '0 15px 35px rgba(0, 255, 255, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                transform: 'translateY(0)',
                minHeight: 'clamp(50px, 10vw, 60px)'
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)'
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 255, 255, 0.6)'
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 255, 255, 0.4)'
              }}
              tabIndex={0}
              aria-label="Crear nuevo evento"
              >
                ✨ Crear Evento
              </button>
            </Link>
          </div>
        </div>


        {/* Events Grid - Completamente Responsivo */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2rem)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(300px, 80vw, 400px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)'
          }}>
          {filteredAndSortedEvents.map(event => (
              <div
                key={event.id}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  borderRadius: 'clamp(20px, 5vw, 30px)',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  border: `2px solid ${getCategoryColor(event.category)}40`,
                  boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 60px ${getCategoryColor(event.category)}20`,
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transform: hoveredEvent === event.id ? 'translateY(-15px) scale(1.02)' : 'translateY(0) scale(1)',
                  filter: hoveredEvent === event.id ? 'brightness(1.1)' : 'brightness(1)'
                }}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
                tabIndex={0}
                role="button"
                aria-label={`Evento: ${event.title}`}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleBuyTicket(event)
                  }
                }}
              >
                {/* Event Background Glow */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '300px',
                  height: '300px',
                  background: `radial-gradient(circle, ${getCategoryColor(event.category)}15 0%, transparent 70%)`,
                  borderRadius: '50%',
                  filter: 'blur(50px)',
                  pointerEvents: 'none',
                  opacity: hoveredEvent === event.id ? '1' : '0.5',
                  transition: 'all 0.5s ease'
                }} />

                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: 'clamp(1rem, 3vw, 1.5rem)',
                  right: 'clamp(1rem, 3vw, 1.5rem)',
                  background: `linear-gradient(135deg, ${getCategoryColor(event.category)}20, ${getCategoryColor(event.category)}10)`,
                  border: `1px solid ${getCategoryColor(event.category)}40`,
                  borderRadius: 'clamp(15px, 4vw, 20px)',
                  padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
                  fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                  color: getCategoryColor(event.category),
                  fontWeight: '700',
                  backdropFilter: 'blur(10px)',
                  zIndex: 2
                }}>
                  {categories.find(cat => cat.id === event.category)?.icon} {categories.find(cat => cat.id === event.category)?.name}
                </div>

                {/* Rating Badge */}
                {event.rating && (
                  <div style={{
                    position: 'absolute',
                    top: 'clamp(1rem, 3vw, 1.5rem)',
                    left: 'clamp(1rem, 3vw, 1.5rem)',
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1))',
                    border: '1px solid rgba(255, 215, 0, 0.4)',
                    borderRadius: 'clamp(15px, 4vw, 20px)',
                    padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
                    fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                    color: '#FFD700',
                    fontWeight: '700',
                    backdropFilter: 'blur(10px)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    ⭐ {event.rating}
                  </div>
                )}

              {/* Event Image */}
              <div style={{
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                textAlign: 'center',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                filter: `drop-shadow(0 0 25px ${getCategoryColor(event.category)}60)`,
                animation: hoveredEvent === event.id ? 'pulse 2s ease-in-out infinite' : 'none',
                transition: 'all 0.3s ease'
              }}>
                {event.image}
              </div>

              {/* Event Title */}
              <h3 style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
                color: '#ffffff',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                fontWeight: '900',
                textAlign: 'center',
                textShadow: `0 0 20px ${getCategoryColor(event.category)}50`,
                lineHeight: '1.3'
              }}>
                {event.title}
              </h3>

              {/* Event Description */}
              <p style={{
                color: '#d0d0d0',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                lineHeight: '1.7',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                textAlign: 'center',
                opacity: '0.9'
              }}>
                {event.description}
              </p>

              {/* Event Tags */}
              {event.tags && event.tags.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  justifyContent: 'center',
                  marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
                }}>
                  {event.tags.slice(0, 4).map((tagId, index) => {
                    const tag = availableTags.find(t => t.id === tagId)
                    return tag ? (
                      <span
                        key={index}
                        style={{
                          background: `linear-gradient(135deg, ${tag.color}20, ${tag.color}10)`,
                          border: `1px solid ${tag.color}30`,
                          borderRadius: 'clamp(8px, 2vw, 12px)',
                          padding: 'clamp(0.3rem, 1vw, 0.5rem) clamp(0.6rem, 1.5vw, 0.8rem)',
                          fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                          color: tag.color,
                          fontWeight: '600',
                          backdropFilter: 'blur(10px)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        {tag.icon} {tag.name}
                      </span>
                    ) : null
                  })}
                  {event.tags.length > 4 && (
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 'clamp(8px, 2vw, 12px)',
                      padding: 'clamp(0.3rem, 1vw, 0.5rem) clamp(0.6rem, 1.5vw, 0.8rem)',
                      fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                      color: '#ffffff',
                      fontWeight: '600',
                      backdropFilter: 'blur(10px)'
                    }}>
                      +{event.tags.length - 4} más
                    </span>
                  )}
                </div>
              )}

                {/* Event Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: 'clamp(0.8rem, 2vw, 1rem)',
                  marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                    color: '#e0e0e0',
                    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                    padding: 'clamp(0.5rem, 1vw, 0.8rem)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    width: '100%',
                    minWidth: '0'
                  }}>
                    <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>📅</span>
                    <span style={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap',
                      flex: '1'
                    }}>{event.date}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                    color: '#e0e0e0',
                    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                    padding: 'clamp(0.5rem, 1vw, 0.8rem)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    width: '100%',
                    minWidth: '0'
                  }}>
                    <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>🕐</span>
                    <span style={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap',
                      flex: '1'
                    }}>{event.time}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                    color: '#e0e0e0',
                    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                    padding: 'clamp(0.5rem, 1vw, 0.8rem)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    width: '100%',
                    minWidth: '0'
                  }}>
                    <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>📍</span>
                    <span style={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap',
                      flex: '1'
                    }}>{event.location}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                    color: '#e0e0e0',
                    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                    padding: 'clamp(0.5rem, 1vw, 0.8rem)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    width: '100%',
                    minWidth: '0'
                  }}>
                    <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>👤</span>
                    <span style={{ 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap',
                      flex: '1'
                    }}>{event.organizer}</span>
                  </div>
                  
                  {/* Event Type */}
                  {event.eventType && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                      color: '#e0e0e0',
                      fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                      padding: 'clamp(0.5rem, 1vw, 0.8rem)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 'clamp(8px, 2vw, 12px)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      width: '100%',
                      minWidth: '0'
                    }}>
                      <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>
                        {event.eventType === 'presential' ? '🎭' : event.eventType === 'virtual' ? '💻' : '🌐'}
                      </span>
                      <span style={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        flex: '1'
                      }}>
                        {event.eventType === 'presential' ? 'Presencial' : event.eventType === 'virtual' ? 'Virtual' : 'Híbrido'}
                      </span>
                    </div>
                  )}
                  
                  {/* Distance */}
                  {event.distance !== undefined && event.distance > 0 && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                      color: '#e0e0e0',
                      fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                      padding: 'clamp(0.5rem, 1vw, 0.8rem)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: 'clamp(8px, 2vw, 12px)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      width: '100%',
                      minWidth: '0'
                    }}>
                      <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>📍</span>
                      <span style={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        flex: '1'
                      }}>{event.distance.toFixed(1)} km</span>
                    </div>
                  )}
                </div>

                {/* Price Section */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                  padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                  background: `linear-gradient(135deg, ${getCategoryColor(event.category)}15, ${getCategoryColor(event.category)}05)`,
                  borderRadius: 'clamp(15px, 4vw, 20px)',
                  border: `1px solid ${getCategoryColor(event.category)}30`
                }}>
                  <div style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
                    color: getCategoryColor(event.category),
                    fontWeight: '900',
                    marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)',
                    textShadow: `0 0 25px ${getCategoryColor(event.category)}60`
                  }}>
                    {event.price}
                  </div>
                  <div style={{
                    color: '#b0b0b0',
                    fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                    fontWeight: '500'
                  }}>
                    Precio por Ticket
                  </div>
                </div>

              {/* Ticket Availability */}
              <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  color: '#b0b0b0',
                  fontWeight: '500'
                }}>
                  <span>Tickets Disponibles</span>
                  <span style={{ color: '#ffffff', fontWeight: '700' }}>
                    {event.availableTickets} / {event.totalTickets}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: 'clamp(8px, 2vw, 12px)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 'clamp(4px, 1vw, 6px)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    width: `${getProgressPercentage(event.availableTickets, event.totalTickets)}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${getCategoryColor(event.category)}, ${getCategoryColor(event.category)}80)`,
                    borderRadius: 'clamp(4px, 1vw, 6px)',
                    transition: 'width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: `0 0 20px ${getCategoryColor(event.category)}40`
                  }} />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: 'clamp(0.8rem, 2vw, 1rem)',
                flexDirection: 'row'
              }}>
                <button
                  onClick={() => handleBuyTicket(event)}
                  disabled={isEventPurchased(event.id)}
                  style={{
                    flex: 1,
                    background: isEventPurchased(event.id) 
                      ? 'linear-gradient(135deg, #666666, #888888)'
                      : `linear-gradient(135deg, ${getCategoryColor(event.category)}, ${getCategoryColor(event.category)}80)`,
                    color: isEventPurchased(event.id) ? '#cccccc' : '#000000',
                    border: 'none',
                    padding: 'clamp(1rem, 2.5vw, 1.2rem)',
                    borderRadius: 'clamp(15px, 4vw, 20px)',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    fontWeight: '900',
                    cursor: isEventPurchased(event.id) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: isEventPurchased(event.id) 
                      ? '0 5px 15px rgba(102, 102, 102, 0.3)'
                      : `0 10px 30px ${getCategoryColor(event.category)}40`,
                    transform: 'translateY(0)',
                    minHeight: 'clamp(45px, 8vw, 55px)',
                    opacity: isEventPurchased(event.id) ? 0.7 : 1
                  }}
                  onMouseEnter={(e: any) => {
                    if (!isEventPurchased(event.id)) {
                      e.currentTarget.style.transform = 'translateY(-3px)'
                      e.currentTarget.style.boxShadow = `0 15px 40px ${getCategoryColor(event.category)}60`
                    }
                  }}
                  onMouseLeave={(e: any) => {
                    if (!isEventPurchased(event.id)) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = `0 10px 30px ${getCategoryColor(event.category)}40`
                    }
                  }}
                  tabIndex={0}
                  aria-label={isEventPurchased(event.id) 
                    ? `Ya comprado - ${event.title}` 
                    : `Comprar ticket para ${event.title}`}
                >
                  {isEventPurchased(event.id) ? '✅ Ya Comprado' : '🎫 Comprar Ticket'}
                </button>
                <button style={{
                  padding: 'clamp(1rem, 2.5vw, 1.2rem)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 'clamp(15px, 4vw, 20px)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  backdropFilter: 'blur(15px)',
                  minHeight: 'clamp(45px, 8vw, 55px)',
                  minWidth: 'clamp(45px, 8vw, 55px)'
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                tabIndex={0}
                aria-label="Agregar a favoritos"
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedEvent && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          event={selectedEvent}
        />
      )}

        {/* CSS Animations y Responsive */}
        <style>{`
          @keyframes pulse {
            0%, 100% { 
              opacity: 0.3;
              transform: scale(1);
            }
            50% { 
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
          
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px);
            }
            50% { 
              transform: translateY(-20px);
            }
          }
          
          @keyframes glow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
            }
            50% { 
              box-shadow: 0 0 40px rgba(0, 255, 255, 0.6);
            }
          }

          @keyframes gradient-shift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes grid-move {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(50px, 50px);
            }
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

          .gradient-shift {
            animation: gradient-shift 4s ease-in-out infinite;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .events-page {
              padding: 1rem;
            }
            
            .hero-section {
              padding: 2rem 0;
            }
            
            .search-filters {
              padding: 1.5rem;
            }
            
            .events-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
            
            .event-card {
              padding: 1.5rem;
            }
            
            .action-buttons {
              flex-direction: column;
            }
          }
          
          @media (max-width: 480px) {
            .hero-section {
              padding: 1rem 0;
            }
            
            .search-filters {
              padding: 1rem;
            }
            
            .event-details {
              grid-template-columns: 1fr;
            }
            
            .price-section {
              padding: 1rem;
            }
          }
          
          /* Accessibility */
          .event-card:focus,
          .search-input:focus,
          .filter-select:focus,
          .action-button:focus {
            outline: 2px solid #00ffff;
            outline-offset: 2px;
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Performance optimizations */
          .events-page {
            will-change: transform;
          }
          
          .event-card {
            will-change: transform, opacity;
          }
        `}</style>
      </div>
    </div>
  )
}
