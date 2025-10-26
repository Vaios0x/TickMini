'use client'

import { useCallback } from 'react'
import { useAccount } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { useBaseAccountCapabilities } from './use-base-account-capabilities'
import { useTicketingNotifications } from './use-ticketing-notifications'

export interface BatchOperation {
  address: string
  abi: any[]
  functionName: string
  args: any[]
  value?: bigint
}

export function useBatchTransactions() {
  const { address } = useAccount()
  const { writeContracts } = useWriteContracts()
  const { atomicBatch, isLoading: capabilitiesLoading } = useBaseAccountCapabilities()
  const { notifyAchievement } = useTicketingNotifications()

  const executeBatch = useCallback(async (operations: BatchOperation[]) => {
    if (!address) {
      throw new Error('No wallet connected')
    }

    if (!atomicBatch) {
      throw new Error('Batch transactions not supported')
    }

    try {
      // Configurar capacidades para batch transactions
      const capabilities = {
        atomicBatch: {
          supported: true
        }
      }

      // Ejecutar batch transaction
      const result = await writeContracts({
        contracts: operations as any,
        capabilities
      })

      notifyAchievement('⚡ Batch transaction ejecutada exitosamente')
      return result

    } catch (error) {
      console.error('Batch transaction failed:', error)
      notifyAchievement('❌ Error en batch transaction')
      throw error
    }
  }, [address, atomicBatch, writeContracts, notifyAchievement])

  // Batch específico para compra de ticket
  const purchaseTicketBatch = useCallback(async (eventId: string, price: string) => {
    const operations: BatchOperation[] = [
      {
        address: '0x...', // Contrato de USDC
        abi: [], // ABI de ERC20
        functionName: 'approve',
        args: ['0x...', price] // Aprobar transferencia
      },
      {
        address: '0x...', // Contrato de tickets
        abi: [], // ABI del contrato
        functionName: 'purchaseTicket',
        args: [eventId, price]
      },
      {
        address: '0x...', // Contrato de NFT
        abi: [], // ABI de ERC721
        functionName: 'mint',
        args: [address, eventId] // Mint NFT ticket
      }
    ]

    return await executeBatch(operations)
  }, [executeBatch, address])

  // Batch específico para crear evento
  const createEventBatch = useCallback(async (eventData: {
    title: string
    description: string
    price: string
    date: string
    location: string
  }) => {
    const operations: BatchOperation[] = [
      {
        address: '0x...', // Contrato de eventos
        abi: [], // ABI del contrato
        functionName: 'createEvent',
        args: [
          eventData.title,
          eventData.description,
          eventData.price,
          eventData.date,
          eventData.location
        ]
      },
      {
        address: '0x...', // Contrato de metadata
        abi: [], // ABI del contrato
        functionName: 'setEventMetadata',
        args: [eventData.title, eventData.description]
      }
    ]

    return await executeBatch(operations)
  }, [executeBatch])

  // Batch específico para transferir ticket
  const transferTicketBatch = useCallback(async (ticketId: string, to: string) => {
    const operations: BatchOperation[] = [
      {
        address: '0x...', // Contrato de tickets
        abi: [], // ABI del contrato
        functionName: 'approve',
        args: [to, ticketId]
      },
      {
        address: '0x...', // Contrato de tickets
        abi: [], // ABI del contrato
        functionName: 'transferFrom',
        args: [address, to, ticketId]
      }
    ]

    return await executeBatch(operations)
  }, [executeBatch, address])

  return {
    executeBatch,
    purchaseTicketBatch,
    createEventBatch,
    transferTicketBatch,
    isBatchSupported: atomicBatch,
    isLoading: capabilitiesLoading,
    canBatch: atomicBatch && address
  }
}
