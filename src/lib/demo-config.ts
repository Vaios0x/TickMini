// Configuración para transacciones reales en testnet
export const DEMO_CONFIG = {
  // Modo demo DESACTIVADO - usando contratos reales
  DEMO_MODE: false,
  
  // Configuración de transacciones patrocinadas
  SPONSORED_TRANSACTIONS: {
    enabled: false,
    paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL || 'https://api.pimlico.io/v2/base-sepolia/rpc',
    maxSponsoredAmount: '0.01', // ETH
    dailyLimit: 100, // Transacciones por día por usuario
    
    // Políticas de patrocinio
    policies: {
      create_event: {
        enabled: true,
        maxPerDay: 5,
        costLimit: '0.005' // ETH
      },
      buy_ticket: {
        enabled: true,
        maxPerDay: 20,
        costLimit: '0.003' // ETH
      },
      verify_ticket: {
        enabled: true,
        maxPerDay: 50,
        costLimit: '0.001' // ETH
      }
    }
  },
  
  // Precios reales en testnet (Base Sepolia)
  DEMO_PRICES: {
    create_event: '0.005', // ETH - precio real de gas
    buy_ticket_general: '0.05', // ETH - precio real de tickets
    buy_ticket_vip: '0.1', // ETH - precio real de tickets VIP
    verify_ticket: '0.001', // ETH - precio real de gas
    transfer_ticket: '0.002' // ETH - precio real de gas
  },
  
  // Mensajes para usuarios
  MESSAGES: {
    welcome: '🎫 ¡Bienvenido a TickBase en Base Sepolia!',
    sponsored: '🎉 Esta transacción está patrocinada - ¡GRATIS para ti!',
    lowCost: '💰 Precio real de testnet aplicado',
    realCost: '⚠️ En mainnet, esta transacción costaría aproximadamente',
    
    disclaimers: {
      demo: 'Estás usando TickBase en Base Sepolia (testnet)',
      testnet: 'Los tokens y transacciones son reales pero en testnet',
      learning: 'Perfecto para probar la plataforma con ETH de testnet'
    }
  },
  
  // Configuración de contratos reales
  DEMO_CONTRACTS: {
    // Contrato principal en Base Sepolia
    TICKET_NFT: {
      address: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7',
      network: 'base-sepolia',
      deployed: true,
      verified: false
    },
    
    // Contrato de marketplace
    MARKETPLACE: {
      address: '0xbd31a954BadFe27D4f8fD1E6bcA445A69e60B5Dd',
      network: 'base-sepolia',
      deployed: true,
      verified: false
    },
    
    // Contrato de validación
    VALIDATOR: {
      address: '0xB1627A905EB21938009f5fA97C9dd35ffB9F1e82',
      network: 'base-sepolia',
      deployed: true,
      verified: false
    },
    
    // Contrato de factory simplificado
    FACTORY: {
      address: '0xcA4b95E7131117f42e3aCc100cD1d58802AF6066',
      network: 'base-sepolia',
      deployed: true,
      verified: false
    }
  },
  
  // Configuración de metadatos reales
  DEMO_METADATA: {
    ipfsGateway: 'https://gateway.pinata.cloud/ipfs/',
    baseURI: 'ipfs://QmTickBase/',
    
    // Metadatos de ejemplo
    sampleEvent: {
      name: 'Web3 Conference 2025',
      description: 'La conferencia más importante de Web3 y blockchain en Base Network',
      image: 'ipfs://QmEvent123/image.png',
      animation_url: 'ipfs://QmEvent123/animation.mp4',
      attributes: [
        { trait_type: 'Event Type', value: 'Conference' },
        { trait_type: 'Network', value: 'Base Sepolia' },
        { trait_type: 'Environment', value: 'Testnet' }
      ]
    },
    
    sampleTicket: {
      name: 'Ticket NFT',
      description: 'Un ticket NFT real para eventos en TickBase',
      image: 'ipfs://QmTicket123/ticket.png',
      animation_url: 'ipfs://QmTicket123/animation.gif',
      attributes: [
        { trait_type: 'Ticket Type', value: 'General' },
        { trait_type: 'Validity', value: 'Valid' },
        { trait_type: 'Transferable', value: 'Yes' }
      ]
    }
  },
  
  // Límites de rate limiting para demo
  RATE_LIMITS: {
    createEvent: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 5 // máximo 5 eventos por ventana
    },
    buyTicket: {
      windowMs: 5 * 60 * 1000, // 5 minutos
      max: 10 // máximo 10 tickets por ventana
    },
    verifyTicket: {
      windowMs: 1 * 60 * 1000, // 1 minuto
      max: 20 // máximo 20 verificaciones por ventana
    }
  }
}

// Funciones utilitarias para el modo real
export const demoUtils = {
  // Verificar si está en modo demo (siempre false ahora)
  isDemo: (): boolean => false,
  
  // Obtener precio demo
  getDemoPrice: (transactionType: keyof typeof DEMO_CONFIG.DEMO_PRICES): string => {
    return DEMO_CONFIG.DEMO_PRICES[transactionType] || '0.001'
  },
  
  // Verificar si una transacción puede ser patrocinada
  canSponsor: (transactionType: keyof typeof DEMO_CONFIG.SPONSORED_TRANSACTIONS.policies): boolean => {
    if (!DEMO_CONFIG.SPONSORED_TRANSACTIONS.enabled) return false
    return DEMO_CONFIG.SPONSORED_TRANSACTIONS.policies[transactionType]?.enabled || false
  },
  
  // Obtener límite diario para un tipo de transacción
  getDailyLimit: (transactionType: keyof typeof DEMO_CONFIG.SPONSORED_TRANSACTIONS.policies): number => {
    return DEMO_CONFIG.SPONSORED_TRANSACTIONS.policies[transactionType]?.maxPerDay || 0
  },
  
  // Generar mensaje de transacción demo
  getDemoMessage: (transactionType: string, isSponsored: boolean): string => {
    const baseMessage = `${DEMO_CONFIG.MESSAGES.welcome}\n\n`
    const sponsorMessage = isSponsored ? 
      `${DEMO_CONFIG.MESSAGES.sponsored}\n` : 
      `${DEMO_CONFIG.MESSAGES.lowCost}\n`
    const disclaimer = `\n${DEMO_CONFIG.MESSAGES.disclaimers.demo}\n${DEMO_CONFIG.MESSAGES.disclaimers.testnet}`
    
    return baseMessage + sponsorMessage + disclaimer
  },
  
  // Obtener dirección de contrato para demo
  getContractAddress: (contractName: keyof typeof DEMO_CONFIG.DEMO_CONTRACTS): string => {
    return DEMO_CONFIG.DEMO_CONTRACTS[contractName].address
  },
  
  // Verificar si el contrato está desplegado
  isContractDeployed: (contractName: keyof typeof DEMO_CONFIG.DEMO_CONTRACTS): boolean => {
    return DEMO_CONFIG.DEMO_CONTRACTS[contractName].deployed
  }
}

// Configuración específica para diferentes redes
export const NETWORK_CONFIG = {
  'base-sepolia': {
    chainId: 84532,
    name: 'Base Sepolia',
    rpcUrl: 'https://sepolia.base.org',
    explorerUrl: 'https://sepolia.basescan.org',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    testnet: true
  },
  'base-mainnet': {
    chainId: 8453,
    name: 'Base',
    rpcUrl: 'https://mainnet.base.org',
    explorerUrl: 'https://basescan.org',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    testnet: false
  }
}

export default DEMO_CONFIG