'use client'

import { useCallback } from 'react'
import { useAccount } from 'wagmi'
import { useWriteContracts } from 'wagmi/experimental'
import { useBaseAccountCapabilities } from './use-base-account-capabilities'
import { useTicketingNotifications } from './use-ticketing-notifications'

export function useSponsoredTransactions() {
  const { address } = useAccount()
  const { writeContracts } = useWriteContracts()
  const { paymasterService, isLoading: capabilitiesLoading } = useBaseAccountCapabilities()
  const { notifyAchievement } = useTicketingNotifications()

  const createSponsoredTransaction = useCallback(async (contracts: any[]) => {
    if (!address) {
      throw new Error('No wallet connected')
    }

    if (!paymasterService) {
      throw new Error('Paymaster service not available')
    }

    try {
      // Configurar capacidades para transacciones patrocinadas
      const capabilities = {
        paymasterService: {
          url: 'https://api.developer.coinbase.com/rpc/v1/base/v7HqDLjJY4e28qgIDAAN4JNYXnz88mJZ'
        }
      }

      // Ejecutar transacciones patrocinadas
      const result = await writeContracts({
        contracts,
        capabilities
      })

      notifyAchievement('🚀 Transacción patrocinada ejecutada exitosamente')
      return result

    } catch (error) {
      console.error('Sponsored transaction failed:', error)
      notifyAchievement('❌ Error en transacción patrocinada')
      throw error
    }
  }, [address, paymasterService, writeContracts, notifyAchievement])

  const createEventSponsored = useCallback(async (eventData: {
    title: string
    description: string
    price: string
    date: string
    location: string
  }) => {
    const contracts = [
      {
        address: '0x...', // Dirección del contrato de eventos
        abi: [], // ABI del contrato
        functionName: 'createEvent',
        args: [
          eventData.title,
          eventData.description,
          eventData.price,
          eventData.date,
          eventData.location
        ]
      }
    ]

    return await createSponsoredTransaction(contracts)
  }, [createSponsoredTransaction])

  const purchaseTicketSponsored = useCallback(async (eventId: string, price: string) => {
    const contracts = [
      {
        address: '0x...', // Dirección del contrato de tickets
        abi: [], // ABI del contrato
        functionName: 'purchaseTicket',
        args: [eventId, price]
      }
    ]

    return await createSponsoredTransaction(contracts)
  }, [createSponsoredTransaction])

  const batchSponsoredTransaction = useCallback(async (operations: any[]) => {
    if (!paymasterService) {
      throw new Error('Batch transactions require paymaster service')
    }

    const contracts = operations.map(op => ({
      address: op.address,
      abi: op.abi,
      functionName: op.functionName,
      args: op.args
    }))

    return await createSponsoredTransaction(contracts)
  }, [createSponsoredTransaction, paymasterService])

  return {
    createSponsoredTransaction,
    createEventSponsored,
    purchaseTicketSponsored,
    batchSponsoredTransaction,
    isPaymasterSupported: paymasterService,
    isLoading: capabilitiesLoading,
    canSponsor: paymasterService && address
  }
}
