"use client"

import { useState, useCallback, useMemo } from "react"
import ImageCard from "./image-card"
import ImageModal from "./image-modal"

interface Photo {
  id: string
  title: string
  url: string
  download_url: string
  author: string
}

interface ImageGalleryProps {
  photos: Photo[]
}

export default function ImageGallery({ photos }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const sortedPhotos = useMemo(() => {
    const sorted: Photo[] = []
    // Using for loop to demonstrate looping technique
    for (let i = 0; i < photos.length; i++) {
      sorted.push(photos[i])
    }
    return sorted
  }, [photos])

  const handleCardClick = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  const handleNextImage = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0
      return (prev + 1) % sortedPhotos.length
    })
  }, [sortedPhotos.length])

  const handlePrevImage = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0
      return (prev - 1 + sortedPhotos.length) % sortedPhotos.length
    })
  }, [sortedPhotos.length])

  const handleCloseModal = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  // Demonstrate forEach looping technique
  const navigationItems: Array<{ index: number; id: string }> = []
  sortedPhotos.forEach((photo, index) => {
    navigationItems.push({ index, id: photo.id })
  })

  // Demonstrate map looping technique
  const photoElements = sortedPhotos.map((photo, index) => (
    <ImageCard
      key={photo.id}
      photo={photo}
      index={index}
      isHovered={hoveredId === photo.id}
      onHover={() => setHoveredId(photo.id)}
      onUnhover={() => setHoveredId(null)}
      onClick={() => handleCardClick(index)}
    />
  ))

  return (
    <>
      <div className="space-y-8">
        {/* Gallery Header */}
        <div className="text-center space-y-3">
          <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/50">
            <span className="text-sm font-semibold text-accent">Photo Collection</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground">Image Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore {sortedPhotos.length} stunning images. Click any photo to view in fullscreen with smooth navigation.
          </p>
        </div>

        {/* Responsive Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
          {photoElements}
        </div>

        {/* Navigation Indicators */}
        {selectedIndex !== null && (
          <div className="flex items-center justify-center gap-2 py-6 flex-wrap">
            {navigationItems.slice(0, Math.min(15, navigationItems.length)).map(({ index, id }) => (
              <button
                key={id}
                onClick={() => setSelectedIndex(index)}
                className={`transition-all duration-200 ${
                  index === selectedIndex
                    ? "w-8 h-2 bg-accent rounded-full"
                    : "w-2 h-2 bg-border rounded-full hover:bg-accent/60"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Slider */}
      {selectedIndex !== null && (
        <ImageModal
          photo={sortedPhotos[selectedIndex]}
          currentIndex={selectedIndex}
          totalImages={sortedPhotos.length}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          onClose={handleCloseModal}
          navigationItems={navigationItems}
        />
      )}
    </>
  )
}
