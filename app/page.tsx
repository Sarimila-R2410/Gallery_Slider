"use client"

import { useState, useEffect } from "react"
import ImageGallery from "@/components/image-gallery"

interface Photo {
  id: string
  title: string
  url: string
  download_url: string
  author: string
}

const authorNames = [
  "Saranya Ravi",
  "Karthik Subramanian",
  "Priya Venkatesh",
  "Arun Kumar",
  "Lakshmi Narayanan",
  "Deepa Sivakumar",
  "Vignesh Murugan",
  "Revathi Chandran",
  "Sridhar Rajan",
  "Meena Krishnan",
  "Harish Balaji",
  "Anitha Gopal",
  "Raghav Prasath",
  "Kavya Senthil",
  "Sathish Kumar",
  "Nandhini Ramesh",
  "Praveen Shankar",
  "Divya Manikandan",
  "Gokul Raj",
  "Yamini Suresh",
  "Sanjay Varadhan",
  "Swathi Kannan",
  "Ajay Bharath",
  "Monika Elango",
  "Rajesh Karthikeyan",
  "Keerthana Vijayan",
  "Vishnu Saravanan",
  "Janani Kripa",
  "Aravind Jayaraman",
  "Shalini Perumal",
]


export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch("https://picsum.photos/v2/list?page=1&limit=30", {
          headers: {
            Accept: "application/json",
          },
        })
        if (!response.ok) {
          throw new Error("Failed to fetch photos")
        }
        const data = await response.json()
        const transformedPhotos = data.map((photo: any, index: number) => ({
          id: photo.id.toString(),
          title: photo.url.split("/").slice(-2).join("/"),
          url: `https://picsum.photos/400/400?random=${photo.id}`,
          download_url: `https://picsum.photos/800/800?random=${photo.id}`,
          author: authorNames[index % authorNames.length],
        }))
        setPhotos(transformedPhotos)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching photos:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-slate-950 to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Header with 3D glittery border */}
      <header className="glittery-border-3d border-2 border-transparent bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 backdrop-blur-xl sticky top-0 z-40 mx-4 mt-4 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 glittery-border-3d border border-transparent bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center rounded-xl">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold shimmer-text">Gallery Slider</h1>
              <p className="text-sm text-cyan-400/80">Responsive image gallery with 3D borders</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4" />
            <p className="text-cyan-400/60">Loading beautiful images...</p>
          </div>
        ) : error ? (
          <div className="glittery-border-3d border border-transparent bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl p-6 text-center">
            <p className="text-red-400 font-medium">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>{photos.length > 0 && <ImageGallery photos={photos} />}</>
        )}
      </div>
    </main>
  )
}
