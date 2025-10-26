'use client'

import { useCallback, useState } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'
import { useTicketingNotifications } from './use-ticketing-notifications'

export interface AddMiniAppResult {
  success: boolean
  hasNotifications: boolean
  error?: string
}

export function useMiniAppNotifications() {
  const [isAdding, setIsAdding] = useState(false)
  const [result, setResult] = useState<AddMiniAppResult | null>(null)
  const { notifyAchievement } = useTicketingNotifications()

  const addMiniApp = useCallback(async (): Promise<AddMiniAppResult> => {
    setIsAdding(true)
    setResult(null)

    try {
      console.log('🚀 Attempting to add Mini App...')
      
      const response = await sdk.actions.addMiniApp()
      
      console.log('📱 Add Mini App response:', response)

      if (response.notificationDetails) {
        console.log('🔔 Mini App added with notifications enabled!')
        notifyAchievement('🎉 ¡Mini App agregada con notificaciones!')
        
        const result: AddMiniAppResult = {
          success: true,
          hasNotifications: true
        }
        setResult(result)
        return result
      } else {
        console.log('📱 Mini App added without notifications')
        notifyAchievement('🎉 ¡Mini App agregada exitosamente!')
        
        const result: AddMiniAppResult = {
          success: true,
          hasNotifications: false
        }
        setResult(result)
        return result
      }
    } catch (error) {
      console.error('❌ Error adding Mini App:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      
      notifyAchievement('❌ Error al agregar Mini App')
      
      const result: AddMiniAppResult = {
        success: false,
        hasNotifications: false,
        error: errorMessage
      }
      setResult(result)
      return result
    } finally {
      setIsAdding(false)
    }
  }, [notifyAchievement])

  const checkNotificationStatus = useCallback(async (): Promise<boolean> => {
    try {
      // Verificar si el usuario tiene notificaciones habilitadas
      // Esto se puede implementar consultando el estado del usuario
      const context = await sdk.context
      console.log('📱 Mini App context:', context)
      
      // Por ahora retornamos true si estamos en Mini App
      return true
    } catch (error) {
      console.error('❌ Error checking notification status:', error)
      return false
    }
  }, [])

  const requestNotificationPermission = useCallback(async (): Promise<boolean> => {
    try {
      // En un entorno real, esto podría abrir la configuración de notificaciones
      // o mostrar un modal explicando los beneficios
      console.log('🔔 Requesting notification permission...')
      
      // Simular solicitud de permiso
      notifyAchievement('🔔 Solicita permisos de notificación en la configuración')
      
      return true
    } catch (error) {
      console.error('❌ Error requesting notification permission:', error)
      return false
    }
  }, [notifyAchievement])

  return {
    addMiniApp,
    checkNotificationStatus,
    requestNotificationPermission,
    isAdding,
    result
  }
}
