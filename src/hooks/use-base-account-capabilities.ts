'use client'

import { useState, useEffect } from 'react'
import { useAccount, usePublicClient } from 'wagmi'

export interface BaseAccountCapabilities {
  atomicBatch: boolean
  paymasterService: boolean
  auxiliaryFunds: boolean
  isLoading: boolean
  error: string | null
}

export function useBaseAccountCapabilities() {
  const [capabilities, setCapabilities] = useState<BaseAccountCapabilities>({
    atomicBatch: false,
    paymasterService: false,
    auxiliaryFunds: false,
    isLoading: true,
    error: null
  })

  const { address } = useAccount()
  const publicClient = usePublicClient()

  useEffect(() => {
    const detectCapabilities = async () => {
      if (!address || !publicClient) {
        setCapabilities(prev => ({ ...prev, isLoading: false }))
        return
      }

      try {
        setCapabilities(prev => ({ ...prev, isLoading: true, error: null }))

        // Detectar capacidades usando wallet_getCapabilities
        const caps = await publicClient.request({
          method: 'wallet_getCapabilities' as any,
          params: [address]
        })

        // Base Chain ID: 0x2105 (8453)
        const baseChainCapabilities = (caps as any)?.['0x2105'] || {}

        setCapabilities({
          atomicBatch: baseChainCapabilities.atomicBatch?.supported || false,
          paymasterService: baseChainCapabilities.paymasterService?.supported || false,
          auxiliaryFunds: baseChainCapabilities.auxiliaryFunds?.supported || false,
          isLoading: false,
          error: null
        })

      } catch (error) {
        console.error('Error detecting Base Account capabilities:', error)
        setCapabilities(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }))
      }
    }

    detectCapabilities()
  }, [address, publicClient])

  return capabilities
}

// Hook específico para capacidades de paymaster
export function usePaymasterCapabilities() {
  const capabilities = useBaseAccountCapabilities()
  
  return {
    isPaymasterSupported: capabilities.paymasterService,
    isLoading: capabilities.isLoading,
    error: capabilities.error
  }
}

// Hook específico para capacidades de batch
export function useBatchCapabilities() {
  const capabilities = useBaseAccountCapabilities()
  
  return {
    isBatchSupported: capabilities.atomicBatch,
    isLoading: capabilities.isLoading,
    error: capabilities.error
  }
}

// Hook específico para capacidades de fondos auxiliares
export function useAuxiliaryFundsCapabilities() {
  const capabilities = useBaseAccountCapabilities()
  
  return {
    isAuxiliaryFundsSupported: capabilities.auxiliaryFunds,
    isLoading: capabilities.isLoading,
    error: capabilities.error
  }
}
