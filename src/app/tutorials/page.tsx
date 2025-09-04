'use client'

import { useState, useEffect } from 'react'
import { TutorialCard } from '@/components/tutorials/tutorial-card'
import { TutorialHero } from '@/components/tutorials/tutorial-hero'
import { TutorialCategories } from '@/components/tutorials/tutorial-categories'
import { TutorialSearch } from '@/components/tutorials/tutorial-search'
import { TutorialProgress } from '@/components/tutorials/tutorial-progress'
import './tutorials.css'

interface Tutorial {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  tags: string[]
  image: string
  progress?: number
  completed?: boolean
}

const mockTutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Introducción a Web3 y Blockchain',
    description: 'Aprende los fundamentos de la tecnología blockchain y cómo funciona Web3',
    category: 'fundamentals',
    difficulty: 'beginner',
    duration: '15 min',
    tags: ['blockchain', 'web3', 'fundamentals'],
    image: '🚀',
    progress: 0
  },
  {
    id: '2',
    title: 'Configuración de Wallet MetaMask',
    description: 'Guía completa para configurar y usar MetaMask con Base Network',
    category: 'wallets',
    difficulty: 'beginner',
    duration: '20 min',
    tags: ['wallet', 'metamask', 'base-network'],
    image: '🦊',
    progress: 0
  },
  {
    id: '3',
    title: 'Compra de tu Primer NFT',
    description: 'Tutorial paso a paso para comprar tu primer NFT en el marketplace',
    category: 'nft-basics',
    difficulty: 'beginner',
    duration: '25 min',
    tags: ['nft', 'marketplace', 'purchase'],
    image: '🎨',
    progress: 0
  },
  {
    id: '4',
    title: 'Creación de Eventos NFT',
    description: 'Aprende a crear y gestionar eventos con tickets NFT',
    category: 'event-creation',
    difficulty: 'intermediate',
    duration: '35 min',
    tags: ['events', 'nft-tickets', 'creation'],
    image: '🎫',
    progress: 0
  },
  {
    id: '5',
    title: 'Verificación de Tickets',
    description: 'Sistema completo de verificación de tickets NFT en eventos',
    category: 'verification',
    difficulty: 'intermediate',
    duration: '30 min',
    tags: ['verification', 'tickets', 'events'],
    image: '🔍',
    progress: 0
  },
  {
    id: '6',
    title: 'Seguridad en Web3',
    description: 'Mejores prácticas de seguridad para proteger tus activos digitales',
    category: 'security',
    difficulty: 'advanced',
    duration: '40 min',
    tags: ['security', 'best-practices', 'protection'],
    image: '🛡️',
    progress: 0
  },
  {
    id: '7',
    title: 'Integración con Base Network',
    description: 'Cómo integrar tu aplicación con Base Network y optimizar costos',
    category: 'integration',
    difficulty: 'advanced',
    duration: '45 min',
    tags: ['base-network', 'integration', 'optimization'],
    image: '⚡',
    progress: 0
  },
  {
    id: '8',
    title: 'DeFi Básico en Base',
    description: 'Introducción a las finanzas descentralizadas en Base Network',
    category: 'defi',
    difficulty: 'intermediate',
    duration: '30 min',
    tags: ['defi', 'base-network', 'yield'],
    image: '💰',
    progress: 0
  }
]

const categories = [
  { id: 'all', name: 'Todos', icon: '🌟', color: 'var(--neon-cyan)' },
  { id: 'fundamentals', name: 'Fundamentos', icon: '📚', color: 'var(--neon-green)' },
  { id: 'wallets', name: 'Wallets', icon: '🦊', color: 'var(--neon-yellow)' },
  { id: 'nft-basics', name: 'NFT Básico', icon: '🎨', color: 'var(--neon-magenta)' },
  { id: 'event-creation', name: 'Crear Eventos', icon: '🎫', color: 'var(--neon-cyan)' },
  { id: 'verification', name: 'Verificación', icon: '🔍', color: 'var(--neon-green)' },
  { id: 'security', name: 'Seguridad', icon: '🛡️', color: 'var(--neon-yellow)' },
  { id: 'integration', name: 'Integración', icon: '⚡', color: 'var(--neon-magenta)' },
  { id: 'defi', name: 'DeFi', icon: '💰', color: 'var(--neon-cyan)' }
]

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>(mockTutorials)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>(mockTutorials)
  const [userProgress, setUserProgress] = useState(0)

  // Filtrar tutoriales basado en categoría y búsqueda
  useEffect(() => {
    let filtered = tutorials

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(tutorial =>
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredTutorials(filtered)
  }, [selectedCategory, searchQuery, tutorials])

  // Calcular progreso del usuario
  useEffect(() => {
    const completedTutorials = tutorials.filter(t => t.completed).length
    const totalTutorials = tutorials.length
    setUserProgress(totalTutorials > 0 ? (completedTutorials / totalTutorials) * 100 : 0)
  }, [tutorials])

  const handleTutorialComplete = (tutorialId: string) => {
    setTutorials(prev => prev.map(tutorial =>
      tutorial.id === tutorialId
        ? { ...tutorial, completed: true, progress: 100 }
        : tutorial
    ))
  }

  const handleTutorialProgress = (tutorialId: string, progress: number) => {
    setTutorials(prev => prev.map(tutorial =>
      tutorial.id === tutorialId
        ? { ...tutorial, progress }
        : tutorial
    ))
  }

  return (
    <div className="tutorials-page">
      {/* Fondo neural animado */}
      <div className="neural-background">
        <div className="neural-grid"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--delay': `${i * 0.5}s`,
                '--size': `${Math.random() * 4 + 2}px`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      <div className="tutorials-container">
        {/* Hero Section */}
        <TutorialHero userProgress={userProgress} />

        {/* Barra de progreso */}
        <TutorialProgress progress={userProgress} />

        {/* Categorías */}
        <TutorialCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Búsqueda */}
        <TutorialSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredTutorials.length}
        />

        {/* Grid de tutoriales */}
        <div className="tutorials-grid">
          {filteredTutorials.map(tutorial => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              onComplete={handleTutorialComplete}
              onProgress={handleTutorialProgress}
            />
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredTutorials.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No se encontraron tutoriales</h3>
            <p>Intenta ajustar tu búsqueda o seleccionar una categoría diferente</p>
          </div>
        )}
      </div>
    </div>
  )
}
