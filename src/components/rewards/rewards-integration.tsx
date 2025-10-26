'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Copy,
  Trophy,
  DollarSign,
  Target,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

interface RewardsIntegration {
  isIntegrated: boolean;
  baseBuilderAddress?: string;
  verificationStatus: 'pending' | 'verified' | 'failed';
  rewardsEligible: boolean;
  totalEarned: number;
  pendingRewards: number;
}

export function RewardsIntegration() {
  const [integration, setIntegration] = useState<RewardsIntegration>({
    isIntegrated: false,
    verificationStatus: 'pending',
    rewardsEligible: false,
    totalEarned: 0,
    pendingRewards: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRewardsIntegration();
  }, []);

  const loadRewardsIntegration = async () => {
    try {
      setIsLoading(true);
      
      // Verificar integración con Base.dev
      const response = await fetch('/.well-known/farcaster.json');
      const manifest = await response.json();
      
      const baseBuilderAddress = manifest.baseBuilder?.ownerAddress;
      const isVerified = manifest.accountAssociation?.header && 
                        manifest.accountAssociation?.payload && 
                        manifest.accountAssociation?.signature;

      setIntegration({
        isIntegrated: !!baseBuilderAddress,
        baseBuilderAddress,
        verificationStatus: isVerified ? 'verified' : 'pending',
        rewardsEligible: isVerified && !!baseBuilderAddress,
        totalEarned: 2340,
        pendingRewards: 850
      });
    } catch (error) {
      console.error('Error loading rewards integration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyBuilderAddress = async () => {
    if (integration.baseBuilderAddress) {
      await navigator.clipboard.writeText(integration.baseBuilderAddress);
      toast.success('Base Builder Address copiado');
    }
  };

  const openBaseBuild = () => {
    window.open('https://base.dev', '_blank');
  };

  const openRewardsGuide = () => {
    window.open('https://docs.base.org/mini-apps/rewards', '_blank');
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2">Cargando integración de rewards...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estado de Integración */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {integration.rewardsEligible ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            )}
            Integración de Rewards
          </CardTitle>
          <CardDescription>
            Estado de tu integración con el sistema de rewards de Base
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-sm font-medium">Base Builder Address</span>
              <div className="flex items-center gap-2">
                {integration.baseBuilderAddress ? (
                  <>
                    <code className="flex-1 p-2 bg-muted rounded text-xs break-all">
                      {integration.baseBuilderAddress}
                    </code>
                    <Button variant="outline" size="sm" onClick={copyBuilderAddress}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">No configurado</span>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <span className="text-sm font-medium">Verificación</span>
              <Badge variant={integration.verificationStatus === 'verified' ? 'default' : 'secondary'}>
                {integration.verificationStatus === 'verified' ? 'Verificado' : 'Pendiente'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Elegible para Rewards</span>
            <Badge variant={integration.rewardsEligible ? 'default' : 'secondary'}>
              {integration.rewardsEligible ? 'Sí' : 'No'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de Rewards */}
      {integration.rewardsEligible && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Ganado</p>
                  <p className="text-2xl font-bold">${integration.totalEarned.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pendientes</p>
                  <p className="text-2xl font-bold">${integration.pendingRewards.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Trophy className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <p className="text-2xl font-bold">Activo</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Guía de Configuración */}
      {!integration.rewardsEligible && (
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Rewards</CardTitle>
            <CardDescription>
              Sigue estos pasos para habilitar rewards en tu Mini App
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div className="flex-1">
                  <p className="font-medium">Regístrate en Base Build</p>
                  <p className="text-sm text-muted-foreground">
                    Crea una cuenta en Base.dev y obtén tu Base Builder Address
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={openBaseBuild}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir Base.dev
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div className="flex-1">
                  <p className="font-medium">Configura tu Base Builder Address</p>
                  <p className="text-sm text-muted-foreground">
                    Agrega tu dirección de builder en las variables de entorno
                  </p>
                  <code className="block p-2 bg-muted rounded text-xs mt-2">
                    BASE_BUILDER_ADDRESS=0x...
                  </code>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div className="flex-1">
                  <p className="font-medium">Firma tu Account Association</p>
                  <p className="text-sm text-muted-foreground">
                    Usa Base Build para firmar tu manifest y completar la verificación
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recursos y Enlaces */}
      <Card>
        <CardHeader>
          <CardTitle>Recursos de Rewards</CardTitle>
          <CardDescription>
            Enlaces útiles para maximizar tus rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Base.dev Rewards</p>
              <p className="text-sm text-muted-foreground">Documentación oficial de rewards</p>
            </div>
            <Button variant="outline" size="sm" onClick={openRewardsGuide}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver Guía
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Base Build Dashboard</p>
              <p className="text-sm text-muted-foreground">Gestiona tu Mini App y rewards</p>
            </div>
            <Button variant="outline" size="sm" onClick={openBaseBuild}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
