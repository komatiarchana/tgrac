'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Building2, Globe, Users, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Telangana GIS</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Official Geographic Information System portal of the Planning Department, Government of Telangana
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Mission */}
            <div className="mb-12">
              <div className="flex gap-4 mb-4">
                <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide accurate, accessible, and timely geographic information systems to support evidence-based 
                    decision-making for urban planning, sustainable development, and effective governance in Telangana.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="mb-12">
              <div className="flex gap-4 mb-4">
                <Building2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To establish Telangana as a leader in digital geographic information management, enabling 
                    transparent governance, sustainable urban development, and inclusive growth through advanced 
                    geospatial technologies.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Interactive Mapping</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time interactive maps with multiple layers for comprehensive geographic visualization
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Satellite Imagery</h3>
                  <p className="text-sm text-muted-foreground">
                    High-resolution satellite data for monitoring land use, urban growth, and development projects
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Location Search</h3>
                  <p className="text-sm text-muted-foreground">
                    Powerful search functionality to find locations, buildings, infrastructure, and other spatial features
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">GIS Layer Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Publish, manage, and share geospatial data layers for planning and development initiatives
                  </p>
                </Card>
              </div>
            </div>

            {/* Team Section */}
            <div className="mb-12">
              <div className="flex gap-4 mb-4">
                <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Our Team</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    The Planning Department of Telangana comprises professionals in GIS, urban planning, geomatics, 
                    and development policy who are committed to advancing spatial information technology for better governance.
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-12">
              <div className="flex gap-4 mb-4">
                <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-3">Achievements</h2>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Digitized land records for all 33 districts of Telangana</li>
                    <li>• Published satellite imagery and thematic mapping layers</li>
                    <li>• Established spatial database for urban planning data</li>
                    <li>• Integrated with multiple government portals and data sources</li>
                    <li>• Facilitated transparent monitoring of development projects</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <Card className="p-6 bg-primary/5 border-primary/10">
              <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Email:</strong> dgtrac@gmail.com</p>
                <p><strong>Phone:</strong> 040-23324633</p>
                <p><strong>Address:</strong> Ganaka Bhavan Premieses
                Veer Nagar, Chintal Basti,
                Khairtabad,
                Hyderabad-500004, Telangana State, India
                </p>
                <p><strong>Working Hours:</strong> Monday-Saturday, 9:00 AM - 5:00 PM IST</p>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
