import { NextResponse } from 'next/server'

// Mock location details
const mockLocations: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Hyderabad City Center',
    description: 'The heart of Hyderabad, featuring IT hubs, commercial centers, and historical landmarks. Home to numerous tech companies, shopping malls, and cultural centers.',
    category: 'Urban Area',
    latitude: 17.3850,
    longitude: 78.4867,
    address: 'Hyderabad, Telangana',
    attributes: {
      population: '68.10 Lakhs',
      area: '217 sq km',
      established: '1591',
      administrative_division: 'Municipal Corporation',
      literacy_rate: '92%',
      development_index: 'High'
    },
    created_at: '2026-01-15T10:30:00Z'
  },
  '2': {
    id: '2',
    name: 'Pharma City SEZ',
    description: 'Asia\'s largest pharmaceutical special economic zone with world-class infrastructure and facilities. Houses over 150 companies in the pharmaceutical sector.',
    category: 'Industrial Zone',
    latitude: 17.2403,
    longitude: 78.0337,
    address: 'Rangareddy District, Telangana',
    attributes: {
      companies: '150+',
      area: '19,333 acres',
      employment: '45000+',
      type: 'Pharmaceutical Manufacturing',
      annual_production: '100+ Billion Units',
      international_approvals: 'FDA, EMA'
    },
    created_at: '2026-01-10T08:20:00Z'
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params
  const location = mockLocations[id]

  if (!location) {
    return NextResponse.json(
      { error: 'Location not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(location)
}
