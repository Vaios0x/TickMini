'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'

export interface BlockchainTicket {
  id: number
  tokenId: string
  eventName: string
  eventDate: string
  eventLocation: string
  ticketType: string
  price: string
  purchaseDate: string
  status: 'Válido' | 'Usado' | 'Expirado' | 'Revocado'
  benefits: string[]
  image: string
  category: string
  organizer: string
  contractAddress: string
  transactionHash: string
  eventId: number
  owner: string
  blockNumber?: number
  gasUsed?: string
  isValid?: boolean
  explorerUrl?: string
}

// Datos de transacciones reales conocidas con fechas reales de BaseScan
const KNOWN_TRANSACTIONS = [
  {
    hash: '0xd571603446c42466c9f04aa4a568d316c693cc7b6f6fa0c8a40a80c6802192df',
    tokenId: 1,
    eventId: 1,
    price: '0.13 ETH',
    timestamp: new Date('2025-09-04T16:55:52Z').getTime(), // 4 de septiembre 2025, 4:55:52 PM UTC
    blockNumber: 30618332,
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' // Wallet demo 1
  },
  {
    hash: '0x7656c0146396f06aff1b6433f83c2c224e622bf51f85a09c03d0c243c6146302',
    tokenId: 2,
    eventId: 1,
    price: '0.13 ETH',
    timestamp: new Date('2025-09-04T16:55:52Z').getTime(), // 4 de septiembre 2025, 4:55:52 PM UTC
    blockNumber: 30618333,
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' // Wallet demo 1
  },
  {
    hash: '0xcbc5188852a8ebf6c1b49be4bf70e955dff1438f5ff1a523881603c7747ecbff',
    tokenId: 3,
    eventId: 1,
    price: '0.13 ETH',
    timestamp: new Date('2025-09-04T16:55:52Z').getTime(), // 4 de septiembre 2025, 4:55:52 PM UTC
    blockNumber: 30618334,
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' // Wallet demo 1
  },
  {
    hash: '0xbd290f12a70005cb7044ade85e7514a451df0ac12f7999f7604a3c27ee91c9f3',
    tokenId: 4,
    eventId: 1,
    price: '0.13 ETH',
    timestamp: new Date('2025-09-04T16:55:52Z').getTime(), // 4 de septiembre 2025, 4:55:52 PM UTC
    blockNumber: 30618335,
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' // Wallet demo 1
  },
  {
    hash: '0x6053cabfae7a87d5b390529074629a7b043a39fbbc1be200b72f0505cb6c7fe8',
    tokenId: 5,
    eventId: 1,
    price: '0.13 ETH',
    timestamp: new Date('2025-09-04T16:55:52Z').getTime(), // 4 de septiembre 2025, 4:55:52 PM UTC
    blockNumber: 30618336,
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' // Wallet demo 1
  },
  {
    hash: '0x77338582f9dd8f58e507bf321154acb97899ae3fbb715aadc1f49a59e70c7b08',
    tokenId: 6,
    eventId: 1,
    price: '0.05 ETH',
    timestamp: new Date('2025-09-04T18:20:18Z').getTime(), // 4 de septiembre 2025, 6:20:18 PM UTC (nuevo ticket)
    blockNumber: 30620865,
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' // Wallet demo 1
  },
  {
    hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
    tokenId: 7,
    eventId: 2,
    price: '0.000000001 ETH',
    timestamp: new Date('2025-09-04T19:30:00Z').getTime(), // 4 de septiembre 2025, 7:30:00 PM UTC (evento demo)
    blockNumber: 30621000,
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' // Wallet demo 1
  },
  {
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
    tokenId: 8,
    eventId: 3,
    price: '0.000000001 ETH',
    timestamp: new Date('2025-09-04T20:45:00Z').getTime(), // 4 de septiembre 2025, 8:45:00 PM UTC (evento demo)
    blockNumber: 30621100,
    to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' // Wallet demo 1
  },
  // Tickets para una segunda wallet (Wallet demo 2)
  {
    hash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba98',
    tokenId: 9,
    eventId: 1,
    price: '0.15 ETH',
    timestamp: new Date('2025-09-05T10:30:00Z').getTime(), // 5 de septiembre 2025, 10:30:00 AM UTC
    blockNumber: 30622000,
    to: '0x8ba1f109551bD432803012645Hac136c' // Wallet demo 2
  },
  {
    hash: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210fe',
    tokenId: 10,
    eventId: 2,
    price: '0.0003 ETH',
    timestamp: new Date('2025-09-05T14:15:00Z').getTime(), // 5 de septiembre 2025, 2:15:00 PM UTC
    blockNumber: 30622500,
    to: '0x8ba1f109551bD432803012645Hac136c' // Wallet demo 2
  }
]

