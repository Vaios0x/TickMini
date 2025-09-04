'use client'

import { useState, useEffect } from 'react'
import { BlogHero } from '@/components/blog/blog-hero'
import { BlogCategories } from '@/components/blog/blog-categories'
import { BlogSearch } from '@/components/blog/blog-search'
import { BlogCard } from '@/components/blog/blog-card'
import { BlogPagination } from '@/components/blog/blog-pagination'
import './blog.css'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    role: string
  }
  publishedAt: string
  readTime: string
  image: string
  featured?: boolean
  views: number
  likes: number
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'El Futuro de los NFTs en Base Network',
    excerpt: 'Exploramos cómo Base Network está revolucionando el ecosistema NFT con menores costos y mayor escalabilidad.',
    content: 'Base Network representa un cambio fundamental en cómo interactuamos con los NFTs...',
    category: 'nft',
    tags: ['nft', 'base-network', 'blockchain', 'escalabilidad'],
    author: {
      name: 'Ana Martínez',
      avatar: '👩‍💻',
      role: 'Blockchain Developer'
    },
    publishedAt: '2024-01-15',
    readTime: '5 min',
    image: '🚀',
    featured: true,
    views: 1247,
    likes: 89
  },
  {
    id: '2',
    title: 'Seguridad en DeFi: Mejores Prácticas',
    excerpt: 'Guía completa para proteger tus activos en el ecosistema de finanzas descentralizadas.',
    content: 'La seguridad en DeFi es fundamental para proteger tus inversiones...',
    category: 'defi',
    tags: ['defi', 'seguridad', 'best-practices', 'inversiones'],
    author: {
      name: 'Carlos Rodríguez',
      avatar: '👨‍🔒',
      role: 'Security Expert'
    },
    publishedAt: '2024-01-12',
    readTime: '8 min',
    image: '🛡️',
    featured: true,
    views: 2156,
    likes: 156
  },
  {
    id: '3',
    title: 'Integrando Web3 en Aplicaciones Tradicionales',
    excerpt: 'Cómo migrar aplicaciones web2 existentes al ecosistema Web3 de manera eficiente.',
    content: 'La migración a Web3 no tiene que ser un proceso disruptivo...',
    category: 'development',
    tags: ['web3', 'migración', 'integración', 'desarrollo'],
    author: {
      name: 'Laura Sánchez',
      avatar: '👩‍💼',
      role: 'Full Stack Developer'
    },
    publishedAt: '2024-01-10',
    readTime: '12 min',
    image: '🔗',
    views: 1893,
    likes: 134
  },
  {
    id: '4',
    title: 'Eventos NFT: Revolucionando la Industria del Entretenimiento',
    excerpt: 'Descubre cómo los tickets NFT están transformando la forma en que experimentamos eventos.',
    content: 'Los eventos NFT representan una nueva era en la industria del entretenimiento...',
    category: 'events',
    tags: ['eventos', 'nft-tickets', 'entretenimiento', 'ticketing'],
    author: {
      name: 'Miguel Torres',
      avatar: '👨‍🎫',
      role: 'Event Manager'
    },
    publishedAt: '2024-01-08',
    readTime: '6 min',
    image: '🎫',
    views: 1678,
    likes: 98
  },
  {
    id: '5',
    title: 'Layer 2 Solutions: Optimizando Ethereum',
    excerpt: 'Análisis profundo de las soluciones Layer 2 y su impacto en la escalabilidad de Ethereum.',
    content: 'Las soluciones Layer 2 son clave para el futuro de Ethereum...',
    category: 'blockchain',
    tags: ['ethereum', 'layer2', 'escalabilidad', 'optimización'],
    author: {
      name: 'Sofia Chen',
      avatar: '👩‍🔬',
      role: 'Blockchain Researcher'
    },
    publishedAt: '2024-01-05',
    readTime: '15 min',
    image: '⚡',
    views: 2341,
    likes: 178
  },
  {
    id: '6',
    title: 'Smart Contracts: De Principiante a Experto',
    excerpt: 'Curso completo para dominar el desarrollo de smart contracts en Solidity.',
    content: 'Los smart contracts son la base de la revolución blockchain...',
    category: 'development',
    tags: ['smart-contracts', 'solidity', 'desarrollo', 'blockchain'],
    author: {
      name: 'David Kim',
      avatar: '👨‍💻',
      role: 'Smart Contract Developer'
    },
    publishedAt: '2024-01-03',
    readTime: '20 min',
    image: '📜',
    views: 3124,
    likes: 245
  },
  {
    id: '7',
    title: 'DAO: Gobernanza Descentralizada en Acción',
    excerpt: 'Cómo las DAOs están redefiniendo la toma de decisiones en organizaciones.',
    content: 'Las DAOs representan un nuevo paradigma de gobernanza...',
    category: 'governance',
    tags: ['dao', 'gobernanza', 'descentralización', 'organizaciones'],
    author: {
      name: 'Elena Vargas',
      avatar: '👩‍⚖️',
      role: 'Governance Specialist'
    },
    publishedAt: '2024-01-01',
    readTime: '10 min',
    image: '🏛️',
    views: 1456,
    likes: 112
  },
  {
    id: '8',
    title: 'Metaverso: Construyendo el Futuro Digital',
    excerpt: 'Exploramos las tecnologías que están dando forma al metaverso y sus aplicaciones.',
    content: 'El metaverso es más que una tendencia tecnológica...',
    category: 'metaverse',
    tags: ['metaverso', 'vr', 'ar', 'futuro-digital'],
    author: {
      name: 'Roberto Silva',
      avatar: '👨‍🎮',
      role: 'VR/AR Developer'
    },
    publishedAt: '2023-12-28',
    readTime: '14 min',
    image: '🌐',
    views: 1987,
    likes: 167
  }
]

