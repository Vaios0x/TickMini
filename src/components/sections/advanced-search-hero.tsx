'use client'

import * as React from 'react'
import Link from 'next/link'
import { AdvancedSearch } from '@/components/ui/advanced-search'

interface AdvancedSearchHeroProps {
  mousePosition: { x: number; y: number }
  windowSize: { width: number; height: number }
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
  categories: any[]
  totalResults: number
  isLoading: boolean
}

export function AdvancedSearchHero({
  mousePosition,
  windowSize,
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
  isLoading
}: AdvancedSearchHeroProps) {
  return (
    <section 
      className="advanced-search-hero-section"
      style={{
        padding: 'clamp(3rem, 8vw, 6rem) 0',
        background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(255, 0, 255, 0.05) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.08) 0%, transparent 50%),
          radial-gradient(circle at ${windowSize.width - mousePosition.x}px ${windowSize.height - mousePosition.y}px, rgba(255, 0, 255, 0.08) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        transition: 'all 0.1s ease'
      }} />
      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 3vw, 2rem)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Título de la sección */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'clamp(2rem, 5vw, 4rem)'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
            textAlign: 'center'
          }}>
            🔍 Descubre Eventos Increíbles
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            color: '#b0b0b0',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Usa nuestro buscador avanzado para encontrar eventos que se adapten perfectamente a tus intereses, 
            ubicación y presupuesto. Filtros inteligentes para resultados precisos.
          </p>
        </div>

        {/* Componente de búsqueda avanzada */}
        <AdvancedSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          categories={categories}
          totalResults={totalResults}
          isLoading={isLoading}
        />

        {/* Botón de acción */}
        <div style={{
          textAlign: 'center',
          marginTop: 'clamp(2rem, 5vw, 3rem)'
        }}>
          <Link href="/events">
            <button 
              style={{
                padding: 'clamp(1rem, 3vw, 1.5rem) clamp(2rem, 5vw, 3rem)',
                background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                border: 'none',
                borderRadius: 'clamp(15px, 4vw, 20px)',
                color: '#000000',
                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.3)'
              }}
            >
              🚀 Ver Todos los Eventos
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
