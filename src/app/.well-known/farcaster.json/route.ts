export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL || 'https://tickmini.vercel.app';
  
  // Manifest de Farcaster Mini App siguiendo las especificaciones oficiales
  const manifest = {
    // Account Association - Será firmado externamente usando Base.dev o Farcaster
    accountAssociation: {
      header: "",
      payload: "",
      signature: ""
    },
    
    // Base Builder Address para rewards
    baseBuilder: {
      ownerAddress: process.env.BASE_BUILDER_ADDRESS || "",
      verified: false
    },
    
    // Frame configuration para embeds
    frame: {
      imageUrl: `${URL}/images/og-image.svg`,
      postUrl: `${URL}/api/frame`,
      inputText: "Ingresa tu ticket ID para verificar"
    },
    
    // Primary category para clasificación
    primaryCategory: "ticketing",
    
    // Configuración de la Mini App
    miniapp: {
      // Versión del manifest
      version: "1",
      
      // Información básica de la app
      name: "TickMini",
      description: "Plataforma de tickets NFT para eventos en Base Network. Crea, compra y gestiona tickets únicos como NFTs.",
      iconUrl: `${URL}/icon-optimized.svg`,
      homeUrl: URL,
      canonicalDomain: "tickmini.app",
      
      // Cadenas soportadas (Base Network)
      requiredChains: ["eip155:8453"],
      
      // Tags para descubrimiento
      tags: ["ticketing", "nft", "events", "base", "miniapp"],
      
      // Capacidades requeridas por la Mini App
      requiredCapabilities: [
        "actions.ready",        // SDK está listo
        "actions.signIn",      // Autenticación con Quick Auth
        "actions.openUrl",     // Abrir URLs externas
        "actions.composeCast", // Crear casts
        "actions.viewCast"     // Ver casts
      ],
      
      // Webhook URL para notificaciones de Neynar
      webhookUrl: process.env.NEYNAR_WEBHOOK_URL || ""
    }
  };

  return Response.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
