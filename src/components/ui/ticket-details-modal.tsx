'use client'

import React from 'react'
import { TicketVerificationResult } from '@/hooks/use-ticket-verification'

interface TicketDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  ticketData: TicketVerificationResult | null
}

export function TicketDetailsModal({ isOpen, onClose, ticketData }: TicketDetailsModalProps) {
  if (!isOpen || !ticketData) return null

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Aquí se podría mostrar un toast de confirmación
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '1rem'
    }}>
      {/* Modal Content */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(25px)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        borderRadius: '25px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 100px rgba(0, 255, 255, 0.2)'
      }}>
        {/* Header */}
        <div style={{
          padding: '2rem 2rem 1.5rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(0, 255, 255, 0.1) 0%, transparent 100%)'
        }}>
          <div>
            <h2 style={{
              color: '#00ffff',
              fontSize: '2rem',
              fontWeight: 'bold',
              margin: 0,
              marginBottom: '0.5rem'
            }}>
              🎫 Detalles del Ticket
            </h2>
            <p style={{
              color: '#b0b0b0',
              fontSize: '1rem',
              margin: 0
            }}>
              Información completa del ticket NFT verificado
            </p>
          </div>
          
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 0, 0, 0.3)'
              e.currentTarget.style.borderColor = '#ff0000'
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto'
        }}>
          {/* Status Banner */}
          <div style={{
            background: `linear-gradient(135deg, ${getStatusColor(ticketData.ticket.status)}15, ${getStatusColor(ticketData.ticket.status)}05)`,
            border: `1px solid ${getStatusColor(ticketData.ticket.status)}30`,
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              filter: `drop-shadow(0 0 20px ${getStatusColor(ticketData.ticket.status)}50)`
            }}>
              {ticketData.ticket.status === 'Válido' ? '✅' : 
               ticketData.ticket.status === 'Usado' ? '🔄' :
               ticketData.ticket.status === 'Expirado' ? '⏰' : '❌'}
            </div>
            <h3 style={{
              color: getStatusColor(ticketData.ticket.status),
              fontSize: '1.8rem',
              marginBottom: '0.5rem',
              fontWeight: 'bold'
            }}>
              Ticket {ticketData.ticket.status}
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: '1rem'
            }}>
              Este ticket NFT ha sido verificado exitosamente en la blockchain
            </p>
          </div>

          {/* Ticket Information Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Event Information */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                color: '#00ffff',
                fontSize: '1.3rem',
                marginBottom: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🎯 Información del Evento
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Evento:</span>
                  <span style={{ color: '#ffffff', fontWeight: '600' }}>{ticketData.ticket.eventName}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Fecha:</span>
                  <span style={{ color: '#ffffff' }}>{ticketData.ticket.eventDate}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Ubicación:</span>
                  <span style={{ color: '#ffffff' }}>{ticketData.ticket.eventLocation}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Tipo:</span>
                  <span style={{ color: '#ffffff', fontWeight: '600' }}>{ticketData.ticket.ticketType}</span>
                </div>
              </div>
            </div>

            {/* Purchase Information */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                color: '#ff00ff',
                fontSize: '1.3rem',
                marginBottom: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                💰 Información de Compra
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Precio:</span>
                  <span style={{ color: '#ff00ff', fontWeight: '600', fontSize: '1.1rem' }}>{ticketData.ticket.price}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Compra:</span>
                  <span style={{ color: '#ffffff' }}>{ticketData.ticket.purchaseDate}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Estado:</span>
                  <span style={{ 
                    color: getStatusColor(ticketData.ticket.status), 
                    fontWeight: '600' 
                  }}>
                    {ticketData.ticket.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Blockchain Information */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                color: '#ffff00',
                fontSize: '1.3rem',
                marginBottom: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🔗 Información Blockchain
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Token ID:</span>
                  <span style={{ color: '#ffff00', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {ticketData.ticket.tokenId}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Block:</span>
                  <span style={{ color: '#ffffff', fontFamily: 'monospace' }}>
                    #{ticketData.ticket.blockchainData.blockNumber}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Gas:</span>
                  <span style={{ color: '#ffffff' }}>{ticketData.ticket.blockchainData.gasUsed}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Owner and Benefits */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Owner Information */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                color: '#00ff00',
                fontSize: '1.3rem',
                marginBottom: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                👤 Propietario
              </h4>
              <div style={{
                background: 'rgba(0, 255, 0, 0.1)',
                border: '1px solid rgba(0, 255, 0, 0.3)',
                borderRadius: '15px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  color: '#00ff00',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  wordBreak: 'break-all',
                  lineHeight: '1.4'
                }}>
                  {ticketData.ticket.owner}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(ticketData.ticket.owner)}
                style={{
                  background: 'rgba(0, 255, 0, 0.2)',
                  border: '1px solid rgba(0, 255, 0, 0.4)',
                  color: '#00ff00',
                  padding: '0.5rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  margin: '0 auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 0, 0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 0, 0.2)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                📋 Copiar Address
              </button>
            </div>

            {/* Benefits */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h4 style={{
                color: '#ff8000',
                fontSize: '1.3rem',
                marginBottom: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🎁 Beneficios Incluidos
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.8rem'
              }}>
                {ticketData.ticket.benefits.map((benefit, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 128, 0, 0.1)',
                    border: '1px solid rgba(255, 128, 0, 0.3)',
                    borderRadius: '12px',
                    padding: '0.6rem 1rem',
                    fontSize: '0.9rem',
                    color: '#ff8000',
                    fontWeight: '500'
                  }}>
                    ✓ {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Details */}
          <div style={{
            background: 'rgba(0, 255, 255, 0.05)',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid rgba(0, 255, 255, 0.2)'
          }}>
            <h4 style={{
              color: '#00ffff',
              fontSize: '1.3rem',
              marginBottom: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              🔍 Detalles de Verificación
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <div>
                <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Método:</span>
                <div style={{ color: '#ffffff', fontWeight: '600', marginTop: '0.3rem' }}>
                  {ticketData.verification.method === 'manual' ? '✋ Manual' :
                   ticketData.verification.method === 'qr' ? '📱 QR Scanner' :
                   '🔗 Blockchain'}
                </div>
              </div>
              <div>
                <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Verificado por:</span>
                <div style={{ color: '#ffffff', fontWeight: '600', marginTop: '0.3rem' }}>
                  {ticketData.verification.verifiedBy}
                </div>
              </div>
              <div>
                <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Estado Blockchain:</span>
                <div style={{ 
                  color: ticketData.verification.blockchainStatus === 'confirmed' ? '#00ff00' : 
                         ticketData.verification.blockchainStatus === 'pending' ? '#ffff00' : '#ff0000',
                  fontWeight: '600',
                  marginTop: '0.3rem'
                }}>
                  {ticketData.verification.blockchainStatus === 'confirmed' ? '✅ Confirmado' :
                   ticketData.verification.blockchainStatus === 'pending' ? '⏳ Pendiente' : '❌ Fallido'}
                </div>
              </div>
              <div>
                <span style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>Timestamp:</span>
                <div style={{ color: '#ffffff', fontFamily: 'monospace', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                  {formatDate(ticketData.verification.timestamp)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1.5rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 255, 255, 0.05) 100%)',
          textAlign: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
              color: '#000000',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '15px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(0, 255, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 255, 255, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.3)'
            }}
          >
            ✅ Entendido
          </button>
        </div>
      </div>
    </div>
  )
}
