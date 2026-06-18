import { NextResponse } from 'next/server'

export async function GET() {
  const locations = [
    {
      id: '1',
      name: 'Charminar',
      category: 'Landmark',
      district: 'Hyderabad',
      description: 'Historic monument and mosque.',
      latitude: 17.3616,
      longitude: 78.4747,
      address: 'Hyderabad, Telangana',
    },
    {
      id: '2',
      name: 'Golconda Fort',
      category: 'Landmark',
      district: 'Hyderabad',
      description: 'Historic medieval fort.',
      latitude: 17.3833,
      longitude: 78.4011,
      address: 'Hyderabad, Telangana',
    },
    {
      id: '3',
      name: 'HITEC City',
      category: 'Infrastructure',
      district: 'Hyderabad',
      description: 'Major IT and business hub.',
      latitude: 17.4435,
      longitude: 78.3772,
      address: 'Madhapur, Hyderabad',
    },
    {
      id: '4',
      name: 'Warangal Fort',
      category: 'Landmark',
      district: 'Warangal',
      description: 'Ancient fort built by Kakatiya dynasty.',
      latitude: 17.9689,
      longitude: 79.5941,
      address: 'Warangal, Telangana',
    },
    {
      id: '5',
      name: 'Ramappa Temple',
      category: 'Landmark',
      district: 'Mulugu',
      description: 'UNESCO World Heritage Temple.',
      latitude: 18.2591,
      longitude: 79.9437,
      address: 'Palampet, Telangana',
    },
  ]

  return NextResponse.json(locations)
}
