'use client'

import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { supabase } from '@/lib/supabase'
import * as exifr from 'exifr'


console.log('SUPABASE URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('SUPABASE KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// @ts-ignore
import { arcgisToGeoJSON } from '@terraformer/arcgis'

export default function MapViewer() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const districtLayerRef = useRef<any>(null)
  const baseLayerRef = useRef<any>(null)
  const photoMarkerRef = useRef<any>(null)
  const [description, setDescription] = useState('')
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  

  const [activeLayer, setActiveLayer] =
  useState('streets')

  const [selectedDistrict, setSelectedDistrict] =
    useState('')

  const [districts, setDistricts] = useState<
    string[]
  >([])

const searchLocation = async (value: string) => {
  setSearchText(value)

  if (value.length < 3) {
    setSearchResults([])
    return
  }

  try {
    const response = await fetch(
  `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    value
  )}&limit=20&filter=countrycode:in&bias=proximity:78.4867,17.3850&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`
)

    const data = await response.json()

   console.log(
  "FIRST RESULT:",
  data.features?.[0]
)
    setSearchResults(data.features || [])
  } catch (error) {
    console.error("Search Error:", error)
  }
}

useEffect(() => {
  ;(window as any).downloadPhoto = async (
    id: number
  ) => {
    const { data: photo } =
      await supabase
        .from('photo_surveys')
        .select('*')
        .eq('id', id)
        .single()

    if (!photo) {
      alert('Photo not found')
      return
    }

    const response = await fetch(
      photo.photo_url
    )

    const blob = await response.blob()

    const imageUrl =
      window.URL.createObjectURL(blob)

    const imageLink =
      document.createElement('a')

    imageLink.href = imageUrl

    imageLink.download =
      photo.file_name || 'photo.jpg'

    imageLink.click()

    const details = `
Description: ${photo.description}

Address: ${photo.address}

Latitude: ${photo.latitude}

Longitude: ${photo.longitude}

Uploaded By: ${photo.uploaded_by}

Uploaded At: ${photo.uploaded_at}
`

    const detailsBlob = new Blob(
      [details],
      { type: 'text/plain' }
    )

    const detailsUrl =
      URL.createObjectURL(detailsBlob)

    const detailsLink =
      document.createElement('a')

    detailsLink.href = detailsUrl

    detailsLink.download =
      'photo-details.txt'

    detailsLink.click()
  }

  ;(window as any).deletePhoto =
    async (id: number) => {
      const confirmDelete =
        confirm(
          'Delete this photo?'
        )

      if (!confirmDelete) return

      const { error } =
        await supabase
          .from('photo_surveys')
          .delete()
          .eq('id', id)

      if (error) {
        alert('Delete failed')
        return
      }

      alert('Photo deleted')
      location.reload()
    }
}, [])

const loadPhotoMarkers = async (
    map: any,
    L: any
  ) => {
    const { data, error } = await supabase
      .from('photo_surveys')
      .select('*')
         
      console.log(data)
      

    if (error) {
      console.error(error)
      return
    }

    data?.forEach((photo: any) => {
      console.log(photo)
      console.log('PHOTO:', photo)
      console.log('LAT:', photo.latitude)
      console.log('LNG:', photo.longitude)
      if (
  photo.latitude == null ||
  photo.longitude == null ||
  isNaN(Number(photo.latitude)) ||
  isNaN(Number(photo.longitude))
) {
  console.log(
    'Skipping invalid photo:',
    photo
  )
  return
}
const marker = L.marker([
  photo.latitude,
  photo.longitude,
])

marker.addTo(map)

marker.bindPopup(`
<div style="width:260px">

<div
  style="
    display:flex;
    justify-content:flex-end;
    gap:10px;
    margin-bottom:8px;
  "
>

<button
 onclick="downloadPhoto(${photo.id})"
  style="
    border:none;
    background:none;
    cursor:pointer;
    font-size:18px;
  "
>
⬇️
</button>

<button
  onclick="deletePhoto(${photo.id})"
  style="
    border:none;
    background:none;
    cursor:pointer;
    font-size:18px;
  "
>
🗑️
</button>

</div>

<img
  src="${photo.photo_url}"
  style="
    width:100%;
    height:180px;
    object-fit:cover;
    border-radius:8px;
  "
/>

<div style="margin-top:10px">

<b>Description:</b>

<div
  style="
    height:40px;
    overflow:hidden;
  "
>
${photo.description || 'No description'}
</div>

<br/>

<b>Latitude:</b> ${photo.latitude}
<br/>

<b>Longitude:</b> ${photo.longitude}
<br/>

<b>Uploaded:</b>
${photo.uploaded_at || ''}

</div>

<br/>

<button
  onclick="window.open('/photos','_blank')"
  style="
    width:100%;
    padding:8px;
    background:#143991;
    color:white;
    border:none;
    border-radius:6px;
    cursor:pointer;
  "
>
View Photos
</button>

</div>
<div
  style={{
    position: 'absolute',
    top: '70px',
    right: '20px',
    zIndex: 1000,
    width: '350px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow:
      '0 4px 12px rgba(0,0,0,0.2)',
    overflow: 'hidden',
  }}
>
  <input
    type="text"
    placeholder="Search location..."
    value={searchText}
    onChange={(e) =>
      searchLocation(e.target.value)
    }
    style={{
      width: '100%',
      padding: '12px',
      border: 'none',
      outline: 'none',
    }}
  />
</div>
<p>
  Results:
  {searchResults.length}
</p>
`)
{searchResults.length > 0 && (
  <div
    style={{
      maxHeight: "250px",
      overflowY: "auto",
      background: "white",
      borderTop: "1px solid #ddd",
    }}
  >
    {searchResults.map(
      (place: any, index: number) => (
        <div
          key={`search-${index}`}
          onClick={() => {
            const lat =
              place.properties.lat

            const lon =
              place.properties.lon

            mapInstance.current.setView(
              [lat, lon],
              16
            )

            setSearchText(
              place.properties.formatted
            )

            setSearchResults([])
          }}
          style={{
            padding: "10px",
            cursor: "pointer",
            borderBottom:
              "1px solid #eee",
          }}
        >
          {place.properties.formatted}
        </div>
      )
    )}
  </div>
)}
    })
  }
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
 const gps = await exifr.gps(file)

console.log(
  'GPS DATA FULL:',
  JSON.stringify(gps, null, 2)
)
console.log('FILE NAME:', file.name)

let latlng = {
  lat: 0,
  lng: 0,
}

if (
  gps?.latitude &&
  gps?.longitude
) {
  latlng = {
    lat: gps.latitude,
    lng: gps.longitude,
  }
 alert(
  `Latitude: ${latlng.lat}
Longitude: ${latlng.lng}`
)
  console.log('Using GPS from photo')
} else {
  console.log(
    'No GPS found. Uploading photo anyway.'
  )
}

console.log('Using GPS from photo')
    let address = 'Location not available'

if (
  latlng.lat !== 0 &&
  latlng.lng !== 0
) {
  const addressResponse = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`
  )

  const addressData =
    await addressResponse.json()

  address =
    addressData.display_name ||
    'Address not found'
}

      const fileName = `${Date.now()}-${file.name}`
      console.log('File:', file)
      console.log('Supabase:', supabase)
      console.log('Starting upload...')

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(fileName, file)

      if (uploadError) {
        console.error(uploadError)
        alert('Upload failed')
        return
      }

      console.log('Upload result:', uploadError)
      
      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName)

      // Save in database
    const { data: insertedPhoto, error: dbError } =
  await supabase
    .from('photo_surveys')
    .insert([
      {
        photo_url: publicUrl,
        latitude: latlng.lat,
        longitude: latlng.lng,
        address: address,
        remarks: '',
        description: description,
        file_name: file.name,
        file_size: file.size,
        uploaded_by: 'Admin',
        uploaded_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()
      if (dbError) {
        console.error(dbError)
        alert('Database save failed')
        return
      }
      console.log('Database result:', dbError)

      const L = (await import('leaflet')).default
       
      delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
})

if (
  latlng.lat !== 0 &&
  latlng.lng !== 0
) {
  const marker = L.marker([
    latlng.lat,
    latlng.lng,
  ]).addTo(mapInstance.current)

marker.bindPopup(`
<div style="
  width:260px;
  font-family:Arial;
">

<div
  style="
    display:flex;
    justify-content:flex-end;
    gap:10px;
    margin-bottom:8px;
  "
>

<button
 onclick="downloadPhoto(${insertedPhoto.id})"
  style="
    border:none;
    background:none;
    cursor:pointer;
    font-size:18px;
  "
>
⬇️
</button>

<button
  onclick="deletePhoto(${insertedPhoto.id})"
  style="
    border:none;
    background:none;
    cursor:pointer;
    font-size:18px;
  "
>
🗑️
</button>

</div>

<img
  src="${publicUrl}"
  style="
    width:100%;
    height:180px;
    object-fit:cover;
    border-radius:8px;
  "
/>

<div style="margin-top:10px">

<b>Description:</b>

<div
  style="
    height:40px;
    overflow:hidden;
    margin-top:4px;
  "
>
${description || 'No description added'}
</div>

<b>Address:</b>
<br/>
${address || 'Address not available'}

<br/><br/>

<br/>

<b>Latitude:</b> ${latlng.lat}
<br/>

<b>Longitude:</b> ${latlng.lng}
<br/>

<b>Uploaded:</b>
${new Date().toLocaleString()}

</div>

<br/>

<button
  onclick="window.open('/photos','_blank')"
  style="
    width:100%;
    padding:8px;
    background:#143991;
    color:white;
    border:none;
    border-radius:6px;
    cursor:pointer;
  "
>
View Photos
</button>

</div>
`)

marker.openPopup()

mapInstance.current.setView(
  [latlng.lat, latlng.lng],
  18
)
}

alert('Photo uploaded successfully')
    } catch (err: any) {
  console.error('UPLOAD ERROR:', err)
  alert(JSON.stringify(err))
}
}

      useEffect(() => {
      const loadMap = async () => {
        if (!mapRef.current) return

        const L = (await import('leaflet')).default
         
        delete (L.Icon.Default.prototype as any)._getIconUrl

             L.Icon.Default.mergeOptions({
                  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})
        const container = mapRef.current as any
        if (container._leaflet_id) {
          container._leaflet_id = undefined
        }
        console.log('MAP REF:', mapRef.current)
console.log('MAP CREATED')
        const map = L.map(container).setView(
          [17.385, 78.4867],
          7
        )
         const osmLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution:
      '© OpenStreetMap contributors',
  }
)

osmLayer.addTo(map)

baseLayerRef.current = osmLayer

        mapInstance.current = map

        // Load Telangana JSON
        const response = await fetch(
          '/gis-data/tg.json'
        )

        const data = await response.json()

        // ArcGIS -> GeoJSON
        const geojsonFeatures =
          data.features.map((feature: any) =>
            arcgisToGeoJSON(feature)
          )


        // Dropdown districts
        const districtNames = geojsonFeatures
          .map(
            (f: any) => f.properties?.DISTRICT_N
          )
          .filter(Boolean)
          .sort()

        setDistricts(districtNames)

        const geojson = {
          type: 'FeatureCollection',
          features: geojsonFeatures,
        }

        const districtLayer = L.geoJSON(
          geojson as any,
          {
            style: {
              color: 'blue',
              weight: 2,
              fillColor: '#143991',
              fillOpacity: 0.3,
            },

            onEachFeature: (
              feature: any,
              layer: any
            ) => {
              const districtName =
                feature?.properties?.DISTRICT_N ||
                'District'

              const shapeArea =
                feature?.properties?.Shape_Area ??
                'N/A'

              const shapeLength =
                feature?.properties
                  ?.Shape_Length ??
                feature?.properties?.Shape_Leng ??
                'N/A'

              layer.bindPopup(`
              <div style="min-width:220px">
                <h3 style="margin-bottom:10px;">
                  ${districtName}
                </h3>

                <table style="width:100%">
                  <tr>
                    <td><b>District</b></td>
                    <td>${districtName}</td>
                  </tr>

                  <tr>
                    <td><b>Shape Area</b></td>
                    <td>${shapeArea}</td>
                  </tr>

                  <tr>
                    <td><b>Shape Length</b></td>
                    <td>${shapeLength}</td>
                  </tr>
                </table>
              </div>
            `)

              layer.on({
                mouseover: (e: any) => {
                  e.target.setStyle({
                    color: 'red',
                    weight: 4,
                    fillOpacity: 0.6,
                  })
                },

                mouseout: (e: any) => {
                  districtLayer.resetStyle(
                    e.target
                  )
                },
              })
            },
          }
        ).addTo(map)

        districtLayerRef.current =
          districtLayer

        map.fitBounds(
          districtLayer.getBounds()
        )

        await loadPhotoMarkers(map, L)
      }

      loadMap()
     console.log('LOADMAP START')

      return () => {
        if (mapInstance.current) {
          mapInstance.current.remove()
          mapInstance.current = null
        }
      }
    }, [])

    const changeLayer = async (
      layerType: string
    ) => {
      const L = (
        await import('leaflet')
      ).default
      

      if (
        !mapInstance.current ||
        !baseLayerRef.current
      )
        return

      mapInstance.current.removeLayer(
        baseLayerRef.current
      )

      if (layerType === 'streets') {
        baseLayerRef.current = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution:
              '© OpenStreetMap contributors',
          }
        )
      }

      if (layerType === 'satellite') {
        baseLayerRef.current = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Esri',
          }
        )
      }

      if (layerType === 'hybrid') {
        baseLayerRef.current = L.tileLayer(
          'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          {
            attribution: 'Esri',
          }
        )
      }

      baseLayerRef.current.addTo(
        mapInstance.current
      )

      setActiveLayer(layerType)
    }

    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
        }}
      >
        {/* GIS Panel */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 1000,
            background: 'white',
            padding: '12px',
            borderRadius: '8px',
            width: '200px',
            boxShadow:
              '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          <h3
            style={{
              marginBottom: '10px',
              fontWeight: 'bold',
            }}
          >
            GIS Layers
          </h3>

          <button
            onClick={() =>
              changeLayer('streets')
            }
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '8px',
            }}
          >
            Streets
          </button>

          <button
            onClick={() =>
              changeLayer('satellite')
            }
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '8px',
            }}
          >
            Satellite
          </button>

          <button
            onClick={() =>
              changeLayer('hybrid')
            }
            style={{
              width: '100%',
              padding: '8px',
            }}
          >
            Hybrid
          </button>
        </div>

        {/* District Dropdown */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '230px',
            zIndex: 1000,
            background: 'white',
            padding: '10px',
            borderRadius: '8px',
            boxShadow:
              '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          <select
            value={selectedDistrict}
            onChange={(e) => {
              const district = e.target.value

              setSelectedDistrict(district)

              if (
                districtLayerRef.current &&
                mapInstance.current
              ) {
                districtLayerRef.current.eachLayer(
                  (layer: any) => {
                    const districtName =
                      layer.feature?.properties
                        ?.DISTRICT_N || ''

                    if (districtName === district) {
                      mapInstance.current.fitBounds(
                        layer.getBounds()
                      )

                      layer.openPopup()

                      layer.setStyle({
                        color: 'red',
                        weight: 5,
                        fillOpacity: 0.7,
                      })
                    }
                  }
                )
              }
            }}
            style={{
              padding: '8px',
              width: '250px',
              marginRight: '8px',
            }}
          >
            <option value="">
              Select District
            </option>

            {districts.map((district, index) => (
  <option
    key={`${district}-${index}`}
    value={district}
  >
    {district}
  </option>
))}
</select>

        </div>

        {/* Photo Upload */}
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: '230px',
            width: '320px',
            zIndex: 1000,
            background: '#fff',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid #e5e7eb',
          }}
        >
          <h3
            style={{
              margin: 0,
              marginBottom: '12px',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            📸 Capture photo
          </h3>
          <textarea
  placeholder="Enter description..."
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
  style={{
    width: '100%',
    height: '80px',
    padding: '8px',
    marginBottom: '10px',
  }}
/>

          <p
            style={{
              fontSize: '12px',
              color: '#666',
              marginBottom: '12px',
            }}
          >
            Capture site photographs with location information.
          </p>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '6px',
            }}
          />
        </div>
         {/* Search Dropdown */}
        <div
  style={{
    position: 'absolute',
    top: '10px',
    right: '20px',
    zIndex: 99999,
    width: '350px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    
  }}
>
  <input
    type="text"
    placeholder="Search place or coordinates..."
    value={searchText}
    onChange={(e) =>
      searchLocation(e.target.value)
    }
    style={{
      width: '100%',
      padding: '12px',
      border: 'none',
      outline: 'none',
    }}
  />
 {searchResults.map(
  (place: any, index: number) => (
    <div
      key={`search-${index}-${place.formatted || ''}`}
    onClick={() => {
  console.log('CLICKED PLACE:', place)

  const lat =
    place.properties?.lat ||
    place.lat

  const lon =
    place.properties?.lon ||
    place.lon
    

  if (
    mapInstance.current &&
    lat &&
    lon
  ) {
    mapInstance.current.setView(
      [Number(lat), Number(lon)],
      16
    )
  }

  setSearchResults([])
}}
      style={{
        padding: '10px',
        cursor: 'pointer',
        borderTop: '1px solid #eee',
      }}
    >
     {place.properties?.formatted}

      <br />

      <small>
       {place.properties?.lat},
       {place.properties?.lon}
      </small>
    </div>
  ))}
</div>
        {/* Map */}
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    )
  }

