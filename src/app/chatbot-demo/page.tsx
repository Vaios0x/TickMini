'use client'

import React from 'react'
import { TickBatoChatbot } from '@/components/chatbot'
import { motion } from 'framer-motion'

export default function ChatbotDemo() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            TickBato Chatbot
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Asistente inteligente con glassmorphism y efectos neurales
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">
              🎨 Características de Diseño
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Glassmorphism con blur y transparencias
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Efectos neurales y partículas flotantes
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                Colores neon y gradientes Web3
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Animaciones suaves y responsivas
              </li>
            </ul>
          </div>

          <div className="glass p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">
              🤖 Funcionalidades
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Asistente inteligente para TickBase
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                Preguntas frecuentes integradas
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                Interfaz minimizable
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Completamente responsive
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass p-8 rounded-2xl mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">
            💬 Preguntas que TickBato puede responder
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              '¿Cómo comprar tickets NFT?',
              '¿Qué es Base Network?',
              '¿Cómo crear un evento?',
              '¿Cómo verificar tickets?',
              '¿Problemas con mi wallet?',
              '¿Información sobre precios?'
            ].map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 bg-black/20 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-colors"
              >
                <p className="text-gray-300">{question}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4 text-purple-400">
            🚀 ¡Prueba TickBato ahora!
          </h2>
          <p className="text-gray-300 mb-6">
            Haz clic en el botón flotante en la esquina inferior derecha para abrir el chat
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold">
            <span>💬</span>
            <span>Chatbot activo</span>
          </div>
        </motion.div>
      </div>

      {/* El chatbot se renderiza aquí */}
      <TickBatoChatbot />
    </div>
  )
}
