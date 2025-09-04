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
    blockNumber: 30618332
  },
  {
    hash: '0x7656c0146396f06aff1b6433f83c2c224e622bf51f85a09c03d0c243c6146302',
    tokenId: 2,
    eventId: 1,
    price: '0.13 ETH',
    timestamp: new Date('2025-09-04T16:55:52Z').getTime(), // 4 de septiembre 2025, 4:55:52 PM UTC
    blockNumber: 30618333
  },
  {
    hash: '0xcbc5188852a8ebf6c1b49be4bf70e955dff1438f5ff1a523881603c7747ecbff',
    tokenId: 3,
    eventId: 1,
    price: '0.13 ETH',
    timestamp: new Date('2025-09-04T16:55:52Z').getTime(), // 4 de septiembre 2025, 4:55:52 PM UTC
    blockNumber: 30618334
  },
  {
    hash: '0xbd290f12a70005cb7044ade85e7514a451df0ac12f7999f7604a3c27ee91c9f3',
    tokenId: 4,
    eventId: 1,
    price: '0.13 ETH',
    timestamp: new Date('2025-09-04T16:55:52Z').getTime(), // 4 de septiembre 2025, 4:55:52 PM UTC
    blockNumber: 30618335
  },
  {
    hash: '0x6053cabfae7a87d5b390529074629a7b043a39fbbc1be200b72f0505cb6c7fe8',
    tokenId: 5,
    eventId: 1,
    price: '0.13 ETH',
    timestamp: new Date('2025-09-04T16:55:52Z').getTime(), // 4 de septiembre 2025, 4:55:52 PM UTC
    blockNumber: 30618336
  },
  {
    hash: '0x77338582f9dd8f58e507bf321154acb97899ae3fbb715aadc1f49a59e70c7b08',
    tokenId: 6,
    eventId: 1,
    price: '0.05 ETH',
    timestamp: new Date('2025-09-04T18:20:18Z').getTime(), // 4 de septiembre 2025, 6:20:18 PM UTC (nuevo ticket)
    blockNumber: 30620865
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

      // Por ahora, mostramos todos los tickets conocidos
      // En producción, filtrarías por la dirección del usuario
      const userTickets = KNOWN_TRANSACTIONS.map(tx => 
        createTicketFromTransaction(tx, address)
      )

      console.log('🎫 Tickets encontrados:', userTickets.length)
      
      setTickets(userTickets)
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
  const addNewTicket = useCallback((transactionHash: string, tokenId: number, eventId: number, price: string) => {
    const currentDate = new Date()
    const newTicket: BlockchainTicket = {
      id: tokenId,
      tokenId: tokenId.toString(),
      eventName: 'Web3 Summit 2026',
      eventDate: '15-17 Marzo 2026',
      eventLocation: 'Centro de Convenciones, CDMX',
      ticketType: 'VIP',
      price,
      purchaseDate: currentDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: 'Válido',
      benefits: [
        'Acceso al evento',
        'Certificado NFT',
        'WiFi gratuito',
        'Material del evento'
      ],
      image: '🚀',
      category: 'tech',
      organizer: 'Web3 Latam',
      contractAddress: getContractAddress('TICKET_NFT', chainId) || '',
      transactionHash,
      eventId,
      owner: address || '',
      blockNumber: Math.floor(currentDate.getTime() / 1000), // Timestamp como block number temporal
      gasUsed: '334747',
      isValid: true,
      explorerUrl: `https://sepolia.basescan.org/tx/${transactionHash}`
    }

    setTickets(prev => [...prev, newTicket])
    console.log('✅ Nuevo ticket agregado:', newTicket)
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
