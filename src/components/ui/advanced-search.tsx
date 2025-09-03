'use client'

import React, { useState, useEffect, useCallback } from 'react'
import './advanced-search.css'

interface AdvancedSearchProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  dateRange: [Date | null, Date | null]
  setDateRange: (range: [Date | null, Date | null]) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[] | ((prev: string[]) => string[])) => void
  showAdvancedFilters: boolean
  setShowAdvancedFilters: (show: boolean) => void
  categories: Array<{
    id: string
    name: string
    icon: string
    color: string
  }>
  totalResults: number
  isLoading?: boolean
}

interface Tag {
  id: string
  name: string
  icon: string
  color: string
}

export function AdvancedSearch({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  dateRange,
  setDateRange,
  selectedTags,
  setSelectedTags,
  showAdvancedFilters,
  setShowAdvancedFilters,
  categories,
  totalResults,
  isLoading = false
}: AdvancedSearchProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  // Tags disponibles para filtrado
  const availableTags: Tag[] = [
    { id: 'nft', name: 'NFT', icon: '🖼️', color: '#00ffff' },
    { id: 'blockchain', name: 'Blockchain', icon: '⛓️', color: '#ff00ff' },
    { id: 'web3', name: 'Web3', icon: '🌐', color: '#ffff00' },
    { id: 'ai', name: 'Inteligencia Artificial', icon: '🤖', color: '#00ff00' },
    { id: 'metaverse', name: 'Metaverso', icon: '🌍', color: '#ff8000' },
    { id: 'defi', name: 'DeFi', icon: '💰', color: '#8000ff' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', color: '#00ff80' },
    { id: 'art', name: 'Arte Digital', icon: '🎨', color: '#ff0080' },
    { id: 'music', name: 'Música', icon: '🎵', color: '#00ffff' },
    { id: 'tech', name: 'Tecnología', icon: '💻', color: '#00ff00' }
  ]

  // Sugerencias de búsqueda basadas en el término actual
  useEffect(() => {
    if (searchTerm.length > 2) {
      const suggestions = [
        'Web3 Summit',
        'NFT Art Gallery',
        'Blockchain Conference',
        'AI Workshop',
        'Metaverse Expo',
        'DeFi Trading',
        'Gaming Tournament',
        'Digital Art Show'
      ].filter(suggestion => 
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
      setSearchSuggestions(suggestions)
    } else {
      setSearchSuggestions([])
    }
  }, [searchTerm])

  // Cargar búsquedas recientes del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Guardar búsqueda reciente
  const saveSearch = useCallback((term: string) => {
    if (term.trim()) {
      const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('recentSearches', JSON.stringify(updated))
    }
  }, [recentSearches])

  // Manejar búsqueda
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    saveSearch(term)
    setSearchSuggestions([])
  }, [setSearchTerm, saveSearch])

  // Limpiar todos los filtros
  const clearAllFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSortBy('date')
    setPriceRange([0, 1])
    setDateRange([null, null])
    setSelectedTags([])
    setShowAdvancedFilters(false)
  }, [setSearchTerm, setSelectedCategory, setSortBy, setPriceRange, setDateRange, setSelectedTags, setShowAdvancedFilters])

  // Toggle tag
  const toggleTag = useCallback((tagId: string) => {
    setSelectedTags((prev: string[]) => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }, [setSelectedTags])

  // Formatear precio
  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratis'
    if (price === 1) return '0.5+ ETH'
    return `${(price * 0.5).toFixed(2)} ETH`
  }

  // Formatear fecha
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="advanced-search-container">
      {/* Barra de búsqueda principal con efectos premium */}
      <div className="search-hero-section">
        <div className="search-input-wrapper">
          <div className="search-icon">
            <span className="search-emoji">🔍</span>
            <div className="search-glow"></div>
          </div>
          
          <input
            type="text"
            placeholder="✨ Buscar eventos, organizadores, ubicaciones, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            className={`search-input ${isSearchFocused ? 'focused' : ''}`}
            disabled={isLoading}
          />
          
          <div className="search-actions">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="clear-search-btn"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`advanced-toggle-btn ${showAdvancedFilters ? 'active' : ''}`}
              aria-label="Mostrar filtros avanzados"
            >
              ⚙️
            </button>
          </div>
        </div>

        {/* Sugerencias de búsqueda */}
        {isSearchFocused && (searchSuggestions.length > 0 || recentSearches.length > 0) && (
          <div className="search-suggestions">
            {searchSuggestions.length > 0 && (
              <div className="suggestions-section">
                <h4 className="suggestions-title">💡 Sugerencias</h4>
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="suggestion-item"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            {recentSearches.length > 0 && (
              <div className="suggestions-section">
                <h4 className="suggestions-title">🕒 Búsquedas Recientes</h4>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(search)}
                    className="suggestion-item recent"
                  >
                    {search}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filtros básicos siempre visibles */}
      <div className="basic-filters">
        <div className="filter-row">
          {/* Filtro de categoría */}
          <div className="filter-group">
            <label className="filter-label">
              <span className="filter-icon">🏷️</span>
              Categoría
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select category-select"
              disabled={isLoading}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de ordenamiento */}
          <div className="filter-group">
            <label className="filter-label">
              <span className="filter-icon">📊</span>
              Ordenar Por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select sort-select"
              disabled={isLoading}
            >
              <option value="date">📅 Por Fecha</option>
              <option value="price">💰 Por Precio</option>
              <option value="name">🔤 Por Nombre</option>
              <option value="popularity">🔥 Por Popularidad</option>
              <option value="rating">⭐ Por Calificación</option>
              <option value="distance">📍 Por Distancia</option>
            </select>
          </div>

          {/* Botón de filtros avanzados */}
          <div className="filter-group">
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`advanced-filters-btn ${showAdvancedFilters ? 'active' : ''}`}
              disabled={isLoading}
            >
              <span className="btn-icon">⚙️</span>
              <span className="btn-text">
                {showAdvancedFilters ? 'Ocultar' : 'Mostrar'} Filtros
              </span>
              <span className="btn-arrow">▼</span>
            </button>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="results-counter">
          <span className="results-text">
            {isLoading ? '🔄 Buscando...' : `🎯 ${totalResults} eventos encontrados`}
          </span>
        </div>
      </div>

      {/* Filtros avanzados expandibles */}
      <div className={`advanced-filters ${showAdvancedFilters ? 'expanded' : ''}`}>
        <div className="advanced-filters-content">
          {/* Primera fila de filtros avanzados */}
          <div className="advanced-filters-row">
            {/* Filtro de rango de precios */}
            <div className="filter-group price-filter">
              <label className="filter-label">
                <span className="filter-icon">💰</span>
                Rango de Precio
              </label>
              <div className="price-range-container">
                <div className="price-inputs">
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                    className="price-input"
                    placeholder="0.00"
                    disabled={isLoading}
                  />
                  <span className="price-separator">-</span>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                    className="price-input"
                    placeholder="0.50"
                    disabled={isLoading}
                  />
                </div>
                <div className="price-slider">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseFloat(e.target.value), priceRange[1]])}
                    className="range-slider min-range"
                    disabled={isLoading}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                    className="range-slider max-range"
                    disabled={isLoading}
                  />
                </div>
                <div className="price-labels">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Filtro de rango de fechas */}
            <div className="filter-group date-filter">
              <label className="filter-label">
                <span className="filter-icon">📅</span>
                Rango de Fechas
              </label>
              <div className="date-range-container">
                <input
                  type="date"
                  value={dateRange[0] ? dateRange[0].toISOString().split('T')[0] : ''}
                  onChange={(e) => setDateRange([e.target.value ? new Date(e.target.value) : null, dateRange[1]])}
                  className="date-input"
                  disabled={isLoading}
                />
                <span className="date-separator">hasta</span>
                <input
                  type="date"
                  value={dateRange[1] ? dateRange[1].toISOString().split('T')[0] : ''}
                  onChange={(e) => setDateRange([dateRange[0], e.target.value ? new Date(e.target.value) : null])}
                  className="date-input"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Segunda fila - Tags */}
          <div className="advanced-filters-row">
            <div className="filter-group tags-filter">
              <label className="filter-label">
                <span className="filter-icon">🏷️</span>
                Tags Específicos
              </label>
              <div className="tags-container">
                {availableTags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`tag-button ${selectedTags.includes(tag.id) ? 'selected' : ''}`}
                    style={{
                      '--tag-color': tag.color
                    } as React.CSSProperties}
                    disabled={isLoading}
                  >
                    <span className="tag-icon">{tag.icon}</span>
                    <span className="tag-name">{tag.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tercera fila - Filtros adicionales */}
          <div className="advanced-filters-row">
            <div className="filter-group">
              <label className="filter-label">
                <span className="filter-icon">🎯</span>
                Tipo de Evento
              </label>
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">🎭 Presencial</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">💻 Virtual</span>
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">🌐 Híbrido</span>
                </label>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <span className="filter-icon">⭐</span>
                Calificación Mínima
              </label>
              <div className="rating-filter">
                {[1, 2, 3, 4, 5].map(rating => (
                  <button
                    key={rating}
                    className="rating-star"
                    aria-label={`${rating} estrellas`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="advanced-actions">
          <button
            onClick={clearAllFilters}
            className="clear-all-btn"
            disabled={isLoading}
          >
            🗑️ Limpiar Todos los Filtros
          </button>
          
          <button
            onClick={() => setShowAdvancedFilters(false)}
            className="apply-filters-btn"
            disabled={isLoading}
          >
            ✅ Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Filtros activos */}
      {(searchTerm || selectedCategory !== 'all' || selectedTags.length > 0 || 
        priceRange[0] > 0 || priceRange[1] < 1 || dateRange[0] || dateRange[1]) && (
        <div className="active-filters">
          <div className="active-filters-header">
            <span className="active-filters-title">🔍 Filtros Activos:</span>
            <button
              onClick={clearAllFilters}
              className="clear-filters-btn"
              aria-label="Limpiar todos los filtros"
            >
              🗑️ Limpiar Todo
            </button>
          </div>
          
          <div className="active-filters-tags">
            {searchTerm && (
              <span className="active-filter-tag search-tag">
                🔍 "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="remove-filter-btn"
                  aria-label="Eliminar filtro de búsqueda"
                >
                  ×
                </button>
              </span>
            )}
            
            {selectedCategory !== 'all' && (
              <span className="active-filter-tag category-tag">
                🏷️ {categories.find(cat => cat.id === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="remove-filter-btn"
                  aria-label="Eliminar filtro de categoría"
                >
                  ×
                </button>
              </span>
            )}
            
            {selectedTags.map(tagId => {
              const tag = availableTags.find(t => t.id === tagId)
              return tag ? (
                <span key={tagId} className="active-filter-tag tag-tag">
                  {tag.icon} {tag.name}
                  <button
                    onClick={() => toggleTag(tagId)}
                    className="remove-filter-btn"
                    aria-label={`Eliminar filtro ${tag.name}`}
                  >
                    ×
                  </button>
                </span>
              ) : null
            })}
            
            {(priceRange[0] > 0 || priceRange[1] < 1) && (
              <span className="active-filter-tag price-tag">
                💰 {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                <button
                  onClick={() => setPriceRange([0, 1])}
                  className="remove-filter-btn"
                  aria-label="Eliminar filtro de precio"
                >
                  ×
                </button>
              </span>
            )}
            
            {(dateRange[0] || dateRange[1]) && (
              <span className="active-filter-tag date-tag">
                📅 {dateRange[0] ? formatDate(dateRange[0]) : 'Cualquier'} - {dateRange[1] ? formatDate(dateRange[1]) : 'Cualquier'}
                <button
                  onClick={() => setDateRange([null, null])}
                  className="remove-filter-btn"
                  aria-label="Eliminar filtro de fecha"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
