'use client'

import { useState, useEffect } from 'react'
import { useMiniApp } from '@neynar/react'

interface NotificationDetails {
  token: string
  enabled: boolean
}

interface AddMiniAppResult {
  added: boolean
  notificationDetails?: NotificationDetails
}

export function useNeynarNotifications() {
  const { isSDKLoaded, addMiniApp } = useMiniApp()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notificationToken, setNotificationToken] = useState<string | null>(null)
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false)

  // Función para agregar la Mini App y habilitar notificaciones
  const handleAddMiniApp = async (): Promise<AddMiniAppResult> => {
    if (!isSDKLoaded) {
      throw new Error('SDK no está cargado')
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await addMiniApp()
      
      if (result.added && result.notificationDetails) {
        setNotificationToken(result.notificationDetails.token)
        setIsNotificationEnabled(result.notificationDetails.enabled)
        
        console.log('✅ Mini App agregada y notificaciones habilitadas')
        console.log('🔑 Token de notificación:', result.notificationDetails.token)
      } else {
        console.log('⚠️ Mini App agregada pero notificaciones no habilitadas')
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      console.error('❌ Error al agregar Mini App:', errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Función para verificar el estado de las notificaciones
  const checkNotificationStatus = () => {
    return {
      isEnabled: isNotificationEnabled,
      token: notificationToken,
      isSDKLoaded
    }
  }

  return {
    // Estado
    isSDKLoaded,
    isLoading,
    error,
    notificationToken,
    isNotificationEnabled,
    
    // Funciones
    handleAddMiniApp,
    checkNotificationStatus
  }
}
