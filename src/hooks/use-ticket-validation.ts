'use client'

import React, { useState, useCallback } from 'react'
import { useWriteContract, useReadContract, useAccount, useChainId } from 'wagmi'
import { parseEther } from 'viem'
import { VALIDATOR_ABI } from '@/lib/contracts/validator-abi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'

export interface ValidationState {
  isLoading: boolean
  isValidating: boolean
  isError: boolean
  error: string | null
  transactionHash: string | null
  isSuccess: boolean
}

export interface ValidationRecord {
  tokenId: number
  validator: string
  validatedAt: number
  isValid: boolean
  notes: string
}

export interface ValidationStats {
  totalValidations: number
  validTickets: number
  invalidTickets: number
  recentValidations: ValidationRecord[]
  validatorPerformance: Record<string, number>
}

export function useTicketValidation() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { writeContract, writeContractAsync } = useWriteContract()
  
  // Estados principales
  const [validationState, setValidationState] = useState<ValidationState>({
    isLoading: false,
    isValidating: false,
    isError: false,
    error: null,
    transactionHash: null,
    isSuccess: false
  })

  const [validationHistory, setValidationHistory] = useState<ValidationRecord[]>([])
  const [validationStats, setValidationStats] = useState<ValidationStats>({
    totalValidations: 0,
    validTickets: 0,
    invalidTickets: 0,
    recentValidations: [],
    validatorPerformance: {}
  })

  // Función para actualizar estadísticas
  const updateValidationStats = useCallback((record: ValidationRecord) => {
    setValidationStats(prev => ({
      totalValidations: prev.totalValidations + 1,
      validTickets: prev.validTickets + (record.isValid ? 1 : 0),
      invalidTickets: prev.invalidTickets + (record.isValid ? 0 : 1),
      recentValidations: [record, ...prev.recentValidations.slice(0, 19)], // Últimos 20
      validatorPerformance: {
        ...prev.validatorPerformance,
        [record.validator]: (prev.validatorPerformance[record.validator] || 0) + 1
      }
    }))
  }, [])

  // 1. VERIFICAR SI USUARIO ES VALIDADOR AUTORIZADO
  const useIsAuthorizedValidator = (validatorAddress?: string) => {
    const contractAddress = getContractAddress('VALIDATOR', chainId)
    const addressToCheck = validatorAddress || address
    
    return useReadContract({
      address: contractAddress as `0x${string}`,
      abi: VALIDATOR_ABI,
      functionName: 'isAuthorizedValidator',
      args: addressToCheck ? [addressToCheck as `0x${string}`] : undefined,
      query: {
        enabled: !!contractAddress && !!addressToCheck
      }
    })
  }

  // 2. VALIDAR TICKET INDIVIDUAL
  const validateTicket = useCallback(async (
    tokenId: number, 
    isValid: boolean, 
    notes: string = ''
  ): Promise<string | null> => {
    if (!isConnected || !address) {
      setValidationState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      throw new Error('Wallet no conectado')
    }

    try {
      setValidationState(prev => ({ ...prev, isValidating: true, error: null, isError: false }))
      console.log('🔍 Validando ticket:', { tokenId, isValid, notes })
      
      const contractAddress = getContractAddress('VALIDATOR', chainId)
      console.log('📋 Dirección del validador:', contractAddress)
      
      if (!contractAddress) {
        throw new Error('Dirección del validador no configurada para esta red')
      }
      
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: VALIDATOR_ABI,
        functionName: 'validateTicket',
        args: [
          BigInt(tokenId),
          isValid,
          notes
        ]
      })

      console.log('✅ Ticket validado, hash:', hash)
      
      if (hash) {
        // Crear registro de validación
        const validationRecord: ValidationRecord = {
          tokenId,
          validator: address,
          validatedAt: Math.floor(Date.now() / 1000),
          isValid,
          notes
        }
        
        // Actualizar historial y estadísticas
        setValidationHistory(prev => [validationRecord, ...prev])
        updateValidationStats(validationRecord)
        
        setValidationState(prev => ({ 
          ...prev, 
          transactionHash: hash,
          isValidating: false,
          isSuccess: true 
        }))
        return hash
      } else {
        throw new Error('No se recibió hash de transacción')
      }
      
    } catch (error: any) {
      console.error('Error validating ticket:', error)
      setValidationState(prev => ({ 
        ...prev, 
        isValidating: false, 
        isError: true, 
        error: error.message || 'Error al validar ticket' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync, updateValidationStats])

  // 3. VALIDACIÓN EN LOTE
  const batchValidateTickets = useCallback(async (
    validations: Array<{ tokenId: number; isValid: boolean; notes?: string }>
  ): Promise<string[]> => {
    if (!isConnected || !address) {
      setValidationState(prev => ({ ...prev, error: 'Wallet no conectado', isError: true }))
      throw new Error('Wallet no conectado')
    }

    try {
      setValidationState(prev => ({ ...prev, isValidating: true, error: null, isError: false }))
      console.log('🔍 Validando tickets en lote:', validations)
      
      const contractAddress = getContractAddress('VALIDATOR', chainId)
      console.log('📋 Dirección del validador:', contractAddress)
      
      if (!contractAddress) {
        throw new Error('Dirección del validador no configurada para esta red')
      }
      
      const tokenIds = validations.map(v => BigInt(v.tokenId))
      const validationResults = validations.map(v => v.isValid)
      const notes = validations.map(v => v.notes || '')
      
      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: VALIDATOR_ABI,
        functionName: 'batchValidateTickets',
        args: [tokenIds, validationResults, notes]
      })

      console.log('✅ Tickets validados en lote, hash:', hash)
      
      if (hash) {
        // Crear registros de validación
        const validationRecords: ValidationRecord[] = validations.map(v => ({
          tokenId: v.tokenId,
          validator: address,
          validatedAt: Math.floor(Date.now() / 1000),
          isValid: v.isValid,
          notes: v.notes || ''
        }))
        
        // Actualizar historial y estadísticas
        setValidationHistory(prev => [...validationRecords, ...prev])
        validationRecords.forEach(updateValidationStats)
        
        setValidationState(prev => ({ 
          ...prev, 
          transactionHash: hash,
          isValidating: false,
          isSuccess: true 
        }))
        return [hash]
      } else {
        throw new Error('No se recibió hash de transacción')
      }
      
    } catch (error: any) {
      console.error('Error batch validating tickets:', error)
      setValidationState(prev => ({ 
        ...prev, 
        isValidating: false, 
        isError: true, 
        error: error.message || 'Error al validar tickets en lote' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync, updateValidationStats])

  // Función para resetear el estado
  const resetValidationState = useCallback(() => {
    setValidationState({
      isLoading: false,
      isValidating: false,
      isError: false,
      error: null,
      transactionHash: null,
      isSuccess: false
    })
  }, [])

  return {
    // Funciones
    validateTicket,
    batchValidateTickets,
    resetValidationState,
    useIsAuthorizedValidator,
    
    // Estados
    validationState,
    validationHistory,
    validationStats,
    
    // Datos calculados
    totalValidations: validationStats.totalValidations,
    validTickets: validationStats.validTickets,
    invalidTickets: validationStats.invalidTickets,
    recentValidations: validationStats.recentValidations,
    validatorPerformance: validationStats.validatorPerformance
  }
}
