'use client'

// Dashboard de Compliance - Monitoreo CNBV/SAT en tiempo real
// Sistema de reportes y métricas de cumplimiento mexicano

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ComplianceMetrics {
  total_transactions: number
  last_24h_count: number
  threshold_exceeded_count: number
  uif_reports_sent: number
  compliance_rate: number
  retention_active: number
  kyc_levels: {
    basic: number
    advanced: number
    enhanced: number
  }
  fee_transparency: {
    average_fee_percentage: number
    cnbv_compliant_rate: number
  }
}

interface ComplianceAlert {
  id: string
  type: 'warning' | 'error' | 'info'
  title: string
  description: string
  timestamp: Date
  resolved: boolean
}

export function ComplianceDashboard() {
  const [metrics, setMetrics] = useState<ComplianceMetrics | null>(null)
  const [alerts, setAlerts] = useState<ComplianceAlert[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchComplianceData()
    const interval = setInterval(fetchComplianceData, 60000) // Actualizar cada minuto
    return () => clearInterval(interval)
  }, [])

  const fetchComplianceData = async () => {
    try {
      // Simular datos del sistema de compliance
      const mockMetrics: ComplianceMetrics = {
        total_transactions: 1247,
        last_24h_count: 89,
        threshold_exceeded_count: 12,
        uif_reports_sent: 12,
        compliance_rate: 98.5,
        retention_active: 1235,
        kyc_levels: {
          basic: 856,
          advanced: 278,
          enhanced: 113
        },
        fee_transparency: {
          average_fee_percentage: 4.2,
          cnbv_compliant_rate: 100
        }
      }

      const mockAlerts: ComplianceAlert[] = [
        {
          id: '1',
          type: 'warning',
          title: 'Umbral CURP Biométrico',
          description: 'Se acerca la fecha obligatoria de CURP biométrico (Oct 2025). 156 usuarios pendientes.',
          timestamp: new Date(),
          resolved: false
        },
        {
          id: '2',
          type: 'info',
          title: 'Reporte SAT Enviado',
          description: 'Reporte mensual SAT enviado exitosamente. 12 transacciones reportadas.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          resolved: true
        },
        {
          id: '3',
          type: 'error',
          title: 'Fallo API Tecalis',
          description: 'Error temporal en validación KYC. Usando proveedor backup.',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          resolved: true
        }
      ]

      setMetrics(mockMetrics)
      setAlerts(mockAlerts)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching compliance data:', error)
      setIsLoading(false)
    }
  }

  if (isLoading || !metrics) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            🇲🇽 Dashboard de Compliance
          </h1>
          <p className="text-gray-400">
            Monitoreo CNBV/SAT en tiempo real - {new Date().toLocaleString('es-MX')}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Badge 
            variant={metrics.compliance_rate >= 95 ? "default" : "destructive"}
            className="text-sm px-3 py-1"
          >
            {metrics.compliance_rate >= 95 ? "✅ Compliant" : "⚠️ Issues"}
          </Badge>
          
          <Button 
            onClick={fetchComplianceData}
            variant="outline"
            size="sm"
            className="border-gray-600"
          >
            🔄 Actualizar
          </Button>
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Total Transacciones</p>
              <p className="text-2xl font-bold text-white">{metrics.total_transactions.toLocaleString()}</p>
              <p className="text-blue-300 text-xs">+{metrics.last_24h_count} últimas 24h</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Compliance Rate</p>
              <p className="text-2xl font-bold text-white">{metrics.compliance_rate}%</p>
              <p className="text-green-300 text-xs">CNBV Standard</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-900/20 to-yellow-800/20 border-yellow-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Reportes UIF</p>
              <p className="text-2xl font-bold text-white">{metrics.uif_reports_sent}</p>
              <p className="text-yellow-300 text-xs">Umbral excedido</p>
            </div>
            <div className="text-3xl">📋</div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Retención Activa</p>
              <p className="text-2xl font-bold text-white">{metrics.retention_active}</p>
              <p className="text-purple-300 text-xs">5 años obligatorio</p>
            </div>
            <div className="text-3xl">🔒</div>
          </div>
        </Card>
      </div>

      {/* KYC Levels y Fee Transparency */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">📋 Distribución KYC</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Básico (< $500)</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(metrics.kyc_levels.basic / metrics.total_transactions) * 100}%` }}
                  ></div>
                </div>
                <span className="text-blue-400 text-sm font-medium">
                  {metrics.kyc_levels.basic}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Avanzado ($500-$3K)</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(metrics.kyc_levels.advanced / metrics.total_transactions) * 100}%` }}
                  ></div>
                </div>
                <span className="text-yellow-400 text-sm font-medium">
                  {metrics.kyc_levels.advanced}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Mejorado (> $3K)</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(metrics.kyc_levels.enhanced / metrics.total_transactions) * 100}%` }}
                  ></div>
                </div>
                <span className="text-red-400 text-sm font-medium">
                  {metrics.kyc_levels.enhanced}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">💰 Transparencia de Fees</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Fee Promedio</span>
              <span className="text-white font-bold">
                {metrics.fee_transparency.average_fee_percentage}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">CNBV Compliant</span>
              <Badge variant="default" className="bg-green-600">
                {metrics.fee_transparency.cnbv_compliant_rate}%
              </Badge>
            </div>

            <div className="bg-green-900/20 border border-green-700 rounded-lg p-3">
              <p className="text-green-200 text-sm">
                ✅ Todos los fees cumplen límites CNBV (< 13% total)
              </p>
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
              <p className="text-blue-200 text-sm">
                📋 Transparencia: 100% disclosure rate
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Alertas de Compliance */}
      <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">🚨 Alertas de Compliance</h3>
        
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No hay alertas activas
            </p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${
                  alert.type === 'error' ? 'bg-red-900/20 border-red-700' :
                  alert.type === 'warning' ? 'bg-yellow-900/20 border-yellow-700' :
                  'bg-blue-900/20 border-blue-700'
                } ${alert.resolved ? 'opacity-60' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">
                        {alert.type === 'error' ? '🔴' : 
                         alert.type === 'warning' ? '🟡' : '🔵'}
                      </span>
                      <h4 className="font-semibold text-white">{alert.title}</h4>
                      {alert.resolved && (
                        <Badge variant="outline" className="text-xs">
                          Resuelto
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      {alert.description}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {alert.timestamp.toLocaleString('es-MX')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Regulaciones Próximas */}
      <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700">
        <h3 className="text-xl font-bold text-white mb-4">🗓️ Próximas Regulaciones</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-purple-900/30 rounded-lg">
            <div>
              <h4 className="text-purple-200 font-semibold">CURP Biométrico Obligatorio</h4>
              <p className="text-purple-300 text-sm">
                Validación biométrica obligatoria para todas las transacciones
              </p>
            </div>
            <div className="text-right">
              <div className="text-purple-400 font-bold">Oct 1, 2025</div>
              <div className="text-purple-300 text-sm">
                {Math.ceil((new Date('2025-10-01').getTime() - Date.now()) / (1000 * 60 * 60 * 24))} días restantes
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded-lg">
            <div>
              <h4 className="text-blue-200 font-semibold">MX Llave Integration</h4>
              <p className="text-blue-300 text-sm">
                Integración con sistema de identidad digital oficial
              </p>
            </div>
            <div className="text-right">
              <div className="text-blue-400 font-bold">Dec 1, 2025</div>
              <div className="text-blue-300 text-sm">En desarrollo</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}