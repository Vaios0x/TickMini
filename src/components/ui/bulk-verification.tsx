'use client'

import React, { useState } from 'react'

interface BulkVerificationProps {
  onVerifyMultiple: (ticketIds: string[]) => void
  isVerifying: boolean
}

export function BulkVerification({ onVerifyMultiple, isVerifying }: BulkVerificationProps) {
  const [ticketIds, setTicketIds] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleVerifyMultiple = () => {
    if (!ticketIds.trim()) return
    
    const ids = ticketIds
      .split('\n')
      .map(id => id.trim())
      .filter(id => id.length > 0)
    
    if (ids.length === 0) return
    
    onVerifyMultiple(ids)
    setTicketIds('')
  }

  const handlePaste = (e: any) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    
    // Limpiar y formatear el texto pegado
    const cleanedText = pastedText
      .split(/[,\s\n]+/)
      .map(id => id.trim())
      .filter(id => id.length > 0)
      .join('\n')
    
    setTicketIds(cleanedText)
  }

  const getTicketCount = () => {
    if (!ticketIds.trim()) return 0
    return ticketIds.split('\n').filter(id => id.trim().length > 0).length
  }

  const isValidInput = getTicketCount() > 0 && getTicketCount() <= 50

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      borderRadius: '20px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: '2rem'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
        cursor: 'pointer'
      }}
      onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem'
        }}>
          <span style={{ fontSize: '1.5rem' }}>📋</span>
          <h4 style={{
            color: '#00ffff',
            fontSize: '1.2rem',
            fontWeight: '600',
            margin: 0
          }}>
            Verificación Masiva
          </h4>
        </div>
        
        <div style={{
          fontSize: '1.2rem',
          transition: 'transform 0.3s ease',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
          ▼
        </div>
      </div>

      {isExpanded && (
        <div style={{
          animation: 'slideDown 0.3s ease-out'
        }}>
          <p style={{
            color: '#b0b0b0',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            lineHeight: '1.5'
          }}>
            Verifica múltiples tickets NFT a la vez. Ingresa los IDs uno por línea o separados por comas.
            Máximo 50 tickets por verificación.
          </p>

          {/* Input Area */}
          <div style={{
            marginBottom: '1.5rem'
          }}>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.9rem',
              marginBottom: '0.8rem',
              fontWeight: '500'
            }}>
              🎫 IDs de Tickets (uno por línea)
            </label>
            <textarea
              value={ticketIds}
              onChange={(e) => setTicketIds(e.target.value)}
              onPaste={handlePaste}
              placeholder="0x1234...5678&#10;0x8765...4321&#10;0xabcd...efgh"
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '1rem',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '2px solid rgba(0, 255, 255, 0.3)',
                borderRadius: '15px',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                fontFamily: 'monospace',
                resize: 'vertical'
              }}
              onFocus={(e) => {
                e.target.style.border = '2px solid #00ffff'
                e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)'
              }}
              onBlur={(e) => {
                e.target.style.border = '2px solid rgba(0, 255, 255, 0.3)'
                e.target.style.boxShadow = 'none'
              }}
              tabIndex={0}
              aria-label="IDs de tickets para verificación masiva"
            />
            
            {/* Character Count */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.5rem',
              fontSize: '0.8rem'
            }}>
              <span style={{
                color: getTicketCount() > 50 ? '#ff4444' : '#b0b0b0'
              }}>
                {getTicketCount()} ticket{getTicketCount() !== 1 ? 's' : ''} detectado{getTicketCount() !== 1 ? 's' : ''}
              </span>
              <span style={{
                color: getTicketCount() > 50 ? '#ff4444' : '#00ffff'
              }}>
                {getTicketCount() > 50 ? '⚠️ Máximo 50' : '✅ Válido'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleVerifyMultiple}
              disabled={!isValidInput || isVerifying}
              style={{
                background: isValidInput && !isVerifying
                  ? 'linear-gradient(135deg, #00ff00, #00ffff)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: isValidInput && !isVerifying ? '#000000' : '#666666',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '15px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: isValidInput && !isVerifying ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: isValidInput && !isVerifying ? '0 8px 25px rgba(0, 255, 0, 0.3)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}
              onMouseEnter={(e) => {
                if (isValidInput && !isVerifying) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 255, 0, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (isValidInput && !isVerifying) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 0, 0.3)'
                }
              }}
            >
              {isVerifying ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid #000000',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Verificando...
                </>
              ) : (
                <>
                  🔍 Verificar {getTicketCount()} Ticket{getTicketCount() !== 1 ? 's' : ''}
                </>
              )}
            </button>

            <button
              onClick={() => setTicketIds('')}
              disabled={!ticketIds.trim()}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                padding: '1rem 1.5rem',
                borderRadius: '15px',
                fontSize: '0.9rem',
                cursor: ticketIds.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                opacity: ticketIds.trim() ? 1 : 0.5
              }}
              onMouseEnter={(e) => {
                if (ticketIds.trim()) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (ticketIds.trim()) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              🗑️ Limpiar
            </button>
          </div>

          {/* Tips */}
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: 'rgba(0, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(0, 255, 255, 0.1)'
          }}>
            <h5 style={{
              color: '#00ffff',
              fontSize: '0.9rem',
              marginBottom: '0.5rem',
              fontWeight: '600'
            }}>
              💡 Consejos para Verificación Masiva
            </h5>
            <ul style={{
              color: '#b0b0b0',
              fontSize: '0.8rem',
              margin: 0,
              paddingLeft: '1.2rem',
              lineHeight: '1.4'
            }}>
              <li>Puedes pegar desde Excel o CSV</li>
              <li>Los IDs se detectan automáticamente</li>
              <li>Se procesan en paralelo para mayor velocidad</li>
              <li>El historial se mantiene para cada verificación</li>
            </ul>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
