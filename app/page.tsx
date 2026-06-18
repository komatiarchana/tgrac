import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { MapSection } from "@/components/map-section"
import { SatelliteSection } from "@/components/satellite-section"
import { Initiatives } from "@/components/initiatives"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <MapSection />
      <SatelliteSection />
      <Initiatives />
      <Contact />
      <Footer />
    </main>
  )
}
