'use client'

import { useState } from 'react'
import { Share2, Copy, ExternalLink } from 'lucide-react'
import { useMiniAppContext } from '@/hooks/use-miniapp-context'
import { useTicketingNotifications } from '@/hooks/use-ticketing-notifications'

interface EmbedShareProps {
  title?: string
  description?: string
  eventTitle?: string
  eventId?: string
  className?: string
}

export function EmbedShare({ 
  title = 'TickMini - NFT Ticketing Marketplace',
  description = 'Plataforma revolucionaria de venta y gestión de boletos NFT en Base Network',
  eventTitle,
  eventId,
  className = ''
}: EmbedShareProps) {
  const [isSharing, setIsSharing] = useState(false)
  const { user, location } = useMiniAppContext()
  const { notifyAchievement } = useTicketingNotifications()

  const getShareUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_URL || window.location.origin
    const params = new URLSearchParams()
    
    // Agregar contexto de usuario si está disponible
    if (user?.fid) {
      params.set('fid', user.fid.toString())
    }
    
    // Agregar contexto de ubicación
    if (location?.type) {
      params.set('context', location.type)
    }
    
    // Agregar información del evento si está disponible
    if (eventId) {
      params.set('event', eventId)
    }
    
    const queryString = params.toString()
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  }

  const getShareText = () => {
    if (eventTitle) {
      return `🎫 ${eventTitle} - TickMini\n\n${description}\n\n¡Únete con tickets NFT únicos en Base Network!`
    }
    
    return `🎫 ${title}\n\n${description}\n\n¡El futuro del ticketing digital en Base Network!`
  }

  const handleShare = async () => {
    setIsSharing(true)
    
    try {
      const shareUrl = getShareUrl()
      const shareText = getShareText()
      
      // Intentar usar Web Share API nativo
      if (navigator.share) {
        await navigator.share({
          title: eventTitle || title,
          text: shareText,
          url: shareUrl
        })
        
        notifyAchievement('📤 ¡Compartido exitosamente!')
      } else {
        // Fallback: copiar al clipboard
        await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
        notifyAchievement('📋 ¡Enlace copiado al portapapeles!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      
      // Fallback final: copiar URL
      try {
        await navigator.clipboard.writeText(getShareUrl())
        notifyAchievement('📋 ¡URL copiada al portapapeles!')
      } catch (clipboardError) {
        console.error('Clipboard failed:', clipboardError)
        notifyAchievement('❌ Error al compartir')
      }
    } finally {
      setIsSharing(false)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl())
      notifyAchievement('📋 ¡Enlace copiado!')
    } catch (error) {
      console.error('Copy failed:', error)
      notifyAchievement('❌ Error al copiar')
    }
  }

  const handleOpenInNewTab = () => {
    window.open(getShareUrl(), '_blank', 'noopener,noreferrer')
    notifyAchievement('🔗 Abriendo en nueva pestaña')
  }

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      {/* Share Button */}
      <button
        onClick={handleShare}
        disabled={isSharing}
        className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isSharing ? 'animate-pulse' : ''}`}
      >
        <Share2 className="h-5 w-5 mr-2" />
        {isSharing ? 'Compartiendo...' : 'Compartir TickMini'}
      </button>

      {/* Additional Actions */}
      <div className="flex space-x-2">
        <button
          onClick={handleCopyLink}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white transition-colors"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copiar Enlace
        </button>
        
        <button
          onClick={handleOpenInNewTab}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white transition-colors"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Abrir
        </button>
      </div>

      {/* Context Info */}
      {user && (
        <div className="text-xs text-gray-400 bg-gray-800/50 rounded-lg p-3">
          <p className="font-medium text-cyan-300 mb-1">📱 Compartiendo desde Mini App</p>
          <p>Usuario: @{user.username || user.fid}</p>
          {location && (
            <p>Contexto: {location.type.replace('_', ' ')}</p>
          )}
          {eventTitle && (
            <p>Evento: {eventTitle}</p>
          )}
        </div>
      )}
    </div>
  )
}
