'use client'

import { useState, useRef } from 'react'
import { EventFormData } from '@/app/create-event/page'

interface MultimediaStepProps {
  formData: EventFormData
  updateFormData: (data: Partial<EventFormData>) => void
  onNext: () => void
  onPrev: () => void
}

export function MultimediaStep({ formData, updateFormData, onNext, onPrev }: MultimediaStepProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const handleCoverImageChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Crear preview y convertir a URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setPreviewImage(imageUrl)
        updateFormData({ images: [imageUrl] })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryChange = (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'))
    
    if (imageFiles.length > 0) {
      // Crear previews y convertir a URLs
      imageFiles.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string
          setGalleryPreviews(prev => [...prev, imageUrl])
          updateFormData({ images: [...formData.images, imageUrl] })
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeGalleryImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index)
    const updatedPreviews = galleryPreviews.filter((_, i) => i !== index)
    
    updateFormData({ images: updatedImages })
    setGalleryPreviews(updatedPreviews)
  }

  const handleDrag = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleCoverImageChange(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    
    // La imagen de portada es opcional pero recomendada
    if (!formData.images || formData.images.length === 0) {
      const proceed = confirm('No has seleccionado una imagen de portada. ¿Deseas continuar de todas formas?')
      if (!proceed) return
    }
    
    onNext()
  }

  const isFormValid = true // Este paso es opcional

  return (
    <div style={{
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
             {/* Header del paso */}
       <div style={{
         textAlign: 'center',
         marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)'
       }}>
         <h2 style={{
           fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
           color: '#00ffff',
           marginBottom: 'clamp(0.8rem, 2vw, 1.2rem)',
           textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
           fontWeight: 'bold'
         }}>
           📸 Multimedia
         </h2>
         <p style={{
           fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
           color: '#b0b0b0',
           maxWidth: 'clamp(280px, 75vw, 500px)',
           margin: '0 auto'
         }}>
           Agrega imágenes y videos para hacer tu evento más atractivo
         </p>
       </div>

      <form onSubmit={handleSubmit} style={{
        maxWidth: 'clamp(700px, 95vw, 1000px)',
        margin: '0 auto',
        overflow: 'hidden',
        width: '100%'
      }}>
                 {/* Imagen de Portada */}
         <div style={{ 
           marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
           textAlign: 'center'
         }}>
          <label style={{
            display: 'block',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            color: '#ffffff',
            marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '500',
            textAlign: 'center'
          }}>
            🖼️ Imagen de Portada (Recomendado)
          </label>
          
                     <div
             onDragEnter={handleDrag}
             onDragLeave={handleDrag}
             onDragOver={handleDrag}
             onDrop={handleDrop}
             style={{
               border: dragActive 
                 ? '3px dashed #00ffff' 
                 : '3px dashed rgba(255, 255, 255, 0.3)',
               borderRadius: 'clamp(15px, 4vw, 20px)',
               padding: 'clamp(1.5rem, 3vw, 2rem)',
               textAlign: 'center',
               background: dragActive 
                 ? 'rgba(0, 255, 255, 0.1)' 
                 : 'rgba(255, 255, 255, 0.03)',
               transition: 'all 0.3s ease',
               cursor: 'pointer',
               position: 'relative',
               maxWidth: 'clamp(350px, 75vw, 500px)',
               margin: '0 auto',
               overflow: 'hidden'
             }}
             onClick={() => fileInputRef.current?.click()}
           >
            {previewImage ? (
              <div style={{ position: 'relative' }}>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    updateFormData({ images: [] })
                    setPreviewImage(null)
                  }}
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    background: 'rgba(255, 0, 0, 0.8)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div>
                <div style={{
                  fontSize: 'clamp(3rem, 8vw, 4rem)',
                  marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                  opacity: 0.7
                }}>
                  📸
                </div>
                <p style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                  color: '#b0b0b0',
                  marginBottom: 'clamp(0.4rem, 1vw, 0.5rem)'
                }}>
                  Arrastra y suelta tu imagen aquí
                </p>
                <p style={{
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                  color: '#888888'
                }}>
                  o haz clic para seleccionar
                </p>
                <p style={{
                  fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
                  color: '#666666',
                  marginTop: 'clamp(0.8rem, 2vw, 1rem)'
                }}>
                  Formatos: JPG, PNG, WebP • Máximo: 5MB
                </p>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleCoverImageChange(e.target.files[0])
              }
            }}
            style={{ display: 'none' }}
          />
        </div>

                 {/* Galería de Imágenes */}
         <div style={{ 
           marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
           textAlign: 'center'
         }}>
          <label style={{
            display: 'block',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            color: '#ffffff',
            marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '500',
            textAlign: 'center'
          }}>
            🖼️ Galería de Imágenes (Opcional)
          </label>
          
                     <div style={{
             border: '2px dashed rgba(255, 255, 255, 0.2)',
             borderRadius: 'clamp(12px, 3vw, 15px)',
             padding: 'clamp(1.2rem, 2.5vw, 1.5rem)',
             textAlign: 'center',
             background: 'rgba(255, 255, 255, 0.02)',
             cursor: 'pointer',
             transition: 'all 0.3s ease',
             maxWidth: 'clamp(350px, 75vw, 500px)',
             margin: '0 auto',
             overflow: 'hidden'
           }}
           onClick={() => galleryInputRef.current?.click()}>
            <div style={{
              fontSize: 'clamp(2.5rem, 6vw, 3rem)',
              marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
              opacity: 0.7
            }}>
              🎨
            </div>
            <p style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
              color: '#b0b0b0',
              marginBottom: 'clamp(0.4rem, 1vw, 0.5rem)'
            }}>
              Agregar más imágenes a la galería
            </p>
            <p style={{
              fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
              color: '#888888'
            }}>
              Máximo 10 imágenes • 5MB cada una
            </p>
          </div>
          
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                handleGalleryChange(e.target.files)
              }
            }}
            style={{ display: 'none' }}
          />

          {/* Preview de la galería */}
          {galleryPreviews.length > 0 && (
            <div style={{
              marginTop: '1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              {galleryPreviews.map((preview, index) => (
                <div key={index} style={{
                  position: 'relative',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={preview}
                    alt={`Gallery ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: 'rgba(255, 0, 0, 0.8)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '25px',
                      height: '25px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

                 {/* URL de Video */}
         <div style={{ 
           marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
           textAlign: 'center'
         }}>
          <label style={{
            display: 'block',
            fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
            color: '#ffffff',
            marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
            fontWeight: '500',
            textAlign: 'center'
          }}>
            🎥 URL de Video (Opcional)
          </label>
          
                     <div style={{
             width: '100%',
             maxWidth: 'clamp(350px, 75vw, 500px)',
             margin: '0 auto'
           }}>
            <input
              type="url"
              value={formData.videos?.[0] || ''}
              onChange={(e) => updateFormData({ videos: [e.target.value] })}
              placeholder="https://www.youtube.com/watch?v=... o https://vimeo.com/..."
              style={{
                width: '100%',
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.2rem, 3vw, 1.5rem)',
                fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'clamp(12px, 3vw, 15px)',
                color: '#ffffff',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                textAlign: 'center'
              }}
            />
            
            <p style={{
              fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
              color: '#888888',
              marginTop: 'clamp(0.4rem, 1vw, 0.5rem)',
              textAlign: 'center'
            }}>
              Soporta YouTube, Vimeo y otros servicios de video
            </p>
          </div>
        </div>

        {/* Botones de Navegación */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(1.5rem, 4vw, 2rem)',
          marginTop: 'clamp(2rem, 5vw, 3rem)',
          width: '100%'
        }}>
          <button
            type="button"
            onClick={onPrev}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              padding: 'clamp(1rem, 2.5vw, 1.2rem) clamp(2rem, 4vw, 2.5rem)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              fontWeight: '600',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 'clamp(25px, 6vw, 35px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(0.5rem, 1.5vw, 0.8rem)',
              width: 'clamp(250px, 70vw, 350px)',
              maxWidth: '100%'
            }}
          >
            ⬅️ Paso Anterior
          </button>

          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
              color: '#000000',
              padding: 'clamp(1rem, 2.5vw, 1.2rem) clamp(2rem, 4vw, 2.5rem)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: 'clamp(25px, 6vw, 35px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
              width: 'clamp(280px, 80vw, 400px)',
              maxWidth: '100%',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ⚙️ Configuración Final
          </button>
        </div>
      </form>

      {/* Información adicional */}
      <div style={{
        marginTop: 'clamp(2rem, 5vw, 3rem)',
        padding: 'clamp(1.5rem, 4vw, 2rem)',
        background: 'rgba(0, 255, 255, 0.05)',
        border: '1px solid rgba(0, 255, 255, 0.2)',
        borderRadius: 'clamp(15px, 4vw, 20px)',
        textAlign: 'center',
        overflow: 'visible',
        maxWidth: 'clamp(500px, 85vw, 700px)',
        margin: 'clamp(2rem, 5vw, 3rem) auto 0'
      }}>
        <h3 style={{
          color: '#00ffff',
          marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
          fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
          fontWeight: '600'
        }}>
          💡 Consejo
        </h3>
        <p style={{
          color: '#b0b0b0',
          fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
          lineHeight: '1.5',
          maxWidth: 'clamp(350px, 75vw, 450px)',
          margin: '0 auto'
        }}>
          Las imágenes de alta calidad y los videos promocionales pueden aumentar significativamente las ventas de tickets. 
          Usa formatos optimizados para web.
        </p>
      </div>
    </div>
  )
}
