'use client'

import { useState } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

interface ShareButtonProps {
  title: string
  description: string
  url?: string
  imageUrl?: string
  className?: string
}

export function ShareButton({ 
  title, 
  description, 
  url, 
  imageUrl,
  className = ""
}: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    try {
      setIsSharing(true)
      
      // Usar Web Share API nativo como método principal
      if (navigator.share) {
        await navigator.share({
          title,
          text: description,
          url: url || window.location.href
        })
      } else {
        // Fallback: copiar al clipboard
        await navigator.clipboard.writeText(url || window.location.href)
        alert('¡Enlace copiado al portapapeles!')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      // Fallback final: copiar al clipboard
      try {
        await navigator.clipboard.writeText(url || window.location.href)
        alert('¡Enlace copiado al portapapeles!')
      } catch (clipboardError) {
        console.error('Clipboard failed:', clipboardError)
      }
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 ${className}`}
      aria-label="Compartir contenido"
    >
      {isSharing ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Compartiendo...</span>
        </>
      ) : (
        <>
          <span>📤</span>
          <span>Compartir</span>
        </>
      )}
    </button>
  )
}
