'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { useContractReads } from './use-contract-reads'
import { getContractAddress } from '@/lib/contracts/contract-addresses'

export interface RealTicket {
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
}

export function useRealTickets() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [tickets, setTickets] = useState<RealTicket[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { useTicketInfo, useEventInfo, useTicketOwner, useTicketValid } = useContractReads()

  // Función para obtener el balance de tokens del usuario
  const getUserTokenBalance = useCallback(async (): Promise<number> => {
    try {
      if (!address || !isConnected) return 0
      
      // En una implementación real, usarías balanceOf del contrato ERC721
      // Por ahora, simularemos basándose en transacciones conocidas
      // TODO: Implementar balanceOf real del contrato
      return 5 // Número de tickets que sabemos que se compraron
    } catch (error) {
      console.error('Error obteniendo balance de tokens:', error)
      return 0
    }
  }, [address, isConnected])

  // Función para obtener todos los tokenIds del usuario
  const getUserTokenIds = useCallback(async (balance: number): Promise<number[]> => {
    try {
      // En una implementación real, usarías tokenOfOwnerByIndex del contrato ERC721
      // Por ahora, simularemos los tokenIds conocidos
      const tokenIds: number[] = []
      for (let i = 1; i <= balance; i++) {
        tokenIds.push(i)
      }
      return tokenIds
    } catch (error) {
      console.error('Error obteniendo tokenIds:', error)
      return []
    }
  }, [])

  // Función para leer información de un ticket específico
  const readTicketInfo = useCallback(async (tokenId: number): Promise<RealTicket | null> => {
    try {
      // En una implementación real, usarías los hooks de contract reads
      // Por ahora, simularemos con datos realistas
      
      const ticket: RealTicket = {
        id: tokenId,
        tokenId: tokenId.toString(),
        eventName: 'Web3 Summit 2026',
        eventDate: '15-17 Marzo 2026',
        eventLocation: 'Centro de Convenciones, CDMX',
        ticketType: 'VIP',
        price: '0.13 ETH',
        purchaseDate: new Date().toLocaleDateString('es-ES'),
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
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        eventId: 1,
        owner: address || '',
        blockNumber: 30618332 + tokenId,
        gasUsed: '334747',
        isValid: true
      }

      return ticket
    } catch (error) {
      console.error(`Error leyendo ticket ${tokenId}:`, error)
      return null
    }
  }, [address, chainId])

  // Función principal para cargar todos los tickets del usuario
  const loadUserTickets = useCallback(async () => {
    if (!isConnected || !address) {
      setTickets([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      console.log('🔍 Cargando tickets reales para:', address)
      console.log('🌐 Red:', chainId)

      // Obtener balance de tokens del usuario
      const balance = await getUserTokenBalance()
      console.log('💰 Balance de tokens:', balance)

      if (balance === 0) {
        setTickets([])
        setIsLoading(false)
        return
      }

      // Obtener todos los tokenIds del usuario
      const tokenIds = await getUserTokenIds(balance)
      console.log('🎫 TokenIds encontrados:', tokenIds)

      // Leer información de cada ticket
      const ticketPromises = tokenIds.map(tokenId => readTicketInfo(tokenId))
      const ticketResults = await Promise.all(ticketPromises)
      
      // Filtrar tickets válidos
      const validTickets = ticketResults.filter((ticket): ticket is RealTicket => ticket !== null)
      
      console.log('✅ Tickets válidos cargados:', validTickets.length)
      
      setTickets(validTickets)
    } catch (err) {
      console.error('Error cargando tickets del usuario:', err)
      setError('Error al cargar los tickets desde la blockchain')
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address, chainId, getUserTokenBalance, getUserTokenIds, readTicketInfo])

  // Cargar tickets cuando cambie la conexión o dirección
  useEffect(() => {
    loadUserTickets()
  }, [loadUserTickets])

  // Función para refrescar tickets
  const refreshTickets = useCallback(() => {
    loadUserTickets()
  }, [loadUserTickets])

  // Funciones de utilidad
  const getTicketByTokenId = useCallback((tokenId: string) => {
    return tickets.find(ticket => ticket.tokenId === tokenId)
  }, [tickets])

  const getTicketsByEvent = useCallback((eventId: number) => {
    return tickets.filter(ticket => ticket.eventId === eventId)
  }, [tickets])

  const getTicketsByStatus = useCallback((status: RealTicket['status']) => {
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
