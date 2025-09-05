'use client'

import { useReadContract, useAccount, useChainId } from 'wagmi'
import { TICKET_NFT_ABI } from '@/lib/contracts/ticket-nft-abi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { formatEther } from 'viem'
import { safeStringToBigInt, bigIntToDate } from '@/lib/bigint-utils'

export interface RealTicketData {
  tokenId: number
  ticketInfo: {
    eventId: bigint
    ticketType: bigint
    price: bigint
    purchaseDate: bigint
    benefits: string[]
    isTransferable: boolean
  }
  eventInfo: {
    eventId: bigint
    name: string
    description: string
    eventDate: bigint
    location: string
    organizer: string
    totalTickets: bigint
    soldTickets: bigint
    isActive: boolean
    metadataURI: string
  }
  isValid: boolean
  owner: string
  tokenURI: string
}

export function useRealBlockchainTickets() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [tickets, setTickets] = useState<RealTicketData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const contractAddress = getContractAddress('TICKET_NFT', chainId) as `0x${string}`

  // 1. Obtener balance de tokens del usuario
  const { data: balance, isLoading: balanceLoading, error: balanceError } = useReadContract({
    address: contractAddress,
    abi: TICKET_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { 
      enabled: !!address && isConnected && !!contractAddress,
      refetchInterval: 10000 // Refetch cada 10 segundos
    }
  })

  // 2. Función para obtener tokenId por índice de forma segura
  const getTokenIdByIndex = useCallback(async (index: number): Promise<number | null> => {
    if (!address || !contractAddress) return null
    
    try {
      // Usar fetch para llamar al contrato directamente
      const response = await fetch('/api/contract-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractAddress,
          abi: TICKET_NFT_ABI,
          functionName: 'tokenOfOwnerByIndex',
          args: [address, index],
          chainId
        })
      })
      
      const result = await response.json()
      
      // Si la llamada falla, significa que el índice no existe
      if (!result.success) {
        // No loggear como error, es normal que algunos índices no existan
        return null
      }
      
      return Number(result.data)
    } catch (error) {
      // Solo loggear errores reales de red, no errores de contrato
      if (error instanceof Error && !error.message.includes('reverted')) {
        console.error('Error de red getting tokenId by index:', error)
      }
      return null
    }
  }, [address, contractAddress, chainId])

  // 3. Función para obtener información completa de un ticket
  const getTicketData = useCallback(async (tokenId: number): Promise<RealTicketData | null> => {
    if (!contractAddress) return null

    try {
      // Hacer múltiples llamadas al contrato en paralelo
      const [ticketInfoRes, eventInfoRes, isValidRes, ownerRes, tokenURIRes] = await Promise.all([
        fetch('/api/contract-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contractAddress,
            abi: TICKET_NFT_ABI,
            functionName: 'getTicket',
            args: [tokenId],
            chainId
          })
        }),
        fetch('/api/contract-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contractAddress,
            abi: TICKET_NFT_ABI,
            functionName: 'getEvent',
            args: [tokenId], // Temporal - necesitamos el eventId del ticket
            chainId
          })
        }),
        fetch('/api/contract-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contractAddress,
            abi: TICKET_NFT_ABI,
            functionName: 'isTicketValid',
            args: [tokenId],
            chainId
          })
        }),
        fetch('/api/contract-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contractAddress,
            abi: TICKET_NFT_ABI,
            functionName: 'ownerOf',
            args: [tokenId],
            chainId
          })
        }),
        fetch('/api/contract-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contractAddress,
            abi: TICKET_NFT_ABI,
            functionName: 'tokenURI',
            args: [tokenId],
            chainId
          })
        })
      ])

      const [ticketInfo, eventInfo, isValid, owner, tokenURI] = await Promise.all([
        ticketInfoRes.json(),
        eventInfoRes.json(),
        isValidRes.json(),
        ownerRes.json(),
        tokenURIRes.json()
      ])

      // Obtener eventId del ticketInfo para hacer la llamada correcta a getEvent
      if (!ticketInfo.success) return null
      const eventId = Number(ticketInfo.data.eventId)

      // Hacer la llamada correcta a getEvent con el eventId
      const eventInfoCorrectRes = await fetch('/api/contract-call', {
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

      const eventInfoCorrect = await eventInfoCorrectRes.json()

      if (!ticketInfo.success || !eventInfoCorrect.success || !isValid.success || !owner.success || !tokenURI.success) {
        return null
      }

      // Convertir los valores BigInt que vienen como strings de vuelta a BigInt
      const processedTicketInfo = {
        ...ticketInfo.data,
        eventId: safeStringToBigInt(ticketInfo.data.eventId) || BigInt(0),
        ticketType: safeStringToBigInt(ticketInfo.data.ticketType) || BigInt(0),
        price: safeStringToBigInt(ticketInfo.data.price) || BigInt(0),
        purchaseDate: safeStringToBigInt(ticketInfo.data.purchaseDate) || BigInt(0)
      }

      const processedEventInfo = {
        ...eventInfoCorrect.data,
        eventId: safeStringToBigInt(eventInfoCorrect.data.eventId) || BigInt(0),
        eventDate: safeStringToBigInt(eventInfoCorrect.data.eventDate) || BigInt(0),
        totalTickets: safeStringToBigInt(eventInfoCorrect.data.totalTickets) || BigInt(0),
        soldTickets: safeStringToBigInt(eventInfoCorrect.data.soldTickets) || BigInt(0)
      }

      return {
        tokenId,
        ticketInfo: processedTicketInfo,
        eventInfo: processedEventInfo,
        isValid: isValid.data,
        owner: owner.data,
        tokenURI: tokenURI.data
      }
    } catch (error) {
      console.error('Error getting ticket data:', error)
      return null
    }
  }, [contractAddress, chainId])

  // 4. Función para cargar todos los tickets del usuario
  const loadUserTickets = useCallback(async () => {
    if (!isConnected || !address || !contractAddress) {
      setTickets([])
      setIsLoading(false)
      return
    }

    if (balanceLoading) return

    try {
      setIsLoading(true)
      setError(null)

      console.log('🔍 Cargando tickets reales de blockchain para:', address)
      console.log('🌐 Red:', chainId)
      console.log('📊 Balance de tokens:', balance)

      if (!balance || Number(balance) === 0) {
        setTickets([])
        setIsLoading(false)
        return
      }

      const userTickets: RealTicketData[] = []
      const balanceNumber = Number(balance)

      // Estrategia mejorada: obtener tokens de forma más eficiente
      // Usar un enfoque que maneje gaps en los índices de forma más inteligente
      
      let foundTokens = 0
      let consecutiveFailures = 0
      const maxConsecutiveFailures = 3
      const maxAttempts = Math.min(balanceNumber * 3, 100) // Límite más generoso
      
      for (let i = 0; i < maxAttempts && foundTokens < balanceNumber; i++) {
        const tokenId = await getTokenIdByIndex(i)
        
        if (tokenId && tokenId > 0) {
          const ticketData = await getTicketData(tokenId)
          if (ticketData) {
            userTickets.push(ticketData)
            foundTokens++
            consecutiveFailures = 0 // Resetear contador de fallos
          } else {
            consecutiveFailures++
          }
        } else {
          consecutiveFailures++
        }
        
        // Si tenemos muchos fallos consecutivos y ya encontramos algunos tokens,
        // probablemente hemos llegado al final
        if (consecutiveFailures >= maxConsecutiveFailures && foundTokens > 0) {
          break
        }
      }

      console.log('🎫 Tickets encontrados:', userTickets.length, 'de', balanceNumber, 'esperados')
      setTickets(userTickets)
    } catch (err) {
      console.error('Error cargando tickets del usuario:', err)
      setError('Error al cargar los tickets desde la blockchain')
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address, contractAddress, balance, balanceLoading, chainId, getTokenIdByIndex, getTicketData])

  // 5. Cargar tickets cuando cambien las dependencias
  useEffect(() => {
    loadUserTickets()
  }, [loadUserTickets])

  // 6. Función para refrescar tickets
  const refreshTickets = useCallback(() => {
    loadUserTickets()
  }, [loadUserTickets])

  // 7. Funciones de utilidad
  const getTicketByTokenId = useCallback((tokenId: number) => {
    return tickets.find(ticket => ticket.tokenId === tokenId)
  }, [tickets])

  const getTicketsByEvent = useCallback((eventId: number) => {
    return tickets.filter(ticket => Number(ticket.ticketInfo.eventId) === eventId)
  }, [tickets])

  const getValidTickets = useCallback(() => {
    return tickets.filter(ticket => ticket.isValid)
  }, [tickets])

  const getUsedTickets = useCallback(() => {
    return tickets.filter(ticket => !ticket.isValid)
  }, [tickets])

  return {
    tickets,
    isLoading: isLoading || balanceLoading,
    error: error || balanceError?.message,
    refreshTickets,
    getTicketByTokenId,
    getTicketsByEvent,
    getValidTickets,
    getUsedTickets,
    totalTickets: tickets.length,
    validTickets: getValidTickets().length,
    usedTickets: getUsedTickets().length,
    balance: balance ? Number(balance) : 0
  }
}
