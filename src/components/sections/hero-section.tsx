"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Ticket, Play, ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10"
          style={{ color: 'rgba(0, 255, 255, 0.3)' }}
        >
          <Ticket className="h-16 w-16" />
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-40 right-20"
          style={{ color: 'rgba(255, 0, 255, 0.3)' }}
        >
          <Sparkles className="h-12 w-12" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2))',
              border: '1px solid rgba(0, 255, 255, 0.4)',
              color: '#00ffff'
            }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00ffff' }} />
            <span className="text-sm font-medium">🚀 Plataforma Web3 en Base Network</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span style={{ color: '#00ff00', textShadow: '0 0 20px rgba(0, 255, 0, 0.5)' }}>TickBase</span>
            <br />
            <span className="text-4xl md:text-5xl" style={{ color: '#ffffff' }}>
              El Futuro del Ticketing NFT
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#ffffff' }}
          >
            La plataforma líder en ticketing NFT sobre Base Network. Crea eventos únicos, 
            compra tickets verificables y disfruta de transacciones instantáneas con tarifas mínimas.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
          >
            <Link 
              href="/events"
              className="text-lg px-8 py-6 h-auto text-white shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                border: 'none'
              }}
              tabIndex={0}
            >
              🎫 Explorar Eventos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <button 
              className="text-lg px-8 py-6 h-auto transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              style={{
                background: 'transparent',
                border: '2px solid #ffff00',
                color: '#ffff00'
              }}
              tabIndex={0}
            >
              <Play className="mr-2 h-5 w-5" />
              🚀 Crear Evento
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center p-4 rounded-xl transition-all duration-300"
                 style={{
                   background: 'linear-gradient(135deg, rgba(0, 0, 255, 0.2), rgba(128, 0, 128, 0.2))',
                   border: '1px solid rgba(0, 255, 255, 0.4)'
                 }}>
              <div className="text-4xl font-bold mb-2">🎭</div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#00ffff' }}>12</div>
              <div style={{ color: '#ffffff' }}>Eventos</div>
            </div>
            <div className="text-center p-4 rounded-xl transition-all duration-300"
                 style={{
                   background: 'linear-gradient(135deg, rgba(128, 0, 128, 0.2), rgba(255, 0, 255, 0.2))',
                   border: '1px solid rgba(255, 0, 255, 0.4)'
                 }}>
              <div className="text-4xl font-bold mb-2">🎫</div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#ff00ff' }}>1,185</div>
              <div style={{ color: '#ffffff' }}>Tickets Disponibles</div>
            </div>
            <div className="text-center p-4 rounded-xl transition-all duration-300"
                 style={{
                   background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.2), rgba(255, 255, 0, 0.2))',
                   border: '1px solid rgba(255, 255, 0, 0.4)'
                 }}>
              <div className="text-4xl font-bold mb-2">💰</div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#ffff00' }}>0.11 ETH</div>
              <div style={{ color: '#ffffff' }}>Precio Promedio</div>
            </div>
          </motion.div>
        </motion.div>
      </div>


    </section>
  )
}
