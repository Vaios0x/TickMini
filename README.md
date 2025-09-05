# 🎫 TickBase - Revolutionary NFT Ticketing Platform

<div align="center">

**The Future of Event Ticketing is Here** 🚀

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Base Network](https://img.shields.io/badge/Base%20Network-L2%20Ethereum-blue?style=for-the-badge&logo=ethereum)](https://base.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.19-363636?style=for-the-badge&logo=solidity)](https://soliditylang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

</div>

---

## 🌟 **The Story Behind TickBase**

Imagine a world where event tickets are more than just pieces of paper or digital receipts. **TickBase** transforms the traditional ticketing industry by leveraging the power of **NFTs on Base Network** - creating a decentralized, secure, and infinitely scalable platform for event management.

### 🎭 **The Problem We Solve**

- **Fraud Prevention**: Eliminate counterfeit tickets with blockchain verification
- **Secondary Market**: Enable secure peer-to-peer ticket trading
- **Global Access**: Remove geographical barriers with decentralized infrastructure
- **Cost Efficiency**: Reduce fees by 100x compared to traditional platforms
- **Instant Settlement**: Real-time transactions with Base Network's L2 speed

### 🚀 **Our Vision**

To become the **leading NFT ticketing platform** that bridges the gap between traditional events and Web3 technology, making blockchain ticketing accessible to everyone while maintaining the highest standards of security and user experience.

---

## ✨ **Key Features**

### 🎫 **NFT Ticketing System**
- **Unique Digital Assets**: Each ticket is a verifiable NFT with rich metadata
- **Immutable Ownership**: Blockchain-based ownership records
- **Anti-Fraud Protection**: Cryptographic verification prevents counterfeiting
- **Royalty System**: Built-in EIP-2981 royalty support for creators

### 🏪 **Decentralized Marketplace**
- **Secondary Trading**: Buy and sell tickets peer-to-peer
- **Dynamic Pricing**: Market-driven ticket pricing
- **Secure Escrow**: Smart contract-based transaction security
- **Platform Fees**: Transparent 2.5% marketplace fee structure

### ⚡ **Base Network Integration**
- **Lightning Fast**: Sub-second transaction confirmations
- **Ultra Low Cost**: 100x cheaper than Ethereum mainnet
- **Ethereum Security**: Inherits security from Ethereum L1
- **Developer Friendly**: Full EVM compatibility

### 🎨 **Modern User Experience**
- **Responsive Design**: Optimized for all devices
- **Progressive Web App**: Install as native app
- **Dark/Light Themes**: Customizable user interface
- **Advanced Search**: AI-powered event discovery
- **Real-time Updates**: Live event and ticket status

---

## 🏗️ **Technical Architecture**

### **Frontend Stack**
<div align="center">

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js) | 14.2.0 | React Framework with App Router |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue?style=flat-square&logo=typescript) | 5.3.3 | Type Safety & Developer Experience |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4+-38B2AC?style=flat-square&logo=tailwind-css) | 3.4.0 | Utility-first CSS Framework |
| ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.23+-black?style=flat-square&logo=framer) | 12.23.12 | Animation Library |
| ![Radix UI](https://img.shields.io/badge/Radix%20UI-Latest-161618?style=flat-square&logo=radix-ui) | Latest | Accessible UI Components |

</div>

### **Web3 Stack**
<div align="center">

| Technology | Purpose |
|------------|---------|
| ![Base Network](https://img.shields.io/badge/Base%20Network-L2%20Ethereum-blue?style=flat-square&logo=ethereum) | Layer 2 Blockchain |
| ![Solidity](https://img.shields.io/badge/Solidity-0.8.19-363636?style=flat-square&logo=solidity) | Smart Contract Language |
| ![Viem](https://img.shields.io/badge/Viem-2.37+-blue?style=flat-square&logo=ethereum) | TypeScript Ethereum Library |
| ![Wagmi](https://img.shields.io/badge/Wagmi-2.16+-blue?style=flat-square&logo=ethereum) | React Hooks for Ethereum |
| ![Reown AppKit](https://img.shields.io/badge/Reown%20AppKit-1.8+-blue?style=flat-square&logo=walletconnect) | Wallet Connection |

</div>

### **Backend & Database**
<div align="center">

| Technology | Purpose |
|------------|---------|
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-316192?style=flat-square&logo=postgresql) | Primary Database |
| ![Prisma](https://img.shields.io/badge/Prisma-5.0+-2D3748?style=flat-square&logo=prisma) | Database ORM |
| ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24+-black?style=flat-square&logo=next.js) | Authentication |
| ![Next.js API](https://img.shields.io/badge/Next.js%20API-Routes-black?style=flat-square&logo=next.js) | Serverless API |

</div>

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- PostgreSQL 15+
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/your-username/tickbase-nft-marketplace.git
cd tickbase-nft-marketplace

# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
```

### **Environment Configuration**

```env
# Base Network Configuration
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_EXPLORER=https://basescan.org

# Smart Contract Addresses
NEXT_PUBLIC_TICKET_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS=0x...

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tickbase"

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# WalletConnect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-project-id

# IPFS (Optional)
PINATA_JWT=your-pinata-jwt-token
PINATA_GATEWAY=https://gateway.pinata.cloud/ipfs/
```

### **Database Setup**

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed database
npx prisma db seed
```

### **Smart Contracts Deployment**

```bash
# Compile contracts
npx hardhat compile

# Deploy to Base Sepolia (testnet)
npx hardhat run scripts/deploy-all.js --network baseSepolia

# Deploy to Base Mainnet
npx hardhat run scripts/deploy-all.js --network base
```

### **Start Development Server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📁 **Project Structure**

```
tickbase-nft-marketplace/
├── 📁 contracts/                 # Smart Contracts
│   ├── 🎫 TicketNFT.sol         # Main ERC-721 NFT Contract
│   ├── 🏪 TicketMarketplace.sol # Secondary Marketplace
│   ├── 🏭 TicketFactory.sol     # Event & Ticket Factory
│   └── ✅ TicketValidator.sol   # Ticket Validation System
├── 📁 src/
│   ├── 📁 app/                  # Next.js App Router
│   │   ├── 📁 api/              # API Routes
│   │   ├── 📁 create-event/     # Event Creation
│   │   ├── 📁 events/           # Event Listing
│   │   ├── 📁 marketplace/      # Secondary Market
│   │   ├── 📁 my-tickets/       # User Tickets
│   │   └── 📁 validation/       # Ticket Validation
│   ├── 📁 components/           # React Components
│   │   ├── 📁 ui/               # Base UI Components
│   │   ├── 📁 modals/           # Modal Components
│   │   ├── 📁 sections/         # Page Sections
│   │   └── 📁 layout/           # Layout Components
│   ├── 📁 hooks/                # Custom React Hooks
│   ├── 📁 lib/                  # Utilities & Config
│   │   ├── 📁 contracts/        # Contract ABIs & Configs
│   │   └── 📁 utils/            # Helper Functions
│   └── 📁 types/                # TypeScript Definitions
├── 📁 scripts/                  # Deployment Scripts
├── 📁 prisma/                   # Database Schema
└── 📁 public/                   # Static Assets
```

---

## 🎯 **Smart Contracts Overview**

### **TicketNFT.sol** 🎫
- **ERC-721 Standard**: Full NFT implementation with metadata
- **Event Management**: Create and manage events on-chain
- **Ticket Minting**: Batch and individual ticket creation
- **Royalty System**: EIP-2981 compliant royalties (2.5%)
- **Validator System**: Authorized ticket validation

### **TicketMarketplace.sol** 🏪
- **Secondary Trading**: Peer-to-peer ticket marketplace
- **Escrow System**: Secure transaction handling
- **Dynamic Pricing**: Market-driven price discovery
- **Fee Management**: Configurable platform fees
- **Expiration System**: Time-limited listings

### **TicketFactory.sol** 🏭
- **Event Creation**: Comprehensive event management
- **Ticket Types**: Multiple ticket categories per event
- **Batch Operations**: Efficient bulk ticket minting
- **Organizer Tools**: Event management utilities
- **Statistics**: Global platform metrics

### **TicketValidator.sol** ✅
- **QR Code Verification**: Mobile-friendly validation
- **Anti-Fraud**: Cryptographic ticket verification
- **Usage Tracking**: Prevent double-spending
- **Event Integration**: Real-time validation status

---

## 🛠️ **Available Scripts**

### **Development**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### **Smart Contracts**
```bash
npm run compile      # Compile contracts
npm run deploy:local # Deploy to local network
npm run deploy:baseSepolia # Deploy to Base Sepolia
npm run test:contracts # Run contract tests
```

### **Database**
```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma studio    # Open database GUI
```

---

## 🌐 **Deployment**

### **Frontend (Vercel)**
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### **Smart Contracts**
```bash
# Deploy to Base Sepolia (testnet)
npx hardhat run scripts/deploy-all.js --network baseSepolia

# Deploy to Base Mainnet
npx hardhat run scripts/deploy-all.js --network base
```

### **Database (Supabase/Neon)**
1. Create a PostgreSQL database
2. Update `DATABASE_URL` in environment variables
3. Run migrations: `npx prisma db push`

---

## 🔒 **Security Features**

### **Smart Contract Security**
- ✅ **OpenZeppelin Standards**: Battle-tested security patterns
- ✅ **Reentrancy Protection**: Prevents reentrancy attacks
- ✅ **Access Control**: Role-based permissions
- ✅ **Input Validation**: Comprehensive parameter checking
- ✅ **Pausable Contracts**: Emergency stop functionality

### **Application Security**
- ✅ **Input Sanitization**: XSS and injection prevention
- ✅ **Rate Limiting**: API abuse protection
- ✅ **CORS Configuration**: Secure cross-origin requests
- ✅ **JWT Authentication**: Secure session management
- ✅ **Environment Variables**: Sensitive data protection

---

## 📱 **Progressive Web App Features**

- **Offline Support**: Core functionality without internet
- **Install Prompt**: Native app-like installation
- **Push Notifications**: Real-time event updates
- **Background Sync**: Automatic data synchronization
- **Responsive Design**: Optimized for all screen sizes

---

## 🧪 **Testing**

### **Smart Contract Testing**
```bash
# Run all contract tests
npx hardhat test

# Run specific test file
npx hardhat test test/TicketNFT.test.js

# Run with coverage
npx hardhat coverage
```

### **Frontend Testing**
```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

---

## 🤝 **Contributing**

We welcome contributions from the community! Here's how you can help:

### **Ways to Contribute**
- 🐛 **Bug Reports**: Found a bug? Let us know!
- 💡 **Feature Requests**: Have an idea? We'd love to hear it!
- 🔧 **Code Contributions**: Submit pull requests
- 📚 **Documentation**: Help improve our docs
- 🎨 **Design**: Contribute to UI/UX improvements

### **Development Workflow**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### **Code Standards**
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write comprehensive tests for new features
- Update documentation for API changes

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 **Support & Community**

### **Get Help**
- 📖 **Documentation**: [docs.tickbase.xyz](https://docs.tickbase.xyz)
- 💬 **Discord Community**: [discord.gg/tickbase](https://discord.gg/tickbase)
- 📧 **Email Support**: support@tickbase.xyz
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-username/tickbase-nft-marketplace/issues)

### **Stay Updated**
- 🐦 **Twitter**: [@TickBaseApp](https://twitter.com/TickBaseApp)
- 📺 **YouTube**: [TickBase Channel](https://youtube.com/@tickbase)
- 📰 **Blog**: [blog.tickbase.xyz](https://blog.tickbase.xyz)

---

## 🙏 **Acknowledgments**

### **Core Technologies**
- **Base Network** - For providing the perfect L2 infrastructure
- **Vercel** - For seamless deployment and hosting
- **Next.js Team** - For the amazing React framework
- **OpenZeppelin** - For secure smart contract standards

### **Community**
- **Web3 Developers** - For continuous innovation and support
- **Base Ecosystem** - For building the future of blockchain
- **Open Source Community** - For making this project possible

---

## 🚀 **Roadmap**

### **Phase 1: Foundation** ✅
- [x] Core NFT ticketing system
- [x] Base Network integration
- [x] Basic marketplace functionality
- [x] Mobile-responsive design

### **Phase 2: Enhancement** 🚧
- [ ] Advanced analytics dashboard
- [ ] Multi-chain support
- [ ] Mobile app (React Native)
- [ ] API for third-party integrations

### **Phase 3: Scale** 📋
- [ ] Enterprise features
- [ ] White-label solutions
- [ ] Advanced AI recommendations
- [ ] Global event partnerships

---

<div align="center">

**Built with ❤️ for the future of event ticketing**

[![Star on GitHub](https://img.shields.io/github/stars/your-username/tickbase-nft-marketplace?style=social)](https://github.com/your-username/tickbase-nft-marketplace)
[![Follow on Twitter](https://img.shields.io/twitter/follow/TickBaseApp?style=social)](https://twitter.com/TickBaseApp)

**⭐ Star this repository if you find it helpful!**

</div>
