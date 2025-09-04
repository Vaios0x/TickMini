# TickBato Chatbot

Un chatbot inteligente y hermoso para TickBase con glassmorphism y efectos neurales.

## Características

### 🎨 Diseño
- **Glassmorphism**: Efectos de vidrio con blur y transparencias
- **Efectos Neurales**: Animaciones y partículas que simulan actividad neural
- **Responsive**: Adaptado para móviles y desktop
- **Tema Web3**: Colores neon y efectos que combinan con TickBase

### 🤖 Funcionalidad
- **Asistente Inteligente**: Responde preguntas sobre TickBase
- **Preguntas Frecuentes**: Sugerencias rápidas para usuarios nuevos
- **Interfaz Intuitiva**: Chat moderno con animaciones suaves
- **Minimizable**: Se puede minimizar para no interferir con la navegación

### 🎯 Capacidades
El chatbot puede ayudar con:
- Compra y venta de tickets NFT
- Creación de eventos
- Verificación de tickets
- Configuración de wallets
- Información sobre Base Network
- Problemas técnicos generales

## Uso

### Integración Básica
```tsx
import { TickBatoChatbot } from '@/components/chatbot'

function App() {
  return (
    <div>
      {/* Tu contenido */}
      <TickBatoChatbot />
    </div>
  )
}
```

### Personalización
```tsx
<TickBatoChatbot className="custom-chatbot" />
```

## Estructura de Archivos

```
src/components/chatbot/
├── tickbato-chatbot.tsx    # Componente principal
├── tickbato-chatbot.css    # Estilos con glassmorphism
├── index.ts               # Exportaciones
└── README.md              # Documentación
```

## Estilos CSS

### Clases Principales
- `.tickbato-chatbot` - Contenedor principal
- `.chatbot-toggle-btn` - Botón de apertura
- `.chatbot-window` - Ventana del chat
- `.chatbot-header` - Cabecera con avatar
- `.chatbot-messages` - Área de mensajes
- `.chatbot-input` - Área de entrada

### Efectos Visuales
- **Glassmorphism**: `backdrop-filter: blur()` y transparencias
- **Neon Glow**: Sombras con colores neon
- **Partículas**: Animaciones flotantes
- **Gradientes**: Transiciones de color suaves

## Responsive Design

### Breakpoints
- **Desktop**: 400px de ancho, 600px de alto
- **Tablet**: Adaptación automática
- **Mobile**: 100vw - 2rem, 100vh - 2rem

### Optimizaciones Móviles
- Botón más pequeño (60px vs 70px)
- Ventana fullscreen en móviles
- Grid de sugerencias en una columna
- Texto y espaciado optimizados

## Accesibilidad

### Características
- **ARIA Labels**: Etiquetas descriptivas
- **Keyboard Navigation**: Navegación con teclado
- **Focus Management**: Manejo del foco
- **Screen Reader**: Compatible con lectores de pantalla

### Modos de Accesibilidad
- **High Contrast**: Bordes más visibles
- **Reduced Motion**: Desactiva animaciones
- **Dark Mode**: Optimizado para modo oscuro

## Animaciones

### Efectos Principales
- **Float**: Movimiento flotante suave
- **Pulse**: Efectos de pulso
- **Gradient Shift**: Transiciones de gradiente
- **Typing Indicator**: Indicador de escritura
- **Particle Effects**: Partículas flotantes

### Performance
- **GPU Acceleration**: `transform3d()` para animaciones
- **Reduced Motion**: Respeta preferencias del usuario
- **Optimized Animations**: 60fps en dispositivos modernos

## Personalización

### Colores
```css
:root {
  --neon-cyan: #00ffff;
  --neon-magenta: #ff00ff;
  --neon-yellow: #ffff00;
  --neon-green: #00ff00;
}
```

### Tamaños
```css
.chatbot-toggle-btn {
  width: 70px;  /* Desktop */
  height: 70px;
}

@media (max-width: 768px) {
  .chatbot-toggle-btn {
    width: 60px;  /* Mobile */
    height: 60px;
  }
}
```

## Integración con TickBase

El chatbot está diseñado para integrarse perfectamente con:
- **Navbar**: No interfiere con la navegación
- **Modales**: Z-index apropiado (1000)
- **Tema**: Colores y efectos consistentes
- **Responsive**: Se adapta al diseño existente

## Futuras Mejoras

### Funcionalidades Planificadas
- [ ] Integración con API real
- [ ] Historial de conversaciones
- [ ] Soporte multiidioma
- [ ] Temas personalizables
- [ ] Notificaciones push
- [ ] Análisis de conversaciones

### Optimizaciones
- [ ] Lazy loading de mensajes
- [ ] Compresión de imágenes
- [ ] Cache de respuestas
- [ ] Offline support

## Contribución

Para contribuir al chatbot:
1. Mantén el estilo glassmorphism
2. Respeta la accesibilidad
3. Optimiza para móviles
4. Documenta los cambios
5. Prueba en diferentes dispositivos

## Licencia

Parte del proyecto TickBase - Todos los derechos reservados.
