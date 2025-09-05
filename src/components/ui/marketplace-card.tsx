'use client'

import React, { useState } from 'react'
import { MarketplaceListing, useMarketplace } from '@/hooks/use-marketplace-complex'
import { formatEther } from 'viem'
import { useAccount } from 'wagmi'

interface MarketplaceCardProps {
  listing: MarketplaceListing
  onBuySuccess?: () => void
  onCancelSuccess?: () => void
  onUpdatePriceSuccess?: () => void
  className?: string
}

export function MarketplaceCard({ 
  listing, 
  onBuySuccess, 
  onCancelSuccess, 
  onUpdatePriceSuccess,
  className = ''
}: MarketplaceCardProps) {
  const { address } = useAccount()
  const { 
    buyTicket, 
    cancelListing, 
    updateListingPrice, 
    isLoading 
  } = useMarketplace()
  
  const [showUpdatePrice, setShowUpdatePrice] = useState(false)
  const [newPrice, setNewPrice] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Verificar si es el propietario del listing
  const isOwner = address?.toLowerCase() === listing.seller.toLowerCase()
  
  // Verificar si el listing ha expirado
  const isExpired = Date.now() > listing.expiresAt * 1000
  
  // Formatear la fecha de expiración
  const expirationDate = new Date(listing.expiresAt * 1000)
  const timeRemaining = listing.expiresAt * 1000 - Date.now()
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  // Manejar compra
  const handleBuy = async () => {
    if (isProcessing || isExpired) return
    
    try {
      setIsProcessing(true)
      const priceInEth = formatEther(BigInt(listing.price))
      await buyTicket(listing.listingId, priceInEth)
      onBuySuccess?.()
    } catch (error) {
      console.error('Error comprando ticket:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Manejar cancelación
  const handleCancel = async () => {
    if (isProcessing) return
    
    try {
      setIsProcessing(true)
      await cancelListing(listing.listingId)
      onCancelSuccess?.()
    } catch (error) {
      console.error('Error cancelando listing:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Manejar actualización de precio
  const handleUpdatePrice = async () => {
    if (isProcessing || !newPrice || parseFloat(newPrice) <= 0) return
    
    try {
      setIsProcessing(true)
      await updateListingPrice(listing.listingId, newPrice)
      setShowUpdatePrice(false)
      setNewPrice('')
      onUpdatePriceSuccess?.()
    } catch (error) {
      console.error('Error actualizando precio:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className={`marketplace-card ${className}`} style={{
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.85) 100%)',
      borderRadius: '20px',
      padding: '1.5rem',
      border: isExpired ? '2px solid rgba(255, 0, 0, 0.3)' : '2px solid rgba(0, 255, 255, 0.3)',
      backdropFilter: 'blur(20px)',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}
    onMouseEnter={(e) => {
      const target = e.currentTarget as HTMLElement
      target.style.transform = 'translateY(-5px)'
      target.style.boxShadow = isExpired 
        ? '0 20px 40px rgba(255, 0, 0, 0.3)' 
        : '0 20px 40px rgba(0, 255, 255, 0.4)'
    }}
    onMouseLeave={(e) => {
      const target = e.currentTarget as HTMLElement
      target.style.transform = 'translateY(0)'
      target.style.boxShadow = 'none'
    }}
    >
      {/* Badge de estado */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '15px',
        fontSize: '0.8rem',
        fontWeight: '600',
        background: isExpired 
          ? 'linear-gradient(135deg, #ff0000, #cc0000)' 
          : listing.isActive 
            ? 'linear-gradient(135deg, #00ff00, #00cc00)'
            : 'linear-gradient(135deg, #ffaa00, #ff8800)',
        color: '#ffffff',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {isExpired ? '⏰ Expirado' : listing.isActive ? '🟢 Activo' : '⏸️ Inactivo'}
      </div>

      {/* Información del NFT */}
      <div style={{ flex: 1 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            🎫
          </div>
          <div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              color: '#ffffff',
              margin: 0,
              marginBottom: '0.25rem'
            }}>
              Ticket NFT #{listing.tokenId}
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: '#b0b0b0',
              margin: 0
            }}>
              {listing.eventInfo?.name || 'Información del evento no disponible'}
            </p>
          </div>
        </div>

        {/* Información del evento */}
        {listing.eventInfo && (
          <div style={{
            background: 'rgba(0, 255, 255, 0.05)',
            borderRadius: '15px',
            padding: '1rem',
            marginBottom: '1rem',
            border: '1px solid rgba(0, 255, 255, 0.2)'
          }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: '#00ffff', fontWeight: '600' }}>📍 Ubicación: </span>
              <span style={{ color: '#ffffff' }}>{listing.eventInfo.location}</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: '#00ffff', fontWeight: '600' }}>📅 Fecha: </span>
              <span style={{ color: '#ffffff' }}>
                {new Date(listing.eventInfo.eventDate * 1000).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div>
              <span style={{ color: '#00ffff', fontWeight: '600' }}>👤 Organizador: </span>
              <span style={{ color: '#ffffff', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                {listing.eventInfo.organizer.slice(0, 6)}...{listing.eventInfo.organizer.slice(-4)}
              </span>
            </div>
          </div>
        )}

        {/* Información del vendedor */}
        <div style={{
          background: 'rgba(255, 0, 255, 0.05)',
          borderRadius: '15px',
          padding: '1rem',
          marginBottom: '1rem',
          border: '1px solid rgba(255, 0, 255, 0.2)'
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ color: '#ff00ff', fontWeight: '600' }}>🏷️ Vendedor: </span>
            <span style={{ color: '#ffffff', fontSize: '0.8rem', fontFamily: 'monospace' }}>
              {listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}
            </span>
            {isOwner && (
              <span style={{
                marginLeft: '0.5rem',
                background: 'linear-gradient(135deg, #ffaa00, #ff8800)',
                color: '#ffffff',
                padding: '0.2rem 0.5rem',
                borderRadius: '8px',
                fontSize: '0.7rem',
                fontWeight: '600'
              }}>
                TU LISTING
              </span>
            )}
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ color: '#ff00ff', fontWeight: '600' }}>⏰ Expira: </span>
            <span style={{ color: isExpired ? '#ff0000' : '#ffffff' }}>
              {isExpired 
                ? 'EXPIRADO' 
                : daysRemaining > 0 
                  ? `${daysRemaining}d ${hoursRemaining}h`
                  : `${hoursRemaining}h`
              }
            </span>
          </div>
        </div>

        {/* Precio */}
        <div style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(255, 255, 0, 0.1), rgba(255, 215, 0, 0.1))',
          borderRadius: '15px',
          padding: '1rem',
          border: '2px solid rgba(255, 255, 0, 0.3)',
          marginBottom: '1rem'
        }}>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: '900',
            background: 'linear-gradient(135deg, #ffff00, #ffd700)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.25rem'
          }}>
            {formatEther(BigInt(listing.price))} ETH
          </div>
          <div style={{ 
            fontSize: '0.8rem',
            color: '#b0b0b0'
          }}>
            Precio de venta
          </div>
        </div>
      </div>

      {/* Actualizar precio (solo para propietarios) */}
      {isOwner && listing.isActive && !isExpired && showUpdatePrice && (
        <div style={{
          background: 'rgba(255, 255, 0, 0.1)',
          borderRadius: '15px',
          padding: '1rem',
          border: '1px solid rgba(255, 255, 0, 0.3)',
          marginBottom: '1rem'
        }}>
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <input
              type="number"
              step="0.001"
              min="0"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Nuevo precio (ETH)"
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 0, 0.5)',
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#ffffff',
                fontSize: '0.9rem'
              }}
            />
            <button
              onClick={handleUpdatePrice}
              disabled={isProcessing || !newPrice || parseFloat(newPrice) <= 0}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #00ff00, #00cc00)',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                opacity: isProcessing || !newPrice || parseFloat(newPrice) <= 0 ? 0.6 : 1
              }}
            >
              ✅
            </button>
            <button
              onClick={() => {
                setShowUpdatePrice(false)
                setNewPrice('')
              }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              ❌
            </button>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginTop: 'auto'
      }}>
        {isOwner ? (
          // Botones para el propietario
          <>
            {listing.isActive && !isExpired && (
              <button
                onClick={() => setShowUpdatePrice(!showUpdatePrice)}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  padding: '1rem',
                  borderRadius: '15px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ffaa00, #ff8800)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  opacity: isProcessing ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isProcessing) {
                    const target = e.currentTarget as HTMLElement
                    target.style.transform = 'translateY(-2px)'
                    target.style.boxShadow = '0 10px 20px rgba(255, 170, 0, 0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLElement
                  target.style.transform = 'translateY(0)'
                  target.style.boxShadow = 'none'
                }}
              >
                💰 {showUpdatePrice ? 'Ocultar' : 'Cambiar Precio'}
              </button>
            )}
            
            <button
              onClick={handleCancel}
              disabled={isProcessing || !listing.isActive}
              style={{
                flex: 1,
                padding: '1rem',
                borderRadius: '15px',
                border: 'none',
                background: listing.isActive 
                  ? 'linear-gradient(135deg, #ff0000, #cc0000)' 
                  : 'rgba(128, 128, 128, 0.3)',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: '700',
                cursor: isProcessing || !listing.isActive ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                opacity: isProcessing || !listing.isActive ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isProcessing && listing.isActive) {
                  const target = e.currentTarget as HTMLElement
                  target.style.transform = 'translateY(-2px)'
                  target.style.boxShadow = '0 10px 20px rgba(255, 0, 0, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement
                target.style.transform = 'translateY(0)'
                target.style.boxShadow = 'none'
              }}
            >
              {isProcessing ? '⏳ Procesando...' : '🗑️ Cancelar Listing'}
            </button>
          </>
        ) : (
          // Botón para compradores
          <button
            onClick={handleBuy}
            disabled={isProcessing || isExpired || !listing.isActive}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '15px',
              border: 'none',
              background: isExpired || !listing.isActive
                ? 'rgba(128, 128, 128, 0.3)'
                : 'linear-gradient(135deg, #00ff00, #00cc00)',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: isProcessing || isExpired || !listing.isActive ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: isProcessing || isExpired || !listing.isActive ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!isProcessing && !isExpired && listing.isActive) {
                const target = e.currentTarget as HTMLElement
                target.style.transform = 'translateY(-2px)'
                target.style.boxShadow = '0 10px 20px rgba(0, 255, 0, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLElement
              target.style.transform = 'translateY(0)'
              target.style.boxShadow = 'none'
            }}
          >
            {isProcessing 
              ? '⏳ Procesando Compra...' 
              : isExpired 
                ? '⏰ Listing Expirado'
                : !listing.isActive
                  ? '⏸️ No Disponible'
                  : '🛒 Comprar Ticket'
            }
          </button>
        )}
      </div>

      {/* Efectos de fondo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isExpired 
          ? 'radial-gradient(circle at 80% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 70%)'
          : 'radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
        borderRadius: '20px'
      }} />
    </div>
  )
}