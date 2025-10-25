// Iconos personalizados para eventos basados en categoría
// Estos son componentes SVG que se pueden usar como imágenes

export const TechEventIcon = () => (
  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fondo */}
    <rect width="400" height="300" fill="#1a1a2e"/>
    
    {/* Cohete */}
    <g transform="translate(200, 150)">
      {/* Cuerpo del cohete */}
      <ellipse cx="0" cy="0" rx="25" ry="60" fill="#ffffff" stroke="#00ffff" strokeWidth="2"/>
      
      {/* Ventana */}
      <circle cx="0" cy="-10" r="8" fill="#0080ff"/>
      
      {/* Nariz */}
      <ellipse cx="0" cy="-50" rx="15" ry="20" fill="#ff4444"/>
      
      {/* Aletas */}
      <ellipse cx="-20" cy="20" rx="8" ry="15" fill="#ff8800" transform="rotate(-30 -20 20)"/>
      <ellipse cx="20" cy="20" rx="8" ry="15" fill="#ff8800" transform="rotate(30 20 20)"/>
      
      {/* Llamas */}
      <ellipse cx="-8" cy="50" rx="6" ry="20" fill="#ff6600" transform="rotate(-20 -8 50)"/>
      <ellipse cx="0" cy="55" rx="8" ry="25" fill="#ff4400"/>
      <ellipse cx="8" cy="50" rx="6" ry="20" fill="#ff6600" transform="rotate(20 8 50)"/>
    </g>
    
    {/* Estrellas de fondo */}
    <circle cx="50" cy="50" r="2" fill="#ffff00"/>
    <circle cx="350" cy="80" r="1.5" fill="#ffff00"/>
    <circle cx="80" cy="250" r="1" fill="#ffff00"/>
    <circle cx="320" cy="220" r="2.5" fill="#ffff00"/>
  </svg>
)

export const MusicEventIcon = () => (
  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fondo */}
    <rect width="400" height="300" fill="#1a1a2e"/>
    
    {/* Robot */}
    <g transform="translate(200, 150)">
      {/* Cabeza del robot */}
      <rect x="-30" y="-40" width="60" height="50" rx="10" fill="#ffffff" stroke="#00ffff" strokeWidth="2"/>
      
      {/* Ojos */}
      <rect x="-15" y="-25" width="8" height="12" fill="#0080ff"/>
      <rect x="7" y="-25" width="8" height="12" fill="#0080ff"/>
      
      {/* Antena */}
      <line x1="0" y1="-40" x2="0" y2="-60" stroke="#ff00ff" strokeWidth="3"/>
      <circle cx="0" cy="-60" r="3" fill="#ffff00"/>
      
      {/* Antenas laterales */}
      <line x1="-20" y1="-35" x2="-35" y2="-50" stroke="#ff00ff" strokeWidth="2"/>
      <line x1="20" y1="-35" x2="35" y2="-50" stroke="#ff00ff" strokeWidth="2"/>
      <circle cx="-35" cy="-50" r="2" fill="#ff00ff"/>
      <circle cx="35" cy="-50" r="2" fill="#ff00ff"/>
    </g>
    
    {/* Notas musicales */}
    <g transform="translate(100, 100)">
      <circle cx="0" cy="0" r="8" fill="#ff00ff"/>
      <rect x="6" y="0" width="3" height="30" fill="#ff00ff"/>
      <path d="M 9 30 Q 20 25 30 30" stroke="#ff00ff" strokeWidth="3" fill="none"/>
    </g>
  </svg>
)

