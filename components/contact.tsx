"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Building2,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"

const contactInfo = [
  {
    icon: Building2,
    title: "Head Office",
    details: [
      "Director General, Training, Research and Coordination",
      "Gananka Bhavan Premises",
      "Veer Nagar, Chintal Basti",
      "Khairatabad",
      "Hyderabad - 500004",
      "Telangana, India",
    ],
    mapLink: "https://maps.app.goo.gl/HtfbeE1e38dFEBww6",
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["040-23324633 (Office)"],
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["dgtrac@gmail.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: [
      "Monday - Saturday: 9:00 AM - 5:00 PM",
      "Sunday: Closed",
    ],
  },
]

const quickLinks = [
  {
    name: "Dharani Portal",
    url: "https://dharani.telangana.gov.in",
  },
  {
    name: "HMDA e-Services",
    url: "https://www.hmda.gov.in",
  },
  {
    name: "IGRS Telangana",
    url: "https://registration.telangana.gov.in",
  },
  {
    name: "Mee Seva",
    url: "https://www.meeseva.telangana.gov.in",
  },
  {
    name: "T-Survey",
    url: "https://tsurvey.telangana.gov.in",
  },
  {
    name: "NRSC Data Center",
    url: "https://www.nrsc.gov.in",
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <Badge variant="secondary" className="mb-4">
            Get In Touch
          </Badge>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Contact Us
          </h2>

          <p className="mx-auto max-w-2xl text-muted-foreground">
            Have questions about planning services or need assistance?
            Our team is here to help you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>

            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Full Name
                    </label>

                    <Input id="name" placeholder="Enter your name" />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>

                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-foreground"
                    >
                      Phone Number
                    </label>

                    <Input
                      id="phone"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-foreground"
                    >
                      Subject
                    </label>

                    <Input
                      id="subject"
                      placeholder="Enter subject"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message
                  </label>

                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Describe your query in detail..."
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  Submit Query
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <Card key={index}>
                <CardContent className="flex gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>

                    {item.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-sm text-muted-foreground"
                      >
                        {detail}
                      </p>
                    ))}

                    {item.mapLink && (
                      <a
                        href={item.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                      >
                        <MapPin className="h-4 w-4" />
                        Open in Google Maps
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              Quick Links - Related Portals
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {quickLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start gap-2"
                  asChild
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {link.name}
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}