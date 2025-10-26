import { NeynarAPIClient } from '@neynar/nodejs-sdk'

// Cliente de Neynar para enviar notificaciones
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!)

interface NotificationFilters {
  exclude_fids?: number[]
  following_fid?: number
  minimum_user_score?: number
  near_location?: {
    latitude: number
    longitude: number
    radius?: number
    address?: {
      city?: string
      state?: string
      state_code?: string
      country?: string
      country_code?: string
    }
  }
}

interface NotificationContent {
  title: string
  body: string
  target_url: string
  uuid?: string
}

interface SendNotificationResult {
  success: boolean
  data?: any
  error?: string
}

/**
 * Envía una notificación a usuarios de la Mini App
 * @param targetFids - Array de FIDs objetivo (vacío = todos los usuarios con notificaciones habilitadas)
 * @param filters - Filtros opcionales para segmentar destinatarios
 * @param notification - Contenido de la notificación
 */
export async function sendNotification(
  targetFids: number[] = [],
  filters: NotificationFilters = {},
  notification: NotificationContent
): Promise<SendNotificationResult> {
  try {
    console.log('📤 Enviando notificación con Neynar...')
    console.log('🎯 Target FIDs:', targetFids.length > 0 ? targetFids : 'Todos los usuarios')
    console.log('🔍 Filtros:', filters)
    console.log('📝 Notificación:', notification)

    const response = await client.publishFrameNotifications({
      targetFids,
      filters,
      notification
    })

    console.log('✅ Notificación enviada exitosamente:', response)

    return {
      success: true,
      data: response
    }
  } catch (error) {
    console.error('❌ Error al enviar notificación:', error)
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

/**
 * Envía notificación de evento creado
 */
export async function sendEventCreatedNotification(
  eventTitle: string,
  eventId: string,
  targetFids: number[] = []
): Promise<SendNotificationResult> {
  return sendNotification(
    targetFids,
    {},
    {
      title: '🎉 Nuevo Evento Disponible',
      body: `Se ha creado un nuevo evento: ${eventTitle}`,
      target_url: `${process.env.NEXT_PUBLIC_URL}/events/${eventId}`,
      uuid: `event-created-${eventId}-${Date.now()}`
    }
  )
}

/**
 * Envía notificación de ticket comprado
 */
export async function sendTicketPurchasedNotification(
  eventTitle: string,
  ticketId: string,
  targetFids: number[] = []
): Promise<SendNotificationResult> {
  return sendNotification(
    targetFids,
    {},
    {
      title: '🎫 Ticket Comprado',
      body: `Has comprado un ticket para: ${eventTitle}`,
      target_url: `${process.env.NEXT_PUBLIC_URL}/my-tickets`,
      uuid: `ticket-purchased-${ticketId}-${Date.now()}`
    }
  )
}

/**
 * Envía notificación de evento próximo
 */
export async function sendEventReminderNotification(
  eventTitle: string,
  eventId: string,
  targetFids: number[] = []
): Promise<SendNotificationResult> {
  return sendNotification(
    targetFids,
    {},
    {
      title: '⏰ Recordatorio de Evento',
      body: `Tu evento "${eventTitle}" está próximo`,
      target_url: `${process.env.NEXT_PUBLIC_URL}/events/${eventId}`,
      uuid: `event-reminder-${eventId}-${Date.now()}`
    }
  )
}

/**
 * Envía notificación personalizada
 */
export async function sendCustomNotification(
  title: string,
  body: string,
  targetUrl: string,
  targetFids: number[] = [],
  filters: NotificationFilters = {}
): Promise<SendNotificationResult> {
  return sendNotification(
    targetFids,
    filters,
    {
      title,
      body,
      target_url: targetUrl,
      uuid: `custom-${Date.now()}`
    }
  )
}

export { client }