export const ArtEventIcon = () => (
  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fondo */}
    <rect width="400" height="300" fill="#1a1a2e"/>
    
    {/* Máscaras teatrales */}
    <g transform="translate(200, 150)">
      {/* Máscara feliz */}
      <g transform="translate(-40, 0)">
        <ellipse cx="0" cy="0" rx="25" ry="30" fill="#0080ff" stroke="#00ffff" strokeWidth="2"/>
        <ellipse cx="-8" cy="-5" rx="3" ry="4" fill="#ffffff"/>
        <ellipse cx="8" cy="-5" rx="3" ry="4" fill="#ffffff"/>
        <path d="M -10 5 Q 0 15 10 5" stroke="#ffffff" strokeWidth="2" fill="none"/>
      </g>
      
      {/* Máscara triste */}
      <g transform="translate(40, 0)">
        <ellipse cx="0" cy="0" rx="25" ry="30" fill="#ff8800" stroke="#ffff00" strokeWidth="2"/>
        <ellipse cx="-8" cy="-5" rx="3" ry="4" fill="#ffffff"/>
        <ellipse cx="8" cy="-5" rx="3" ry="4" fill="#ffffff"/>
        <path d="M -10 5 Q 0 -5 10 5" stroke="#ffffff" strokeWidth="2" fill="none"/>
      </g>
    </g>
    
    {/* Paleta de colores */}
    <g transform="translate(100, 200)">
      <ellipse cx="0" cy="0" rx="20" ry="15" fill="#ffffff" stroke="#ff00ff" strokeWidth="2"/>
      <circle cx="-8" cy="-5" r="3" fill="#ff0000"/>
      <circle cx="8" cy="-5" r="3" fill="#00ff00"/>
      <circle cx="0" cy="5" r="3" fill="#0000ff"/>
    </g>
  </svg>
)

export const BusinessEventIcon = () => (
  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fondo */}
    <rect width="400" height="300" fill="#1a1a2e"/>
    
    {/* Edificio corporativo */}
    <g transform="translate(200, 150)">
      <rect x="-40" y="-30" width="80" height="60" fill="#ffffff" stroke="#00ffff" strokeWidth="2"/>
      <rect x="-35" y="-25" width="15" height="15" fill="#0080ff"/>
      <rect x="-15" y="-25" width="15" height="15" fill="#0080ff"/>
      <rect x="5" y="-25" width="15" height="15" fill="#0080ff"/>
      <rect x="25" y="-25" width="15" height="15" fill="#0080ff"/>
      <rect x="-35" y="-5" width="15" height="15" fill="#0080ff"/>
      <rect x="-15" y="-5" width="15" height="15" fill="#0080ff"/>
      <rect x="5" y="-5" width="15" height="15" fill="#0080ff"/>
      <rect x="25" y="-5" width="15" height="15" fill="#0080ff"/>
    </g>
    
    {/* Gráficos */}
    <g transform="translate(100, 100)">
      <rect x="0" y="20" width="10" height="30" fill="#00ff00"/>
      <rect x="15" y="10" width="10" height="40" fill="#ff0000"/>
      <rect x="30" y="5" width="10" height="45" fill="#0000ff"/>
    </g>
  </svg>
)

export const GamingEventIcon = () => (
  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fondo */}
    <rect width="400" height="300" fill="#1a1a2e"/>
    
    {/* Control de videojuego */}
    <g transform="translate(200, 150)">
      <ellipse cx="0" cy="0" rx="40" ry="25" fill="#ffffff" stroke="#00ffff" strokeWidth="2"/>
      <circle cx="-15" cy="-8" r="8" fill="#ff0000"/>
      <circle cx="15" cy="-8" r="8" fill="#00ff00"/>
      <circle cx="-15" cy="8" r="8" fill="#0000ff"/>
      <circle cx="15" cy="8" r="8" fill="#ffff00"/>
    </g>
    
    {/* Píxeles */}
    <g transform="translate(100, 100)">
      <rect x="0" y="0" width="10" height="10" fill="#ff0000"/>
      <rect x="10" y="0" width="10" height="10" fill="#00ff00"/>
      <rect x="20" y="0" width="10" height="10" fill="#0000ff"/>
      <rect x="0" y="10" width="10" height="10" fill="#ffff00"/>
      <rect x="10" y="10" width="10" height="10" fill="#ff00ff"/>
      <rect x="20" y="10" width="10" height="10" fill="#00ffff"/>
    </g>
  </svg>
)

