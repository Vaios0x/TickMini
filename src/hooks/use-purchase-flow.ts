'use client'

import { useState, useCallback } from 'react'
import { useContractTransactions, EventData, TicketData } from './use-contract-transactions'
import { useBlockchainTickets } from './use-blockchain-tickets'

interface PurchaseStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'loading' | 'success' | 'error'
  hash?: string
  error?: string
}

export function usePurchaseFlow() {
  const { purchaseTicket, transactionState, resetTransactionState } = useContractTransactions()
  const { addNewTicket } = useBlockchainTickets()
  
  const [steps, setSteps] = useState<PurchaseStep[]>([])
  const [isActive, setIsActive] = useState(false)

  const initializeSteps = useCallback((eventData: EventData, ticketData: TicketData) => {
    const newSteps: PurchaseStep[] = [
      {
        id: 'create-event',
        title: 'Crear Evento',
        description: 'Creando evento en la blockchain...',
        status: 'pending'
      },
      {
        id: 'mint-ticket',
        title: 'Mintear Ticket',
        description: 'Minteando ticket NFT...',
        status: 'pending'
      },
      {
        id: 'complete',
        title: 'Completar Compra',
        description: 'Finalizando transacción...',
        status: 'pending'
      }
    ]
    setSteps(newSteps)
  }, [])

  const updateStep = useCallback((stepId: string, updates: Partial<PurchaseStep>) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ))
  }, [])

  const executePurchase = useCallback(async (eventData: EventData, ticketData: TicketData) => {
    try {
      setIsActive(true)
      initializeSteps(eventData, ticketData)
      resetTransactionState()

      // Paso 1: Crear evento
      updateStep('create-event', { status: 'loading' })
      
      // Simular creación de evento (en realidad se hace en purchaseTicket)
      await new Promise(resolve => setTimeout(resolve, 1000))
      updateStep('create-event', { 
        status: 'success',
        description: 'Evento creado exitosamente'
      })

      // Paso 2: Mintear ticket
      updateStep('mint-ticket', { status: 'loading' })
      
      const result = await purchaseTicket(eventData, ticketData)
      
      if (result) {
        updateStep('mint-ticket', { 
          status: 'success',
          hash: result.hash,
          description: `Ticket #${result.tokenId} minteado exitosamente`
        })

        // Paso 3: Completar
        updateStep('complete', { status: 'loading' })
        
        // Agregar ticket a la lista local
        addNewTicket(
          result.hash,
          result.tokenId,
          ticketData.eventId,
          ticketData.price,
          eventData
        )

        updateStep('complete', { 
          status: 'success',
          description: 'Compra completada exitosamente'
        })

        return { success: true, tokenId: result.tokenId, hash: result.hash }
      } else {
        throw new Error('Error en la transacción')
      }

    } catch (error: any) {
      console.error('Error en flujo de compra:', error)
      
      // Marcar el paso actual como error
      const currentStep = steps.find(step => step.status === 'loading')
      if (currentStep) {
        updateStep(currentStep.id, {
          status: 'error',
          error: error.message || 'Error desconocido'
        })
      }

      return { success: false, error: error.message }
    } finally {
      setIsActive(false)
    }
  }, [purchaseTicket, addNewTicket, initializeSteps, updateStep, resetTransactionState, steps])

  const retryPurchase = useCallback(async (eventData: EventData, ticketData: TicketData) => {
    // Resetear pasos y reintentar
    setSteps([])
    return executePurchase(eventData, ticketData)
  }, [executePurchase])

  const closeFlow = useCallback(() => {
    setIsActive(false)
    setSteps([])
    resetTransactionState()
  }, [resetTransactionState])

  return {
    steps,
    isActive,
    executePurchase,
    retryPurchase,
    closeFlow,
    transactionState
  }
}
