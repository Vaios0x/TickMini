// Embed Metadata para TickMini - Cumple con Featured Guidelines de Base

export interface EmbedMetadata {
  title: string
  description: string
  image: string
  url: string
  type: 'website'
  siteName: string
  locale: string
  twitter?: {
    card: 'summary_large_image'
    site: string
    creator: string
    title: string
    description: string
    image: string
  }
  openGraph?: {
    title: string
    description: string
    url: string
    siteName: string
    images: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
    locale: string
    type: 'website'
  }
}

// Metadata para la página principal
export const homeMetadata: EmbedMetadata = {
  title: 'TickMini - Tickets NFT en Base Network',
  description: 'Plataforma revolucionaria de venta y gestión de boletos NFT en Base Network. Tickets únicos, transacciones instantáneas y máxima seguridad blockchain.',
  image: 'https://tickmini.app/images/og-image.svg',
  url: 'https://tickmini.app',
  type: 'website',
  siteName: 'TickMini',
  locale: 'es_ES',
  twitter: {
    card: 'summary_large_image',
    site: '@tickmini',
    creator: '@tickmini',
    title: 'TickMini - Tickets NFT en Base Network',
    description: 'Plataforma revolucionaria de venta y gestión de boletos NFT en Base Network. Tickets únicos, transacciones instantáneas y máxima seguridad blockchain.',
    image: 'https://tickmini.app/images/og-image.svg'
  },
  openGraph: {
    title: 'TickMini - Tickets NFT en Base Network',
    description: 'Plataforma revolucionaria de venta y gestión de boletos NFT en Base Network. Tickets únicos, transacciones instantáneas y máxima seguridad blockchain.',
    url: 'https://tickmini.app',
    siteName: 'TickMini',
    images: [
      {
        url: 'https://tickmini.app/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'TickMini - Tickets NFT en Base Network'
      }
    ],
    locale: 'es_ES',
    type: 'website'
  }
}

// Metadata para eventos
export function getEventMetadata(event: {
  id: string
  title: string
  description: string
  image: string
  date: string
  location: string
  price: string
}): EmbedMetadata {
  return {
    title: `${event.title} - TickMini`,
    description: `${event.description} | ${event.date} | ${event.location} | ${event.price}`,
    image: event.image,
    url: `https://tickmini.app/events/${event.id}`,
    type: 'website',
    siteName: 'TickMini',
    locale: 'es_ES',
    twitter: {
      card: 'summary_large_image',
      site: '@tickmini',
      creator: '@tickmini',
      title: `${event.title} - TickMini`,
      description: `${event.description} | ${event.date} | ${event.location} | ${event.price}`,
      image: event.image
    },
    openGraph: {
      title: `${event.title} - TickMini`,
      description: `${event.description} | ${event.date} | ${event.location} | ${event.price}`,
      url: `https://tickmini.app/events/${event.id}`,
      siteName: 'TickMini',
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: event.title
        }
      ],
      locale: 'es_ES',
      type: 'website'
    }
  }
}

// Metadata para tickets
export function getTicketMetadata(ticket: {
  id: string
  eventTitle: string
  eventImage: string
  owner: string
  price: string
}): EmbedMetadata {
  return {
    title: `Ticket NFT - ${ticket.eventTitle}`,
    description: `Ticket NFT único para ${ticket.eventTitle} | Propietario: ${ticket.owner} | Precio: ${ticket.price}`,
    image: ticket.eventImage,
    url: `https://tickmini.app/tickets/${ticket.id}`,
    type: 'website',
    siteName: 'TickMini',
    locale: 'es_ES',
    twitter: {
      card: 'summary_large_image',
      site: '@tickmini',
      creator: '@tickmini',
      title: `Ticket NFT - ${ticket.eventTitle}`,
      description: `Ticket NFT único para ${ticket.eventTitle} | Propietario: ${ticket.owner} | Precio: ${ticket.price}`,
      image: ticket.eventImage
    },
    openGraph: {
      title: `Ticket NFT - ${ticket.eventTitle}`,
      description: `Ticket NFT único para ${ticket.eventTitle} | Propietario: ${ticket.owner} | Precio: ${ticket.price}`,
      url: `https://tickmini.app/tickets/${ticket.id}`,
      siteName: 'TickMini',
      images: [
        {
          url: ticket.eventImage,
          width: 1200,
          height: 630,
          alt: `Ticket NFT - ${ticket.eventTitle}`
        }
      ],
      locale: 'es_ES',
      type: 'website'
    }
  }
}

// Metadata para perfiles de usuario
export function getUserMetadata(user: {
  fid: number
  username: string
  displayName: string
  pfpUrl: string
  bio: string
}): EmbedMetadata {
  return {
    title: `${user.displayName} (@${user.username}) - TickMini`,
    description: user.bio || `Perfil de ${user.displayName} en TickMini`,
    image: user.pfpUrl,
    url: `https://tickmini.app/profile/${user.fid}`,
    type: 'website',
    siteName: 'TickMini',
    locale: 'es_ES',
    twitter: {
      card: 'summary_large_image',
      site: '@tickmini',
      creator: '@tickmini',
      title: `${user.displayName} (@${user.username}) - TickMini`,
      description: user.bio || `Perfil de ${user.displayName} en TickMini`,
      image: user.pfpUrl
    },
    openGraph: {
      title: `${user.displayName} (@${user.username}) - TickMini`,
      description: user.bio || `Perfil de ${user.displayName} en TickMini`,
      url: `https://tickmini.app/profile/${user.fid}`,
      siteName: 'TickMini',
      images: [
        {
          url: user.pfpUrl,
          width: 1200,
          height: 630,
          alt: `${user.displayName} (@${user.username})`
        }
      ],
      locale: 'es_ES',
      type: 'website'
    }
  }
}

// Función para generar metadata dinámico
export function generateMetadata(type: 'home' | 'event' | 'ticket' | 'user', data?: any): EmbedMetadata {
  switch (type) {
    case 'home':
      return homeMetadata
    case 'event':
      return getEventMetadata(data)
    case 'ticket':
      return getTicketMetadata(data)
    case 'user':
      return getUserMetadata(data)
    default:
      return homeMetadata
  }
}

// Función para validar metadata
export function validateMetadata(metadata: EmbedMetadata): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Validar campos requeridos
  if (!metadata.title || metadata.title.length > 60) {
    errors.push('Title is required and must be ≤ 60 characters')
  }

  if (!metadata.description || metadata.description.length > 160) {
    errors.push('Description is required and must be ≤ 160 characters')
  }

  if (!metadata.image || !metadata.image.startsWith('https://')) {
    errors.push('Image is required and must be HTTPS URL')
  }

  if (!metadata.url || !metadata.url.startsWith('https://')) {
    errors.push('URL is required and must be HTTPS')
  }

  // Validar Twitter metadata
  if (metadata.twitter) {
    if (!metadata.twitter.title || metadata.twitter.title.length > 70) {
      errors.push('Twitter title must be ≤ 70 characters')
    }
    if (!metadata.twitter.description || metadata.twitter.description.length > 200) {
      errors.push('Twitter description must be ≤ 200 characters')
    }
  }

  // Validar OpenGraph metadata
  if (metadata.openGraph) {
    if (!metadata.openGraph.title || metadata.openGraph.title.length > 95) {
      errors.push('OpenGraph title must be ≤ 95 characters')
    }
    if (!metadata.openGraph.description || metadata.openGraph.description.length > 200) {
      errors.push('OpenGraph description must be ≤ 200 characters')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}