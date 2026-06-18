"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icons in Next.js
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

type District = {
  name: string
  lat: number
  lng: number
  population: string
  area: string
}

interface MapComponentProps {
  activeLayer: string
  selectedDistrict: District | null
  districts: District[]
  onDistrictSelect: (district: District) => void
}

const layerUrls: Record<string, string> = {
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  streets: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  hybrid: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
}

const layerAttribution: Record<string, string> = {
  satellite: "Tiles &copy; Esri",
  terrain: "Map data: &copy; OpenTopoMap",
  streets: "&copy; OpenStreetMap contributors",
  hybrid: "Tiles &copy; Esri",
}

function MapUpdater({ selectedDistrict }: { selectedDistrict: District | null }) {
  const map = useMap()

  useEffect(() => {
    if (selectedDistrict) {
      map.flyTo([selectedDistrict.lat, selectedDistrict.lng], 11, {
        duration: 1.5,
      })
    }
  }, [selectedDistrict, map])

  return null
}

export default function MapComponent({
  activeLayer,
  selectedDistrict,
  districts,
  onDistrictSelect,
}: MapComponentProps) {
  // Center of Telangana
  const center: [number, number] = [17.8495919, 79.1151663]

  return (
    <MapContainer
      center={center}
      zoom={7}
      className="h-[500px] w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        key={activeLayer}
        attribution={layerAttribution[activeLayer]}
        url={layerUrls[activeLayer]}
      />
      
      {activeLayer === "hybrid" && (
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://stamen-tiles.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}.png"
          opacity={0.7}
        />
      )}

      <MapUpdater selectedDistrict={selectedDistrict} />

      {districts.map((district) => (
        <Marker
          key={district.name}
          position={[district.lat, district.lng]}
          eventHandlers={{
            click: () => onDistrictSelect(district),
          }}
        >
          <Popup>
            <div className="min-w-[150px]">
              <h3 className="font-bold text-base mb-2">{district.name}</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Population:</span> {district.population}</p>
                <p><span className="text-gray-600">Area:</span> {district.area}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
