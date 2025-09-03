'use client'

import * as React from 'react'
import Link from 'next/link'

interface NeuralNode {
  id: number
  x: number
  y: number
  connections: number[]
  pulse: number
}

export function NeuralHero() {
  const [nodes, setNodes] = React.useState<NeuralNode[]>([])
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const animationRef = React.useRef<number>()

  // Crear nodos neurales
  React.useEffect(() => {
    const createNodes = () => {
      const newNodes: NeuralNode[] = []
      const nodeCount = 25
      
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * 100
        const y = Math.random() * 100
        const connections: number[] = []
        
        // Crear conexiones aleatorias entre nodos
        for (let j = 0; j < 3; j++) {
          const target = Math.floor(Math.random() * nodeCount)
          if (target !== i && !connections.includes(target)) {
            connections.push(target)
          }
        }
        
        newNodes.push({
          id: i,
          x,
          y,
          connections,
          pulse: Math.random() * Math.PI * 2
        })
      }
      
      setNodes(newNodes)
    }
    
    createNodes()
  }, [])

  // Efecto de mouse tracking
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animación del canvas
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Dibujar conexiones
      nodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const targetNode = nodes.find(n => n.id === connectionId)
          if (targetNode) {
            const x1 = (node.x / 100) * canvas.width
            const y1 = (node.y / 100) * canvas.height
            const x2 = (targetNode.x / 100) * canvas.width
            const y2 = (targetNode.y / 100) * canvas.height
            
            // Calcular distancia al mouse para efecto de interacción
            const mouseX = (mousePosition.x / 100) * canvas.width
            const mouseY = (mousePosition.y / 100) * canvas.height
            const distToMouse = Math.sqrt((x1 - mouseX) ** 2 + (y1 - mouseY) ** 2)
            
            // Intensidad basada en la distancia al mouse
            const intensity = Math.max(0, 1 - distToMouse / 200)
            
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + intensity * 0.3})`
            ctx.lineWidth = 1 + intensity * 2
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        })
      })
      
      // Dibujar nodos
      nodes.forEach(node => {
        const x = (node.x / 100) * canvas.width
        const y = (node.y / 100) * canvas.height
        
        // Efecto de pulso
        node.pulse += 0.05
        const pulseSize = Math.sin(node.pulse) * 0.3 + 1
        
        // Calcular distancia al mouse
        const mouseX = (mousePosition.x / 100) * canvas.width
        const mouseY = (mousePosition.y / 100) * canvas.height
        const distToMouse = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2)
        
        // Intensidad basada en la distancia al mouse
        const intensity = Math.max(0, 1 - distToMouse / 150)
        
        // Nodo principal
        ctx.fillStyle = `rgba(0, 255, 255, ${0.8 + intensity * 0.2})`
        ctx.beginPath()
        ctx.arc(x, y, 4 * pulseSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Halo exterior
        ctx.fillStyle = `rgba(0, 255, 255, ${0.1 + intensity * 0.3})`
        ctx.beginPath()
        ctx.arc(x, y, 8 * pulseSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Efecto de brillo
        if (intensity > 0.5) {
          ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.5})`
          ctx.beginPath()
          ctx.arc(x, y, 2 * pulseSize, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [nodes, mousePosition])

  // Ajustar tamaño del canvas
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <section className="neural-hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas de fondo neural */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      
      {/* Overlay de gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-cyan-900/40 z-10" />
      
      {/* Contenido principal */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        {/* Título principal con efecto de texto neural */}
        <h1 className="neural-title text-6xl md:text-8xl font-bold mb-8">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 animate-gradient-x">
            TickBase
          </span>
          <span className="block text-2xl md:text-4xl font-light text-cyan-300 mt-4 opacity-80">
            El Futuro del Ticketing NFT
          </span>
        </h1>
        
        {/* Subtítulo */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Plataforma revolucionaria de venta y gestión de boletos NFT construida sobre{' '}
          <span className="text-cyan-400 font-semibold">Base Network</span>. 
          Conecta eventos globales a través de la tecnología blockchain más avanzada.
        </p>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link
            href="/create-event"
            className="neural-cta-btn primary-btn group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            <span className="relative z-10">🚀 Crear Evento</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          <Link
            href="/events"
            className="neural-cta-btn secondary-btn group relative overflow-hidden px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-cyan-400 hover:text-black hover:shadow-2xl hover:shadow-cyan-400/25"
          >
            <span className="relative z-10">🎫 Explorar Eventos</span>
            <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
        
        {/* Estadísticas con efecto neural */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: '10K+', label: 'Tickets NFT', icon: '🎫', color: 'from-cyan-400 to-blue-500' },
            { value: '500+', label: 'Eventos', icon: '🎭', color: 'from-purple-400 to-pink-500' },
            { value: '99.9%', label: 'Uptime', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
            { value: '100x', label: 'Más Barato', icon: '💰', color: 'from-green-400 to-emerald-500' }
          ].map((stat, index) => (
            <div
              key={index}
              className="neural-stat-card group relative p-6 rounded-2xl border border-cyan-400/20 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-cyan-400/40 hover:bg-black/30"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className={`text-3xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
              
              {/* Efecto de brillo neural */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
        
        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Partículas flotantes adicionales */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </section>
  )
}
