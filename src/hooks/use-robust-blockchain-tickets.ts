import { useState, useEffect, useCallback } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'
import { TICKET_NFT_ABI } from '@/lib/contracts/ticket-nft-abi'
import { safeStringToBigInt, bigIntToDate } from '@/lib/bigint-utils'

export interface RobustTicketData {
  tokenId: number
  eventId: number
  eventName: string
  eventDate: number
  location: string
  organizer: string
  ticketType: number
  price: string
  purchaseDate: number
  benefits: string[]
  isTransferable: boolean
  isValid: boolean
  isUsed: boolean
  tokenURI: string
}

export function useRobustBlockchainTickets() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [tickets, setTickets] = useState<RobustTicketData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const contractAddress = getContractAddress('TICKET_NFT', chainId) as `0x${string}`

  // Función para hacer llamadas al contrato de forma segura
  const safeContractCall = useCallback(async (functionName: string, args: any[] = []) => {
    try {
      const response = await fetch('/api/contract-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractAddress,
          abi: TICKET_NFT_ABI,
          functionName,
          args,
          chainId
        })
      })
      
      const result = await response.json()
      return result.success ? result.data : null
    } catch (error) {
      console.error(`Error en llamada ${functionName}:`, error)
      return null
    }
  }, [contractAddress, chainId])

  // Función para obtener el balance de tokens del usuario
  const getUserBalance = useCallback(async (): Promise<number> => {
    if (!address) return 0
    const balance = await safeContractCall('balanceOf', [address])
    return balance ? Number(balance) : 0
  }, [address, safeContractCall])

  // Función para obtener un token por índice de forma segura
  const getTokenByIndex = useCallback(async (index: number): Promise<number | null> => {
    if (!address) return null
    const tokenId = await safeContractCall('tokenOfOwnerByIndex', [address, index])
    return tokenId ? Number(tokenId) : null
  }, [address, safeContractCall])

  // Función para obtener información completa de un ticket
  const getTicketInfo = useCallback(async (tokenId: number): Promise<RobustTicketData | null> => {
    try {
      // Verificar si el token existe
      const exists = await safeContractCall('_exists', [tokenId])
      if (!exists) return null

      // Obtener información del ticket
      const ticketInfo = await safeContractCall('getTicket', [tokenId])
      if (!ticketInfo) return null

      // Obtener información del evento
      const eventInfo = await safeContractCall('getEvent', [ticketInfo.eventId])
      if (!eventInfo) return null

      // Verificar si el ticket es válido
      const isValid = await safeContractCall('isTicketValid', [tokenId])
      
      // Obtener token URI
      const tokenURI = await safeContractCall('tokenURI', [tokenId])

      // Convertir valores BigInt que vienen como strings
      const eventIdBigInt = safeStringToBigInt(ticketInfo.eventId) || 0n
      const eventDateBigInt = safeStringToBigInt(eventInfo.eventDate) || 0n
      const ticketTypeBigInt = safeStringToBigInt(ticketInfo.ticketType) || 0n
      const priceBigInt = safeStringToBigInt(ticketInfo.price) || 0n
      const purchaseDateBigInt = safeStringToBigInt(ticketInfo.purchaseDate) || 0n

      return {
        tokenId,
        eventId: Number(eventIdBigInt),
        eventName: eventInfo.name,
        eventDate: Number(eventDateBigInt),
        location: eventInfo.location,
        organizer: eventInfo.organizer,
        ticketType: Number(ticketTypeBigInt),
        price: priceBigInt.toString(),
        purchaseDate: Number(purchaseDateBigInt),
        benefits: ticketInfo.benefits || [],
        isTransferable: ticketInfo.isTransferable,
        isValid: isValid || false,
        isUsed: !isValid,
        tokenURI: tokenURI || ''
      }
    } catch (error) {
      console.error('Error obteniendo información del ticket:', error)
      return null
    }
  }, [safeContractCall])

  // Función principal para cargar tickets
  const loadTickets = useCallback(async () => {
    if (!isConnected || !address || !contractAddress) {
      setTickets([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      console.log('🔍 Cargando tickets de forma robusta para:', address)
      
      const balance = await getUserBalance()
      console.log('📊 Balance de tokens:', balance)

      if (balance === 0) {
        setTickets([])
        setIsLoading(false)
        return
      }

      const userTickets: RobustTicketData[] = []
      let consecutiveErrors = 0
      const maxConsecutiveErrors = 5

      // Intentar obtener tokens de forma iterativa
      for (let i = 0; i < balance * 2 && consecutiveErrors < maxConsecutiveErrors; i++) {
        try {
          const tokenId = await getTokenByIndex(i)
          
          if (tokenId && tokenId > 0) {
            const ticketInfo = await getTicketInfo(tokenId)
            if (ticketInfo) {
              userTickets.push(ticketInfo)
              consecutiveErrors = 0 // Resetear contador de errores
            }
          } else {
            consecutiveErrors++
          }

          // Si ya encontramos todos los tokens esperados, parar
          if (userTickets.length >= balance) {
            break
          }
        } catch (error) {
          consecutiveErrors++
          console.warn(`Error en índice ${i}:`, error)
        }
      }

      console.log('🎫 Tickets encontrados:', userTickets.length, 'de', balance, 'esperados')
      setTickets(userTickets)
    } catch (err) {
      console.error('Error cargando tickets:', err)
      setError('Error al cargar los tickets desde la blockchain')
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address, contractAddress, getUserBalance, getTokenByIndex, getTicketInfo])

  // Cargar tickets cuando cambien las dependencias
  useEffect(() => {
    loadTickets()
  }, [loadTickets])

  // Función para refrescar tickets
  const refreshTickets = useCallback(() => {
    loadTickets()
  }, [loadTickets])

  // Funciones de utilidad
  const getTicketByTokenId = useCallback((tokenId: number) => {
    return tickets.find(ticket => ticket.tokenId === tokenId)
  }, [tickets])

  const getTicketsByEvent = useCallback((eventId: number) => {
    return tickets.filter(ticket => ticket.eventId === eventId)
  }, [tickets])

  const getValidTickets = useCallback(() => {
    return tickets.filter(ticket => ticket.isValid)
  }, [tickets])

  const getUsedTickets = useCallback(() => {
    return tickets.filter(ticket => ticket.isUsed)
  }, [tickets])

  return {
    tickets,
    isLoading,
    error,
    refreshTickets,
    getTicketByTokenId,
    getTicketsByEvent,
    getValidTickets,
    getUsedTickets
  }
}
