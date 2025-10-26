// Servicio para enviar notificaciones a usuarios
export interface NotificationRequest {
  fid: number
  appFid: number
  title: string
  body: string
  targetUrl?: string
}

export interface NotificationResponse {
  success: boolean
  message: string
  error?: string
}

// Tipos de notificaciones específicas para TickMini
export type NotificationType = 
  | 'welcome'
  | 'event_created'
  | 'ticket_purchased'
  | 'ticket_transferred'
  | 'event_reminder'
  | 'price_drop'
  | 'new_event'
  | 'achievement_unlocked'

export interface TicketingNotification {
  type: NotificationType
  title: string
  body: string
  targetUrl: string
  data?: Record<string, any>
}

// Plantillas de notificaciones
export const NOTIFICATION_TEMPLATES: Record<NotificationType, TicketingNotification> = {
  welcome: {
    type: 'welcome',
    title: '🎫 ¡Bienvenido a TickMini!',
    body: 'Tu Mini App de ticketing NFT está lista para usar',
    targetUrl: '/events'
  },
  event_created: {
    type: 'event_created',
    title: '🎉 ¡Evento Creado!',
    body: 'Tu evento NFT ha sido creado exitosamente',
    targetUrl: '/my-events'
  },
  ticket_purchased: {
    type: 'ticket_purchased',
    title: '🎫 ¡Ticket Comprado!',
    body: 'Tu ticket NFT está listo en tu wallet',
    targetUrl: '/my-tickets'
  },
  ticket_transferred: {
    type: 'ticket_transferred',
    title: '🔄 Ticket Transferido',
    body: 'Has transferido tu ticket NFT exitosamente',
    targetUrl: '/my-tickets'
  },
  event_reminder: {
    type: 'event_reminder',
    title: '⏰ Recordatorio de Evento',
    body: 'Tu evento comienza pronto, ¡no te lo pierdas!',
    targetUrl: '/events'
  },
  price_drop: {
    type: 'price_drop',
    title: '💰 ¡Precio Reducido!',
    body: 'El precio de tu evento favorito ha bajado',
    targetUrl: '/events'
  },
  new_event: {
    type: 'new_event',
    title: '🆕 Nuevo Evento',
    body: 'Hay un nuevo evento que podría interesarte',
    targetUrl: '/events'
  },
  achievement_unlocked: {
    type: 'achievement_unlocked',
    title: '🏆 ¡Logro Desbloqueado!',
    body: 'Has desbloqueado un nuevo logro en TickMini',
    targetUrl: '/profile'
  }
}

// Función para enviar notificación
export async function sendNotification(
  request: NotificationRequest
): Promise<NotificationResponse> {
  try {
    const response = await fetch('/api/notifications/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    const result = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: 'Notification sent successfully'
      }
    } else {
      return {
        success: false,
        message: 'Failed to send notification',
        error: result.error || 'Unknown error'
      }
    }
  } catch (error) {
    console.error('Error sending notification:', error)
    return {
      success: false,
      message: 'Failed to send notification',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Función para enviar notificación usando plantilla
export async function sendTemplateNotification(
  fid: number,
  appFid: number,
  type: NotificationType,
  customData?: Record<string, any>
): Promise<NotificationResponse> {
  const template = NOTIFICATION_TEMPLATES[type]
  
  if (!template) {
    return {
      success: false,
      message: 'Invalid notification type',
      error: `Unknown notification type: ${type}`
    }
  }

  // Personalizar la notificación con datos específicos
  let title = template.title
  let body = template.body
  let targetUrl = template.targetUrl

  if (customData) {
    // Reemplazar placeholders en el título y cuerpo
    title = title.replace(/\{(\w+)\}/g, (match, key) => {
      return customData[key] || match
    })
    
    body = body.replace(/\{(\w+)\}/g, (match, key) => {
      return customData[key] || match
    })

    // Personalizar URL si se proporciona
    if (customData.targetUrl) {
      targetUrl = customData.targetUrl
    }
  }

  return await sendNotification({
    fid,
    appFid,
    title,
    body,
    targetUrl
  })
}

// Función para enviar notificación de bienvenida
export async function sendWelcomeNotification(
  fid: number,
  appFid: number
): Promise<NotificationResponse> {
  return await sendTemplateNotification(fid, appFid, 'welcome')
}

// Función para enviar notificación de evento creado
export async function sendEventCreatedNotification(
  fid: number,
  appFid: number,
  eventTitle: string
): Promise<NotificationResponse> {
  return await sendTemplateNotification(fid, appFid, 'event_created', {
    eventTitle,
    targetUrl: '/my-events'
  })
}

// Función para enviar notificación de ticket comprado
export async function sendTicketPurchasedNotification(
  fid: number,
  appFid: number,
  eventTitle: string
): Promise<NotificationResponse> {
  return await sendTemplateNotification(fid, appFid, 'ticket_purchased', {
    eventTitle,
    targetUrl: '/my-tickets'
  })
}

// Función para enviar notificación de recordatorio de evento
export async function sendEventReminderNotification(
  fid: number,
  appFid: number,
  eventTitle: string,
  timeUntilEvent: string
): Promise<NotificationResponse> {
  return await sendTemplateNotification(fid, appFid, 'event_reminder', {
    eventTitle,
    timeUntilEvent,
    targetUrl: '/events'
  })
}

// Función para enviar notificación de logro desbloqueado
export async function sendAchievementUnlockedNotification(
  fid: number,
  appFid: number,
  achievementName: string
): Promise<NotificationResponse> {
  return await sendTemplateNotification(fid, appFid, 'achievement_unlocked', {
    achievementName,
    targetUrl: '/profile'
  })
}
