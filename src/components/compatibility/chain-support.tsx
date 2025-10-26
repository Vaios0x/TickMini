'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Network, 
  CheckCircle, 
  AlertTriangle,
  Info,
  ExternalLink,
  RefreshCw,
  Zap,
  Shield,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

interface ChainInfo {
  id: string;
  name: string;
  symbol: string;
  chainId: number;
  rpcUrl: string;
  blockExplorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  features: string[];
  gasPrice?: string;
  status: 'active' | 'beta' | 'deprecated';
  supportedBy: ('base' | 'farcaster')[];
}

interface ChainSupport {
  totalChains: number;
  activeChains: number;
  betaChains: number;
  deprecatedChains: number;
  baseAppChains: number;
  farcasterChains: number;
}

export function ChainSupport() {
  const [chains, setChains] = useState<ChainInfo[]>([]);
  const [support, setSupport] = useState<ChainSupport | null>(null);
  const [selectedChain, setSelectedChain] = useState<ChainInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadChainSupport();
  }, []);

  const loadChainSupport = async () => {
    try {
      setIsLoading(true);
      
      // Cadenas soportadas por Base App y Farcaster
      const supportedChains: ChainInfo[] = [
        {
          id: 'base',
          name: 'Base',
          symbol: 'ETH',
          chainId: 8453,
          rpcUrl: 'https://mainnet.base.org',
          blockExplorer: 'https://basescan.org',
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
          },
          features: [
            'Low Gas Fees',
            'Fast Transactions',
            'EVM Compatible',
            'Optimism Stack'
          ],
          gasPrice: '0.001 ETH',
          status: 'active',
          supportedBy: ['base', 'farcaster']
        },
        {
          id: 'mainnet',
          name: 'Ethereum Mainnet',
          symbol: 'ETH',
          chainId: 1,
          rpcUrl: 'https://eth.llamarpc.com',
          blockExplorer: 'https://etherscan.io',
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
          },
          features: [
            'Full DeFi Ecosystem',
            'Highest Security',
            'Most Liquidity',
            'Standard Protocol'
          ],
          gasPrice: '0.02 ETH',
          status: 'active',
          supportedBy: ['base', 'farcaster']
        },
        {
          id: 'optimism',
          name: 'Optimism',
          symbol: 'ETH',
          chainId: 10,
          rpcUrl: 'https://mainnet.optimism.io',
          blockExplorer: 'https://optimistic.etherscan.io',
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
          },
          features: [
            'L2 Scaling',
            'Low Fees',
            'Fast Transactions',
            'EVM Compatible'
          ],
          gasPrice: '0.0001 ETH',
          status: 'active',
          supportedBy: ['base', 'farcaster']
        },
        {
          id: 'arbitrum',
          name: 'Arbitrum One',
          symbol: 'ETH',
          chainId: 42161,
          rpcUrl: 'https://arb1.arbitrum.io/rpc',
          blockExplorer: 'https://arbiscan.io',
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
          },
          features: [
            'L2 Scaling',
            'Low Fees',
            'High Throughput',
            'EVM Compatible'
          ],
          gasPrice: '0.0001 ETH',
          status: 'active',
          supportedBy: ['base', 'farcaster']
        },
        {
          id: 'polygon',
          name: 'Polygon',
          symbol: 'MATIC',
          chainId: 137,
          rpcUrl: 'https://polygon-rpc.com',
          blockExplorer: 'https://polygonscan.com',
          nativeCurrency: {
            name: 'Polygon',
            symbol: 'MATIC',
            decimals: 18
          },
          features: [
            'Low Fees',
            'Fast Transactions',
            'EVM Compatible',
            'High Adoption'
          ],
          gasPrice: '0.01 MATIC',
          status: 'active',
          supportedBy: ['base', 'farcaster']
        },
        {
          id: 'zora',
          name: 'Zora Network',
          symbol: 'ETH',
          chainId: 7777777,
          rpcUrl: 'https://rpc.zora.energy',
          blockExplorer: 'https://explorer.zora.energy',
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
          },
          features: [
            'NFT Focused',
            'Creator Economy',
            'Low Fees',
            'Fast Transactions'
          ],
          gasPrice: '0.0001 ETH',
          status: 'beta',
          supportedBy: ['base', 'farcaster']
        },
        {
          id: 'bnb',
          name: 'BNB Smart Chain',
          symbol: 'BNB',
          chainId: 56,
          rpcUrl: 'https://bsc-dataseed.binance.org',
          blockExplorer: 'https://bscscan.com',
          nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18
          },
          features: [
            'Low Fees',
            'Fast Transactions',
            'EVM Compatible',
            'High Throughput'
          ],
          gasPrice: '0.0005 BNB',
          status: 'active',
          supportedBy: ['base', 'farcaster']
        },
        {
          id: 'avalanche',
          name: 'Avalanche C-Chain',
          symbol: 'AVAX',
          chainId: 43114,
          rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
          blockExplorer: 'https://snowtrace.io',
          nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18
          },
          features: [
            'High Performance',
            'Low Fees',
            'Fast Finality',
            'EVM Compatible'
          ],
          gasPrice: '0.001 AVAX',
          status: 'active',
          supportedBy: ['base', 'farcaster']
        }
      ];

      setChains(supportedChains);
      calculateSupport(supportedChains);
      
    } catch (error) {
      console.error('Error loading chain support:', error);
      toast.error('Error cargando soporte de cadenas');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateSupport = (chains: ChainInfo[]) => {
    const totalChains = chains.length;
    const activeChains = chains.filter(c => c.status === 'active').length;
    const betaChains = chains.filter(c => c.status === 'beta').length;
    const deprecatedChains = chains.filter(c => c.status === 'deprecated').length;
    const baseAppChains = chains.filter(c => c.supportedBy.includes('base')).length;
    const farcasterChains = chains.filter(c => c.supportedBy.includes('farcaster')).length;

    setSupport({
      totalChains,
      activeChains,
      betaChains,
      deprecatedChains,
      baseAppChains,
      farcasterChains
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'beta': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'deprecated': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const openBlockExplorer = (chain: ChainInfo) => {
    window.open(chain.blockExplorer, '_blank');
  };

  const refreshSupport = () => {
    loadChainSupport();
    toast.success('Soporte de cadenas actualizado');
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="ml-2">Cargando soporte de cadenas...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Resumen de Soporte */}
      {support && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Network className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Cadenas</p>
                  <p className="text-2xl font-bold">{support.totalChains}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Activas</p>
                  <p className="text-2xl font-bold">{support.activeChains}</p>
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
                  <p className="text-sm text-muted-foreground">Beta</p>
                  <p className="text-2xl font-bold">{support.betaChains}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Base App</p>
                  <p className="text-2xl font-bold">{support.baseAppChains}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Lista de Cadenas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Cadenas Soportadas</CardTitle>
              <CardDescription>
                Redes blockchain compatibles con Base App y Farcaster
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={refreshSupport}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chains.map((chain) => (
              <Card 
                key={chain.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedChain(chain)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {chain.symbol.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium">{chain.name}</h3>
                        <p className="text-sm text-muted-foreground">Chain ID: {chain.chainId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(chain.status)}
                      <Badge className={getStatusColor(chain.status)}>
                        {chain.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Gas Price:</span>
                      <span className="font-medium">{chain.gasPrice}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Soportado por:</span>
                      <div className="flex gap-1">
                        {chain.supportedBy.map((client) => (
                          <Badge key={client} variant="outline" className="text-xs">
                            {client === 'base' ? 'Base App' : 'Farcaster'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        openBlockExplorer(chain);
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Explorer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detalle de Cadena Seleccionada */}
      {selectedChain && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedChain.symbol.charAt(0)}
                </div>
                <div>
                  <CardTitle>{selectedChain.name}</CardTitle>
                  <CardDescription>
                    Chain ID: {selectedChain.chainId} • {selectedChain.symbol}
                  </CardDescription>
                </div>
              </div>
              <Badge className={getStatusColor(selectedChain.status)}>
                {selectedChain.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium">RPC URL:</span>
                <p className="text-sm text-muted-foreground break-all">{selectedChain.rpcUrl}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Block Explorer:</span>
                <p className="text-sm text-muted-foreground break-all">{selectedChain.blockExplorer}</p>
              </div>
              <div>
                <span className="text-sm font-medium">Native Currency:</span>
                <p className="text-sm text-muted-foreground">
                  {selectedChain.nativeCurrency.name} ({selectedChain.nativeCurrency.symbol})
                </p>
              </div>
              <div>
                <span className="text-sm font-medium">Decimals:</span>
                <p className="text-sm text-muted-foreground">{selectedChain.nativeCurrency.decimals}</p>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium">Características:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedChain.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm font-medium">Soportado por:</span>
              <div className="flex gap-2 mt-2">
                {selectedChain.supportedBy.map((client) => (
                  <Badge key={client} variant="default" className="text-xs">
                    {client === 'base' ? 'Base App' : 'Farcaster'}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => openBlockExplorer(selectedChain)}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir Explorer
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigator.clipboard.writeText(selectedChain.rpcUrl)}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Copiar RPC
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
