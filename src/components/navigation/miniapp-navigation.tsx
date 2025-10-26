'use client'

import { useState } from 'react'
import { ExternalLink, Share2, Eye, Twitter, Discord, BookOpen, Globe, MessageSquare } from 'lucide-react'
import { useMiniAppNavigation } from '@/hooks/use-miniapp-navigation'

interface MiniAppNavigationProps {
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function MiniAppNavigation({ 
  className = '', 
  variant = 'primary', 
  size = 'md' 
}: MiniAppNavigationProps) {
  const {
    openUrl,
    composeCast,
    viewCast,
    conditionalNavigation,
    shareEvent,
    shareTicket,
    openBaseOrg,
    openBaseTwitter,
    openBaseDiscord,
    openBaseDocs
  } = useMiniAppNavigation()

  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleAction = async (action: () => Promise<void>, actionName: string) => {
    setIsLoading(actionName)
    try {
      await action()
    } finally {
      setIsLoading(null)
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

  const demoEvent = {
    title: '🎵 Concierto de Rock',
    description: 'El mejor concierto de rock de la ciudad',
    url: 'https://tickmini.vercel.app/events/rock-concert',
    price: '0.05 ETH',
    date: '15 Dic 2024',
    location: 'Madrid, España'
  }

  const demoTicket = {
    eventTitle: '🎵 Concierto de Rock',
    ticketId: 'TICK-123456',
    url: 'https://tickmini.vercel.app/tickets/TICK-123456',
    owner: 'Usuario123'
  }

  return (
    <div className="space-y-6">
      {/* Navigation Demo */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-cyan-400" />
          Navegación con SDK
        </h3>
        <p className="text-gray-400 mb-4">
          Usa las funciones oficiales del SDK para navegación segura
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleAction(() => openUrl('https://base.org'), 'openBase')}
            disabled={isLoading === 'openBase'}
            className={getButtonStyle()}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {isLoading === 'openBase' ? 'Abriendo...' : 'Abrir Base.org'}
          </button>

          <button
            onClick={() => handleAction(() => composeCast({
              text: '¡Descubre TickMini! La mejor plataforma de tickets NFT 🎫',
              embeds: ['https://tickmini.vercel.app']
            }), 'composeCast')}
            disabled={isLoading === 'composeCast'}
            className={getButtonStyle()}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {isLoading === 'composeCast' ? 'Componiendo...' : 'Componer Cast'}
          </button>
        </div>
      </div>

      {/* Share Event Demo */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Share2 className="w-5 h-5 mr-2 text-purple-400" />
          Compartir Evento
        </h3>
        <p className="text-gray-400 mb-4">
          Comparte eventos como cast con información completa
        </p>
        
        <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-semibold mb-2">{demoEvent.title}</h4>
          <p className="text-gray-400 text-sm mb-2">{demoEvent.description}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-gray-400">Precio:</span> <span className="text-white">{demoEvent.price}</span></div>
            <div><span className="text-gray-400">Fecha:</span> <span className="text-white">{demoEvent.date}</span></div>
            <div><span className="text-gray-400">Ubicación:</span> <span className="text-white">{demoEvent.location}</span></div>
          </div>
        </div>

        <button
          onClick={() => handleAction(() => shareEvent(demoEvent), 'shareEvent')}
          disabled={isLoading === 'shareEvent'}
          className={getButtonStyle()}
        >
          <Share2 className="w-4 h-4 mr-2" />
          {isLoading === 'shareEvent' ? 'Compartiendo...' : 'Compartir Evento'}
        </button>
      </div>

      {/* Share Ticket Demo */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Eye className="w-5 h-5 mr-2 text-green-400" />
          Compartir Ticket
        </h3>
        <p className="text-gray-400 mb-4">
          Comparte tickets NFT como cast
        </p>
        
        <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
          <h4 className="text-white font-semibold mb-2">Ticket NFT</h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div><span className="text-gray-400">Evento:</span> <span className="text-white">{demoTicket.eventTitle}</span></div>
            <div><span className="text-gray-400">ID:</span> <span className="text-white">{demoTicket.ticketId}</span></div>
            <div><span className="text-gray-400">Propietario:</span> <span className="text-white">{demoTicket.owner}</span></div>
          </div>
        </div>

        <button
          onClick={() => handleAction(() => shareTicket(demoTicket), 'shareTicket')}
          disabled={isLoading === 'shareTicket'}
          className={getButtonStyle()}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isLoading === 'shareTicket' ? 'Compartiendo...' : 'Compartir Ticket'}
        </button>
      </div>

      {/* External Links */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-cyan-400" />
          Enlaces Externos
        </h3>
        <p className="text-gray-400 mb-4">
          Enlaces útiles de Base y Farcaster
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            onClick={() => handleAction(openBaseOrg, 'openBaseOrg')}
            disabled={isLoading === 'openBaseOrg'}
            className="flex items-center justify-center px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
          >
            <Globe className="w-4 h-4 mr-2" />
            {isLoading === 'openBaseOrg' ? 'Abriendo...' : 'Base.org'}
          </button>

          <button
            onClick={() => handleAction(openBaseTwitter, 'openBaseTwitter')}
            disabled={isLoading === 'openBaseTwitter'}
            className="flex items-center justify-center px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
          >
            <Twitter className="w-4 h-4 mr-2" />
            {isLoading === 'openBaseTwitter' ? 'Abriendo...' : 'Twitter'}
          </button>

          <button
            onClick={() => handleAction(openBaseDiscord, 'openBaseDiscord')}
            disabled={isLoading === 'openBaseDiscord'}
            className="flex items-center justify-center px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
          >
            <Discord className="w-4 h-4 mr-2" />
            {isLoading === 'openBaseDiscord' ? 'Abriendo...' : 'Discord'}
          </button>

          <button
            onClick={() => handleAction(openBaseDocs, 'openBaseDocs')}
            disabled={isLoading === 'openBaseDocs'}
            className="flex items-center justify-center px-4 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            {isLoading === 'openBaseDocs' ? 'Abriendo...' : 'Documentación'}
          </button>
        </div>
      </div>

      {/* Conditional Navigation Info */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-yellow-400" />
          Navegación Condicional
        </h3>
        <p className="text-gray-400 mb-4">
          La navegación se adapta automáticamente según las capacidades del cliente
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span className="text-white">En Mini App: Usa SDK actions</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span className="text-white">En navegador: Usa fallbacks</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span className="text-white">Compatible con todos los clientes</span>
          </div>
        </div>
      </div>
    </div>
  )
}
