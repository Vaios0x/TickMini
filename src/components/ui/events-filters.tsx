'use client'

import './events-filters.css'

interface EventsFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  categories: Array<{
    id: string
    name: string
    icon: string
    color: string
  }>
}

export function EventsFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories
}: EventsFiltersProps) {
  return (
    <div className="events-filters-container">
      {/* Barra de búsqueda */}
      <div className="search-section">
        <label htmlFor="search-events" className="search-label">
          🔍 Buscar Eventos
        </label>
        <input
          id="search-events"
          type="text"
          placeholder="Buscar por título, descripción, organizador o ubicación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          tabIndex={0}
          aria-label="Buscar eventos"
        />
      </div>

      {/* Filtros */}
      <div className="filters-grid">
        {/* Filtro de categoría */}
        <div className="filter-group">
          <label htmlFor="category-filter" className="filter-label">
            🏷️ Categoría
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
            tabIndex={0}
            aria-label="Filtrar por categoría"
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
          <label htmlFor="sort-filter" className="filter-label">
            📊 Ordenar Por
          </label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
            tabIndex={0}
            aria-label="Ordenar eventos"
          >
            <option value="date">📅 Por Fecha</option>
            <option value="price">💰 Por Precio</option>
            <option value="name">🔤 Por Nombre</option>
            <option value="popularity">🔥 Por Popularidad</option>
          </select>
        </div>

        {/* Botón de limpiar filtros */}
        <div className="filter-group">
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSortBy('date')
            }}
            className="clear-filters-btn"
            tabIndex={0}
            aria-label="Limpiar todos los filtros"
          >
            🗑️ Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Información de filtros activos */}
      {(searchTerm || selectedCategory !== 'all') && (
        <div className="active-filters">
          <span className="active-filters-label">🔍 Filtros Activos:</span>
          {searchTerm && (
            <span className="filter-tag">
              Búsqueda: "{searchTerm}"
              <button
                className="remove-filter"
                onClick={() => setSearchTerm('')}
                aria-label="Eliminar filtro de búsqueda"
              >
                ×
              </button>
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="filter-tag">
              Categoría: {categories.find(cat => cat.id === selectedCategory)?.name}
              <button
                className="remove-filter"
                onClick={() => setSelectedCategory('all')}
                aria-label="Eliminar filtro de categoría"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
