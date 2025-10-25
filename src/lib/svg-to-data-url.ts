// Función para convertir SVG a data URL
export const createSVGDataURL = (svgString: string): string => {
  const encoded = encodeURIComponent(svgString)
  return `data:image/svg+xml;charset=utf-8,${encoded}`
}

// Función para generar SVG personalizado basado en categoría
export const generateEventSVG = (category: string): string => {
  const svgTemplates: Record<string, string> = {
    tech: `
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#1a1a2e"/>
        <g transform="translate(200, 150)">
          <ellipse cx="0" cy="0" rx="25" ry="60" fill="#ffffff" stroke="#00ffff" stroke-width="2"/>
          <circle cx="0" cy="-10" r="8" fill="#0080ff"/>
          <ellipse cx="0" cy="-50" rx="15" ry="20" fill="#ff4444"/>
          <ellipse cx="-20" cy="20" rx="8" ry="15" fill="#ff8800" transform="rotate(-30 -20 20)"/>
          <ellipse cx="20" cy="20" rx="8" ry="15" fill="#ff8800" transform="rotate(30 20 20)"/>
          <ellipse cx="-8" cy="50" rx="6" ry="20" fill="#ff6600" transform="rotate(-20 -8 50)"/>
          <ellipse cx="0" cy="55" rx="8" ry="25" fill="#ff4400"/>
          <ellipse cx="8" cy="50" rx="6" ry="20" fill="#ff6600" transform="rotate(20 8 50)"/>
        </g>
        <circle cx="50" cy="50" r="2" fill="#ffff00"/>
        <circle cx="350" cy="80" r="1.5" fill="#ffff00"/>
        <circle cx="80" cy="250" r="1" fill="#ffff00"/>
        <circle cx="320" cy="220" r="2.5" fill="#ffff00"/>
      </svg>
    `,
    music: `
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#1a1a2e"/>
        <g transform="translate(200, 150)">
          <rect x="-30" y="-40" width="60" height="50" rx="10" fill="#ffffff" stroke="#00ffff" stroke-width="2"/>
          <rect x="-15" y="-25" width="8" height="12" fill="#0080ff"/>
          <rect x="7" y="-25" width="8" height="12" fill="#0080ff"/>
          <line x1="0" y1="-40" x2="0" y2="-60" stroke="#ff00ff" stroke-width="3"/>
          <circle cx="0" cy="-60" r="3" fill="#ffff00"/>
          <line x1="-20" y1="-35" x2="-35" y2="-50" stroke="#ff00ff" stroke-width="2"/>
          <line x1="20" y1="-35" x2="35" y2="-50" stroke="#ff00ff" stroke-width="2"/>
          <circle cx="-35" cy="-50" r="2" fill="#ff00ff"/>
          <circle cx="35" cy="-50" r="2" fill="#ff00ff"/>
        </g>
        <g transform="translate(100, 100)">
          <circle cx="0" cy="0" r="8" fill="#ff00ff"/>
          <rect x="6" y="0" width="3" height="30" fill="#ff00ff"/>
          <path d="M 9 30 Q 20 25 30 30" stroke="#ff00ff" stroke-width="3" fill="none"/>
        </g>
      </svg>
    `,
    art: `
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#1a1a2e"/>
        <g transform="translate(200, 150)">
          <g transform="translate(-40, 0)">
            <ellipse cx="0" cy="0" rx="25" ry="30" fill="#0080ff" stroke="#00ffff" stroke-width="2"/>
            <ellipse cx="-8" cy="-5" rx="3" ry="4" fill="#ffffff"/>
            <ellipse cx="8" cy="-5" rx="3" ry="4" fill="#ffffff"/>
            <path d="M -10 5 Q 0 15 10 5" stroke="#ffffff" stroke-width="2" fill="none"/>
          </g>
          <g transform="translate(40, 0)">
            <ellipse cx="0" cy="0" rx="25" ry="30" fill="#ff8800" stroke="#ffff00" stroke-width="2"/>
            <ellipse cx="-8" cy="-5" rx="3" ry="4" fill="#ffffff"/>
            <ellipse cx="8" cy="-5" rx="3" ry="4" fill="#ffffff"/>
            <path d="M -10 5 Q 0 -5 10 5" stroke="#ffffff" stroke-width="2" fill="none"/>
          </g>
        </g>
        <g transform="translate(100, 200)">
          <ellipse cx="0" cy="0" rx="20" ry="15" fill="#ffffff" stroke="#ff00ff" stroke-width="2"/>
          <circle cx="-8" cy="-5" r="3" fill="#ff0000"/>
          <circle cx="8" cy="-5" r="3" fill="#00ff00"/>
          <circle cx="0" cy="5" r="3" fill="#0000ff"/>
        </g>
      </svg>
    `,
    business: `
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#1a1a2e"/>
        <g transform="translate(200, 150)">
          <rect x="-40" y="-30" width="80" height="60" fill="#ffffff" stroke="#00ffff" stroke-width="2"/>
          <rect x="-35" y="-25" width="15" height="15" fill="#0080ff"/>
          <rect x="-15" y="-25" width="15" height="15" fill="#0080ff"/>
          <rect x="5" y="-25" width="15" height="15" fill="#0080ff"/>
          <rect x="25" y="-25" width="15" height="15" fill="#0080ff"/>
          <rect x="-35" y="-5" width="15" height="15" fill="#0080ff"/>
          <rect x="-15" y="-5" width="15" height="15" fill="#0080ff"/>
          <rect x="5" y="-5" width="15" height="15" fill="#0080ff"/>
          <rect x="25" y="-5" width="15" height="15" fill="#0080ff"/>
        </g>
        <g transform="translate(100, 100)">
          <rect x="0" y="20" width="10" height="30" fill="#00ff00"/>
          <rect x="15" y="10" width="10" height="40" fill="#ff0000"/>
          <rect x="30" y="5" width="10" height="45" fill="#0000ff"/>
        </g>
      </svg>
    `,
    gaming: `
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#1a1a2e"/>
        <g transform="translate(200, 150)">
          <ellipse cx="0" cy="0" rx="40" ry="25" fill="#ffffff" stroke="#00ffff" stroke-width="2"/>
          <circle cx="-15" cy="-8" r="8" fill="#ff0000"/>
          <circle cx="15" cy="-8" r="8" fill="#00ff00"/>
          <circle cx="-15" cy="8" r="8" fill="#0000ff"/>
          <circle cx="15" cy="8" r="8" fill="#ffff00"/>
        </g>
        <g transform="translate(100, 100)">
          <rect x="0" y="0" width="10" height="10" fill="#ff0000"/>
          <rect x="10" y="0" width="10" height="10" fill="#00ff00"/>
          <rect x="20" y="0" width="10" height="10" fill="#0000ff"/>
          <rect x="0" y="10" width="10" height="10" fill="#ffff00"/>
          <rect x="10" y="10" width="10" height="10" fill="#ff00ff"/>
          <rect x="20" y="10" width="10" height="10" fill="#00ffff"/>
        </g>
      </svg>
    `,
    food: `
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#1a1a2e"/>
        <g transform="translate(200, 150)">
          <circle cx="0" cy="0" r="40" fill="#ffaa00" stroke="#ff6600" stroke-width="3"/>
          <circle cx="-15" cy="-10" r="5" fill="#ff0000"/>
          <circle cx="15" cy="-10" r="5" fill="#ff0000"/>
          <circle cx="0" cy="10" r="5" fill="#ff0000"/>
          <circle cx="-20" cy="5" r="3" fill="#00ff00"/>
          <circle cx="20" cy="5" r="3" fill="#00ff00"/>
        </g>
        <g transform="translate(100, 200)">
          <rect x="0" y="0" width="3" height="20" fill="#ffffff"/>
          <rect x="10" y="0" width="3" height="20" fill="#ffffff"/>
          <rect x="10" y="15" width="15" height="3" fill="#ffffff"/>
        </g>
      </svg>
    `,
    sports: `
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#1a1a2e"/>
        <g transform="translate(200, 150)">
          <circle cx="0" cy="0" r="30" fill="#ffffff" stroke="#000000" stroke-width="2"/>
          <path d="M -30 0 Q 0 -20 30 0 Q 0 20 -30 0" stroke="#000000" stroke-width="2" fill="none"/>
          <path d="M 0 -30 Q 20 0 0 30 Q -20 0 0 -30" stroke="#000000" stroke-width="2" fill="none"/>
        </g>
        <g transform="translate(100, 100)">
          <rect x="0" y="0" width="80" height="40" fill="#00ff00" stroke="#ffffff" stroke-width="2"/>
          <line x1="40" y1="0" x2="40" y2="40" stroke="#ffffff" stroke-width="2"/>
          <circle cx="40" cy="20" r="8" fill="none" stroke="#ffffff" stroke-width="2"/>
        </g>
      </svg>
    `,
    education: `
      <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#1a1a2e"/>
        <g transform="translate(200, 150)">
          <rect x="-30" y="-20" width="60" height="40" fill="#ffffff" stroke="#00ffff" stroke-width="2"/>
          <line x1="0" y1="-20" x2="0" y2="20" stroke="#00ffff" stroke-width="2"/>
          <line x1="-30" y1="-5" x2="30" y2="-5" stroke="#0080ff" stroke-width="1"/>
          <line x1="-30" y1="5" x2="30" y2="5" stroke="#0080ff" stroke-width="1"/>
          <line x1="-30" y1="15" x2="30" y2="15" stroke="#0080ff" stroke-width="1"/>
        </g>
        <g transform="translate(100, 100)">
          <rect x="0" y="0" width="4" height="30" fill="#ffff00"/>
          <polygon points="0,0 4,0 2,-8" fill="#ff0000"/>
        </g>
      </svg>
    `
  }
  
  return svgTemplates[category] || svgTemplates.tech
}

// Función para obtener la URL de datos del SVG
export const getEventSVGDataURL = (category: string): string => {
  const svgString = generateEventSVG(category)
  return createSVGDataURL(svgString)
}
