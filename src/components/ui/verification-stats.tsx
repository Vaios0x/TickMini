'use client'

import React from 'react'
import { VerificationHistory } from '@/hooks/use-ticket-verification'

interface VerificationStatsProps {
  history: VerificationHistory[]
}

export function VerificationStats({ history }: VerificationStatsProps) {
  if (history.length === 0) return null

  const totalVerifications = history.length
  const validTickets = history.filter(entry => entry.result.isValid).length
  const invalidTickets = totalVerifications - validTickets
  
  const methodStats = history.reduce((acc, entry) => {
    const method = entry.result.verification.method
    acc[method] = (acc[method] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const statusStats = history.reduce((acc, entry) => {
    const status = entry.result.ticket.status
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'manual': return '✋'
      case 'qr': return '📱'
      case 'blockchain': return '🔗'
      default: return '❓'
    }
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

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'manual': return '#00ffff'
      case 'qr': return '#00ff00'
      case 'blockchain': return '#ffff00'
      default: return '#b0b0b0'
    }
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '20px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '2rem'
    }}>
      <h3 style={{
        color: '#00ffff',
        fontSize: '1.3rem',
        marginBottom: '1.5rem',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        📊 Estadísticas de Verificación
      </h3>

      {/* Overview Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(0, 255, 255, 0.1)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '15px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '0.5rem',
            filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))'
          }}>
            🔍
          </div>
          <div style={{
            color: '#00ffff',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.3rem'
          }}>
            {totalVerifications}
          </div>
          <div style={{
            color: '#b0b0b0',
            fontSize: '0.8rem'
          }}>
            Total Verificaciones
          </div>
        </div>

        <div style={{
          background: 'rgba(0, 255, 0, 0.1)',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          borderRadius: '15px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '0.5rem',
            filter: 'drop-shadow(0 0 10px rgba(0, 255, 0, 0.5))'
          }}>
            ✅
          </div>
          <div style={{
            color: '#00ff00',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.3rem'
          }}>
            {validTickets}
          </div>
          <div style={{
            color: '#b0b0b0',
            fontSize: '0.8rem'
          }}>
            Tickets Válidos
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 0, 0, 0.1)',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          borderRadius: '15px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '0.5rem',
            filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))'
          }}>
            ❌
          </div>
          <div style={{
            color: '#ff4444',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.3rem'
          }}>
            {invalidTickets}
          </div>
          <div style={{
            color: '#b0b0b0',
            fontSize: '0.8rem'
          }}>
            Tickets Inválidos
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 0, 0.1)',
          border: '1px solid rgba(255, 255, 0, 0.3)',
          borderRadius: '15px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '0.5rem',
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 0.5))'
          }}>
            📈
          </div>
          <div style={{
            color: '#ffff00',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.3rem'
          }}>
            {totalVerifications > 0 ? ((validTickets / totalVerifications) * 100).toFixed(1) : '0'}%
          </div>
          <div style={{
            color: '#b0b0b0',
            fontSize: '0.8rem'
          }}>
            Tasa de Éxito
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Method Distribution */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '1.2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h4 style={{
            color: '#ffffff',
            fontSize: '1.1rem',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            📱 Métodos de Verificación
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}>
            {Object.entries(methodStats).map(([method, count]) => (
              <div key={method} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>
                    {getMethodIcon(method)}
                  </span>
                  <span style={{
                    color: getMethodColor(method),
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    textTransform: 'capitalize'
                  }}>
                    {method}
                  </span>
                </div>
                <div style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '1.2rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h4 style={{
            color: '#ffffff',
            fontSize: '1.1rem',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            🎫 Estados de Tickets
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}>
            {Object.entries(statusStats).map(([status, count]) => (
              <div key={status} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    color: getStatusColor(status),
                    fontSize: '1rem'
                  }}>
                    {status === 'Válido' ? '✅' : 
                     status === 'Usado' ? '🔄' :
                     status === 'Expirado' ? '⏰' : '❌'}
                  </span>
                  <span style={{
                    color: getStatusColor(status),
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    {status}
                  </span>
                </div>
                <div style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
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
          💡 <strong>Actividad Reciente:</strong> Las estadísticas se actualizan en tiempo real según las verificaciones realizadas
        </p>
      </div>
    </div>
  )
}
