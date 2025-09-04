'use client'

import { useReadContract, useAccount, useChainId } from 'wagmi'
import { TICKET_NFT_ABI } from '@/lib/contracts/ticket-nft-abi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { formatEther } from 'viem'

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

  // 2. Función para obtener tokenId por índice
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
      return result.success ? Number(result.data) : null
    } catch (error) {
      console.error('Error getting tokenId by index:', error)
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

      return {
        tokenId,
        ticketInfo: ticketInfo.data,
        eventInfo: eventInfoCorrect.data,
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

      // Obtener todos los tokenIds del usuario
      for (let i = 0; i < balanceNumber; i++) {
        const tokenId = await getTokenIdByIndex(i)
        if (tokenId) {
          const ticketData = await getTicketData(tokenId)
          if (ticketData) {
            userTickets.push(ticketData)
          }
        }
      }

      console.log('🎫 Tickets encontrados:', userTickets.length)
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
