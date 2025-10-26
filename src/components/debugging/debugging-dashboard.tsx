'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Bug, 
  Shield, 
  Smartphone, 
  AlertTriangle,
  CheckCircle,
  Settings,
  ExternalLink,
  RefreshCw
} from 'lucide-react';
import { SetupVerification } from './setup-verification';
import { MobileDebugging } from './mobile-debugging';
import { TroubleshootingGuide } from './troubleshooting-guide';

interface DebuggingStatus {
  setupComplete: boolean;
  mobileReady: boolean;
  issuesFound: number;
  lastChecked: string;
}

export function DebuggingDashboard() {
  const [activeTab, setActiveTab] = useState('setup');
  const [debuggingStatus, setDebuggingStatus] = useState<DebuggingStatus>({
    setupComplete: false,
    mobileReady: false,
    issuesFound: 0,
    lastChecked: new Date().toLocaleTimeString()
  });

  const refreshStatus = () => {
    setDebuggingStatus(prev => ({
      ...prev,
      lastChecked: new Date().toLocaleTimeString()
    }));
  };

  const openBasePreview = () => {
    window.open('https://base.dev/preview', '_blank');
  };

  const openBaseDiscord = () => {
    window.open('https://discord.gg/base', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Debugging Dashboard</h1>
        <p className="text-muted-foreground">
          Herramientas completas para debugging y troubleshooting de Mini Apps
        </p>
      </div>

      {/* Estado General */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Setup Status</p>
                <p className="text-2xl font-bold">
                  {debuggingStatus.setupComplete ? 'Completo' : 'Pendiente'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Smartphone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobile Ready</p>
                <p className="text-2xl font-bold">
                  {debuggingStatus.mobileReady ? 'Sí' : 'No'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Issues Found</p>
                <p className="text-2xl font-bold">{debuggingStatus.issuesFound}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Checked</p>
                <p className="text-2xl font-bold text-sm">{debuggingStatus.lastChecked}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Acciones rápidas para debugging y validación
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Base Build Preview</p>
                <p className="text-sm text-muted-foreground">Herramienta oficial de debugging</p>
              </div>
              <button 
                onClick={openBasePreview}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Refresh Status</p>
                <p className="text-sm text-muted-foreground">Actualizar estado de debugging</p>
              </div>
              <button 
                onClick={refreshStatus}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Base Discord</p>
                <p className="text-sm text-muted-foreground">#minikit channel</p>
              </div>
              <button 
                onClick={openBaseDiscord}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Debugging */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Setup Verification
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Mobile Debugging
          </TabsTrigger>
          <TabsTrigger value="troubleshooting" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Troubleshooting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup">
          <SetupVerification />
        </TabsContent>

        <TabsContent value="mobile">
          <MobileDebugging />
        </TabsContent>

        <TabsContent value="troubleshooting">
          <TroubleshootingGuide />
        </TabsContent>
      </Tabs>

      {/* Tips de Debugging */}
      <Card>
        <CardHeader>
          <CardTitle>Tips de Debugging</CardTitle>
          <CardDescription>
            Mejores prácticas para debugging efectivo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-900">Setup First</span>
                </div>
                <p className="text-sm text-green-800">
                  Siempre verifica el setup básico antes de debugging avanzado
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Test Mobile</span>
                </div>
                <p className="text-sm text-blue-800">
                  Usa Eruda y dispositivos reales para testing móvil
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-900">Check Logs</span>
                </div>
                <p className="text-sm text-yellow-800">
                  Revisa console logs regularmente para detectar problemas temprano
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-900">Use Tools</span>
                </div>
                <p className="text-sm text-purple-800">
                  Aprovecha las herramientas oficiales de Base.dev para debugging
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
