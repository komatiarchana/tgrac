'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import {
  Calendar,
  ZoomIn,
  Layers,
  MapPin,
  ExternalLink,
} from 'lucide-react'

const satelliteData = [
  {
    id: 1,
    title: 'Hyderabad Metropolitan Region',
    date: 'May 2026',
    resolution: '1.5m',
    source: 'CARTOSAT-3',
    type: 'optical',

    googleMaps:
      'https://www.google.com/maps?q=17.385,78.4867',

    satelliteView:
      'https://www.google.com/maps/@17.385,78.4867,12000m/data=!3m1!1e3',

    description:
      'High-resolution imagery covering HMDA region including Outer Ring Road development zones.',
  },

  {
    id: 2,
    title: 'Krishna Basin Water Bodies',
    date: 'April 2026',
    resolution: '5m',
    source: 'ResourceSat-2A',
    type: 'multispectral',

    googleMaps:
      'https://www.google.com/maps?q=16.5756,79.312',

    satelliteView:
      'https://www.google.com/maps/@16.5756,79.312,12000m/data=!3m1!1e3',

    description:
      'Multi-spectral imagery for water resource monitoring and irrigation assessment.',
  },

  {
    id: 3,
    title: 'Warangal Urban Area',
    date: 'March 2026',
    resolution: '2.5m',
    source: 'RISAT-1',
    type: 'radar',

    googleMaps:
      'https://www.google.com/maps?q=17.9689,79.5941',

    satelliteView:
      'https://www.google.com/maps/@17.9689,79.5941,12000m/data=!3m1!1e3',

    description:
      'SAR imagery for urban expansion monitoring and infrastructure planning.',
  },

  {
    id: 4,
    title: 'Agricultural Land Mapping',
    date: 'February 2026',
    resolution: '23.5m',
    source: 'LISS-IV',
    type: 'multispectral',

    googleMaps:
      'https://www.google.com/maps?q=18.811,79.9067',

    satelliteView:
      'https://www.google.com/maps/@18.811,79.9067,12000m/data=!3m1!1e3',

    description:
      'Seasonal crop pattern analysis and agricultural productivity assessment.',
  },
]

const viewpoints = [
  {
    id: 1,
    name: 'Pharma City SEZ',
    location: 'Rangareddy District',
    type: 'Industrial',
    status: 'Under Development',
    area: '19,333 acres',

    googleMaps:
      'https://www.google.com/maps?q=17.203,78.475',

    description:
      'Asia’s largest pharmaceutical cluster with world-class infrastructure.',
  },

  {
    id: 2,
    name: 'IT Corridor Extension',
    location: 'Shamshabad',
    type: 'Commercial',
    status: 'Planning Phase',
    area: '5,000 acres',

    googleMaps:
      'https://www.google.com/maps?q=17.2403,78.4294',

    description:
      'Strategic IT/ITeS development along ORR with metro connectivity.',
  },

  {
    id: 3,
    name: 'Mucherla Future City',
    location: 'Rangareddy District',
    type: 'Mixed Use',
    status: 'Announced',
    area: '13,000 acres',

    googleMaps:
      'https://www.google.com/maps?q=17.173,78.514',

    description:
      'New state capital development with sustainable urban planning.',
  },

  {
    id: 4,
    name: 'Kakatiya Urban Development',
    location: 'Warangal',
    type: 'Urban',
    status: 'Active',
    area: '8,500 acres',

    googleMaps:
      'https://www.google.com/maps?q=17.9689,79.5941',

    description:
      'Heritage-integrated smart city development in Warangal.',
  },
]

export function SatelliteSection() {
  return (
    <section id="satellite" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Remote Sensing
          </Badge>

          <h2 className="mb-4 text-3xl md:text-4xl font-bold">
            Satellite Data & Viewpoints
          </h2>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Access high-resolution satellite imagery and explore
            strategic development viewpoints across Telangana.
          </p>
        </div>

        <Tabs defaultValue="satellite" className="w-full">
          {/* Tabs */}
          <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="satellite">
              Satellite Imagery
            </TabsTrigger>

            <TabsTrigger value="viewpoints">
              Viewpoints
            </TabsTrigger>
          </TabsList>

          {/* Satellite Tab */}
          <TabsContent value="satellite">
            <div className="grid gap-6 md:grid-cols-2">
              {satelliteData.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden group hover:shadow-xl transition-all"
                >
                  {/* Image Area */}
                  <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Layers className="mx-auto h-12 w-12 text-primary/60 mb-2" />

                        <p className="text-sm text-muted-foreground">
                          {item.source}
                        </p>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={
                          item.type === 'optical'
                            ? 'default'
                            : item.type === 'radar'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {item.type}
                      </Badge>
                    </div>

                    {/* Hover Buttons */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-2">
                        {/* Preview */}
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            window.open(
                              item.satelliteView,
                              '_blank'
                            )
                          }
                        >
                          <ZoomIn className="h-4 w-4 mr-1" />
                          Preview
                        </Button>

                        {/* Maps */}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/50 text-white hover:bg-white/20"
                          onClick={() =>
                            window.open(
                              item.googleMaps,
                              '_blank'
                            )
                          }
                        >
                          <MapPin className="h-4 w-4 mr-1" />
                          Open Maps
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </span>

                      <span>
                        Resolution: {item.resolution}
                      </span>

                      <span>
                        Source: {item.source}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Viewpoints Tab */}
          <TabsContent value="viewpoints">
            <div className="grid gap-6 md:grid-cols-2">
              {viewpoints.map((point) => (
                <Card
                  key={point.id}
                  className="hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge
                          variant={
                            point.status === 'Active'
                              ? 'default'
                              : point.status ===
                                'Under Development'
                              ? 'secondary'
                              : 'outline'
                          }
                          className="mb-2"
                        >
                          {point.status}
                        </Badge>

                        <h3 className="text-xl font-semibold">
                          {point.name}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          {point.location}
                        </p>
                      </div>

                      <Badge variant="outline">
                        {point.type}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {point.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm">
                        <span className="text-muted-foreground">
                          Total Area:
                        </span>{' '}
                        <span className="font-medium">
                          {point.area}
                        </span>
                      </span>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          window.open(
                            point.googleMaps,
                            '_blank'
                          )
                        }
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
