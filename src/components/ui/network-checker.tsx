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
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10001,
          background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.95) 0%, rgba(139, 0, 0, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '2px solid rgba(255, 0, 0, 0.5)',
          padding: '2rem',
          minWidth: '400px',
          maxWidth: '500px',
          boxShadow: '0 20px 40px rgba(255, 0, 0, 0.3), 0 0 80px rgba(255, 0, 0, 0.2)',
          textAlign: 'center',
          color: '#ffffff'
        }}
      >
        {/* Overlay de fondo */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: -1
          }}
        />

        {/* Icono de advertencia */}
        <div style={{
          fontSize: '4rem',
          marginBottom: '1rem',
          filter: 'drop-shadow(0 0 20px rgba(255, 255, 0, 0.8))',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          ⚠️
        </div>

        {/* Título */}
        <h2 style={{
          color: '#ffffff',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          fontWeight: 'bold',
          textShadow: '0 0 20px rgba(255, 0, 0, 0.5)'
        }}>
          Red Incorrecta Detectada
        </h2>

        {/* Descripción */}
        <div style={{
          marginBottom: '1.5rem',
          lineHeight: '1.6'
        }}>
          <p style={{ marginBottom: '1rem' }}>
            Estás conectado a <strong style={{ color: '#ffcccc' }}>{getCurrentNetworkName()}</strong>
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Para usar TickBase de forma <strong style={{ color: '#00ff00' }}>GRATUITA</strong>, 
            necesitas cambiar a:
          </p>
          <div style={{
            background: 'rgba(0, 255, 0, 0.1)',
            border: '2px solid rgba(0, 255, 0, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ 
              color: '#00ff00', 
              fontWeight: 'bold', 
              fontSize: '1.1rem',
              marginBottom: '0.5rem'
            }}>
              🔵 Base Sepolia (Testnet)
            </div>
            <div style={{ fontSize: '0.9rem', color: '#cccccc' }}>
              Chain ID: 84532 • Transacciones GRATUITAS
            </div>
          </div>
        </div>

        {/* Información importante */}
        <div style={{
          background: 'rgba(255, 255, 0, 0.1)',
          border: '1px solid rgba(255, 255, 0, 0.3)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          textAlign: 'left'
        }}>
          <div style={{ 
            color: '#ffff00', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            💡 ¿Por qué Base Sepolia?
          </div>
          <ul style={{ 
            fontSize: '0.9rem', 
            lineHeight: '1.5',
            paddingLeft: '1rem',
            margin: 0
          }}>
            <li>✅ <strong>Completamente GRATIS</strong> - No gastas ETH real</li>
            <li>🔄 Funciones idénticas a mainnet</li>
            <li>🧪 Perfecto para testing y demos</li>
            <li>🚀 Mismo rendimiento que Base</li>
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
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: isPending ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
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
        <details style={{ marginTop: '1rem', cursor: 'pointer' }}>
          <summary style={{ 
            color: '#cccccc', 
            fontSize: '0.9rem',
            marginBottom: '0.5rem'
          }}>
            📖 Cambiar manualmente en MetaMask
          </summary>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '1rem',
            fontSize: '0.8rem',
            textAlign: 'left',
            color: '#cccccc'
          }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Network Name:</strong> Base Sepolia
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>RPC URL:</strong> https://sepolia.base.org
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Chain ID:</strong> 84532
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Currency:</strong> ETH
            </div>
            <div>
              <strong>Explorer:</strong> https://sepolia.basescan.org
            </div>
          </div>
        </details>

        {/* CSS Animations */}
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  )
}