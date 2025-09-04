'use client'

import { useState } from 'react'

interface BlogSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  resultCount: number
  sortBy: 'date' | 'views' | 'likes'
  onSortChange: (sort: 'date' | 'views' | 'likes') => void
}

export function BlogSearch({ 
  searchQuery, 
  onSearchChange, 
  resultCount, 
  sortBy, 
  onSortChange 
}: BlogSearchProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <section className="blog-search">
      {/* Header de búsqueda */}
      <div className="search-header">
        <h2 className="search-title">Buscar Artículos</h2>
        <p className="search-subtitle">
          Encuentra exactamente lo que necesitas leer
        </p>
      </div>
      
      {/* Campo de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por título, contenido, autor o tags..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {/* Botón de limpiar búsqueda */}
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => onSearchChange('')}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
      
      {/* Contador de resultados */}
      <div className="search-results">
        <span className="results-count">
          {resultCount} {resultCount === 1 ? 'artículo encontrado' : 'artículos encontrados'}
        </span>
      </div>
      
      {/* Sugerencias de búsqueda */}
      {!searchQuery && (
        <div className="search-suggestions">
          {[
            'blockchain',
            'nft',
            'defi',
            'smart contracts',
            'web3',
            'metaverso',
            'dao',
            'base network'
          ].map((tag) => (
            <button
              key={tag}
              className="suggestion-tag"
              onClick={() => onSearchChange(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      
      {/* Filtros de ordenamiento */}
      <div className="search-filters">
        <button
          className={`filter-button ${sortBy === 'date' ? 'active' : ''}`}
          onClick={() => onSortChange('date')}
        >
          Más Recientes
        </button>
        
        <button
          className={`filter-button ${sortBy === 'views' ? 'active' : ''}`}
          onClick={() => onSortChange('views')}
        >
          Más Populares
        </button>
        
        <button
          className={`filter-button ${sortBy === 'likes' ? 'active' : ''}`}
          onClick={() => onSortChange('likes')}
        >
          Más Valorados
        </button>
      </div>
    </section>
  )
}
