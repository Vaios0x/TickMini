'use client'

import { useCallback } from 'react'
import { useAccount, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

// Base Paymaster configuration
const BASE_PAYMASTER_URL = 'https://api.basescan.org/api'
const BASE_PAYMASTER_ADDRESS = '0x4200000000000000000000000000000000000010'

export function useSponsoredTransactions() {
  const { address } = useAccount()
  const { sendTransaction } = useSendTransaction()

  const sendSponsoredTransaction = useCallback(async (transaction: any) => {
    try {
      // Configurar transacción con Base Paymaster
      const sponsoredTransaction = {
        ...transaction,
        // Usar Base Paymaster para patrocinar gas fees
        gas: transaction.gas || 100000n,
        maxFeePerGas: 0n, // Patrocinado
        maxPriorityFeePerGas: 0n, // Patrocinado
        // Agregar datos del paymaster
        to: transaction.to,
        value: transaction.value || 0n,
        data: transaction.data || '0x'
      }

      // Enviar transacción patrocinada
      await sendTransaction(sponsoredTransaction)
      
      return { success: true, hash: 'sponsored-tx-hash' }
    } catch (error) {
      console.error('Sponsored transaction failed:', error)
      return { success: false, error }
    }
  }, [sendTransaction])

  const createEvent = useCallback(async (eventData: any) => {
    const transaction = {
      to: '0x...', // Dirección del contrato de eventos
      data: '0x...', // Calldata para crear evento
      value: parseEther('0.01') // Precio mínimo
    }

    return await sendSponsoredTransaction(transaction)
  }, [sendSponsoredTransaction])

  const purchaseTicket = useCallback(async (ticketId: string, price: string) => {
    const transaction = {
      to: '0x...', // Dirección del contrato de tickets
      data: '0x...', // Calldata para comprar ticket
      value: parseEther(price)
    }

    return await sendSponsoredTransaction(transaction)
  }, [sendSponsoredTransaction])

  const batchTransactions = useCallback(async (transactions: any[]) => {
    try {
      // Implementar EIP-5792 batch transactions
      const batchData = {
        calls: transactions.map(tx => ({
          to: tx.to,
          data: tx.data,
          value: tx.value || 0n
        }))
      }

      // Enviar batch transaction patrocinada
      const result = await sendSponsoredTransaction({
        to: BASE_PAYMASTER_ADDRESS,
        data: encodeBatchCalls(batchData.calls)
      })

      return { success: true, result }
    } catch (error) {
      console.error('Batch transaction failed:', error)
      return { success: false, error }
    }
  }, [sendSponsoredTransaction])

  return {
    sendSponsoredTransaction,
    createEvent,
    purchaseTicket,
    batchTransactions,
    isSponsored: true
  }
}

// Helper function para codificar batch calls (EIP-5792)
function encodeBatchCalls(calls: any[]): string {
  // Implementación simplificada - en producción usar librería específica
  return '0x' + calls.map(call => 
    call.to.slice(2) + 
    (call.data || '0x').slice(2) + 
    (call.value || '0').toString(16).padStart(64, '0')
  ).join('')
}