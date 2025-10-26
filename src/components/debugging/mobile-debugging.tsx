'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Monitor, 
  Wifi, 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Copy,
  Download,
  Play,
  Pause,
  Square
} from 'lucide-react';
import { toast } from 'sonner';

interface DebugInfo {
  userAgent: string;
  viewport: { width: number; height: number };
  device: string;
  platform: string;
  touch: boolean;
  orientation: string;
  connection: string;
  eruda: boolean;
}

interface ConsoleLog {
  id: string;
  timestamp: string;
  level: 'log' | 'warn' | 'error' | 'info';
  message: string;
  source?: string;
}

export function MobileDebugging() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [isErudaEnabled, setIsErudaEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    loadDebugInfo();
    setupEruda();
    setupConsoleCapture();
  }, []);

  const loadDebugInfo = () => {
    const userAgent = navigator.userAgent;
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Detectar dispositivo
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)/i.test(userAgent);
    
    let device = 'Desktop';
    if (isTablet) device = 'Tablet';
    else if (isMobile) device = 'Mobile';

    // Detectar plataforma
    let platform = 'Unknown';
    if (/Android/i.test(userAgent)) platform = 'Android';
    else if (/iPhone|iPad|iPod/i.test(userAgent)) platform = 'iOS';
    else if (/Windows/i.test(userAgent)) platform = 'Windows';
    else if (/Mac/i.test(userAgent)) platform = 'macOS';
    else if (/Linux/i.test(userAgent)) platform = 'Linux';

    // Detectar touch
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Detectar orientación
    const orientation = window.innerHeight > window.innerWidth ? 'Portrait' : 'Landscape';

    // Detectar conexión
    const connection = (navigator as any).connection?.effectiveType || 'Unknown';

    setDebugInfo({
      userAgent,
      viewport,
      device,
      platform,
      touch,
      orientation,
      connection,
      eruda: isErudaEnabled
    });
  };

  const setupEruda = () => {
    // Verificar si Eruda ya está cargado
    const erudaExists = typeof (window as any).eruda !== 'undefined';
    setIsErudaEnabled(erudaExists);

    if (!erudaExists && process.env.NODE_ENV === 'development') {
      // Cargar Eruda solo en desarrollo y no en localhost
      if (!window.location.hostname.includes('localhost')) {
        import('eruda').then((eruda) => {
          eruda.default.init();
          setIsErudaEnabled(true);
          toast.success('Eruda cargado para debugging móvil');
        }).catch((error) => {
          console.error('Error loading Eruda:', error);
          toast.error('Error cargando Eruda');
        });
      }
    }
  };

  const setupConsoleCapture = () => {
    // Capturar console logs
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;

    const captureLog = (level: 'log' | 'warn' | 'error' | 'info') => {
      return (...args: any[]) => {
        const message = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');

        const log: ConsoleLog = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          level,
          message,
          source: 'Console'
        };

        setConsoleLogs(prev => [...prev.slice(-49), log]); // Mantener últimos 50 logs

        // Llamar función original
        switch (level) {
          case 'log': originalLog(...args); break;
          case 'warn': originalWarn(...args); break;
          case 'error': originalError(...args); break;
          case 'info': originalInfo(...args); break;
        }
      };
    };

    console.log = captureLog('log');
    console.warn = captureLog('warn');
    console.error = captureLog('error');
    console.info = captureLog('info');
  };

  const startRecording = () => {
    setIsRecording(true);
    toast.success('Grabación de logs iniciada');
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast.success('Grabación detenida');
  };

  const clearLogs = () => {
    setConsoleLogs([]);
    toast.success('Logs limpiados');
  };

  const downloadLogs = () => {
    const logsText = consoleLogs.map(log => 
      `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`
    ).join('\n');

    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-logs-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Logs descargados');
  };

  const copyUserAgent = () => {
    if (debugInfo) {
      navigator.clipboard.writeText(debugInfo.userAgent);
      toast.success('User Agent copiado');
    }
  };

  const openErudaGitHub = () => {
    window.open('https://github.com/liriliri/eruda', '_blank');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-600';
      case 'warn': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warn': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  if (!debugInfo) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2">Cargando información de debugging...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estado de Eruda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Mobile Debugging Console
          </CardTitle>
          <CardDescription>
            Herramientas de debugging para dispositivos móviles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">Eruda Status:</span>
              <Badge variant={isErudaEnabled ? "default" : "secondary"}>
                {isErudaEnabled ? "Activo" : "Inactivo"}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={isErudaEnabled ? undefined : setupEruda}
                disabled={isErudaEnabled}
              >
                {isErudaEnabled ? "Cargado" : "Cargar Eruda"}
              </Button>
              <Button variant="outline" size="sm" onClick={openErudaGitHub}>
                <ExternalLink className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>
          </div>

          {!isErudaEnabled && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Nota:</strong> Eruda se carga automáticamente en desarrollo. 
                Para producción, agrega el script manualmente.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Información del Dispositivo */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Info
          </TabsTrigger>
          <TabsTrigger value="console" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Console
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información del Dispositivo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium">Dispositivo:</span>
                  <p className="text-sm text-muted-foreground">{debugInfo.device}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Plataforma:</span>
                  <p className="text-sm text-muted-foreground">{debugInfo.platform}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Viewport:</span>
                  <p className="text-sm text-muted-foreground">
                    {debugInfo.viewport.width} × {debugInfo.viewport.height}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Orientación:</span>
                  <p className="text-sm text-muted-foreground">{debugInfo.orientation}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Touch:</span>
                  <p className="text-sm text-muted-foreground">
                    {debugInfo.touch ? "Soportado" : "No soportado"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Conexión:</span>
                  <p className="text-sm text-muted-foreground">{debugInfo.connection}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">User Agent:</span>
                  <Button variant="outline" size="sm" onClick={copyUserAgent}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar
                  </Button>
                </div>
                <code className="block p-2 bg-muted rounded text-xs break-all">
                  {debugInfo.userAgent}
                </code>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="console" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Console Logs</CardTitle>
                <div className="flex gap-2">
                  {!isRecording ? (
                    <Button size="sm" onClick={startRecording}>
                      <Play className="h-4 w-4 mr-2" />
                      Grabar
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={stopRecording}>
                      <Pause className="h-4 w-4 mr-2" />
                      Pausar
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={clearLogs}>
                    <Square className="h-4 w-4 mr-2" />
                    Limpiar
                  </Button>
                  <Button size="sm" variant="outline" onClick={downloadLogs}>
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </div>
              </div>
              <CardDescription>
                {consoleLogs.length} logs capturados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {consoleLogs.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No hay logs capturados aún
                  </p>
                ) : (
                  consoleLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-2 p-2 border rounded text-xs">
                      <div className="flex-shrink-0 mt-0.5">
                        {getLevelIcon(log.level)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{log.timestamp}</span>
                          <Badge variant="outline" className={getLevelColor(log.level)}>
                            {log.level.toUpperCase()}
                          </Badge>
                        </div>
                        <pre className="text-xs whitespace-pre-wrap break-all">
                          {log.message}
                        </pre>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Herramientas de Testing</CardTitle>
              <CardDescription>
                Workflow recomendado para testing móvil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">1. Deploy a Producción</h4>
                  <p className="text-sm text-blue-800">
                    Despliega tu Mini App a producción o usa ngrok para testing local
                  </p>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">2. Compartir en Farcaster</h4>
                  <p className="text-sm text-green-800">
                    Comparte la URL de tu Mini App en un DM de Farcaster para testing
                  </p>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">3. Abrir en Cliente Móvil</h4>
                  <p className="text-sm text-purple-800">
                    Abre la Mini App en Base App o Farcaster en tu dispositivo móvil
                  </p>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">4. Usar Eruda Console</h4>
                  <p className="text-sm text-yellow-800">
                    Usa la consola Eruda para debugging en tiempo real en móvil
                  </p>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">5. Testing Multi-Cliente</h4>
                  <p className="text-sm text-gray-800">
                    Prueba en múltiples clientes para verificar compatibilidad
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Checklist de Testing:</h4>
                <div className="space-y-1">
                  {[
                    'App carga correctamente en dispositivos móviles',
                    'Interacciones táctiles funcionan apropiadamente',
                    'Viewport está correctamente dimensionado',
                    'Imágenes cargan y se muestran correctamente',
                    'Console no muestra errores críticos'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 border rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
