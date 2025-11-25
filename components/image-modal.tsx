"use client"

import { useEffect, useState } from "react"

interface Photo {
  id: string
  title: string
  url: string
  download_url: string
  author: string
}

interface NavigationItem {
  index: number
  id: string
}

interface ImageModalProps {
  photo: Photo
  currentIndex: number
  totalImages: number
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  navigationItems: NavigationItem[]
}

export default function ImageModal({
  photo,
  currentIndex,
  totalImages,
  onNext,
  onPrev,
  onClose,
  navigationItems,
}: ImageModalProps) {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowRight") {
        onNext()
      } else if (e.key === "ArrowLeft") {
        onPrev()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onNext, onPrev, onClose])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 transition-opacity duration-200"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-5xl h-auto max-h-[90vh] bg-card rounded-2xl border border-accent/40 overflow-hidden shadow-2xl shadow-black/80 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-accent text-white p-2 rounded-lg transition-all duration-200 hover:scale-110"
            aria-label="Close modal"
          >
            <span className="text-xl">✕</span>
          </button>

          {/* Main Image Display */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-950 to-slate-900 overflow-hidden">
            {!imageError ? (
              <img
                src={photo.download_url || "/placeholder.svg"}
                alt={photo.title}
                className={`w-full h-full object-contain transition-all duration-300 ${isImageLoading ? "blur-sm" : "blur-0"}`}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-900 text-muted-foreground">
                <span>Image failed to load</span>
              </div>
            )}

            {/* Loading Spinner */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
              </div>
            )}

            {/* Navigation Buttons */}
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-accent text-white p-3 rounded-lg transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <span className="text-xl">❮</span>
            </button>

            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-accent text-white p-3 rounded-lg transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <span className="text-xl">❯</span>
            </button>
          </div>

          {/* Image Info Footer */}
          <div className="px-6 py-4 bg-background/80 backdrop-blur-sm border-t border-accent/40">
            <div className="space-y-3">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-foreground line-clamp-2">{photo.title}</h2>
                <p className="text-sm text-accent font-semibold">{photo.author}</p>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex gap-2 overflow-x-auto pb-2 scroll-smooth">
                {navigationItems.slice(0, 12).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {}}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      item.index === currentIndex
                        ? "border-accent shadow-lg shadow-accent/50 scale-105"
                        : "border-border hover:border-accent/50"
                    }`}
                    aria-label={`View image ${item.index + 1}`}
                  >
                    <img
                      src={`https://picsum.photos/80/80?random=${item.id}`}
                      alt={`Thumbnail ${item.index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Progress Info */}
              <div className="flex items-center justify-between pt-3 border-t border-accent/30">
                <span className="text-sm font-semibold text-foreground">
                  Image {currentIndex + 1} of {totalImages}
                </span>
                <div className="flex gap-2 text-xs text-muted-foreground bg-accent/10 px-3 py-1 rounded-full">
                  <span>← → Navigate</span>
                  <span>•</span>
                  <span>ESC Close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
