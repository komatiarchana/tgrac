import { NextResponse } from 'next/server'

// Mock viewpoints
const mockViewpoints = [
  {
    id: '1',
    name: 'Hyderabad Skyline',
    description: 'Strategic viewpoint overlooking the Hyderabad city skyline and IT corridor',
    latitude: 17.3950,
    longitude: 78.4667,
    image_url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=300&fit=crop',
    zoom_level: 15,
    bearing: 45,
    pitch: 30
  },
  {
    id: '2',
    name: 'Pharma City Overview',
    description: 'Elevated viewpoint for monitoring Pharma City SEZ development',
    latitude: 17.2303,
    longitude: 78.0437,
    image_url: 'https://images.unsplash.com/photo-1581092455963-5e0d14fc32ff?w=500&h=300&fit=crop',
    zoom_level: 14,
    bearing: 90,
    pitch: 25
  },
  {
    id: '3',
    name: 'Outer Ring Road Corridor',
    description: 'Strategic perspective of the ORR development corridor',
    latitude: 17.5500,
    longitude: 78.5200,
    image_url: 'https://images.unsplash.com/photo-1518640467063-32cd271d168b?w=500&h=300&fit=crop',
    zoom_level: 13,
    bearing: 180,
    pitch: 20
  },
  {
    id: '4',
    name: 'Warangal Urban Center',
    description: 'City-wide perspective of Warangal urban development area',
    latitude: 17.9784,
    longitude: 79.5941,
    image_url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=300&fit=crop',
    zoom_level: 14,
    bearing: 0,
    pitch: 30
  },
  {
    id: '5',
    name: 'IT Corridor Extension',
    description: 'Viewpoint of the IT/ITeS corridor extension along Shamshabad',
    latitude: 17.2100,
    longitude: 78.3900,
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop',
    zoom_level: 14,
    bearing: 135,
    pitch: 25
  }
]

export async function GET(request: Request) {
  return NextResponse.json(mockViewpoints)
}
