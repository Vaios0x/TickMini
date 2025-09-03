'use client'

import { useState } from 'react'

interface EventCardProps {
  event: {
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
    featured?: boolean
  }
  categoryColor: string
  categoryName: string
  categoryIcon: string
  onBuyTicket: (event: any) => void
}

export function EventCard({ event, categoryColor, categoryName, categoryIcon, onBuyTicket }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Verificar que recibimos la función correctamente
  console.log('🎫 EventCard renderizado:', event.title, 'onBuyTicket:', typeof onBuyTicket, 'función:', !!onBuyTicket)

  const getProgressPercentage = (available: number, total: number) => {
    return ((total - available) / total) * 100
  }

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
        borderRadius: '20px',
        padding: 'clamp(1.5rem, 4vw, 2rem)', // Padding responsive
        border: `2px solid ${categoryColor}40`,
        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 60px ${categoryColor}20`,
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'visible', // Cambiado de hidden a visible para evitar cortes
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        minHeight: 'clamp(500px, 70vh, 600px)', // Altura responsive
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box' // Asegurar que el padding se incluya en el tamaño
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        console.log('🎫 CONTAINER clickeado - se previene la propagación')
        e.stopPropagation()
      }}
      // Agregar estilos CSS adicionales para responsividad
      className="event-card-responsive"
    >
      {/* Badge de categoría */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: `linear-gradient(135deg, ${categoryColor}20, ${categoryColor}10)`,
        border: `1px solid ${categoryColor}40`,
        borderRadius: '15px',
        padding: '0.5rem 1rem',
        fontSize: '0.8rem',
        color: categoryColor,
        fontWeight: '600',
        zIndex: 2,
        backdropFilter: 'blur(10px)'
      }}>
        {categoryIcon} {categoryName}
      </div>

      {/* Badge de destacado */}
      {event.featured && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
          color: '#000000',
          borderRadius: '15px',
          padding: '0.5rem 1rem',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          zIndex: 2,
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
        }}>
          ⭐ Destacado
        </div>
      )}

      {/* Imagen del evento */}
      <div style={{
        fontSize: '4rem',
        textAlign: 'center',
        marginBottom: '1.5rem',
        filter: `drop-shadow(0 0 20px ${categoryColor}60)`,
        transition: 'all 0.3s ease'
      }}>
        {event.image}
      </div>

      {/* Título del evento */}
      <h3 style={{
        fontSize: '1.5rem',
        color: '#ffffff',
        marginBottom: '1rem',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: '1.3',
        minHeight: '3.6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {event.title}
      </h3>

      {/* Descripción */}
      <p style={{
        color: '#d0d0d0',
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '1.5rem',
        textAlign: 'center',
        flex: 1,
        display: 'flex',
        alignItems: 'center'
      }}>
        {event.description}
      </p>

      {/* Detalles del evento */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#e0e0e0',
          fontSize: '0.9rem',
          padding: '0.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '8px'
        }}>
          <span>📅</span>
          <span style={{ wordBreak: 'break-word' }}>{event.date}</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#e0e0e0',
          fontSize: '0.9rem',
          padding: '0.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '8px'
        }}>
          <span>🕐</span>
          <span style={{ wordBreak: 'break-word' }}>{event.time}</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#e0e0e0',
          fontSize: '0.9rem',
          padding: '0.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '8px'
        }}>
          <span>📍</span>
          <span style={{ wordBreak: 'break-word' }}>{event.location}</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#e0e0e0',
          fontSize: '0.9rem',
          padding: '0.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '8px'
        }}>
          <span>👤</span>
          <span style={{ wordBreak: 'break-word' }}>{event.organizer}</span>
        </div>
      </div>

      {/* Precio */}
      <div style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        padding: '1rem',
        background: `linear-gradient(135deg, ${categoryColor}15, ${categoryColor}05)`,
        borderRadius: '15px',
        border: `1px solid ${categoryColor}30`,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          fontSize: '2rem',
          color: categoryColor,
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          textShadow: `0 0 20px ${categoryColor}60`
        }}>
          {event.price}
        </div>
        <div style={{
          color: '#b0b0b0',
          fontSize: '0.9rem'
        }}>
          Precio por Ticket
        </div>
      </div>

      {/* Disponibilidad de tickets */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          color: '#b0b0b0'
        }}>
          <span>Tickets Disponibles</span>
          <span style={{ color: '#ffffff', fontWeight: '600' }}>
            {event.availableTickets} / {event.totalTickets}
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${getProgressPercentage(event.availableTickets, event.totalTickets)}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}80)`,
            borderRadius: '4px',
            transition: 'width 1s ease',
            boxShadow: `0 0 10px ${categoryColor}40`
          }} />
        </div>
      </div>

      {/* Botón de compra */}
      <button
        onClick={(e) => {
          console.log('🎫 BOTÓN CLICKEADO - Evento:', event.title)
          e.preventDefault()
          e.stopPropagation()
          console.log('🎫 Llamando onBuyTicket...')
          if (onBuyTicket && typeof onBuyTicket === 'function') {
            onBuyTicket(event)
          } else {
            console.error('🎫 ERROR: onBuyTicket no está disponible o no es una función!')
          }
        }}
        onMouseDown={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        style={{
          width: '100%',
          background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}80)`,
          color: '#000000',
          border: 'none',
          padding: '1rem',
          borderRadius: '15px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          textTransform: 'uppercase',
          marginTop: 'auto',
          boxShadow: `0 5px 20px ${categoryColor}40`,
          position: 'relative',
          zIndex: 100,
          pointerEvents: 'auto'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = `0 15px 30px ${categoryColor}60`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = `0 5px 20px ${categoryColor}40`
        }}
        tabIndex={0}
        aria-label={`Comprar ticket para ${event.title}`}
      >
        🎫 Comprar Ticket
      </button>
    </div>
  )
}
