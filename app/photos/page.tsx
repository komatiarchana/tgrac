'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Photo = {
  id: number
  photo_url: string
  latitude: number
  longitude: number
  address: string
  description?: string
  uploaded_by?: string
  uploaded_at?: string
  file_name?: string
  file_size?: number
}

export const dynamic = 'force-dynamic'

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    fetchPhotos()
  }, [])

  async function fetchPhotos() {
    const { data, error } = await supabase
      .from('photo_surveys')
      .select('*')
      .order('created_at', { ascending: false })

    console.log('DATA:', data)
    console.log('ERROR:', error)

    if (data) {
      setPhotos(data)
    }
  }

  async function downloadPhoto(photo: Photo) {
    try {
      if (!photo.photo_url) {
        alert('Photo URL not found')
        return
      }

      const response = await fetch(photo.photo_url)

      if (!response.ok) {
        alert('Failed to download image')
        return
      }

      const blob = await response.blob()

      const imageUrl =
        window.URL.createObjectURL(blob)

      const imageLink =
        document.createElement('a')

      imageLink.href = imageUrl

      imageLink.download =
        photo.file_name ||
        `photo-${photo.id}.jpg`

      imageLink.click()

      window.URL.revokeObjectURL(imageUrl)

      // Download metadata file
      const details = `
Description: ${
        photo.description ||
        'No description'
      }

Address: ${
        photo.address ||
        'Not available'
      }

Latitude: ${photo.latitude}

Longitude: ${photo.longitude}

Uploaded By: ${
        photo.uploaded_by || 'Unknown'
      }

Uploaded At: ${
        photo.uploaded_at || 'Unknown'
      }

File Name: ${
        photo.file_name || 'Unknown'
      }

File Size: ${
        photo.file_size || 0
      } bytes
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

      URL.revokeObjectURL(textUrl)
    } catch (err) {
      console.error(err)
      alert('Download failed')
    }
  }

  async function deletePhoto(photo: Photo) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this photo?'
    )

    if (!confirmDelete) return

    try {
      const fileName =
        photo.photo_url.split('/photos/')[1]

      const { error: storageError } =
        await supabase.storage
          .from('photos')
          .remove([fileName])

      if (storageError) {
        console.error(storageError)
      }

      const { error: dbError } =
        await supabase
          .from('photo_surveys')
          .delete()
          .eq('id', photo.id)

      if (dbError) {
        alert('Failed to delete photo')
        console.error(dbError)
        return
      }

      setPhotos((prev) =>
        prev.filter(
          (p) => p.id !== photo.id
        )
      )

      alert(
        'Photo deleted successfully'
      )
    } catch (err) {
      console.error(err)
      alert('Error deleting photo')
    }
  }

  return (
    <div
      style={{
        padding: '20px',
      }}
    >
      <h1>Field Photo Gallery</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fill,minmax(300px,1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              border:
                '1px solid #ddd',
              borderRadius: '10px',
              overflow: 'hidden',
              background: '#fff',
            }}
          >
            <img
              src={photo.photo_url}
              alt="Survey Photo"
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
              }}
            />

            <div
              style={{
                padding: '10px',
              }}
            >
              <p>
                <b>Latitude:</b>{' '}
                {photo.latitude}
              </p>

              <p>
                <b>Longitude:</b>{' '}
                {photo.longitude}
              </p>

              <p>
                <b>Address:</b>{' '}
                {photo.address}
              </p>

              <p>
                <b>Description:</b>{' '}
                {photo.description ||
                  'No description'}
              </p>

              <button
                onClick={() =>
                  downloadPhoto(photo)
                }
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '10px',
                  background:
                    '#143991',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Download Photo
              </button>

              <button
                onClick={() =>
                  deletePhoto(photo)
                }
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '10px',
                  background:
                    '#dc2626',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Delete Photo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}