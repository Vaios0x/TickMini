'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Share2, 
  Heart, 
  MessageCircle,
  DollarSign,
  Target,
  Zap,
  Award
} from 'lucide-react';

interface MetricData {
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface EngagementData {
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  onchainTransactions: number;
  socialShares: number;
  likes: number;
  comments: number;
  viralCoefficient: number;
  retentionRate: number;
  revenue: number;
}

export function EngagementMetrics() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [engagementData, setEngagementData] = useState<EngagementData>({
    dailyActiveUsers: 0,
    weeklyActiveUsers: 0,
    monthlyActiveUsers: 0,
    onchainTransactions: 0,
    socialShares: 0,
    likes: 0,
    comments: 0,
    viralCoefficient: 0,
    retentionRate: 0,
    revenue: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      setIsLoading(true);
      
      // Simular datos de engagement
      const mockEngagementData: EngagementData = {
        dailyActiveUsers: 892,
        weeklyActiveUsers: 2341,
        monthlyActiveUsers: 5678,
        onchainTransactions: 3456,
        socialShares: 1234,
        likes: 5678,
        comments: 1234,
        viralCoefficient: 1.8,
        retentionRate: 78,
        revenue: 2340
      };

      setEngagementData(mockEngagementData);

      // Crear métricas para display
      const metricsData: MetricData[] = [
        {
          name: 'Usuarios Activos Diarios',
          value: mockEngagementData.dailyActiveUsers,
          target: 1000,
          trend: 'up',
          change: 12.5,
          icon: <Users className="h-4 w-4" />,
          color: 'text-blue-600'
        },
        {
          name: 'Transacciones Onchain',
          value: mockEngagementData.onchainTransactions,
          target: 5000,
          trend: 'up',
          change: 8.3,
          icon: <Activity className="h-4 w-4" />,
          color: 'text-green-600'
        },
        {
          name: 'Engagement Social',
          value: mockEngagementData.likes + mockEngagementData.comments,
          target: 10000,
          trend: 'up',
          change: 15.2,
          icon: <Heart className="h-4 w-4" />,
          color: 'text-red-600'
        },
        {
          name: 'Viral Coefficient',
          value: mockEngagementData.viralCoefficient,
          target: 2.0,
          trend: 'up',
          change: 5.1,
          icon: <Share2 className="h-4 w-4" />,
          color: 'text-purple-600'
        },
        {
          name: 'Retention Rate',
          value: mockEngagementData.retentionRate,
          target: 80,
          trend: 'stable',
          change: -1.2,
          icon: <Target className="h-4 w-4" />,
          color: 'text-orange-600'
        },
        {
          name: 'Revenue',
          value: mockEngagementData.revenue,
          target: 5000,
          trend: 'up',
          change: 22.8,
          icon: <DollarSign className="h-4 w-4" />,
          color: 'text-green-600'
        }
      ];

      setMetrics(metricsData);
    } catch (error) {
      console.error('Error loading metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2">Cargando métricas...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Resumen de Engagement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Resumen de Engagement
          </CardTitle>
          <CardDescription>
            Métricas clave para maximizar rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Usuarios Activos</span>
              </div>
              <div className="text-2xl font-bold">{engagementData.dailyActiveUsers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Diarios</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="font-medium">Transacciones</span>
              </div>
              <div className="text-2xl font-bold">{engagementData.onchainTransactions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Onchain</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Viral Score</span>
              </div>
              <div className="text-2xl font-bold">{engagementData.viralCoefficient}</div>
              <div className="text-sm text-muted-foreground">Coefficient</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Detalladas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={metric.color}>
                    {metric.icon}
                  </div>
                  <CardTitle className="text-base">{metric.name}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{metric.value.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">
                  Target: {metric.target.toLocaleString()}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso hacia target</span>
                  <span>{Math.min(100, Math.round((metric.value / metric.target) * 100))}%</span>
                </div>
                <Progress 
                  value={Math.min(100, Math.round((metric.value / metric.target) * 100))} 
                  className="h-2" 
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Faltan para target:</span>
                <span className="font-medium">
                  {Math.max(0, metric.target - metric.value).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actividad Social */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Actividad Social
          </CardTitle>
          <CardDescription>
            Interacciones sociales que impulsan engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{engagementData.likes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{engagementData.comments.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Comentarios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{engagementData.socialShares.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Shares</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{engagementData.retentionRate}%</div>
              <div className="text-sm text-muted-foreground">Retención</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights y Recomendaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Insights y Recomendaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Fortaleza: Engagement Social</span>
              </div>
              <p className="text-sm text-green-700">
                Tu viral coefficient de {engagementData.viralCoefficient} está por encima del promedio. 
                Continúa incentivando el sharing social.
              </p>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Oportunidad: Actividad Onchain</span>
              </div>
              <p className="text-sm text-blue-700">
                Aumenta las transacciones onchain para maximizar rewards. Considera incentivos para transacciones.
              </p>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Mejora: Retención</span>
              </div>
              <p className="text-sm text-yellow-700">
                Tu retención del {engagementData.retentionRate}% está cerca del target. 
                Implementa características de retención para alcanzar el 80%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
