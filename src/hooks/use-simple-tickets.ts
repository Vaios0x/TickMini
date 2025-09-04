'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'

export interface SimpleTicket {
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

// Datos estáticos de tickets para evitar problemas de webpack
const STATIC_TICKETS: SimpleTicket[] = [
  {
    id: 1,
    tokenId: '1',
    eventName: 'Web3 Summit 2026',
    eventDate: '15-17 Marzo 2026',
    eventLocation: 'Centro de Convenciones, CDMX',
    ticketType: 'VIP',
    price: '0.13 ETH',
    purchaseDate: '4 de septiembre de 2025',
    status: 'Válido',
    benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Material del evento'],
    image: '🚀',
    category: 'tech',
    organizer: 'Web3 Latam',
    contractAddress: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
    transactionHash: '0xd571603446c42466c9f04aa4a568d316c693cc7b6f6fa0c8a40a80c6802192df',
    eventId: 1,
    owner: '',
    blockNumber: 30618332,
    gasUsed: '334747',
    isValid: true,
    explorerUrl: 'https://sepolia.basescan.org/tx/0xd571603446c42466c9f04aa4a568d316c693cc7b6f6fa0c8a40a80c6802192df'
  },
  {
    id: 2,
    tokenId: '2',
    eventName: 'Festival de Música Electrónica',
    eventDate: '22-24 Abril 2026',
    eventLocation: 'Parque Metropolitano, Guadalajara',
    ticketType: 'General',
    price: '0.13 ETH',
    purchaseDate: '4 de septiembre de 2025',
    status: 'Válido',
    benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito'],
    image: '🎵',
    category: 'music',
    organizer: 'ElectroFest MX',
    contractAddress: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
    transactionHash: '0x7656c0146396f06aff1b6433f83c2c224e622bf51f85a09c03d0c243c6146302',
    eventId: 1,
    owner: '',
    blockNumber: 30618333,
    gasUsed: '334747',
    isValid: true,
    explorerUrl: 'https://sepolia.basescan.org/tx/0x7656c0146396f06aff1b6433f83c2c224e622bf51f85a09c03d0c243c6146302'
  },
  {
    id: 3,
    tokenId: '3',
    eventName: 'Gaming Championship 2026',
    eventDate: '12-14 Julio 2026',
    eventLocation: 'Arena Gaming, Puebla',
    ticketType: 'Premium',
    price: '0.13 ETH',
    purchaseDate: '4 de septiembre de 2025',
    status: 'Válido',
    benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Material del evento', 'Networking'],
    image: '🎮',
    category: 'gaming',
    organizer: 'Gaming MX',
    contractAddress: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
    transactionHash: '0xcbc5188852a8ebf6c1b49be4bf70e955dff1438f5ff1a523881603c7747ecbff',
    eventId: 1,
    owner: '',
    blockNumber: 30618334,
    gasUsed: '334747',
    isValid: true,
    explorerUrl: 'https://sepolia.basescan.org/tx/0xcbc5188852a8ebf6c1b49be4bf70e955dff1438f5ff1a523881603c7747ecbff'
  },
  {
    id: 4,
    tokenId: '4',
    eventName: 'Blockchain Developers Meetup',
    eventDate: '8-10 Junio 2026',
    eventLocation: 'Tech Hub, Monterrey',
    ticketType: 'Developer',
    price: '0.13 ETH',
    purchaseDate: '4 de septiembre de 2025',
    status: 'Válido',
    benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Workshops', 'Networking'],
    image: '💻',
    category: 'tech',
    organizer: 'DevChain MX',
    contractAddress: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
    transactionHash: '0xbd290f12a70005cb7044ade85e7514a451df0ac12f7999f7604a3c27ee91c9f3',
    eventId: 1,
    owner: '',
    blockNumber: 30618335,
    gasUsed: '334747',
    isValid: true,
    explorerUrl: 'https://sepolia.basescan.org/tx/0xbd290f12a70005cb7044ade85e7514a451df0ac12f7999f7604a3c27ee91c9f3'
  },
  {
    id: 5,
    tokenId: '5',
    eventName: 'NFT Art Exhibition',
    eventDate: '20-22 Mayo 2026',
    eventLocation: 'Museo de Arte Digital, CDMX',
    ticketType: 'VIP',
    price: '0.13 ETH',
    purchaseDate: '4 de septiembre de 2025',
    status: 'Válido',
    benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Catálogo digital'],
    image: '🎨',
    category: 'art',
    organizer: 'ArtChain Collective',
    contractAddress: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
    transactionHash: '0x6053cabfae7a87d5b390529074629a7b043a39fbbc1be200b72f0505cb6c7fe8',
    eventId: 1,
    owner: '',
    blockNumber: 30618336,
    gasUsed: '334747',
    isValid: true,
    explorerUrl: 'https://sepolia.basescan.org/tx/0x6053cabfae7a87d5b390529074629a7b043a39fbbc1be200b72f0505cb6c7fe8'
  },
  {
    id: 6,
    tokenId: '6',
    eventName: 'DeFi Conference 2026',
    eventDate: '5-7 Octubre 2026',
    eventLocation: 'Centro Financiero, CDMX',
    ticketType: 'Executive',
    price: '0.05 ETH',
    purchaseDate: '4 de septiembre de 2025',
    status: 'Válido',
    benefits: ['Acceso al evento', 'Certificado NFT', 'WiFi gratuito', 'Material del evento', 'Networking VIP'],
    image: '💰',
    category: 'finance',
    organizer: 'DeFi Latam',
    contractAddress: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
    transactionHash: '0x77338582f9dd8f58e507bf321154acb97899ae3fbb715aadc1f49a59e70c7b08',
    eventId: 1,
    owner: '',
    blockNumber: 30620865,
    gasUsed: '334747',
    isValid: true,
    explorerUrl: 'https://sepolia.basescan.org/tx/0x77338582f9dd8f58e507bf321154acb97899ae3fbb715aadc1f49a59e70c7b08'
  },
  {
    id: 7,
    tokenId: '7',
    eventName: 'AI & Blockchain Workshop',
    eventDate: '15-17 Noviembre 2026',
    eventLocation: 'Innovation Hub, Tijuana',
    ticketType: 'Workshop',
    price: '0.000000001 ETH',
    purchaseDate: '4 de septiembre de 2025',
    status: 'Válido',
    benefits: ['Acceso al workshop', 'Certificado NFT', 'Material digital', 'Networking', 'Coffee break'],
    image: '🤖',
    category: 'tech',
    organizer: 'AI Chain Labs',
    contractAddress: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
    eventId: 2,
    owner: '',
    blockNumber: 30621000,
    gasUsed: '334747',
    isValid: true,
    explorerUrl: 'https://sepolia.basescan.org/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12'
  },
  {
    id: 8,
    tokenId: '8',
    eventName: 'Crypto Art Gallery Opening',
    eventDate: '3-5 Diciembre 2026',
    eventLocation: 'Galería Digital, Mérida',
    ticketType: 'VIP',
    price: '0.000000001 ETH',
    purchaseDate: '4 de septiembre de 2025',
    status: 'Válido',
    benefits: ['Acceso VIP', 'Certificado NFT', 'Catálogo exclusivo', 'Cocktail reception', 'Meet the artists'],
    image: '🎭',
    category: 'art',
    organizer: 'CryptoArt MX',
    contractAddress: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
    transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab',
    eventId: 3,
    owner: '',
    blockNumber: 30621100,
    gasUsed: '334747',
    isValid: true,
    explorerUrl: 'https://sepolia.basescan.org/tx/0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab'
  }
]

export function useSimpleTickets() {
  const { address, isConnected } = useAccount()
  const [tickets, setTickets] = useState<SimpleTicket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTickets = useCallback(() => {
    if (!isConnected || !address) {
      setTickets([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Actualizar el owner en todos los tickets
      const ticketsWithOwner = STATIC_TICKETS.map(ticket => ({
        ...ticket,
        owner: address
      }))

      setTickets(ticketsWithOwner)
    } catch (err) {
      console.error('Error cargando tickets:', err)
      setError('Error al cargar los tickets')
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address])

  useEffect(() => {
    loadTickets()
  }, [loadTickets])

  const refreshTickets = useCallback(() => {
    loadTickets()
  }, [loadTickets])

  const getTicketByTokenId = useCallback((tokenId: string) => {
    return tickets.find(ticket => ticket.tokenId === tokenId)
  }, [tickets])

  const getTicketsByEvent = useCallback((eventId: number) => {
    return tickets.filter(ticket => ticket.eventId === eventId)
  }, [tickets])

  const getTicketsByStatus = useCallback((status: SimpleTicket['status']) => {
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
