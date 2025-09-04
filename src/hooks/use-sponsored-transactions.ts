'use client'

import { useAccount, useChainId } from 'wagmi'
import { useState, useCallback } from 'react'
import { parseEther } from 'viem'

export interface SponsoredTransactionOptions {
  gasLimit?: bigint
  maxFeePerGas?: bigint
  maxPriorityFeePerGas?: bigint
  paymasterContext?: any
}

export interface SponsoredCall {
  to: `0x${string}`
  data: `0x${string}`
  value?: bigint
}

export function useSponsoredTransactions() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  
  const [isSponsoredTxLoading, setIsSponsoredTxLoading] = useState(false)
  const [sponsoredTxError, setSponsoredTxError] = useState<string | null>(null)
  const [sponsoredTxHash, setSponsoredTxHash] = useState<string | null>(null)

  // Función para enviar transacciones patrocinadas usando EIP-5792
  const sendSponsoredCalls = useCallback(async (
    calls: SponsoredCall[],
    options?: SponsoredTransactionOptions
  ): Promise<string | null> => {
    if (!isConnected || !address) {
      setSponsoredTxError('Wallet no conectado')
      return null
    }

    try {
      setIsSponsoredTxLoading(true)
      setSponsoredTxError(null)

      // Verificar capacidades de la wallet
      const capabilities = await (window.ethereum as any)?.request({
        method: 'wallet_getCapabilities',
        params: [address]
      })

      console.log('Wallet capabilities:', capabilities)

      // Preparar la llamada patrocinada
      const requestParams = {
        from: address,
        chainId: `0x${chainId.toString(16)}`,
        calls: calls.map(call => ({
          to: call.to,
          data: call.data,
          value: call.value ? `0x${call.value.toString(16)}` : '0x0'
        })),
        capabilities: {
          paymasterService: {
            url: process.env.NEXT_PUBLIC_PAYMASTER_URL || 'https://api.pimlico.io/v2/base-sepolia/rpc',
            context: options?.paymasterContext || {
              mode: 'SPONSORED',
              calculateGasLimits: true,
              expiryDuration: 300,
              sponsorshipInfo: {
                webhookData: {},
                smartAccountInfo: {
                  name: 'TickBase',
                  version: '1.0'
                }
              }
            }
          }
        }
      }

      // Enviar transacción patrocinada
      const result = await (window.ethereum as any)?.request({
        method: 'wallet_sendCalls',
        params: [requestParams]
      })

      if (result) {
        setSponsoredTxHash(result)
        
        // Monitorear estado de la transacción
        const checkStatus = async () => {
          try {
            const status = await (window.ethereum as any)?.request({
              method: 'wallet_getCallsStatus',
              params: [result]
            })
            console.log('Transaction status:', status)
            return status
          } catch (error) {
            console.error('Error checking transaction status:', error)
            return null
          }
        }

        // Verificar estado cada 2 segundos
        const statusInterval = setInterval(async () => {
          const status = await checkStatus()
          if (status && (status.status === 'CONFIRMED' || status.status === 'FAILED')) {
            clearInterval(statusInterval)
            setIsSponsoredTxLoading(false)
            
            if (status.status === 'FAILED') {
              setSponsoredTxError('Transacción patrocinada falló')
            }
          }
        }, 2000)

        return result
      }

      return null
    } catch (error: any) {
      console.error('Error sending sponsored transaction:', error)
      setSponsoredTxError(error.message || 'Error en transacción patrocinada')
      setIsSponsoredTxLoading(false)
      return null
    }
  }, [isConnected, address, chainId])

  // Función específica para crear evento patrocinado
  const createEventSponsored = useCallback(async (
    contractAddress: string,
    eventData: {
      name: string
      description: string
      eventDate: number
      location: string
      totalTickets: number
      metadataURI: string
    }
  ): Promise<string | null> => {
    // Codificar datos de la función createEvent
    const functionSignature = '0x' + 
      // createEvent(string,string,uint256,string,uint256,string)
      'a1c1c8e5' + 
      // Parámetros codificados (simplificado para demo)
      '0'.repeat(192) // Placeholder - en producción usar librería de encoding

    const call: SponsoredCall = {
      to: contractAddress as `0x${string}`,
      data: functionSignature as `0x${string}`,
      value: BigInt(0)
    }

    return await sendSponsoredCalls([call], {
      paymasterContext: {
        mode: 'SPONSORED',
        type: 'event_creation',
        metadata: {
          eventName: eventData.name,
          organizer: address
        }
      }
    })
  }, [sendSponsoredCalls, address])

  // Función específica para comprar ticket patrocinado
  const buyTicketSponsored = useCallback(async (
    contractAddress: string,
    ticketData: {
      eventId: number
      ticketType: number
      price: string
      benefits: string[]
      tokenURI: string
    }
  ): Promise<string | null> => {
    // Codificar datos de la función mintTicket
    const functionSignature = '0x' + 
      // mintTicket(address,uint256,uint256,uint256,string[],string)
      '40c10f19' + 
      // Parámetros codificados (simplificado para demo)
      '0'.repeat(192) // Placeholder - en producción usar librería de encoding

    const call: SponsoredCall = {
      to: contractAddress as `0x${string}`,
      data: functionSignature as `0x${string}`,
      value: parseEther(ticketData.price)
    }

    return await sendSponsoredCalls([call], {
      paymasterContext: {
        mode: 'SPONSORED',
        type: 'ticket_purchase',
        metadata: {
          eventId: ticketData.eventId,
          buyer: address,
          price: ticketData.price
        }
      }
    })
  }, [sendSponsoredCalls, address])

  // Función para transacciones demo gratuitas (DESACTIVADA)
  const executeDemoTransaction = useCallback(async (
    transactionType: 'create_event' | 'buy_ticket' | 'verify_ticket',
    data: any
  ): Promise<string | null> => {
    console.log(`❌ DEMO DESACTIVADO: Usando contratos reales para ${transactionType}`)
    
    setSponsoredTxError('Modo demo desactivado. Usa los contratos reales.')
    setIsSponsoredTxLoading(false)

    // No ejecutar transacciones demo
    return null
  }, [])

  // Verificar si la wallet soporta transacciones patrocinadas
  const checkSponsoredSupport = useCallback(async (): Promise<boolean> => {
    if (!(window.ethereum as any) || !address) return false

    try {
      const capabilities = await (window.ethereum as any).request({
        method: 'wallet_getCapabilities',
        params: [address]
      })

      return !!(capabilities && capabilities.paymasterService)
    } catch (error) {
      console.error('Error checking sponsored transaction support:', error)
      return false
    }
  }, [address])

  // Reset estados
  const resetSponsoredState = useCallback(() => {
    setIsSponsoredTxLoading(false)
    setSponsoredTxError(null)
    setSponsoredTxHash(null)
  }, [])

  return {
    // Estados
    isSponsoredTxLoading,
    sponsoredTxError,
    sponsoredTxHash,
    
    // Funciones generales
    sendSponsoredCalls,
    checkSponsoredSupport,
    resetSponsoredState,
    
    // Funciones específicas
    createEventSponsored,
    buyTicketSponsored,
    executeDemoTransaction,
    
    // Utilidades
    isSupported: checkSponsoredSupport
  }
}