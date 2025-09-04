'use client'

import React from 'react'
import { useChainId, useSwitchChain } from 'wagmi'
import { baseSepolia } from 'wagmi/chains'
import { motion, AnimatePresence } from 'framer-motion'

export function NetworkChecker() {
  const chainId = useChainId()
  const { switchChain, isPending } = useSwitchChain()
  
  const EXPECTED_CHAIN_ID = baseSepolia.id // 84532
  const isWrongNetwork = chainId && chainId !== EXPECTED_CHAIN_ID

  if (!isWrongNetwork) return null

  const handleSwitchNetwork = () => {
    switchChain({ chainId: EXPECTED_CHAIN_ID })
  }

  const getCurrentNetworkName = () => {
    const networks: Record<number, string> = {
      1: 'Ethereum Mainnet',
      8453: 'Base Mainnet',
      84532: 'Base Sepolia',
      137: 'Polygon',
      42161: 'Arbitrum One'
    }
    return networks[chainId] || `Chain ${chainId}`
  }

  return (
    <AnimatePresence>
      {/* Overlay de fondo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 10000,
          backdropFilter: 'blur(8px)'
        }}
      />
      
      {/* Modal principal */}
      <motion.div
        className="network-modal"
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10001,
          background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.95) 0%, rgba(139, 0, 0, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: 'clamp(16px, 4vw, 24px)',
          border: '2px solid rgba(255, 0, 0, 0.5)',
          padding: 'clamp(1.5rem, 5vw, 2.5rem)',
          width: 'clamp(320px, 90vw, 500px)',
          maxWidth: 'calc(100vw - 2rem)',
          maxHeight: 'calc(100vh - 2rem)',
          overflow: 'auto',
          boxShadow: '0 20px 40px rgba(255, 0, 0, 0.3), 0 0 80px rgba(255, 0, 0, 0.2)',
          textAlign: 'center',
          color: '#ffffff'
        }}
      >
        {/* Icono de advertencia */}
        <div style={{
          fontSize: 'clamp(3rem, 8vw, 4.5rem)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          filter: 'drop-shadow(0 0 20px rgba(255, 255, 0, 0.8))',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          ⚠️
        </div>

        {/* Título */}
        <h2 style={{
          color: '#ffffff',
          fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
          fontWeight: 'bold',
          textShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
          lineHeight: '1.2'
        }}>
          Red Incorrecta Detectada
        </h2>

        {/* Descripción */}
        <div style={{
          marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
          lineHeight: '1.6'
        }}>
          <p style={{ 
            marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
          }}>
            Estás conectado a <strong style={{ color: '#ffcccc' }}>{getCurrentNetworkName()}</strong>
          </p>
          <p style={{ 
            marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
          }}>
            Para usar TickBase de forma <strong style={{ color: '#00ff00' }}>GRATUITA</strong>, 
            necesitas cambiar a:
          </p>
          <div style={{
            background: 'rgba(0, 255, 0, 0.1)',
            border: '2px solid rgba(0, 255, 0, 0.3)',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            padding: 'clamp(0.8rem, 3vw, 1.2rem)',
            marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)'
          }}>
            <div style={{ 
              color: '#00ff00', 
              fontWeight: 'bold', 
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)'
            }}>
              🔵 Base Sepolia (Testnet)
            </div>
            <div style={{ 
              fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', 
              color: '#cccccc' 
            }}>
              Chain ID: 84532 • Transacciones GRATUITAS
            </div>
          </div>
        </div>

        {/* Información importante */}
        <div style={{
          background: 'rgba(255, 255, 0, 0.1)',
          border: '1px solid rgba(255, 255, 0, 0.3)',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          padding: 'clamp(0.8rem, 3vw, 1.2rem)',
          marginBottom: 'clamp(1.2rem, 3vw, 1.8rem)',
          textAlign: 'left'
        }}>
          <div style={{ 
            color: '#ffff00', 
            fontWeight: 'bold', 
            marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)',
            textAlign: 'center',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'
          }}>
            💡 ¿Por qué Base Sepolia?
          </div>
          <ul style={{ 
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', 
            lineHeight: '1.5',
            paddingLeft: 'clamp(0.8rem, 2vw, 1.2rem)',
            margin: 0
          }}>
            <li style={{ marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)' }}>
              ✅ <strong>Completamente GRATIS</strong> - No gastas ETH real
            </li>
            <li style={{ marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)' }}>
              🔄 Funciones idénticas a mainnet
            </li>
            <li style={{ marginBottom: 'clamp(0.3rem, 1vw, 0.5rem)' }}>
              🧪 Perfecto para testing y demos
            </li>
            <li>
              🚀 Mismo rendimiento que Base
            </li>
          </ul>
        </div>

        {/* Botón de cambio de red */}
        <button
          onClick={handleSwitchNetwork}
          disabled={isPending}
          style={{
            width: '100%',
            background: isPending 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'linear-gradient(135deg, #00ff00, #00ffff)',
            color: isPending ? '#cccccc' : '#000000',
            border: 'none',
            padding: 'clamp(0.8rem, 3vw, 1.2rem) clamp(1.5rem, 4vw, 2.5rem)',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
            fontWeight: 'bold',
            cursor: isPending ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.4rem, 1vw, 0.6rem)',
            marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
            minHeight: 'clamp(44px, 8vw, 56px)'
          }}
          onMouseEnter={(e) => {
            if (!isPending) {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 255, 0, 0.4)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isPending) {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }
          }}
        >
          {isPending ? (
            <>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid #000000',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Cambiando Red...
            </>
          ) : (
            <>
              🔄 Cambiar a Base Sepolia
            </>
          )}
        </button>

        {/* Instrucciones manuales */}
        <details style={{ 
          marginTop: 'clamp(0.8rem, 2vw, 1.2rem)', 
          cursor: 'pointer' 
        }}>
          <summary style={{ 
            color: '#cccccc', 
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)',
            padding: 'clamp(0.4rem, 1vw, 0.6rem)',
            borderRadius: 'clamp(4px, 1vw, 6px)',
            background: 'rgba(255, 255, 255, 0.05)',
            transition: 'background 0.2s ease'
          }}>
            📖 Cambiar manualmente en MetaMask
          </summary>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 'clamp(6px, 1.5vw, 8px)',
            padding: 'clamp(0.8rem, 2vw, 1.2rem)',
            fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
            textAlign: 'left',
            color: '#cccccc',
            marginTop: 'clamp(0.4rem, 1vw, 0.6rem)'
          }}>
            <div style={{ 
              marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)',
              wordBreak: 'break-all'
            }}>
              <strong>Network Name:</strong> Base Sepolia
            </div>
            <div style={{ 
              marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)',
              wordBreak: 'break-all'
            }}>
              <strong>RPC URL:</strong> https://sepolia.base.org
            </div>
            <div style={{ 
              marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)'
            }}>
              <strong>Chain ID:</strong> 84532
            </div>
            <div style={{ 
              marginBottom: 'clamp(0.4rem, 1vw, 0.6rem)'
            }}>
              <strong>Currency:</strong> ETH
            </div>
            <div style={{ wordBreak: 'break-all' }}>
              <strong>Explorer:</strong> https://sepolia.basescan.org
            </div>
          </div>
        </details>

        {/* CSS Animations y estilos responsive */}
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Mejoras responsive adicionales */
          @media (max-width: 480px) {
            .network-modal {
              margin: 1rem !important;
              max-height: calc(100vh - 2rem) !important;
            }
          }

          @media (max-width: 320px) {
            .network-modal {
              padding: 1rem !important;
              margin: 0.5rem !important;
            }
          }

          /* Mejorar legibilidad en pantallas pequeñas */
          @media (max-width: 768px) {
            .network-modal * {
              line-height: 1.4 !important;
            }
          }

          /* Hover effects para summary */
          details summary:hover {
            background: rgba(255, 255, 255, 0.1) !important;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  )
}