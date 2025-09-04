'use client'

import { useState } from 'react'

interface TutorialSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  resultCount: number
}

export function TutorialSearch({ searchQuery, onSearchChange, resultCount }: TutorialSearchProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <section className="tutorial-search">
      {/* Header de búsqueda */}
      <div className="search-header">
        <h2 className="search-title">Buscar Tutoriales</h2>
        <p className="search-subtitle">
          Encuentra exactamente lo que necesitas aprender
        </p>
      </div>
      
      {/* Campo de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por título, descripción o tags..."
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
          {resultCount} {resultCount === 1 ? 'tutorial encontrado' : 'tutoriales encontrados'}
        </span>
      </div>
      
      {/* Sugerencias de búsqueda */}
      {!searchQuery && (
        <div className="search-suggestions">
          {[
            'blockchain',
            'nft',
            'wallet',
            'metamask',
            'base network',
            'web3',
            'seguridad',
            'defi'
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
      
      {/* Filtros rápidos */}
      <div className="search-filters">
        <button
          className={`filter-button ${searchQuery.includes('beginner') ? 'active' : ''}`}
          onClick={() => onSearchChange('beginner')}
        >
          Principiante
        </button>
        
        <button
          className={`filter-button ${searchQuery.includes('intermediate') ? 'active' : ''}`}
          onClick={() => onSearchChange('intermediate')}
        >
          Intermedio
        </button>
        
        <button
          className={`filter-button ${searchQuery.includes('advanced') ? 'active' : ''}`}
          onClick={() => onSearchChange('advanced')}
        >
          Avanzado
        </button>
      </div>
    </section>
  )
}
