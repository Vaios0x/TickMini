import { NextRequest, NextResponse } from 'next/server'

interface SendNotificationRequest {
  fid: number
  appFid: number
  title: string
  body: string
  targetUrl?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SendNotificationRequest = await request.json()
    const { fid, appFid, title, body: notificationBody, targetUrl } = body

    // Validar datos requeridos
    if (!fid || !appFid || !title || !notificationBody) {
      return NextResponse.json(
        { error: 'Missing required fields: fid, appFid, title, body' },
        { status: 400 }
      )
    }

    // Validar longitudes según especificaciones
    if (title.length > 32) {
      return NextResponse.json(
        { error: 'Title must be 32 characters or less' },
        { status: 400 }
      )
    }

    if (notificationBody.length > 128) {
      return NextResponse.json(
        { error: 'Body must be 128 characters or less' },
        { status: 400 }
      )
    }

    // URL por defecto
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://tickmini.vercel.app'
    const finalTargetUrl = targetUrl ? `${baseUrl}${targetUrl}` : baseUrl

    // Validar que la URL sea del mismo dominio
    if (!finalTargetUrl.startsWith(baseUrl)) {
      return NextResponse.json(
        { error: 'Target URL must be on the same domain as the Mini App' },
        { status: 400 }
      )
    }

    // Simular envío de notificación
    // En un entorno real, aquí se consultaría la base de datos para obtener el token
    console.log('📤 Sending notification:', {
      fid,
      appFid,
      title,
      body: notificationBody,
      targetUrl: finalTargetUrl
    })

    // Simular respuesta exitosa
    const response = {
      success: true,
      message: 'Notification sent successfully',
      data: {
        fid,
        appFid,
        title,
        body: notificationBody,
        targetUrl: finalTargetUrl,
        timestamp: new Date().toISOString()
      }
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('❌ Error in notifications/send API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
