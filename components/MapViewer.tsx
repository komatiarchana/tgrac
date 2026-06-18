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

  const [selectedDistrict, setSelectedDistrict] =
    useState('')

  const [districts, setDistricts] = useState<
    string[]
  >([])

  const [activeLayer, setActiveLayer] =
    useState('streets')
useEffect(() => {
  ;(window as any).downloadPhoto = async (
  id: number
) => {
  const { data: photo } = await supabase
    .from('photo_surveys')
    .select('*')
    .eq('id', id)
    .single()

  if (!photo) {
    alert('Photo not found')
    return
  }

  // Download image
  console.log("PHOTO:", photo)
  console.log("PHOTO URL:", photo.photo_url)
  const response = await fetch(
    photo.photo_url
  )

  console.log("RESPONSE STATUS:", response.status)
console.log("RESPONSE OK:", response.ok)

if (!response.ok) {
  alert(`Download failed. Status: ${response.status}`)
  return
}

  const blob = await response.blob()

  const imageUrl =
    window.URL.createObjectURL(blob)

  const imageLink =
    document.createElement('a')

  imageLink.href = imageUrl

  imageLink.download =
    photo.file_name || 'photo.jpg'

  imageLink.click()

  // Metadata file
  const details = `
Description: ${photo.description}

Address: ${photo.address}

Latitude: ${photo.latitude}

Longitude: ${photo.longitude}

Uploaded By: ${photo.uploaded_by}

Uploaded At: ${photo.uploaded_at}

File Name: ${photo.file_name}

File Size: ${photo.file_size} bytes
`

  const textBlob = new Blob(
    [details],
    { type: 'text/plain' }
  )

  const textUrl =
    URL.createObjectURL(textBlob)

  const textLink =
    document.createElement('a')

  textLink.href = textUrl

  textLink.download =
    'photo-details.txt'

  textLink.click()
}

  ;(window as any).deletePhoto = async (
    id: number
  ) => {
    const confirmDelete = confirm(
      'Delete this photo?'
    )

    if (!confirmDelete) return

    const { error } = await supabase
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
`)
    })
  }
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    try {
 const gps = await exifr.gps(file)

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

        const map = L.map(container).setView(
          [17.385, 78.4867],
          7
        )

        mapInstance.current = map

        // Default basemap
        baseLayerRef.current = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution:
              '© OpenStreetMap contributors',
          }
        ).addTo(map)
      

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

            {districts.map((district) => (
              <option
                key={district}
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

