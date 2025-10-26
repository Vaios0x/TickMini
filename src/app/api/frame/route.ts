import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { untrustedData } = body
    
    if (!untrustedData) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 })
    }

    const ticketId = untrustedData.inputText || ''
    
    // Simular verificación de ticket
    const isValidTicket = ticketId.length > 0 && /^[A-Z0-9]+$/.test(ticketId)
    
    if (isValidTicket) {
      // Ticket válido - mostrar información
      return NextResponse.json({
        type: 'frame',
        image: `https://tickmini.app/api/frame/valid?ticketId=${ticketId}`,
        buttons: [
          {
            label: 'Ver Ticket',
            action: 'link',
            target: `https://tickmini.app/tickets/${ticketId}`
          },
          {
            label: 'Compartir',
            action: 'link',
            target: `https://tickmini.app/share/${ticketId}`
          }
        ]
      })
    } else {
      // Ticket inválido - mostrar error
      return NextResponse.json({
        type: 'frame',
        image: `https://tickmini.app/api/frame/invalid?ticketId=${ticketId}`,
        buttons: [
          {
            label: 'Intentar de Nuevo',
            action: 'post'
          },
          {
            label: 'Ir a TickMini',
            action: 'link',
            target: 'https://tickmini.app'
          }
        ]
      })
    }
  } catch (error) {
    console.error('Frame error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  // Frame inicial
  return NextResponse.json({
    type: 'frame',
    image: 'https://tickmini.app/images/og-image.svg',
    input: {
      text: 'Ingresa tu ticket ID para verificar'
    },
    buttons: [
      {
        label: 'Verificar Ticket',
        action: 'post'
      },
      {
        label: 'Explorar Eventos',
        action: 'link',
        target: 'https://tickmini.app/events'
      }
    ]
  })
}
