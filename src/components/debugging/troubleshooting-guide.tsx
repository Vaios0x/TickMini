'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Image, 
  Wallet, 
  Smartphone, 
  Gesture, 
  Settings,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Copy,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

interface Issue {
  id: string;
  title: string;
  description: string;
  symptoms: string[];
  solutions: string[];
  prevention: string[];
  severity: 'low' | 'medium' | 'high';
  category: string;
}

export function TroubleshootingGuide() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [activeTab, setActiveTab] = useState('discovery');

  const issues: Issue[] = [
    {
      id: 'app-discovery',
      title: 'App Discovery & Indexing Issues',
      description: 'Tu Mini App no aparece en resultados de búsqueda o catálogos de apps.',
      symptoms: [
        'No aparece en búsquedas de Base App',
        'No se indexa en catálogos',
        'No aparece en categorías',
        'Búsqueda no encuentra la app'
      ],
      solutions: [
        'Verifica que primaryCategory esté configurado en el manifest',
        'Asegúrate de que accountAssociation esté completo',
        'Comparte tu Mini App URL en un post para trigger indexing',
        'Espera hasta 10 minutos para que aparezca en catálogos',
        'Verifica que el manifest sea accesible públicamente'
      ],
      prevention: [
        'Completa todos los campos requeridos del manifest',
        'Usa categorías apropiadas y tags relevantes',
        'Mantén el manifest actualizado',
        'Testea la indexación regularmente'
      ],
      severity: 'high',
      category: 'discovery'
    },
    {
      id: 'manifest-config',
      title: 'Manifest Configuration Problems',
      description: 'Problemas con la configuración del manifest que afectan la funcionalidad.',
      symptoms: [
        'Imágenes no se muestran correctamente',
        'Metadata incorrecto en embeds',
        'Campos faltantes en el manifest',
        'Errores de validación JSON'
      ],
      solutions: [
        'Testea la accesibilidad de imágenes en modo incógnito',
        'Verifica formato de imagen (PNG, JPG, WebP soportados)',
        'Verifica dimensiones de imágenes',
        'Asegúrate de que todas las URLs sean HTTPS',
        'Usa JSONLint para validar sintaxis JSON'
      ],
      prevention: [
        'Valida imágenes antes de subirlas',
        'Usa herramientas de validación automática',
        'Mantén un manifest de ejemplo como referencia',
        'Testea cambios en staging antes de producción'
      ],
      severity: 'medium',
      category: 'manifest'
    },
    {
      id: 'embed-rendering',
      title: 'Embed Rendering Issues',
      description: 'Tu Mini App URL no se renderiza como rich embed cuando se comparte.',
      symptoms: [
        'No aparece preview al compartir',
        'Metadata faltante en embeds',
        'Imagen de preview no se muestra',
        'Descripción incorrecta en embeds'
      ],
      solutions: [
        'Usa meta tag name="fc:frame" en el <head>',
        'Valida usando Embed Tool de Base.dev',
        'Verifica que og:image esté configurado',
        'Asegúrate de que las imágenes sean accesibles',
        'Testea el embed en diferentes plataformas'
      ],
      prevention: [
        'Implementa metadata completo desde el inicio',
        'Testea embeds en múltiples plataformas',
        'Mantén imágenes de preview actualizadas',
        'Valida metadata regularmente'
      ],
      severity: 'medium',
      category: 'embed'
    },
    {
      id: 'wallet-connection',
      title: 'Wallet Connection Problems',
      description: 'Problemas con la conexión de wallet que afectan la funcionalidad.',
      symptoms: [
        'Wallet no se conecta automáticamente',
        'Dirección de usuario no disponible',
        'Transacciones fallan',
        'Estado de conexión incorrecto'
      ],
      solutions: [
        'Usa OnchainKit Wallet component o Wagmi hooks',
        'Verifica que el wallet esté conectado antes de operaciones',
        'Implementa manejo de errores de conexión',
        'Usa useAccount hook para verificar estado',
        'Testea con diferentes wallets'
      ],
      prevention: [
        'Implementa verificación de wallet en todas las operaciones',
        'Usa hooks apropiados para estado de wallet',
        'Maneja casos de desconexión gracefully',
        'Testea con múltiples wallets'
      ],
      severity: 'high',
      category: 'wallet'
    },
    {
      id: 'gesture-conflicts',
      title: 'Gesture Conflicts and App Dismissal',
      description: 'La app se cierra inesperadamente por conflictos de gestos.',
      symptoms: [
        'App se cierra al hacer swipe',
        'Gestos nativos interfieren con la app',
        'Navegación no funciona correctamente',
        'App se cierra al hacer drag'
      ],
      solutions: [
        'Deshabilita gestos nativos al llamar ready()',
        'Usa disableNativeGestures: true en sdk.actions.ready()',
        'Implementa manejo de gestos personalizado',
        'Testea gestos en diferentes dispositivos',
        'Verifica que no haya conflictos con gestos del sistema'
      ],
      prevention: [
        'Siempre deshabilita gestos nativos si usas interacciones personalizadas',
        'Testea gestos en múltiples dispositivos',
        'Implementa gestos de manera consistente',
        'Documenta comportamiento de gestos'
      ],
      severity: 'medium',
      category: 'gesture'
    },
    {
      id: 'mobile-testing',
      title: 'Mobile Testing & Debugging Issues',
      description: 'Dificultades para debuggear y testear en dispositivos móviles.',
      symptoms: [
        'Console no disponible en móvil',
        'Errores difíciles de debuggear',
        'Testing limitado en dispositivos reales',
        'Performance issues en móvil'
      ],
      solutions: [
        'Implementa Eruda para console móvil',
        'Usa ngrok para testing local en móvil',
        'Comparte Mini App en Farcaster DM para testing',
        'Testea en múltiples clientes (Base App, Farcaster)',
        'Usa herramientas de profiling móvil'
      ],
      prevention: [
        'Configura Eruda desde el inicio del desarrollo',
        'Implementa logging robusto',
        'Testea en dispositivos reales regularmente',
        'Usa herramientas de debugging móvil'
      ],
      severity: 'low',
      category: 'mobile'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const copySolution = (solution: string) => {
    navigator.clipboard.writeText(solution);
    toast.success('Solución copiada');
  };

  const openBasePreview = () => {
    window.open('https://base.dev/preview', '_blank');
  };

  const openJSONLint = () => {
    window.open('https://jsonlint.com', '_blank');
  };

  const openErudaGitHub = () => {
    window.open('https://github.com/liriliri/eruda', '_blank');
  };

  const filteredIssues = issues.filter(issue => 
    activeTab === 'all' || issue.category === activeTab
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Guía de Troubleshooting</h2>
        <p className="text-muted-foreground">
          Soluciones para problemas comunes en Mini Apps
        </p>
      </div>

      {/* Tabs de Categorías */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="discovery" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Discovery
          </TabsTrigger>
          <TabsTrigger value="manifest" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Manifest
          </TabsTrigger>
          <TabsTrigger value="embed" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Embed
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Wallet
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Lista de Issues */}
          <div className="grid gap-4">
            {filteredIssues.map((issue) => (
              <Card 
                key={issue.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedIssue(issue)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getSeverityIcon(issue.severity)}
                      <div>
                        <CardTitle className="text-lg">{issue.title}</CardTitle>
                        <CardDescription>{issue.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(issue.severity)}>
                      {issue.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-sm">Síntomas:</span>
                      <ul className="text-sm text-muted-foreground ml-4">
                        {issue.symptoms.slice(0, 2).map((symptom, index) => (
                          <li key={index}>• {symptom}</li>
                        ))}
                        {issue.symptoms.length > 2 && (
                          <li>• ... y {issue.symptoms.length - 2} más</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detalle del Issue Seleccionado */}
          {selectedIssue && (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(selectedIssue.severity)}
                    <div>
                      <CardTitle>{selectedIssue.title}</CardTitle>
                      <CardDescription>{selectedIssue.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(selectedIssue.severity)}>
                    {selectedIssue.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Síntomas */}
                <div>
                  <h4 className="font-medium mb-2">Síntomas</h4>
                  <ul className="space-y-1">
                    {selectedIssue.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Soluciones */}
                <div>
                  <h4 className="font-medium mb-2">Soluciones</h4>
                  <ul className="space-y-2">
                    {selectedIssue.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          {solution}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="ml-2 h-6 px-2"
                            onClick={() => copySolution(solution)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prevención */}
                <div>
                  <h4 className="font-medium mb-2">Prevención</h4>
                  <ul className="space-y-1">
                    {selectedIssue.prevention.map((prevention, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        {prevention}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Herramientas de Debugging */}
      <Card>
        <CardHeader>
          <CardTitle>Herramientas de Debugging</CardTitle>
          <CardDescription>
            Enlaces útiles para debugging y validación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Base Build Preview Tool</p>
                <p className="text-sm text-muted-foreground">Herramienta oficial de debugging</p>
              </div>
              <Button variant="outline" size="sm" onClick={openBasePreview}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">JSONLint Validator</p>
                <p className="text-sm text-muted-foreground">Validar sintaxis JSON</p>
              </div>
              <Button variant="outline" size="sm" onClick={openJSONLint}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Validar
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Eruda Mobile Console</p>
                <p className="text-sm text-muted-foreground">Console para debugging móvil</p>
              </div>
              <Button variant="outline" size="sm" onClick={openErudaGitHub}>
                <ExternalLink className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Base Discord</p>
                <p className="text-sm text-muted-foreground">#minikit channel</p>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Unirse
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
