"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, Building, Droplets, Train, Factory, Zap } from "lucide-react"

const initiatives = [
  {
    icon: Leaf,
    title: "Telangana Ku Haritha Haram",
    description: "Massive afforestation program increasing green cover to 33% of the total geographical area.",
    stats: "230 Cr+ saplings planted",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Droplets,
    title: "Mission Kakatiya",
    description: "Restoration of minor irrigation tanks to enhance agricultural productivity.",
    stats: "46,000+ tanks restored",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Building,
    title: "Double Bedroom Housing",
    description: "Affordable housing scheme providing dignified shelter to economically weaker sections.",
    stats: "2.96 Lakh houses",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Train,
    title: "Regional Ring Road",
    description: "333 km outer ring road connecting major towns around Hyderabad.",
    stats: "₹13,000 Cr investment",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: Factory,
    title: "Industrial Corridors",
    description: "Development of industrial nodes along key transportation routes.",
    stats: "5 major corridors",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    icon: Zap,
    title: "T-Hub 2.0",
    description: "World&apos;s largest innovation campus supporting startups and entrepreneurs.",
    stats: "5.8 Lakh sq ft",
    color: "bg-cyan-500/10 text-cyan-600",
  },
]

export function Initiatives() {
  return (
    <section id="initiatives" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">Key Initiatives</Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Flagship Development Programs
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Transformative initiatives driving Telangana&apos;s growth across infrastructure, 
            environment, housing, and industrial development.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((initiative, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all hover:border-primary/30">
              <CardHeader>
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${initiative.color}`}>
                  <initiative.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {initiative.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-pretty">{initiative.description}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm font-medium text-primary">{initiative.stats}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
