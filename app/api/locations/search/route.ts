import { NextResponse } from 'next/server'

// This is a mock API route. In production, connect to Supabase
const mockLocations = [
  {
    id: '1',
    name: 'Hyderabad City Center',
    category: 'Urban Area',
    description: 'The heart of Hyderabad, featuring IT hubs, commercial centers, and historical landmarks.',
    latitude: 17.3850,
    longitude: 78.4867,
    address: 'Hyderabad, Telangana',
    attributes: {
      population: '68.10 Lakhs',
      area: '217 sq km',
      established: '1591',
      administrative_division: 'Municipal Corporation'
    }
  },
  {
    id: '2',
    name: 'Pharma City SEZ',
    category: 'Industrial Zone',
    description: 'Asia\'s largest pharmaceutical special economic zone with world-class infrastructure.',
    latitude: 17.2403,
    longitude: 78.0337,
    address: 'Rangareddy District, Telangana',
    attributes: {
      companies: '150+',
      area: '19,333 acres',
      employment: '45000+',
      type: 'Pharmaceutical Manufacturing'
    }
  },
  {
    id: '3',
    name: 'Outer Ring Road',
    category: 'Infrastructure',
    description: 'Strategic 333 km road connecting major towns around Hyderabad.',
    latitude: 17.5821,
    longitude: 78.4867,
    address: 'Greater Hyderabad Area',
    attributes: {
      length: '333 km',
      lanes: '6-8',
      investment: '₹13,000 Cr',
      status: 'Under Development'
    }
  },
  {
    id: '4',
    name: 'Charminar Landmark',
    category: 'Historical Landmark',
    description: 'Historic monument built in 1591, iconic symbol of Hyderabad.',
    latitude: 17.3606,
    longitude: 78.4729,
    address: 'Old City, Hyderabad, Telangana',
    attributes: {
      height: '56 meters',
      constructed: '1591',
      built_by: 'Muhammad Quli Qutb Shah',
      type: 'Monument'
    }
  },
  {
    id: '5',
    name: 'T-Hub 2.0 Campus',
    category: 'Innovation Hub',
    description: 'World\'s largest innovation campus supporting startups and entrepreneurs.',
    latitude: 17.3850,
    longitude: 78.4867,
    address: 'Hyderabad Tech Park, Hyderabad',
    attributes: {
      area: '5.8 Lakh sq ft',
      capacity: '2500+ startups',
      investment_facilitated: '$5B+',
      type: 'Entrepreneurship Ecosystem'
    }
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const category = searchParams.get('category')
  const limit = parseInt(searchParams.get('limit') || '20')

  let results = mockLocations

  // Filter by search query
  if (query) {
    const q = query.toLowerCase()
    results = results.filter(
      loc =>
        loc.name.toLowerCase().includes(q) ||
        loc.description.toLowerCase().includes(q) ||
        loc.address.toLowerCase().includes(q)
    )
  }

  // Filter by category
  if (category) {
    results = results.filter(loc => loc.category === category)
  }

  // Limit results
  results = results.slice(0, limit)

  return NextResponse.json({
    data: results,
    count: results.length,
  })
}
