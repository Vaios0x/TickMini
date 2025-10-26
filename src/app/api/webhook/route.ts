import { NextRequest, NextResponse } from 'next/server'
import {
  parseWebhookEvent,
  verifyAppKeyWithNeynar,
} from '@farcaster/miniapp-node'

// Tipos para los datos de notificación
interface NotificationDetails {
  url: string
  token: string
}

interface WebhookEvent {
  event: 'miniapp_added' | 'miniapp_removed' | 'notifications_enabled' | 'notifications_disabled'
  notificationDetails?: NotificationDetails
}

interface WebhookData {
  fid: number
  appFid: number
  event: WebhookEvent
}

// Simulación de base de datos en memoria (en producción usar Redis/DB)
const notificationTokens = new Map<string, NotificationDetails>()

// Función para generar clave única
function generateKey(fid: number, appFid: number): string {
  return `${fid}-${appFid}`
}

// Función para guardar detalles de notificación
async function setUserNotificationDetails(
  fid: number,
  appFid: number,
  notificationDetails: NotificationDetails
): Promise<void> {
  const key = generateKey(fid, appFid)
  notificationTokens.set(key, notificationDetails)
  console.log(`✅ Notification details saved for FID ${fid}, AppFID ${appFid}`)
}

// Función para eliminar detalles de notificación
async function deleteUserNotificationDetails(
  fid: number,
  appFid: number
): Promise<void> {
  const key = generateKey(fid, appFid)
  notificationTokens.delete(key)
  console.log(`🗑️ Notification details deleted for FID ${fid}, AppFID ${appFid}`)
}

// Función para obtener detalles de notificación
async function getUserNotificationDetails(
  fid: number,
  appFid: number
): Promise<NotificationDetails | null> {
  const key = generateKey(fid, appFid)
  return notificationTokens.get(key) || null
}

// Función para enviar notificación
async function sendMiniAppNotification({
  fid,
  appFid,
  title,
  body,
  targetUrl = process.env.NEXT_PUBLIC_URL || 'https://tickmini.vercel.app'
}: {
  fid: number
  appFid: number
  title: string
  body: string
  targetUrl?: string
}): Promise<{ state: 'success' | 'no_token' | 'error' | 'rate_limit', error?: any }> {
  const notificationDetails = await getUserNotificationDetails(fid, appFid)
  
  if (!notificationDetails) {
    console.log(`❌ No notification token found for FID ${fid}, AppFID ${appFid}`)
    return { state: 'no_token' }
  }

  try {
    const response = await fetch(notificationDetails.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notificationId: crypto.randomUUID(),
        title,
        body,
        targetUrl,
        tokens: [notificationDetails.token],
      }),
    })

    const responseJson = await response.json()

    if (response.status === 200) {
      if (responseJson.result?.rateLimitedTokens?.length > 0) {
        console.log(`⏰ Rate limited for FID ${fid}, AppFID ${appFid}`)
        return { state: 'rate_limit' }
      }
      
      console.log(`✅ Notification sent successfully to FID ${fid}, AppFID ${appFid}`)
      return { state: 'success' }
    } else {
      console.error(`❌ Notification failed for FID ${fid}, AppFID ${appFid}:`, responseJson)
      return { state: 'error', error: responseJson }
    }
  } catch (error) {
    console.error(`❌ Error sending notification to FID ${fid}, AppFID ${appFid}:`, error)
    return { state: 'error', error }
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestJson = await request.json()
    console.log('📨 Webhook received:', JSON.stringify(requestJson, null, 2))

    // Parse and verify the webhook event
    let data: WebhookData
    try {
      data = await parseWebhookEvent(requestJson, verifyAppKeyWithNeynar)
      console.log('✅ Webhook event verified successfully')
    } catch (e: unknown) {
      console.error('❌ Webhook verification failed:', e)
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }

    // Extract webhook data
    const { fid, appFid, event } = data
    console.log(`📋 Processing event: ${event.event} for FID ${fid}, AppFID ${appFid}`)

    // Handle different event types
    try {
      switch (event.event) {
        case 'miniapp_added':
          console.log('🎉 Mini App added!')
          if (event.notificationDetails) {
            await setUserNotificationDetails(fid, appFid, event.notificationDetails)
            
            // Send welcome notification
            await sendMiniAppNotification({
              fid,
              appFid,
              title: '🎫 ¡Bienvenido a TickMini!',
              body: 'Tu Mini App de ticketing NFT está lista para usar',
              targetUrl: `${process.env.NEXT_PUBLIC_URL || 'https://tickmini.vercel.app'}/events`
            })
          } else {
            console.log('ℹ️ Mini App added without notifications')
          }
          break

        case 'miniapp_removed':
          console.log('👋 Mini App removed')
          await deleteUserNotificationDetails(fid, appFid)
          break

        case 'notifications_enabled':
          console.log('🔔 Notifications enabled!')
          if (event.notificationDetails) {
            await setUserNotificationDetails(fid, appFid, event.notificationDetails)
            
            // Send confirmation notification
            await sendMiniAppNotification({
              fid,
              appFid,
              title: '🔔 Notificaciones Activadas',
              body: 'Ahora recibirás actualizaciones sobre tus eventos y tickets',
              targetUrl: `${process.env.NEXT_PUBLIC_URL || 'https://tickmini.vercel.app'}/profile`
            })
          }
          break

        case 'notifications_disabled':
          console.log('🔕 Notifications disabled')
          await deleteUserNotificationDetails(fid, appFid)
          break

        default:
          console.log(`❓ Unknown event type: ${event.event}`)
      }
    } catch (error) {
      console.error('❌ Error processing webhook event:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('❌ Webhook processing failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}