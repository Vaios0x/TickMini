import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http, formatUnits } from 'viem'
import { baseSepolia, base } from 'viem/chains'
import { convertBigIntToString } from '@/lib/bigint-utils'

// Configuración de clientes para diferentes redes
const clients = {
  [baseSepolia.id]: createPublicClient({
    chain: baseSepolia,
    transport: http('https://sepolia.base.org')
  }),
  [base.id]: createPublicClient({
    chain: base,
    transport: http('https://mainnet.base.org')
  })
}

export async function POST(request: NextRequest) {
  try {
    const { contractAddress, abi, functionName, args, chainId } = await request.json()

    if (!contractAddress || !abi || !functionName || !chainId) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const client = clients[chainId as keyof typeof clients]
    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Unsupported chain ID' },
        { status: 400 }
      )
    }

    console.log(`📞 Contract call: ${functionName} on chain ${chainId}`)
    console.log(`📍 Contract: ${contractAddress}`)
    console.log(`📋 Args:`, args)

    // Hacer la llamada al contrato
    const result = await client.readContract({
      address: contractAddress as `0x${string}`,
      abi,
      functionName,
      args: args || []
    })

    console.log(`✅ Contract call result:`, result)

    // Convertir BigInt a string para serialización JSON
    const serializedResult = convertBigIntToString(result)

    return NextResponse.json({
      success: true,
      data: serializedResult
    })

  } catch (error: any) {
    console.error('❌ Contract call error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Contract call failed',
        details: error.details || null
      },
      { status: 500 }
    )
  }
}
