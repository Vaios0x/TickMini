'use client'

import { useState, useCallback } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

interface ShareOptions {
  title: string
  description: string
  url?: string
  imageUrl?: string
}

export function useSocialShare() {
  const [isSharing, setIsSharing] = useState(false)
  const [lastShared, setLastShared] = useState<string | null>(null)

  const share = useCallback(async (options: ShareOptions) => {
    try {
      setIsSharing(true)
      
      const shareData = {
        title: options.title,
        description: options.description,
        url: options.url || window.location.href,
        imageUrl: options.imageUrl || `${window.location.origin}/images/og-image.svg`
      }

      // Usar Web Share API nativo como método principal
      if (navigator.share) {
        await navigator.share({
          title: shareData.title,
          text: shareData.description,
          url: shareData.url
        })
        setLastShared(shareData.title)
        return { success: true, method: 'native' }
      } else {
        // Fallback: copiar al clipboard
        await navigator.clipboard.writeText(shareData.url)
        setLastShared(shareData.title)
        return { success: true, method: 'clipboard' }
      }
    } catch (error) {
      console.error('Share failed:', error)
      return { success: false, error }
    } finally {
      setIsSharing(false)
    }
  }, [])

  const shareEvent = useCallback(async (event: any) => {
    return share({
      title: `🎫 ${event.title}`,
      description: `Únete a ${event.title} el ${event.date} en ${event.location}. Solo ${event.price} ETH!`,
      url: `${window.location.origin}/events/${event.id}`,
      imageUrl: event.image || `${window.location.origin}/images/og-image.svg`
    })
  }, [share])

  const shareTicket = useCallback(async (ticket: any) => {
    return share({
      title: `🎫 Mi ticket para ${ticket.eventTitle}`,
      description: `¡Tengo un ticket NFT para ${ticket.eventTitle}! Únete a mí el ${ticket.eventDate}.`,
      url: `${window.location.origin}/my-tickets`,
      imageUrl: ticket.image || `${window.location.origin}/images/og-image.svg`
    })
  }, [share])

  return {
    share,
    shareEvent,
    shareTicket,
    isSharing,
    lastShared
  }
}
