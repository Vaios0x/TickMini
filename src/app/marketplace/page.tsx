'use client'

import { motion } from 'framer-motion'
import { 
  ShoppingCart, 
  Filter, 
  Search, 
  Star, 
  Heart, 
  Eye,
  TrendingUp,
  Flame,
  Zap
} from 'lucide-react'
import './marketplace.css'

export default function MarketplacePage() {
  const featuredItems = [
    {
      id: 1,
      name: 'VIP Concert Pass',
      artist: 'Metallica',
      price: '0.5 ETH',
      image: '🎸',
      rarity: 'Legendary',
      trending: true
    },
    {
      id: 2,
      name: 'Sports Championship',
      team: 'Real Madrid',
      price: '0.3 ETH',
      image: '⚽',
      rarity: 'Epic',
      hot: true
    },
    {
      id: 3,
      name: 'Tech Conference',
      event: 'Web3 Summit',
      price: '0.1 ETH',
      image: '💻',
      rarity: 'Rare'
    }
  ]

  return (
    <div className="marketplace-container">
      {/* Hero Section */}
      <section className="marketplace-hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            <span className="title-gradient">NFT</span>
            <span className="title-neon">Marketplace</span>
          </h1>
          <p className="hero-description">
            Descubre, compra y vende tickets NFT únicos en el marketplace más avanzado de Base Network
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">1,247</span>
              <span className="stat-label">Tickets</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">89</span>
              <span className="stat-label">Eventos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">156</span>
              <span className="stat-label">Vendedores</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Search and Filters */}
      <section className="marketplace-search">
        <div className="search-container">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar tickets, eventos, artistas..."
              className="search-input"
            />
            <Filter className="filter-icon" />
          </div>
          
          <div className="filter-tabs">
            <button className="filter-tab active">
              <TrendingUp className="tab-icon" />
              Trending
            </button>
            <button className="filter-tab">
              <Flame className="tab-icon" />
              Hot
            </button>
            <button className="filter-tab">
              <Zap className="tab-icon" />
              New
            </button>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="featured-items">
        <div className="section-header">
          <h2>🎯 Destacados</h2>
          <p>Los tickets más populares del momento</p>
        </div>
        
        <div className="items-grid">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="marketplace-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {item.trending && (
                <div className="trending-badge">
                  <TrendingUp className="badge-icon" />
                  Trending
                </div>
              )}
              {item.hot && (
                <div className="hot-badge">
                  <Flame className="badge-icon" />
                  Hot
                </div>
              )}
              
              <div className="item-image">
                <span className="item-emoji">{item.image}</span>
              </div>
              
              <div className="item-content">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-details">
                  {item.artist || item.team || item.event}
                </p>
                <div className="item-rarity">
                  <span className={`rarity-badge ${item.rarity.toLowerCase()}`}>
                    {item.rarity}
                  </span>
                </div>
              </div>
              
              <div className="item-footer">
                <div className="item-price">
                  <span className="price-amount">{item.price}</span>
                </div>
                <div className="item-actions">
                  <button className="action-btn like-btn">
                    <Heart className="action-icon" />
                  </button>
                  <button className="action-btn view-btn">
                    <Eye className="action-icon" />
                  </button>
                  <button className="action-btn cart-btn">
                    <ShoppingCart className="action-icon" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="section-header">
          <h2>🎭 Categorías</h2>
          <p>Explora por tipo de evento</p>
        </div>
        
        <div className="categories-grid">
          {[
            { name: 'Conciertos', icon: '🎵', count: 156, color: '#ff6b6b' },
            { name: 'Deportes', icon: '⚽', count: 89, color: '#4ecdc4' },
            { name: 'Tecnología', icon: '💻', count: 67, color: '#45b7d1' },
            { name: 'Arte', icon: '🎨', count: 43, color: '#96ceb4' },
            { name: 'Gaming', icon: '🎮', count: 78, color: '#feca57' },
            { name: 'Educación', icon: '📚', count: 34, color: '#ff9ff3' }
          ].map((category, index) => (
            <motion.div
              key={category.name}
              className="category-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="category-icon" style={{ backgroundColor: category.color }}>
                <span className="category-emoji">{category.icon}</span>
              </div>
              <h3 className="category-name">{category.name}</h3>
              <span className="category-count">{category.count} tickets</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
