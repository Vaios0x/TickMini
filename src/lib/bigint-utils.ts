/**
 * Utilidades para manejar BigInt en la aplicación
 * Convierte BigInt a string para serialización JSON
 */

/**
 * Convierte recursivamente todos los BigInt en un objeto a string
 * @param obj - El objeto a convertir
 * @returns El objeto con BigInt convertidos a string
 */
export function convertBigIntToString(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj
  }
  
  if (typeof obj === 'bigint') {
    return obj.toString()
  }
  
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString)
  }
  
  if (typeof obj === 'object') {
    const converted: any = {}
    for (const [key, value] of Object.entries(obj)) {
      converted[key] = convertBigIntToString(value)
    }
    return converted
  }
  
  return obj
}

/**
 * Convierte un string a BigInt de forma segura
 * @param value - El valor a convertir
 * @returns BigInt o null si no se puede convertir
 */
export function safeStringToBigInt(value: string | number | bigint): bigint | null {
  try {
    if (typeof value === 'bigint') {
      return value
    }
    if (typeof value === 'number') {
      return BigInt(value)
    }
    if (typeof value === 'string') {
      return BigInt(value)
    }
    return null
  } catch {
    return null
  }
}

/**
 * Formatea un BigInt como número legible
 * @param value - El BigInt a formatear
 * @param decimals - Número de decimales (por defecto 18)
 * @returns String formateado
 */
export function formatBigInt(value: bigint | string, decimals: number = 18): string {
  try {
    const bigIntValue = typeof value === 'string' ? BigInt(value) : value
    const divisor = BigInt(10 ** decimals)
    const quotient = bigIntValue / divisor
    const remainder = bigIntValue % divisor
    
    if (remainder === BigInt(0)) {
      return quotient.toString()
    }
    
    const remainderStr = remainder.toString().padStart(decimals, '0')
    const trimmedRemainder = remainderStr.replace(/0+$/, '')
    
    if (trimmedRemainder === '') {
      return quotient.toString()
    }
    
    return `${quotient}.${trimmedRemainder}`
  } catch {
    return '0'
  }
}

/**
 * Convierte un timestamp BigInt a Date
 * @param timestamp - Timestamp en BigInt
 * @returns Date object
 */
export function bigIntToDate(timestamp: bigint | string): Date {
  try {
    const bigIntValue = typeof timestamp === 'string' ? BigInt(timestamp) : timestamp
    return new Date(Number(bigIntValue) * 1000) // Asumiendo que es timestamp en segundos
  } catch {
    return new Date()
  }
}

/**
 * Convierte un Date a timestamp BigInt
 * @param date - Date object
 * @returns BigInt timestamp
 */
export function dateToBigInt(date: Date): bigint {
  return BigInt(Math.floor(date.getTime() / 1000))
}
