'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { useWriteContract, useReadContract, useAccount, useChainId, useWaitForTransactionReceipt } from 'wagmi'
import { getPublicClient } from '@wagmi/core'
import { parseEther, formatEther } from 'viem'
import { VALIDATOR_ABI } from '@/lib/contracts/validator-abi'
import { TICKET_NFT_ABI } from '@/lib/contracts/ticket-nft-abi'
import { getContractAddress } from '@/lib/contracts/contract-addresses'

// Interfaces para tipos de validación
export interface ValidationRecord {
  tokenId: number
  validator: string
  validatedAt: number
  isValid: boolean
  notes: string
}

export interface TicketValidationInfo {
  tokenId: number
  isValidated: boolean
  isWithinWindow: boolean
  lastValidation?: ValidationRecord
  totalValidations: number
  ticketStatus: 'valid' | 'used' | 'expired' | 'invalid'
  eventInfo: {
    eventId: number
    name: string
    eventDate: number
    location: string
    organizer: string
  }
  ticketInfo: {
    owner: string
    price: string
    ticketType: number
    benefits: string[]
    purchaseDate: number
  }
}

export interface ValidationStats {
  totalValidations: number
  validTickets: number
  invalidTickets: number
  recentValidations: ValidationRecord[]
  validatorPerformance: {
    [validator: string]: number
  }
}

export interface ValidationState {
  isLoading: boolean
  isValidating: boolean
  isError: boolean
  error: string | null
  transactionHash: string | null
  isSuccess: boolean
}

export interface QRScanResult {
  tokenId: number
  eventId?: number
  contractAddress?: string
  signature?: string
}

