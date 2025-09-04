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
// NOTA: Estos son tickets de demostración. En producción, se obtendrían de la blockchain
const STATIC_TICKETS: SimpleTicket[] = [
  // Por ahora, no hay tickets comprados - el usuario debe comprarlos desde la página de eventos
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
