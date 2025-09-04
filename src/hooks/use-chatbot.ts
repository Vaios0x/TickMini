'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { getChatbotConfigForPage, defaultChatbotConfig } from '@/components/chatbot/chatbot-config'

export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'suggestion' | 'action'
}

export interface ChatbotState {
  isOpen: boolean
  isMinimized: boolean
  messages: Message[]
  isTyping: boolean
  isProcessing: boolean
  inputValue: string
}

export function useChatbot() {
  const pathname = usePathname()
  const config = getChatbotConfigForPage(pathname)
  
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    isMinimized: false,
    messages: [
      {
        id: '1',
        text: config.responses.welcomeMessage,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
    ],
    isTyping: false,
    isProcessing: false,
    inputValue: ''
  })

  // Auto-open en páginas específicas
  useEffect(() => {
    if (config.behavior.autoOpen && !state.isOpen) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, isOpen: true }))
      }, config.behavior.delayBeforeFirstMessage)
      
      return () => clearTimeout(timer)
    }
  }, [config.behavior.autoOpen, config.behavior.delayBeforeFirstMessage, state.isOpen])

  // Verificar si el chatbot debe mostrarse en la página actual
  const shouldShowChatbot = useCallback(() => {
    const { showOnPages, hideOnPages } = config.behavior
    
    // Si la página está en la lista de ocultar, no mostrar
    if (hideOnPages.some(page => pathname.startsWith(page))) {
      return false
    }
    
    // Si showOnPages contiene '*', mostrar en todas las páginas
    if (showOnPages.includes('*')) {
      return true
    }
    
    // Verificar si la página actual está en la lista de mostrar
    return showOnPages.some(page => pathname.startsWith(page))
  }, [pathname, config.behavior])

  const toggleChat = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
      isMinimized: false
    }))
  }, [])

  const toggleMinimize = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMinimized: !prev.isMinimized
    }))
  }, [])

  const closeChat = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      isMinimized: false
    }))
  }, [])

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }))
    
    return newMessage
  }, [])

  const setTyping = useCallback((isTyping: boolean) => {
    setState(prev => ({ ...prev, isTyping }))
  }, [])

  const setProcessing = useCallback((isProcessing: boolean) => {
    setState(prev => ({ ...prev, isProcessing }))
  }, [])

  const setInputValue = useCallback((inputValue: string) => {
    setState(prev => ({ ...prev, inputValue }))
  }, [])

  const clearMessages = useCallback(() => {
    setState(prev => ({
      ...prev,
      messages: [
        {
          id: '1',
          text: config.responses.welcomeMessage,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        }
      ]
    }))
  }, [config.responses.welcomeMessage])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || state.isProcessing) return

    // Agregar mensaje del usuario
    const userMessage = addMessage({
      text: text.trim(),
      sender: 'user',
      type: 'text'
    })

    setInputValue('')
    setTyping(true)
    setProcessing(true)

    try {
      // Simular respuesta del bot
      const response = await generateBotResponse(text.trim(), config)
      
      // Simular tiempo de escritura
      await new Promise(resolve => 
        setTimeout(resolve, 1500 + Math.random() * 1000)
      )
      
      addMessage({
        text: response,
        sender: 'bot',
        type: 'text'
      })
    } catch (error) {
      addMessage({
        text: config.responses.errorMessage,
        sender: 'bot',
        type: 'text'
      })
    } finally {
      setTyping(false)
      setProcessing(false)
    }
  }, [state.isProcessing, addMessage, setInputValue, setTyping, setProcessing, config])

  return {
    ...state,
    config,
    shouldShowChatbot: shouldShowChatbot(),
    toggleChat,
    toggleMinimize,
    closeChat,
    addMessage,
    setTyping,
    setProcessing,
    setInputValue,
    clearMessages,
    sendMessage
  }
}

// Función para generar respuestas del bot
async function generateBotResponse(userInput: string, config: any): Promise<string> {
  const input = userInput.toLowerCase()
  
  // Respuestas específicas basadas en palabras clave
  const responses: Record<string, string> = {
    'comprar': 'Para comprar tickets en TickBase:\n\n1. 🎫 Navega a la sección "Eventos"\n2. 🔍 Selecciona el evento que te interesa\n3. 💳 Conecta tu wallet (MetaMask, WalletConnect, etc.)\n4. 🛒 Añade los tickets al carrito\n5. ✅ Confirma la transacción\n\nLos tickets se guardarán como NFTs en tu wallet. ¿Necesitas ayuda con algún paso específico?',
    
    'nft': 'Los NFT tickets son tickets digitales únicos que:\n\n✨ Son verificables en blockchain\n🔒 No se pueden falsificar\n💎 Tienen valor de colección\n🔄 Se pueden revender en el marketplace\n📱 Se almacenan en tu wallet\n\nCada ticket es único y contiene metadatos del evento. ¡Es la evolución del ticketing tradicional!',
    
    'crear': 'Para crear un evento en TickBase:\n\n1. 🚀 Ve a "Crear Evento"\n2. 📝 Completa la información básica\n3. 🎨 Añade imágenes y descripción\n4. ⏰ Configura fecha y ubicación\n5. 🎫 Define precios y cantidad de tickets\n6. 🔗 Conecta tu wallet\n7. ✅ Publica el evento\n\n¡Es muy fácil y solo toma unos minutos!',
    
    'verificar': 'Para verificar tickets:\n\n1. 🔍 Ve a "Verificar Ticket"\n2. 📱 Escanea el código QR del ticket\n3. 🔗 O introduce el ID del ticket manualmente\n4. ✅ El sistema verificará la autenticidad\n\nLos tickets verificados mostrarán toda la información del evento y confirmarán su validez en blockchain.',
    
    'wallet': 'Para conectar tu wallet:\n\n1. 🔑 Haz clic en "Conectar Wallet"\n2. 📱 Selecciona tu wallet preferido:\n   • MetaMask\n   • WalletConnect\n   • Coinbase Wallet\n   • Trust Wallet\n3. ✅ Autoriza la conexión\n\nAsegúrate de tener ETH en Base Network para las transacciones.',
    
    'base': 'Base Network es:\n\n⚡ Una L2 de Ethereum súper rápida\n💰 Con tarifas muy bajas\n🔒 Totalmente segura\n🎯 Optimizada para dApps\n\nTickBase funciona en Base para ofrecerte la mejor experiencia de ticketing NFT con transacciones rápidas y económicas.',
    
    'ayuda': '¡Estoy aquí para ayudarte! Puedo ayudarte con:\n\n🎫 Compra y venta de tickets\n🚀 Creación de eventos\n🔍 Verificación de tickets\n🔑 Configuración de wallet\n💡 Información sobre NFTs\n🌐 Base Network\n\n¿Hay algo específico en lo que pueda ayudarte?',
    
    'precio': 'Los precios en TickBase:\n\n💎 Los organizadores fijan sus propios precios\n⚡ Las transacciones en Base son muy económicas\n🔄 Puedes revender tickets en el marketplace\n📊 Los precios pueden variar según la demanda\n\n¿Te interesa algún evento específico?'
  }
  
  // Buscar respuesta específica
  for (const [keyword, response] of Object.entries(responses)) {
    if (input.includes(keyword)) {
      return response
    }
  }
  
  // Respuesta por defecto
  return config.responses.fallbackMessage
}
