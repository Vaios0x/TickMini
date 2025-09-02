import { useState, useMemo } from 'react'

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
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export function useEvents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  // Datos de eventos de ejemplo - Memoizados para evitar recreación
  const events = useMemo(() => [
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
      featured: true
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
      totalTickets: 100
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
      totalTickets: 300
    }
  ], [])

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

  // Filtrado y ordenamiento optimizado
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter((event: Event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    return filtered.sort((a: Event, b: Event) => {
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
  }, [events, searchTerm, selectedCategory, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSortBy('date')
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat: Category) => cat.id === categoryId)
    return category ? category.color : '#00ffff'
  }

  const getCategoryInfo = (categoryId: string) => {
    const category = categories.find((cat: Category) => cat.id === categoryId)
    return category ? { name: category.name, icon: category.icon, color: category.color } : { name: 'Otro', icon: '🎭', color: '#00ffff' }
  }

  return {
    events,
    categories,
    filteredAndSortedEvents,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    clearFilters,
    getCategoryColor,
    getCategoryInfo
  }
}
