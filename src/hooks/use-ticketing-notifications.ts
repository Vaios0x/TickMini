'use client'

import { useCallback } from 'react'
import { useNotification } from '@/components/providers/notification-provider'

export function useTicketingNotifications() {
  const { addNotification } = useNotification()

  // Notificación de evento creado exitosamente
  const notifyEventCreated = useCallback((eventTitle: string) => {
    addNotification({
      type: 'success',
      title: '🎉 Evento Creado',
      message: `${eventTitle} está listo para vender tickets NFT`,
      duration: 5000
    })
  }, [addNotification])

  // Notificación de ticket comprado
  const notifyTicketPurchased = useCallback((eventTitle: string, ticketId: string) => {
    addNotification({
      type: 'success',
      title: '🎫 Ticket Comprado',
      message: `Tu NFT ticket para ${eventTitle} está listo`,
      duration: 5000,
      action: {
        label: 'Ver Ticket',
        onClick: () => window.open(`/my-tickets#${ticketId}`, '_blank')
      }
    })
  }, [addNotification])

  // Notificación de evento próximo
  const notifyEventStarting = useCallback((eventTitle: string, timeLeft: string) => {
    addNotification({
      type: 'info',
      title: '⏰ Evento Próximo',
      message: `${eventTitle} comienza en ${timeLeft}`,
      duration: 0, // No auto-remove
      action: {
        label: 'Ver Detalles',
        onClick: () => window.open('/events', '_blank')
      }
    })
  }, [addNotification])

  // Notificación de precio bajo
  const notifyPriceDrop = useCallback((eventTitle: string, newPrice: string) => {
    addNotification({
      type: 'info',
      title: '💰 Precio Reducido',
      message: `${eventTitle} ahora cuesta ${newPrice} ETH`,
      duration: 8000,
      action: {
        label: 'Comprar Ahora',
        onClick: () => window.open('/events', '_blank')
      }
    })
  }, [addNotification])

  // Notificación de ticket vendido (para creadores)
  const notifyTicketSold = useCallback((eventTitle: string, amount: string) => {
    addNotification({
      type: 'success',
      title: '💸 Ticket Vendido',
      message: `Ticket de ${eventTitle} vendido por ${amount} ETH`,
      duration: 5000
    })
  }, [addNotification])

  // Notificación de evento cancelado
  const notifyEventCancelled = useCallback((eventTitle: string) => {
    addNotification({
      type: 'warning',
      title: '❌ Evento Cancelado',
      message: `${eventTitle} ha sido cancelado. Reembolso automático en proceso`,
      duration: 0, // No auto-remove
      action: {
        label: 'Ver Reembolso',
        onClick: () => window.open('/my-tickets', '_blank')
      }
    })
  }, [addNotification])

  // Notificación de nuevo evento disponible
  const notifyNewEvent = useCallback((eventTitle: string, category: string) => {
    addNotification({
      type: 'info',
      title: '🆕 Nuevo Evento',
      message: `${eventTitle} - ${category} está disponible`,
      duration: 6000,
      action: {
        label: 'Explorar',
        onClick: () => window.open('/events', '_blank')
      }
    })
  }, [addNotification])

  // Notificación de logro desbloqueado
  const notifyAchievement = useCallback((achievement: string) => {
    addNotification({
      type: 'success',
      title: '🏆 Logro Desbloqueado',
      message: achievement,
      duration: 7000,
      action: {
        label: 'Ver Perfil',
        onClick: () => window.open('/profile', '_blank')
      }
    })
  }, [addNotification])

  return {
    notifyEventCreated,
    notifyTicketPurchased,
    notifyEventStarting,
    notifyPriceDrop,
    notifyTicketSold,
    notifyEventCancelled,
    notifyNewEvent,
    notifyAchievement
  }
}
