import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const q = searchParams.get('q')

  if (!q) {
    return NextResponse.json([])
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      q
    )}&limit=5`,
    {
      headers: {
        'User-Agent': 'TGRAC'
      }
    }
  )

  const data = await response.json()

  return NextResponse.json(data)
}