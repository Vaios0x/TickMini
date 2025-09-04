'use client'

import { useWriteContract, useReadContract, useAccount, useChainId } from 'wagmi'
import { useState, useCallback } from 'react'
import { VALIDATOR_ABI } from '@/lib/contracts/validator-abi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'

export interface ValidatorState {
  isLoading: boolean
  isError: boolean
  error: string | null
  transactionHash: string | null
  isSuccess: boolean
}

export function useValidator() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { writeContract } = useWriteContract()
  
  const [validatorState, setValidatorState] = useState<ValidatorState>({
    isLoading: false,
    isError: false,
    error: null,
    transactionHash: null,
    isSuccess: false
  })

  // 1. VALIDAR TICKET
  const validateTicket = useCallback(async (tokenId: number): Promise<string | null> => {
    if (!isConnected || !address) {
      setValidatorState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      throw new Error('Wallet no conectado')
    }

    try {
      setValidatorState(prev => ({ ...prev, isLoading: true, error: null, isError: false }))
      console.log('🔍 Validando ticket:', tokenId)
      
      const contractAddress = getContractAddress('VALIDATOR', chainId)
      console.log('📋 Dirección del validator:', contractAddress)
      
      if (!contractAddress) {
        throw new Error('Dirección del validator no configurada para esta red')
      }
      
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: VALIDATOR_ABI,
        functionName: 'validateTicket',
        args: [BigInt(tokenId)]
      })

      console.log('✅ Ticket validado exitosamente')
      return null
      
    } catch (error: any) {
      console.error('Error validating ticket:', error)
      setValidatorState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isError: true, 
        error: error.message || 'Error al validar ticket' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContract])

  // 2. VERIFICAR SI TICKET ESTÁ VALIDADO
  const useIsTicketValidated = (tokenId: number) => {
    const contractAddress = getContractAddress('VALIDATOR', chainId)
    
    return useReadContract({
      address: contractAddress as `0x${string}` || undefined,
      abi: VALIDATOR_ABI,
      functionName: 'isTicketValidated',
      args: tokenId ? [BigInt(tokenId)] : undefined,
      query: {
        enabled: !!contractAddress && !!tokenId
      }
    })
  }

  // 3. VERIFICAR SI DIRECCIÓN ES VALIDADOR
  const useIsValidator = (validatorAddress?: string) => {
    const contractAddress = getContractAddress('VALIDATOR', chainId)
    const addressToCheck = validatorAddress || address
    
    return useReadContract({
      address: contractAddress as `0x${string}` || undefined,
      abi: VALIDATOR_ABI,
      functionName: 'isValidator',
      args: addressToCheck ? [addressToCheck as `0x${string}`] : undefined,
      query: {
        enabled: !!contractAddress && !!addressToCheck
      }
    })
  }

  // 4. OBTENER HISTORIAL DE VALIDACIÓN
  const useValidationHistory = (tokenId: number) => {
    const contractAddress = getContractAddress('VALIDATOR', chainId)
    
    return useReadContract({
      address: contractAddress as `0x${string}` || undefined,
      abi: VALIDATOR_ABI,
      functionName: 'validationHistory',
      args: tokenId ? [BigInt(tokenId)] : undefined,
      query: {
        enabled: !!contractAddress && !!tokenId
      }
    })
  }

  // 5. OBTENER VENTANA DE VALIDACIÓN
  const useValidationWindow = () => {
    const contractAddress = getContractAddress('VALIDATOR', chainId)
    
    return useReadContract({
      address: contractAddress as `0x${string}` || undefined,
      abi: VALIDATOR_ABI,
      functionName: 'validationWindow',
      query: {
        enabled: !!contractAddress
      }
    })
  }

  // Función para resetear el estado
  const resetValidatorState = useCallback(() => {
    setValidatorState({
      isLoading: false,
      isError: false,
      error: null,
      transactionHash: null,
      isSuccess: false
    })
  }, [])

  return {
    // Funciones
    validateTicket,
    resetValidatorState,
    
    // Hooks de lectura
    useIsTicketValidated,
    useIsValidator,
    useValidationHistory,
    useValidationWindow,
    
    // Estado
    ...validatorState
  }
}
