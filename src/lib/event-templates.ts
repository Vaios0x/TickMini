// Plantillas de eventos para TickBase
// Fechas de diciembre 2025 en adelante

export interface EventTemplate {
  id: string
  name: string
  description: string
  category: string
  organizer: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  location: string
  address: string
  city: string
  country: string
  ticketTypes: Array<{
    name: string
    description: string
    price: number
    quantity: number
    benefits: string[]
  }>
  blockchain: string
  royaltyPercentage: number
}

export const eventTemplates: EventTemplate[] = [
  {
    id: 'tech-conference-2025',
    name: 'TechConf 2025 - Future of Blockchain',
    description: 'La conferencia más importante de tecnología blockchain en México. Únete a los líderes de la industria para discutir el futuro de Web3, DeFi, NFTs y la adopción masiva de blockchain. Incluye workshops prácticos, networking y presentaciones de los proyectos más innovadores.',
    category: 'tech',
    organizer: 'Blockchain México',
    startDate: '2025-12-15',
    endDate: '2025-12-15',
    startTime: '09:00',
    endTime: '18:00',
    location: 'Centro de Convenciones CDMX',
    address: 'Av. Insurgentes Sur 1234, Col. Del Valle',
    city: 'Ciudad de México',
    country: 'México',
    ticketTypes: [
      {
        name: 'Early Bird',
        description: 'Acceso completo con descuento especial',
        price: 0.1,
        quantity: 50,
        benefits: ['Acceso completo', 'Coffee break', 'Certificado digital NFT', 'Networking lunch']
      },
      {
        name: 'General',
        description: 'Acceso estándar al evento',
        price: 0.15,
        quantity: 200,
        benefits: ['Acceso completo', 'Coffee break', 'Certificado digital NFT']
      },
      {
        name: 'VIP',
        description: 'Experiencia premium con beneficios exclusivos',
        price: 0.3,
        quantity: 30,
        benefits: ['Acceso completo', 'Coffee break premium', 'Certificado digital NFT', 'Networking lunch', 'Meet & Greet con speakers', 'Goodie bag exclusivo']
      }
    ],
    blockchain: 'base',
    royaltyPercentage: 5
  },
  {
    id: 'music-festival-2025',
    name: 'NeonFest 2025 - Electronic Music Festival',
    description: 'El festival de música electrónica más grande de Latinoamérica. 3 días de música, arte digital y tecnología. Incluye DJs internacionales, instalaciones de arte NFT, zona gaming y experiencias inmersivas con realidad virtual.',
    category: 'music',
    organizer: 'Neon Entertainment',
    startDate: '2025-12-28',
    endDate: '2025-12-30',
    startTime: '16:00',
    endTime: '02:00',
    location: 'Foro Sol',
    address: 'Av. Viaducto Río de la Piedad 200, Granjas México',
    city: 'Ciudad de México',
    country: 'México',
    ticketTypes: [
      {
        name: 'General',
        description: 'Acceso general al festival',
        price: 0.08,
        quantity: 500,
        benefits: ['Acceso a todas las áreas', 'Mapa digital NFT', 'Playlist exclusiva NFT']
      },
      {
        name: 'VIP',
        description: 'Experiencia premium con área exclusiva',
        price: 0.2,
        quantity: 100,
        benefits: ['Acceso VIP', 'Área exclusiva', 'Open bar', 'Meet & Greet con artistas', 'Merchandise exclusivo NFT']
      },
      {
        name: 'Backstage',
        description: 'Acceso completo incluyendo backstage',
        price: 0.5,
        quantity: 20,
        benefits: ['Acceso completo', 'Backstage access', 'Meet & Greet con artistas', 'Merchandise exclusivo NFT', 'Experiencia de grabación NFT']
      }
    ],
    blockchain: 'base',
    royaltyPercentage: 7
  },
  {
    id: 'art-exhibition-2025',
    name: 'Digital Art Revolution 2025',
    description: 'Exposición de arte digital y NFT más innovadora del país. Presenta obras de artistas emergentes y consagrados, instalaciones interactivas, realidad aumentada y experiencias inmersivas. Incluye subasta de NFTs y workshops de creación digital.',
    category: 'art',
    organizer: 'Museo de Arte Digital',
    startDate: '2026-01-10',
    endDate: '2026-01-25',
    startTime: '10:00',
    endTime: '20:00',
    location: 'Museo de Arte Moderno',
    address: 'Paseo de la Reforma y Gandhi s/n, Bosque de Chapultepec',
    city: 'Ciudad de México',
    country: 'México',
    ticketTypes: [
      {
        name: 'Estudiante',
        description: 'Descuento especial para estudiantes',
        price: 0.02,
        quantity: 100,
        benefits: ['Acceso a la exposición', 'Guía digital NFT', 'Workshop de arte digital']
      },
      {
        name: 'General',
        description: 'Acceso estándar a la exposición',
        price: 0.05,
        quantity: 300,
        benefits: ['Acceso a la exposición', 'Guía digital NFT', 'Catálogo digital NFT']
      },
      {
        name: 'Premium',
        description: 'Experiencia completa con beneficios exclusivos',
        price: 0.15,
        quantity: 50,
        benefits: ['Acceso VIP', 'Tour privado', 'Workshop de arte digital', 'Subasta de NFTs', 'Merchandise exclusivo NFT']
      }
    ],
    blockchain: 'base',
    royaltyPercentage: 10
  },
  {
    id: 'business-summit-2025',
    name: 'Web3 Business Summit 2025',
    description: 'Cumbre empresarial enfocada en la adopción de Web3 en empresas tradicionales. Incluye casos de estudio, implementación de blockchain, estrategias de tokenización y networking con líderes empresariales. Perfecto para CEOs, CTOs y emprendedores.',
    category: 'business',
    organizer: 'Web3 Business México',
    startDate: '2026-01-20',
    endDate: '2026-01-20',
    startTime: '08:00',
    endTime: '17:00',
    location: 'Hotel Camino Real Polanco',
    address: 'Mariano Escobedo 700, Anzures',
    city: 'Ciudad de México',
    country: 'México',
    ticketTypes: [
      {
        name: 'Estudiante',
        description: 'Descuento especial para estudiantes',
        price: 0.05,
        quantity: 30,
        benefits: ['Acceso completo', 'Material digital NFT', 'Networking lunch']
      },
      {
        name: 'Profesional',
        description: 'Acceso estándar para profesionales',
        price: 0.1,
        quantity: 150,
        benefits: ['Acceso completo', 'Material digital NFT', 'Networking lunch', 'Certificado de participación NFT']
      },
      {
        name: 'Ejecutivo',
        description: 'Experiencia premium para ejecutivos',
        price: 0.25,
        quantity: 50,
        benefits: ['Acceso VIP', 'Networking dinner', 'Sesiones privadas', 'Certificado de participación NFT', 'Consultoría personalizada NFT']
      }
    ],
    blockchain: 'base',
    royaltyPercentage: 5
  },
  {
    id: 'gaming-tournament-2025',
    name: 'Crypto Gaming Championship 2025',
    description: 'El torneo de gaming más grande de México con premios en criptomonedas. Incluye competencias de los juegos más populares, zona de gaming libre, realidad virtual, y presentación de los últimos juegos blockchain. Premios totales de $10,000 USD en criptomonedas.',
    category: 'gaming',
    organizer: 'Crypto Gaming México',
    startDate: '2026-02-14',
    endDate: '2026-02-16',
    startTime: '10:00',
    endTime: '22:00',
    location: 'Centro Banamex',
    address: 'Av. del Conscripto 311, Lomas de Sotelo',
    city: 'Ciudad de México',
    country: 'México',
    ticketTypes: [
      {
        name: 'Espectador',
        description: 'Acceso para ver las competencias',
        price: 0.03,
        quantity: 200,
        benefits: ['Acceso a todas las áreas', 'Streaming en vivo NFT', 'Merchandise digital NFT']
      },
      {
        name: 'Competidor',
        description: 'Participación en torneos',
        price: 0.08,
        quantity: 100,
        benefits: ['Participación en torneos', 'Equipamiento gaming', 'Streaming en vivo NFT', 'Posibilidad de premios']
      },
      {
        name: 'VIP Gaming',
        description: 'Experiencia premium con equipamiento exclusivo',
        price: 0.2,
        quantity: 30,
        benefits: ['Área VIP gaming', 'Equipamiento premium', 'Coaching personalizado', 'Merchandise exclusivo NFT', 'Acceso a beta testing']
      }
    ],
    blockchain: 'base',
    royaltyPercentage: 8
  },
  {
    id: 'food-festival-2025',
    name: 'NFT Culinary Experience 2025',
    description: 'Festival gastronómico único que combina cocina tradicional mexicana con tecnología blockchain. Incluye degustaciones, masterclasses de chefs reconocidos, subasta de recetas como NFTs, y experiencias culinarias inmersivas con realidad aumentada.',
    category: 'food',
    organizer: 'Culinary NFT México',
    startDate: '2026-03-15',
    endDate: '2026-03-17',
    startTime: '12:00',
    endTime: '22:00',
    location: 'Parque Chapultepec',
    address: 'Bosque de Chapultepec I Secc, Miguel Hidalgo',
    city: 'Ciudad de México',
    country: 'México',
    ticketTypes: [
      {
        name: 'Degustación',
        description: 'Acceso a degustaciones y food trucks',
        price: 0.04,
        quantity: 300,
        benefits: ['Degustaciones ilimitadas', 'Recetas digitales NFT', 'Mapa gastronómico NFT']
      },
      {
        name: 'Masterclass',
        description: 'Incluye clases de cocina con chefs',
        price: 0.1,
        quantity: 80,
        benefits: ['Degustaciones ilimitadas', 'Masterclass de cocina', 'Recetas digitales NFT', 'Certificado de chef NFT']
      },
      {
        name: 'Chef Experience',
        description: 'Experiencia completa con chefs reconocidos',
        price: 0.3,
        quantity: 20,
        benefits: ['Experiencia VIP', 'Cooking session privada', 'Recetas exclusivas NFT', 'Merchandise exclusivo NFT', 'Subasta de recetas NFT']
      }
    ],
    blockchain: 'base',
    royaltyPercentage: 12
  },
  {
    id: 'sports-event-2025',
    name: 'Blockchain Sports Championship 2025',
    description: 'Competencia deportiva única que integra tecnología blockchain en el deporte. Incluye competencias de fútbol, basquetbol, y deportes electrónicos con premios en NFTs, estadísticas en blockchain, y experiencias de realidad aumentada durante los juegos.',
    category: 'sports',
    organizer: 'Blockchain Sports México',
    startDate: '2026-04-10',
    endDate: '2026-04-12',
    startTime: '09:00',
    endTime: '21:00',
    location: 'Estadio Azteca',
    address: 'Calz. de Tlalpan 3465, Coyoacán',
    city: 'Ciudad de México',
    country: 'México',
    ticketTypes: [
      {
        name: 'General',
        description: 'Acceso general a todas las competencias',
        price: 0.06,
        quantity: 500,
        benefits: ['Acceso a todas las competencias', 'Estadísticas en tiempo real NFT', 'Merchandise digital NFT']
      },
      {
        name: 'Premium',
        description: 'Asientos preferenciales con beneficios',
        price: 0.15,
        quantity: 100,
        benefits: ['Asientos preferenciales', 'Área VIP', 'Estadísticas exclusivas NFT', 'Meet & Greet con atletas']
      },
      {
        name: 'VIP Experience',
        description: 'Experiencia completa con acceso backstage',
        price: 0.4,
        quantity: 25,
        benefits: ['Acceso backstage', 'Meet & Greet con atletas', 'Estadísticas exclusivas NFT', 'Merchandise exclusivo NFT', 'Experiencia de entrenamiento NFT']
      }
    ],
    blockchain: 'base',
    royaltyPercentage: 6
  },
  {
    id: 'education-course-2025',
    name: 'Web3 Masterclass 2025 - Complete Course',
    description: 'Curso completo de 3 días sobre Web3, blockchain y desarrollo de dApps. Incluye teoría, práctica, proyectos reales, y certificación NFT. Perfecto para desarrolladores, emprendedores y profesionales que quieren dominar la tecnología blockchain.',
    category: 'education',
    organizer: 'Web3 Academy México',
    startDate: '2026-05-05',
    endDate: '2026-05-07',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Centro de Innovación Tecnológica',
    address: 'Av. Insurgentes Sur 1642, San José Insurgentes',
    city: 'Ciudad de México',
    country: 'México',
    ticketTypes: [
      {
        name: 'Estudiante',
        description: 'Descuento especial para estudiantes',
        price: 0.05,
        quantity: 50,
        benefits: ['Acceso completo al curso', 'Material digital NFT', 'Certificación NFT', 'Proyecto final NFT']
      },
      {
        name: 'Profesional',
        description: 'Acceso estándar para profesionales',
        price: 0.12,
        quantity: 80,
        benefits: ['Acceso completo al curso', 'Material digital NFT', 'Certificación NFT', 'Proyecto final NFT', 'Networking lunch']
      },
      {
        name: 'Enterprise',
        description: 'Experiencia premium para empresas',
        price: 0.3,
        quantity: 20,
        benefits: ['Acceso completo al curso', 'Material digital NFT', 'Certificación NFT', 'Proyecto final NFT', 'Consultoría personalizada NFT', 'Sesiones privadas']
      }
    ],
    blockchain: 'base',
    royaltyPercentage: 15
  }
]

// Función para obtener una plantilla por ID
export const getTemplateById = (id: string): EventTemplate | undefined => {
  return eventTemplates.find(template => template.id === id)
}

// Función para obtener plantillas por categoría
export const getTemplatesByCategory = (category: string): EventTemplate[] => {
  return eventTemplates.filter(template => template.category === category)
}

// Función para obtener todas las categorías disponibles
export const getAvailableCategories = (): string[] => {
  const categories = eventTemplates.map(template => template.category)
  return Array.from(new Set(categories))
}