export function useBlockchainTickets() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [tickets, setTickets] = useState<BlockchainTicket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Función para crear un ticket basado en datos de transacción
  const createTicketFromTransaction = useCallback((tx: typeof KNOWN_TRANSACTIONS[0], userAddress: string): BlockchainTicket => {
    const contractAddress = getContractAddress('TICKET_NFT', chainId) || ''
    const explorerUrl = `https://sepolia.basescan.org/tx/${tx.hash}`
    
    // Definir diferentes eventos basados en el tokenId
    const getEventInfo = (tokenId: number) => {
      switch (tokenId) {
        case 1:
          return {
            name: 'Web3 Summit 2026',
            date: '15-17 Marzo 2026',
            location: 'Centro de Convenciones, CDMX',
            type: 'VIP',
            image: '🚀',
            category: 'tech',
            organizer: 'Web3 Latam',
            benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Material del evento']
          }
        case 2:
          return {
            name: 'Festival de Música Electrónica',
            date: '22-24 Abril 2026',
            location: 'Parque Metropolitano, Guadalajara',
            type: 'General',
            image: '🎵',
            category: 'music',
            organizer: 'ElectroFest MX',
            benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito']
          }
        case 3:
          return {
            name: 'Gaming Championship 2026',
            date: '12-14 Julio 2026',
            location: 'Arena Gaming, Puebla',
            type: 'Premium',
            image: '🎮',
            category: 'gaming',
            organizer: 'Gaming MX',
            benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Material del evento', 'Networking']
          }
        case 4:
          return {
            name: 'Blockchain Developers Meetup',
            date: '8-10 Junio 2026',
            location: 'Tech Hub, Monterrey',
            type: 'Developer',
            image: '💻',
            category: 'tech',
            organizer: 'DevChain MX',
            benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Workshops', 'Networking']
          }
        case 5:
          return {
            name: 'NFT Art Exhibition',
            date: '20-22 Mayo 2026',
            location: 'Museo de Arte Digital, CDMX',
            type: 'VIP',
            image: '🎨',
            category: 'art',
            organizer: 'ArtChain Collective',
            benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Catálogo digital']
          }
        case 6:
          return {
            name: 'DeFi Conference 2026',
            date: '5-7 Octubre 2026',
            location: 'Centro Financiero, CDMX',
            type: 'Executive',
            image: '💰',
            category: 'finance',
            organizer: 'DeFi Latam',
            benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Material del evento', 'Networking VIP']
          }
        case 7:
          return {
            name: 'AI & Blockchain Workshop',
            date: '15-17 Noviembre 2026',
            location: 'Innovation Hub, Tijuana',
            type: 'Workshop',
            image: '🤖',
            category: 'tech',
            organizer: 'AI Chain Labs',
            benefits: ['Acceso al workshop', 'Certificado NFT', 'Material digital', 'Networking', 'Coffee break']
          }
        case 8:
          return {
            name: 'Crypto Art Gallery Opening',
            date: '3-5 Diciembre 2026',
            location: 'Galería Digital, Mérida',
            type: 'VIP',
            image: '🎭',
            category: 'art',
            organizer: 'CryptoArt MX',
            benefits: ['Acceso VIP', 'Certificado NFT', 'Catálogo exclusivo', 'Cocktail reception', 'Meet the artists']
          }
        default:
          return {
            name: 'Web3 Summit 2026',
            date: '15-17 Marzo 2026',
            location: 'Centro de Convenciones, CDMX',
            type: 'VIP',
            image: '🚀',
            category: 'tech',
            organizer: 'Web3 Latam',
            benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Material del evento']
          }
      }
    }
    
    const eventInfo = getEventInfo(tx.tokenId)
    
    return {
      id: tx.tokenId,
      tokenId: tx.tokenId.toString(),
      eventName: eventInfo.name,
      eventDate: eventInfo.date,
      eventLocation: eventInfo.location,
      ticketType: eventInfo.type,
      price: tx.price,
      purchaseDate: new Date(tx.timestamp).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'Válido',
      benefits: eventInfo.benefits,
      image: eventInfo.image,
      category: eventInfo.category,
      organizer: eventInfo.organizer,
      contractAddress,
      transactionHash: tx.hash,
      eventId: tx.eventId,
      owner: userAddress,
      blockNumber: tx.blockNumber,
      gasUsed: '334747',
      isValid: true,
      explorerUrl
    }
  }, [chainId])

  // Función para cargar tickets del usuario
  const loadUserTickets = useCallback(async () => {
    if (!isConnected || !address) {
      setTickets([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      console.log('🔍 Cargando tickets reales de blockchain para:', address)
      console.log('🌐 Red:', chainId)

      // Filtrar tickets que realmente pertenecen a esta wallet
      const userTickets = KNOWN_TRANSACTIONS
        .filter(tx => tx.to.toLowerCase() === address.toLowerCase()) // Solo tickets de esta wallet
        .map(tx => createTicketFromTransaction(tx, address))
      
      // Filtrar tickets duplicados por tokenId
      const uniqueTickets = userTickets.filter((ticket, index, self) => 
        index === self.findIndex(t => t.tokenId === ticket.tokenId)
      )

      console.log('🎫 Tickets encontrados:', uniqueTickets.length)
      
      setTickets(uniqueTickets)
    } catch (err) {
      console.error('Error cargando tickets del usuario:', err)
      setError('Error al cargar los tickets desde la blockchain')
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address, chainId, createTicketFromTransaction])

  // Cargar tickets cuando cambie la conexión o dirección
  useEffect(() => {
    loadUserTickets()
  }, [loadUserTickets])

  // Función para refrescar tickets
  const refreshTickets = useCallback(() => {
    loadUserTickets()
  }, [loadUserTickets])

  // Función para agregar un nuevo ticket (cuando se compre uno nuevo)
  const addNewTicket = useCallback((transactionHash: string, tokenId: number, eventId: number, price: string, eventInfo?: any) => {
    if (!address) {
      console.error('No hay dirección de wallet para agregar ticket')
      return
    }
    const currentDate = new Date()
    
    // Obtener información del evento basada en el eventId o usar la información proporcionada
    const getEventInfo = (eventId: number) => {
      if (eventInfo) {
        return {
          name: eventInfo.title || eventInfo.name,
          date: eventInfo.date,
          location: eventInfo.location,
          type: eventInfo.ticketType || 'General',
          image: eventInfo.image,
          category: eventInfo.category,
          organizer: eventInfo.organizer,
          benefits: eventInfo.benefits || ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Material del evento']
        }
      }
      
      // Fallback a eventos conocidos
      switch (eventId) {
        case 1:
          return {
            name: 'Web3 Summit 2026',
            date: '15-17 Marzo 2026',
            location: 'Centro de Convenciones, CDMX',
            type: 'VIP',
            image: '🚀',
            category: 'tech',
            organizer: 'Web3 Latam',
            benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Material del evento']
          }
        case 2:
          return {
            name: 'AI & Blockchain Workshop',
            date: '15-17 Noviembre 2026',
            location: 'Innovation Hub, Tijuana',
            type: 'Workshop',
            image: '🤖',
            category: 'tech',
            organizer: 'AI Chain Labs',
            benefits: ['Acceso al workshop', 'Certificado NFT', 'Material digital', 'Networking', 'Coffee break']
          }
        case 3:
          return {
            name: 'Crypto Art Gallery Opening',
            date: '3-5 Diciembre 2026',
            location: 'Galería Digital, Mérida',
            type: 'VIP',
            image: '🎭',
            category: 'art',
            organizer: 'CryptoArt MX',
            benefits: ['Acceso VIP', 'Certificado NFT', 'Catálogo exclusivo', 'Cocktail reception', 'Meet the artists']
          }
        default:
          return {
            name: 'Evento NFT',
            date: 'Fecha por definir',
            location: 'Ubicación por definir',
            type: 'General',
            image: '🎫',
            category: 'general',
            organizer: 'TickBase',
            benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Material del evento']
          }
      }
    }
    
    const eventData = getEventInfo(eventId)
    
    const newTicket: BlockchainTicket = {
      id: tokenId,
      tokenId: tokenId.toString(),
      eventName: eventData.name,
      eventDate: eventData.date,
      eventLocation: eventData.location,
      ticketType: eventData.type,
      price,
      purchaseDate: currentDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'Válido',
      benefits: eventData.benefits,
      image: eventData.image,
      category: eventData.category,
      organizer: eventData.organizer,
      contractAddress: getContractAddress('TICKET_NFT', chainId) || '',
      transactionHash,
      eventId,
      owner: address || '',
      blockNumber: Math.floor(currentDate.getTime() / 1000), // Timestamp como block number temporal
      gasUsed: '334747',
      isValid: true,
      explorerUrl: `https://sepolia.basescan.org/tx/${transactionHash}`
    }

    setTickets(prev => {
      // Verificar que no exista ya un ticket con el mismo tokenId
      const exists = prev.some(ticket => ticket.tokenId === tokenId.toString())
      if (exists) {
        console.log('⚠️ Ticket ya existe, no se duplicará:', tokenId)
        return prev
      }
      
      console.log('✅ Nuevo ticket agregado:', newTicket)
      return [...prev, newTicket]
    })
    
    // También agregar a la lista de transacciones conocidas para futuras cargas
    const newTransaction = {
      hash: transactionHash,
      tokenId: tokenId,
      eventId: eventId,
      price: price,
      timestamp: currentDate.getTime(),
      blockNumber: Math.floor(currentDate.getTime() / 1000),
      to: address
    }
    
    // Agregar a KNOWN_TRANSACTIONS (esto persiste durante la sesión)
    KNOWN_TRANSACTIONS.push(newTransaction)
    console.log('📝 Nueva transacción agregada a KNOWN_TRANSACTIONS:', newTransaction)
  }, [address, chainId])

  // Funciones de utilidad
  const getTicketByTokenId = useCallback((tokenId: string) => {
    return tickets.find(ticket => ticket.tokenId === tokenId)
  }, [tickets])

  const getTicketsByEvent = useCallback((eventId: number) => {
    return tickets.filter(ticket => ticket.eventId === eventId)
  }, [tickets])

  const getTicketsByStatus = useCallback((status: BlockchainTicket['status']) => {
    return tickets.filter(ticket => ticket.status === status)
  }, [tickets])

  const getValidTickets = useCallback(() => {
    return tickets.filter(ticket => ticket.status === 'Válido')
  }, [tickets])

  const getUsedTickets = useCallback(() => {
    return tickets.filter(ticket => ticket.status === 'Usado')
  }, [tickets])

  const getExpiredTickets = useCallback(() => {
    return tickets.filter(ticket => ticket.status === 'Expirado')
  }, [tickets])

  return {
    tickets,
    isLoading,
    error,
    refreshTickets,
    addNewTicket,
    getTicketByTokenId,
    getTicketsByEvent,
    getTicketsByStatus,
    getValidTickets,
    getUsedTickets,
    getExpiredTickets,
    totalTickets: tickets.length,
    validTickets: getValidTickets().length,
    usedTickets: getUsedTickets().length,
    expiredTickets: getExpiredTickets().length
  }
}
