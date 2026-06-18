'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search, MapPin, Filter } from 'lucide-react'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface LocationResult {
  id: string
  name: string
  category: string
  district: string
  description: string
  latitude: number
  longitude: number
  address: string
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [locations, setLocations] = useState<LocationResult[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    'Building',
    'Road',
    'Landmark',
    'Area',
    'Infrastructure',
    'Public Services',
  ]

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations')

        if (!response.ok) {
          throw new Error('Failed to fetch locations')
        }

        const data: LocationResult[] = await response.json()
        setLocations(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocations()
  }, [])

  const filteredResults = useMemo(() => {
    return locations.filter((location) => {
      const query = searchQuery.toLowerCase()

      const matchesSearch =
        location.name.toLowerCase().includes(query) ||
        location.address.toLowerCase().includes(query) ||
        location.district.toLowerCase().includes(query) ||
        location.category.toLowerCase().includes(query)

      const matchesCategory =
        !selectedCategory || location.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [locations, searchQuery, selectedCategory])

  const getGoogleMapsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps?q=${lat},${lng}`
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-14">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-4">
              Telangana Location Search
            </h1>

            <p className="text-muted-foreground text-center mb-10">
              Search locations across Telangana
            </p>

            <div className="max-w-3xl mx-auto space-y-5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                <Input
                  type="text"
                  placeholder="Search locations, roads, landmarks..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  Loading locations...
                </p>
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-40" />

                <p className="text-muted-foreground">
                  No locations found
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-8">
                  {filteredResults.length} Locations Found
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((location) => (
                    <Card
                      key={location.id}
                      className="p-6 hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">
                            {location.name}
                          </h3>

                          <p className="text-primary text-sm font-medium">
                            {location.category}
                          </p>
                        </div>

                        <MapPin className="w-5 h-5 text-primary" />
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {location.description}
                      </p>

                      <div className="space-y-2 mb-5">
                        <p className="text-sm">
                          <strong>District:</strong> {location.district}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {location.address}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Lat: {location.latitude} | Lng: {location.longitude}
                        </p>
                      </div>

                      <Button asChild className="w-full">
                        <a
                          href={getGoogleMapsUrl(
                            location.latitude,
                            location.longitude
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open in Google Maps
                        </a>
                      </Button>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
