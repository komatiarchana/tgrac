"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Satellite, Eye, FileText, Building2, BarChart3, ArrowRight } from "lucide-react"

const services = [
  {
    icon: MapPin,
    title: "Interactive GIS Maps",
    description: "Access detailed geographic information systems with multi-layer mapping capabilities for all 33 districts.",
    badge: "Popular",
    features: ["District boundaries", "Land use patterns", "Infrastructure mapping"],
  },
  {
    icon: Satellite,
    title: "Satellite Imagery",
    description: "High-resolution satellite data from ISRO and international sources for land monitoring and change detection.",
    badge: "New",
    features: ["Multi-spectral imaging", "Temporal analysis", "NDVI mapping"],
  },
  {
    icon: Eye,
    title: "Strategic Viewpoints",
    description: "Key development zones and strategic locations identified for industrial, commercial, and residential growth.",
    badge: null,
    features: ["Growth corridors", "SEZ locations", "Investment zones"],
  },
  {
    icon: FileText,
    title: "Land Records",
    description: "Digital access to land records, survey data, and property registration information through Dharani portal integration.",
    badge: "Essential",
    features: ["Pahani records", "Survey numbers", "Mutation status"],
  },
  {
    icon: Building2,
    title: "Urban Planning",
    description: "Master plans, zoning regulations, and development control rules for all urban local bodies in Telangana.",
    badge: null,
    features: ["Master plans", "Zoning maps", "Building regulations"],
  },
  {
    icon: BarChart3,
    title: "Statistical Data",
    description: "Comprehensive statistical database covering demographics, economics, and development indicators.",
    badge: null,
    features: ["Census data", "Economic surveys", "HDI indicators"],
  },
]

export function Services() {
  return (
    <section id="services" className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">Our Services</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Geospatial & Planning Services
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Comprehensive digital services for citizens, developers, and government agencies 
            to access planning data and geographic information.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="group transition-all hover:shadow-lg hover:border-primary/30">
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  {service.badge && (
                    <Badge variant={service.badge === "New" ? "default" : "secondary"}>
                      {service.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-pretty">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mb-4 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
