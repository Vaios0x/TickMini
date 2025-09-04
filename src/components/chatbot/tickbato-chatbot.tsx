'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Zap,
  Brain,
  ChevronUp,
  ChevronDown,
  Minimize2,
  Maximize2
} from 'lucide-react'
import './tickbato-chatbot.css'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'suggestion' | 'action'
}

interface ChatbotProps {
  className?: string
}

export function TickBatoChatbot({ className = '' }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy TickBato, tu asistente inteligente de TickBase. ¿En qué puedo ayudarte hoy? 🎫✨',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen, isMinimized])

  const quickSuggestions = [
    '¿Cómo comprar tickets?',
    '¿Qué es un NFT ticket?',
    '¿Cómo crear un evento?',
    '¿Cómo verificar tickets?',
    '¿Problemas con mi wallet?',
    '¿Información sobre Base Network?'
  ]

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isProcessing) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    setIsProcessing(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(text.trim())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      setIsProcessing(false)
    }, 1500 + Math.random() * 1000)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('comprar') || input.includes('ticket')) {
      return 'Para comprar tickets en TickBase:\n\n1. 🎫 Navega a la sección "Eventos"\n2. 🔍 Selecciona el evento que te interesa\n3. 💳 Conecta tu wallet (MetaMask, WalletConnect, etc.)\n4. 🛒 Añade los tickets al carrito\n5. ✅ Confirma la transacción\n\nLos tickets se guardarán como NFTs en tu wallet. ¿Necesitas ayuda con algún paso específico?'
    }
    
    if (input.includes('nft') || input.includes('token')) {
      return 'Los NFT tickets son tickets digitales únicos que:\n\n✨ Son verificables en blockchain\n🔒 No se pueden falsificar\n💎 Tienen valor de colección\n🔄 Se pueden revender en el marketplace\n📱 Se almacenan en tu wallet\n\nCada ticket es único y contiene metadatos del evento. ¡Es la evolución del ticketing tradicional!'
    }
    
    if (input.includes('crear') || input.includes('evento')) {
      return 'Para crear un evento en TickBase:\n\n1. 🚀 Ve a "Crear Evento"\n2. 📝 Completa la información básica\n3. 🎨 Añade imágenes y descripción\n4. ⏰ Configura fecha y ubicación\n5. 🎫 Define precios y cantidad de tickets\n6. 🔗 Conecta tu wallet\n7. ✅ Publica el evento\n\n¡Es muy fácil y solo toma unos minutos!'
    }
    
    if (input.includes('verificar') || input.includes('verificación')) {
      return 'Para verificar tickets:\n\n1. 🔍 Ve a "Verificar Ticket"\n2. 📱 Escanea el código QR del ticket\n3. 🔗 O introduce el ID del ticket manualmente\n4. ✅ El sistema verificará la autenticidad\n\nLos tickets verificados mostrarán toda la información del evento y confirmarán su validez en blockchain.'
    }
    
    if (input.includes('wallet') || input.includes('conectar')) {
      return 'Para conectar tu wallet:\n\n1. 🔑 Haz clic en "Conectar Wallet"\n2. 📱 Selecciona tu wallet preferido:\n   • MetaMask\n   • WalletConnect\n   • Coinbase Wallet\n   • Trust Wallet\n3. ✅ Autoriza la conexión\n\nAsegúrate de tener ETH en Base Network para las transacciones.'
    }
    
    if (input.includes('base') || input.includes('network') || input.includes('red')) {
      return 'Base Network es:\n\n⚡ Una L2 de Ethereum súper rápida\n💰 Con tarifas muy bajas\n🔒 Totalmente segura\n🎯 Optimizada para dApps\n\nTickBase funciona en Base para ofrecerte la mejor experiencia de ticketing NFT con transacciones rápidas y económicas.'
    }
    
    if (input.includes('ayuda') || input.includes('help')) {
      return '¡Estoy aquí para ayudarte! Puedo ayudarte con:\n\n🎫 Compra y venta de tickets\n🚀 Creación de eventos\n🔍 Verificación de tickets\n🔑 Configuración de wallet\n💡 Información sobre NFTs\n🌐 Base Network\n\n¿Hay algo específico en lo que pueda ayudarte?'
    }
    
    if (input.includes('precio') || input.includes('costo') || input.includes('tarifa')) {
      return 'Los precios en TickBase:\n\n💎 Los organizadores fijan sus propios precios\n⚡ Las transacciones en Base son muy económicas\n🔄 Puedes revender tickets en el marketplace\n📊 Los precios pueden variar según la demanda\n\n¿Te interesa algún evento específico?'
    }
    
    // Default response
    return '¡Interesante pregunta! 🤔\n\nComo asistente de TickBase, puedo ayudarte con:\n\n• Compra y gestión de tickets NFT\n• Creación de eventos\n• Verificación de tickets\n• Configuración de wallets\n• Información sobre Base Network\n\n¿Podrías ser más específico sobre lo que necesitas? ¡Estoy aquí para ayudarte! ✨'
  }

  const handleQuickSuggestion = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`tickbato-chatbot ${className}`}>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
            onClick={toggleChat}
            className="chatbot-toggle-btn"
            aria-label="Abrir TickBato Chatbot"
          >
            <div className="toggle-btn-content">
              <MessageCircle className="toggle-icon" />
              <div className="toggle-btn-glow" />
              <div className="toggle-btn-particles">
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 100,
              rotateX: -15
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotateX: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 100,
              rotateX: 15
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className={`chatbot-window ${isMinimized ? 'minimized' : ''}`}
          >
            {/* Chat Header */}
            <div className="chatbot-header">
              <div className="header-content">
                <div className="bot-avatar">
                  <Bot className="bot-icon" />
                  <div className="avatar-glow" />
                  <div className="avatar-pulse" />
                </div>
                <div className="bot-info">
                  <h3 className="bot-name">TickBato</h3>
                  <p className="bot-status">
                    <span className="status-indicator" />
                    Asistente Inteligente
                  </p>
                </div>
                <div className="neural-effects">
                  <Brain className="neural-icon" />
                  <Zap className="zap-icon" />
                </div>
              </div>
              
              <div className="header-actions">
                <button
                  onClick={toggleMinimize}
                  className="minimize-btn"
                  aria-label={isMinimized ? "Expandir chat" : "Minimizar chat"}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={toggleChat}
                  className="close-btn"
                  aria-label="Cerrar chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <div className="chatbot-messages">
                <div className="messages-container">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 25 
                      }}
                      className={`message ${message.sender}`}
                    >
                      <div className="message-avatar">
                        {message.sender === 'user' ? (
                          <User className="user-icon" />
                        ) : (
                          <Bot className="bot-icon" />
                        )}
                      </div>
                      <div className="message-content">
                        <div className="message-bubble">
                          <p className="message-text">
                            {message.text.split('\n').map((line, index) => (
                              <span key={index}>
                                {line}
                                {index < message.text.split('\n').length - 1 && <br />}
                              </span>
                            ))}
                          </p>
                          <span className="message-time">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="message bot typing"
                    >
                      <div className="message-avatar">
                        <Bot className="bot-icon" />
                      </div>
                      <div className="message-content">
                        <div className="message-bubble typing-bubble">
                          <div className="typing-indicator">
                            <div className="typing-dot" />
                            <div className="typing-dot" />
                            <div className="typing-dot" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            {/* Quick Suggestions */}
            {!isMinimized && messages.length <= 1 && (
              <div className="quick-suggestions">
                <h4 className="suggestions-title">
                  <Sparkles className="sparkles-icon" />
                  Preguntas frecuentes
                </h4>
                <div className="suggestions-grid">
                  {quickSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleQuickSuggestion(suggestion)}
                      className="suggestion-btn"
                      disabled={isProcessing}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            {!isMinimized && (
              <div className="chatbot-input">
                <div className="input-container">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e: any) => setInputValue(e.target.value)}
                    onKeyPress={(e: any) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage(inputValue)
                      }
                    }}
                    placeholder="Escribe tu mensaje..."
                    className="message-input"
                    disabled={isProcessing}
                  />
                  <button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isProcessing}
                    className="send-btn"
                    aria-label="Enviar mensaje"
                  >
                    <Send className="send-icon" />
                  </button>
                </div>
                <div className="input-glow" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
