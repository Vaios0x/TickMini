'use client'

import { ContextualEvents } from '@/components/context/contextual-events'
import { useMiniAppContext } from '@/hooks/use-miniapp-context'

export default function EventsPage() {
  const { user, location, client, isInMiniApp } = useMiniAppContext()

  // Si no estamos en Mini App, el ContextAwareWrapper ya maneja esto
  if (!isInMiniApp) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Eventos Contextuales
          </h1>
          <p className="text-gray-400">
            Eventos personalizados basados en cómo llegaste a TickMini
          </p>
        </div>

        {/* Contextual Events */}
        <ContextualEvents />

        {/* Additional Context Info */}
        {location && (
          <div className="max-w-4xl mx-auto mt-12 p-6 bg-gray-900/30 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">
              📊 Información de Contexto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-cyan-400 mb-2">
                  👤 Usuario
                </h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-400">FID:</span> {user?.fid}</p>
                  <p><span className="text-gray-400">Username:</span> @{user?.username}</p>
                  <p><span className="text-gray-400">Display Name:</span> {user?.displayName}</p>
                  {user?.bio && (
                    <p><span className="text-gray-400">Bio:</span> {user.bio}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-purple-400 mb-2">
                  📍 Ubicación
                </h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-400">Tipo:</span> {location.type}</p>
                  {location.channel && (
                    <p><span className="text-gray-400">Canal:</span> {location.channel.name}</p>
                  )}
                  {location.notification && (
                    <p><span className="text-gray-400">Notificación:</span> {location.notification.title}</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-green-400 mb-2">
                  📱 Cliente
                </h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-400">Plataforma:</span> {client?.platformType || 'web'}</p>
                  <p><span className="text-gray-400">Client FID:</span> {client?.clientFid}</p>
                  <p><span className="text-gray-400">Agregado:</span> {client?.added ? 'Sí' : 'No'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-yellow-400 mb-2">
                  🎯 Acciones Sugeridas
                </h4>
                <div className="space-y-2">
                  {location.type === 'cast_embed' && (
                    <p className="text-sm text-gray-300">
                      Explora el evento mencionado en el cast
                    </p>
                  )}
                  {location.type === 'cast_share' && (
                    <p className="text-sm text-gray-300">
                      Ve el evento que alguien compartió contigo
                    </p>
                  )}
                  {location.type === 'notification' && (
                    <p className="text-sm text-gray-300">
                      Revisa la notificación y eventos relacionados
                    </p>
                  )}
                  {location.type === 'channel' && (
                    <p className="text-sm text-gray-300">
                      Explora eventos del canal {location.channel?.name}
                    </p>
                  )}
                  {location.type === 'launcher' && (
                    <p className="text-sm text-gray-300">
                      Explora todos los eventos disponibles
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}