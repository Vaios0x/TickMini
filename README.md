# TickBase - NFT Ticketing Marketplace

Una plataforma completa de venta y gestión de boletos NFT construida con Next.js 14+ y desplegada en Base Network.

## 🚀 Características

- **NFT Ticketing**: Sistema completo de tickets digitales con metadatos únicos
- **Marketplace Secundario**: Compra y venta de tickets NFT
- **Base Network**: Integración nativa con la blockchain Base (Layer 2 de Ethereum)
- **Wallet Integration**: Conexión de wallets usando Reown App Kit
- **PWA Ready**: Aplicación web progresiva con funcionalidades offline
- **Responsive Design**: Interfaz optimizada para móviles y desktop
- **Accesibilidad**: Cumple con estándares WCAG 2.1 AA
- **Tema Oscuro/Claro**: Soporte para múltiples temas
- **Animaciones**: Transiciones fluidas con Framer Motion

## 🏗️ Arquitectura Técnica

### Frontend
- **Framework**: Next.js 14+ con App Router
- **Styling**: Tailwind CSS + Shadcn/UI
- **State Management**: Zustand
- **Animaciones**: Framer Motion
- **UI Components**: Radix UI + Shadcn/UI
- **Forms**: React Hook Form + Zod validation

### Web3
- **Blockchain**: Base Network
- **Wallet Connection**: Reown App Kit
- **Smart Contracts**: Solidity (ERC-721)
- **Web3 Library**: Viem
- **IPFS**: Metadatos y imágenes de NFTs

### Backend
- **API Routes**: Next.js API Routes
- **Database**: PostgreSQL con Prisma ORM
- **Authentication**: NextAuth.js
- **File Upload**: Uploadthing
- **Email**: Nodemailer

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn
- PostgreSQL
- Wallet Web3 (MetaMask, WalletConnect, etc.)

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/tickbase-nft-marketplace.git
cd tickbase-nft-marketplace
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env.local
```

Editar `.env.local` con tus configuraciones:
```env
# Base Network Configuration
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_EXPLORER=https://basescan.org

# Smart Contract Addresses
NEXT_PUBLIC_TICKET_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=0x...

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tickbase"

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Reown App Kit
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-project-id

# IPFS Configuration
PINATA_JWT=your-pinata-jwt-token
PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

4. **Configurar base de datos**
```bash
# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:push

# Abrir Prisma Studio (opcional)
npm run db:studio
```

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Servidor de producción
npm run lint         # Linting del código

# Base de datos
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Sincronizar base de datos
npm run db:studio    # Abrir Prisma Studio

# Smart Contracts
npm run contract:compile  # Compilar contratos
npm run contract:deploy   # Desplegar contratos

# Testing
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── (auth)/            # Rutas de autenticación
│   ├── (dashboard)/       # Rutas del dashboard
│   ├── events/            # Gestión de eventos
│   ├── marketplace/       # Marketplace de tickets
│   ├── api/               # API Routes
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes UI base
│   ├── web3/             # Componentes Web3
│   ├── events/            # Componentes de eventos
│   ├── tickets/           # Componentes de tickets
│   ├── layout/            # Componentes de layout
│   └── sections/          # Secciones de página
├── lib/                   # Utilidades y configuraciones
│   ├── contracts/         # ABI y configs de contratos
│   ├── db/                # Configuración de base de datos
│   ├── utils/             # Funciones utilitarias
│   └── validations/       # Esquemas de validación
├── hooks/                 # Custom hooks
├── store/                 # Estado global (Zustand)
└── types/                 # Tipos TypeScript
```

## 🌐 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

### Otros Proveedores
- **Netlify**: Similar a Vercel
- **Railway**: Para backend y base de datos
- **PlanetScale**: Base de datos PostgreSQL
- **Supabase**: Backend como servicio

## 🔒 Seguridad

- **Smart Contracts**: Auditados y verificados
- **Validación**: Input validation en todas las rutas
- **Rate Limiting**: Protección contra ataques
- **CORS**: Configuración segura
- **JWT**: Tokens seguros para autenticación

## 📱 PWA Features

- **Offline Support**: Funcionalidad sin conexión
- **Install Prompt**: Instalación como app nativa
- **Push Notifications**: Notificaciones push
- **Background Sync**: Sincronización en segundo plano

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

- **Documentación**: [docs.tickbase.xyz](https://docs.tickbase.xyz)
- **Discord**: [discord.gg/tickbase](https://discord.gg/tickbase)
- **Email**: support@tickbase.xyz
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/tickbase-nft-marketplace/issues)

## 🙏 Agradecimientos

- **Base Network** por la infraestructura blockchain
- **Vercel** por Next.js y hosting
- **Shadcn** por los componentes UI
- **Reown** por la integración de wallets
- **Comunidad Web3** por el apoyo continuo

---

**¡Construido con ❤️ para la revolución del ticketing digital!**
