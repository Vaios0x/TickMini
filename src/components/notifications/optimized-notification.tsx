'use client'

import * as React from 'react'

interface NotificationProps {
  title: string
  body: string
  targetUrl: string
  type?: 'reminder' | 'event' | 'feature' | 'alert'
  priority?: 'low' | 'medium' | 'high'
  timestamp?: Date
  isRead?: boolean
  onDismiss?: () => void
  onClick?: () => void
}

export function OptimizedNotification({
  title,
  body,
  targetUrl,
  type = 'event',
  priority = 'medium',
  timestamp,
  isRead = false,
  onDismiss,
  onClick
}: NotificationProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      onDismiss?.()
    }, 300)
  }

  const handleClick = () => {
    onClick?.()
    // En una implementación real, esto abriría la URL
    if (targetUrl) {
      window.open(targetUrl, '_blank')
    }
  }

  if (!isVisible) return null

  const typeConfig = {
    reminder: {
      icon: '⏰',
      color: '#ffff00',
      bgColor: 'rgba(255, 255, 0, 0.1)',
      borderColor: 'rgba(255, 255, 0, 0.3)'
    },
    event: {
      icon: '🎉',
      color: '#00ffff',
      bgColor: 'rgba(0, 255, 255, 0.1)',
      borderColor: 'rgba(0, 255, 255, 0.3)'
    },
    feature: {
      icon: '✨',
      color: '#ff00ff',
      bgColor: 'rgba(255, 0, 255, 0.1)',
      borderColor: 'rgba(255, 0, 255, 0.3)'
    },
    alert: {
      icon: '⚠️',
      color: '#ff6b6b',
      bgColor: 'rgba(255, 107, 107, 0.1)',
      borderColor: 'rgba(255, 107, 107, 0.3)'
    }
  }

  const config = typeConfig[type]

  return (
    <div
      style={{
        background: config.bgColor,
        border: `1px solid ${config.borderColor}`,
        borderRadius: 'clamp(12px, 3vw, 16px)',
        padding: 'clamp(1rem, 2vw, 1.5rem)',
        marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        opacity: isRead ? 0.7 : 1,
        transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = `0 10px 20px ${config.color}20`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Priority Indicator */}
      {priority === 'high' && (
        <div style={{
          position: 'absolute',
          top: 'clamp(0.5rem, 1vw, 0.8rem)',
          right: 'clamp(0.5rem, 1vw, 0.8rem)',
          width: 'clamp(8px, 2vw, 10px)',
          height: 'clamp(8px, 2vw, 10px)',
          borderRadius: '50%',
          background: '#ff6b6b',
          animation: 'pulse 2s ease-in-out infinite'
        }} />
      )}

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(0.8rem, 2vw, 1rem)',
        marginBottom: 'clamp(0.8rem, 2vw, 1rem)'
      }}>
        {/* Icon */}
        <div style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          filter: `drop-shadow(0 0 10px ${config.color}50)`
        }}>
          {config.icon}
        </div>

        {/* Title */}
        <h3 style={{
          color: config.color,
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          fontWeight: '700',
          margin: 0,
          flex: 1,
          lineHeight: '1.3'
        }}>
          {title}
        </h3>

        {/* Dismiss Button */}
        {onDismiss && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleDismiss()
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: 'clamp(24px, 6vw, 32px)',
              height: 'clamp(24px, 6vw, 32px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: '#ffffff'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            }}
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        )}
      </div>

      {/* Body */}
      <p style={{
        color: '#ffffff',
        fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
        lineHeight: '1.5',
        margin: 0,
        marginBottom: 'clamp(0.8rem, 2vw, 1rem)'
      }}>
        {body}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
        color: '#b0b0b0'
      }}>
        {/* Timestamp */}
        {timestamp && (
          <span>
            {new Date(timestamp).toLocaleString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit'
            })}
          </span>
        )}

        {/* Action Hint */}
        <span style={{
          color: config.color,
          fontWeight: '500'
        }}>
          Toca para ver →
        </span>
      </div>
    </div>
  )
}

// Componente de lista de notificaciones
export function NotificationList({ notifications }: { notifications: NotificationProps[] }) {
  const [filter, setFilter] = React.useState<'all' | 'unread' | 'read'>('all')

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead
      case 'read':
        return notification.isRead
      default:
        return true
    }
  })

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 'clamp(15px, 3vw, 20px)',
      padding: 'clamp(1.5rem, 3vw, 2rem)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        <h2 style={{
          color: '#ffffff',
          fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
          fontWeight: '700',
          margin: 0
        }}>
          🔔 Notificaciones
        </h2>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          gap: 'clamp(0.3rem, 0.8vw, 0.5rem)'
        }}>
          {(['all', 'unread', 'read'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              style={{
                padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1rem)',
                background: filter === filterType 
                  ? 'linear-gradient(135deg, #00ffff, #0080ff)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: 'clamp(6px, 1.5vw, 8px)',
                color: filter === filterType ? '#000000' : '#ffffff',
                fontSize: 'clamp(0.8rem, 1.8vw, 1rem)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'capitalize'
              }}
            >
              {filterType === 'all' ? 'Todas' : filterType === 'unread' ? 'No leídas' : 'Leídas'}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div style={{
        maxHeight: 'clamp(400px, 50vh, 600px)',
        overflowY: 'auto',
        paddingRight: 'clamp(0.5rem, 1vw, 1rem)'
      }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <OptimizedNotification
              key={index}
              {...notification}
            />
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: 'clamp(2rem, 5vw, 3rem)',
            color: '#b0b0b0'
          }}>
            <div style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
            }}>
              🔔
            </div>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              margin: 0
            }}>
              No hay notificaciones {filter === 'unread' ? 'sin leer' : filter === 'read' ? 'leídas' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
