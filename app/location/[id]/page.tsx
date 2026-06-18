'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, ArrowLeft, MapIcon, FileText, MessageSquare } from 'lucide-react'

interface LocationData {
  id: string
  name: string
  description: string
  category: string
  latitude: number
  longitude: number
  address: string
  attributes: Record<string, any>
  created_at: string
}

interface QAItem {
  id: string
  question: string
  answer: string | null
}

export default function LocationDetailsPage() {
  const params = useParams()
  const locationId = params.id as string
  const [location, setLocation] = useState<LocationData | null>(null)
  const [qaData, setQaData] = useState<QAItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newQuestion, setNewQuestion] = useState('')

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await fetch(`/api/locations/${locationId}`)
        if (!response.ok) throw new Error('Location not found')
        const data = await response.json()
        setLocation(data)
      } catch (error) {
        console.error('[v0] Failed to fetch location:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLocationDetails()
  }, [locationId])

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading location details...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!location) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-12 text-center">
            <MapIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Location Not Found</h1>
            <p className="text-muted-foreground mb-6">The location you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/search">
              <Button>Back to Search</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/search" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{location.name}</h1>
                <p className="text-sm font-medium text-primary">{location.category}</p>
              </div>
              <MapPin className="w-8 h-8 text-primary flex-shrink-0" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {location.description && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Overview
                  </h2>
                  <p className="text-muted-foreground">{location.description}</p>
                </Card>
              )}

              {/* Attributes */}
              {Object.keys(location.attributes || {}).length > 0 && (
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(location.attributes).map(([key, value]) => (
                      <div key={key} className="pb-4 border-b last:border-b-0">
                        <p className="text-sm font-medium text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</p>
                        <p className="text-foreground">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Q&A Section */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Questions & Answers
                </h2>
                
                {qaData.length > 0 ? (
                  <div className="space-y-4">
                    {qaData.map((item) => (
                      <div key={item.id} className="pb-4 border-b last:border-b-0">
                        <p className="font-medium text-foreground mb-1">{item.question}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.answer || 'Awaiting answer...'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No questions yet. Be the first to ask!</p>
                )}

                {/* Ask Question Form */}
                <div className="mt-6 pt-6 border-t">
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    setNewQuestion('')
                  }}>
                    <input
                      type="text"
                      placeholder="Ask a question about this location..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg text-sm mb-3"
                    />
                    <Button type="submit" size="sm" disabled={!newQuestion.trim()}>
                      Post Question
                    </Button>
                  </form>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Map Card */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapIcon className="w-4 h-4" />
                  Location
                </h3>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Map preview</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    Latitude: <span className="font-medium text-foreground">{location.latitude.toFixed(6)}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Longitude: <span className="font-medium text-foreground">{location.longitude.toFixed(6)}</span>
                  </p>
                </div>
              </Card>

              {/* Address Card */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Address</h3>
                <p className="text-sm text-muted-foreground">{location.address}</p>
              </Card>

              {/* Information Card */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="text-foreground font-medium">{location.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p className="text-foreground font-medium text-xs">
                      {new Date(location.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Share Card */}
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Share</h3>
                <Button variant="outline" size="sm" className="w-full">
                  Share Location
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
