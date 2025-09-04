import { useState, useMemo, useCallback } from 'react'

export interface Event {
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
  featured?: boolean
  tags?: string[]
  rating?: number
  eventType?: 'presential' | 'virtual' | 'hybrid'
  distance?: number
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export interface Tag {
  id: string
  name: string
  icon: string
  color: string
}

export function useEvents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1])
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Datos de eventos de ejemplo - Memoizados para evitar recreación
  // NOTA: Estos son eventos de demostración. En producción, usar eventos reales del contrato
  const demoEvents = useMemo(() => [
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
      totalTickets: 500,
      featured: true,
      tags: ['web3', 'blockchain', 'nft', 'defi'],
      rating: 4.8,
      eventType: 'presential',
      distance: 0,
      isDemo: true // Marcar como evento de demostración
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
      totalTickets: 2000,
      tags: ['music', 'festival', 'electronic'],
      rating: 4.6,
      eventType: 'presential',
      distance: 5.2,
      isDemo: true
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
      totalTickets: 300,
      tags: ['nft', 'metaverse', 'art', 'blockchain'],
      rating: 4.7,
      eventType: 'hybrid',
      distance: 12.8,
      isDemo: true
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
      totalTickets: 200,
      tags: ['startup', 'business', 'pitch', 'investment'],
      rating: 4.5,
      eventType: 'presential',
      distance: 8.3,
      isDemo: true
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
      totalTickets: 500,
      tags: ['gaming', 'tournament', 'esports', 'competition'],
      rating: 4.9,
      eventType: 'presential',
      distance: 15.7,
      isDemo: true
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
      totalTickets: 400,
      tags: ['food', 'tech', 'innovation', 'culinary'],
      rating: 4.4,
      eventType: 'hybrid',
      distance: 22.1,
      isDemo: true
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
      totalTickets: 300,
      tags: ['sports', 'nft', 'extreme', 'action'],
      rating: 4.6,
      eventType: 'presential',
      distance: 18.9,
      isDemo: true
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
      totalTickets: 250,
      tags: ['ai', 'machine-learning', 'tech', 'workshop'],
      rating: 4.8,
      eventType: 'hybrid',
      distance: 31.4,
      isDemo: true
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
      totalTickets: 400,
      tags: ['jazz', 'blues', 'music', 'festival'],
      rating: 4.7,
      eventType: 'presential',
      distance: 25.6,
      isDemo: true
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
      totalTickets: 200,
      tags: ['digital-art', 'blockchain', 'nft', 'exhibition'],
      rating: 4.5,
      eventType: 'virtual',
      distance: 0
    },
    {
      id: 11,
      title: "Crypto Trading Workshop",
      description: "Aprende estrategias avanzadas de trading en criptomonedas. Análisis técnico y fundamental.",
      date: "28 Enero 2026",
      time: "10:00 AM - 6:00 PM",
      location: "Centro Financiero, Guadalajara",
      price: "0.18 ETH",
      image: "📈",
      category: "business",
      organizer: "Crypto Academy MX",
      availableTickets: 45,
      totalTickets: 100,
      tags: ['crypto', 'trading', 'defi', 'workshop'],
      rating: 4.9,
      eventType: 'presential',
      distance: 7.8,
      isDemo: true
    },
    {
      id: 12,
      title: "Virtual Reality Gaming Expo",
      description: "Experiencia inmersiva en realidad virtual. Prueba los últimos juegos y tecnologías VR.",
      date: "15 Febrero 2026",
      time: "11:00 AM - 8:00 PM",
      location: "Centro de Innovación VR, Puebla",
      price: "0.13 ETH",
      image: "🥽",
      category: "gaming",
      organizer: "VR Gaming MX",
      availableTickets: 156,
      totalTickets: 300,
      tags: ['vr', 'gaming', 'virtual-reality', 'tech'],
      rating: 4.7,
      eventType: 'hybrid',
      distance: 16.2,
      isDemo: true
    }
  ], [])

  // Usar eventos de demostración por ahora
  // TODO: Integrar con eventos reales del contrato blockchain
  const events = demoEvents

  // Categorías memoizadas
  const categories = useMemo(() => [
    { id: 'all', name: 'Todos', icon: '🎭', color: '#00ffff' },
    { id: 'tech', name: 'Tecnología', icon: '💻', color: '#00ff00' },
    { id: 'music', name: 'Música', icon: '🎵', color: '#ff00ff' },
    { id: 'art', name: 'Arte', icon: '🎨', color: '#ffff00' },
    { id: 'business', name: 'Negocios', icon: '💼', color: '#8000ff' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', color: '#00ff80' },
    { id: 'food', name: 'Gastronomía', icon: '🍕', color: '#ff0080' },
    { id: 'sports', name: 'Deportes', icon: '⚽', color: '#ff8000' }
  ], [])

  // Tags disponibles para filtrado
  const availableTags = useMemo(() => [
    { id: 'nft', name: 'NFT', icon: '🖼️', color: '#00ffff' },
    { id: 'blockchain', name: 'Blockchain', icon: '⛓️', color: '#ff00ff' },
    { id: 'web3', name: 'Web3', icon: '🌐', color: '#ffff00' },
    { id: 'ai', name: 'Inteligencia Artificial', icon: '🤖', color: '#00ff00' },
    { id: 'metaverse', name: 'Metaverso', icon: '🌍', color: '#ff8000' },
    { id: 'defi', name: 'DeFi', icon: '💰', color: '#8000ff' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', color: '#00ff80' },
    { id: 'art', name: 'Arte Digital', icon: '🎨', color: '#ff0080' },
    { id: 'music', name: 'Música', icon: '🎵', color: '#00ffff' },
    { id: 'tech', name: 'Tecnología', icon: '💻', color: '#00ff00' },
    { id: 'startup', name: 'Startup', icon: '🚀', color: '#ff6000' },
    { id: 'workshop', name: 'Workshop', icon: '🔧', color: '#6000ff' },
    { id: 'festival', name: 'Festival', icon: '🎉', color: '#ff0060' },
    { id: 'tournament', name: 'Torneo', icon: '🏆', color: '#00ff60' },
    { id: 'exhibition', name: 'Exposición', icon: '🖼️', color: '#ff6000' },
    { id: 'conference', name: 'Conferencia', icon: '🎤', color: '#6000ff' }
  ], [])

  // Función para extraer precio numérico de string
  const extractPrice = useCallback((priceString: string): number => {
    const match = priceString.match(/(\d+\.?\d*)/)
    return match ? parseFloat(match[1]) : 0
  }, [])

  // Función para parsear fecha
  const parseDate = useCallback((dateString: string): Date => {
    const parts = dateString.split(' ')
    if (parts.length >= 2) {
      const day = parseInt(parts[0])
      const month = parts[1]
      const year = parseInt(parts[2])
      
      const monthMap: { [key: string]: number } = {
        'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
        'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
      }
      
      return new Date(year, monthMap[month] || 0, day)
    }
    return new Date()
  }, [])

  // Filtrado y ordenamiento optimizado con filtros avanzados
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter((event) => {
      // Filtro de búsqueda
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Filtro de categoría
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
      
      // Filtro de rango de precios
      const eventPrice = extractPrice(event.price)
      const minPrice = priceRange[0] * 0.5 // Convertir a ETH
      const maxPrice = priceRange[1] * 0.5
      const matchesPrice = eventPrice >= minPrice && eventPrice <= maxPrice
      
      // Filtro de rango de fechas
      let matchesDate = true
      if (dateRange[0] || dateRange[1]) {
        const eventDate = parseDate(event.date)
        if (dateRange[0] && eventDate < dateRange[0]) matchesDate = false
        if (dateRange[1] && eventDate > dateRange[1]) matchesDate = false
      }
      
      // Filtro de tags
      let matchesTags = true
      if (selectedTags.length > 0) {
        matchesTags = selectedTags.some(tag => event.tags?.includes(tag))
      }
      
      return matchesSearch && matchesCategory && matchesPrice && matchesDate && matchesTags
    })

    // Ordenamiento
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return parseDate(a.date).getTime() - parseDate(b.date).getTime()
        case 'price':
          return extractPrice(a.price) - extractPrice(b.price)
        case 'name':
          return a.title.localeCompare(b.title)
        case 'popularity':
          return (b.totalTickets - b.availableTickets) - (a.totalTickets - a.availableTickets)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'distance':
          return (a.distance || 0) - (b.distance || 0)
        default:
          return 0
      }
    })
  }, [events, searchTerm, selectedCategory, priceRange, dateRange, selectedTags, sortBy, extractPrice, parseDate])

  // Limpiar todos los filtros
  const clearAllFilters = useCallback(() => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSortBy('date')
    setPriceRange([0, 1])
    setDateRange([null, null])
    setSelectedTags([])
    setShowAdvancedFilters(false)
  }, [])

  // Toggle tag
  const toggleTag = useCallback((tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }, [])

  // Obtener color de categoría
  const getCategoryColor = useCallback((categoryId: string) => {
    const category = categories.find((cat: Category) => cat.id === categoryId)
    return category ? category.color : '#00ffff'
  }, [categories])

  // Obtener información de categoría
  const getCategoryInfo = useCallback((categoryId: string) => {
    const category = categories.find((cat: Category) => cat.id === categoryId)
    return category ? { name: category.name, icon: category.icon, color: category.color } : { name: 'Otro', icon: '🎭', color: '#00ffff' }
  }, [categories])

  // Obtener información de tag
  const getTagInfo = useCallback((tagId: string) => {
    const tag = availableTags.find((t: Tag) => t.id === tagId)
    return tag ? { name: tag.name, icon: tag.icon, color: tag.color } : { name: 'Otro', icon: '🏷️', color: '#00ffff' }
  }, [availableTags])

  // Simular búsqueda con loading
  const performSearch = useCallback(async (searchParams: any) => {
    setIsLoading(true)
    // Simular delay de búsqueda
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsLoading(false)
  }, [])

  return {
    events,
    categories,
    availableTags,
    filteredAndSortedEvents,
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
    isLoading,
    clearAllFilters,
    toggleTag,
    getCategoryColor,
    getCategoryInfo,
    getTagInfo,
    performSearch
  }
}
