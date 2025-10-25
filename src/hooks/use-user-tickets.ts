'use client'

import { useState, useEffect, useCallback } from 'react'

export interface UserTicket {
  id: string
  eventId: number
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventImage: string
  ticketType: string
  ticketDescription: string
  price: number
  benefits: string[]
  purchaseDate: number
  transactionHash: string
  isUsed: boolean
  qrCode?: string
  nftTokenId?: number
}

const STORAGE_KEY = 'tickbase_user_tickets'

export function useUserTickets() {
  const [userTickets, setUserTickets] = useState<UserTicket[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar tickets desde localStorage al montar el componente
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const tickets = JSON.parse(stored)
        setUserTickets(tickets)
      }
    } catch (error) {
      console.error('Error loading user tickets:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Guardar tickets en localStorage
  const saveTickets = useCallback((tickets: UserTicket[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
      setUserTickets(tickets)
    } catch (error) {
      console.error('Error saving user tickets:', error)
    }
  }, [])

  // Añadir un nuevo ticket comprado
  const addTicket = useCallback((ticket: Omit<UserTicket, 'id' | 'purchaseDate'>) => {
    const newTicket: UserTicket = {
      ...ticket,
      id: `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      purchaseDate: Date.now()
    }
    
    const updatedTickets = [newTicket, ...userTickets]
    saveTickets(updatedTickets)
    return newTicket
  }, [userTickets, saveTickets])

  // Marcar ticket como usado
  const markTicketAsUsed = useCallback((ticketId: string) => {
    const updatedTickets = userTickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, isUsed: true } : ticket
    )
    saveTickets(updatedTickets)
  }, [userTickets, saveTickets])

  // Obtener tickets por evento
  const getTicketsByEvent = useCallback((eventId: number) => {
    return userTickets.filter(ticket => ticket.eventId === eventId)
  }, [userTickets])

  // Obtener tickets activos (no usados)
  const getActiveTickets = useCallback(() => {
    return userTickets.filter(ticket => !ticket.isUsed)
  }, [userTickets])

  // Obtener tickets usados
  const getUsedTickets = useCallback(() => {
    return userTickets.filter(ticket => ticket.isUsed)
  }, [userTickets])

  // Buscar tickets
  const searchTickets = useCallback((searchTerm: string) => {
    const term = searchTerm.toLowerCase()
    return userTickets.filter(ticket => 
      ticket.eventName.toLowerCase().includes(term) ||
      ticket.eventLocation.toLowerCase().includes(term) ||
      ticket.ticketType.toLowerCase().includes(term)
    )
  }, [userTickets])

  // Obtener estadísticas
  const getTicketStats = useCallback(() => {
    const total = userTickets.length
    const active = userTickets.filter(ticket => !ticket.isUsed).length
    const used = userTickets.filter(ticket => ticket.isUsed).length
    const totalSpent = userTickets.reduce((sum, ticket) => sum + ticket.price, 0)
    
    return {
      total,
      active,
      used,
      totalSpent
    }
  }, [userTickets])

  // Eliminar ticket
  const removeTicket = useCallback((ticketId: string) => {
    const updatedTickets = userTickets.filter(ticket => ticket.id !== ticketId)
    saveTickets(updatedTickets)
  }, [userTickets, saveTickets])

  // Limpiar todos los tickets (para testing)
  const clearAllTickets = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUserTickets([])
  }, [])

  return {
    userTickets,
    isLoading,
    addTicket,
    markTicketAsUsed,
    getTicketsByEvent,
    getActiveTickets,
    getUsedTickets,
    searchTickets,
    getTicketStats,
    removeTicket,
    clearAllTickets
  }
}
