"use client"

import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"

const MapViewer = dynamic(
  () => import("./MapViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[700px] items-center justify-center">
        Loading Telangana GIS Map...
      </div>
    ),
  }
)

export function MapSection() {
  return (
    <section
      id="maps"
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <Badge
            variant="secondary"
            className="mb-4"
          >
            Maps & GIS
          </Badge>

          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Telangana GIS Portal
          </h2>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore Telangana districts with
            GIS boundaries, district information,
            shape area, shape length and map
            navigation tools.
          </p>
        </div>

        <div
          style={{
            height: "800px",
            width: "100%",
          }}
        >
          <MapViewer />
        </div>
      </div>
    </section>
  )
}