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
  const createEvent = useCallback(async (eventData: EventData): Promise<string | null> => {
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
        ...(chainId === 84532 ? {
          gas: BigInt(300000),
          maxFeePerGas: BigInt(2000000000), // 2 gwei max fee
          maxPriorityFeePerGas: BigInt(1000000000) // 1 gwei priority fee
        } : {})
      })

      console.log('✅ Evento creado, hash:', hash)
      
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
      console.error('Error creating event:', error)
      setTransactionState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al crear evento' 
      }))
      return null
    }
  }, [isConnected, address, chainId, writeContractAsync])

  // 2. MINTEAR TICKET INDIVIDUAL
  const mintTicket = useCallback(async (ticketData: TicketData): Promise<string | null> => {
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
        ...(chainId === 84532 ? {
          gas: BigInt(500000),
          maxFeePerGas: BigInt(2000000000), // 2 gwei max fee
          maxPriorityFeePerGas: BigInt(1000000000) // 1 gwei priority fee
        } : {})
      })

      console.log('✅ Transacción enviada, hash:', hash)
      
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
      console.error('Error minting ticket:', error)
      setTransactionState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al mintear ticket' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync])

  // 3. MINTEAR MÚLTIPLES TICKETS (BATCH)
  const batchMintTickets = useCallback(async (
    tickets: TicketData[],
    eventId: number
  ): Promise<string | null> => {
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
        ...(chainId === 84532 ? {
          gas: BigInt(800000), // Más gas para batch
          maxFeePerGas: BigInt(2000000000), // 2 gwei max fee
          maxPriorityFeePerGas: BigInt(1000000000) // 1 gwei priority fee
        } : {})
      })

      console.log('✅ Transacción batch enviada, hash:', hash)
      
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
      console.error('Error batch minting tickets:', error)
      setTransactionState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al mintear tickets en lote' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync])

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

  // 5. TRANSFERIR TICKET
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
    resetTransactionState,
    
    // Estados de transacción
    isTransactionLoading: transactionState.isLoading || isWritePending || isConfirming,
    isTransactionSuccess: transactionState.isSuccess || isConfirmed,
    isTransactionError: transactionState.isError,
    transactionError: transactionState.error || writeError?.message,
    transactionHash: transactionState.txHash || writeData
  }
}