'use client'

import * as React from 'react'
import { useState, useEffect, useCallback, useMemo } from 'react'

// Hook para optimizar el rendimiento
export function usePerformanceOptimizer() {
  const [isSlowConnection, setIsSlowConnection] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [connectionType, setConnectionType] = useState<string>('unknown')

  useEffect(() => {
    // Detectar tipo de conexión
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      setConnectionType(connection.effectiveType || 'unknown')
      setIsSlowConnection(connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
    }

    // Detectar dispositivo de gama baja
    const isLowEnd = navigator.hardwareConcurrency <= 2 || 
                     navigator.deviceMemory <= 4 ||
                     window.innerWidth <= 768
    setIsLowEndDevice(isLowEnd)
  }, [])

  return {
    isSlowConnection,
    isLowEndDevice,
    connectionType,
    shouldReduceAnimations: isSlowConnection || isLowEndDevice,
    shouldLazyLoad: isSlowConnection || isLowEndDevice
  }
}

// Componente de imagen optimizada
export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  quality = 75,
  ...props 
}: {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  quality?: number
  [key: string]: any
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { shouldLazyLoad } = usePerformanceOptimizer()

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  const imageProps = {
    ...props,
    src,
    alt,
    width,
    height,
    loading: priority || !shouldLazyLoad ? 'eager' : 'lazy',
    onLoad: handleLoad,
    onError: handleError,
    style: {
      ...props.style,
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 0.3s ease'
    }
  }

  if (hasError) {
    return (
      <div 
        style={{
          width,
          height,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 'clamp(8px, 2vw, 12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#b0b0b0',
          fontSize: 'clamp(0.8rem, 2vw, 1rem)'
        }}
      >
        🖼️
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width, height }}>
      {!isLoaded && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 'clamp(8px, 2vw, 12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#b0b0b0',
            fontSize: 'clamp(0.8rem, 2vw, 1rem)'
          }}
        >
          ⏳
        </div>
      )}
      <img {...imageProps} />
    </div>
  )
}

// Componente de lista virtualizada
export function VirtualizedList({ 
  items, 
  itemHeight, 
  containerHeight, 
  renderItem 
}: {
  items: any[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: any, index: number) => React.ReactNode
}) {
  const [scrollTop, setScrollTop] = useState(0)
  const { shouldLazyLoad } = usePerformanceOptimizer()

  const visibleStart = Math.floor(scrollTop / itemHeight)
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  )

  const visibleItems = items.slice(visibleStart, visibleEnd)
  const totalHeight = items.length * itemHeight
  const offsetY = visibleStart * itemHeight

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  if (!shouldLazyLoad) {
    // Renderizar todos los elementos si no es necesario optimizar
    return (
      <div style={{ height: containerHeight, overflow: 'auto' }}>
        {items.map((item, index) => renderItem(item, index))}
      </div>
    )
  }

  return (
    <div 
      style={{ 
        height: containerHeight, 
        overflow: 'auto',
        position: 'relative'
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => 
            renderItem(item, visibleStart + index)
          )}
        </div>
      </div>
    </div>
  )
}

// Componente de lazy loading
export function LazyComponent({ 
  children, 
  fallback,
  threshold = 0.1 
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsVisible(true)
          setHasIntersected(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, hasIntersected])

  return (
    <div ref={ref}>
      {isVisible ? children : (fallback || <div>⏳ Cargando...</div>)}
    </div>
  )
}

// Hook para debounce
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Hook para throttle
export function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastRan = useRef<number>(Date.now())

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value)
        lastRan.current = Date.now()
      }
    }, limit - (Date.now() - lastRan.current))

    return () => {
      clearTimeout(handler)
    }
  }, [value, limit])

  return throttledValue
}

// Componente de memoización
export const MemoizedComponent = React.memo(({ 
  children, 
  ...props 
}: { 
  children: React.ReactNode 
  [key: string]: any 
}) => {
  return <div {...props}>{children}</div>
})

// Hook para optimizar re-renders
export function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps)
}

// Hook para optimizar valores computados
export function useOptimizedMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps)
}

// Componente de preloader
export function Preloader({ 
  onComplete 
}: { 
  onComplete: () => void 
}) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true)
          onComplete()
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  if (isComplete) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: '#ffffff'
    }}>
      <div style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
        filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.5))'
      }}>
        🎫
      </div>
      
      <h1 style={{
        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #00ffff, #ff00ff, #ffff00)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
        textAlign: 'center'
      }}>
        TickMini
      </h1>

      <div style={{
        width: 'clamp(200px, 50vw, 300px)',
        height: 'clamp(4px, 1vw, 6px)',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 'clamp(2px, 0.5vw, 3px)',
        overflow: 'hidden',
        marginBottom: 'clamp(1rem, 2vw, 1.5rem)'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
          borderRadius: 'clamp(2px, 0.5vw, 3px)',
          transition: 'width 0.3s ease'
        }} />
      </div>

      <p style={{
        fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
        color: '#b0b0b0',
        textAlign: 'center',
        margin: 0
      }}>
        {Math.round(progress)}% cargado
      </p>
    </div>
  )
}
