// Imágenes personalizadas y estilizadas para eventos basadas en categoría
export const getDefaultEventImage = (category: string): string => {
  const defaultImages: Record<string, string> = {
    tech: 'https://picsum.photos/400/300?random=1',
    music: 'https://picsum.photos/400/300?random=2',
    art: 'https://picsum.photos/400/300?random=3',
    business: 'https://picsum.photos/400/300?random=4',
    gaming: 'https://picsum.photos/400/300?random=5',
    food: 'https://picsum.photos/400/300?random=6',
    sports: 'https://picsum.photos/400/300?random=7',
    education: 'https://picsum.photos/400/300?random=8'
  }
  
  return defaultImages[category] || 'https://picsum.photos/400/300?random=9'
}

// Imágenes personalizadas con estilo cartoon/ilustrado para cada categoría
export const getCustomEventImage = (category: string): string => {
  const customImages: Record<string, string> = {
    tech: 'https://picsum.photos/400/300?random=10',
    music: 'https://picsum.photos/400/300?random=11',
    art: 'https://picsum.photos/400/300?random=12',
    business: 'https://picsum.photos/400/300?random=13',
    gaming: 'https://picsum.photos/400/300?random=14',
    food: 'https://picsum.photos/400/300?random=15',
    sports: 'https://picsum.photos/400/300?random=16',
    education: 'https://picsum.photos/400/300?random=17'
  }
  
  return customImages[category] || 'https://picsum.photos/400/300?random=18'
}

// Función para validar si una URL de imagen es válida
export const isValidImageUrl = (url: string): boolean => {
  if (!url || url.trim() === '') return false
  
  // Verificar si es una URL válida
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Función para obtener la mejor imagen disponible
export const getBestEventImage = (userImage: string | undefined, category: string): string => {
  // Si el usuario proporcionó una imagen válida, usarla
  if (userImage && isValidImageUrl(userImage)) {
    return userImage
  }
  
  // Si no, usar imagen por defecto basada en categoría
  return getDefaultEventImage(category)
}
