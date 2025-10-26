'use client'

import { useState, useEffect, useCallback } from 'react'
import { useQuickAuth } from './use-quick-auth'
import { useMiniAppContext } from './use-miniapp-context'

export interface AuthenticatedContext {
  // Context data (no confiable para operaciones sensibles)
  contextUser: any
  contextLocation: any
  contextClient: any
  contextFeatures: any
  
  // Authenticated data (confiable para operaciones sensibles)
  authenticatedUser: {
    fid: number
    authenticated: boolean
    timestamp: string
    domain: string
  } | null
  
  userProfile: {
    fid: number
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
  } | null
  
  // Auth state
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  
  // Actions
  signIn: () => Promise<boolean>
  signOut: () => void
  refreshProfile: () => Promise<boolean>
  
  // Additional methods
  hasPermission: (permission: string) => boolean
  canPerformAction: (action: string) => boolean
  getAuthenticatedUserData: () => any
}

export function useAuthenticatedContext(): AuthenticatedContext {
  const quickAuth = useQuickAuth()
  const miniAppContext = useMiniAppContext()
  
  const [isInitialized, setIsInitialized] = useState(false)

  // Inicializar autenticación si hay contexto de Mini App
  useEffect(() => {
    if (miniAppContext.isInMiniApp && !isInitialized) {
      console.log('🚀 Mini App context detected, initializing auth...')
      setIsInitialized(true)
      
      // Auto-autenticar si estamos en Mini App
      if (!quickAuth.isAuthenticated) {
        quickAuth.signIn()
      }
    }
  }, [miniAppContext.isInMiniApp, isInitialized, quickAuth])

  // Función para verificar si el usuario tiene permisos
  const hasPermission = useCallback((permission: string): boolean => {
    if (!quickAuth.profile) return false
    
    switch (permission) {
      case 'createEvents':
        return quickAuth.profile.permissions.canCreateEvents
      case 'purchaseTickets':
        return quickAuth.profile.permissions.canPurchaseTickets
      case 'transferTickets':
        return quickAuth.profile.permissions.canTransferTickets
      case 'manageProfile':
        return quickAuth.profile.permissions.canManageProfile
      default:
        return false
    }
  }, [quickAuth.profile])

  // Función para verificar si el usuario puede realizar una acción
  const canPerformAction = useCallback((action: string): boolean => {
    if (!quickAuth.isAuthenticated) return false
    
    switch (action) {
      case 'createEvent':
        return hasPermission('createEvents')
      case 'purchaseTicket':
        return hasPermission('purchaseTickets')
      case 'transferTicket':
        return hasPermission('transferTickets')
      case 'updateProfile':
        return hasPermission('manageProfile')
      default:
        return false
    }
  }, [quickAuth.isAuthenticated, hasPermission])

  // Función para obtener información del usuario para operaciones sensibles
  const getAuthenticatedUserData = useCallback(() => {
    if (!quickAuth.isAuthenticated || !quickAuth.user) {
      return null
    }

    return {
      fid: quickAuth.user.fid,
      authenticated: quickAuth.user.authenticated,
      timestamp: quickAuth.user.timestamp,
      domain: quickAuth.user.domain,
      profile: quickAuth.profile
    }
  }, [quickAuth.isAuthenticated, quickAuth.user, quickAuth.profile])

  return {
    // Context data (no confiable)
    contextUser: miniAppContext.user,
    contextLocation: miniAppContext.location,
    contextClient: miniAppContext.client,
    contextFeatures: miniAppContext.features,
    
    // Authenticated data (confiable)
    authenticatedUser: quickAuth.user,
    userProfile: quickAuth.profile,
    
    // Auth state
    isAuthenticated: quickAuth.isAuthenticated,
    isLoading: quickAuth.isLoading,
    error: quickAuth.error,
    
    // Actions
    signIn: quickAuth.signIn,
    signOut: quickAuth.signOut,
    refreshProfile: quickAuth.refreshProfile,
    
    // Additional methods
    hasPermission,
    canPerformAction,
    getAuthenticatedUserData
  }
}
