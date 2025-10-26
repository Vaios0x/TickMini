'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, ExternalLink, Copy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface VerificationStatus {
  isVerified: boolean;
  baseBuilderAddress?: string;
  accountAssociation?: {
    header: string;
    payload: string;
    signature: string;
  };
  verificationDate?: string;
  rewardsEligible: boolean;
}

interface ManifestData {
  accountAssociation: {
    header: string;
    payload: string;
    signature: string;
  };
  miniapp: {
    name: string;
    description: string;
    canonicalDomain: string;
    requiredChains: string[];
    tags: string[];
  };
}

export function VerificationSystem() {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>({
    isVerified: false,
    rewardsEligible: false
  });
  const [manifestData, setManifestData] = useState<ManifestData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar estado de verificación
  useEffect(() => {
    loadVerificationStatus();
  }, []);

  const loadVerificationStatus = async () => {
    try {
      setIsLoading(true);
      
      // Verificar manifest actual
      const response = await fetch('/.well-known/farcaster.json');
      const manifest = await response.json();
      setManifestData(manifest);

      // Verificar si está firmado
      const isSigned = manifest.accountAssociation?.header && 
                      manifest.accountAssociation?.payload && 
                      manifest.accountAssociation?.signature;

      setVerificationStatus({
        isVerified: !!isSigned,
        baseBuilderAddress: manifest.baseBuilder?.ownerAddress,
        accountAssociation: manifest.accountAssociation,
        verificationDate: manifest.verificationDate,
        rewardsEligible: !!isSigned
      });
    } catch (error) {
      console.error('Error loading verification status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyManifest = async () => {
    if (manifestData) {
      await navigator.clipboard.writeText(JSON.stringify(manifestData, null, 2));
      toast.success('Manifest copiado al portapapeles');
    }
  };

  const openBaseBuild = () => {
    window.open('https://base.dev', '_blank');
  };

  const openFarcasterTool = () => {
    window.open('https://farcaster.xyz', '_blank');
  };

  const submitForVerification = async () => {
    setIsSubmitting(true);
    
    try {
      // Simular proceso de verificación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Mini App enviada para verificación');
      
      // Actualizar estado
      setVerificationStatus(prev => ({
        ...prev,
        isVerified: true,
        verificationDate: new Date().toISOString(),
        rewardsEligible: true
      }));
    } catch (error) {
      toast.error('Error al enviar para verificación');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Cargando estado de verificación...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estado de Verificación */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {verificationStatus.isVerified ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            )}
            Estado de Verificación
          </CardTitle>
          <CardDescription>
            Verifica tu Mini App para acceder a oportunidades de ganancias
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Verificación</span>
            <Badge variant={verificationStatus.isVerified ? "default" : "secondary"}>
              {verificationStatus.isVerified ? "Verificado" : "Pendiente"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Elegible para Rewards</span>
            <Badge variant={verificationStatus.rewardsEligible ? "default" : "secondary"}>
              {verificationStatus.rewardsEligible ? "Sí" : "No"}
            </Badge>
          </div>

          {verificationStatus.baseBuilderAddress && (
            <div className="space-y-2">
              <span className="text-sm font-medium">Base Builder Address</span>
              <code className="block p-2 bg-muted rounded text-xs break-all">
                {verificationStatus.baseBuilderAddress}
              </code>
            </div>
          )}

          {verificationStatus.verificationDate && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Fecha de Verificación</span>
              <span className="text-sm text-muted-foreground">
                {new Date(verificationStatus.verificationDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manifest Actual */}
      {manifestData && (
        <Card>
          <CardHeader>
            <CardTitle>Manifest Actual</CardTitle>
            <CardDescription>
              Configuración actual de tu Mini App
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Nombre:</span>
                <p className="text-muted-foreground">{manifestData.miniapp.name}</p>
              </div>
              <div>
                <span className="font-medium">Dominio:</span>
                <p className="text-muted-foreground">{manifestData.miniapp.canonicalDomain}</p>
              </div>
              <div>
                <span className="font-medium">Cadenas:</span>
                <p className="text-muted-foreground">{manifestData.miniapp.requiredChains.join(', ')}</p>
              </div>
              <div>
                <span className="font-medium">Tags:</span>
                <p className="text-muted-foreground">{manifestData.miniapp.tags.join(', ')}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyManifest}>
                <Copy className="h-4 w-4 mr-2" />
                Copiar Manifest
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Acciones de Verificación */}
      <Card>
        <CardHeader>
          <CardTitle>Proceso de Verificación</CardTitle>
          <CardDescription>
            Sigue estos pasos para verificar tu Mini App
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium">Obtén tu Base Builder Address</p>
                <p className="text-sm text-muted-foreground">
                  Conecta tu wallet en Base.dev para obtener tu dirección de builder
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
                <p className="font-medium">Firma el Account Association</p>
                <p className="text-sm text-muted-foreground">
                  Usa Base Build o Farcaster.xyz para firmar tu manifest
                </p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={openBaseBuild}>
                    Base Build
                  </Button>
                  <Button variant="outline" size="sm" onClick={openFarcasterTool}>
                    Farcaster Tool
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium">Actualiza tu Manifest</p>
                <p className="text-sm text-muted-foreground">
                  Copia las credenciales generadas y actualiza tu manifest
                </p>
              </div>
            </div>
          </div>

          {!verificationStatus.isVerified && (
            <Button 
              onClick={submitForVerification} 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar para Verificación'
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
