'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Satellite, Calendar, Maximize } from 'lucide-react'

interface SatelliteImage {
  id: string
  name: string
  description: string
  image_url: string
  capture_date: string | null
}

export default function SatellitePage() {
  const [images, setImages] = useState<SatelliteImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<SatelliteImage | null>(null)

  useEffect(() => {
    setImages([
      {
        id: '1',
        name: 'Telangana Urban Monitoring',
        description:
          'High-resolution imagery for urban growth and infrastructure planning.',
        image_url:
          'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
        capture_date: '2026-04-18',
      },
      {
        id: '2',
        name: 'River Basin Change Detection',
        description:
          'Satellite view of river basin and agricultural land change over time.',
        image_url:
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
        capture_date: '2026-03-26',
      },
      {
        id: '3',
        name: 'Forest Cover Analysis',
        description:
          'Vegetation and forest cover monitoring for ecological assessment.',
        image_url:
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
        capture_date: '2026-02-10',
      },
      {
        id: '4',
        name: 'Infrastructure Development',
        description:
          'Monitoring highways, buildings and urban infrastructure.',
        image_url:
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        capture_date: '2026-01-15',
      },
      {
        id: '5',
        name: 'Coastal Zone Monitoring',
        description:
          'Satellite imagery for coastal and shoreline management.',
        image_url:
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        capture_date: '2026-01-05',
      },
      {
        id: '6',
        name: 'Agricultural Land Survey',
        description:
          'Satellite monitoring of crop patterns and agricultural activity.',
        image_url:
          'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
        capture_date: '2025-12-12',
      },
    ])

    setIsLoading(false)
  }, [])

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Satellite Imagery
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              High-resolution satellite imagery for land monitoring, change
              detection, and development analysis.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  Loading satellite imagery...
                </p>
              </div>
            ) : (
              <>
                {selectedImage && (
                  <Card className="mb-8 overflow-hidden">
                    <div className="relative h-[500px] overflow-hidden">
                      <img
                        src={selectedImage.image_url}
                        alt={selectedImage.name}
                        className="w-full h-full object-cover"
                      />

                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-4 right-4"
                        onClick={() => setSelectedImage(null)}
                      >
                        Close
                      </Button>
                    </div>

                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-2">
                        {selectedImage.name}
                      </h2>

                      <p className="text-muted-foreground mb-3">
                        {selectedImage.description}
                      </p>

                      {selectedImage.capture_date && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(
                            selectedImage.capture_date
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </Card>
                )}

                <div className="mb-8">
                  <h2 className="text-2xl font-bold">
                    Available Imagery ({images.length})
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image) => (
                    <Card
                      key={image.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative h-52 overflow-hidden group">
                        <img
                          src={image.image_url}
                          alt={image.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setSelectedImage(image)}
                          >
                            <Maximize className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{image.name}</h3>

                        <p className="text-sm text-muted-foreground mb-3">
                          {image.description}
                        </p>

                        {image.capture_date && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(
                              image.capture_date
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>

                {images.length === 0 && (
                  <div className="text-center py-12">
                    <Satellite className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">
                      No Satellite Imagery Available
                    </h3>
                    <p className="text-muted-foreground">
                      No imagery has been published yet.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}