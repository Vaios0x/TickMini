'use client'

import { useUserTickets } from '@/hooks/use-user-tickets'
import { useBlockchainTickets } from '@/hooks/use-blockchain-tickets'
import Link from 'next/link'

export function TicketSummary() {
  const { userTickets, getTicketStats } = useUserTickets()
  const { tickets: blockchainTickets, totalTickets: blockchainTotal } = useBlockchainTickets()
  
  const userStats = getTicketStats()
  const totalTickets = blockchainTotal + userTickets.length
  
  if (totalTickets === 0) {
    return (
      <div style={{
        background: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎫</div>
        <h3 style={{ color: '#ffffff', marginBottom: '0.5rem', fontSize: '1.3rem' }}>
          No tienes tickets aún
        </h3>
        <p style={{ color: '#b0b0b0', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Compra tu primer ticket NFT en nuestros eventos
        </p>
        <Link href="/events" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
          color: '#000000',
          textDecoration: 'none',
          padding: '0.8rem 1.5rem',
          borderRadius: '15px',
          fontSize: '1rem',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          boxShadow: '0 8px 25px rgba(0, 255, 255, 0.3)'
        }}>
          Ver Eventos
        </Link>
      </div>
    )
  }

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.6)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      padding: '2rem',
      marginBottom: '2rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ color: '#00ffff', fontSize: '1.5rem', margin: 0 }}>
          🎫 Mis Tickets
        </h3>
        <Link href="/my-tickets" style={{
          color: '#00ffff',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: '500',
          transition: 'all 0.3s ease'
        }}>
          Ver todos →
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          background: 'rgba(0, 255, 255, 0.1)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '15px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#00ffff', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {totalTickets}
          </div>
          <div style={{ color: '#b0b0b0', fontSize: '0.8rem' }}>
            Total
          </div>
        </div>
        
        <div style={{
          background: 'rgba(0, 255, 0, 0.1)',
          border: '1px solid rgba(0, 255, 0, 0.3)',
          borderRadius: '15px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#00ff00', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {userStats.active + (blockchainTickets.filter(t => t.status === 'Válido').length)}
          </div>
          <div style={{ color: '#b0b0b0', fontSize: '0.8rem' }}>
            Activos
          </div>
        </div>
        
        <div style={{
          background: 'rgba(255, 170, 0, 0.1)',
          border: '1px solid rgba(255, 170, 0, 0.3)',
          borderRadius: '15px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#ffaa00', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {userStats.used + (blockchainTickets.filter(t => t.status === 'Usado').length)}
          </div>
          <div style={{ color: '#b0b0b0', fontSize: '0.8rem' }}>
            Usados
          </div>
        </div>
      </div>

      {/* Mostrar los últimos 3 tickets */}
      <div>
        <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '1rem' }}>
          Últimos Tickets
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {[...userTickets, ...blockchainTickets]
            .slice(0, 3)
            .map((ticket, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ fontSize: '2rem' }}>
                  {'image' in ticket ? ticket.image : (ticket as any).eventImage || '🎫'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 'bold' }}>
                    {ticket.eventName}
                  </div>
                  <div style={{ color: '#b0b0b0', fontSize: '0.8rem' }}>
                    {ticket.eventDate}
                  </div>
                </div>
                <div style={{
                  background: 'status' in ticket && ticket.status === 'Válido' 
                    ? 'rgba(0, 255, 0, 0.2)'
                    : 'isUsed' in ticket && !ticket.isUsed
                    ? 'rgba(0, 255, 0, 0.2)'
                    : 'rgba(255, 170, 0, 0.2)',
                  color: 'status' in ticket && ticket.status === 'Válido'
                    ? '#00ff00'
                    : 'isUsed' in ticket && !ticket.isUsed
                    ? '#00ff00'
                    : '#ffaa00',
                  padding: '0.3rem 0.8rem',
                  borderRadius: '10px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}>
                  {'status' in ticket ? ticket.status : (ticket as any).isUsed ? 'Usado' : 'Válido'}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
