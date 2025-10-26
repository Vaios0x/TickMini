'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Monitor, 
  Network, 
  AlertTriangle,
  CheckCircle,
  Settings,
  ExternalLink,
  RefreshCw,
  Info
} from 'lucide-react';
import { ClientDetection } from './client-detection';
import { ChainSupport } from './chain-support';
import { FeatureFallback } from './feature-fallback';

interface CompatibilityStatus {
  overall: 'excellent' | 'good' | 'limited' | 'poor';
  score: number;
  baseAppCompatibility: number;
  farcasterCompatibility: number;
  chainSupport: number;
  featureSupport: number;
  lastChecked: string;
}

export function CompatibilityDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [compatibilityStatus, setCompatibilityStatus] = useState<CompatibilityStatus>({
    overall: 'excellent',
    score: 95,
    baseAppCompatibility: 98,
    farcasterCompatibility: 92,
    chainSupport: 100,
    featureSupport: 90,
    lastChecked: new Date().toLocaleTimeString()
  });

  const refreshStatus = () => {
    setCompatibilityStatus(prev => ({
      ...prev,
      lastChecked: new Date().toLocaleTimeString()
    }));
  };

  const openBaseDocs = () => {
    window.open('https://docs.base.org/mini-apps/compatibility', '_blank');
  };

  const openFarcasterDocs = () => {
    window.open('https://miniapps.farcaster.xyz/docs', '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'limited': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'good': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'limited': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'poor': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Compatibility Dashboard</h1>
        <p className="text-muted-foreground">
          Monitoreo de compatibilidad entre Base App y Farcaster
        </p>
      </div>

      {/* Estado General de Compatibilidad */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <p className="text-2xl font-bold">{compatibilityStatus.score}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Monitor className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Base App</p>
                <p className="text-2xl font-bold">{compatibilityStatus.baseAppCompatibility}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Smartphone className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Farcaster</p>
                <p className="text-2xl font-bold">{compatibilityStatus.farcasterCompatibility}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Network className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Chains</p>
                <p className="text-2xl font-bold">{compatibilityStatus.chainSupport}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estado de Compatibilidad */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(compatibilityStatus.overall)}
              <div>
                <CardTitle>Estado de Compatibilidad</CardTitle>
                <CardDescription>
                  Última verificación: {compatibilityStatus.lastChecked}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(compatibilityStatus.overall)}>
                {compatibilityStatus.overall}
              </Badge>
              <Button variant="outline" size="sm" onClick={refreshStatus}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{compatibilityStatus.baseAppCompatibility}%</div>
              <div className="text-sm text-muted-foreground">Base App</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{compatibilityStatus.farcasterCompatibility}%</div>
              <div className="text-sm text-muted-foreground">Farcaster</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{compatibilityStatus.chainSupport}%</div>
              <div className="text-sm text-muted-foreground">Chain Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{compatibilityStatus.featureSupport}%</div>
              <div className="text-sm text-muted-foreground">Features</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Acciones rápidas para verificar compatibilidad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Base App Docs</p>
                <p className="text-sm text-muted-foreground">Documentación de compatibilidad</p>
              </div>
              <button 
                onClick={openBaseDocs}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Farcaster Docs</p>
                <p className="text-sm text-muted-foreground">SDK documentation</p>
              </div>
              <button 
                onClick={openFarcasterDocs}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Refresh Status</p>
                <p className="text-sm text-muted-foreground">Actualizar compatibilidad</p>
              </div>
              <button 
                onClick={refreshStatus}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Compatibilidad */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="client" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Client Detection
          </TabsTrigger>
          <TabsTrigger value="chains" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Chain Support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <FeatureFallback />
        </TabsContent>

        <TabsContent value="client">
          <ClientDetection />
        </TabsContent>

        <TabsContent value="chains">
          <ChainSupport />
        </TabsContent>
      </Tabs>

      {/* Tips de Compatibilidad */}
      <Card>
        <CardHeader>
          <CardTitle>Tips de Compatibilidad</CardTitle>
          <CardDescription>
            Mejores prácticas para mantener compatibilidad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-900">Detect Client</span>
                </div>
                <p className="text-sm text-green-800">
                  Siempre detecta el cliente para usar características específicas
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Network className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Chain Support</span>
                </div>
                <p className="text-sm text-blue-800">
                  Implementa fallbacks para cadenas no soportadas
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-900">Feature Fallbacks</span>
                </div>
                <p className="text-sm text-yellow-800">
                  Proporciona alternativas para características no soportadas
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-900">Test Regularly</span>
                </div>
                <p className="text-sm text-purple-800">
                  Prueba en ambos clientes regularmente
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