const categories = [
  { id: 'all', name: 'Todos', icon: '📚', color: 'var(--neon-cyan)' },
  { id: 'nft', name: 'NFTs', icon: '🎨', color: 'var(--neon-magenta)' },
  { id: 'defi', name: 'DeFi', icon: '💰', color: 'var(--neon-green)' },
  { id: 'development', name: 'Desarrollo', icon: '💻', color: 'var(--neon-yellow)' },
  { id: 'events', name: 'Eventos', icon: '🎫', color: 'var(--neon-cyan)' },
  { id: 'blockchain', name: 'Blockchain', icon: '⛓️', color: 'var(--neon-magenta)' },
  { id: 'governance', name: 'Gobernanza', icon: '🏛️', color: 'var(--neon-green)' },
  { id: 'metaverse', name: 'Metaverso', icon: '🌐', color: 'var(--neon-yellow)' }
]

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(mockBlogPosts)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date')

  // Filtrar posts basado en categoría y búsqueda
  useEffect(() => {
    let filtered = posts

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Ordenar posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        case 'views':
          return b.views - a.views
        case 'likes':
          return b.likes - a.likes
        default:
          return 0
      }
    })

    setFilteredPosts(filtered)
    setCurrentPage(1) // Reset a la primera página cuando cambian los filtros
  }, [selectedCategory, searchQuery, posts, sortBy])

  // Calcular posts para la página actual
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="blog-page">
      {/* Fondo neural animado */}
      <div className="neural-background">
        <div className="neural-grid"></div>
        <div className="floating-particles">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                '--delay': `${i * 0.4}s`,
                '--size': `${Math.random() * 5 + 3}px`,
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      <div className="blog-container">
        {/* Hero Section */}
        <BlogHero />

        {/* Categorías */}
        <BlogCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Búsqueda y Filtros */}
        <BlogSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredPosts.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Grid de posts */}
        <div className="blog-grid">
          {currentPosts.map(post => (
            <BlogCard
              key={post.id}
              post={post}
              onLike={handleLike}
            />
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredPosts.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No se encontraron artículos</h3>
            <p>Intenta ajustar tu búsqueda o seleccionar una categoría diferente</p>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}
