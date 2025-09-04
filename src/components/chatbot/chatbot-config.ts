// Configuración del chatbot TickBato

export interface ChatbotConfig {
  // Configuración de apariencia
  appearance: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    backgroundColor: string
    textColor: string
    borderRadius: string
    blurIntensity: number
  }
  
  // Configuración de comportamiento
  behavior: {
    autoOpen: boolean
    showOnPages: string[]
    hideOnPages: string[]
    delayBeforeFirstMessage: number
    typingSpeed: number
    maxMessages: number
  }
  
  // Configuración de respuestas
  responses: {
    welcomeMessage: string
    fallbackMessage: string
    errorMessage: string
    typingIndicator: boolean
    quickSuggestions: string[]
  }
  
  // Configuración de accesibilidad
  accessibility: {
    announceMessages: boolean
    keyboardNavigation: boolean
    highContrast: boolean
    reducedMotion: boolean
  }
}

export const defaultChatbotConfig: ChatbotConfig = {
  appearance: {
    primaryColor: '#00ffff',
    secondaryColor: '#ff00ff',
    accentColor: '#ffff00',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    textColor: '#ffffff',
    borderRadius: '24px',
    blurIntensity: 25
  },
  
  behavior: {
    autoOpen: false,
    showOnPages: ['*'], // Mostrar en todas las páginas
    hideOnPages: ['/admin', '/dashboard'], // Ocultar en páginas específicas
    delayBeforeFirstMessage: 1000,
    typingSpeed: 50,
    maxMessages: 100
  },
  
  responses: {
    welcomeMessage: '¡Hola! Soy TickBato, tu asistente inteligente de TickBase. ¿En qué puedo ayudarte hoy? 🎫✨',
    fallbackMessage: '¡Interesante pregunta! 🤔\n\nComo asistente de TickBase, puedo ayudarte con:\n\n• Compra y gestión de tickets NFT\n• Creación de eventos\n• Verificación de tickets\n• Configuración de wallets\n• Información sobre Base Network\n\n¿Podrías ser más específico sobre lo que necesitas? ¡Estoy aquí para ayudarte! ✨',
    errorMessage: 'Lo siento, parece que hay un problema técnico. Por favor, intenta de nuevo en unos momentos. 🔧',
    typingIndicator: true,
    quickSuggestions: [
      '¿Cómo comprar tickets?',
      '¿Qué es un NFT ticket?',
      '¿Cómo crear un evento?',
      '¿Cómo verificar tickets?',
      '¿Problemas con mi wallet?',
      '¿Información sobre Base Network?'
    ]
  },
  
  accessibility: {
    announceMessages: true,
    keyboardNavigation: true,
    highContrast: false,
    reducedMotion: false
  }
}

// Configuración específica para diferentes páginas
export const pageSpecificConfig: Record<string, Partial<ChatbotConfig>> = {
  '/events': {
    responses: {
      welcomeMessage: '¡Hola! Veo que estás explorando eventos. ¿Te ayudo a encontrar el evento perfecto? 🎫',
      fallbackMessage: defaultChatbotConfig.responses.fallbackMessage,
      errorMessage: defaultChatbotConfig.responses.errorMessage,
      typingIndicator: true,
      quickSuggestions: [
        '¿Cómo filtrar eventos?',
        '¿Eventos próximos?',
        '¿Cómo comprar tickets?',
        '¿Información sobre precios?'
      ]
    }
  },
  
  '/create-event': {
    responses: {
      welcomeMessage: '¡Perfecto! Estás creando un evento. ¿Necesitas ayuda con algún paso? 🚀',
      fallbackMessage: defaultChatbotConfig.responses.fallbackMessage,
      errorMessage: defaultChatbotConfig.responses.errorMessage,
      typingIndicator: true,
      quickSuggestions: [
        '¿Cómo configurar precios?',
        '¿Qué información necesito?',
        '¿Cómo subir imágenes?',
        '¿Configuración de fechas?'
      ]
    }
  },
  
  '/my-tickets': {
    responses: {
      welcomeMessage: '¡Hola! Veo que tienes tickets. ¿Necesitas ayuda para gestionarlos? 🎫',
      fallbackMessage: defaultChatbotConfig.responses.fallbackMessage,
      errorMessage: defaultChatbotConfig.responses.errorMessage,
      typingIndicator: true,
      quickSuggestions: [
        '¿Cómo revender tickets?',
        '¿Verificar mis tickets?',
        '¿Transferir tickets?',
        '¿Historial de compras?'
      ]
    }
  },
  
  '/verify-ticket': {
    responses: {
      welcomeMessage: '¡Hola! Estás en la sección de verificación. ¿Te ayudo con el proceso? 🔍',
      fallbackMessage: defaultChatbotConfig.responses.fallbackMessage,
      errorMessage: defaultChatbotConfig.responses.errorMessage,
      typingIndicator: true,
      quickSuggestions: [
        '¿Cómo escanear QR?',
        '¿Verificar manualmente?',
        '¿Problemas con verificación?',
        '¿Información del ticket?'
      ]
    }
  }
}

// Función para obtener la configuración según la página actual
export function getChatbotConfigForPage(pathname: string): ChatbotConfig {
  const baseConfig = { ...defaultChatbotConfig }
  const pageConfig = pageSpecificConfig[pathname]
  
  if (pageConfig) {
    return {
      ...baseConfig,
      ...pageConfig,
      responses: {
        ...baseConfig.responses,
        ...pageConfig.responses
      }
    }
  }
  
  return baseConfig
}

// Configuración de temas
export const chatbotThemes = {
  default: {
    primaryColor: '#00ffff',
    secondaryColor: '#ff00ff',
    accentColor: '#ffff00'
  },
  
  cyberpunk: {
    primaryColor: '#ff0080',
    secondaryColor: '#8000ff',
    accentColor: '#00ff80'
  },
  
  neon: {
    primaryColor: '#00ff00',
    secondaryColor: '#ff0000',
    accentColor: '#0000ff'
  },
  
  sunset: {
    primaryColor: '#ff6b35',
    secondaryColor: '#f7931e',
    accentColor: '#ffd23f'
  }
}

// Configuración de animaciones
export const animationConfig = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5
  },
  
  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  spring: {
    stiffness: 300,
    damping: 30
  }
}

// Configuración de breakpoints responsive
export const responsiveConfig = {
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    wide: 1200
  },
  
  sizes: {
    mobile: {
      toggleButton: 60,
      windowWidth: 'calc(100vw - 1rem)',
      windowHeight: 'calc(100vh - 1rem)'
    },
    desktop: {
      toggleButton: 70,
      windowWidth: '350px',
      windowHeight: '500px'
    }
  }
}
