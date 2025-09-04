'use client'

import { useWriteContract, useReadContract, useAccount, useChainId, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { useState, useCallback } from 'react'
import { FACTORY_ABI } from '@/lib/contracts/factory-abi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'

export interface EventData {
  name: string
  description: string
  eventDate: number
  location: string
  totalTickets: number
  metadataURI: string
}

export interface TicketTypeData {
  eventId: number
  name: string
  description: string
  price: string
  quantity: number
  benefits: string[]
}

export interface MintTicketsData {
  to: string
  eventId: number
  ticketTypeId: number
  quantity: number
}

export interface FactoryState {
  isLoading: boolean
  isError: boolean
  error: string | null
  transactionHash: string | null
  isSuccess: boolean
}

export function useFactory() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { writeContract, writeContractAsync } = useWriteContract()
  
  const [factoryState, setFactoryState] = useState<FactoryState>({
    isLoading: false,
    isError: false,
    error: null,
    transactionHash: null,
    isSuccess: false
  })

  // 1. CREAR EVENTO
  const createEvent = useCallback(async (eventData: EventData): Promise<string | null> => {
    if (!isConnected || !address) {
      setFactoryState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      throw new Error('Wallet no conectado')
    }

    try {
      setFactoryState(prev => ({ ...prev, isLoading: true, error: null, isError: false }))
      console.log('🏭 Creando evento:', eventData)
      
      const contractAddress = getContractAddress('FACTORY', chainId)
      console.log('📋 Dirección del factory:', contractAddress)
      
      if (!contractAddress) {
        throw new Error('Dirección del factory no configurada para esta red')
      }
      
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: FACTORY_ABI,
        functionName: 'createEvent',
        args: [
          eventData.name,
          eventData.description,
          BigInt(eventData.eventDate),
          eventData.location,
          BigInt(eventData.totalTickets),
          eventData.metadataURI
        ]
      })

      console.log('✅ Evento creado, hash:', hash)
      
      if (hash) {
        setFactoryState(prev => ({ 
          ...prev, 
          transactionHash: hash,
          isLoading: false,
          isSuccess: true 
        }))
        return hash
      } else {
        throw new Error('No se recibió hash de transacción')
      }
      
    } catch (error: any) {
      console.error('Error creating event:', error)
      setFactoryState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al crear evento' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContract])

  // 2. CREAR TIPO DE TICKET
  const createTicketType = useCallback(async (ticketTypeData: TicketTypeData): Promise<string | null> => {
    if (!isConnected || !address) {
      setFactoryState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      throw new Error('Wallet no conectado')
    }

    try {
      setFactoryState(prev => ({ ...prev, isLoading: true, error: null, isError: false }))
      console.log('🎫 Creando tipo de ticket:', ticketTypeData)
      
      const contractAddress = getContractAddress('FACTORY', chainId)
      console.log('📋 Dirección del factory:', contractAddress)
      
      if (!contractAddress) {
        throw new Error('Dirección del factory no configurada para esta red')
      }
      
      const priceInWei = parseEther(ticketTypeData.price)
      
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: FACTORY_ABI,
        functionName: 'createTicketType',
        args: [
          BigInt(ticketTypeData.eventId),
          ticketTypeData.name,
          ticketTypeData.description,
          priceInWei,
          BigInt(ticketTypeData.quantity),
          ticketTypeData.benefits
        ]
      })

      console.log('✅ Tipo de ticket creado, hash:', hash)
      
      if (hash) {
        setFactoryState(prev => ({ 
          ...prev, 
          transactionHash: hash,
          isLoading: false,
          isSuccess: true 
        }))
        return hash
      } else {
        throw new Error('No se recibió hash de transacción')
      }
      
    } catch (error: any) {
      console.error('Error creating ticket type:', error)
      setFactoryState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al crear tipo de ticket' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContract])

  // 3. MINTEAR TICKETS
  const mintTickets = useCallback(async (mintData: MintTicketsData): Promise<string | null> => {
    if (!isConnected || !address) {
      setFactoryState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      throw new Error('Wallet no conectado')
    }

    try {
      setFactoryState(prev => ({ ...prev, isLoading: true, error: null, isError: false }))
      console.log('🎫 Minteando tickets:', mintData)
      
      const contractAddress = getContractAddress('FACTORY', chainId)
      console.log('📋 Dirección del factory:', contractAddress)
      
      if (!contractAddress) {
        throw new Error('Dirección del factory no configurada para esta red')
      }
      
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: FACTORY_ABI,
        functionName: 'mintTickets',
        args: [
          mintData.to as `0x${string}`,
          BigInt(mintData.eventId),
          BigInt(mintData.ticketTypeId),
          BigInt(mintData.quantity)
        ]
      })

      console.log('✅ Tickets minteados, hash:', hash)
      
      if (hash) {
        setFactoryState(prev => ({ 
          ...prev, 
          transactionHash: hash,
          isLoading: false,
          isSuccess: true 
        }))
        return hash
      } else {
        throw new Error('No se recibió hash de transacción')
      }
      
    } catch (error: any) {
      console.error('Error minting tickets:', error)
      setFactoryState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al mintear tickets' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContract])

  // 4. OBTENER DIRECCIÓN DEL TICKET NFT
  const useTicketNFTAddress = () => {
    const contractAddress = getContractAddress('FACTORY', chainId)
    
    return useReadContract({
      address: contractAddress as `0x${string}` || undefined,
      abi: FACTORY_ABI,
      functionName: 'ticketNFT',
      query: {
        enabled: !!contractAddress
      }
    })
  }

  // Función para resetear el estado
  const resetFactoryState = useCallback(() => {
    setFactoryState({
      isLoading: false,
      isError: false,
      error: null,
      transactionHash: null,
      isSuccess: false
    })
  }, [])

  return {
    // Funciones
    createEvent,
    createTicketType,
    mintTickets,
    resetFactoryState,
    
    // Hooks de lectura
    useTicketNFTAddress,
    
    // Estado
    ...factoryState
  }
}
