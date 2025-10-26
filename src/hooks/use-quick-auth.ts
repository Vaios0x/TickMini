'use client'

import { useState, useCallback, useEffect } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'
import { useTicketingNotifications } from './use-ticketing-notifications'

// Tipos para la autenticación
export interface AuthenticatedUser {
  fid: number
  authenticated: boolean
  timestamp: string
  domain: string
}

export interface UserProfile {
  fid: number
  authenticated: boolean
  profile: {
    username: string
    displayName: string
    avatar: string
    bio: string
  }
  permissions: {
    canCreateEvents: boolean
    canPurchaseTickets: boolean
    canTransferTickets: boolean
    canManageProfile: boolean
  }
  stats: {
    eventsCreated: number
    ticketsPurchased: number
    ticketsTransferred: number
    achievements: string[]
  }
  timestamp: string
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: AuthenticatedUser | null
  profile: UserProfile | null
  token: string | null
  error: string | null
}

export function useQuickAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: false,
    user: null,
    profile: null,
    token: null,
    error: null
  })

  const { notifyAchievement } = useTicketingNotifications()

  // Función para iniciar sesión
  const signIn = useCallback(async (): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      console.log('🔐 Starting Quick Auth sign in...')
      
      // Obtener token de Quick Auth
      const { token } = await sdk.quickAuth.getToken()
      console.log('🔑 Token obtained from Quick Auth')

      // Verificar token con backend
      const response = await sdk.quickAuth.fetch(`${process.env.NEXT_PUBLIC_URL || window.location.origin}/api/auth`, {
        headers: { "Authorization": `Bearer ${token}` }
      })

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status}`)
      }

      const userData: AuthenticatedUser = await response.json()
      console.log('✅ User authenticated:', userData)

      // Obtener perfil completo del usuario
      const profileResponse = await sdk.quickAuth.fetch(`${process.env.NEXT_PUBLIC_URL || window.location.origin}/api/auth`, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}` }
      })

      let profile: UserProfile | null = null
      if (profileResponse.ok) {
        profile = await profileResponse.json()
        console.log('👤 User profile loaded:', profile)
      }

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: userData,
        profile,
        token,
        error: null
      })

      notifyAchievement('🔐 ¡Autenticación exitosa!')
      return true

    } catch (error) {
      console.error('❌ Authentication failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed'
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }))

      notifyAchievement('❌ Error en autenticación')
      return false
    }
  }, [notifyAchievement])

  // Función para cerrar sesión
  const signOut = useCallback(() => {
    console.log('🚪 Signing out...')
    
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      profile: null,
      token: null,
      error: null
    })

    notifyAchievement('👋 Sesión cerrada')
  }, [notifyAchievement])

  // Función para verificar si el usuario está autenticado
  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    if (!authState.token) {
      return false
    }

    try {
      const response = await sdk.quickAuth.fetch(`${process.env.NEXT_PUBLIC_URL || window.location.origin}/api/auth`, {
        headers: { "Authorization": `Bearer ${authState.token}` }
      })

      if (response.ok) {
        const userData: AuthenticatedUser = await response.json()
        setAuthState(prev => ({
          ...prev,
          isAuthenticated: true,
          user: userData
        }))
        return true
      } else {
        // Token expirado o inválido
        signOut()
        return false
      }
    } catch (error) {
      console.error('❌ Auth status check failed:', error)
      signOut()
      return false
    }
  }, [authState.token, signOut])

  // Función para refrescar el perfil del usuario
  const refreshProfile = useCallback(async (): Promise<boolean> => {
    if (!authState.token) {
      return false
    }

    try {
      const response = await sdk.quickAuth.fetch(`${process.env.NEXT_PUBLIC_URL || window.location.origin}/api/auth`, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${authState.token}` }
      })

      if (response.ok) {
        const profile: UserProfile = await response.json()
        setAuthState(prev => ({
          ...prev,
          profile
        }))
        return true
      }
      return false
    } catch (error) {
      console.error('❌ Profile refresh failed:', error)
      return false
    }
  }, [authState.token])

  // Verificar estado de autenticación al cargar
  useEffect(() => {
    if (authState.token && !authState.isAuthenticated) {
      checkAuthStatus()
    }
  }, [authState.token, authState.isAuthenticated, checkAuthStatus])

  return {
    ...authState,
    signIn,
    signOut,
    checkAuthStatus,
    refreshProfile
  }
}
