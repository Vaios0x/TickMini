'use client'

import { useReadContract, useAccount, useChainId } from 'wagmi'
import { TICKET_NFT_ABI } from '@/lib/contracts/ticket-nft-abi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'
import { useState, useEffect } from 'react'

export interface EventInfo {
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

export interface TicketInfo {
  eventId: bigint
  ticketType: bigint
  price: bigint
  purchaseDate: bigint
  benefits: string[]
  isTransferable: boolean
}

export function useContractReads() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [contractAddress, setContractAddress] = useState<`0x${string}` | null>(null)

  useEffect(() => {
    try {
      const addr = getContractAddress('TICKET_NFT', chainId)
      setContractAddress(addr as `0x${string}`)
    } catch (error) {
      console.error('Error getting contract address:', error)
      setContractAddress(null)
    }
  }, [chainId])

  // 1. LEER INFORMACIÓN DE EVENTO
  const useEventInfo = (eventId: number) => {
    return useReadContract({
      address: contractAddress || undefined,
      abi: TICKET_NFT_ABI,
      functionName: 'getEvent',
      args: eventId ? [BigInt(eventId)] : undefined,
      query: {
        enabled: !!contractAddress && !!eventId
      }
    })
  }

  // 2. LEER INFORMACIÓN DE TICKET
  const useTicketInfo = (tokenId: number) => {
    return useReadContract({
      address: contractAddress || undefined,
      abi: TICKET_NFT_ABI,
      functionName: 'getTicket',
      args: tokenId ? [BigInt(tokenId)] : undefined,
      query: {
        enabled: !!contractAddress && !!tokenId
      }
    })
  }

  // 3. VERIFICAR SI TICKET ES VÁLIDO
  const useTicketValid = (tokenId: number) => {
    return useReadContract({
      address: contractAddress || undefined,
      abi: TICKET_NFT_ABI,
      functionName: 'isTicketValid',
      args: tokenId ? [BigInt(tokenId)] : undefined,
      query: {
        enabled: !!contractAddress && !!tokenId
      }
    })
  }

  // 4. OBTENER PROPIETARIO DE TICKET
  const useTicketOwner = (tokenId: number) => {
    return useReadContract({
      address: contractAddress || undefined,
      abi: TICKET_NFT_ABI,
      functionName: 'ownerOf',
      args: tokenId ? [BigInt(tokenId)] : undefined,
      query: {
        enabled: !!contractAddress && !!tokenId
      }
    })
  }

  // 5. OBTENER URI DE METADATA
  const useTokenURI = (tokenId: number) => {
    return useReadContract({
      address: contractAddress || undefined,
      abi: TICKET_NFT_ABI,
      functionName: 'tokenURI',
      args: tokenId ? [BigInt(tokenId)] : undefined,
      query: {
        enabled: !!contractAddress && !!tokenId
      }
    })
  }

  // 6. OBTENER BALANCE DE USUARIO
  const useUserBalance = (userAddress?: string) => {
    const targetAddress = userAddress || address
    return useReadContract({
      address: contractAddress || undefined,
      abi: TICKET_NFT_ABI,
      functionName: 'balanceOf',
      args: targetAddress ? [targetAddress as `0x${string}`] : undefined,
      query: {
        enabled: !!contractAddress && !!targetAddress
      }
    })
  }

  // 7. OBTENER CONTADOR DE EVENTOS
  const useEventCounter = () => {
    return useReadContract({
      address: contractAddress || undefined,
      abi: TICKET_NFT_ABI,
      functionName: 'eventCounter',
      query: {
        enabled: !!contractAddress
      }
    })
  }

  // 8. HOOK PERSONALIZADO PARA VERIFICACIÓN COMPLETA DE TICKET
  const useTicketVerification = (tokenId: number) => {
    const ticketInfo = useTicketInfo(tokenId)
    const ticketValid = useTicketValid(tokenId)
    const ticketOwner = useTicketOwner(tokenId)
    const tokenURI = useTokenURI(tokenId)
    
    const eventInfo = useEventInfo(
      ticketInfo.data ? Number(ticketInfo.data.eventId) : 0
    )

    return {
      // Estados combinados
      isLoading: ticketInfo.isLoading || ticketValid.isLoading || ticketOwner.isLoading || tokenURI.isLoading || eventInfo.isLoading,
      isError: ticketInfo.isError || ticketValid.isError || ticketOwner.isError || tokenURI.isError || eventInfo.isError,
      error: ticketInfo.error || ticketValid.error || ticketOwner.error || tokenURI.error || eventInfo.error,
      
      // Datos individuales
      ticketInfo: ticketInfo.data as TicketInfo | undefined,
      eventInfo: eventInfo.data as EventInfo | undefined,
      isValid: ticketValid.data as boolean | undefined,
      owner: ticketOwner.data as string | undefined,
      tokenURI: tokenURI.data as string | undefined,
      
      // Funciones de refetch
      refetchTicketInfo: ticketInfo.refetch,
      refetchEventInfo: eventInfo.refetch,
      refetchValid: ticketValid.refetch,
      refetchOwner: ticketOwner.refetch,
      refetchTokenURI: tokenURI.refetch,
      
      // Refetch todo
      refetchAll: async () => {
        await Promise.all([
          ticketInfo.refetch(),
          eventInfo.refetch(),
          ticketValid.refetch(),
          ticketOwner.refetch(),
          tokenURI.refetch()
        ])
      }
    }
  }

  // 9. HOOK PARA OBTENER TODOS LOS EVENTOS (simulado - en producción usarías The Graph o eventos)
  const useAllEvents = (count?: number) => {
    const { data: eventCounter } = useEventCounter()
    const [events, setEvents] = useState<EventInfo[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const fetchEvents = async () => {
        if (!contractAddress || !eventCounter) return

        setIsLoading(true)
        const eventPromises = []
        const totalEvents = Number(eventCounter)
        const eventsToFetch = count ? Math.min(count, totalEvents) : totalEvents

        for (let i = 1; i <= eventsToFetch; i++) {
          eventPromises.push(
            fetch(`/api/events/${i}`).then(res => res.json()).catch(() => null)
          )
        }

        try {
          const eventResults = await Promise.all(eventPromises)
          const validEvents = eventResults.filter(event => event !== null)
          setEvents(validEvents)
        } catch (error) {
          console.error('Error fetching events:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchEvents()
    }, [contractAddress, eventCounter, count])

    return {
      events,
      isLoading,
      totalEventCount: eventCounter ? Number(eventCounter) : 0
    }
  }

  return {
    // Estados generales
    isConnected,
    address,
    chainId,
    contractAddress,
    
    // Hooks individuales
    useEventInfo,
    useTicketInfo,
    useTicketValid,
    useTicketOwner,
    useTokenURI,
    useUserBalance,
    useEventCounter,
    
    // Hooks compuestos
    useTicketVerification,
    useAllEvents
  }
}