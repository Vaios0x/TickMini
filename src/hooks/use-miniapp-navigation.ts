'use client'

import { useCallback } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'
import { useTicketingNotifications } from './use-ticketing-notifications'

export interface NavigationOptions {
  url: string
  text?: string
  embeds?: string[]
  castUrl?: string
}

export function useMiniAppNavigation() {
  const { notifyAchievement } = useTicketingNotifications()

  // Abrir URL externa usando SDK
  const openUrl = useCallback(async (url: string): Promise<void> => {
    try {
      console.log('🔗 Opening external URL:', url)
      await sdk.actions.openUrl(url)
      notifyAchievement('🔗 Enlace abierto exitosamente')
    } catch (error) {
      console.error('❌ Error opening URL:', error)
      notifyAchievement('❌ Error al abrir enlace')
    }
  }, [notifyAchievement])

  // Componer cast usando SDK
  const composeCast = useCallback(async (options: { text: string; embeds?: string[] }): Promise<void> => {
    try {
      console.log('📝 Composing cast:', options)
      await sdk.actions.composeCast({
        text: options.text,
        embeds: options.embeds || []
      })
      notifyAchievement('📝 Cast compuesto exitosamente')
    } catch (error) {
      console.error('❌ Error composing cast:', error)
      notifyAchievement('❌ Error al componer cast')
    }
  }, [notifyAchievement])

  // Ver cast usando SDK
  const viewCast = useCallback(async (castUrl: string): Promise<void> => {
    try {
      console.log('👀 Viewing cast:', castUrl)
      await sdk.actions.viewCast(castUrl)
      notifyAchievement('👀 Cast abierto exitosamente')
    } catch (error) {
      console.error('❌ Error viewing cast:', error)
      notifyAchievement('❌ Error al ver cast')
    }
  }, [notifyAchievement])

  // Navegación condicional basada en capacidades del cliente
  const conditionalNavigation = useCallback(async (options: NavigationOptions): Promise<void> => {
    try {
      const context = await sdk.context
      
      // Verificar si estamos en Mini App con capacidades específicas
      if (context.client?.clientFid) {
        // Estamos en Mini App con capacidades completas
        if (options.castUrl) {
          await viewCast(options.castUrl)
        } else if (options.text) {
          await composeCast({
            text: options.text,
            embeds: options.embeds
          })
        } else {
          await openUrl(options.url)
        }
      } else {
        // Fallback para navegadores normales
        if (options.castUrl) {
          window.open(options.castUrl, '_blank')
        } else if (options.text) {
          // Crear URL de composer para fallback
          const composerUrl = `https://farcaster.com/~/compose?text=${encodeURIComponent(options.text)}`
          window.open(composerUrl, '_blank')
        } else {
          window.open(options.url, '_blank')
        }
      }
    } catch (error) {
      console.error('❌ Error in conditional navigation:', error)
      notifyAchievement('❌ Error en navegación')
    }
  }, [openUrl, composeCast, viewCast])

  // Compartir evento como cast
  const shareEvent = useCallback(async (eventData: {
    title: string
    description: string
    url: string
    price: string
    date: string
    location: string
  }): Promise<void> => {
    const shareText = `🎫 ${eventData.title}\n💰 ${eventData.price}\n📅 ${eventData.date}\n📍 ${eventData.location}\n\n${eventData.description}\n\nComprar ticket: ${eventData.url}`
    
    await composeCast({
      text: shareText,
      embeds: [eventData.url]
    })
  }, [composeCast])

  // Compartir ticket como cast
  const shareTicket = useCallback(async (ticketData: {
    eventTitle: string
    ticketId: string
    url: string
    owner: string
  }): Promise<void> => {
    const shareText = `🎫 Ticket para: ${ticketData.eventTitle}\n🆔 ID: ${ticketData.ticketId}\n👤 Propietario: ${ticketData.owner}\n\nVer ticket: ${ticketData.url}`
    
    await composeCast({
      text: shareText,
      embeds: [ticketData.url]
    })
  }, [composeCast])

  // Abrir Base.org
  const openBaseOrg = useCallback(async (): Promise<void> => {
    await openUrl('https://base.org')
  }, [openUrl])

  // Abrir Twitter de Base
  const openBaseTwitter = useCallback(async (): Promise<void> => {
    await openUrl('https://twitter.com/base')
  }, [openUrl])

  // Abrir Discord de Base
  const openBaseDiscord = useCallback(async (): Promise<void> => {
    await openUrl('https://discord.gg/basechain')
  }, [openUrl])

  // Abrir documentación de Base
  const openBaseDocs = useCallback(async (): Promise<void> => {
    await openUrl('https://docs.base.org')
  }, [openUrl])

  return {
    // Funciones básicas del SDK
    openUrl,
    composeCast,
    viewCast,
    conditionalNavigation,
    
    // Funciones específicas de TickMini
    shareEvent,
    shareTicket,
    
    // Enlaces útiles
    openBaseOrg,
    openBaseTwitter,
    openBaseDiscord,
    openBaseDocs
  }
}
