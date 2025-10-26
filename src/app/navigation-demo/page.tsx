'use client'

import { useState } from 'react'
import { Globe, Share2, Eye, ExternalLink, MessageSquare, Twitter, Discord, BookOpen, ArrowLeft } from 'lucide-react'
import { MiniAppNavigation } from '@/components/navigation/miniapp-navigation'
import { useMiniAppNavigation } from '@/hooks/use-miniapp-navigation'

export default function NavigationDemoPage() {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'sharing' | 'external' | 'conditional'>('basic')
  
  const {
    openUrl,
    composeCast,
    viewCast,
    conditionalNavigation,
    shareEvent,
    shareTicket
  } = useMiniAppNavigation()

  const demoActions = [
    { id: 'basic', name: 'Navegación Básica', description: 'URLs externas y casts' },
    { id: 'sharing', name: 'Compartir Contenido', description: 'Eventos y tickets' },
    { id: 'external', name: 'Enlaces Externos', description: 'Base, Twitter, Discord' },
    { id: 'conditional', name: 'Navegación Condicional', description: 'Adaptativa por cliente' }
  ]

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
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
              <Globe className="w-8 h-8 mr-3 text-cyan-400" />
              Navigation Demo
            </h1>
            <p className="text-gray-400">
              Demuestra el sistema de navegación con SDK oficial de Farcaster
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Navigation Demo Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Navigation Demo */}
              {selectedDemo === 'basic' && (
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <ExternalLink className="w-5 h-5 mr-2 text-cyan-400" />
                    Navegación Básica
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Funciones básicas del SDK para navegación segura
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Abrir URL Externa</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Usa <code className="bg-gray-700 px-2 py-1 rounded">sdk.actions.openUrl()</code> para abrir enlaces
                      </p>
                      <button
                        onClick={() => openUrl('https://base.org')}
                        className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition-colors"
                      >
                        Abrir Base.org
                      </button>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Componer Cast</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Usa <code className="bg-gray-700 px-2 py-1 rounded">sdk.actions.composeCast()</code> para crear casts
                      </p>
                      <button
                        onClick={() => composeCast({
                          text: '¡Descubre TickMini! La mejor plataforma de tickets NFT 🎫',
                          embeds: ['https://tickmini.vercel.app']
                        })}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-400 transition-colors"
                      >
                        Componer Cast
                      </button>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Ver Cast</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Usa <code className="bg-gray-700 px-2 py-1 rounded">sdk.actions.viewCast()</code> para ver casts
                      </p>
                      <button
                        onClick={() => viewCast('https://base.app/post/0xffdec7c879aad726b5400d22ec8a89aaff6e0737')}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-400 transition-colors"
                      >
                        Ver Cast de Base
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Sharing Demo */}
              {selectedDemo === 'sharing' && (
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Share2 className="w-5 h-5 mr-2 text-purple-400" />
                    Compartir Contenido
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Comparte eventos y tickets como casts
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Compartir Evento</h3>
                      <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                        <h4 className="text-white font-semibold mb-2">{demoEvent.title}</h4>
                        <p className="text-gray-400 text-sm mb-2">{demoEvent.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><span className="text-gray-400">Precio:</span> <span className="text-white">{demoEvent.price}</span></div>
                          <div><span className="text-gray-400">Fecha:</span> <span className="text-white">{demoEvent.date}</span></div>
                          <div><span className="text-gray-400">Ubicación:</span> <span className="text-white">{demoEvent.location}</span></div>
                        </div>
                      </div>
                      <button
                        onClick={() => shareEvent(demoEvent)}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-400 transition-colors"
                      >
                        Compartir Evento
                      </button>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Compartir Ticket</h3>
                      <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                        <h4 className="text-white font-semibold mb-2">Ticket NFT</h4>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div><span className="text-gray-400">Evento:</span> <span className="text-white">{demoTicket.eventTitle}</span></div>
                          <div><span className="text-gray-400">ID:</span> <span className="text-white">{demoTicket.ticketId}</span></div>
                          <div><span className="text-gray-400">Propietario:</span> <span className="text-white">{demoTicket.owner}</span></div>
                        </div>
                      </div>
                      <button
                        onClick={() => shareTicket(demoTicket)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-400 transition-colors"
                      >
                        Compartir Ticket
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* External Links Demo */}
              {selectedDemo === 'external' && (
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-cyan-400" />
                    Enlaces Externos
                  </h2>
                  <p className="text-gray-400 mb-6">
                    Enlaces útiles de Base y Farcaster
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => openUrl('https://base.org')}
                      className="flex items-center justify-center px-4 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors border border-cyan-500/30"
                    >
                      <Globe className="w-5 h-5 mr-2" />
                      Base.org
                    </button>

                    <button
                      onClick={() => openUrl('https://twitter.com/base')}
                      className="flex items-center justify-center px-4 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/30"
                    >
                      <Twitter className="w-5 h-5 mr-2" />
                      Twitter
                    </button>

                    <button
                      onClick={() => openUrl('https://discord.gg/basechain')}
                      className="flex items-center justify-center px-4 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors border border-purple-500/30"
                    >
                      <Discord className="w-5 h-5 mr-2" />
                      Discord
                    </button>

                    <button
                      onClick={() => openUrl('https://docs.base.org')}
                      className="flex items-center justify-center px-4 py-3 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors border border-gray-500/30"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      Documentación
                    </button>
                  </div>
                </div>
              )}

              {/* Conditional Navigation Demo */}
              {selectedDemo === 'conditional' && (
                <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-yellow-400" />
                    Navegación Condicional
                  </h2>
                  <p className="text-gray-400 mb-6">
                    La navegación se adapta automáticamente según las capacidades del cliente
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Navegación Inteligente</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        El sistema detecta automáticamente si estás en Mini App o navegador
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

                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-3">Prueba Condicional</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Prueba la navegación condicional con diferentes opciones
                      </p>
                      <div className="space-y-2">
                        <button
                          onClick={() => conditionalNavigation({
                            url: 'https://base.org',
                            text: '¡Descubre Base!',
                            embeds: ['https://base.org']
                          })}
                          className="w-full bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                        >
                          Navegación Condicional
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Demo Selection */}
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Seleccionar Demo</h3>
                <div className="space-y-2">
                  {demoActions.map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => setSelectedDemo(demo.id as any)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedDemo === demo.id
                          ? 'bg-cyan-500/20 border border-cyan-500/50'
                          : 'bg-gray-800/50 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="font-medium text-white">{demo.name}</div>
                      <div className="text-sm text-gray-400">{demo.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* SDK Functions Info */}
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Funciones del SDK</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-cyan-400 font-medium">sdk.actions.openUrl()</span>
                    <span className="text-gray-400 ml-2">Abrir URLs externas</span>
                  </div>
                  <div>
                    <span className="text-purple-400 font-medium">sdk.actions.composeCast()</span>
                    <span className="text-gray-400 ml-2">Crear casts</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-medium">sdk.actions.viewCast()</span>
                    <span className="text-gray-400 ml-2">Ver casts</span>
                  </div>
                </div>
              </div>

              {/* Benefits Info */}
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Beneficios</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>• Navegación nativa</div>
                  <div>• Compatible con todos los clientes</div>
                  <div>• Experiencia de usuario mejorada</div>
                  <div>• Seguridad garantizada</div>
                  <div>• Fallbacks automáticos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
