'use client'

import React, { useState, useMemo } from 'react'
import { ValidationRecord, ValidationStats } from '@/hooks/use-ticket-validation-complex'

interface ValidationHistoryAdvancedProps {
  history: ValidationRecord[]
  stats: ValidationStats
  onExport?: (format: 'json' | 'csv') => void
  onClear?: () => void
  onViewDetails?: (record: ValidationRecord) => void
  className?: string
}

interface FilterOptions {
  dateRange: 'all' | 'today' | 'week' | 'month'
  validationResult: 'all' | 'valid' | 'invalid'
  validator: string
  searchTerm: string
}

export function ValidationHistoryAdvanced({
  history,
  stats,
  onExport,
  onClear,
  onViewDetails,
  className = ''
}: ValidationHistoryAdvancedProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: 'all',
    validationResult: 'all',
    validator: '',
    searchTerm: ''
  })

  const [sortBy, setSortBy] = useState<'date' | 'tokenId' | 'validator'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showStats, setShowStats] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filtrar y ordenar historial
  const filteredAndSortedHistory = useMemo(() => {
    let filtered = [...history]

    // Filtro por rango de fechas
    const now = Date.now() / 1000
    switch (filters.dateRange) {
      case 'today':
        filtered = filtered.filter(record => 
          record.validatedAt > now - 86400
        )
        break
      case 'week':
        filtered = filtered.filter(record => 
          record.validatedAt > now - (7 * 86400)
        )
        break
      case 'month':
        filtered = filtered.filter(record => 
          record.validatedAt > now - (30 * 86400)
        )
        break
    }

    // Filtro por resultado de validación
    if (filters.validationResult !== 'all') {
      filtered = filtered.filter(record => 
        record.isValid === (filters.validationResult === 'valid')
      )
    }

    // Filtro por validador
    if (filters.validator) {
      filtered = filtered.filter(record => 
        record.validator.toLowerCase().includes(filters.validator.toLowerCase())
      )
    }

    // Filtro por búsqueda
    if (filters.searchTerm) {
      filtered = filtered.filter(record => 
        record.tokenId.toString().includes(filters.searchTerm) ||
        record.notes.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        record.validator.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'date':
          comparison = a.validatedAt - b.validatedAt
          break
        case 'tokenId':
          comparison = a.tokenId - b.tokenId
          break
        case 'validator':
          comparison = a.validator.localeCompare(b.validator)
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [history, filters, sortBy, sortOrder])

  // Paginación
  const paginatedHistory = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedHistory.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedHistory, currentPage, itemsPerPage])

  const totalPages = Math.ceil(filteredAndSortedHistory.length / itemsPerPage)

  // Formatear fecha
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return {
      date: date.toLocaleDateString('es-ES'),
      time: date.toLocaleTimeString('es-ES')
    }
  }

  // Acortar dirección
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className={className} style={{
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(20, 20, 20, 0.85) 100%)',
      borderRadius: '25px',
      padding: '2rem',
      border: '2px solid rgba(0, 255, 255, 0.2)',
      backdropFilter: 'blur(20px)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            📋 Historial de Validaciones
          </h2>
          <p style={{
            color: '#b0b0b0',
            fontSize: '1rem'
          }}>
            {filteredAndSortedHistory.length} de {history.length} validaciones
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setShowStats(!showStats)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: showStats ? 'linear-gradient(135deg, #00ffff, #0080ff)' : 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            📊 {showStats ? 'Ocultar' : 'Mostrar'} Stats
          </button>

          {onExport && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => onExport('json')}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #00ff00, #00cc00)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                📄 JSON
              </button>
              <button
                onClick={() => onExport('csv')}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ffaa00, #ff8800)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                📊 CSV
              </button>
            </div>
          )}

          {onClear && (
            <button
              onClick={onClear}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                color: '#ffffff',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              🗑️ Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Estadísticas */}
      {showStats && (
        <div style={{
          background: 'rgba(0, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(0, 255, 255, 0.2)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#00ffff',
                marginBottom: '0.25rem'
              }}>
                {stats.totalValidations}
              </div>
              <div style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                Total Validaciones
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#00ff00',
                marginBottom: '0.25rem'
              }}>
                {stats.validTickets}
              </div>
              <div style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                Tickets Válidos
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#ff0000',
                marginBottom: '0.25rem'
              }}>
                {stats.invalidTickets}
              </div>
              <div style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                Tickets Inválidos
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#ffff00',
                marginBottom: '0.25rem'
              }}>
                {stats.totalValidations > 0 
                  ? ((stats.validTickets / stats.totalValidations) * 100).toFixed(1)
                  : '0'
                }%
              </div>
              <div style={{ color: '#b0b0b0', fontSize: '0.9rem' }}>
                Tasa de Éxito
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '15px',
        padding: '1.5rem',
        marginBottom: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          alignItems: 'end'
        }}>
          {/* Búsqueda */}
          <div>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.9rem',
              marginBottom: '0.5rem'
            }}>
              🔍 Buscar
            </label>
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              placeholder="Token ID, validador, notas..."
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Rango de fechas */}
          <div>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.9rem',
              marginBottom: '0.5rem'
            }}>
              📅 Fecha
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value as any }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option value="all">Todas</option>
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
            </select>
          </div>

          {/* Resultado */}
          <div>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.9rem',
              marginBottom: '0.5rem'
            }}>
              ✅ Resultado
            </label>
            <select
              value={filters.validationResult}
              onChange={(e) => setFilters(prev => ({ ...prev, validationResult: e.target.value as any }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              <option value="all">Todos</option>
              <option value="valid">Válidos</option>
              <option value="invalid">Inválidos</option>
            </select>
          </div>

          {/* Ordenamiento */}
          <div>
            <label style={{
              display: 'block',
              color: '#ffffff',
              fontSize: '0.9rem',
              marginBottom: '0.5rem'
            }}>
              📊 Ordenar por
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value="date">Fecha</option>
                <option value="tokenId">Token ID</option>
                <option value="validator">Validador</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                style={{
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de validaciones */}
      {filteredAndSortedHistory.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#b0b0b0'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
          <div style={{ fontSize: '1.2rem' }}>
            {history.length === 0 ? 'No hay validaciones registradas' : 'No se encontraron resultados'}
          </div>
        </div>
      ) : (
        <>
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '15px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Header de tabla */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr 3fr',
              gap: '1rem',
              padding: '1rem',
              background: 'rgba(0, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(0, 255, 255, 0.2)',
              fontWeight: '600',
              color: '#00ffff',
              fontSize: '0.9rem'
            }}>
              <div>Token ID</div>
              <div>Validador</div>
              <div>Resultado</div>
              <div>Fecha</div>
              <div>Notas</div>
            </div>

            {/* Filas */}
            {paginatedHistory.map((record, index) => {
              const { date, time } = formatDate(record.validatedAt)
              
              return (
                <div
                  key={`${record.tokenId}-${record.validatedAt}`}
                  onClick={() => onViewDetails?.(record)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 1fr 1fr 3fr',
                    gap: '1rem',
                    padding: '1rem',
                    borderBottom: index < paginatedHistory.length - 1 
                      ? '1px solid rgba(255, 255, 255, 0.05)' 
                      : 'none',
                    cursor: onViewDetails ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                    fontSize: '0.9rem'
                  }}
                  onMouseEnter={(e) => {
                    if (onViewDetails) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (onViewDetails) {
                      e.currentTarget.style.background = 'transparent'
                    }
                  }}
                >
                  <div style={{
                    color: '#ffffff',
                    fontFamily: 'monospace',
                    fontWeight: '600'
                  }}>
                    #{record.tokenId}
                  </div>

                  <div style={{
                    color: '#b0b0b0',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem'
                  }}>
                    {shortenAddress(record.validator)}
                  </div>

                  <div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      background: record.isValid 
                        ? 'rgba(0, 255, 0, 0.2)' 
                        : 'rgba(255, 0, 0, 0.2)',
                      color: record.isValid ? '#00ff00' : '#ff0000',
                      border: `1px solid ${record.isValid ? '#00ff00' : '#ff0000'}40`
                    }}>
                      {record.isValid ? '✅' : '❌'}
                      {record.isValid ? 'Válido' : 'Inválido'}
                    </div>
                  </div>

                  <div style={{ color: '#b0b0b0', fontSize: '0.8rem' }}>
                    <div>{date}</div>
                    <div style={{ color: '#888888' }}>{time}</div>
                  </div>

                  <div style={{
                    color: '#ffffff',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {record.notes || 'Sin notas'}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '2rem'
            }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: currentPage === 1 
                    ? 'rgba(128, 128, 128, 0.3)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                ← Anterior
              </button>

              <div style={{
                color: '#ffffff',
                fontSize: '0.9rem'
              }}>
                Página {currentPage} de {totalPages}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: currentPage === totalPages 
                    ? 'rgba(128, 128, 128, 0.3)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}