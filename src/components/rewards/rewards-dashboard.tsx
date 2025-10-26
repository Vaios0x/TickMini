'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  DollarSign, 
  Target, 
  TrendingUp,
  Award,
  Star,
  Users,
  Activity
} from 'lucide-react';
import { VerificationSystem } from './verification-system';
import { EarningOpportunities } from './earning-opportunities';
import { EngagementMetrics } from './engagement-metrics';

interface RewardsSummary {
  totalEarned: number;
  pendingRewards: number;
  nextMilestone: string;
  rank: string;
  level: number;
  xp: number;
  xpToNext: number;
}

export function RewardsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const rewardsSummary: RewardsSummary = {
    totalEarned: 2340,
    pendingRewards: 850,
    nextMilestone: '10,000 usuarios activos',
    rank: 'Top 15%',
    level: 7,
    xp: 2340,
    xpToNext: 660
  };

  const getLevelColor = (level: number) => {
    if (level >= 10) return 'text-purple-600';
    if (level >= 7) return 'text-blue-600';
    if (level >= 5) return 'text-green-600';
    if (level >= 3) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getRankColor = (rank: string) => {
    if (rank.includes('Top 5%')) return 'text-purple-600';
    if (rank.includes('Top 10%')) return 'text-blue-600';
    if (rank.includes('Top 15%')) return 'text-green-600';
    if (rank.includes('Top 25%')) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Rewards Dashboard</h1>
        <p className="text-muted-foreground">
          Gana recompensas por construir Mini Apps de alta calidad en Base Network
        </p>
      </div>

      {/* Resumen de Rewards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Ganado</p>
                <p className="text-2xl font-bold">${rewardsSummary.totalEarned.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">${rewardsSummary.pendingRewards.toLocaleString()}</p>
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
                <p className="text-sm text-muted-foreground">Nivel</p>
                <p className="text-2xl font-bold">{rewardsSummary.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ranking</p>
                <p className="text-2xl font-bold">{rewardsSummary.rank}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progreso de Nivel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Progreso de Nivel
          </CardTitle>
          <CardDescription>
            Nivel {rewardsSummary.level} - {rewardsSummary.xpToNext} XP para el siguiente nivel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">XP Actual</span>
              <span className="font-bold">{rewardsSummary.xp.toLocaleString()} / {(rewardsSummary.xp + rewardsSummary.xpToNext).toLocaleString()}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${(rewardsSummary.xp / (rewardsSummary.xp + rewardsSummary.xpToNext)) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Nivel {rewardsSummary.level}</span>
              <span>Nivel {rewardsSummary.level + 1}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Próximo Milestone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Próximo Milestone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{rewardsSummary.nextMilestone}</p>
              <p className="text-sm text-muted-foreground">Recompensa: $500</p>
            </div>
            <Badge variant="outline" className="text-green-600 border-green-600">
              En Progreso
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Contenido */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Verificación
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Oportunidades
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Métricas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Resumen de Actividad
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Usuarios Activos</span>
                    <span className="font-medium">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Transacciones Onchain</span>
                    <span className="font-medium">3,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Engagement Social</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Viral Coefficient</span>
                    <span className="font-medium">1.8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Logros Recientes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Verificación Completada</p>
                    <p className="text-xs text-muted-foreground">+$100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">1000+ Usuarios</p>
                    <p className="text-xs text-muted-foreground">+$200</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Activity className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">1000+ Transacciones</p>
                    <p className="text-xs text-muted-foreground">+$150</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="verification">
          <VerificationSystem />
        </TabsContent>

        <TabsContent value="opportunities">
          <EarningOpportunities />
        </TabsContent>

        <TabsContent value="metrics">
          <EngagementMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
