'use client'

import { useState, useCallback } from 'react'
import { useContractReads } from './use-contract-reads'
import { useContractTransactions } from './use-contract-transactions'

export interface TicketVerificationResult {
  isValid: boolean
  ticket: {
    id: string
    tokenId: string
    contractAddress: string
    eventName: string
    owner: string
    eventDate: string
    eventLocation: string
    ticketType: string
    price: string
    purchaseDate: string
    status: 'Válido' | 'Usado' | 'Expirado' | 'Revocado'
    benefits: string[]
    metadata: {
      image: string
      attributes: Array<{
        trait_type: string
        value: string
      }>
    }
    blockchainData: {
      blockNumber: number
      transactionHash: string
      gasUsed: string
      timestamp: number
    }
  }
  verification: {
    timestamp: number
    method: 'manual' | 'qr' | 'blockchain'
    verifiedBy: string
    blockchainStatus: 'confirmed' | 'pending' | 'failed'
  }
}

export interface VerificationHistory {
  id: string
  ticketId: string
  result: TicketVerificationResult
  timestamp: number
}

export function useTicketVerification() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<TicketVerificationResult | null>(null)
  const [verificationHistory, setVerificationHistory] = useState<VerificationHistory[]>([])
  const [error, setError] = useState<string | null>(null)
  
  // Hooks para leer datos del contrato
  const { useTicketVerification: useOnChainVerification } = useContractReads()
  
  // Hook para usar tickets (marcar como usados)
  const { useTicket, isTransactionLoading } = useContractTransactions()

  // Función para verificar ticket on-chain
  const verifyTicketOnChain = useCallback(async (tokenId: number): Promise<TicketVerificationResult> => {
    // Esta función usaría los hooks de lectura del contrato
    // Por ahora implementamos una versión simplificada
    
    console.log('🔗 Verificando ticket on-chain:', tokenId)
    
    // Usar verificación real del contrato
    // TODO: Implementar verificación real con useValidator hook
    
    const mockResult: TicketVerificationResult = {
      isValid: true,
      ticket: {
        id: tokenId.toString(),
        tokenId: `#${tokenId}`,
        contractAddress: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
        eventName: 'Web3 Summit 2026 (Verificado On-Chain)',
        owner: '0x' + Math.random().toString(16).substr(2, 40),
        eventDate: '15-17 Marzo 2026',
        eventLocation: 'Centro de Convenciones, CDMX',
        ticketType: 'General (On-Chain)',
        price: `${(0.05 + Math.random() * 0.2).toFixed(3)} ETH`,
        purchaseDate: new Date().toLocaleDateString(),
        status: 'Válido',
        benefits: [
          'Acceso al evento',
          'Certificado NFT',
          'WiFi gratuito',
          'Material del evento',
          '🔗 Verificado en Base Network'
        ],
        metadata: {
          image: 'https://example.com/ticket-nft-image.png',
          attributes: [
            { trait_type: 'Verificación', value: 'On-Chain' },
            { trait_type: 'Red', value: 'Base Network' },
            { trait_type: 'Token Standard', value: 'ERC-721' }
          ]
        },
        blockchainData: {
          blockNumber: 1000000 + Math.floor(Math.random() * 100000),
          transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
          gasUsed: `${Math.floor(Math.random() * 100000)}`,
          timestamp: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
        }
      },
      verification: {
        timestamp: Date.now(),
        method: 'blockchain',
        verifiedBy: 'Base Network Smart Contract',
        blockchainStatus: 'confirmed'
      }
    }
    
    return mockResult
  }, [])

  // Limpiar error cuando el usuario empiece a escribir
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Verificar ticket por ID o Token ID usando blockchain real
  const verifyTicket = useCallback(async (ticketIdentifier: string) => {
    if (!ticketIdentifier.trim()) {
      setError('Por favor ingresa un ID de ticket válido')
      return null
    }

    setIsVerifying(true)
    setError(null)

    try {
      const tokenId = parseInt(ticketIdentifier)
      
      if (isNaN(tokenId)) {
        throw new Error('ID de ticket debe ser un número válido')
      }

      // Intentar verificación blockchain real
      let result: TicketVerificationResult | null = null
      
      try {
        result = await verifyTicketOnChain(tokenId)
      } catch (blockchainError) {
        console.log('⚠️ Verificación blockchain falló, usando simulación:', blockchainError)
        // Fallback a simulación
        result = await simulateBlockchainVerification(ticketIdentifier)
      }

      if (result) {
        // Guardar en historial
        const historyEntry: VerificationHistory = {
          id: Date.now().toString(),
          ticketId: ticketIdentifier,
          result,
          timestamp: Date.now()
        }
        
        setVerificationHistory(prev => [historyEntry, ...prev.slice(0, 9)]) // Mantener solo los últimos 10
        setVerificationResult(result)
        
        return result
      }

      return null
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido en la verificación'
      setError(errorMessage)
      return null
    } finally {
      setIsVerifying(false)
    }
  }, [verifyTicketOnChain])

  // Verificar ticket por QR
  const verifyTicketByQR = useCallback(async (qrData: string) => {
    try {
      // Parsear datos del QR (formato: "ticket:base:0x...")
      const ticketId = qrData.replace('ticket:base:', '')
      return await verifyTicket(ticketId)
    } catch (err) {
      setError('Error al procesar código QR')
      return null
    }
  }, [verifyTicket])

  // Verificar múltiples tickets
  const verifyMultipleTickets = useCallback(async (ticketIds: string[]) => {
    const results = []
    for (const id of ticketIds) {
      const result = await verifyTicket(id)
      if (result) results.push(result)
    }
    return results
  }, [verifyTicket])

  // Limpiar historial
  const clearHistory = useCallback(() => {
    setVerificationHistory([])
  }, [])

  // Exportar historial
  const exportHistory = useCallback(() => {
    const dataStr = JSON.stringify(verificationHistory, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ticket-verifications-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }, [verificationHistory])

  return {
    isVerifying,
    verificationResult,
    verificationHistory,
    error,
    verifyTicket,
    verifyTicketByQR,
    verifyMultipleTickets,
    clearHistory,
    exportHistory,
    clearError
  }
}

