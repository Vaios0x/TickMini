'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useBlockchainTickets } from '@/hooks/use-blockchain-tickets'
import { useTicketVerification } from '@/hooks/use-ticket-verification'
import './my-tickets.css'

interface MyTicket {
  id: number
  tokenId: string
  eventName: string
  eventDate: string
  eventLocation: string
  ticketType: string
  price: string
  purchaseDate: string
  status: 'Válido' | 'Usado' | 'Expirado' | 'Revocado'
  benefits: string[]
  image: string
  category: string
  organizer: string
  contractAddress: string
  transactionHash: string
  eventId: number
  owner: string
  blockNumber?: number
  gasUsed?: string
  isValid?: boolean
  explorerUrl?: string
}

export default function MyTicketsPage() {
  const { address, isConnected } = useAccount()
  const [selectedTicket, setSelectedTicket] = useState<MyTicket | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [filter, setFilter] = useState<'all' | 'valid' | 'used' | 'expired'>('all')

  // Usar el hook para obtener tickets reales del contrato
  const {
    tickets: myTickets,
    isLoading,
    error,
    refreshTickets,
    totalTickets,
    validTickets,
    usedTickets,
    expiredTickets
  } = useBlockchainTickets()

  const filteredTickets = myTickets.filter(ticket => {
    switch (filter) {
      case 'valid':
        return ticket.status === 'Válido'
      case 'used':
        return ticket.status === 'Usado'
      case 'expired':
        return ticket.status === 'Expirado'
      default:
        return true
    }
  })

  const handleViewDetails = (ticket: MyTicket) => {
    setSelectedTicket(ticket)
    setShowDetails(true)
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
    setSelectedTicket(null)
  }

  if (!isConnected) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '2rem 1rem',
        marginTop: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '3rem 2rem',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
          <h2 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.8rem' }}>
            Conecta tu Wallet
          </h2>
          <p style={{ color: '#b0b0b0', marginBottom: '2rem', lineHeight: '1.6' }}>
            Necesitas conectar tu wallet para ver tus tickets comprados
          </p>
          <button style={{
            background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
            color: '#000000',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '15px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)'
          }}>
            Conectar Wallet
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '2rem 1rem',
      marginTop: '80px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)',
          padding: '2rem',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#00ffff',
            marginBottom: '1rem',
            textShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
            fontWeight: 'bold'
          }}>
            🎫 Mis Tickets
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: '#b0b0b0',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Gestiona y verifica todos tus tickets NFT comprados
          </p>
        </div>

        {/* Botón de refresh y estadísticas */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(0, 255, 255, 0.1)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              borderRadius: '15px',
              padding: '0.8rem 1.2rem',
              color: '#00ffff',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              📊 Total: {totalTickets}
            </div>
            <div style={{
              background: 'rgba(0, 255, 0, 0.1)',
              border: '1px solid rgba(0, 255, 0, 0.3)',
              borderRadius: '15px',
              padding: '0.8rem 1.2rem',
              color: '#00ff00',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              ✅ Válidos: {validTickets}
            </div>
            <div style={{
              background: 'rgba(255, 170, 0, 0.1)',
              border: '1px solid rgba(255, 170, 0, 0.3)',
              borderRadius: '15px',
              padding: '0.8rem 1.2rem',
              color: '#ffaa00',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              🔒 Usados: {usedTickets}
            </div>
          </div>
          
          <button
            onClick={refreshTickets}
            disabled={isLoading}
            style={{
              background: isLoading 
                ? 'rgba(255, 255, 255, 0.1)'
                : 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
              color: isLoading ? '#666666' : '#000000',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: '15px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: isLoading ? 'none' : '0 8px 25px rgba(0, 255, 255, 0.3)'
            }}
          >
            {isLoading ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #666666',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Cargando...
              </>
            ) : (
              <>
                🔄 Refrescar
              </>
            )}
          </button>
        </div>

        {/* Mostrar error si existe */}
        {error && (
          <div style={{
            background: 'rgba(255, 0, 0, 0.1)',
            border: '1px solid rgba(255, 0, 0, 0.3)',
            borderRadius: '15px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <div style={{ color: '#ff6b6b', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              ⚠️ Error al cargar tickets
            </div>
            <div style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
              {error}
            </div>
            <button
              onClick={refreshTickets}
              style={{
                background: 'linear-gradient(135deg, #ff4444 0%, #ff0080 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              🔄 Reintentar
            </button>
          </div>
        )}

        {/* Filtros */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            { key: 'all', label: 'Todos', icon: '🎫' },
            { key: 'valid', label: 'Válidos', icon: '✅' },
            { key: 'used', label: 'Usados', icon: '🔒' },
            { key: 'expired', label: 'Expirados', icon: '⏰' }
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              style={{
                background: filter === key 
                  ? 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: filter === key ? '#000000' : '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.8rem 1.5rem',
                borderRadius: '15px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: filter === key ? '0 8px 25px rgba(0, 255, 255, 0.3)' : 'none'
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '25px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              border: '3px solid rgba(0, 255, 255, 0.3)',
              borderTop: '3px solid #00ffff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 2rem auto'
            }} />
            <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>
              Cargando tus tickets...
            </h3>
            <p style={{ color: '#b0b0b0' }}>
              Buscando en la blockchain
            </p>
          </div>
        )}

        {/* Lista de tickets */}
        {!isLoading && (
          <>
            {filteredTickets.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '25px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎫</div>
                <h3 style={{ color: '#ffffff', marginBottom: '1rem', fontSize: '1.5rem' }}>
                  {filter === 'all' ? 'No tienes tickets aún' : `No tienes tickets ${filter === 'valid' ? 'válidos' : filter === 'used' ? 'usados' : 'expirados'}`}
                </h3>
                <p style={{ color: '#b0b0b0', marginBottom: '2rem' }}>
                  {filter === 'all' 
                    ? 'Compra tu primer ticket NFT en nuestros eventos'
                    : 'Los tickets con este estado aparecerán aquí'
                  }
                </p>
                {filter === 'all' && (
                  <button style={{
                    background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
                    color: '#000000',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '15px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)'
                  }}>
                    Ver Eventos
                  </button>
                )}
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2rem'
              }}>
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: '25px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      padding: '2rem',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onClick={() => handleViewDetails(ticket)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)'
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.2)'
                      e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* Status badge */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: ticket.status === 'Válido' 
                        ? 'linear-gradient(135deg, #00ff00, #00ffff)'
                        : ticket.status === 'Usado'
                        ? 'linear-gradient(135deg, #ffaa00, #ff6600)'
                        : 'linear-gradient(135deg, #ff4444, #ff0080)',
                      color: '#000000',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      {ticket.status}
                    </div>

                    {/* Event image */}
                    <div style={{
                      fontSize: '4rem',
                      textAlign: 'center',
                      marginBottom: '1.5rem',
                      filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.3))'
                    }}>
                      {ticket.image}
                    </div>

                    {/* Event info */}
                    <h3 style={{
                      color: '#ffffff',
                      fontSize: '1.3rem',
                      marginBottom: '0.5rem',
                      fontWeight: 'bold',
                      lineHeight: '1.3'
                    }}>
                      {ticket.eventName}
                    </h3>

                    <div style={{
                      color: '#b0b0b0',
                      fontSize: '0.9rem',
                      marginBottom: '1rem',
                      lineHeight: '1.5'
                    }}>
                      <div>📅 {ticket.eventDate}</div>
                      <div>📍 {ticket.eventLocation}</div>
                      <div>🎫 {ticket.ticketType}</div>
                    </div>

                    {/* Price and purchase date */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.5rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div>
                        <div style={{ color: '#00ffff', fontSize: '1.1rem', fontWeight: 'bold' }}>
                          {ticket.price}
                        </div>
                        <div style={{ color: '#888888', fontSize: '0.8rem' }}>
                          Comprado: {ticket.purchaseDate}
                        </div>
                      </div>
                      <div style={{
                        background: 'rgba(0, 255, 255, 0.1)',
                        border: '1px solid rgba(0, 255, 255, 0.3)',
                        borderRadius: '10px',
                        padding: '0.5rem',
                        fontSize: '0.8rem',
                        color: '#00ffff'
                      }}>
                        ID: {ticket.tokenId}
                      </div>
                    </div>

                    {/* Benefits preview */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      {ticket.benefits.slice(0, 3).map((benefit, index) => (
                        <div
                          key={index}
                          style={{
                            background: 'rgba(0, 255, 0, 0.1)',
                            border: '1px solid rgba(0, 255, 0, 0.3)',
                            borderRadius: '10px',
                            padding: '0.3rem 0.6rem',
                            fontSize: '0.7rem',
                            color: '#00ff00'
                          }}
                        >
                          ✓ {benefit}
                        </div>
                      ))}
                      {ticket.benefits.length > 3 && (
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '10px',
                          padding: '0.3rem 0.6rem',
                          fontSize: '0.7rem',
                          color: '#ffffff'
                        }}>
                          +{ticket.benefits.length - 3} más
                        </div>
                      )}
                    </div>

                    {/* View details button */}
                    <button style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
                      color: '#000000',
                      border: 'none',
                      padding: '0.8rem',
                      borderRadius: '15px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 15px rgba(0, 255, 255, 0.3)'
                    }}>
                      Ver Detalles
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Modal de detalles */}
        {showDetails && selectedTicket && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.95)',
              borderRadius: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(30px)',
              padding: '3rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative'
            }}>
              {/* Close button */}
              <button
                onClick={handleCloseDetails}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>

              {/* Ticket details */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
                  {selectedTicket.image}
                </div>
                <h2 style={{ color: '#00ffff', fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {selectedTicket.eventName}
                </h2>
                <div style={{
                  background: selectedTicket.status === 'Válido' 
                    ? 'linear-gradient(135deg, #00ff00, #00ffff)'
                    : selectedTicket.status === 'Usado'
                    ? 'linear-gradient(135deg, #ffaa00, #ff6600)'
                    : 'linear-gradient(135deg, #ff4444, #ff0080)',
                  color: '#000000',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  display: 'inline-block'
                }}>
                  {selectedTicket.status}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>📅 Información del Evento</h4>
                  <div style={{ color: '#b0b0b0', lineHeight: '1.6' }}>
                    <div><strong>Fecha:</strong> {selectedTicket.eventDate}</div>
                    <div><strong>Ubicación:</strong> {selectedTicket.eventLocation}</div>
                    <div><strong>Organizador:</strong> {selectedTicket.organizer}</div>
                    <div><strong>Categoría:</strong> {selectedTicket.category}</div>
                  </div>
                </div>

                <div>
                  <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>🎫 Detalles del Ticket</h4>
                  <div style={{ color: '#b0b0b0', lineHeight: '1.6' }}>
                    <div><strong>Tipo:</strong> {selectedTicket.ticketType}</div>
                    <div><strong>Precio:</strong> {selectedTicket.price}</div>
                    <div><strong>Token ID:</strong> {selectedTicket.tokenId}</div>
                    <div><strong>Fecha de Compra:</strong> {selectedTicket.purchaseDate}</div>
                  </div>
                </div>

                <div>
                  <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>🎁 Beneficios Incluidos</h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {selectedTicket.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        style={{
                          background: 'rgba(0, 255, 0, 0.1)',
                          border: '1px solid rgba(0, 255, 0, 0.3)',
                          borderRadius: '15px',
                          padding: '0.5rem 1rem',
                          fontSize: '0.9rem',
                          color: '#00ff00'
                        }}
                      >
                        ✓ {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>🔗 Información Blockchain</h4>
                  <div style={{ color: '#b0b0b0', lineHeight: '1.6', fontSize: '0.9rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Contrato:</strong> 
                      <div style={{
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        wordBreak: 'break-all',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '0.3rem',
                        borderRadius: '6px',
                        marginTop: '0.2rem'
                      }}>
                        {selectedTicket.contractAddress}
                      </div>
                    </div>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong>Transacción:</strong>
                      <div style={{
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        wordBreak: 'break-all',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '0.3rem',
                        borderRadius: '6px',
                        marginTop: '0.2rem'
                      }}>
                        {selectedTicket.transactionHash}
                      </div>
                    </div>
                    {selectedTicket.explorerUrl && (
                      <div style={{ marginTop: '1rem' }}>
                        <a
                          href={selectedTicket.explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            color: '#00ffff',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            padding: '0.6rem 1.2rem',
                            background: 'rgba(0, 255, 255, 0.1)',
                            border: '1px solid rgba(0, 255, 255, 0.3)',
                            borderRadius: '10px',
                            transition: 'all 0.3s ease',
                            fontWeight: '500'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 255, 0.2)'
                            e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.5)'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 255, 0.1)'
                            e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)'
                            e.currentTarget.style.transform = 'translateY(0)'
                          }}
                        >
                          🔗 Ver en BaseScan
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center'
              }}>
                <button style={{
                  background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
                  color: '#000000',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0, 255, 255, 0.3)'
                }}>
                  🔍 Verificar Ticket
                </button>
                <button style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  📱 Compartir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
