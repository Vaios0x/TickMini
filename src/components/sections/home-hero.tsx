'use client'

import * as React from 'react'
import { HeroSection } from './hero-section'

interface HomeHeroProps {
  mousePosition: { x: number; y: number }
  windowSize: { width: number; height: number }
}

export function HomeHero({ mousePosition, windowSize }: HomeHeroProps) {
  return (
    <>
      {/* Dynamic Background Effects */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${windowSize.width - mousePosition.x}px ${windowSize.height - mousePosition.y}px, rgba(255, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 0, 0.08) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          transition: 'all 0.1s ease'
        }} 
      />
      
      {/* Animated Grid Pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite',
          pointerEvents: 'none'
        }} 
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => {
        const left = `${(i * 7.3) % 100}%`
        const top = `${(i * 5.5) % 100}%`
        const animationDuration = `${4 + (i % 4)}s`
        const animationDelay = `${(i % 4)}s`
        
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left,
              top,
              width: '3px',
              height: '3px',
              background: `hsl(${i * 24}, 100%, 70%)`,
              borderRadius: '50%',
              filter: 'blur(1px)',
              animation: `float-particle ${animationDuration} ease-in-out infinite`,
              animationDelay,
              pointerEvents: 'none'
            }}
          />
        )
      })}

      {/* Hero Section */}
      <HeroSection />
    </>
  )
}
