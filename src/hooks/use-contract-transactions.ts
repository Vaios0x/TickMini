'use client'

import { useWriteContract, useReadContract, useWaitForTransactionReceipt, useAccount, useChainId } from 'wagmi'
import { parseEther, formatEther, parseUnits } from 'viem'
import { useState, useCallback } from 'react'
import { TICKET_NFT_ABI } from '@/lib/contracts/ticket-nft-abi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'

export interface EventData {
  name: string
  description: string
  eventDate: number
  location: string
  totalTickets: number
  metadataURI: string
}

export interface TicketData {
  to: string
  eventId: number
  ticketType: number
  price: string // En ETH como string
  benefits: string[]
  tokenURI: string
}

export interface TransactionState {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: string | null
  txHash: string | null
}

export function useContractTransactions() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  
  const [transactionState, setTransactionState] = useState<TransactionState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    txHash: null
  })

  // Función para obtener configuración de gas optimizada
  const getGasConfig = useCallback((functionName: string) => {
    const baseConfig = {
      maxFeePerGas: BigInt(2000000000), // 2 gwei max fee
      maxPriorityFeePerGas: BigInt(1000000000) // 1 gwei priority fee
    }

    // Configuraciones específicas por función
    const gasLimits = {
      createEvent: BigInt(600000), // Más gas para createEvent
      mintTicket: BigInt(500000), // Gas estándar para mint
      batchMintTickets: BigInt(800000), // Más gas para batch
      useTicket: BigInt(200000), // Menos gas para useTicket
      transferFrom: BigInt(300000), // Gas estándar para transfer
      approve: BigInt(200000) // Menos gas para approve
    }

    return {
      ...baseConfig,
      gas: gasLimits[functionName as keyof typeof gasLimits] || BigInt(500000)
    }
  }, [])

  // Hook para escribir contratos
  const { writeContract, writeContractAsync, data: writeData, isPending: isWritePending, error: writeError } = useWriteContract()
  
  // Hook para esperar confirmación de transacción
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: writeData,
  })

  const resetTransactionState = useCallback(() => {
    setTransactionState({
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
      txHash: null
    })
  }, [])

  // 1. CREAR EVENTO
  const createEvent = useCallback(async (eventData: EventData): Promise<{ hash: string, eventId: number } | null> => {
    if (!isConnected || !address) {
      setTransactionState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      return null
    }

    try {
      setTransactionState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const contractAddress = getContractAddress('TICKET_NFT', chainId)
      
      // Usar writeContractAsync para obtener el hash directamente
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: TICKET_NFT_ABI,
        functionName: 'createEvent',
        args: [
          eventData.name,
          eventData.description,
          BigInt(eventData.eventDate),
          eventData.location,
          BigInt(eventData.totalTickets),
          eventData.metadataURI
        ],
        // Configuración de gas optimizada para Base Sepolia (testnet)
        ...(chainId === 84532 ? getGasConfig('createEvent') : {})
      })

      console.log('✅ Evento creado, hash:', hash)
      
      if (hash) {
        setTransactionState(prev => ({ 
          ...prev, 
          txHash: hash,
          isLoading: false,
          isSuccess: true 
        }))
        
        // Obtener el eventId real del contrato
        // El eventCounter se incrementa en 1 cuando se crea un evento
        // Por ahora usar 1 para eventos de demo, pero en producción deberías leer el eventCounter
        const eventId = 1 // TODO: Leer eventCounter del contrato para obtener el ID real
        
        return { hash, eventId }
      } else {
        throw new Error('No se recibió hash de transacción')
      }
    } catch (error: any) {
      console.error('Error creating event:', error)
      setTransactionState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al crear evento' 
      }))
      return null
    }
  }, [isConnected, address, chainId, writeContractAsync, getGasConfig])

  // 2. MINTEAR TICKET INDIVIDUAL
  const mintTicket = useCallback(async (ticketData: TicketData): Promise<{ hash: string, tokenId: number } | null> => {
    if (!isConnected || !address) {
      setTransactionState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      throw new Error('Wallet no conectado')
    }

    try {
      setTransactionState(prev => ({ ...prev, isLoading: true, error: null, isError: false }))
      console.log('🎫 Iniciando minteo de ticket:', ticketData)
      
      const contractAddress = getContractAddress('TICKET_NFT', chainId)
      console.log('📋 Dirección del contrato:', contractAddress)
      
      if (!contractAddress) {
        throw new Error('Dirección del contrato no configurada para esta red')
      }
      
      const priceInWei = parseEther(ticketData.price)
      
      // Usar writeContractAsync para obtener el hash directamente
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: TICKET_NFT_ABI,
        functionName: 'mintTicket',
        args: [
          ticketData.to as `0x${string}`,
          BigInt(ticketData.eventId),
          BigInt(ticketData.ticketType),
          priceInWei,
          ticketData.benefits,
          ticketData.tokenURI
        ],
        value: priceInWei,
        // Configuración de gas optimizada para Base Sepolia (testnet)
        ...(chainId === 84532 ? getGasConfig('mintTicket') : {})
      })

      console.log('✅ Transacción enviada, hash:', hash)
      
      if (hash) {
        setTransactionState(prev => ({ 
          ...prev, 
          txHash: hash,
          isLoading: false,
          isSuccess: true 
        }))
        
        // Generar un tokenId único basado en timestamp y datos del ticket
        const tokenId = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000)
        
        return { hash, tokenId }
      } else {
        throw new Error('No se recibió hash de transacción')
      }
      
    } catch (error: any) {
      console.error('Error minting ticket:', error)
      setTransactionState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al mintear ticket' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync, getGasConfig])

  // 3. MINTEAR MÚLTIPLES TICKETS (BATCH)
  const batchMintTickets = useCallback(async (
    tickets: TicketData[],
    eventId: number
  ): Promise<{ hash: string, tokenIds: number[] } | null> => {
    if (!isConnected || !address) {
      setTransactionState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      return null
    }

    try {
      setTransactionState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const contractAddress = getContractAddress('TICKET_NFT', chainId)
      
      // Preparar arrays para batch mint
      const addresses = tickets.map(t => t.to as `0x${string}`)
      const ticketTypes = tickets.map(t => BigInt(t.ticketType))
      const prices = tickets.map(t => parseEther(t.price))
      const benefits = tickets.map(t => t.benefits)
      const tokenURIs = tickets.map(t => t.tokenURI)
      
      // Calcular valor total
      const totalValue = prices.reduce((sum, price) => sum + price, BigInt(0))
      
      // Usar writeContractAsync para obtener el hash directamente
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: TICKET_NFT_ABI,
        functionName: 'batchMintTickets',
        args: [
          addresses,
          BigInt(eventId),
          ticketTypes,
          prices,
          benefits,
          tokenURIs
        ],
        value: totalValue,
        // Configuración de gas optimizada para Base Sepolia (testnet)
        ...(chainId === 84532 ? getGasConfig('batchMintTickets') : {})
      })

      console.log('✅ Transacción batch enviada, hash:', hash)
      
      if (hash) {
        setTransactionState(prev => ({ 
          ...prev, 
          txHash: hash,
          isLoading: false,
          isSuccess: true 
        }))
        
        // Generar tokenIds únicos para cada ticket
        const tokenIds = tickets.map((_, i) => Math.floor(Date.now() / 1000) + i + Math.floor(Math.random() * 100))
        
        return { hash, tokenIds }
      } else {
        throw new Error('No se recibió hash de transacción')
      }
    } catch (error: any) {
      console.error('Error batch minting tickets:', error)
      setTransactionState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al mintear tickets en lote' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync, getGasConfig])

  // 4. USAR TICKET (VALIDACIÓN)
  const useTicket = useCallback(async (tokenId: number): Promise<string | null> => {
    if (!isConnected || !address) {
      setTransactionState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      return null
    }

    try {
      setTransactionState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const contractAddress = getContractAddress('TICKET_NFT', chainId)
      
      // Usar writeContractAsync para obtener el hash directamente
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: TICKET_NFT_ABI,
        functionName: 'useTicket',
        args: [BigInt(tokenId)]
      })

      console.log('✅ Ticket usado, hash:', hash)

      if (hash) {
        setTransactionState(prev => ({ 
          ...prev, 
          txHash: hash,
          isLoading: false,
          isSuccess: true 
        }))
        return hash
      } else {
        throw new Error('No se recibió hash de transacción')
      }
    } catch (error: any) {
      console.error('Error using ticket:', error)
      setTransactionState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al usar ticket' 
      }))
      return null
    }
  }, [isConnected, address, chainId, writeContractAsync])

  // 5. CREAR EVENTO ACTIVO POR DEFECTO
  const createDefaultActiveEvent = useCallback(async (): Promise<number | null> => {
    if (!isConnected || !address) {
      return null
    }

    try {
      // Crear un evento activo por defecto
      const eventData = {
        name: 'Evento Activo por Defecto',
        description: 'Evento creado automáticamente para permitir compras',
        eventDate: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 días en el futuro
        location: 'Ubicación por definir',
        totalTickets: 1000,
        metadataURI: `ipfs://QmDefaultEvent${Date.now()}`
      }

      const result = await createEvent(eventData)
      if (result) {
        console.log('✅ Evento activo por defecto creado:', result.eventId)
        return result.eventId
      }
      return null
    } catch (error: any) {
      console.error('Error creando evento por defecto:', error)
      return null
    }
  }, [isConnected, address, createEvent])

  // 6. TRANSFERIR TICKET
  const transferTicket = useCallback(async (
    from: string,
    to: string,
    tokenId: number
  ): Promise<string | null> => {
    if (!isConnected || !address) {
      setTransactionState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      return null
    }

    try {
      setTransactionState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const contractAddress = getContractAddress('TICKET_NFT', chainId)
      
      // Usar writeContractAsync para obtener el hash directamente
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: TICKET_NFT_ABI,
        functionName: 'safeTransferFrom',
        args: [
          from as `0x${string}`,
          to as `0x${string}`,
          BigInt(tokenId)
        ]
      })

      console.log('✅ Ticket transferido, hash:', hash)

      if (hash) {
        setTransactionState(prev => ({ 
          ...prev, 
          txHash: hash,
          isLoading: false,
          isSuccess: true 
        }))
        return hash
      } else {
        throw new Error('No se recibió hash de transacción')
      }
    } catch (error: any) {
      console.error('Error transferring ticket:', error)
      setTransactionState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al transferir ticket' 
      }))
      return null
    }
  }, [isConnected, address, chainId, writeContractAsync])

  // Función para compra completa (crear evento + mintear ticket)
  const purchaseTicket = useCallback(async (eventData: EventData, ticketData: TicketData): Promise<{ hash: string, tokenId: number } | null> => {
    if (!isConnected || !address) {
      setTransactionState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      return null
    }

    try {
      setTransactionState(prev => ({ ...prev, isLoading: true, error: null }))
      
      console.log('🛒 Iniciando compra completa de ticket...')
      
      // Paso 1: Crear evento si es necesario
      let eventId = ticketData.eventId
      if (eventId === 0 || !eventId) {
        console.log('📝 Creando evento...')
        const eventResult = await createEvent(eventData)
        if (!eventResult) {
          throw new Error('Error al crear el evento')
        }
        eventId = eventResult.eventId
        console.log('✅ Evento creado con ID:', eventId)
      }

      // Paso 2: Mintear ticket
      console.log('🎫 Minteando ticket...')
      const ticketResult = await mintTicket({
        ...ticketData,
        eventId: eventId
      })
      
      if (!ticketResult) {
        throw new Error('Error al mintear el ticket')
      }

      console.log('✅ Compra completada exitosamente')
      return ticketResult

    } catch (error: any) {
      console.error('❌ Error en compra completa:', error)
      setTransactionState(prev => ({ 
        ...prev, 
        error: error.message || 'Error en la compra', 
        isError: true,
        isLoading: false
      }))
      return null
    }
  }, [isConnected, address, createEvent, mintTicket])

  return {
    // Estados
    isConnected,
    address,
    chainId,
    transactionState,
    isConfirming,
    isConfirmed,
    
    // Funciones
    createEvent,
    mintTicket,
    batchMintTickets,
    useTicket,
    transferTicket,
    createDefaultActiveEvent,
    purchaseTicket, // Nueva función para compra completa
    resetTransactionState,
    
    // Estados de transacción
    isTransactionLoading: transactionState.isLoading || isWritePending || isConfirming,
    isTransactionSuccess: transactionState.isSuccess || isConfirmed,
    isTransactionError: transactionState.isError,
    transactionError: transactionState.error || writeError?.message,
    transactionHash: transactionState.txHash || writeData
  }
}