'use client'

import React from 'react'
import { VerificationHistory } from '@/hooks/use-ticket-verification'

interface VerificationHistoryProps {
  history: VerificationHistory[]
  onClear: () => void
  onExport: () => void
  onViewDetails: (entry: VerificationHistory) => void
}

export function VerificationHistoryComponent({ 
  history, 
  onClear, 
  onExport, 
  onViewDetails 
}: VerificationHistoryProps) {
  if (history.length === 0) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          opacity: '0.5'
        }}>
          📋
        </div>
        <h3 style={{
          color: '#b0b0b0',
          fontSize: '1.2rem',
          marginBottom: '0.5rem'
        }}>
          Sin Historial de Verificaciones
        </h3>
        <p style={{
          color: '#808080',
          fontSize: '0.9rem',
          lineHeight: '1.5'
        }}>
          Las verificaciones de tickets aparecerán aquí para referencia futura
        </p>
      </div>
    )
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Válido': return '#00ff00'
      case 'Usado': return '#ffaa00'
      case 'Expirado': return '#ff6b6b'
      case 'Revocado': return '#ff0000'
      default: return '#b0b0b0'
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'manual': return '✋'
      case 'qr': return '📱'
      case 'blockchain': return '🔗'
      default: return '❓'
    }
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '20px',
      padding: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '2rem'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h3 style={{
            color: '#00ffff',
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            📋 Historial de Verificaciones
          </h3>
          <p style={{
            color: '#b0b0b0',
            fontSize: '0.9rem'
          }}>
            {history.length} verificación{history.length !== 1 ? 'es' : ''} reciente{history.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '0.8rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onExport}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.2), rgba(0, 255, 255, 0.2))',
              border: '1px solid rgba(0, 255, 0, 0.4)',
              color: '#00ff00',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 255, 0, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            📥 Exportar
          </button>
          
          <button
            onClick={onClear}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(255, 100, 0, 0.2))',
              border: '1px solid rgba(255, 0, 0, 0.4)',
              color: '#ff6b6b',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 0, 0, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            🗑️ Limpiar
          </button>
        </div>
      </div>

      {/* History List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxHeight: '400px',
        overflowY: 'auto'
      }}>
        {history.map((entry, index) => (
          <div
            key={entry.id}
            onClick={() => onViewDetails(entry)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '15px',
              padding: '1.2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
              e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateX(5px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateX(0)'
            }}
            tabIndex={0}
            role="button"
            aria-label={`Ver detalles de verificación ${index + 1}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onViewDetails(entry)
              }
            }}
          >
            {/* Status Indicator */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              height: '3px',
              background: `linear-gradient(90deg, ${getStatusColor(entry.result.ticket.status)}, ${getStatusColor(entry.result.ticket.status)}80)`,
              borderRadius: '15px 15px 0 0'
            }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1rem',
              alignItems: 'center'
            }}>
              {/* Ticket Info */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '1.2rem',
                    filter: 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.5))'
                  }}>
                    🎫
                  </span>
                  <span style={{
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    {entry.result.ticket.eventName}
                  </span>
                  <span style={{
                    background: `rgba(${getStatusColor(entry.result.ticket.status).replace('#', '')}, 0.2)`,
                    border: `1px solid ${getStatusColor(entry.result.ticket.status)}`,
                    borderRadius: '8px',
                    padding: '0.2rem 0.6rem',
                    fontSize: '0.7rem',
                    color: getStatusColor(entry.result.ticket.status),
                    fontWeight: '600'
                  }}>
                    {entry.result.ticket.status}
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    color: '#b0b0b0',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    📅 {entry.result.ticket.eventDate}
                  </span>
                  <span style={{
                    color: '#b0b0b0',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    💰 {entry.result.ticket.price}
                  </span>
                  <span style={{
                    color: '#b0b0b0',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    {getMethodIcon(entry.result.verification.method)} {entry.result.verification.method}
                  </span>
                </div>
              </div>

              {/* Timestamp and Actions */}
              <div style={{
                textAlign: 'right',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '0.5rem'
              }}>
                <span style={{
                  color: '#808080',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace'
                }}>
                  {formatTimestamp(entry.timestamp)}
                </span>
                
                <div style={{
                  fontSize: '0.7rem',
                  color: '#00ffff',
                  background: 'rgba(0, 255, 255, 0.1)',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  borderRadius: '8px',
                  padding: '0.2rem 0.5rem'
                }}>
                  ID: {entry.ticketId.slice(0, 8)}...
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '1rem',
              transform: 'translateY(-50%)',
              color: '#00ffff',
              fontSize: '1.2rem',
              opacity: '0',
              transition: 'all 0.3s ease'
            }}>
              →
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: 'rgba(0, 255, 255, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(0, 255, 255, 0.1)',
        textAlign: 'center'
      }}>
        <p style={{
          color: '#808080',
          fontSize: '0.8rem',
          margin: 0,
          lineHeight: '1.4'
        }}>
          💡 <strong>Consejo:</strong> Haz clic en cualquier entrada para ver los detalles completos del ticket
        </p>
      </div>
    </div>
  )
}
