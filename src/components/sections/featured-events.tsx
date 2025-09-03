"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react'
import { formatDate, formatPrice } from '@/lib/utils'

// Mock data - en producción esto vendría de una API
const featuredEvents = [
  {
    id: '1',
    title: 'Festival de Música Electrónica',
    description: 'El evento más grande de música electrónica del año con los mejores DJs internacionales.',
    image: '/images/events/electronic-festival.jpg',
    date: new Date('2024-07-15T20:00:00'),
    venue: 'Estadio Metropolitano',
    city: 'Madrid',
    price: 0.05,
    currency: 'ETH',
    category: 'Música',
    ticketsLeft: 150,
    totalTickets: 1000,
    featured: true,
  },
  {
    id: '2',
    title: 'Conferencia de Blockchain',
    description: 'La conferencia más importante sobre blockchain y Web3 en España.',
    image: '/images/events/blockchain-conference.jpg',
    date: new Date('2024-06-20T09:00:00'),
    venue: 'Centro de Convenciones',
    city: 'Barcelona',
    price: 0.02,
    currency: 'ETH',
    category: 'Tecnología',
    ticketsLeft: 75,
    totalTickets: 500,
    featured: true,
  },
  {
    id: '3',
    title: 'Exposición de Arte Digital',
    description: 'Una muestra única de arte digital y NFTs de artistas emergentes.',
    image: '/images/events/digital-art-exhibition.jpg',
    date: new Date('2024-08-10T18:00:00'),
    venue: 'Museo de Arte Moderno',
    city: 'Valencia',
    price: 0.01,
    currency: 'ETH',
    category: 'Arte',
    ticketsLeft: 200,
    totalTickets: 300,
    featured: true,
  },
]

export function FeaturedEvents() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredEvents.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/events/${event.id}`} className="block">
            <div className="bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full font-medium">
                    Destacado
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-white/80 line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm font-medium">{event.category}</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(event.price, event.currency)}
                  </span>
                </div>

                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.venue}, {event.city}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {event.ticketsLeft} tickets disponibles
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Tickets vendidos</span>
                    <span>{Math.round(((event.totalTickets - event.ticketsLeft) / event.totalTickets) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${((event.totalTickets - event.ticketsLeft) / event.totalTickets) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  className="w-full group-hover:bg-primary/90 transition-colors h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  tabIndex={0}
                  aria-label={`Comprar tickets para ${event.title}`}
                >
                  Comprar Tickets
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
