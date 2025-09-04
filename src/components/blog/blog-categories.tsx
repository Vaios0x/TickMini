'use client'

interface Category {
  id: string
  name: string
  icon: string
  color: string
}

interface BlogCategoriesProps {
  categories: Category[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
}

export function BlogCategories({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: BlogCategoriesProps) {
  return (
    <section className="blog-categories">
      <div className="categories-header">
        <h2 className="categories-title">Explorar por Categoría</h2>
        <p className="categories-description">
          Filtra los artículos según tus intereses y encuentra contenido relevante
        </p>
      </div>
      
      <div className="categories-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.id)}
          >
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-name">{category.name}</h3>
          </button>
        ))}
      </div>
      
      {/* Información de la categoría seleccionada */}
      {selectedCategory !== 'all' && (
        <div className="category-description">
          <p className="description-text">
            {getCategoryDescription(selectedCategory)}
          </p>
        </div>
      )}
    </section>
  )
}

function getCategoryDescription(categoryId: string): string {
  const descriptions: Record<string, string> = {
    nft: 'Artículos sobre NFTs, colecciones digitales y el mercado del arte blockchain',
    defi: 'Análisis de finanzas descentralizadas, yield farming y protocolos DeFi',
    development: 'Tutoriales de desarrollo, smart contracts y integración Web3',
    events: 'Noticias sobre eventos NFT, conferencias y meetups del ecosistema',
    blockchain: 'Análisis técnico de blockchain, Layer 2 y soluciones de escalabilidad',
    governance: 'Artículos sobre DAOs, gobernanza descentralizada y participación comunitaria',
    metaverse: 'Exploración del metaverso, realidad virtual y el futuro digital'
  }
  
  return descriptions[categoryId] || 'Artículos especializados en esta categoría'
}
