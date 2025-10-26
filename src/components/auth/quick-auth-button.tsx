'use client'

import { useState } from 'react'
import { LogIn, LogOut, User, Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useQuickAuth } from '@/hooks/use-quick-auth'

interface QuickAuthButtonProps {
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  showUserInfo?: boolean
  showProfile?: boolean
}

export function QuickAuthButton({
  className = '',
  variant = 'primary',
  size = 'md',
  showUserInfo = true,
  showProfile = false
}: QuickAuthButtonProps) {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    profile, 
    error, 
    signIn, 
    signOut 
  } = useQuickAuth()

  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleSignIn = async () => {
    setIsSigningIn(true)
    try {
      await signIn()
    } finally {
      setIsSigningIn(false)
    }
  }

  const getButtonStyle = () => {
    const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    const variantStyles = {
      primary: 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-lg hover:shadow-xl',
      secondary: 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 hover:border-gray-500',
      outline: 'bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white'
    }

    return `${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`
  }

  const getButtonText = () => {
    if (isLoading || isSigningIn) return 'Autenticando...'
    if (isAuthenticated) return 'Cerrar Sesión'
    return 'Iniciar Sesión'
  }

  const getButtonIcon = () => {
    if (isLoading || isSigningIn) {
      return <Loader2 className="w-4 h-4 animate-spin" />
    }
    if (isAuthenticated) {
      return <LogOut className="w-4 h-4" />
    }
    return <LogIn className="w-4 h-4" />
  }

  if (isAuthenticated && showUserInfo) {
    return (
      <div className="space-y-4">
        {/* User Info Card */}
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold">
                {profile?.profile.displayName || `Usuario ${user?.fid}`}
              </h3>
              <p className="text-gray-400 text-sm">
                FID: {user?.fid} • {user?.authenticated ? 'Autenticado' : 'No autenticado'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Verificado</span>
            </div>
          </div>

          {/* Profile Details */}
          {showProfile && profile && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Eventos Creados:</span>
                  <span className="text-white ml-2">{profile.stats.eventsCreated}</span>
                </div>
                <div>
                  <span className="text-gray-400">Tickets Comprados:</span>
                  <span className="text-white ml-2">{profile.stats.ticketsPurchased}</span>
                </div>
                <div>
                  <span className="text-gray-400">Tickets Transferidos:</span>
                  <span className="text-white ml-2">{profile.stats.ticketsTransferred}</span>
                </div>
                <div>
                  <span className="text-gray-400">Logros:</span>
                  <span className="text-white ml-2">{profile.stats.achievements.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        <button
          onClick={signOut}
          disabled={isLoading}
          className={getButtonStyle()}
        >
          {getButtonIcon()}
          <span className="ml-2">{getButtonText()}</span>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Sign In Button */}
      <button
        onClick={handleSignIn}
        disabled={isLoading || isSigningIn}
        className={getButtonStyle()}
      >
        {getButtonIcon()}
        <span className="ml-2">{getButtonText()}</span>
      </button>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <h4 className="text-red-400 font-semibold">Error de Autenticación</h4>
              <p className="text-red-300 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Display */}
      {isAuthenticated && !showUserInfo && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="text-green-400 font-semibold">¡Autenticación Exitosa!</h4>
              <p className="text-green-300 text-sm mt-1">
                Has sido autenticado con FID: {user?.fid}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Auth Benefits */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <h4 className="text-white font-semibold mb-2 flex items-center">
          <Shield className="w-4 h-4 mr-2 text-cyan-400" />
          Beneficios de la Autenticación
        </h4>
        <ul className="space-y-1 text-sm text-gray-300">
          <li className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>Acceso a funciones sensibles</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>Crear y gestionar eventos</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>Comprar y transferir tickets</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>Perfil personalizado</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
