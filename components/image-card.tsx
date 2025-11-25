"use client"

import { useState } from "react"

interface Photo {
  id: string
  title: string
  url: string
  download_url: string
  author: string
}

interface ImageCardProps {
  photo: Photo
  index: number
  isHovered: boolean
  onHover: () => void
  onUnhover: () => void
  onClick: () => void
}

export default function ImageCard({ photo, index, isHovered, onHover, onUnhover, onClick }: ImageCardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const gradientColors = [
    "from-cyan-500 to-blue-600",
    "from-purple-500 to-pink-600",
    "from-orange-500 to-red-600",
    "from-emerald-500 to-teal-600",
    "from-yellow-500 to-orange-600",
    "from-rose-500 to-pink-600",
    "from-indigo-500 to-purple-600",
    "from-lime-500 to-green-600",
  ]
  const gradient = gradientColors[index % gradientColors.length]

  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onUnhover}
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-card border-2 border-border transition-all duration-300 hover:border-accent hover:shadow-2xl hover:shadow-accent/40"
      aria-label={`View ${photo.title}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-900">
        {!imageError ? (
          <img
            src={photo.url || "/placeholder.svg"}
            alt={photo.title}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            } ${isLoading ? "blur-sm" : "blur-0"}`}
            onLoad={() => setIsLoading(false)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}>
            <span className="text-sm font-semibold text-white">Image unavailable</span>
          </div>
        )}

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-60"
          }`}
        />

        {/* Title Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 transform transition-all duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <p className="text-xs font-bold text-white truncate">{photo.author}</p>
          <p className="text-xs text-gray-200 line-clamp-2 mt-1">{photo.title}</p>
        </div>

        {/* Index Badge */}
        <div
          className={`absolute top-2 right-2 bg-gradient-to-r ${gradient} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}
        >
          #{index + 1}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    </button>
  )
}
