'use client'

import React, { useState, useMemo } from 'react'
import { MarketplaceCard } from './marketplace-card'
import { MarketplaceListing, useMarketplace } from '@/hooks/use-marketplace'

interface MarketplaceGridProps {
  listings?: MarketplaceListing[]
  showMyListings?: boolean
  onListingAction?: () => void
  className?: string
}

interface MarketplaceFilters {
  searchTerm: string
  minPrice: string
  maxPrice: string
  sortBy: 'price-asc' | 'price-desc' | 'date-new' | 'date-old' | 'expires-soon'
  showExpired: boolean
  eventName: string
}

export function MarketplaceGrid({ 
  listings: externalListings,
  showMyListings = false,
  onListingAction,
  className = ''
}: MarketplaceGridProps) {
  const { 
    listings: allListings, 
    myListings, 
    isLoadingListings,
    fetchAllListings,
    fetchMyListings,
    filterListings,
    sortListings 
  } = useMarketplace()

  // Estado para filtros
  const [filters, setFilters] = useState<MarketplaceFilters>({
    searchTerm: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'date-new',
    showExpired: false,
    eventName: ''
  })

  const [showFilters, setShowFilters] = useState(false)

  // Determinar qué listings mostrar
  const sourceListings = externalListings || (showMyListings ? myListings : allListings)

  // Aplicar filtros y ordenamiento
  const filteredAndSortedListings = useMemo(() => {
    let result = [...sourceListings]

    // Filtrar por búsqueda general
    if (filters.searchTerm) {
      result = result.filter(listing => 
        listing.eventInfo?.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        listing.seller.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        listing.tokenId.toString().includes(filters.searchTerm)
      )
    }

    // Filtrar por nombre de evento específico
    if (filters.eventName) {
      result = result.filter(listing => 
        listing.eventInfo?.name.toLowerCase().includes(filters.eventName.toLowerCase())
      )
    }

    // Filtrar por rango de precios
    if (filters.minPrice || filters.maxPrice) {
      result = filterListings(result, {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice
      })
    }

    // Filtrar por estado de expiración
    if (!filters.showExpired) {
      const now = Date.now()
      result = result.filter(listing => listing.expiresAt * 1000 > now)
    }

    // Ordenar
    result = sortListings(result, filters.sortBy)

    return result
  }, [sourceListings, filters, filterListings, sortListings])

  // Manejar actualización de filtros
  const handleFilterChange = (key: keyof MarketplaceFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Manejar limpieza de filtros
  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'date-new',
      showExpired: false,
      eventName: ''
    })
  }

  // Manejar refresh
  const handleRefresh = async () => {
    if (showMyListings) {
      await fetchMyListings()
    } else {
      await fetchAllListings()
    }
    onListingAction?.()
  }

  return (
    <div className={`marketplace-grid-container ${className}`} style={{
      width: '100%'
    }}>
      {/* Header con controles */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.85) 100%)',
        borderRadius: '20px',
        padding: '1.5rem',
        marginBottom: '2rem',
        border: '2px solid rgba(0, 255, 255, 0.2)',
        backdropFilter: 'blur(20px)'
      }}>
        {/* Título y estadísticas */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
              marginBottom: '0.5rem'
            }}>
              🏪 {showMyListings ? 'Mis Listings' : 'Marketplace Secundario'}
            </h2>
            <div style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ color: '#b0b0b0' }}>
                <span style={{ color: '#00ffff', fontWeight: '600' }}>
                  {filteredAndSortedListings.length}
                </span> tickets disponibles
              </div>
              {sourceListings.length > 0 && (
                <div style={{ color: '#b0b0b0' }}>
                  <span style={{ color: '#ff00ff', fontWeight: '600' }}>
                    {sourceListings.filter(l => l.isActive).length}
                  </span> activos
                </div>
              )}
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '15px',
                border: 'none',
                background: showFilters 
                  ? 'linear-gradient(135deg, #00ffff, #0080ff)' 
                  : 'rgba(0, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🔍 {showFilters ? 'Ocultar' : 'Filtros'}
            </button>

            <button
              onClick={handleRefresh}
              disabled={isLoadingListings}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '15px',
                border: 'none',
                background: 'linear-gradient(135deg, #ff00ff, #8000ff)',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: isLoadingListings ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: isLoadingListings ? 0.6 : 1
              }}
            >
              {isLoadingListings ? '⏳' : '🔄'} Actualizar
            </button>
          </div>
        </div>

        {/* Panel de filtros */}
        {showFilters && (
          <div style={{
            background: 'rgba(0, 255, 255, 0.05)',
            borderRadius: '15px',
            padding: '1.5rem',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            alignItems: 'end'
          }}>
            {/* Búsqueda general */}
            <div>
              <label style={{
                display: 'block',
                color: '#00ffff',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                🔍 Buscar
              </label>
              <input
                type="text"
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                placeholder="Buscar por evento, vendedor o token ID..."
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#ffffff',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            {/* Precio mínimo */}
            <div>
              <label style={{
                display: 'block',
                color: '#00ffff',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                💰 Precio mín. (ETH)
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                placeholder="0.001"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#ffffff',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            {/* Precio máximo */}
            <div>
              <label style={{
                display: 'block',
                color: '#00ffff',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                💎 Precio máx. (ETH)
              </label>
              <input
                type="number"
                step="0.001"
                min="0"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                placeholder="1.0"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#ffffff',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            {/* Ordenamiento */}
            <div>
              <label style={{
                display: 'block',
                color: '#00ffff',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                📊 Ordenar por
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#ffffff',
                  fontSize: '0.9rem'
                }}
              >
                <option value="date-new">Más recientes</option>
                <option value="date-old">Más antiguos</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="expires-soon">Expiran pronto</option>
              </select>
            </div>

            {/* Mostrar expirados */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <input
                type="checkbox"
                id="show-expired"
                checked={filters.showExpired}
                onChange={(e) => handleFilterChange('showExpired', e.target.checked)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#00ffff'
                }}
              />
              <label 
                htmlFor="show-expired"
                style={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                ⏰ Mostrar expirados
              </label>
            </div>

            {/* Limpiar filtros */}
            <div>
              <button
                onClick={clearFilters}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ff6600, #ff4400)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                🗑️ Limpiar Filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading state */}
      {isLoadingListings && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#b0b0b0'
        }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            animation: 'spin 2s linear infinite'
          }}>
            ⏳
          </div>
          <div style={{ fontSize: '1.2rem' }}>
            Cargando listings del marketplace...
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoadingListings && filteredAndSortedListings.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.85) 100%)',
          borderRadius: '20px',
          border: '2px solid rgba(128, 128, 128, 0.2)'
        }}>
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem'
          }}>
            {sourceListings.length === 0 ? '🏪' : '🔍'}
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#ffffff',
            marginBottom: '1rem'
          }}>
            {sourceListings.length === 0 
              ? 'No hay tickets en el marketplace'
              : 'No se encontraron tickets'
            }
          </h3>
          <p style={{
            color: '#b0b0b0',
            fontSize: '1rem',
            maxWidth: '500px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            {sourceListings.length === 0 
              ? showMyListings
                ? 'Aún no has listado ningún ticket para venta. ¡Empieza a vender tus tickets NFT!'
                : 'El marketplace está esperando los primeros listings. ¡Sé el primero en vender!'
              : 'Intenta ajustar los filtros para encontrar más resultados.'
            }
          </p>
          {sourceListings.length === 0 && !showMyListings && (
            <button
              onClick={handleRefresh}
              style={{
                padding: '1rem 2rem',
                borderRadius: '15px',
                border: 'none',
                background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🔄 Actualizar Marketplace
            </button>
          )}
        </div>
      )}

      {/* Grid de tarjetas */}
      {!isLoadingListings && filteredAndSortedListings.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
          width: '100%'
        }}>
          {filteredAndSortedListings.map((listing) => (
            <MarketplaceCard
              key={`${listing.listingId}-${listing.tokenId}`}
              listing={listing}
              onBuySuccess={handleRefresh}
              onCancelSuccess={handleRefresh}
              onUpdatePriceSuccess={handleRefresh}
            />
          ))}
        </div>
      )}

      {/* Información adicional */}
      {!isLoadingListings && filteredAndSortedListings.length > 0 && (
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(0, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '1px solid rgba(0, 255, 255, 0.2)'
        }}>
          <div style={{
            color: '#b0b0b0',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            Mostrando {filteredAndSortedListings.length} de {sourceListings.length} tickets
          </div>
          {filteredAndSortedListings.length < sourceListings.length && (
            <div style={{
              color: '#ffaa00',
              fontSize: '0.8rem'
            }}>
              💡 Hay más tickets disponibles. Ajusta los filtros para verlos todos.
            </div>
          )}
        </div>
      )}

      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}