// Hook principal para gestión completa de validación
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

  const [scannedTickets, setScannedTickets] = useState<QRScanResult[]>([])
  const [currentTicketInfo, setCurrentTicketInfo] = useState<TicketValidationInfo | null>(null)

  // Función para actualizar estadísticas (declarada temprano para evitar problemas de orden)
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

  // PASO 1: VERIFICAR SI USUARIO ES VALIDADOR AUTORIZADO
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

  // PASO 2: OBTENER INFORMACIÓN COMPLETA DE UN TICKET
  const getTicketValidationInfo = useCallback(async (tokenId: number): Promise<TicketValidationInfo | null> => {
    if (!tokenId) return null

    try {
      setValidationState(prev => ({ ...prev, isLoading: true, error: null }))

      const validatorAddress = getContractAddress('VALIDATOR', chainId)
      const nftAddress = getContractAddress('TICKET_NFT', chainId)

      if (!validatorAddress || !nftAddress) {
        throw new Error('Direcciones de contratos no configuradas')
      }

      // Obtener información de validación del contrato
      const publicClient = getPublicClient({ chainId })
      const validationInfo = await publicClient.readContract({
        address: validatorAddress as `0x${string}`,
        abi: VALIDATOR_ABI,
        functionName: 'getTicketValidationInfo',
        args: [BigInt(tokenId)]
      })

      // Obtener información del ticket NFT
      const ticketInfo = await publicClient.readContract({
        address: nftAddress as `0x${string}`,
        abi: TICKET_NFT_ABI,
        functionName: 'getTicket',
        args: [BigInt(tokenId)]
      })

      // Obtener información del evento
      const eventInfo = await publicClient.readContract({
        address: nftAddress as `0x${string}`,
        abi: TICKET_NFT_ABI,
        functionName: 'getEvent',
        args: [BigInt(ticketInfo.eventId)]
      })

      // Construir información completa
      const completeInfo: TicketValidationInfo = {
        tokenId,
        isValidated: validationInfo.isValidated,
        isWithinWindow: Date.now() < (Number(eventInfo.eventDate) + 86400) * 1000, // 24h después del evento
        totalValidations: Number(validationInfo.totalValidations),
        ticketStatus: determineTicketStatus(ticketInfo, eventInfo),
        lastValidation: validationInfo.totalValidations > 0 ? {
          tokenId,
          validator: validationInfo.lastValidation.validator,
          validatedAt: Number(validationInfo.lastValidation.validatedAt),
          isValid: validationInfo.lastValidation.isValid,
          notes: validationInfo.lastValidation.notes
        } : undefined,
        eventInfo: {
          eventId: Number(eventInfo.eventId),
          name: eventInfo.name,
          eventDate: Number(eventInfo.eventDate),
          location: eventInfo.location,
          organizer: eventInfo.organizer
        },
        ticketInfo: {
          owner: await publicClient.readContract({
            address: nftAddress as `0x${string}`,
            abi: TICKET_NFT_ABI,
            functionName: 'ownerOf',
            args: [BigInt(tokenId)]
          }),
          price: formatEther(ticketInfo.price),
          ticketType: Number(ticketInfo.ticketType),
          benefits: ticketInfo.benefits,
          purchaseDate: Number(ticketInfo.purchaseDate)
        }
      }

      setCurrentTicketInfo(completeInfo)
      return completeInfo

    } catch (error: any) {
      console.error('Error obteniendo información del ticket:', error)
      setValidationState(prev => ({
        ...prev,
        isError: true,
        error: error.message || 'Error al obtener información del ticket',
        isLoading: false
      }))
      return null
    } finally {
      setValidationState(prev => ({ ...prev, isLoading: false }))
    }
  }, [chainId])

  // PASO 3: VALIDAR UN TICKET INDIVIDUAL
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
      setValidationState(prev => ({ 
        ...prev, 
        isValidating: true, 
        error: null, 
        isError: false 
      }))

      console.log('🔍 Validando ticket:', { tokenId, isValid, notes })
      
      const contractAddress = getContractAddress('VALIDATOR', chainId)
      if (!contractAddress) {
        throw new Error('Dirección del validador no configurada')
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

      // Crear registro local
      const validationRecord: ValidationRecord = {
        tokenId,
        validator: address,
        validatedAt: Math.floor(Date.now() / 1000),
        isValid,
        notes
      }

      // Actualizar historial local
      setValidationHistory(prev => [validationRecord, ...prev])

      // Actualizar estadísticas
      updateValidationStats(validationRecord)

      setValidationState(prev => ({ 
        ...prev, 
        transactionHash: hash,
        isValidating: false,
        isSuccess: true 
      }))

      return hash

    } catch (error: any) {
      console.error('Error validando ticket:', error)
      setValidationState(prev => ({ 
        ...prev, 
        isValidating: false, 
        isError: true, 
        error: error.message || 'Error al validar ticket' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync, updateValidationStats])

  // PASO 4: VALIDACIÓN EN LOTE
  const batchValidateTickets = useCallback(async (
    validations: Array<{ tokenId: number, isValid: boolean, notes: string }>
  ): Promise<string | null> => {
    if (!isConnected || !address) {
      throw new Error('Wallet no conectado')
    }

    try {
      setValidationState(prev => ({ 
        ...prev, 
        isValidating: true, 
        error: null, 
        isError: false 
      }))

      const contractAddress = getContractAddress('VALIDATOR', chainId)
      if (!contractAddress) {
        throw new Error('Dirección del validador no configurada')
      }

      const tokenIds = validations.map(v => BigInt(v.tokenId))
      const isValidArray = validations.map(v => v.isValid)
      const notesArray = validations.map(v => v.notes)

      const hash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: VALIDATOR_ABI,
        functionName: 'batchValidateTickets',
        args: [tokenIds, isValidArray, notesArray]
      })

      console.log('✅ Validación en lote completada, hash:', hash)

      // Actualizar historial local
      const newRecords: ValidationRecord[] = validations.map(v => ({
        tokenId: v.tokenId,
        validator: address,
        validatedAt: Math.floor(Date.now() / 1000),
        isValid: v.isValid,
        notes: v.notes
      }))

      setValidationHistory(prev => [...newRecords, ...prev])

      // Actualizar estadísticas
      newRecords.forEach(updateValidationStats)

      setValidationState(prev => ({ 
        ...prev, 
        transactionHash: hash,
        isValidating: false,
        isSuccess: true 
      }))

      return hash

    } catch (error: any) {
      console.error('Error en validación en lote:', error)
      setValidationState(prev => ({ 
        ...prev, 
        isValidating: false, 
        isError: true, 
        error: error.message || 'Error en validación en lote' 
      }))
      throw error
    }
  }, [isConnected, address, chainId, writeContractAsync, updateValidationStats])

  // PASO 5: PROCESAMIENTO DE CÓDIGOS QR
  const processQRCode = useCallback((qrData: string): QRScanResult | null => {
    try {
      // Formato esperado: "tickbase:tokenId:eventId:signature" o JSON
      let result: QRScanResult

      if (qrData.startsWith('tickbase:')) {
        // Formato simple
        const parts = qrData.split(':')
        result = {
          tokenId: parseInt(parts[1]),
          eventId: parts[2] ? parseInt(parts[2]) : undefined,
          signature: parts[3] || undefined
        }
      } else if (qrData.startsWith('{')) {
        // Formato JSON
        const parsed = JSON.parse(qrData)
        result = {
          tokenId: parsed.tokenId || parsed.id,
          eventId: parsed.eventId,
          contractAddress: parsed.contract,
          signature: parsed.signature
        }
      } else {
        // Asumir que es solo el tokenId
        result = {
          tokenId: parseInt(qrData)
        }
      }

      if (isNaN(result.tokenId)) {
        throw new Error('Token ID inválido')
      }

      // Agregar a lista de tickets escaneados
      setScannedTickets(prev => {
        const exists = prev.find(t => t.tokenId === result.tokenId)
        if (exists) return prev
        return [result, ...prev.slice(0, 9)] // Mantener últimos 10
      })

      return result

    } catch (error) {
      console.error('Error procesando QR:', error)
      setValidationState(prev => ({
        ...prev,
        error: 'Código QR inválido',
        isError: true
      }))
      return null
    }
  }, [])

  // PASO 6: FUNCIONES DE ESTADÍSTICAS Y ANÁLISIS

  // PASO 7: OBTENER HISTORIAL COMPLETO DEL CONTRATO
  const fetchValidationHistory = useCallback(async (tokenId?: number) => {
    try {
      setValidationState(prev => ({ ...prev, isLoading: true }))

      const contractAddress = getContractAddress('VALIDATOR', chainId)
      if (!contractAddress) return

      if (tokenId) {
        // Obtener historial de un ticket específico
        const publicClient = getPublicClient({ chainId })
        const history = await publicClient.readContract({
          address: contractAddress as `0x${string}`,
          abi: VALIDATOR_ABI,
          functionName: 'getValidationHistory',
          args: [BigInt(tokenId)]
        })

        const formattedHistory: ValidationRecord[] = history.map((record: any) => ({
          tokenId: Number(record.tokenId),
          validator: record.validator,
          validatedAt: Number(record.validatedAt),
          isValid: record.isValid,
          notes: record.notes
        }))

        setValidationHistory(formattedHistory)
      }

    } catch (error) {
      console.error('Error obteniendo historial:', error)
    } finally {
      setValidationState(prev => ({ ...prev, isLoading: false }))
    }
  }, [chainId])

  // PASO 8: FUNCIONES AUXILIARES
  const determineTicketStatus = (ticketInfo: any, eventInfo: any): 'valid' | 'used' | 'expired' | 'invalid' => {
    const now = Date.now() / 1000
    const eventDate = Number(eventInfo.eventDate)

    if (now > eventDate + 86400) return 'expired' // 24h después del evento
    if (!eventInfo.isActive) return 'invalid'
    // Aquí podrías agregar más lógica para determinar si está usado
    return 'valid'
  }

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

  // PASO 9: FUNCIONES DE EXPORTACIÓN Y UTILIDADES
  const exportValidationData = useCallback((format: 'json' | 'csv' = 'json') => {
    const data = {
      stats: validationStats,
      history: validationHistory,
      scannedTickets,
      exportDate: new Date().toISOString()
    }

    let content: string
    let filename: string

    if (format === 'json') {
      content = JSON.stringify(data, null, 2)
      filename = `validation-data-${new Date().toISOString().split('T')[0]}.json`
    } else {
      // CSV format
      const csv = [
        'TokenID,Validator,ValidatedAt,IsValid,Notes',
        ...validationHistory.map(record => 
          `${record.tokenId},${record.validator},${new Date(record.validatedAt * 1000).toISOString()},${record.isValid},"${record.notes}"`
        )
      ].join('\n')
      content = csv
      filename = `validation-data-${new Date().toISOString().split('T')[0]}.csv`
    }

    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }, [validationStats, validationHistory, scannedTickets])

  // Auto-fetch data cuando se conecta la wallet
  useEffect(() => {
    if (isConnected && address) {
      fetchValidationHistory()
    }
  }, [isConnected, address, fetchValidationHistory])

  return {
    // Estados principales
    ...validationState,
    validationHistory,
    validationStats,
    scannedTickets,
    currentTicketInfo,

    // Funciones principales
    getTicketValidationInfo,
    validateTicket,
    batchValidateTickets,
    processQRCode,
    fetchValidationHistory,
    resetValidationState,
    exportValidationData,

    // Hooks de lectura
    useIsAuthorizedValidator,

    // Funciones de utilidad
    clearScannedTickets: () => setScannedTickets([]),
    clearHistory: () => setValidationHistory([]),
    clearStats: () => setValidationStats({
      totalValidations: 0,
      validTickets: 0,
      invalidTickets: 0,
      recentValidations: [],
      validatorPerformance: {}
    })
  }
}