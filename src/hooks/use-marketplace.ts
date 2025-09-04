'use client'

import { useWriteContract, useReadContract, useAccount, useChainId, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { useState, useCallback } from 'react'
import { MARKETPLACE_ABI } from '@/lib/contracts/marketplace-abi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'

export interface ListingData {
  tokenId: number
  price: string
  expiresAt: number
}

export interface MarketplaceState {
  isLoading: boolean
  isError: boolean
  error: string | null
  transactionHash: string | null
  isSuccess: boolean
}

export function useMarketplace() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { writeContract, writeContractAsync } = useWriteContract()
  
  const [marketplaceState, setMarketplaceState] = useState<MarketplaceState>({
    isLoading: false,
    isError: false,
    error: null,
    transactionHash: null,
    isSuccess: false
  })

  // 1. LISTAR TICKET PARA VENTA
  const listTicket = useCallback(async (listingData: ListingData): Promise<string | null> => {
    if (!isConnected || !address) {
      setMarketplaceState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      throw new Error('Wallet no conectado')
    }

    try {
      setMarketplaceState(prev => ({ ...prev, isLoading: true, error: null, isError: false }))
      console.log('🏪 Iniciando listado de ticket:', listingData)
      
      const contractAddress = getContractAddress('MARKETPLACE', chainId)
      console.log('📋 Dirección del marketplace:', contractAddress)
      
      if (!contractAddress) {
        throw new Error('Dirección del marketplace no configurada para esta red')
      }
      
      const priceInWei = parseEther(listingData.price)
      
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: MARKETPLACE_ABI,
        functionName: 'listTicket',
        args: [
          BigInt(listingData.tokenId),
          priceInWei,
          BigInt(listingData.expiresAt)
        ]
      })

      console.log('✅ Ticket listado, hash:', hash)
      
      if (hash) {
        setMarketplaceState(prev => ({ 
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
      console.error('Error listing ticket:', error)
      setMarketplaceState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al listar ticket' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync])

  // 2. COMPRAR TICKET
  const buyTicket = useCallback(async (listingId: number, price: string): Promise<string | null> => {
    if (!isConnected || !address) {
      setMarketplaceState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      throw new Error('Wallet no conectado')
    }

    try {
      setMarketplaceState(prev => ({ ...prev, isLoading: true, error: null, isError: false }))
      console.log('🛒 Comprando ticket:', { listingId, price })
      
      const contractAddress = getContractAddress('MARKETPLACE', chainId)
      console.log('📋 Dirección del marketplace:', contractAddress)
      
      if (!contractAddress) {
        throw new Error('Dirección del marketplace no configurada para esta red')
      }
      
      const priceInWei = parseEther(price)
      
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: MARKETPLACE_ABI,
        functionName: 'buyTicket',
        args: [BigInt(listingId)],
        value: priceInWei
      })

      console.log('✅ Ticket comprado, hash:', hash)
      
      if (hash) {
        setMarketplaceState(prev => ({ 
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
      console.error('Error buying ticket:', error)
      setMarketplaceState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al comprar ticket' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync])

  // 3. CANCELAR LISTADO
  const cancelListing = useCallback(async (listingId: number): Promise<string | null> => {
    if (!isConnected || !address) {
      setMarketplaceState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      throw new Error('Wallet no conectado')
    }

    try {
      setMarketplaceState(prev => ({ ...prev, isLoading: true, error: null, isError: false }))
      console.log('❌ Cancelando listado:', listingId)
      
      const contractAddress = getContractAddress('MARKETPLACE', chainId)
      console.log('📋 Dirección del marketplace:', contractAddress)
      
      if (!contractAddress) {
        throw new Error('Dirección del marketplace no configurada para esta red')
      }
      
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: MARKETPLACE_ABI,
        functionName: 'cancelListing',
        args: [BigInt(listingId)]
      })

      console.log('✅ Listado cancelado, hash:', hash)
      
      if (hash) {
        setMarketplaceState(prev => ({ 
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
      console.error('Error canceling listing:', error)
      setMarketplaceState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al cancelar listado' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync])

  // 4. ACTUALIZAR PRECIO
  const updateListingPrice = useCallback(async (listingId: number, newPrice: string): Promise<string | null> => {
    if (!isConnected || !address) {
      setMarketplaceState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      throw new Error('Wallet no conectado')
    }

    try {
      setMarketplaceState(prev => ({ ...prev, isLoading: true, error: null, isError: false }))
      console.log('💰 Actualizando precio:', { listingId, newPrice })
      
      const contractAddress = getContractAddress('MARKETPLACE', chainId)
      console.log('📋 Dirección del marketplace:', contractAddress)
      
      if (!contractAddress) {
        throw new Error('Dirección del marketplace no configurada para esta red')
      }
      
      const priceInWei = parseEther(newPrice)
      
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: MARKETPLACE_ABI,
        functionName: 'updateListingPrice',
        args: [BigInt(listingId), priceInWei]
      })

      console.log('✅ Precio actualizado, hash:', hash)
      
      if (hash) {
        setMarketplaceState(prev => ({ 
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
      console.error('Error updating price:', error)
      setMarketplaceState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al actualizar precio' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync])

  // Función para resetear el estado
  const resetMarketplaceState = useCallback(() => {
    setMarketplaceState({
      isLoading: false,
      isError: false,
      error: null,
      transactionHash: null,
      isSuccess: false
    })
  }, [])

  return {
    // Funciones
    listTicket,
    buyTicket,
    cancelListing,
    updateListingPrice,
    resetMarketplaceState,
    
    // Estado
    ...marketplaceState
  }
}
