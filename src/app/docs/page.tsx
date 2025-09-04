'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Code, 
  Zap, 
  Shield, 
  Globe, 
  Database, 
  Cpu, 
  Rocket,
  ChevronRight,
  ExternalLink,
  Search,
  Filter,
  Star,
  Bookmark,
  Share2
} from 'lucide-react'
import './docs.css'

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carga
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const categories = [
    { id: 'all', name: 'Todas', icon: BookOpen, count: 24 },
    { id: 'getting-started', name: 'Primeros Pasos', icon: Rocket, count: 6 },
    { id: 'api', name: 'API', icon: Code, count: 8 },
    { id: 'security', name: 'Seguridad', icon: Shield, count: 4 },
    { id: 'deployment', name: 'Despliegue', icon: Globe, count: 3 },
    { id: 'advanced', name: 'Avanzado', icon: Zap, count: 3 }
  ]

  const docs = [
    {
      id: 1,
      title: 'Introducción a TickBase',
      description: 'Aprende los conceptos fundamentales de nuestra plataforma de ticketing NFT',
      category: 'getting-started',
      difficulty: 'beginner',
      readTime: '5 min',
      tags: ['nft', 'ticketing', 'blockchain'],
      featured: true
    },
    {
      id: 2,
      title: 'Configuración del Entorno',
      description: 'Guía paso a paso para configurar tu entorno de desarrollo',
      category: 'getting-started',
      difficulty: 'beginner',
      readTime: '10 min',
      tags: ['setup', 'development', 'environment']
    },
    {
      id: 3,
      title: 'API de Eventos',
      description: 'Documentación completa de la API para gestión de eventos',
      category: 'api',
      difficulty: 'intermediate',
      readTime: '15 min',
      tags: ['api', 'events', 'rest']
    },
    {
      id: 4,
      title: 'Autenticación y Autorización',
      description: 'Implementa sistemas seguros de autenticación en tu aplicación',
      category: 'security',
      difficulty: 'intermediate',
      readTime: '12 min',
      tags: ['auth', 'security', 'jwt']
    },
    {
      id: 5,
      title: 'Despliegue en Producción',
      description: 'Mejores prácticas para desplegar tu aplicación en producción',
      category: 'deployment',
      difficulty: 'advanced',
      readTime: '20 min',
      tags: ['deployment', 'production', 'ci-cd']
    },
    {
      id: 6,
      title: 'Optimización de Performance',
      description: 'Técnicas avanzadas para optimizar el rendimiento de tu aplicación',
      category: 'advanced',
      difficulty: 'advanced',
      readTime: '18 min',
      tags: ['performance', 'optimization', 'monitoring']
    }
  ]

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) {
    return (
      <div className="docs-loading">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">Cargando documentación...</p>
      </div>
    )
  }

  return (
    <div className="docs-container">
      {/* Hero Section */}
      <section className="docs-hero">
        <div className="hero-background">
          <div className="floating-shapes">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`floating-shape shape-${i % 4}`} />
            ))}
          </div>
        </div>
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            <span className="title-gradient">Documentación</span>
            <span className="title-neon">TickBase</span>
          </h1>
          <p className="hero-description">
            Explora nuestra documentación completa y construye el futuro del ticketing NFT
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">24</span>
              <span className="stat-label">Guías</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">APIs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Niveles</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Search and Filters */}
      <section className="docs-search-section">
        <div className="search-container">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar en la documentación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <Filter className="filter-icon" />
          </div>
          
          <div className="category-filters">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="category-icon" />
                <span className="category-name">{category.name}</span>
                <span className="category-count">{category.count}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Grid */}
      <section className="docs-grid-section">
        <div className="docs-grid">
          {filteredDocs.map((doc, index) => (
            <motion.article
              key={doc.id}
              className={`doc-card ${doc.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {doc.featured && (
                <div className="featured-badge">
                  <Star className="star-icon" />
                  Destacado
                </div>
              )}
              
              <div className="doc-header">
                <div className="doc-category">
                  <span className={`category-tag ${doc.category}`}>
                    {categories.find(c => c.id === doc.category)?.name}
                  </span>
                  <span className={`difficulty-badge ${doc.difficulty}`}>
                    {doc.difficulty === 'beginner' ? 'Principiante' : 
                     doc.difficulty === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                  </span>
                </div>
                <div className="doc-actions">
                  <button className="action-btn bookmark-btn">
                    <Bookmark className="action-icon" />
                  </button>
                  <button className="action-btn share-btn">
                    <Share2 className="action-icon" />
                  </button>
                </div>
              </div>

              <div className="doc-content">
                <h3 className="doc-title">{doc.title}</h3>
                <p className="doc-description">{doc.description}</p>
                
                <div className="doc-tags">
                  {doc.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="doc-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="doc-footer">
                <div className="doc-meta">
                  <span className="read-time">
                    <BookOpen className="meta-icon" />
                    {doc.readTime}
                  </span>
                </div>
                <button className="read-more-btn">
                  Leer más
                  <ChevronRight className="btn-icon" />
                </button>
              </div>

              <div className="card-glow"></div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <div className="quick-actions">
          <motion.div 
            className="quick-action-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="action-icon-wrapper">
              <Rocket className="action-icon-large" />
            </div>
            <h3>Primeros Pasos</h3>
            <p>Comienza tu viaje con TickBase</p>
            <button className="action-btn-primary">
              Empezar
              <ChevronRight className="btn-icon" />
            </button>
          </motion.div>

          <motion.div 
            className="quick-action-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="action-icon-wrapper">
              <Code className="action-icon-large" />
            </div>
            <h3>API Reference</h3>
            <p>Documentación completa de la API</p>
            <button className="action-btn-primary">
              Explorar
              <ExternalLink className="btn-icon" />
            </button>
          </motion.div>

          <motion.div 
            className="quick-action-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="action-icon-wrapper">
              <Zap className="action-icon-large" />
            </div>
            <h3>Ejemplos</h3>
            <p>Casos de uso y ejemplos prácticos</p>
            <button className="action-btn-primary">
              Ver ejemplos
              <ChevronRight className="btn-icon" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
