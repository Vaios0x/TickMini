'use client'

import { ReactNode } from 'react'
import { useMiniAppContext } from '@/hooks/use-miniapp-context'
import { useTicketingNotifications } from '@/hooks/use-ticketing-notifications'

interface ContextAwareWrapperProps {
  children: ReactNode
}

export function ContextAwareWrapper({ children }: ContextAwareWrapperProps) {
  const { user, location, client, features, isInMiniApp, isLoading, error } = useMiniAppContext()
  const { notifyAchievement } = useTicketingNotifications()

  // Personalizar experiencia basada en el contexto
  const getContextualWelcome = () => {
    if (!user) return null

    const name = user.displayName || user.username || `FID ${user.fid}`
    
    switch (location?.type) {
      case 'cast_embed':
        return `¡Hola ${name}! Viste nuestro evento en un cast y decidiste explorar. ¡Perfecto!`
      case 'cast_share':
        return `¡Hola ${name}! Alguien compartió un evento contigo. ¡Veamos qué hay disponible!`
      case 'notification':
        return `¡Hola ${name}! Te notificamos sobre algo importante. ¡Veamos qué es!`
      case 'channel':
        return `¡Hola ${name}! Estás explorando desde el canal ${location.channel?.name}. ¡Genial!`
      case 'open_miniapp':
        return `¡Hola ${name}! Viniste desde otra Mini App. ¡Bienvenido a TickMini!`
      case 'launcher':
      default:
        return `¡Hola ${name}! Bienvenido a TickMini, el futuro del ticketing digital.`
    }
  }

  const getContextualActions = () => {
    if (!location) return []

    switch (location.type) {
      case 'cast_embed':
        return [
          { label: 'Ver Evento del Cast', action: 'view_cast_event' },
          { label: 'Explorar Más Eventos', action: 'explore_events' }
        ]
      case 'cast_share':
        return [
          { label: 'Ver Evento Compartido', action: 'view_shared_event' },
          { label: 'Compartir con Amigos', action: 'share_with_friends' }
        ]
      case 'notification':
        return [
          { label: 'Ver Notificación', action: 'view_notification' },
          { label: 'Gestionar Alertas', action: 'manage_alerts' }
        ]
      case 'channel':
        return [
          { label: `Ver Eventos de ${location.channel?.name}`, action: 'view_channel_events' },
          { label: 'Crear Evento en Canal', action: 'create_channel_event' }
        ]
      default:
        return [
          { label: 'Explorar Eventos', action: 'explore_events' },
          { label: 'Crear Evento', action: 'create_event' }
        ]
    }
  }

  const handleContextualAction = (action: string) => {
    switch (action) {
      case 'view_cast_event':
        // Lógica para mostrar evento específico del cast
        notifyAchievement('🎫 Evento del cast cargado exitosamente')
        break
      case 'explore_events':
        window.location.href = '/events'
        break
      case 'view_shared_event':
        // Lógica para mostrar evento compartido
        notifyAchievement('📤 Evento compartido cargado')
        break
      case 'share_with_friends':
        // Lógica para compartir con amigos
        notifyAchievement('👥 ¡Compartido con amigos!')
        break
      case 'view_notification':
        // Lógica para mostrar notificación
        notifyAchievement('🔔 Notificación procesada')
        break
      case 'manage_alerts':
        // Lógica para gestionar alertas
        notifyAchievement('⚙️ Alertas configuradas')
        break
      case 'view_channel_events':
        // Lógica para mostrar eventos del canal
        notifyAchievement(`📺 Eventos de ${location?.channel?.name} cargados`)
        break
      case 'create_channel_event':
        // Lógica para crear evento en canal
        window.location.href = '/create-event'
        break
      case 'create_event':
        window.location.href = '/create-event'
        break
    }
  }

  // Mostrar loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando contexto de Mini App...</p>
        </div>
      </div>
    )
  }

  // Mostrar error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">Error de Contexto</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-cyan-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  // Mostrar mensaje si no está en Mini App (solo en la primera carga)
  if (!isInMiniApp && !isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-cyan-400 text-6xl mb-4">📱</div>
          <h2 className="text-white text-2xl font-bold mb-4">
            Abre en Base App
          </h2>
          <p className="text-gray-400 mb-6">
            Para la mejor experiencia, abre TickMini desde Base App o un cliente de Farcaster.
          </p>
          <div className="space-y-3">
            <a 
              href="https://base.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-cyan-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
            >
              Abrir en Base App
            </a>
            <button 
              onClick={() => {
                // Forzar que se muestre la aplicación principal
                window.location.href = '/?force=true'
              }}
              className="block bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors w-full"
            >
              Continuar de Todas Formas
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Renderizar contenido con contexto
  return (
    <div className="min-h-screen bg-black">
      {/* Contextual Welcome Banner */}
      {user && (
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-cyan-500/30 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              {user.pfpUrl && (
                <img 
                  src={user.pfpUrl} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full border-2 border-cyan-400"
                />
              )}
              <div className="flex-1">
                <p className="text-white text-sm font-medium">
                  {getContextualWelcome()}
                </p>
                {location && (
                  <p className="text-cyan-300 text-xs mt-1">
                    Abierto desde: {location.type.replace('_', ' ')}
                  </p>
                )}
              </div>
            </div>
            
            {/* Contextual Actions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {getContextualActions().map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleContextualAction(action.action)}
                  className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  )
}