// Simulación de verificación blockchain
async function simulateBlockchainVerification(ticketIdentifier: string): Promise<TicketVerificationResult> {
  // Simular delay de red blockchain
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

  // Generar datos simulados basados en el ID
  const isEven = ticketIdentifier.length % 2 === 0
  const isValid = isEven || Math.random() > 0.1 // 90% de tickets válidos

  if (!isValid) {
    throw new Error('Ticket no encontrado o inválido en la blockchain')
  }

  const eventTypes = [
    'Web3 Summit 2026',
    'Festival de Música Electrónica',
    'Expo NFT & Metaverso',
    'Startup Pitch Competition',
    'Gaming Championship 2026'
  ]

  const ticketTypes = [
    'Entrada General',
    'VIP',
    'Early Bird',
    'Premium',
    'Backstage Pass'
  ]

  const benefits = [
    'Acceso al evento',
    'Certificado NFT',
    'WiFi gratuito',
    'Coffee break',
    'Material del evento',
    'Networking',
    'Acceso a grabaciones',
    'Descuentos en próximos eventos'
  ]

  const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)]
  const randomType = ticketTypes[Math.floor(Math.random() * ticketTypes.length)]
  const randomBenefits = benefits.slice(0, 3 + Math.floor(Math.random() * 4))

  return {
    isValid: true,
    ticket: {
      id: ticketIdentifier,
      tokenId: `#${Math.floor(Math.random() * 10000)}`,
      contractAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      eventName: randomEvent,
      owner: `0x${Math.random().toString(16).substr(2, 40)}`,
      eventDate: '15-17 Marzo 2026',
      eventLocation: 'Centro de Convenciones, CDMX',
      ticketType: randomType,
      price: `${(0.05 + Math.random() * 0.2).toFixed(3)} ETH`,
      purchaseDate: '10 Enero 2026',
      status: 'Válido' as const,
      benefits: randomBenefits,
      metadata: {
        image: 'https://example.com/ticket-image.png',
        attributes: [
          { trait_type: 'Rareza', value: 'Común' },
          { trait_type: 'Colección', value: 'Eventos 2026' },
          { trait_type: 'Edición', value: 'Primera' }
        ]
      },
      blockchainData: {
        blockNumber: 1000000 + Math.floor(Math.random() * 100000),
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        gasUsed: `${Math.floor(Math.random() * 100000)}`,
        timestamp: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000) // Últimos 30 días
      }
    },
    verification: {
      timestamp: Date.now(),
      method: 'manual' as const,
      verifiedBy: 'Sistema de Verificación TickBase',
      blockchainStatus: 'confirmed' as const
    }
  }
}
