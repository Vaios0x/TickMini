'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  ExternalLink, 
  Copy,
  RefreshCw,
  Globe,
  FileText,
  Image,
  Shield,
  Wifi
} from 'lucide-react';
import { toast } from 'sonner';

interface VerificationResult {
  test: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: string;
  fix?: string;
}

interface SetupStatus {
  domain: boolean;
  https: boolean;
  manifest: boolean;
  images: boolean;
  structure: boolean;
  overall: number;
}

export function SetupVerification() {
  const [verificationResults, setVerificationResults] = useState<VerificationResult[]>([]);
  const [setupStatus, setSetupStatus] = useState<SetupStatus>({
    domain: false,
    https: false,
    manifest: false,
    images: false,
    structure: false,
    overall: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentDomain, setCurrentDomain] = useState('');

  useEffect(() => {
    setCurrentDomain(window.location.hostname);
    runVerification();
  }, []);

  const runVerification = async () => {
    setIsLoading(true);
    const results: VerificationResult[] = [];

    try {
      // 1. Domain Accessibility
      const domainResult = await verifyDomain();
      results.push(domainResult);

      // 2. HTTPS Check
      const httpsResult = await verifyHTTPS();
      results.push(httpsResult);

      // 3. Manifest File
      const manifestResult = await verifyManifest();
      results.push(manifestResult);

      // 4. Image Accessibility
      const imagesResult = await verifyImages();
      results.push(imagesResult);

      // 5. File Structure
      const structureResult = await verifyStructure();
      results.push(structureResult);

      // 6. JSON Syntax
      const jsonResult = await verifyJSONSyntax();
      results.push(jsonResult);

      // 7. Required Fields
      const fieldsResult = await verifyRequiredFields();
      results.push(fieldsResult);

      // 8. Account Association
      const accountResult = await verifyAccountAssociation();
      results.push(accountResult);

      setVerificationResults(results);
      calculateOverallStatus(results);
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Error durante la verificación');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyDomain = async (): Promise<VerificationResult> => {
    try {
      const response = await fetch(window.location.origin, { method: 'HEAD' });
      return {
        test: 'Domain Accessibility',
        status: response.ok ? 'pass' : 'fail',
        message: response.ok ? 'Dominio accesible' : 'Dominio no accesible',
        details: `Status: ${response.status}`,
        fix: response.ok ? undefined : 'Verifica que tu dominio esté configurado correctamente'
      };
    } catch (error) {
      return {
        test: 'Domain Accessibility',
        status: 'fail',
        message: 'Error de conectividad',
        details: error instanceof Error ? error.message : 'Unknown error',
        fix: 'Verifica tu conexión a internet y configuración DNS'
      };
    }
  };

  const verifyHTTPS = async (): Promise<VerificationResult> => {
    const isHTTPS = window.location.protocol === 'https:';
    return {
      test: 'HTTPS Security',
      status: isHTTPS ? 'pass' : 'fail',
      message: isHTTPS ? 'HTTPS habilitado' : 'HTTPS requerido',
      details: `Protocol: ${window.location.protocol}`,
      fix: isHTTPS ? undefined : 'Configura SSL/TLS en tu servidor'
    };
  };

  const verifyManifest = async (): Promise<VerificationResult> => {
    try {
      const response = await fetch('/.well-known/farcaster.json');
      if (response.ok) {
        return {
          test: 'Manifest File',
          status: 'pass',
          message: 'Manifest encontrado',
          details: `Status: ${response.status}`,
          fix: undefined
        };
      } else {
        return {
          test: 'Manifest File',
          status: 'fail',
          message: 'Manifest no encontrado',
          details: `Status: ${response.status}`,
          fix: 'Crea el archivo /.well-known/farcaster.json'
        };
      }
    } catch (error) {
      return {
        test: 'Manifest File',
        status: 'fail',
        message: 'Error accediendo al manifest',
        details: error instanceof Error ? error.message : 'Unknown error',
        fix: 'Verifica que el archivo existe y es accesible'
      };
    }
  };

  const verifyImages = async (): Promise<VerificationResult> => {
    const imageUrls = [
      '/icon-optimized.svg',
      '/images/og-image.svg'
    ];

    let passed = 0;
    const results: string[] = [];

    for (const url of imageUrls) {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
          passed++;
          results.push(`✅ ${url}`);
        } else {
          results.push(`❌ ${url} (${response.status})`);
        }
      } catch (error) {
        results.push(`❌ ${url} (Error)`);
      }
    }

    return {
      test: 'Image Accessibility',
      status: passed === imageUrls.length ? 'pass' : passed > 0 ? 'warning' : 'fail',
      message: `${passed}/${imageUrls.length} imágenes accesibles`,
      details: results.join('\n'),
      fix: passed < imageUrls.length ? 'Verifica que todas las imágenes estén disponibles públicamente' : undefined
    };
  };

  const verifyStructure = async (): Promise<VerificationResult> => {
    const requiredPaths = [
      '/.well-known/farcaster.json',
      '/icon-optimized.svg'
    ];

    let passed = 0;
    const results: string[] = [];

    for (const path of requiredPaths) {
      try {
        const response = await fetch(path, { method: 'HEAD' });
        if (response.ok) {
          passed++;
          results.push(`✅ ${path}`);
        } else {
          results.push(`❌ ${path} (${response.status})`);
        }
      } catch (error) {
        results.push(`❌ ${path} (Error)`);
      }
    }

    return {
      test: 'File Structure',
      status: passed === requiredPaths.length ? 'pass' : 'fail',
      message: `${passed}/${requiredPaths.length} archivos requeridos encontrados`,
      details: results.join('\n'),
      fix: passed < requiredPaths.length ? 'Verifica que todos los archivos requeridos estén en su lugar' : undefined
    };
  };

  const verifyJSONSyntax = async (): Promise<VerificationResult> => {
    try {
      const response = await fetch('/.well-known/farcaster.json');
      const text = await response.text();
      
      try {
        JSON.parse(text);
        return {
          test: 'JSON Syntax',
          status: 'pass',
          message: 'JSON válido',
          details: 'Sintaxis JSON correcta',
          fix: undefined
        };
      } catch (jsonError) {
        return {
          test: 'JSON Syntax',
          status: 'fail',
          message: 'JSON inválido',
          details: jsonError instanceof Error ? jsonError.message : 'Unknown error',
          fix: 'Usa JSONLint para validar la sintaxis'
        };
      }
    } catch (error) {
      return {
        test: 'JSON Syntax',
        status: 'fail',
        message: 'Error accediendo al manifest',
        details: error instanceof Error ? error.message : 'Unknown error',
        fix: 'Verifica que el manifest sea accesible'
      };
    }
  };

  const verifyRequiredFields = async (): Promise<VerificationResult> => {
    try {
      const response = await fetch('/.well-known/farcaster.json');
      const manifest = await response.json();

      const requiredFields = [
        'accountAssociation',
        'miniapp.name',
        'miniapp.description',
        'miniapp.iconUrl',
        'miniapp.homeUrl',
        'miniapp.requiredChains',
        'miniapp.tags'
      ];

      let passed = 0;
      const results: string[] = [];

      for (const field of requiredFields) {
        const value = field.split('.').reduce((obj, key) => obj?.[key], manifest);
        if (value !== undefined && value !== null && value !== '') {
          passed++;
          results.push(`✅ ${field}`);
        } else {
          results.push(`❌ ${field} (faltante)`);
        }
      }

      return {
        test: 'Required Fields',
        status: passed === requiredFields.length ? 'pass' : 'warning',
        message: `${passed}/${requiredFields.length} campos requeridos presentes`,
        details: results.join('\n'),
        fix: passed < requiredFields.length ? 'Completa todos los campos requeridos en el manifest' : undefined
      };
    } catch (error) {
      return {
        test: 'Required Fields',
        status: 'fail',
        message: 'Error verificando campos',
        details: error instanceof Error ? error.message : 'Unknown error',
        fix: 'Verifica que el manifest sea válido'
      };
    }
  };

  const verifyAccountAssociation = async (): Promise<VerificationResult> => {
    try {
      const response = await fetch('/.well-known/farcaster.json');
      const manifest = await response.json();

      const accountAssociation = manifest.accountAssociation;
      const hasHeader = accountAssociation?.header;
      const hasPayload = accountAssociation?.payload;
      const hasSignature = accountAssociation?.signature;

      if (hasHeader && hasPayload && hasSignature) {
        return {
          test: 'Account Association',
          status: 'pass',
          message: 'Account Association configurado',
          details: 'Header, payload y signature presentes',
          fix: undefined
        };
      } else {
        return {
          test: 'Account Association',
          status: 'warning',
          message: 'Account Association incompleto',
          details: `Header: ${hasHeader ? '✅' : '❌'}, Payload: ${hasPayload ? '✅' : '❌'}, Signature: ${hasSignature ? '✅' : '❌'}`,
          fix: 'Firma tu manifest usando Base.dev o Farcaster.xyz'
        };
      }
    } catch (error) {
      return {
        test: 'Account Association',
        status: 'fail',
        message: 'Error verificando Account Association',
        details: error instanceof Error ? error.message : 'Unknown error',
        fix: 'Verifica que el manifest sea accesible'
      };
    }
  };

  const calculateOverallStatus = (results: VerificationResult[]) => {
    const passCount = results.filter(r => r.status === 'pass').length;
    const totalCount = results.length;
    const overall = Math.round((passCount / totalCount) * 100);

    setSetupStatus({
      domain: results.find(r => r.test === 'Domain Accessibility')?.status === 'pass',
      https: results.find(r => r.test === 'HTTPS Security')?.status === 'pass',
      manifest: results.find(r => r.test === 'Manifest File')?.status === 'pass',
      images: results.find(r => r.test === 'Image Accessibility')?.status === 'pass',
      structure: results.find(r => r.test === 'File Structure')?.status === 'pass',
      overall
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'bg-green-100 text-green-800';
      case 'fail': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyManifestUrl = async () => {
    const manifestUrl = `${window.location.origin}/.well-known/farcaster.json`;
    await navigator.clipboard.writeText(manifestUrl);
    toast.success('URL del manifest copiada');
  };

  const openBasePreview = () => {
    window.open('https://base.dev/preview', '_blank');
  };

  const openJSONLint = () => {
    const manifestUrl = `${window.location.origin}/.well-known/farcaster.json`;
    window.open(`https://jsonlint.com/?json=${encodeURIComponent(manifestUrl)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Resumen de Estado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Estado de Setup
          </CardTitle>
          <CardDescription>
            Verificación de requisitos fundamentales para Mini App
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Progreso General</span>
            <span className="text-2xl font-bold">{setupStatus.overall}%</span>
          </div>
          <Progress value={setupStatus.overall} className="h-3" />
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${setupStatus.domain ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <Globe className="h-4 w-4" />
              </div>
              <div className="text-xs">Dominio</div>
            </div>
            <div className="text-center">
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${setupStatus.https ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <Shield className="h-4 w-4" />
              </div>
              <div className="text-xs">HTTPS</div>
            </div>
            <div className="text-center">
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${setupStatus.manifest ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <FileText className="h-4 w-4" />
              </div>
              <div className="text-xs">Manifest</div>
            </div>
            <div className="text-center">
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${setupStatus.images ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <Image className="h-4 w-4" />
              </div>
              <div className="text-xs">Imágenes</div>
            </div>
            <div className="text-center">
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${setupStatus.structure ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <Wifi className="h-4 w-4" />
              </div>
              <div className="text-xs">Estructura</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados de Verificación */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Resultados de Verificación</CardTitle>
            <Button onClick={runVerification} disabled={isLoading} size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Verificar
            </Button>
          </div>
          <CardDescription>
            Estado actual: {currentDomain}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {verificationResults.map((result, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(result.status)}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{result.test}</span>
                  <Badge className={getStatusColor(result.status)}>
                    {result.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{result.message}</p>
                {result.details && (
                  <details className="text-xs">
                    <summary className="cursor-pointer text-muted-foreground">Detalles</summary>
                    <pre className="mt-2 p-2 bg-muted rounded text-xs whitespace-pre-wrap">{result.details}</pre>
                  </details>
                )}
                {result.fix && (
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                    <strong>Fix:</strong> {result.fix}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Herramientas de Debugging */}
      <Card>
        <CardHeader>
          <CardTitle>Herramientas de Debugging</CardTitle>
          <CardDescription>
            Enlaces útiles para debugging y validación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Base Build Preview Tool</p>
              <p className="text-sm text-muted-foreground">Herramienta oficial de Base.dev</p>
            </div>
            <Button variant="outline" size="sm" onClick={openBasePreview}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">JSONLint Validator</p>
              <p className="text-sm text-muted-foreground">Validar sintaxis JSON del manifest</p>
            </div>
            <Button variant="outline" size="sm" onClick={openJSONLint}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Validar
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Manifest URL</p>
              <p className="text-sm text-muted-foreground">URL directa al manifest</p>
            </div>
            <Button variant="outline" size="sm" onClick={copyManifestUrl}>
              <Copy className="h-4 w-4 mr-2" />
              Copiar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
