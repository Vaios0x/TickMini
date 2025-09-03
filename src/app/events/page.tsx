'use client'

import React from 'react'
import { CheckoutModal } from '@/components/modals/checkout-modal'
import Link from 'next/link'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  price: string
  image: string
  category: string
  organizer: string
  availableTickets: number
  totalTickets: number
}

interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [sortBy, setSortBy] = React.useState('date')
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [hoveredEvent, setHoveredEvent] = React.useState<number | null>(null)
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 })
  const [isVisible, setIsVisible] = React.useState(false)

  // Inicialización del componente
  React.useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
    }
    
    // Set initial window size solo en el cliente
    if (typeof window !== 'undefined') {
      handleResize()
      
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  const categories: Category[] = [
    { id: 'all', name: 'Todos', icon: '🎭', color: '#00ffff' },
    { id: 'music', name: 'Música', icon: '🎵', color: '#ff00ff' },
    { id: 'tech', name: 'Tecnología', icon: '💻', color: '#00ff00' },
    { id: 'sports', name: 'Deportes', icon: '⚽', color: '#ffff00' },
    { id: 'art', name: 'Arte', icon: '🎨', color: '#ff8000' },
    { id: 'business', name: 'Negocios', icon: '💼', color: '#8000ff' },
    { id: 'food', name: 'Gastronomía', icon: '🍕', color: '#ff0080' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', color: '#00ff80' }
  ]

  const events: Event[] = [
    {
      id: 1,
      title: "Web3 Summit 2026",
      description: "La conferencia más importante de blockchain y Web3 en Latinoamérica. Networking, workshops y las últimas tendencias.",
      date: "15-17 Marzo 2026",
      time: "9:00 AM - 6:00 PM",
      location: "Centro de Convenciones, CDMX",
      price: "0.15 ETH",
      image: "🚀",
      category: "tech",
      organizer: "Web3 Latam",
      availableTickets: 45,
      totalTickets: 500
    },
    {
      id: 2,
      title: "Festival de Música Electrónica",
      description: "3 días de música electrónica con los mejores DJs internacionales. Experiencia inmersiva con tecnología LED.",
      date: "22-24 Abril 2026",
      time: "4:00 PM - 2:00 AM",
      location: "Parque Metropolitano, Guadalajara",
      price: "0.08 ETH",
      image: "🎵",
      category: "music",
      organizer: "ElectroFest MX",
      availableTickets: 120,
      totalTickets: 2000
    },
    {
      id: 3,
      title: "Expo NFT & Metaverso",
      description: "Explora el futuro del arte digital y los metaversos. Galerías NFT, realidad virtual y networking.",
      date: "8-10 Mayo 2026",
      time: "10:00 AM - 8:00 PM",
      location: "Museo de Arte Moderno, Monterrey",
      price: "0.12 ETH",
      image: "🎨",
      category: "art",
      organizer: "NFT México",
      availableTickets: 78,
      totalTickets: 300
    },
    {
      id: 4,
      title: "Startup Pitch Competition",
      description: "Competencia de startups innovadoras. Presenta tu idea ante inversores y gana hasta $50,000 USD.",
      date: "20 Junio 2026",
      time: "2:00 PM - 8:00 PM",
      location: "Centro de Innovación, Querétaro",
      price: "0.05 ETH",
      image: "💼",
      category: "business",
      organizer: "Innovation Hub MX",
      availableTickets: 95,
      totalTickets: 200
    },
    {
      id: 5,
      title: "Gaming Championship 2026",
      description: "Torneo de videojuegos con premios en ETH. Compite en League of Legends, Valorant y más.",
      date: "12-14 Julio 2026",
      time: "11:00 AM - 10:00 PM",
      location: "Arena Gaming, Puebla",
      price: "0.06 ETH",
      image: "🎮",
      category: "gaming",
      organizer: "Gaming MX",
      availableTickets: 156,
      totalTickets: 500
    },
    {
      id: 6,
      title: "Food & Tech Festival",
      description: "Fusión de gastronomía y tecnología. Robots chefs, comida molecular y experiencias culinarias únicas.",
      date: "25-27 Agosto 2026",
      time: "12:00 PM - 11:00 PM",
      location: "Centro Gastronómico, Oaxaca",
      price: "0.09 ETH",
      image: "🍕",
      category: "food",
      organizer: "FoodTech MX",
      availableTickets: 89,
      totalTickets: 400
    },
    {
      id: 7,
      title: "Deportes Extremos NFT",
      description: "Evento deportivo donde cada acción se convierte en NFT. Skateboarding, BMX y parkour.",
      date: "10 Septiembre 2026",
      time: "1:00 PM - 7:00 PM",
      location: "Parque de Deportes, Tijuana",
      price: "0.07 ETH",
      image: "⚽",
      category: "sports",
      organizer: "Extreme Sports MX",
      availableTickets: 134,
      totalTickets: 300
    },
    {
      id: 8,
      title: "AI & Machine Learning Summit",
      description: "Conferencia sobre inteligencia artificial y machine learning. Workshops prácticos y networking.",
      date: "18-20 Octubre 2026",
      time: "9:00 AM - 6:00 PM",
      location: "Universidad Tecnológica, Mérida",
      price: "0.14 ETH",
      image: "🤖",
      category: "tech",
      organizer: "AI México",
      availableTickets: 67,
      totalTickets: 250
    },
    {
      id: 9,
      title: "Jazz & Blues Festival",
      description: "Festival de jazz y blues con artistas internacionales. Ambiente íntimo y música de calidad.",
      date: "5-7 Noviembre 2026",
      time: "6:00 PM - 12:00 AM",
      location: "Teatro Principal, León",
      price: "0.11 ETH",
      image: "🎷",
      category: "music",
      organizer: "Jazz MX",
      availableTickets: 112,
      totalTickets: 400
    },
    {
      id: 10,
      title: "Arte Digital & Blockchain",
      description: "Exposición de arte digital con tecnología blockchain. Artistas emergentes y obras únicas.",
      date: "15-17 Diciembre 2026",
      time: "11:00 AM - 9:00 PM",
      location: "Galería Digital, Cancún",
      price: "0.10 ETH",
      image: "🖼️",
      category: "art",
      organizer: "Digital Art MX",
      availableTickets: 88,
      totalTickets: 200
    }
  ]

  // Optimized filtering and sorting without useMemo
  const filteredAndSortedEvents = (() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date.split(' ')[0]).getTime() - new Date(b.date.split(' ')[0]).getTime()
        case 'price':
          return parseFloat(a.price.split(' ')[0]) - parseFloat(b.price.split(' ')[0])
        case 'name':
          return a.title.localeCompare(b.title)
        case 'popularity':
          return (b.totalTickets - b.availableTickets) - (a.totalTickets - a.availableTickets)
        default:
          return 0
      }
    })
  })()

  const handleBuyTicket = (event: Event) => {
    setSelectedEvent(event)
    setIsCheckoutOpen(true)
  }

  const getProgressPercentage = (available: number, total: number) => {
    return ((total - available) / total) * 100
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.color : '#00ffff'
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at ${windowSize.width - mousePosition.x}px ${windowSize.height - mousePosition.y}px, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 0, 0.08) 0%, transparent 50%)
        `,
        pointerEvents: 'none',
        transition: 'all 0.1s ease'
      }} />
      
      {/* Animated Grid Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'grid-move 20s linear infinite',
        pointerEvents: 'none'
      }} />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => {
        const left = `${(i * 5.5) % 100}%`
        const top = `${(i * 7.3) % 100}%`
        const animationDuration = `${5 + (i % 5)}s`
        const animationDelay = `${(i % 5)}s`
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left,
              top,
              width: '4px',
              height: '4px',
              background: `hsl(${i * 18}, 100%, 70%)`,
              borderRadius: '50%',
              filter: 'blur(1px)',
              animation: `float-particle ${animationDuration} ease-in-out infinite`,
              animationDelay,
              pointerEvents: 'none'
            }}
          />
        )
      })}

      <div style={{ position: 'relative', zIndex: 1, padding: '2rem 0' }}>
        {/* Hero Section - Completamente Renovado */}
        <div style={{
          textAlign: 'center',
          padding: '5rem 2rem',
          marginBottom: '4rem',
          position: 'relative'
        }}>
          {/* Hero Background */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.08) 0%, rgba(255, 0, 255, 0.08) 50%, rgba(0, 255, 255, 0.08) 100%)',
            backdropFilter: 'blur(30px)',
            borderRadius: '40px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '4rem',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 120px rgba(0, 255, 255, 0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Hero Glow Effects */}
            <div style={{
              position: 'absolute',
              top: '-60%',
              left: '-60%',
              width: '220%',
              height: '220%',
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.08) 0%, transparent 60%)',
              animation: 'pulse 8s ease-in-out infinite'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-60%',
              right: '-60%',
              width: '220%',
              height: '220%',
              background: 'radial-gradient(circle, rgba(255, 0, 255, 0.08) 0%, transparent 60%)',
              animation: 'pulse 8s ease-in-out infinite reverse'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                background: 'linear-gradient(45deg, #00ffff 0%, #ff00ff 25%, #ffff00 50%, #00ff00 75%, #00ffff 100%)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
                fontWeight: '900',
                textShadow: '0 0 50px rgba(0, 255, 255, 0.8)',
                letterSpacing: 'clamp(2px, 1vw, 4px)',
                animation: 'gradient-shift 4s ease-in-out infinite',
                textAlign: 'center',
                lineHeight: '1.2'
              }}>
                🎫 Eventos NFT 2026
              </h1>
              
              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.8rem)',
                color: '#e0e0e0',
                maxWidth: 'clamp(600px, 85vw, 900px)',
                margin: '0 auto clamp(2rem, 5vw, 3rem) auto',
                lineHeight: '1.6',
                fontWeight: '300',
                opacity: '0.9',
                textAlign: 'center'
              }}>
                Descubre los eventos más increíbles del año. Compra tickets NFT únicos y forma parte de experiencias inolvidables en Base Network.
              </p>

              {/* Hero Stats - Rediseñados */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(180px, 25vw, 220px), 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2rem)',
                maxWidth: 'clamp(700px, 90vw, 900px)',
                margin: '0 auto',
                justifyItems: 'center',
                justifyContent: 'center'
              }}>
                {[
                  { icon: '🎭', value: events.length, label: 'Eventos', color: '#00ffff' },
                  { icon: '🎫', value: '3,250', label: 'Tickets Disponibles', color: '#ff00ff' },
                  { icon: '💰', value: '0.97 ETH', label: 'Precio Promedio', color: '#ffff00' }
                ].map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      textAlign: 'center',
                      padding: 'clamp(1.5rem, 3vw, 2rem)',
                      background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                      borderRadius: 'clamp(20px, 4vw, 25px)',
                      border: `1px solid ${stat.color}30`,
                      backdropFilter: 'blur(20px)',
                      boxShadow: `0 10px 30px ${stat.color}20`,
                      transition: 'all 0.4s ease',
                      transform: 'translateY(0)',
                      cursor: 'pointer',
                      width: '100%',
                      maxWidth: 'clamp(180px, 25vw, 220px)',
                      minHeight: 'clamp(160px, 25vw, 200px)'
                    }}
                    onMouseEnter={(e: any) => {
                      e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)'
                      e.currentTarget.style.boxShadow = `0 20px 40px ${stat.color}40`
                    }}
                    onMouseLeave={(e: any) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)'
                      e.currentTarget.style.boxShadow = `0 10px 30px ${stat.color}20`
                    }}
                  >
                    <div style={{
                      fontSize: 'clamp(2.5rem, 5vw, 3rem)',
                      marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                      filter: `drop-shadow(0 0 20px ${stat.color}60)`,
                      animation: 'pulse 3s ease-in-out infinite'
                    }}>
                      {stat.icon}
                    </div>
                    <div style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      color: stat.color,
                      fontWeight: '900',
                      marginBottom: 'clamp(0.4rem, 1vw, 0.5rem)',
                      textShadow: `0 0 20px ${stat.color}50`
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      color: '#d0d0d0',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                      fontWeight: '500'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>

        {/* Search and Filters - Completamente Responsivos */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2rem)',
          marginBottom: 'clamp(2rem, 5vw, 4rem)'
        }}>
          {/* Advanced Search Bar */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.08), rgba(255, 0, 255, 0.08))',
            backdropFilter: 'blur(25px)',
            borderRadius: 'clamp(20px, 5vw, 30px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 100px rgba(0, 255, 255, 0.1)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Search Background Effects */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(0, 255, 255, 0.05) 0%, transparent 70%)',
              animation: 'pulse 6s ease-in-out infinite'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Main Search Input */}
              <div style={{
                position: 'relative',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
              }}>
                <input
                  type="text"
                  placeholder="🔍 Buscar eventos, organizadores, ubicaciones..."
                  value={searchTerm}
                  onChange={(e: any) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'clamp(1rem, 2.5vw, 1.5rem) clamp(1.5rem, 3vw, 2rem)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'clamp(15px, 4vw, 20px)',
                    color: '#ffffff',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(15px)'
                  }}
                  onFocus={(e: any) => {
                    e.target.style.borderColor = 'rgba(0, 255, 255, 0.6)'
                    e.target.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)'
                  }}
                  onBlur={(e: any) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    e.target.style.boxShadow = 'none'
                  }}
                  tabIndex={0}
                  aria-label="Buscar eventos"
                />
                <div style={{
                  position: 'absolute',
                  right: 'clamp(0.8rem, 2vw, 1rem)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  opacity: '0.6'
                }}>
                  ✨
                </div>
              </div>

              {/* Filters Row - Completamente Responsivo */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(180px, 35vw, 220px), 1fr))',
                gap: 'clamp(1rem, 2vw, 1.5rem)',
                alignItems: 'center',
                justifyItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Category Filter */}
                <div style={{ position: 'relative' }}>
                  <select
                    value={selectedCategory}
                    onChange={(e: any) => setSelectedCategory(e.target.value)}
                    style={{
                      padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.2rem, 2.5vw, 1.5rem)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 'clamp(12px, 3vw, 15px)',
                      color: '#ffffff',
                      fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                      outline: 'none',
                      width: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(15px)'
                    }}
                    onFocus={(e: any) => {
                      e.target.style.borderColor = 'rgba(0, 255, 255, 0.6)'
                      e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)'
                    }}
                    onBlur={(e: any) => {
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

                {/* Sort Filter */}
                <div style={{ position: 'relative' }}>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    style={{
                      padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.2rem, 2.5vw, 1.5rem)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: 'clamp(12px, 3vw, 15px)',
                      color: '#ffffff',
                      fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                      outline: 'none',
                      width: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(15px)'
                    }}
                    onFocus={(e: any) => {
                      e.target.style.borderColor = 'rgba(255, 0, 255, 0.6)'
                      e.target.style.boxShadow = '0 0 20px rgba(255, 0, 255, 0.2)'
                    }}
                    onBlur={(e: any) => {
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

                {/* Create Event Button */}
                <Link href="/create-event">
                  <button style={{
                    background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
                    color: '#000000',
                    border: 'none',
                    padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                    borderRadius: 'clamp(15px, 4vw, 20px)',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    fontWeight: '900',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 10px 30px rgba(0, 255, 255, 0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transform: 'translateY(0)',
                    width: '100%',
                    minHeight: 'clamp(45px, 8vw, 55px)'
                  }}
                  onMouseEnter={(e: any) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.6)'
                  }}
                  onMouseLeave={(e: any) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.4)'
                  }}
                  tabIndex={0}
                  aria-label="Crear nuevo evento"
                  >
                    ✨ Crear Evento
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid - Completamente Responsivo */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2rem)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(300px, 80vw, 400px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)'
          }}>
          {filteredAndSortedEvents.map(event => (
              <div
                key={event.id}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  borderRadius: 'clamp(20px, 5vw, 30px)',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  border: `2px solid ${getCategoryColor(event.category)}40`,
                  boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 60px ${getCategoryColor(event.category)}20`,
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transform: hoveredEvent === event.id ? 'translateY(-15px) scale(1.02)' : 'translateY(0) scale(1)',
                  filter: hoveredEvent === event.id ? 'brightness(1.1)' : 'brightness(1)'
                }}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
                tabIndex={0}
                role="button"
                aria-label={`Evento: ${event.title}`}
                onKeyDown={(e: any) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleBuyTicket(event)
                  }
                }}
              >
                {/* Event Background Glow */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '300px',
                  height: '300px',
                  background: `radial-gradient(circle, ${getCategoryColor(event.category)}15 0%, transparent 70%)`,
                  borderRadius: '50%',
                  filter: 'blur(50px)',
                  pointerEvents: 'none',
                  opacity: hoveredEvent === event.id ? '1' : '0.5',
                  transition: 'all 0.5s ease'
                }} />

                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: 'clamp(1rem, 3vw, 1.5rem)',
                  right: 'clamp(1rem, 3vw, 1.5rem)',
                  background: `linear-gradient(135deg, ${getCategoryColor(event.category)}20, ${getCategoryColor(event.category)}10)`,
                  border: `1px solid ${getCategoryColor(event.category)}40`,
                  borderRadius: 'clamp(15px, 4vw, 20px)',
                  padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.8rem, 2vw, 1rem)',
                  fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                  color: getCategoryColor(event.category),
                  fontWeight: '700',
                  backdropFilter: 'blur(10px)',
                  zIndex: 2
                }}>
                  {categories.find(cat => cat.id === event.category)?.icon} {categories.find(cat => cat.id === event.category)?.name}
                </div>

              {/* Event Image */}
              <div style={{
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                textAlign: 'center',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                filter: `drop-shadow(0 0 25px ${getCategoryColor(event.category)}60)`,
                animation: hoveredEvent === event.id ? 'pulse 2s ease-in-out infinite' : 'none',
                transition: 'all 0.3s ease'
              }}>
                {event.image}
              </div>

              {/* Event Title */}
              <h3 style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
                color: '#ffffff',
                marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                fontWeight: '900',
                textAlign: 'center',
                textShadow: `0 0 20px ${getCategoryColor(event.category)}50`,
                lineHeight: '1.3'
              }}>
                {event.title}
              </h3>

              {/* Event Description */}
              <p style={{
                color: '#d0d0d0',
                fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                lineHeight: '1.7',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                textAlign: 'center',
                opacity: '0.9'
              }}>
                {event.description}
              </p>

                {/* Event Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(180px, 35vw, 220px), 1fr))',
                  gap: 'clamp(0.8rem, 2vw, 1rem)',
                  marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                  justifyItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                    color: '#e0e0e0',
                    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                    padding: 'clamp(0.5rem, 1vw, 0.8rem)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    width: '100%',
                    maxWidth: 'clamp(180px, 35vw, 220px)',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>📅</span>
                    <span style={{ wordBreak: 'break-word' }}>{event.date}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                    color: '#e0e0e0',
                    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                    padding: 'clamp(0.5rem, 1vw, 0.8rem)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>🕐</span>
                    <span style={{ wordBreak: 'break-word' }}>{event.time}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                    color: '#e0e0e0',
                    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                    padding: 'clamp(0.5rem, 1vw, 0.8rem)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>📍</span>
                    <span style={{ wordBreak: 'break-word' }}>{event.location}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                    color: '#e0e0e0',
                    fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
                    padding: 'clamp(0.5rem, 1vw, 0.8rem)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'clamp(8px, 2vw, 12px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>👤</span>
                    <span style={{ wordBreak: 'break-word' }}>{event.organizer}</span>
                  </div>
                </div>

                {/* Price Section */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
                  padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                  background: `linear-gradient(135deg, ${getCategoryColor(event.category)}15, ${getCategoryColor(event.category)}05)`,
                  borderRadius: 'clamp(15px, 4vw, 20px)',
                  border: `1px solid ${getCategoryColor(event.category)}30`
                }}>
                  <div style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
                    color: getCategoryColor(event.category),
                    fontWeight: '900',
                    marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)',
                    textShadow: `0 0 25px ${getCategoryColor(event.category)}60`
                  }}>
                    {event.price}
                  </div>
                  <div style={{
                    color: '#b0b0b0',
                    fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                    fontWeight: '500'
                  }}>
                    Precio por Ticket
                  </div>
                </div>

              {/* Ticket Availability */}
              <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  color: '#b0b0b0',
                  fontWeight: '500'
                }}>
                  <span>Tickets Disponibles</span>
                  <span style={{ color: '#ffffff', fontWeight: '700' }}>
                    {event.availableTickets} / {event.totalTickets}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: 'clamp(8px, 2vw, 12px)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 'clamp(4px, 1vw, 6px)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    width: `${getProgressPercentage(event.availableTickets, event.totalTickets)}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${getCategoryColor(event.category)}, ${getCategoryColor(event.category)}80)`,
                    borderRadius: 'clamp(4px, 1vw, 6px)',
                    transition: 'width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: `0 0 20px ${getCategoryColor(event.category)}40`
                  }} />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: 'clamp(0.8rem, 2vw, 1rem)',
                flexDirection: 'row'
              }}>
                <button
                  onClick={() => handleBuyTicket(event)}
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${getCategoryColor(event.category)}, ${getCategoryColor(event.category)}80)`,
                    color: '#000000',
                    border: 'none',
                    padding: 'clamp(1rem, 2.5vw, 1.2rem)',
                    borderRadius: 'clamp(15px, 4vw, 20px)',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                    fontWeight: '900',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: `0 10px 30px ${getCategoryColor(event.category)}40`,
                    transform: 'translateY(0)',
                    minHeight: 'clamp(45px, 8vw, 55px)'
                  }}
                  onMouseEnter={(e: any) => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = `0 15px 40px ${getCategoryColor(event.category)}60`
                  }}
                  onMouseLeave={(e: any) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = `0 10px 30px ${getCategoryColor(event.category)}40`
                  }}
                  tabIndex={0}
                  aria-label={`Comprar ticket para ${event.title}`}
                >
                  🎫 Comprar Ticket
                </button>
                <button style={{
                  padding: 'clamp(1rem, 2.5vw, 1.2rem)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 'clamp(15px, 4vw, 20px)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  backdropFilter: 'blur(15px)',
                  minHeight: 'clamp(45px, 8vw, 55px)',
                  minWidth: 'clamp(45px, 8vw, 55px)'
                }}
                onMouseEnter={(e: any) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
                  e.currentTarget.style.transform = 'scale(1.1)'
                }}
                onMouseLeave={(e: any) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
                tabIndex={0}
                aria-label="Agregar a favoritos"
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      {selectedEvent && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          event={selectedEvent}
        />
      )}

        {/* CSS Animations y Responsive */}
        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { 
              opacity: 0.3;
              transform: scale(1);
            }
            50% { 
              opacity: 0.8;
              transform: scale(1.1);
            }
          }
          
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px);
            }
            50% { 
              transform: translateY(-20px);
            }
          }
          
          @keyframes glow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
            }
            50% { 
              box-shadow: 0 0 40px rgba(0, 255, 255, 0.6);
            }
          }

          @keyframes gradient-shift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes grid-move {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(50px, 50px);
            }
          }

          @keyframes float-particle {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.3;
            }
            50% {
              transform: translateY(-30px) rotate(180deg);
              opacity: 1;
            }
          }

          .gradient-shift {
            animation: gradient-shift 4s ease-in-out infinite;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .events-page {
              padding: 1rem;
            }
            
            .hero-section {
              padding: 2rem 0;
            }
            
            .search-filters {
              padding: 1.5rem;
            }
            
            .events-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
            
            .event-card {
              padding: 1.5rem;
            }
            
            .action-buttons {
              flex-direction: column;
            }
          }
          
          @media (max-width: 480px) {
            .hero-section {
              padding: 1rem 0;
            }
            
            .search-filters {
              padding: 1rem;
            }
            
            .event-details {
              grid-template-columns: 1fr;
            }
            
            .price-section {
              padding: 1rem;
            }
          }
          
          /* Accessibility */
          .event-card:focus,
          .search-input:focus,
          .filter-select:focus,
          .action-button:focus {
            outline: 2px solid #00ffff;
            outline-offset: 2px;
          }
          
          /* Smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
          
          /* Performance optimizations */
          .events-page {
            will-change: transform;
          }
          
          .event-card {
            will-change: transform, opacity;
          }
        `}</style>
      </div>
    </div>
  )
}
