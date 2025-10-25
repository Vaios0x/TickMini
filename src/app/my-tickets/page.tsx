'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useBlockchainTickets } from '@/hooks/use-blockchain-tickets'
import { useUserTickets } from '@/hooks/use-user-tickets'
import { useTicketVerification } from '@/hooks/use-ticket-verification'
import './my-tickets.css'

// Agregar estilos CSS para animaciones
const styles = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
    50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.6); }
  }
`

// Inyectar estilos
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}

interface MyTicket {
  id: number | string
  tokenId?: string
  eventName: string
  eventDate: string
  eventLocation: string
  ticketType: string
  price: string | number
  purchaseDate: string
  status?: 'Válido' | 'Usado' | 'Expirado' | 'Revocado'
  benefits: string[]
  image: string
  category?: string
  organizer?: string
  contractAddress?: string
  transactionHash: string
  eventId: number
  owner?: string
  blockNumber?: number
  gasUsed?: string
  isValid?: boolean
  explorerUrl?: string
  // Campos específicos de tickets de usuario
  isUsed?: boolean
  nftTokenId?: number
}

export default function MyTicketsPage() {
  const { address, isConnected } = useAccount()
  const [selectedTicket, setSelectedTicket] = useState<MyTicket | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [filter, setFilter] = useState<'all' | 'valid' | 'used' | 'expired'>('all')
  const [forceShowTickets, setForceShowTickets] = useState(false)

  // Usar el hook de blockchain para obtener tickets reales
  const {
    tickets: blockchainTickets,
    isLoading: blockchainLoading,
    error: blockchainError,
    refreshTickets,
    totalTickets: blockchainTotalTickets,
    validTickets: blockchainValidTickets,
    usedTickets: blockchainUsedTickets,
    expiredTickets: blockchainExpiredTickets
  } = useBlockchainTickets()

  // Usar el hook de tickets de usuario
  const {
    userTickets,
    isLoading: userTicketsLoading,
    addTicket,
    getActiveTickets,
    getUsedTickets,
    getTicketStats
  } = useUserTickets()

  // Timeout para forzar la visualización de tickets después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceShowTickets(true)
      console.log('⏰ Timeout: Forzando visualización de tickets')
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Convertir tickets de usuario al formato de la interfaz
  const convertUserTickets = (userTickets: any[]) => {
    return userTickets.map(ticket => ({
      id: ticket.id,
      tokenId: ticket.nftTokenId?.toString() || 'N/A',
      eventName: ticket.eventName,
      eventDate: ticket.eventDate,
      eventLocation: ticket.eventLocation,
      ticketType: ticket.ticketType,
      price: `${ticket.price} ETH`,
      purchaseDate: new Date(ticket.purchaseDate).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: (ticket.isUsed ? 'Usado' : 'Válido') as 'Válido' | 'Usado' | 'Expirado' | 'Revocado',
      benefits: ticket.benefits,
      image: ticket.eventImage,
      category: 'user',
      organizer: 'TickBase',
      contractAddress: 'N/A',
      transactionHash: ticket.transactionHash,
      eventId: ticket.eventId,
      owner: address || '',
      blockNumber: Math.floor(ticket.purchaseDate / 1000),
      gasUsed: '334747',
      isValid: !ticket.isUsed,
      explorerUrl: `https://sepolia.basescan.org/tx/${ticket.transactionHash}`,
      isUsed: ticket.isUsed,
      nftTokenId: ticket.nftTokenId
    }))
  }

  // Combinar tickets de blockchain y usuario
  const myTickets = [...blockchainTickets, ...convertUserTickets(userTickets)]
  
  // Debug: mostrar información de tickets
  console.log('🔍 Debug My Tickets:', {
    blockchainTickets: blockchainTickets.length,
    userTickets: userTickets.length,
    convertedUserTickets: convertUserTickets(userTickets).length,
    totalTickets: myTickets.length
  })
  
  // Optimización: Solo mostrar loading si no hay tickets de usuario y blockchain está cargando
  // O si se ha forzado la visualización
  const isLoading = !forceShowTickets && (userTicketsLoading || (blockchainLoading && userTickets.length === 0))
  const error = blockchainError
  const totalTickets = blockchainTotalTickets + userTickets.length
  const validTickets = blockchainValidTickets + getActiveTickets().length
  const usedTickets = blockchainUsedTickets + getUsedTickets().length
  const expiredTickets = blockchainExpiredTickets

  const filteredTickets = myTickets.filter(ticket => {
    switch (filter) {
      case 'valid':
        // Para tickets de blockchain
        if ('status' in ticket) {
          return ticket.status === 'Válido'
        }
        // Para tickets de usuario
        return !(ticket as any).isUsed
      case 'used':
        // Para tickets de blockchain
        if ('status' in ticket) {
          return ticket.status === 'Usado'
        }
        // Para tickets de usuario
        return (ticket as any).isUsed
      case 'expired':
        // Para tickets de blockchain
        if ('status' in ticket) {
          return ticket.status === 'Expirado'
        }
        // Los tickets de usuario no tienen estado de expirado por ahora
        return false
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

        {/* Estadísticas mejoradas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {/* Tarjeta Total */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 255, 255, 0.05) 100%)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '20px',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #00ffff, #00bfff)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                📊
              </div>
              <div>
                <div style={{ color: '#00ffff', fontSize: '2rem', fontWeight: 'bold', lineHeight: '1' }}>
                  {totalTickets}
                </div>
                <div style={{ color: '#b0b0b0', fontSize: '0.9rem', fontWeight: '500' }}>
                  Total Tickets
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta Válidos */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(0, 255, 0, 0.05) 100%)',
            border: '1px solid rgba(0, 255, 0, 0.3)',
            borderRadius: '20px',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0, 255, 0, 0.1)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle, rgba(0, 255, 0, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #00ff00, #00cc00)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                ✅
              </div>
              <div>
                <div style={{ color: '#00ff00', fontSize: '2rem', fontWeight: 'bold', lineHeight: '1' }}>
                  {validTickets}
                </div>
                <div style={{ color: '#b0b0b0', fontSize: '0.9rem', fontWeight: '500' }}>
                  Válidos
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta Usados */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 170, 0, 0.1) 0%, rgba(255, 170, 0, 0.05) 100%)',
            border: '1px solid rgba(255, 170, 0, 0.3)',
            borderRadius: '20px',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(255, 170, 0, 0.1)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle, rgba(255, 170, 0, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #ffaa00, #ff8800)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                🔒
              </div>
              <div>
                <div style={{ color: '#ffaa00', fontSize: '2rem', fontWeight: 'bold', lineHeight: '1' }}>
                  {usedTickets}
                </div>
                <div style={{ color: '#b0b0b0', fontSize: '0.9rem', fontWeight: '500' }}>
                  Usados
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta Usuario */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.1) 0%, rgba(255, 0, 255, 0.05) 100%)',
            border: '1px solid rgba(255, 0, 255, 0.3)',
            borderRadius: '20px',
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(255, 0, 255, 0.1)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle, rgba(255, 0, 255, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #ff00ff, #cc00cc)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                🎫
              </div>
              <div>
                <div style={{ color: '#ff00ff', fontSize: '2rem', fontWeight: 'bold', lineHeight: '1' }}>
                  {userTickets.length}
                </div>
                <div style={{ color: '#b0b0b0', fontSize: '0.9rem', fontWeight: '500' }}>
                  Usuario
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Botón de refresh mejorado */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>

            {/* Botón para forzar visualización */}
            {isLoading && userTickets.length > 0 && (
              <button
                onClick={() => setForceShowTickets(true)}
                style={{
                  background: 'linear-gradient(135deg, #00ff00 0%, #00ffff 100%)',
                  color: '#000000',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 25px rgba(0, 255, 0, 0.3)'
                }}
              >
                ⚡ Mostrar Tickets Ahora
              </button>
            )}
            
            <button
              onClick={refreshTickets}
              disabled={isLoading}
              style={{
                background: isLoading 
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
                color: isLoading ? '#666666' : '#000000',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '20px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                boxShadow: isLoading ? 'none' : '0 10px 30px rgba(0, 255, 255, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 255, 255, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)'
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '3px solid #666666',
                    borderTop: '3px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Sincronizando...
                </>
              ) : (
                <>
                  <div style={{ fontSize: '1.2rem' }}>🔄</div>
                  Refrescar Tickets
                </>
              )}
            </button>
          </div>
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

        {/* Filtros mejorados */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            { key: 'all', label: 'Todos', icon: '🎫', color: '#00ffff' },
            { key: 'valid', label: 'Válidos', icon: '✅', color: '#00ff00' },
            { key: 'used', label: 'Usados', icon: '🔒', color: '#ffaa00' },
            { key: 'expired', label: 'Expirados', icon: '⏰', color: '#ff4444' }
          ].map(({ key, label, icon, color }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              style={{
                background: filter === key 
                  ? `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`
                  : 'rgba(255, 255, 255, 0.05)',
                color: filter === key ? '#000000' : '#ffffff',
                border: filter === key 
                  ? `2px solid ${color}`
                  : '1px solid rgba(255, 255, 255, 0.2)',
                padding: '1rem 1.5rem',
                borderRadius: '20px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                boxShadow: filter === key 
                  ? `0 10px 30px ${color}40`
                  : '0 5px 15px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)'
              }}
              onMouseEnter={(e) => {
                if (filter !== key) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== key) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)'
                }
              }}
            >
              <div style={{
                fontSize: '1.2rem',
                filter: filter === key ? 'none' : 'grayscale(0.3)'
              }}>
                {icon}
              </div>
              <span>{label}</span>
              {filter === key && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  right: '1rem',
                  transform: 'translateY(-50%)',
                  width: '8px',
                  height: '8px',
                  background: '#000000',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Loading solo si no hay tickets de usuario */}
        {isLoading && userTickets.length === 0 && (
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

        {/* Indicador de carga de blockchain en segundo plano */}
        {blockchainLoading && userTickets.length > 0 && (
          <div style={{
            background: 'rgba(0, 255, 255, 0.1)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '15px',
            padding: '1rem',
            marginBottom: '2rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              borderTop: '2px solid #00ffff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <span style={{ color: '#00ffff', fontSize: '0.9rem' }}>
              Sincronizando tickets de blockchain...
            </span>
          </div>
        )}

        {/* Lista de tickets - mostrar si hay tickets de usuario o si no está cargando */}
        {(!isLoading || userTickets.length > 0) && (
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
                gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
                gap: '2.5rem'
              }}>
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 40, 0.9) 100%)',
                      borderRadius: '30px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(25px)',
                      padding: '2.5rem',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
                    }}
                    onClick={() => handleViewDetails(ticket)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                      e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 255, 255, 0.3)'
                      e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)'
                      e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    {/* Status badge mejorado */}
                    <div style={{
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                      background: ticket.status === 'Válido' 
                        ? 'linear-gradient(135deg, #00ff00, #00cc00)'
                        : ticket.status === 'Usado'
                        ? 'linear-gradient(135deg, #ffaa00, #ff8800)'
                        : 'linear-gradient(135deg, #ff4444, #ff0080)',
                      color: '#000000',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      {ticket.status}
                    </div>

                    {/* Tipo de ticket badge mejorado */}
                    <div style={{
                      position: 'absolute',
                      top: '1.5rem',
                      left: '1.5rem',
                      background: ticket.category === 'user' 
                        ? 'linear-gradient(135deg, #ff00ff, #cc00cc)'
                        : 'linear-gradient(135deg, #00ffff, #00bfff)',
                      color: '#000000',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      {ticket.category === 'user' ? '🎫 Usuario' : '⛓️ Blockchain'}
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
                      {ticket.benefits.slice(0, 3).map((benefit: string, index: number) => (
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

                    {/* Botones de acción */}
                    <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.5rem' }}>
                      {/* Ver detalles */}
                      <button 
                        onClick={() => handleViewDetails(ticket)}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
                          color: '#000000',
                          border: 'none',
                          padding: '0.8rem 1rem',
                          borderRadius: '15px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 6px 20px rgba(0, 255, 255, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)'
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.5)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 255, 0.4)'
                        }}
                      >
                        <span>👁️</span>
                        <span>Detalles</span>
                      </button>

                      {/* Verificar ticket */}
                      <button 
                        onClick={() => {
                          const ticketId = (ticket as any).nftTokenId?.toString() || ticket.id.toString()
                          window.open(`/verify-ticket?ticketId=${ticketId}`, '_blank')
                        }}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)',
                          color: '#000000',
                          border: 'none',
                          padding: '0.8rem 1rem',
                          borderRadius: '15px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 6px 20px rgba(0, 255, 0, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)'
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 0, 0.5)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 255, 0, 0.4)'
                        }}
                      >
                        <span>🔍</span>
                        <span>Verificar</span>
                      </button>
                    </div>
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
                    {selectedTicket.benefits.map((benefit: string, index: number) => (
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
