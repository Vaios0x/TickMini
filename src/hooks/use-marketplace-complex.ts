'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useWriteContract, useReadContract, useAccount, useChainId, useWaitForTransactionReceipt } from 'wagmi'
import { getPublicClient } from '@wagmi/core'
import { parseEther } from 'viem'
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

export interface MarketplaceListing {
  listingId: number
  seller: string
  nftContract: string
  tokenId: number
  price: string
  isActive: boolean
  createdAt: number
  expiresAt: number
  eventInfo?: {
    eventId: number
    name: string
    description: string
    eventDate: number
    location: string
    organizer: string
  }
  ticketInfo?: {
    ticketType: number
    benefits: string[]
    isTransferable: boolean
  }
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

  const [listings, setListings] = useState<MarketplaceListing[]>([])
  const [myListings, setMyListings] = useState<MarketplaceListing[]>([])
  const [isLoadingListings, setIsLoadingListings] = useState(false)

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

  // 5. OBTENER TODOS LOS LISTINGS ACTIVOS
  const fetchAllListings = useCallback(async (): Promise<MarketplaceListing[]> => {
    if (!isConnected) return []

    try {
      setIsLoadingListings(true)
      console.log('🏪 Obteniendo todos los listings del marketplace')
      
      const contractAddress = getContractAddress('MARKETPLACE', chainId)
      if (!contractAddress) {
        throw new Error('Dirección del marketplace no configurada para esta red')
      }

      // Obtener el número total de listings
      const publicClient = getPublicClient({ chainId })
      const totalListings = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: MARKETPLACE_ABI,
        functionName: 'getTotalListings'
      })

      const fetchedListings: MarketplaceListing[] = []
      
      // Obtener cada listing individualmente
      for (let i = 1; i <= Number(totalListings || 0); i++) {
        try {
          const listing = await publicClient.readContract({
            address: contractAddress as `0x${string}`,
            abi: MARKETPLACE_ABI,
            functionName: 'getListing',
            args: [BigInt(i)]
          })

          if (listing && listing.isActive) {
            fetchedListings.push({
              listingId: Number(listing.listingId),
              seller: listing.seller,
              nftContract: listing.nftContract,
              tokenId: Number(listing.tokenId),
              price: listing.price.toString(),
              isActive: listing.isActive,
              createdAt: Number(listing.createdAt),
              expiresAt: Number(listing.expiresAt)
            })
          }
        } catch (error) {
          console.warn(`Error fetching listing ${i}:`, error)
        }
      }

      setListings(fetchedListings)
      return fetchedListings
      
    } catch (error: any) {
      console.error('Error fetching all listings:', error)
      setMarketplaceState(prev => ({ 
        ...prev, 
        isError: true, 
        error: error.message || 'Error al obtener listings' 
      }))
      return []
    } finally {
      setIsLoadingListings(false)
    }
  }, [isConnected, chainId])

  // 6. OBTENER MIS LISTINGS
  const fetchMyListings = useCallback(async (): Promise<MarketplaceListing[]> => {
    if (!isConnected || !address) return []

    try {
      setIsLoadingListings(true)
      console.log('👤 Obteniendo mis listings')
      
      const contractAddress = getContractAddress('MARKETPLACE', chainId)
      if (!contractAddress) {
        throw new Error('Dirección del marketplace no configurada para esta red')
      }

      const publicClient = getPublicClient({ chainId })
      const sellerListingIds = await publicClient.readContract({
        address: contractAddress as `0x${string}`,
        abi: MARKETPLACE_ABI,
        functionName: 'getSellerListings',
        args: [address]
      })

      const fetchedMyListings: MarketplaceListing[] = []
      
      if (sellerListingIds && Array.isArray(sellerListingIds)) {
        for (const listingId of sellerListingIds) {
          try {
            const listing = await publicClient.readContract({
              address: contractAddress as `0x${string}`,
              abi: MARKETPLACE_ABI,
              functionName: 'getListing',
              args: [listingId]
            })

            if (listing) {
              fetchedMyListings.push({
                listingId: Number(listing.listingId),
                seller: listing.seller,
                nftContract: listing.nftContract,
                tokenId: Number(listing.tokenId),
                price: listing.price.toString(),
                isActive: listing.isActive,
                createdAt: Number(listing.createdAt),
                expiresAt: Number(listing.expiresAt)
              })
            }
          } catch (error) {
            console.warn(`Error fetching my listing ${listingId}:`, error)
          }
        }
      }

      setMyListings(fetchedMyListings)
      return fetchedMyListings
      
    } catch (error: any) {
      console.error('Error fetching my listings:', error)
      setMarketplaceState(prev => ({ 
        ...prev, 
        isError: true, 
        error: error.message || 'Error al obtener mis listings' 
      }))
      return []
    } finally {
      setIsLoadingListings(false)
    }
  }, [isConnected, address, chainId])

  // 7. FILTRAR LISTINGS
  const filterListings = useCallback((
    listings: MarketplaceListing[], 
    filters: {
      minPrice?: string
      maxPrice?: string
      eventName?: string
      seller?: string
      category?: string
    }
  ): MarketplaceListing[] => {
    return listings.filter(listing => {
      // Filtro por precio mínimo
      if (filters.minPrice && parseFloat(listing.price) < parseFloat(filters.minPrice)) {
        return false
      }
      
      // Filtro por precio máximo
      if (filters.maxPrice && parseFloat(listing.price) > parseFloat(filters.maxPrice)) {
        return false
      }
      
      // Filtro por nombre del evento
      if (filters.eventName && listing.eventInfo) {
        if (!listing.eventInfo.name.toLowerCase().includes(filters.eventName.toLowerCase())) {
          return false
        }
      }
      
      // Filtro por vendedor
      if (filters.seller && !listing.seller.toLowerCase().includes(filters.seller.toLowerCase())) {
        return false
      }
      
      return true
    })
  }, [])

  // 8. ORDENAR LISTINGS
  const sortListings = useCallback((
    listings: MarketplaceListing[], 
    sortBy: 'price-asc' | 'price-desc' | 'date-new' | 'date-old' | 'expires-soon'
  ): MarketplaceListing[] => {
    return [...listings].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return parseFloat(a.price) - parseFloat(b.price)
        case 'price-desc':
          return parseFloat(b.price) - parseFloat(a.price)
        case 'date-new':
          return b.createdAt - a.createdAt
        case 'date-old':
          return a.createdAt - b.createdAt
        case 'expires-soon':
          return a.expiresAt - b.expiresAt
        default:
          return 0
      }
    })
  }, [])

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

  // Auto-fetch listings cuando se conecta la wallet
  useEffect(() => {
    if (isConnected && address) {
      fetchAllListings()
      fetchMyListings()
    }
  }, [isConnected, address, fetchAllListings, fetchMyListings])

  return {
    // Funciones de transacciones
    listTicket,
    buyTicket,
    cancelListing,
    updateListingPrice,
    resetMarketplaceState,
    
    // Funciones de consulta
    fetchAllListings,
    fetchMyListings,
    filterListings,
    sortListings,
    
    // Estado de transacciones
    ...marketplaceState,
    
    // Estado de listings
    listings,
    myListings,
    isLoadingListings
  }
}
