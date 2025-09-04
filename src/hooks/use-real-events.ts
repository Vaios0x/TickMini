'use client'

import { useReadContract, useAccount, useChainId } from 'wagmi'
import { TICKET_NFT_ABI } from '@/lib/contracts/ticket-nft-abi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'
import { useState, useEffect, useCallback, useMemo } from 'react'

export interface RealEventData {
  eventId: number
  name: string
  description: string
  eventDate: number
  location: string
  organizer: string
  totalTickets: number
  soldTickets: number
  isActive: boolean
  metadataURI: string
  availableTickets: number
}

export function useRealEvents() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [events, setEvents] = useState<RealEventData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const contractAddress = getContractAddress('TICKET_NFT', chainId) as `0x${string}`

  // 1. Obtener contador de eventos
  const { data: eventCounter, isLoading: counterLoading, error: counterError } = useReadContract({
    address: contractAddress,
    abi: TICKET_NFT_ABI,
    functionName: 'eventCounter',
    query: { 
      enabled: !!contractAddress,
      refetchInterval: 30000 // Refetch cada 30 segundos
    }
  })

  // 2. Función para obtener información de un evento específico
  const getEventData = useCallback(async (eventId: number): Promise<RealEventData | null> => {
    if (!contractAddress) return null

    try {
      const response = await fetch('/api/contract-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractAddress,
          abi: TICKET_NFT_ABI,
          functionName: 'getEvent',
          args: [eventId],
          chainId
        })
      })

      const result = await response.json()

      if (!result.success) {
        console.error('Error getting event data:', result.error)
        return null
      }

      const eventInfo = result.data
      
      return {
        eventId,
        name: eventInfo.name,
        description: eventInfo.description,
        eventDate: Number(eventInfo.eventDate),
        location: eventInfo.location,
        organizer: eventInfo.organizer,
        totalTickets: Number(eventInfo.totalTickets),
        soldTickets: Number(eventInfo.soldTickets),
        isActive: eventInfo.isActive,
        metadataURI: eventInfo.metadataURI,
        availableTickets: Number(eventInfo.totalTickets) - Number(eventInfo.soldTickets)
      }
    } catch (error) {
      console.error('Error getting event data:', error)
      return null
    }
  }, [contractAddress, chainId])

  // 3. Función para cargar todos los eventos
  const loadAllEvents = useCallback(async () => {
    if (!contractAddress || !eventCounter) {
      setEvents([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      console.log('🔍 Cargando eventos reales de blockchain')
      console.log('🌐 Red:', chainId)
      console.log('📊 Total de eventos:', Number(eventCounter))

      const eventPromises = []
      const totalEvents = Number(eventCounter)

      // Cargar todos los eventos en paralelo
      for (let i = 1; i <= totalEvents; i++) {
        eventPromises.push(getEventData(i))
      }

      const eventResults = await Promise.all(eventPromises)
      const validEvents = eventResults.filter(event => event !== null) as RealEventData[]

      console.log('🎭 Eventos encontrados:', validEvents.length)
      setEvents(validEvents)
    } catch (err) {
      console.error('Error cargando eventos:', err)
      setError('Error al cargar los eventos desde la blockchain')
    } finally {
      setIsLoading(false)
    }
  }, [contractAddress, eventCounter, chainId, getEventData])

  // 4. Cargar eventos cuando cambien las dependencias
  useEffect(() => {
    loadAllEvents()
  }, [loadAllEvents])

  // 5. Función para refrescar eventos
  const refreshEvents = useCallback(() => {
    loadAllEvents()
  }, [loadAllEvents])

  // 6. Función para obtener un evento específico
  const getEventById = useCallback((eventId: number) => {
    return events.find(event => event.eventId === eventId)
  }, [events])

  // 7. Función para obtener eventos activos
  const getActiveEvents = useCallback(() => {
    return events.filter(event => event.isActive)
  }, [events])

  // 8. Función para obtener eventos por organizador
  const getEventsByOrganizer = useCallback((organizerAddress: string) => {
    return events.filter(event => event.organizer.toLowerCase() === organizerAddress.toLowerCase())
  }, [events])

  // 9. Función para obtener eventos disponibles (con tickets disponibles)
  const getAvailableEvents = useCallback(() => {
    return events.filter(event => event.isActive && event.availableTickets > 0)
  }, [events])

  // 10. Función para obtener eventos próximos (fecha futura)
  const getUpcomingEvents = useCallback(() => {
    const now = Math.floor(Date.now() / 1000)
    return events.filter(event => event.isActive && event.eventDate > now)
  }, [events])

  return {
    events,
    isLoading: isLoading || counterLoading,
    error: error || counterError?.message,
    refreshEvents,
    getEventById,
    getActiveEvents,
    getEventsByOrganizer,
    getAvailableEvents,
    getUpcomingEvents,
    totalEvents: events.length,
    activeEvents: getActiveEvents().length,
    availableEvents: getAvailableEvents().length,
    upcomingEvents: getUpcomingEvents().length,
    eventCounter: eventCounter ? Number(eventCounter) : 0
  }
}
