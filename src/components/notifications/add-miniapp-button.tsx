'use client'

import { useState } from 'react'
import { Plus, Bell, CheckCircle, AlertCircle } from 'lucide-react'
import { useMiniAppNotifications } from '@/hooks/use-miniapp-notifications'

interface AddMiniAppButtonProps {
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  showResult?: boolean
}

export function AddMiniAppButton({
  className = '',
  variant = 'primary',
  size = 'md',
  showResult = true
}: AddMiniAppButtonProps) {
  const { addMiniApp, isAdding, result } = useMiniAppNotifications()

  const handleAddMiniApp = async () => {
    await addMiniApp()
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
    if (isAdding) return 'Agregando...'
    return 'Agregar TickMini'
  }

  const getButtonIcon = () => {
    if (isAdding) {
      return <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    }
    return <Plus className="w-4 h-4" />
  }

  return (
    <div className="space-y-4">
      {/* Add Mini App Button */}
      <button
        onClick={handleAddMiniApp}
        disabled={isAdding}
        className={getButtonStyle()}
      >
        {getButtonIcon()}
        <span className="ml-2">{getButtonText()}</span>
      </button>

      {/* Result Display */}
      {showResult && result && (
        <div className={`p-4 rounded-lg border-2 ${
          result.success 
            ? 'border-green-500 bg-green-500/10' 
            : 'border-red-500 bg-red-500/10'
        }`}>
          <div className="flex items-start space-x-3">
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className={`font-semibold ${
                result.success ? 'text-green-400' : 'text-red-400'
              }`}>
                {result.success ? '¡Mini App Agregada!' : 'Error al Agregar'}
              </h4>
              <p className="text-sm text-gray-300 mt-1">
                {result.success ? (
                  result.hasNotifications ? (
                    <>
                      <Bell className="w-4 h-4 inline mr-1" />
                      TickMini se ha agregado con notificaciones habilitadas
                    </>
                  ) : (
                    'TickMini se ha agregado exitosamente'
                  )
                ) : (
                  result.error || 'Ocurrió un error inesperado'
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Benefits Info */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <h4 className="text-white font-semibold mb-2 flex items-center">
          <Bell className="w-4 h-4 mr-2 text-cyan-400" />
          Beneficios de Agregar TickMini
        </h4>
        <ul className="space-y-1 text-sm text-gray-300">
          <li className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>Notificaciones de eventos y tickets</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>Recordatorios automáticos</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>Actualizaciones en tiempo real</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span>Acceso rápido desde Base App</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
