'use client'

import { useState, useEffect, useCallback } from 'react'
import { getBestEventImage } from '@/lib/default-images'

export interface CreatedEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  city: string
  country: string
  category: string
  organizer: string
  image: string
  ticketTypes: Array<{
    name: string
    description: string
    price: number
    quantity: number
    benefits: string[]
  }>
  transactionHash: string
  eventId: number
  createdAt: number
  isActive: boolean
}

const STORAGE_KEY = 'tickbase_created_events'

export function useCreatedEvents() {
  const [createdEvents, setCreatedEvents] = useState<CreatedEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar eventos desde localStorage al montar el componente
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const events = JSON.parse(stored)
        setCreatedEvents(events)
      }
    } catch (error) {
      console.error('Error loading created events:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Guardar eventos en localStorage
  const saveEvents = useCallback((events: CreatedEvent[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
      setCreatedEvents(events)
    } catch (error) {
      console.error('Error saving created events:', error)
    }
  }, [])

  // Añadir un nuevo evento
  const addEvent = useCallback((event: Omit<CreatedEvent, 'id' | 'createdAt'>) => {
    const newEvent: CreatedEvent = {
      ...event,
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      // Asegurar que siempre tengamos una imagen válida
      image: getBestEventImage(event.image, event.category)
    }
    
    const updatedEvents = [newEvent, ...createdEvents]
    saveEvents(updatedEvents)
    return newEvent
  }, [createdEvents, saveEvents])

  // Actualizar un evento existente
  const updateEvent = useCallback((eventId: string, updates: Partial<CreatedEvent>) => {
    const updatedEvents = createdEvents.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    )
    saveEvents(updatedEvents)
  }, [createdEvents, saveEvents])

  // Eliminar un evento
  const removeEvent = useCallback((eventId: string) => {
    const updatedEvents = createdEvents.filter(event => event.id !== eventId)
    saveEvents(updatedEvents)
  }, [createdEvents, saveEvents])

  // Obtener eventos activos
  const getActiveEvents = useCallback(() => {
    return createdEvents.filter(event => event.isActive)
  }, [createdEvents])

  // Obtener eventos por categoría
  const getEventsByCategory = useCallback((category: string) => {
    return createdEvents.filter(event => event.category === category)
  }, [createdEvents])

  // Buscar eventos
  const searchEvents = useCallback((searchTerm: string) => {
    const term = searchTerm.toLowerCase()
    return createdEvents.filter(event => 
      event.title.toLowerCase().includes(term) ||
      event.description.toLowerCase().includes(term) ||
      event.organizer.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term)
    )
  }, [createdEvents])

  // Limpiar todos los eventos (para testing)
  const clearAllEvents = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setCreatedEvents([])
  }, [])

  return {
    createdEvents,
    isLoading,
    addEvent,
    updateEvent,
    removeEvent,
    getActiveEvents,
    getEventsByCategory,
    searchEvents,
    clearAllEvents
  }
}
