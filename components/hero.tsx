"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Satellite, Building, Shield } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container relative mx-auto px-4 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <div className="text-primary-foreground">
            {/* Emblem Display */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl border-3 border-secondary">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-secondary">Our Emblem</p>
                <p className="text-xs text-primary-foreground/70">Official Seal of Planning Department</p>
              </div>
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              Building a Progressive Telangana
            </div>
            
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
              Planning Department
              <span className="block text-secondary">Government of Telangana</span>
            </h1>
            
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-primary-foreground/80 text-pretty">
              Driving sustainable development through strategic planning, advanced geospatial technologies, 
              and data-driven policy making for the prosperity of Telangana.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/maps">
                <Button size="lg" variant="secondary" className="group">
                  Explore Maps
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/search">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Search Locations
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-primary-foreground/20 pt-8">
              <div>
                <p className="text-3xl font-bold text-secondary">33</p>
                <p className="text-sm text-primary-foreground/70">Districts Covered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">1.12L</p>
                <p className="text-sm text-primary-foreground/70">Sq Km Area</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-secondary">3.9Cr</p>
                <p className="text-sm text-primary-foreground/70">Population</p>
              </div>
            </div>
          </div>

          {/* Visual cards */}
          <div className="relative hidden lg:block">
            <div className="grid gap-4">
              <div className="ml-auto flex w-80 items-center gap-4 rounded-xl bg-card p-4 shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">GIS Mapping</p>
                  <p className="text-sm text-muted-foreground">Real-time geographic data</p>
                </div>
              </div>
              
              <div className="mr-auto flex w-80 items-center gap-4 rounded-xl bg-card p-4 shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Satellite className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">Satellite Imagery</p>
                  <p className="text-sm text-muted-foreground">High-resolution remote sensing</p>
                </div>
              </div>
              
              <div className="ml-auto flex w-80 items-center gap-4 rounded-xl bg-card p-4 shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Building className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">Urban Planning</p>
                  <p className="text-sm text-muted-foreground">Smart city initiatives</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
