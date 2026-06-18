import Link from "next/link"
import { Building2, Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

const footerLinks = {
  services: [
    { name: "GIS Maps", href: "#maps" },
    { name: "Satellite Data", href: "#satellite" },
    { name: "Land Records", href: "#services" },
    { name: "Urban Planning", href: "#services" },
    { name: "Statistical Data", href: "#services" },
  ],
  quickLinks: [
    { name: "Dharani Portal", href: "#" },
    { name: "HMDA Services", href: "#" },
    { name: "IGRS Telangana", href: "#" },
    { name: "T-Survey", href: "#" },
    { name: "RTI Portal", href: "#" },
  ],
  government: [
    { name: "Telangana Government", href: "#" },
    { name: "Chief Minister Office", href: "#" },
    { name: "India.gov.in", href: "#" },
    { name: "Digital India", href: "#" },
    { name: "MyGov Telangana", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "#", label: "Email" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">Planning Department</p>
                <p className="text-xs text-primary-foreground/70">Government of Telangana</p>
              </div>
            </Link>
            <p className="mb-6 max-w-sm text-sm text-primary-foreground/80 leading-relaxed">
              Driving sustainable development through strategic planning, advanced geospatial 
              technologies, and data-driven policy making for the prosperity of Telangana.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Government */}
          <div>
            <h3 className="mb-4 font-semibold">Government</h3>
            <ul className="space-y-2">
              {footerLinks.government.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-primary-foreground/20 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-primary-foreground/70 md:flex-row">
            <p>&copy; {new Date().getFullYear()} Planning Department, Government of Telangana. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary-foreground">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary-foreground">Terms of Use</Link>
              <Link href="#" className="hover:text-primary-foreground">Accessibility</Link>
              <Link href="#" className="hover:text-primary-foreground">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
