import { createClient, Errors } from '@farcaster/quick-auth'
import { NextRequest, NextResponse } from 'next/server'

const domain = process.env.NEXT_PUBLIC_URL || 'https://tickmini.vercel.app'
const client = createClient()

// Tipos para la respuesta de autenticación
interface AuthResponse {
  fid: number
  authenticated: boolean
  timestamp: string
  domain: string
}

interface AuthError {
  error: string
  code: string
  timestamp: string
}

// Endpoint para verificar JWT y retornar FID del usuario autenticado
export async function GET(request: NextRequest): Promise<NextResponse<AuthResponse | AuthError>> {
  try {
    console.log('🔐 Auth endpoint called')
    
    // Obtener header de autorización
    const authorization = request.headers.get('Authorization')
    
    if (!authorization?.startsWith('Bearer ')) {
      console.log('❌ No Bearer token provided')
      return NextResponse.json(
        { 
          error: 'Unauthorized - No Bearer token provided',
          code: 'NO_TOKEN',
          timestamp: new Date().toISOString()
        },
        { status: 401 }
      )
    }

    // Extraer token
    const token = authorization.split(' ')[1]
    console.log('🔑 Token extracted, verifying...')

    try {
      // Verificar JWT con Quick Auth
      const payload = await client.verifyJwt({ token, domain })
      console.log('✅ JWT verified successfully:', { fid: payload.sub, domain: payload.aud })

      // Retornar datos del usuario autenticado
      const response: AuthResponse = {
        fid: payload.sub,
        authenticated: true,
        timestamp: new Date().toISOString(),
        domain: payload.aud
      }

      return NextResponse.json(response)

    } catch (e) {
      if (e instanceof Errors.InvalidTokenError) {
        console.log('❌ Invalid token error:', e.message)
        return NextResponse.json(
          { 
            error: 'Invalid token',
            code: 'INVALID_TOKEN',
            timestamp: new Date().toISOString()
          },
          { status: 401 }
        )
      }
      
      console.error('❌ Token verification error:', e)
      return NextResponse.json(
        { 
          error: 'Token verification failed',
          code: 'VERIFICATION_ERROR',
          timestamp: new Date().toISOString()
        },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('❌ Auth endpoint error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// Endpoint para obtener información detallada del usuario autenticado
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const authorization = request.headers.get('Authorization')
    
    if (!authorization?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authorization.split(' ')[1]
    const payload = await client.verifyJwt({ token, domain })

    // Obtener información adicional del usuario (simulado)
    const userInfo = {
      fid: payload.sub,
      authenticated: true,
      profile: {
        username: `user_${payload.sub}`,
        displayName: `User ${payload.sub}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${payload.sub}`,
        bio: 'TickMini User'
      },
      permissions: {
        canCreateEvents: true,
        canPurchaseTickets: true,
        canTransferTickets: true,
        canManageProfile: true
      },
      stats: {
        eventsCreated: 0,
        ticketsPurchased: 0,
        ticketsTransferred: 0,
        achievements: []
      },
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(userInfo)

  } catch (error) {
    console.error('❌ User info endpoint error:', error)
    return NextResponse.json(
      { error: 'Failed to get user info' },
      { status: 500 }
    )
  }
}
