'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  Trophy, 
  Users, 
  TrendingUp, 
  Star, 
  Target,
  Award,
  Calendar,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

interface EarningOpportunity {
  id: string;
  title: string;
  description: string;
  type: 'verification' | 'competition' | 'partner' | 'campaign';
  reward: string;
  status: 'available' | 'in_progress' | 'completed' | 'locked';
  requirements: string[];
  progress?: number;
  deadline?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface EngagementMetrics {
  totalUsers: number;
  activeUsers: number;
  onchainTransactions: number;
  socialEngagement: number;
  viralScore: number;
}

export function EarningOpportunities() {
  const [opportunities, setOpportunities] = useState<EarningOpportunity[]>([]);
  const [metrics, setMetrics] = useState<EngagementMetrics>({
    totalUsers: 0,
    activeUsers: 0,
    onchainTransactions: 0,
    socialEngagement: 0,
    viralScore: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOpportunities();
    loadMetrics();
  }, []);

  const loadOpportunities = async () => {
    // Simular carga de oportunidades
    const mockOpportunities: EarningOpportunity[] = [
      {
        id: 'verification-reward',
        title: 'Verificación de Mini App',
        description: 'Verifica tu Mini App en Base.dev para desbloquear rewards básicos',
        type: 'verification',
        reward: '$100 - $500',
        status: 'available',
        requirements: ['Manifest configurado', 'Account Association firmado', 'Base Builder Address'],
        difficulty: 'easy'
      },
      {
        id: 'user-engagement',
        title: 'Programa de Engagement de Usuarios',
        description: 'Gana rewards por mantener usuarios activos y comprometidos',
        type: 'partner',
        reward: '$0.10 por usuario activo/mes',
        status: 'available',
        requirements: ['100+ usuarios activos', 'Retención > 30%', 'Engagement diario'],
        progress: 45,
        difficulty: 'medium'
      },
      {
        id: 'onchain-activity',
        title: 'Actividad Onchain',
        description: 'Rewards por transacciones onchain y adopción de Base Network',
        type: 'partner',
        reward: '$0.05 por transacción',
        status: 'in_progress',
        requirements: ['Transacciones en Base', 'Gas fees pagados', 'Smart contracts utilizados'],
        progress: 78,
        difficulty: 'medium'
      },
      {
        id: 'viral-growth',
        title: 'Crecimiento Viral',
        description: 'Bonificaciones por crecimiento orgánico y características virales',
        type: 'campaign',
        reward: '$1,000 - $5,000',
        status: 'locked',
        requirements: ['10,000+ usuarios', 'Viral coefficient > 1.5', 'Social sharing > 50%'],
        difficulty: 'hard'
      },
      {
        id: 'featured-placement',
        title: 'Featured Placement',
        description: 'Oportunidad de ser featured en Base App para mayor visibilidad',
        type: 'competition',
        reward: 'Featured placement + $2,000',
        status: 'locked',
        requirements: ['Featured Guidelines cumplidas', 'Alta calidad UX', 'Innovación técnica'],
        difficulty: 'hard'
      },
      {
        id: 'developer-competition',
        title: 'Base Developer Competition',
        description: 'Competencia trimestral para los mejores Mini Apps',
        type: 'competition',
        reward: '$10,000 - $50,000',
        status: 'locked',
        requirements: ['Mini App innovadora', 'Adopción masiva', 'Impacto en Base ecosystem'],
        deadline: '2024-03-31',
        difficulty: 'hard'
      }
    ];

    setOpportunities(mockOpportunities);
  };

  const loadMetrics = async () => {
    // Simular métricas de engagement
    setMetrics({
      totalUsers: 1247,
      activeUsers: 892,
      onchainTransactions: 3456,
      socialEngagement: 78,
      viralScore: 8.2
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'verification': return <CheckCircle className="h-4 w-4" />;
      case 'competition': return <Trophy className="h-4 w-4" />;
      case 'partner': return <Users className="h-4 w-4" />;
      case 'campaign': return <Target className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'verification': return 'bg-blue-100 text-blue-800';
      case 'competition': return 'bg-yellow-100 text-yellow-800';
      case 'partner': return 'bg-green-100 text-green-800';
      case 'campaign': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'locked': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startOpportunity = (opportunity: EarningOpportunity) => {
    // Implementar lógica para iniciar oportunidad
    console.log('Starting opportunity:', opportunity.id);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2">Cargando oportunidades...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Métricas de Engagement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Métricas de Engagement
          </CardTitle>
          <CardDescription>
            Tu rendimiento actual para oportunidades de rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{metrics.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Usuarios Totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{metrics.activeUsers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Usuarios Activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.onchainTransactions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Transacciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{metrics.viralScore}/10</div>
              <div className="text-sm text-muted-foreground">Viral Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Oportunidades de Ganancias */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Oportunidades de Ganancias</h3>
        
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(opportunity.type)}
                  <div>
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(opportunity.type)}>
                    {opportunity.type}
                  </Badge>
                  <Badge className={getDifficultyColor(opportunity.difficulty)}>
                    {opportunity.difficulty}
                  </Badge>
                  <Badge className={getStatusColor(opportunity.status)}>
                    {opportunity.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Recompensa:</span>
                <span className="text-lg font-bold text-green-600">{opportunity.reward}</span>
              </div>

              {opportunity.progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span>{opportunity.progress}%</span>
                  </div>
                  <Progress value={opportunity.progress} className="h-2" />
                </div>
              )}

              <div className="space-y-2">
                <span className="font-medium text-sm">Requisitos:</span>
                <ul className="space-y-1">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {opportunity.deadline && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                </div>
              )}

              <div className="flex gap-2">
                {opportunity.status === 'available' && (
                  <Button onClick={() => startOpportunity(opportunity)}>
                    <Award className="h-4 w-4 mr-2" />
                    Iniciar
                  </Button>
                )}
                {opportunity.status === 'in_progress' && (
                  <Button variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Ver Progreso
                  </Button>
                )}
                {opportunity.status === 'locked' && (
                  <Button variant="outline" disabled>
                    <Target className="h-4 w-4 mr-2" />
                    Bloqueado
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Más Info
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips para Maximizar Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Tips para Maximizar Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <h4 className="font-medium">🎯 Enfoque en Engagement</h4>
            <p className="text-sm text-muted-foreground">
              Las apps que mantienen usuarios activos y comprometidos consistentemente obtienen mejores rewards.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">⚡ Actividad Onchain</h4>
            <p className="text-sm text-muted-foreground">
              Incentiva transacciones en Base Network para maximizar rewards por actividad onchain.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">🚀 Crecimiento Viral</h4>
            <p className="text-sm text-muted-foreground">
              Implementa características sociales que generen sharing orgánico y crecimiento viral.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">🏆 Calidad Técnica</h4>
            <p className="text-sm text-muted-foreground">
              Cumple con Featured Guidelines y mantén alta calidad UX para oportunidades de featured placement.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
