"use client"

import { motion } from 'framer-motion'
import { Users, Ticket, DollarSign, TrendingUp } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '50K+',
    label: 'Usuarios Activos',
    description: 'Comunidad creciente de entusiastas',
  },
  {
    icon: Ticket,
    value: '100K+',
    label: 'Tickets Vendidos',
    description: 'Transacciones exitosas en blockchain',
  },
  {
    icon: DollarSign,
    value: '$2M+',
    label: 'Volumen Total',
    description: 'GMV generado en la plataforma',
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Satisfacción',
    description: 'Usuarios satisfechos con el servicio',
  },
]

export function StatsSection() {
  return (
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-16"
      >
        Números que Hablan
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4"
            >
              <stat.icon className="h-8 w-8 text-white" />
            </motion.div>

            {/* Value */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-2"
            >
              {stat.value}
            </motion.div>

            {/* Label */}
            <h3 className="text-xl font-semibold mb-2">
              {stat.label}
            </h3>

            {/* Description */}
            <p className="text-white/80 text-sm">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 p-6 bg-white/10 rounded-xl backdrop-blur-sm"
      >
        <p className="text-lg text-white/90 mb-4">
          Únete a la revolución del ticketing digital
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
          <span>✓ Transacciones instantáneas</span>
          <span>✓ Sin comisiones ocultas</span>
          <span>✓ Seguridad blockchain</span>
          <span>✓ Acceso global 24/7</span>
        </div>
      </motion.div>
    </div>
  )
}
