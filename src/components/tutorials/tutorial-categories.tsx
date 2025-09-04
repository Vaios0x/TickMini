'use client'

interface Category {
  id: string
  name: string
  icon: string
  color: string
}

interface TutorialCategoriesProps {
  categories: Category[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
}

export function TutorialCategories({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: TutorialCategoriesProps) {
  return (
    <section className="tutorial-categories">
      <div className="categories-header">
        <h2 className="categories-title">Explorar por Categoría</h2>
        <p className="categories-description">
          Selecciona una categoría para filtrar los tutoriales según tus intereses
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
    fundamentals: 'Conceptos básicos de blockchain y Web3 para principiantes',
    wallets: 'Configuración y uso de wallets para gestionar activos digitales',
    'nft-basics': 'Introducción al mundo de los NFTs y su funcionamiento',
    'event-creation': 'Creación y gestión de eventos con tickets NFT',
    verification: 'Sistemas de verificación de tickets y autenticidad',
    security: 'Mejores prácticas de seguridad en el ecosistema Web3',
    integration: 'Integración de aplicaciones con redes blockchain',
    defi: 'Finanzas descentralizadas y oportunidades de yield farming'
  }
  
  return descriptions[categoryId] || 'Tutoriales especializados en esta categoría'
}
