'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Code,
  Smartphone,
  Monitor,
  ExternalLink,
  Copy,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface FeatureInfo {
  id: string;
  name: string;
  description: string;
  supportedBy: ('base' | 'farcaster')[];
  fallbackAvailable: boolean;
  fallbackDescription: string;
  implementation: string;
  status: 'supported' | 'fallback' | 'unsupported';
  priority: 'high' | 'medium' | 'low';
}

interface FallbackStrategy {
  feature: string;
  baseAppImplementation: string;
  farcasterImplementation: string;
  universalImplementation: string;
  notes: string;
}

export function FeatureFallback() {
  const [features, setFeatures] = useState<FeatureInfo[]>([]);
  const [fallbackStrategies, setFallbackStrategies] = useState<FallbackStrategy[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<FeatureInfo | null>(null);
  const [activeTab, setActiveTab] = useState('features');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeatureSupport();
  }, []);

  const loadFeatureSupport = async () => {
    try {
      setIsLoading(true);
      
      const featureList: FeatureInfo[] = [
        {
          id: 'quick-auth',
          name: 'Quick Auth',
          description: 'Autenticación rápida sin contraseñas',
          supportedBy: ['base', 'farcaster'],
          fallbackAvailable: false,
          fallbackDescription: '',
          implementation: 'useMiniKit() hook',
          status: 'supported',
          priority: 'high'
        },
        {
          id: 'navigation-sdk',
          name: 'Navigation SDK',
          description: 'Navegación nativa entre Mini Apps',
          supportedBy: ['base', 'farcaster'],
          fallbackAvailable: false,
          fallbackDescription: '',
          implementation: 'sdk.actions.openUrl()',
          status: 'supported',
          priority: 'high'
        },
        {
          id: 'notifications',
          name: 'Notifications (Neynar)',
          description: 'Sistema de notificaciones push',
          supportedBy: ['base', 'farcaster'],
          fallbackAvailable: false,
          fallbackDescription: '',
          implementation: 'Neynar SDK',
          status: 'supported',
          priority: 'high'
        },
        {
          id: 'wallet-integration',
          name: 'Wallet Integration',
          description: 'Integración con wallets conectados',
          supportedBy: ['base', 'farcaster'],
          fallbackAvailable: false,
          fallbackDescription: '',
          implementation: 'useAccount() hook',
          status: 'supported',
          priority: 'high'
        },
        {
          id: 'frame-actions',
          name: 'Frame Actions',
          description: 'Acciones interactivas en frames',
          supportedBy: ['base', 'farcaster'],
          fallbackAvailable: false,
          fallbackDescription: '',
          implementation: 'Frame API',
          status: 'supported',
          priority: 'medium'
        },
        {
          id: 'rich-embeds',
          name: 'Rich Embeds',
          description: 'Embeds enriquecidos al compartir',
          supportedBy: ['base', 'farcaster'],
          fallbackAvailable: false,
          fallbackDescription: '',
          implementation: 'fc:frame metadata',
          status: 'supported',
          priority: 'medium'
        },
        {
          id: 'multi-chain',
          name: 'Multi-chain Support',
          description: 'Soporte para múltiples cadenas blockchain',
          supportedBy: ['base'],
          fallbackAvailable: true,
          fallbackDescription: 'Usar solo Base Network en Farcaster',
          implementation: 'Chain switching logic',
          status: 'fallback',
          priority: 'medium'
        },
        {
          id: 'sign-manifest',
          name: 'Sign Manifest (Experimental)',
          description: 'Firma de manifest experimental',
          supportedBy: [],
          fallbackAvailable: true,
          fallbackDescription: 'Usar Account Association manual',
          implementation: 'Manual signing process',
          status: 'unsupported',
          priority: 'low'
        }
      ];

      const strategies: FallbackStrategy[] = [
        {
          feature: 'Multi-chain Support',
          baseAppImplementation: `
// Base App - Full multi-chain support
const { switchChain } = useSwitchChain();
const { chain } = useAccount();

const handleChainSwitch = async (targetChainId: number) => {
  await switchChain({ chainId: targetChainId });
  // Full functionality available
};`,
          farcasterImplementation: `
// Farcaster - Limited to Base Network
const { chain } = useAccount();

// Only Base Network supported
if (chain?.id !== 8453) {
  // Show message or redirect to Base
  return <ChainNotSupported />;
}`,
          universalImplementation: `
// Universal - Detect client and adapt
const { context } = useMiniKit();
const isBaseApp = context.client.clientFid === 309857;

const MultiChainComponent = () => {
  if (isBaseApp) {
    return <BaseAppMultiChain />;
  } else {
    return <FarcasterBaseOnly />;
  }
};`,
          notes: 'Base App supports full multi-chain, Farcaster limited to Base Network'
        },
        {
          feature: 'Sign Manifest',
          baseAppImplementation: `
// Base App - Use experimental signManifest
const { signManifest } = useMiniKit();

const handleSignManifest = async () => {
  try {
    const signature = await signManifest(manifestData);
    // Update manifest with signature
  } catch (error) {
    // Fallback to manual process
    handleManualSigning();
  }
};`,
          farcasterImplementation: `
// Farcaster - Manual Account Association
const handleManualSigning = async () => {
  // Redirect to Base.dev or Farcaster.xyz
  window.open('https://base.dev/preview', '_blank');
  // User completes manual signing process
};`,
          universalImplementation: `
// Universal - Try experimental, fallback to manual
const handleSignManifest = async () => {
  const { context } = useMiniKit();
  const isBaseApp = context.client.clientFid === 309857;
  
  if (isBaseApp) {
    try {
      return await signManifest(manifestData);
    } catch (error) {
      // Fallback to manual
    }
  }
  
  // Manual process for all clients
  return handleManualSigning();
};`,
          notes: 'Experimental feature, always provide manual fallback'
        }
      ];

      setFeatures(featureList);
      setFallbackStrategies(strategies);
      
    } catch (error) {
      console.error('Error loading feature support:', error);
      toast.error('Error cargando soporte de características');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'supported': return 'bg-green-100 text-green-800';
      case 'fallback': return 'bg-yellow-100 text-yellow-800';
      case 'unsupported': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'supported': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fallback': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'unsupported': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Código copiado');
  };

  const refreshSupport = () => {
    loadFeatureSupport();
    toast.success('Soporte de características actualizado');
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2">Cargando soporte de características...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Feature Fallback System</h2>
        <p className="text-muted-foreground">
          Estrategias de fallback para características no soportadas
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="features" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Features
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Strategies
          </TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-4">
          {/* Lista de Características */}
          <div className="grid gap-4">
            {features.map((feature) => (
              <Card 
                key={feature.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedFeature(feature)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(feature.status)}
                      <div>
                        <h3 className="font-medium">{feature.name}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(feature.status)}>
                        {feature.status}
                      </Badge>
                      <Badge className={getPriorityColor(feature.priority)}>
                        {feature.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Soportado por:</span>
                      <div className="flex gap-1">
                        {feature.supportedBy.map((client) => (
                          <Badge key={client} variant="outline" className="text-xs">
                            {client === 'base' ? 'Base App' : 'Farcaster'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {feature.fallbackAvailable && (
                      <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                        <strong>Fallback:</strong> {feature.fallbackDescription}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detalle de Característica Seleccionada */}
          {selectedFeature && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(selectedFeature.status)}
                    <div>
                      <CardTitle>{selectedFeature.name}</CardTitle>
                      <CardDescription>{selectedFeature.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(selectedFeature.status)}>
                      {selectedFeature.status}
                    </Badge>
                    <Badge className={getPriorityColor(selectedFeature.priority)}>
                      {selectedFeature.priority}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium">Implementación:</span>
                    <p className="text-sm text-muted-foreground">{selectedFeature.implementation}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Soportado por:</span>
                    <div className="flex gap-1 mt-1">
                      {selectedFeature.supportedBy.map((client) => (
                        <Badge key={client} variant="outline" className="text-xs">
                          {client === 'base' ? 'Base App' : 'Farcaster'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedFeature.fallbackAvailable && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Estrategia de Fallback</h4>
                    <p className="text-sm text-blue-800">{selectedFeature.fallbackDescription}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="strategies" className="space-y-4">
          {/* Estrategias de Fallback */}
          <div className="space-y-6">
            {fallbackStrategies.map((strategy, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    {strategy.feature}
                  </CardTitle>
                  <CardDescription>
                    {strategy.notes}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        Base App
                      </h4>
                      <div className="relative">
                        <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                          {strategy.baseAppImplementation}
                        </pre>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => copyCode(strategy.baseAppImplementation)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        Farcaster
                      </h4>
                      <div className="relative">
                        <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                          {strategy.farcasterImplementation}
                        </pre>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => copyCode(strategy.farcasterImplementation)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Universal
                      </h4>
                      <div className="relative">
                        <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                          {strategy.universalImplementation}
                        </pre>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => copyCode(strategy.universalImplementation)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Herramientas */}
      <Card>
        <CardHeader>
          <CardTitle>Herramientas de Compatibilidad</CardTitle>
          <CardDescription>
            Recursos para implementar fallbacks efectivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Base App Compatibility Docs</p>
              <p className="text-sm text-muted-foreground">Documentación oficial de compatibilidad</p>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver Docs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
