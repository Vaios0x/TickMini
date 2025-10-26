'use client'

import * as React from 'react'
import { useState } from 'react'
import { NeynarNotificationManager } from '@/components/notifications/neynar-notification-manager'
import { 
  sendEventCreatedNotification,
  sendTicketPurchasedNotification,
  sendEventReminderNotification,
  sendCustomNotification
} from '@/lib/neynar-client'

export default function NotificationsDemoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [lastResult, setLastResult] = useState<any>(null)
  const [customNotification, setCustomNotification] = useState({
    title: '',
    body: '',
    targetUrl: ''
  })

  // Función para enviar notificación de evento creado
  const handleEventCreated = async () => {
    setIsLoading(true)
    try {
      const result = await sendEventCreatedNotification(
        'Concierto de Rock en Base',
        'event-123',
        []
      )
      setLastResult(result)
      console.log('📤 Resultado evento creado:', result)
    } catch (error) {
      console.error('❌ Error:', error)
      setLastResult({ success: false, error: error instanceof Error ? error.message : 'Error desconocido' })
    } finally {
      setIsLoading(false)
    }
  }

  // Función para enviar notificación de ticket comprado
  const handleTicketPurchased = async () => {
    setIsLoading(true)
    try {
      const result = await sendTicketPurchasedNotification(
        'Concierto de Rock en Base',
        'ticket-456',
        []
      )
      setLastResult(result)
      console.log('📤 Resultado ticket comprado:', result)
    } catch (error) {
      console.error('❌ Error:', error)
      setLastResult({ success: false, error: error instanceof Error ? error.message : 'Error desconocido' })
    } finally {
      setIsLoading(false)
    }
  }

  // Función para enviar notificación de recordatorio
  const handleEventReminder = async () => {
    setIsLoading(true)
    try {
      const result = await sendEventReminderNotification(
        'Concierto de Rock en Base',
        'event-123',
        []
      )
      setLastResult(result)
      console.log('📤 Resultado recordatorio:', result)
    } catch (error) {
      console.error('❌ Error:', error)
      setLastResult({ success: false, error: error instanceof Error ? error.message : 'Error desconocido' })
    } finally {
      setIsLoading(false)
    }
  }

  // Función para enviar notificación personalizada
  const handleCustomNotification = async () => {
    if (!customNotification.title || !customNotification.body) {
      alert('Por favor completa el título y el mensaje')
      return
    }

    setIsLoading(true)
    try {
      const result = await sendCustomNotification(
        customNotification.title,
        customNotification.body,
        customNotification.targetUrl || `${window.location.origin}/events`,
        []
      )
      setLastResult(result)
      console.log('📤 Resultado notificación personalizada:', result)
    } catch (error) {
      console.error('❌ Error:', error)
      setLastResult({ success: false, error: error instanceof Error ? error.message : 'Error desconocido' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      padding: 'clamp(2rem, 5vw, 4rem)',
      color: '#ffffff'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 6vw, 4rem)'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
          }}>
            🔔 Notificaciones Neynar
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            color: '#b0b0b0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Sistema completo de notificaciones para TickMini usando Neynar
          </p>
        </div>

        {/* Neynar Notification Manager */}
        <NeynarNotificationManager />

        {/* Demo de Notificaciones */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.6)',
          borderRadius: 'clamp(20px, 5vw, 25px)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
          border: '2px solid rgba(0, 255, 255, 0.3)',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '700',
            color: '#00ffff',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            textAlign: 'center'
          }}>
            🚀 Demo de Notificaciones
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)'
          }}>
            {/* Notificación de Evento Creado */}
            <div style={{
              background: 'rgba(0, 255, 255, 0.1)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              borderRadius: 'clamp(15px, 3vw, 20px)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: '#00ffff', 
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
              }}>
                🎉 Evento Creado
              </h3>
              
              <p style={{
                color: '#b0b0b0',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                lineHeight: '1.6'
              }}>
                Envía notificación cuando se crea un nuevo evento
              </p>
              
              <button
                onClick={handleEventCreated}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                  background: isLoading 
                    ? 'rgba(100, 100, 100, 0.5)' 
                    : 'linear-gradient(135deg, #00ffff, #0080ff)',
                  border: 'none',
                  borderRadius: 'clamp(10px, 2vw, 15px)',
                  color: '#000000',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                {isLoading ? '⏳ Enviando...' : '📤 Enviar Notificación'}
              </button>
            </div>

            {/* Notificación de Ticket Comprado */}
            <div style={{
              background: 'rgba(255, 0, 255, 0.1)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              borderRadius: 'clamp(15px, 3vw, 20px)',
              border: '1px solid rgba(255, 0, 255, 0.3)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: '#ff00ff', 
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
              }}>
                🎫 Ticket Comprado
              </h3>
              
              <p style={{
                color: '#b0b0b0',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                lineHeight: '1.6'
              }}>
                Envía notificación cuando se compra un ticket
              </p>
              
              <button
                onClick={handleTicketPurchased}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                  background: isLoading 
                    ? 'rgba(100, 100, 100, 0.5)' 
                    : 'linear-gradient(135deg, #ff00ff, #8000ff)',
                  border: 'none',
                  borderRadius: 'clamp(10px, 2vw, 15px)',
                  color: '#ffffff',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 0, 255, 0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                {isLoading ? '⏳ Enviando...' : '📤 Enviar Notificación'}
              </button>
            </div>

            {/* Notificación de Recordatorio */}
            <div style={{
              background: 'rgba(255, 255, 0, 0.1)',
              padding: 'clamp(1.5rem, 3vw, 2rem)',
              borderRadius: 'clamp(15px, 3vw, 20px)',
              border: '1px solid rgba(255, 255, 0, 0.3)',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                color: '#ffff00', 
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
              }}>
                ⏰ Recordatorio
              </h3>
              
              <p style={{
                color: '#b0b0b0',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                lineHeight: '1.6'
              }}>
                Envía recordatorio de evento próximo
              </p>
              
              <button
                onClick={handleEventReminder}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                  background: isLoading 
                    ? 'rgba(100, 100, 100, 0.5)' 
                    : 'linear-gradient(135deg, #ffff00, #ff8000)',
                  border: 'none',
                  borderRadius: 'clamp(10px, 2vw, 15px)',
                  color: '#000000',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(255, 255, 0, 0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                {isLoading ? '⏳ Enviando...' : '📤 Enviar Notificación'}
              </button>
            </div>
          </div>

          {/* Notificación Personalizada */}
          <div style={{
            background: 'rgba(0, 255, 0, 0.1)',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            borderRadius: 'clamp(15px, 3vw, 20px)',
            border: '1px solid rgba(0, 255, 0, 0.3)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)'
          }}>
            <h3 style={{
              color: '#00ff00',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              textAlign: 'center'
            }}>
              ✨ Notificación Personalizada
            </h3>
            
            <div style={{
              display: 'grid',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '600'
                }}>
                  Título
                </label>
                <input
                  type="text"
                  value={customNotification.title}
                  onChange={(e) => setCustomNotification(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: ¡Nuevo evento disponible!"
                  style={{
                    width: '100%',
                    padding: 'clamp(0.8rem, 2vw, 1rem)',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    color: '#ffffff',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)'
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '600'
                }}>
                  Mensaje
                </label>
                <textarea
                  value={customNotification.body}
                  onChange={(e) => setCustomNotification(prev => ({ ...prev, body: e.target.value }))}
                  placeholder="Ej: Se ha creado un nuevo evento increíble que no te puedes perder"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: 'clamp(0.8rem, 2vw, 1rem)',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    color: '#ffffff',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: '600'
                }}>
                  URL de Destino (opcional)
                </label>
                <input
                  type="url"
                  value={customNotification.targetUrl}
                  onChange={(e) => setCustomNotification(prev => ({ ...prev, targetUrl: e.target.value }))}
                  placeholder="https://tickmini.app/events"
                  style={{
                    width: '100%',
                    padding: 'clamp(0.8rem, 2vw, 1rem)',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    color: '#ffffff',
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)'
                  }}
                />
              </div>
            </div>
            
            <button
              onClick={handleCustomNotification}
              disabled={isLoading || !customNotification.title || !customNotification.body}
              style={{
                width: '100%',
                padding: 'clamp(0.8rem, 2vw, 1.2rem)',
                background: (isLoading || !customNotification.title || !customNotification.body)
                  ? 'rgba(100, 100, 100, 0.5)' 
                  : 'linear-gradient(135deg, #00ff00, #008000)',
                border: 'none',
                borderRadius: 'clamp(10px, 2vw, 15px)',
                color: '#000000',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                fontWeight: '600',
                cursor: (isLoading || !customNotification.title || !customNotification.body) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && customNotification.title && customNotification.body) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 255, 0, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && customNotification.title && customNotification.body) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            >
              {isLoading ? '⏳ Enviando...' : '📤 Enviar Notificación Personalizada'}
            </button>
          </div>
        </div>

        {/* Resultado de la última notificación */}
        {lastResult && (
          <div style={{
            background: lastResult.success 
              ? 'rgba(0, 255, 0, 0.1)' 
              : 'rgba(255, 0, 0, 0.1)',
            border: lastResult.success 
              ? '2px solid rgba(0, 255, 0, 0.5)' 
              : '2px solid rgba(255, 0, 0, 0.5)',
            borderRadius: 'clamp(15px, 3vw, 20px)',
            padding: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)'
          }}>
            <h3 style={{
              color: lastResult.success ? '#00ff00' : '#ff6b6b',
              marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              textAlign: 'center'
            }}>
              {lastResult.success ? '✅ Notificación Enviada' : '❌ Error al Enviar'}
            </h3>
            
            <pre style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: 'clamp(1rem, 2vw, 1.5rem)',
              borderRadius: 'clamp(10px, 2vw, 15px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: lastResult.success ? '#00ff00' : '#ff6b6b',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              lineHeight: '1.5',
              overflow: 'auto',
              maxHeight: '300px'
            }}>
              {JSON.stringify(lastResult, null, 2)}
            </pre>
          </div>
        )}

        {/* Información adicional */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 'clamp(15px, 3vw, 20px)',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <h3 style={{
            color: '#ffffff',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)'
          }}>
            📚 Información Importante
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            textAlign: 'left'
          }}>
            <div>
              <h4 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>🔗 Neynar</h4>
              <p style={{ color: '#b0b0b0', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                Plataforma de infraestructura para Mini Apps
              </p>
            </div>
            <div>
              <h4 style={{ color: '#ff00ff', marginBottom: '0.5rem' }}>🔔 Notificaciones</h4>
              <p style={{ color: '#b0b0b0', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                Sistema completo de notificaciones push
              </p>
            </div>
            <div>
              <h4 style={{ color: '#ffff00', marginBottom: '0.5rem' }}>🎯 Segmentación</h4>
              <p style={{ color: '#b0b0b0', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                Filtros avanzados para usuarios específicos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}