export const FoodEventIcon = () => (
  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fondo */}
    <rect width="400" height="300" fill="#1a1a2e"/>
    
    {/* Pizza */}
    <g transform="translate(200, 150)">
      <circle cx="0" cy="0" r="40" fill="#ffaa00" stroke="#ff6600" strokeWidth="3"/>
      <circle cx="-15" cy="-10" r="5" fill="#ff0000"/>
      <circle cx="15" cy="-10" r="5" fill="#ff0000"/>
      <circle cx="0" cy="10" r="5" fill="#ff0000"/>
      <circle cx="-20" cy="5" r="3" fill="#00ff00"/>
      <circle cx="20" cy="5" r="3" fill="#00ff00"/>
    </g>
    
    {/* Cuchillo y tenedor */}
    <g transform="translate(100, 200)">
      <rect x="0" y="0" width="3" height="20" fill="#ffffff"/>
      <rect x="10" y="0" width="3" height="20" fill="#ffffff"/>
      <rect x="10" y="15" width="15" height="3" fill="#ffffff"/>
    </g>
  </svg>
)

export const SportsEventIcon = () => (
  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fondo */}
    <rect width="400" height="300" fill="#1a1a2e"/>
    
    {/* Pelota de fútbol */}
    <g transform="translate(200, 150)">
      <circle cx="0" cy="0" r="30" fill="#ffffff" stroke="#000000" strokeWidth="2"/>
      <path d="M -30 0 Q 0 -20 30 0 Q 0 20 -30 0" stroke="#000000" strokeWidth="2" fill="none"/>
      <path d="M 0 -30 Q 20 0 0 30 Q -20 0 0 -30" stroke="#000000" strokeWidth="2" fill="none"/>
    </g>
    
    {/* Cancha */}
    <g transform="translate(100, 100)">
      <rect x="0" y="0" width="80" height="40" fill="#00ff00" stroke="#ffffff" strokeWidth="2"/>
      <line x1="40" y1="0" x2="40" y2="40" stroke="#ffffff" strokeWidth="2"/>
      <circle cx="40" cy="20" r="8" fill="none" stroke="#ffffff" strokeWidth="2"/>
    </g>
  </svg>
)

export const EducationEventIcon = () => (
  <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fondo */}
    <rect width="400" height="300" fill="#1a1a2e"/>
    
    {/* Libro */}
    <g transform="translate(200, 150)">
      <rect x="-30" y="-20" width="60" height="40" fill="#ffffff" stroke="#00ffff" strokeWidth="2"/>
      <line x1="0" y1="-20" x2="0" y2="20" stroke="#00ffff" strokeWidth="2"/>
      <line x1="-30" y1="-5" x2="30" y2="-5" stroke="#0080ff" strokeWidth="1"/>
      <line x1="-30" y1="5" x2="30" y2="5" stroke="#0080ff" strokeWidth="1"/>
      <line x1="-30" y1="15" x2="30" y2="15" stroke="#0080ff" strokeWidth="1"/>
    </g>
    
    {/* Lápiz */}
    <g transform="translate(100, 100)">
      <rect x="0" y="0" width="4" height="30" fill="#ffff00"/>
      <polygon points="0,0 4,0 2,-8" fill="#ff0000"/>
    </g>
  </svg>
)

// Función para obtener el icono SVG basado en la categoría
export const getEventIcon = (category: string) => {
  const icons: Record<string, () => JSX.Element> = {
    tech: TechEventIcon,
    music: MusicEventIcon,
    art: ArtEventIcon,
    business: BusinessEventIcon,
    gaming: GamingEventIcon,
    food: FoodEventIcon,
    sports: SportsEventIcon,
    education: EducationEventIcon
  }
  
  return icons[category] || TechEventIcon
}
