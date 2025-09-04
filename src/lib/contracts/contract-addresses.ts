// Direcciones de contratos inteligentes por red
export const CONTRACT_ADDRESSES = {
  // Base Sepolia (testnet)
  baseSepolia: {
    TICKET_NFT: '0xB409A4908102A9Ec3e4e65a30e97706df38fbdd7', // ✅ Desplegado
    MARKETPLACE: '0xbd31a954BadFe27D4f8fD1E6bcA445A69e60B5Dd', // ✅ Desplegado
    VALIDATOR: '0xB1627A905EB21938009f5fA97C9dd35ffB9F1e82', // ✅ Desplegado
    FACTORY: '0xcA4b95E7131117f42e3aCc100cD1d58802AF6066', // ✅ Desplegado (Simple)
    DEPLOYER: '0x0000000000000000000000000000000000000000', // ❌ No necesario
  },
  // Base Mainnet
  base: {
    TICKET_NFT: '0x0000000000000000000000000000000000000000', // Por desplegar
    MARKETPLACE: '0x0000000000000000000000000000000000000000', // Por desplegar
    VALIDATOR: '0x0000000000000000000000000000000000000000', // Por desplegar
    FACTORY: '0x0000000000000000000000000000000000000000', // Por desplegar
    DEPLOYER: '0x0000000000000000000000000000000000000000', // ❌ No necesario
  }
} as const

export const CHAIN_IDS = {
  baseSepolia: 84532,
  base: 8453,
} as const

export function getContractAddress(contractName: keyof typeof CONTRACT_ADDRESSES.baseSepolia, chainId: number) {
  if (chainId === CHAIN_IDS.baseSepolia) {
    return CONTRACT_ADDRESSES.baseSepolia[contractName]
  }
  if (chainId === CHAIN_IDS.base) {
    return CONTRACT_ADDRESSES.base[contractName]
  }
  
  // Fallback a Base Sepolia para desarrollo
  console.warn(`Chain ${chainId} not configured, using Base Sepolia contracts`)
  return CONTRACT_ADDRESSES.baseSepolia[contractName]
}

// Función para obtener todas las direcciones de contratos
export function getAllContractAddresses(chainId: number) {
  if (chainId === CHAIN_IDS.baseSepolia) {
    return CONTRACT_ADDRESSES.baseSepolia
  }
  if (chainId === CHAIN_IDS.base) {
    return CONTRACT_ADDRESSES.base
  }
  
  // Fallback a Base Sepolia para desarrollo
  console.warn(`Chain ${chainId} not configured, using Base Sepolia contracts`)
  return CONTRACT_ADDRESSES.baseSepolia
}