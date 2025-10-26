'use client'

import { useMiniAppContext } from '@/hooks/use-miniapp-context'
import { useTicketingNotifications } from '@/hooks/use-ticketing-notifications'
import { useMiniAppNavigation } from '@/hooks/use-miniapp-navigation'

export function ContextualEvents() {
  const { user, location, client } = useMiniAppContext()
  const { notifyAchievement } = useTicketingNotifications()
  const { composeCast, openUrl } = useMiniAppNavigation()

  const getContextualEvents = () => {
    if (!location) return []

    switch (location.type) {
      case 'cast_embed':
        return [
          {
            id: 'cast-event-1',
            title: '🎵 Concierto de Rock',
            description: 'Evento mencionado en el cast que viste',
            price: '0.05 ETH',
            date: '15 Dic 2024',
            time: '20:00',
            location: 'Madrid, España',
            attendees: 45,
            isFromCast: true
          }
        ]
      
      case 'cast_share':
        return [
          {
            id: 'shared-event-1',
            title: '🎭 Teatro Clásico',
            description: 'Evento que alguien compartió contigo',
            price: '0.03 ETH',
            date: '20 Dic 2024',
            time: '19:30',
            location: 'Barcelona, España',
            attendees: 30,
            isShared: true
          }
        ]
      
      case 'notification':
        return [
          {
            id: 'notification-event-1',
            title: '🎮 Gaming Tournament',
            description: 'Evento relacionado con tu notificación',
            price: '0.02 ETH',
            date: '25 Dic 2024',
            time: '15:00',
            location: 'Valencia, España',
            attendees: 100,
            isFromNotification: true
          }
        ]
      
      case 'channel':
        return [
          {
            id: 'channel-event-1',
            title: `🎪 Evento de ${location.channel?.name}`,
            description: `Evento específico del canal ${location.channel?.name}`,
            price: '0.04 ETH',
            date: '22 Dic 2024',
            time: '18:00',
            location: 'Sevilla, España',
            attendees: 60,
            isFromChannel: true,
            channelName: location.channel?.name
          }
        ]
      
      default:
        return [
          {
            id: 'default-event-1',
            title: '🎨 Taller de Arte',
            description: 'Evento recomendado para ti',
            price: '0.01 ETH',
            date: '18 Dic 2024',
            time: '16:00',
            location: 'Bilbao, España',
            attendees: 25,
            isRecommended: true
          }
        ]
    }
  }

  const handleEventAction = async (eventId: string, action: string) => {
    switch (action) {
      case 'view':
        notifyAchievement('🎫 Evento cargado exitosamente')
        // Abrir URL del evento usando SDK
        await openUrl(`https://tickmini.vercel.app/events/${eventId}`)
        break
      case 'purchase':
        notifyAchievement('💳 Procesando compra de ticket...')
        // Abrir URL de compra usando SDK
        await openUrl(`https://tickmini.vercel.app/events/${eventId}/purchase`)
        break
      case 'share':
        notifyAchievement('📤 Evento compartido con amigos')
        // Compartir evento como cast usando SDK
        await composeCast({
          text: `🎫 Descubre este increíble evento en TickMini!`,
          embeds: [`https://tickmini.vercel.app/events/${eventId}`]
        })
        break
      case 'save':
        notifyAchievement('💾 Evento guardado en favoritos')
        break
    }
  }

  const events = getContextualEvents()

  if (events.length === 0) return null

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Eventos Contextuales
        </h2>
        <p className="text-gray-400">
          Basado en cómo llegaste a TickMini, estos eventos podrían interesarte:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className={`bg-gray-900/50 rounded-lg p-6 border-2 transition-all duration-300 hover:scale-105 ${
              (event as any).isFromCast ? 'border-cyan-400' :
              (event as any).isShared ? 'border-purple-400' :
              (event as any).isFromNotification ? 'border-yellow-400' :
              (event as any).isFromChannel ? 'border-green-400' :
              'border-gray-600'
            }`}
          >
            {/* Event Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {event.description}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold text-cyan-400">
                  {event.price}
                </span>
                <span className="text-xs text-gray-500">
                  {event.attendees} asistentes
                </span>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">📅</span>
                <span className="text-white text-sm">{event.date} • {event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">📍</span>
                <span className="text-white text-sm">{event.location}</span>
              </div>
              {(event as any).channelName && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">📺</span>
                  <span className="text-white text-sm">Canal: {(event as any).channelName}</span>
                </div>
              )}
            </div>

            {/* Context Badge */}
            <div className="mb-4">
              {(event as any).isFromCast && (
                <span className="inline-block bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full text-xs font-medium">
                  📱 Del Cast
                </span>
              )}
              {(event as any).isShared && (
                <span className="inline-block bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs font-medium">
                  📤 Compartido
                </span>
              )}
              {(event as any).isFromNotification && (
                <span className="inline-block bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-medium">
                  🔔 Notificación
                </span>
              )}
              {(event as any).isFromChannel && (
                <span className="inline-block bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                  📺 Canal
                </span>
              )}
              {(event as any).isRecommended && (
                <span className="inline-block bg-gray-500/20 text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                  ⭐ Recomendado
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleEventAction(event.id, 'view')}
                className="flex-1 bg-cyan-500 text-black py-2 px-4 rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
              >
                Ver Detalles
              </button>
              <button
                onClick={() => handleEventAction(event.id, 'purchase')}
                className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-400 transition-colors"
              >
                Comprar
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => handleEventAction(event.id, 'share')}
                className="flex-1 bg-gray-700 text-white py-1 px-3 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
              >
                📤 Compartir
              </button>
              <button
                onClick={() => handleEventAction(event.id, 'save')}
                className="flex-1 bg-gray-700 text-white py-1 px-3 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
              >
                💾 Guardar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
