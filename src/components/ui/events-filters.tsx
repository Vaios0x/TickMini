'use client'

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
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '3rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Barra de búsqueda */}
      <div style={{
        marginBottom: '2rem'
      }}>
        <label htmlFor="search-events" style={{
          display: 'block',
          color: '#ffffff',
          fontSize: '1.1rem',
          marginBottom: '0.8rem',
          fontWeight: '500'
        }}>
          🔍 Buscar Eventos
        </label>
        <input
          id="search-events"
          type="text"
          placeholder="Buscar por título, descripción, organizador o ubicación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '15px',
            color: '#ffffff',
            fontSize: '1rem',
            outline: 'none',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(0, 255, 255, 0.6)'
            e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
            e.target.style.boxShadow = 'none'
          }}
          tabIndex={0}
          aria-label="Buscar eventos"
        />
      </div>

      {/* Filtros */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        alignItems: 'end'
      }}>
        {/* Filtro de categoría */}
        <div>
          <label htmlFor="category-filter" style={{
            display: 'block',
            color: '#ffffff',
            fontSize: '1rem',
            marginBottom: '0.8rem',
            fontWeight: '500'
          }}>
            🏷️ Categoría
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(0, 255, 255, 0.6)'
              e.target.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.2)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              e.target.style.boxShadow = 'none'
            }}
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
        <div>
          <label htmlFor="sort-filter" style={{
            display: 'block',
            color: '#ffffff',
            fontSize: '1rem',
            marginBottom: '0.8rem',
            fontWeight: '500'
          }}>
            📊 Ordenar Por
          </label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(255, 0, 255, 0.6)'
              e.target.style.boxShadow = '0 0 15px rgba(255, 0, 255, 0.2)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              e.target.style.boxShadow = 'none'
            }}
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
        <div>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSortBy('date')
            }}
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
            }}
            tabIndex={0}
            aria-label="Limpiar todos los filtros"
          >
            🗑️ Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Información de filtros activos */}
      {(searchTerm || selectedCategory !== 'all') && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(0, 255, 255, 0.1)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <span style={{ color: '#00ffff', fontWeight: '600' }}>🔍 Filtros Activos:</span>
          {searchTerm && (
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '0.3rem 0.8rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: '#ffffff'
            }}>
              Búsqueda: "{searchTerm}"
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '0.3rem 0.8rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: '#ffffff'
            }}>
              Categoría: {categories.find(cat => cat.id === selectedCategory)?.name}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
