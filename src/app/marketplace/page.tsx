'use client'

import React, { useState } from 'react'
import { MarketplaceGrid } from '@/components/ui/marketplace-grid'
import { useMarketplace } from '@/hooks/use-marketplace'
import { useAccount } from 'wagmi'
import Link from 'next/link'

export default function MarketplacePage() {
  const { address, isConnected } = useAccount()
  const marketplace = useMarketplace()
  
  const [activeTab, setActiveTab] = useState<'all' | 'my-listings'>('all')
  
  // Datos simulados para la demo (hasta que el contrato esté completamente implementado)
  const listings = [
    {
      listingId: 1,
      seller: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      nftContract: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
      tokenId: 1,
      price: '0.13',
      isActive: true,
      createdAt: Date.now() - 86400000,
      expiresAt: Date.now() + 86400000 * 7,
      eventInfo: {
        eventId: 1,
        name: 'Web3 Summit 2026',
        description: 'El evento más importante de Web3 en Latinoamérica',
        eventDate: Date.now() + 86400000 * 30,
        location: 'Centro de Convenciones, CDMX',
        organizer: 'Web3 Latam'
      },
      ticketInfo: {
        ticketType: 2,
        benefits: ['Acceso VIP', 'Networking', 'Material exclusivo'],
        isTransferable: true
      }
    },
    {
      listingId: 2,
      seller: '0x8ba1f109551bD432803012645Hac136c',
      nftContract: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
      tokenId: 2,
      price: '0.08',
      isActive: true,
      createdAt: Date.now() - 43200000,
      expiresAt: Date.now() + 86400000 * 5,
      eventInfo: {
        eventId: 1,
        name: 'Web3 Summit 2026',
        description: 'El evento más importante de Web3 en Latinoamérica',
        eventDate: Date.now() + 86400000 * 30,
        location: 'Centro de Convenciones, CDMX',
        organizer: 'Web3 Latam'
      },
      ticketInfo: {
        ticketType: 1,
        benefits: ['Acceso general', 'Material básico'],
        isTransferable: true
      }
    }
  ]
  
  const myListings = listings.filter(listing => listing.seller === address)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Manejar movimiento del mouse para efectos de fondo
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #111111 25%, #000011 50%, #110011 75%, #000000 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Efectos de fondo dinámicos */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${window.innerWidth - mousePosition.x}px ${window.innerHeight - mousePosition.y}px, rgba(255, 0, 255, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          transition: 'all 0.1s ease'
        }} 
      />

      {/* Patrón de cuadrícula animado */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite',
          pointerEvents: 'none'
        }} 
      />

      {/* Partículas flotantes */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * 11) % 100}%`,
            top: `${(i * 7) % 100}%`,
            width: '3px',
            height: '3px',
            background: `hsl(${i * 36}, 100%, 70%)`,
            borderRadius: '50%',
            filter: 'blur(1px)',
            animation: `float-particle ${4 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Contenido principal */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Hero Section del Marketplace */}
        <section style={{
          textAlign: 'center',
          marginBottom: 'clamp(3rem, 6vw, 5rem)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.85) 100%)',
            borderRadius: '25px',
            padding: 'clamp(2rem, 5vw, 4rem)',
            border: '2px solid rgba(0, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Efecto de brillo de fondo */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #ffff00 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 'clamp(1rem, 3vw, 2rem)',
                textAlign: 'center',
                lineHeight: '1.1'
              }}>
                🏪 Marketplace Secundario
              </h1>

              <p style={{
                fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                color: '#b0b0b0',
                maxWidth: '800px',
                margin: '0 auto clamp(2rem, 4vw, 3rem)',
                lineHeight: '1.6'
              }}>
                Compra y vende tickets NFT de forma segura en el marketplace descentralizado de Base Network. 
                Precios justos, transacciones instantáneas y comisiones mínimas.
              </p>

              {/* Estadísticas del marketplace */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 'clamp(1rem, 3vw, 2rem)',
                marginBottom: 'clamp(2rem, 4vw, 3rem)'
              }}>
                {[
                  { 
                    icon: '🎫', 
                    value: listings.length, 
                    label: 'Tickets Disponibles',
                    color: '#00ffff'
                  },
                  { 
                    icon: '🟢', 
                    value: listings.filter(l => l.isActive).length, 
                    label: 'Listings Activos',
                    color: '#00ff00'
                  },
                  { 
                    icon: '💰', 
                    value: listings.length > 0 
                      ? (listings.reduce((sum, l) => sum + parseFloat(l.price), 0) / listings.length).toFixed(3)
                      : '0.000', 
                    label: 'Precio Promedio (ETH)',
                    color: '#ffff00'
                  },
                  { 
                    icon: '👥', 
                    value: new Set(listings.map(l => l.seller)).size, 
                    label: 'Vendedores Únicos',
                    color: '#ff00ff'
                  }
                ].map((stat, index) => (
                  <div key={index} style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '15px',
                    padding: 'clamp(1rem, 3vw, 1.5rem)',
                    border: `1px solid ${stat.color}40`,
                    textAlign: 'center',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(-5px)'
                    target.style.borderColor = `${stat.color}80`
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(0)'
                    target.style.borderColor = `${stat.color}40`
                  }}
                  >
                    <div style={{ 
                      fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                      marginBottom: '0.5rem' 
                    }}>
                      {stat.icon}
                    </div>
                    <div style={{ 
                      color: stat.color, 
                      fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                      fontWeight: '700',
                      marginBottom: '0.25rem'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ 
                      color: '#ffffff',
                      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                      fontWeight: '500'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Enlaces de navegación rápida */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <Link href="/create-event" style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '1rem 2rem',
                    borderRadius: '15px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(-2px)'
                    target.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(0)'
                    target.style.boxShadow = 'none'
                  }}
                  >
                    🚀 Crear Evento
                  </button>
                </Link>

                <Link href="/my-tickets" style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '1rem 2rem',
                    borderRadius: '15px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #ff00ff, #8000ff)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(-2px)'
                    target.style.boxShadow = '0 10px 20px rgba(255, 0, 255, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(0)'
                    target.style.boxShadow = 'none'
                  }}
                  >
                    🎫 Mis Tickets
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Navegación por pestañas */}
        {isConnected && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '20px',
              padding: '0.5rem',
              border: '2px solid rgba(0, 255, 255, 0.2)',
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button
                onClick={() => setActiveTab('all')}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  border: 'none',
                  background: activeTab === 'all' 
                    ? 'linear-gradient(135deg, #00ffff, #0080ff)'
                    : 'transparent',
                  color: activeTab === 'all' ? '#ffffff' : '#b0b0b0',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                🏪 Todos los Listings ({listings.length})
              </button>

              <button
                onClick={() => setActiveTab('my-listings')}
                style={{
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  border: 'none',
                  background: activeTab === 'my-listings' 
                    ? 'linear-gradient(135deg, #ff00ff, #8000ff)'
                    : 'transparent',
                  color: activeTab === 'my-listings' ? '#ffffff' : '#b0b0b0',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                👤 Mis Listings ({myListings.length})
              </button>
            </div>
          </div>
        )}

        {/* Mensaje para usuarios no conectados */}
        {!isConnected && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.1), rgba(255, 140, 0, 0.1))',
            borderRadius: '20px',
            padding: '2rem',
            border: '2px solid rgba(255, 165, 0, 0.3)',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔗</div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '1rem'
            }}>
              Conecta tu Wallet
            </h3>
            <p style={{
              color: '#b0b0b0',
              fontSize: '1rem',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Para acceder a todas las funciones del marketplace, conecta tu wallet. 
              Podrás ver tus listings, comprar tickets y gestionar tus ventas.
            </p>
          </div>
        )}

        {/* Grid principal del marketplace */}
        <MarketplaceGrid 
          showMyListings={activeTab === 'my-listings'}
          onListingAction={() => {
            // Callback para actualizar datos si es necesario
          }}
        />

        {/* Información de seguridad y comisiones */}
        <section style={{
          marginTop: '4rem',
          background: 'linear-gradient(135deg, rgba(0, 50, 50, 0.3), rgba(50, 0, 50, 0.3))',
          borderRadius: '25px',
          padding: '3rem 2rem',
          border: '2px solid rgba(0, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '2rem'
          }}>
            🛡️ Marketplace Seguro y Transparente
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              {
                icon: '🔒',
                title: 'Seguridad Blockchain',
                description: 'Todas las transacciones están protegidas por la seguridad de Base Network'
              },
              {
                icon: '💸',
                title: 'Comisiones Mínimas',
                description: 'Solo 2.5% de comisión del marketplace, mucho menor que plataformas tradicionales'
              },
              {
                icon: '⚡',
                title: 'Transacciones Rápidas',
                description: 'Confirmaciones en segundos gracias a la tecnología Layer 2 de Base'
              },
              {
                icon: '🌐',
                title: 'Descentralizado',
                description: 'Sin intermediarios, tú mantienes el control total de tus assets'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(0, 0, 0, 0.6)',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid rgba(0, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = 'translateY(-5px)'
                target.style.borderColor = 'rgba(0, 255, 255, 0.5)'
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = 'translateY(0)'
                target.style.borderColor = 'rgba(0, 255, 255, 0.2)'
              }}
              >
                <div style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '1rem' 
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '1rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#b0b0b0',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}