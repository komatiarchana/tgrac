'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, FileUp, AlertCircle, CheckCircle } from 'lucide-react'

export default function AdminUploadPage() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadType, setUploadType] = useState<'geojson' | 'shapefile' | 'csv'>('geojson')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setSelectedFile(files[0])
      setUploadStatus('idle')
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploadStatus('uploading')
    const formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('type', uploadType)

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setUploadStatus('success')
        setSelectedFile(null)
      } else {
        setUploadStatus('error')
      }
    } catch (error) {
      console.error('[v0] Upload error:', error)
      setUploadStatus('error')
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Admin Data Upload</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload and manage GIS data layers for publishing on the portal
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="p-8">
              <div className="space-y-6">
                {/* Upload Type Selection */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Upload Type</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'geojson', label: 'GeoJSON' },
                      { value: 'shapefile', label: 'Shapefile' },
                      { value: 'csv', label: 'CSV' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setUploadType(option.value as any)}
                        className={`p-3 rounded-lg border-2 transition ${
                          uploadType === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <p className="font-medium text-foreground">{option.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Select File</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition cursor-pointer">
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      accept={uploadType === 'geojson' ? '.geojson,.json' : uploadType === 'csv' ? '.csv' : '.zip'}
                      className="hidden"
                      id="file-input"
                    />
                    <label htmlFor="file-input" className="cursor-pointer block">
                      <FileUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="font-medium text-foreground mb-1">
                        {selectedFile ? selectedFile.name : 'Click to select file'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        or drag and drop your {uploadType} file here
                      </p>
                    </label>
                  </div>
                </div>

                {/* Status Messages */}
                {uploadStatus === 'success' && (
                  <div className="flex gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-900">Upload successful</p>
                      <p className="text-sm text-green-800">Your data has been uploaded and is being processed</p>
                    </div>
                  </div>
                )}

                {uploadStatus === 'error' && (
                  <div className="flex gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-900">Upload failed</p>
                      <p className="text-sm text-red-800">Please try again or contact support</p>
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploadStatus === 'uploading'}
                  size="lg"
                  className="w-full gap-2"
                >
                  <Upload className="w-4 h-4" />
                  {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload File'}
                </Button>

                {/* Info Section */}
                <div className="bg-muted p-4 rounded-lg text-sm space-y-2 text-muted-foreground">
                  <p className="font-medium text-foreground">Supported Formats:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>GeoJSON: .geojson or .json files with geographic features</li>
                    <li>Shapefile: Compressed .zip containing .shp, .shx, .dbf files</li>
                    <li>CSV: Comma-separated values with latitude/longitude columns</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Recent Uploads */}
            <Card className="mt-8 p-6">
              <h3 className="font-semibold text-foreground mb-4">Recent Uploads</h3>
              <p className="text-sm text-muted-foreground">
                No uploads yet. Start by uploading your first GIS data layer above.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
