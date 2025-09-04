'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, 
  Zap, 
  Shield, 
  Database, 
  Globe, 
  Lock, 
  Key, 
  Activity,
  Play,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Cpu,
  Network
} from 'lucide-react'
import Link from 'next/link'

interface Endpoint {
  id: string
  name: string
  description: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  status: 'active' | 'beta' | 'deprecated'
  category: 'auth' | 'events' | 'tickets' | 'marketplace' | 'web3'
  responseTime: number
  successRate: number
}

const endpoints: Endpoint[] = [
  {
    id: 'auth-login',
    name: 'Autenticación de Usuario',
    description: 'Endpoint para autenticación con credenciales o wallet',
    method: 'POST',
    path: '/api/auth/login',
    status: 'active',
    category: 'auth',
    responseTime: 120,
    successRate: 99.8
  },
  {
    id: 'events-create',
    name: 'Crear Evento',
    description: 'Crear un nuevo evento con configuración de tickets NFT',
    method: 'POST',
    path: '/api/events/create',
    status: 'active',
    category: 'events',
    responseTime: 250,
    successRate: 98.5
  },
  {
    id: 'tickets-verify',
    name: 'Verificar Ticket',
    description: 'Verificar la autenticidad de un ticket NFT',
    method: 'POST',
    path: '/api/tickets/verify',
    status: 'active',
    category: 'tickets',
    responseTime: 180,
    successRate: 99.9
  },
  {
    id: 'marketplace-list',
    name: 'Listar Marketplace',
    description: 'Obtener lista de eventos y tickets disponibles',
    method: 'GET',
    path: '/api/marketplace/list',
    status: 'active',
    category: 'marketplace',
    responseTime: 95,
    successRate: 99.2
  },
  {
    id: 'web3-connect',
    name: 'Conectar Wallet',
    description: 'Conectar wallet Web3 y obtener balance',
    method: 'POST',
    path: '/api/web3/connect',
    status: 'beta',
    category: 'web3',
    responseTime: 300,
    successRate: 97.1
  }
]

const categories = {
  auth: { name: 'Autenticación', color: 'from-purple-500 to-pink-500', icon: Shield },
  events: { name: 'Eventos', color: 'from-blue-500 to-cyan-500', icon: Globe },
  tickets: { name: 'Tickets', color: 'from-green-500 to-emerald-500', icon: Key },
  marketplace: { name: 'Marketplace', color: 'from-orange-500 to-red-500', icon: Database },
  web3: { name: 'Web3', color: 'from-indigo-500 to-purple-500', icon: Network }
}

export default function ApiPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredEndpoints = selectedCategory === 'all' 
    ? endpoints 
    : endpoints.filter(ep => ep.category === selectedCategory)

  const copyToClipboard = async (text: string, endpointId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedEndpoint(endpointId)
      setTimeout(() => setCopiedEndpoint(null), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'POST': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'PUT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'DELETE': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400'
      case 'beta': return 'bg-yellow-500/20 text-yellow-400'
      case 'deprecated': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaying(prev => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Neural Network */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-cyan-400 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 mb-6 p-3 glass rounded-full">
              <Cpu className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 font-medium">API TickBase</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              API Reference
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Documentación completa de la API de TickBase con endpoints para eventos, tickets NFT, 
              marketplace y funcionalidades Web3
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">99.9% Uptime</span>
              </div>
              <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium">~200ms Response</span>
              </div>
              <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-medium">Enterprise Security</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Start Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 mb-20"
      >
        <div className="container mx-auto px-4">
          <div className="glass p-8 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🚀 Quick Start
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">1. Obtén tu API Key</h3>
                <p className="text-gray-300">Regístrate y genera tu clave de API en el dashboard</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-400">2. Integra los Endpoints</h3>
                <p className="text-gray-300">Usa nuestra documentación para implementar la API</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-400">3. ¡Listo para usar!</h3>
                <p className="text-gray-300">Comienza a crear eventos y vender tickets NFT</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/docs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <ExternalLink className="w-5 h-5" />
                Ver Documentación Completa
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* API Endpoints Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 mb-20"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🔌 Endpoints Disponibles
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'glass text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              Todos
            </button>
            {Object.entries(categories).map(([key, category]) => {
              const Icon = category.icon
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === key
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'glass text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              )
            })}
          </div>

          {/* Endpoints Grid */}
          <div className="grid gap-6">
            <AnimatePresence mode="wait">
              {filteredEndpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-[1.02] group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getMethodColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(endpoint.status)}`}>
                          {endpoint.status}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                        {endpoint.name}
                      </h3>
                      
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {endpoint.description}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4" />
                          <span>{endpoint.responseTime}ms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          <span>{endpoint.successRate}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <div className="glass p-3 rounded-xl border border-white/10">
                        <code className="text-sm text-cyan-400 font-mono break-all">
                          {endpoint.path}
                        </code>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(endpoint.path, endpoint.id)}
                          className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                          title="Copiar endpoint"
                        >
                          {copiedEndpoint === endpoint.id ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        
                        <button className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* API Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 mb-20"
      >
        <div className="container mx-auto px-4">
          <div className="glass p-8 rounded-3xl">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              📊 Estadísticas de la API
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20">
                <div className="text-4xl font-bold text-cyan-400 mb-2">5</div>
                <div className="text-gray-300">Endpoints Activos</div>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                <div className="text-4xl font-bold text-purple-400 mb-2">99.9%</div>
                <div className="text-gray-300">Uptime</div>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                <div className="text-4xl font-bold text-green-400 mb-2">~200ms</div>
                <div className="text-gray-300">Response Time</div>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20">
                <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
                <div className="text-gray-300">Soporte</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 mb-20"
      >
        <div className="container mx-auto px-4">
          <div className="glass p-12 rounded-3xl text-center bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20">
            <div className="inline-flex items-center gap-3 mb-6 p-3 glass rounded-full">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-medium">¿Listo para empezar?</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Comienza a usar la API de TickBase
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Únete a cientos de desarrolladores que ya están creando experiencias increíbles 
              con nuestra API de eventos y tickets NFT
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/docs"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold text-white hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <Code2 className="w-5 h-5 inline mr-2" />
                Ver Documentación
              </Link>
              
              <Link 
                href="/contact"
                className="px-8 py-4 glass rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 border border-white/20"
              >
                <ExternalLink className="w-5 h-5 inline mr-2" />
                Contactar Soporte
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
