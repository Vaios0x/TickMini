'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Smartphone, 
  Monitor, 
  CheckCircle, 
  AlertTriangle,
  Info,
  ExternalLink,
  RefreshCw,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface ClientInfo {
  clientFid: number;
  clientName: string;
  isBaseApp: boolean;
  isFarcaster: boolean;
  supportedFeatures: string[];
  unsupportedFeatures: string[];
  chainSupport: string[];
  version?: string;
  userAgent?: string;
}

interface CompatibilityStatus {
  overall: 'excellent' | 'good' | 'limited' | 'poor';
  score: number;
  recommendations: string[];
}

export function ClientDetection() {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [compatibilityStatus, setCompatibilityStatus] = useState<CompatibilityStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    detectClient();
  }, []);

  const detectClient = async () => {
    try {
      setIsLoading(true);
      
      // Simular detección de cliente (en implementación real usarías useMiniKit)
      const mockClientFid = 309857; // Base App FID
      const isBaseApp = mockClientFid === 309857;
      
      const clientName = isBaseApp ? 'Base App' : 'Farcaster';
      
      // Características soportadas por cliente
      const baseAppFeatures = [
        'Quick Auth',
        'Navigation SDK',
        'Notifications (Neynar)',
        'Wallet Integration',
        'Frame Actions',
        'Rich Embeds',
        'Multi-chain Support'
      ];
      
      const farcasterFeatures = [
        'Quick Auth',
        'Navigation SDK',
        'Notifications (Neynar)',
        'Wallet Integration',
        'Frame Actions',
        'Rich Embeds'
      ];
      
      // Características no soportadas
      const unsupportedFeatures = [
        'signManifest (experimental)'
      ];
      
      // Cadenas soportadas
      const supportedChains = [
        'Base',
        'Mainnet',
        'Optimism',
        'Arbitrum',
        'Polygon',
        'Zora',
        'BNB',
        'Avalanche C-Chain'
      ];
      
      const clientData: ClientInfo = {
        clientFid: mockClientFid,
        clientName,
        isBaseApp,
        isFarcaster: !isBaseApp,
        supportedFeatures: isBaseApp ? baseAppFeatures : farcasterFeatures,
        unsupportedFeatures,
        chainSupport: supportedChains,
        version: isBaseApp ? '1.0.0' : '2.0.0',
        userAgent: navigator.userAgent
      };
      
      setClientInfo(clientData);
      calculateCompatibilityStatus(clientData);
      
    } catch (error) {
      console.error('Error detecting client:', error);
      toast.error('Error detectando cliente');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateCompatibilityStatus = (client: ClientInfo) => {
    let score = 0;
    const recommendations: string[] = [];
    
    // Calcular score basado en características soportadas
    const totalFeatures = client.supportedFeatures.length + client.unsupportedFeatures.length;
    const supportedRatio = client.supportedFeatures.length / totalFeatures;
    
    score = Math.round(supportedRatio * 100);
    
    // Determinar status general
    let overall: 'excellent' | 'good' | 'limited' | 'poor';
    if (score >= 90) overall = 'excellent';
    else if (score >= 75) overall = 'good';
    else if (score >= 50) overall = 'limited';
    else overall = 'poor';
    
    // Generar recomendaciones
    if (client.unsupportedFeatures.length > 0) {
      recommendations.push(`Evita usar: ${client.unsupportedFeatures.join(', ')}`);
    }
    
    if (client.isBaseApp) {
      recommendations.push('Aprovecha las características específicas de Base App');
      recommendations.push('Usa multi-chain support para mejor UX');
    } else {
      recommendations.push('Implementa fallbacks para características de Base App');
    }
    
    if (score < 80) {
      recommendations.push('Considera implementar características alternativas');
    }
    
    setCompatibilityStatus({
      overall,
      score,
      recommendations
    });
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

  const refreshDetection = () => {
    detectClient();
    toast.success('Detección actualizada');
  };

  const openBaseDocs = () => {
    window.open('https://docs.base.org/mini-apps/compatibility', '_blank');
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2">Detectando cliente...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!clientInfo || !compatibilityStatus) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p>Error detectando cliente</p>
            <Button onClick={refreshDetection} className="mt-2">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estado de Compatibilidad */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(compatibilityStatus.overall)}
              <div>
                <CardTitle>Estado de Compatibilidad</CardTitle>
                <CardDescription>
                  {clientInfo.clientName} - {compatibilityStatus.score}% compatible
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(compatibilityStatus.overall)}>
                {compatibilityStatus.overall}
              </Badge>
              <Button variant="outline" size="sm" onClick={refreshDetection}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium">Cliente:</span>
              <p className="text-sm text-muted-foreground">{clientInfo.clientName}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Client FID:</span>
              <p className="text-sm text-muted-foreground">{clientInfo.clientFid}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Versión:</span>
              <p className="text-sm text-muted-foreground">{clientInfo.version}</p>
            </div>
            <div>
              <span className="text-sm font-medium">Score:</span>
              <p className="text-sm text-muted-foreground">{compatibilityStatus.score}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Características Soportadas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Características Soportadas
          </CardTitle>
          <CardDescription>
            Funcionalidades disponibles en {clientInfo.clientName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {clientInfo.supportedFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Características No Soportadas */}
      {clientInfo.unsupportedFeatures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Características No Soportadas
            </CardTitle>
            <CardDescription>
              Funcionalidades que no están disponibles en {clientInfo.clientName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {clientInfo.unsupportedFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cadenas Soportadas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Cadenas Soportadas
          </CardTitle>
          <CardDescription>
            Redes blockchain compatibles con {clientInfo.clientName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {clientInfo.chainSupport.map((chain, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-sm">{chain}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recomendaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones</CardTitle>
          <CardDescription>
            Sugerencias para optimizar la compatibilidad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {compatibilityStatus.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{recommendation}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Herramientas */}
      <Card>
        <CardHeader>
          <CardTitle>Herramientas de Compatibilidad</CardTitle>
          <CardDescription>
            Recursos para verificar y mejorar compatibilidad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Base App Compatibility Docs</p>
              <p className="text-sm text-muted-foreground">Documentación oficial de compatibilidad</p>
            </div>
            <Button variant="outline" size="sm" onClick={openBaseDocs}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver Docs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
