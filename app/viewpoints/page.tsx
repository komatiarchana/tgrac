'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, MapPin, Navigation } from 'lucide-react'

interface Viewpoint {
  id: string
  name: string
  description: string
  latitude: number
  longitude: number
  image_url: string | null
  zoom_level: number
  bearing: number
  pitch: number
}

export default function ViewpointsPage() {
  const [viewpoints, setViewpoints] = useState<Viewpoint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchViewpoints = async () => {
      try {
        const response = await fetch('/api/viewpoints')
        const data = await response.json()
        setViewpoints(data)
      } catch (error) {
        console.error('[v0] Failed to fetch viewpoints:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchViewpoints()
  }, [])

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Viewpoints</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Strategic viewing locations and development perspectives across Telangana
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading viewpoints...</p>
              </div>
            ) : viewpoints.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  Available Viewpoints ({viewpoints.length})
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {viewpoints.map((viewpoint) => (
                    <Card key={viewpoint.id} className="overflow-hidden hover:shadow-lg transition group">
                      {viewpoint.image_url ? (
                        <div className="h-48 bg-muted overflow-hidden relative">
                          <img
                            src={viewpoint.image_url}
                            alt={viewpoint.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
                              <Eye className="w-3 h-3" />
                              Viewpoint
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-48 bg-muted flex items-center justify-center">
                          <Eye className="w-12 h-12 text-muted-foreground opacity-50" />
                        </div>
                      )}

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-foreground mb-1">{viewpoint.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {viewpoint.description}
                        </p>

                        <div className="space-y-2 text-xs mb-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{viewpoint.latitude.toFixed(4)}, {viewpoint.longitude.toFixed(4)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Navigation className="w-4 h-4" />
                            <span>Bearing: {viewpoint.bearing}°, Pitch: {viewpoint.pitch}°</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span>Zoom: {viewpoint.zoom_level}</span>
                          </div>
                        </div>
                        

                      
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Viewpoints Available</h3>
                <p className="text-muted-foreground">
                  No viewpoints have been published yet. Check back soon for new perspectives.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
