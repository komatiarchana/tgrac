import { NextResponse } from 'next/server'

const satelliteImages = [
  {
    id: '1',
    name: 'Telangana Urban Monitoring',
    description: 'High-resolution imagery for urban growth and infrastructure planning.',
    image_url: '/images/satellite/telangana-urban.jpg',
    capture_date: '2026-04-18',
  },
  {
    id: '2',
    name: 'River Basin Change Detection',
    description: 'Satellite view of river basin and agricultural land change over time.',
    image_url: '/images/satellite/river-basin.jpg',
    capture_date: '2026-03-26',
  },
  {
    id: '3',
    name: 'Forest Cover Analysis',
    description: 'Vegetation and forest cover monitoring for ecological assessment.',
    image_url: '/images/satellite/forest-cover.jpg',
    capture_date: '2026-02-10',
  },
  {
    id: '4',
    name: 'Infrastructure Development',
    description: 'Imagery supporting infrastructure and road development planning.',
    image_url: '/images/satellite/infrastructure.jpg',
    capture_date: '2026-01-15',
  },
  {
    id: '5',
    name: 'Coastal Zone Monitoring',
    description: 'Coastal land use and environmental monitoring imagery.',
    image_url: '/images/satellite/coastal-zone.jpg',
    capture_date: '2025-12-08',
  },
]

export async function GET() {
  return NextResponse.json(satelliteImages)
}
