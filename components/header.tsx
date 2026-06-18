'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import {
  Menu,
  Satellite,
  Eye,
  Search,
  Map,
  BarChart3,
  Info,
  HelpCircle,
  LogIn,
} from 'lucide-react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
          <span className="font-medium">
            Official GIS Portal - Planning Department
          </span>

          <div className="hidden md:flex items-center gap-4 text-xs">
            <a
              href="#help"
              className="hover:underline flex items-center gap-1"
            >
              <HelpCircle className="w-3 h-3" />
              Help
            </a>

             <Link
             href="/login"
            className="hover:underline flex items-center gap-1"
>            <LogIn className="w-3 h-3" />
                    Login
              </Link>

            <a href="#contact" className="hover:underline">
                Contact
            </a>

            <a href="#" className="hover:underline">
              Accessibility
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-90 transition"
          >
            <Image
              src="/tgrac-logo.png"
              alt="TGRAC Logo"
              width={140}
              height={55}
              priority
              className="object-contain"
            />

            <div className="hidden md:block leading-tight">
              <h1 className="text-lg font-bold text-foreground">TGRAC</h1>

              <p className="text-xs text-muted-foreground">
                Telangana Remote Sensing Applications Centre
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            >
              Home
            </Link>

            <Link
              href="/maps"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            >
              <Map className="w-4 h-4" />
              Maps
            </Link>

            <Link
              href="/search"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            >
              <Search className="w-4 h-4" />
              Search
            </Link>

            <Link
              href="/satellite"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            >
              <Satellite className="w-4 h-4" />
              Satellite
            </Link>

            <Link
              href="/viewpoints"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            >
              <Eye className="w-4 h-4" />
              Viewpoints
            </Link>

            <Link
              href="/about"
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            >
              <Info className="w-4 h-4" />
              About
            </Link>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>

              <div className="mt-6 mb-8 flex items-center gap-3">
                <Image
                  src="/tgrac-logo.png"
                  alt="TGRAC Logo"
                  width={90}
                  height={40}
                  className="object-contain"
                />

                <div>
                  <h2 className="font-bold">TGRAC</h2>

                  <p className="text-xs text-muted-foreground">
                    Telangana GIS Portal
                  </p>
                </div>
              </div>

              <nav className="flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md hover:bg-muted"
                >
                  Home
                </Link>

                <Link
                  href="/maps"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md hover:bg-muted"
                >
                  Maps
                </Link>

                <Link
                  href="/search"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md hover:bg-muted"
                >
                  Search
                </Link>

                <Link
                  href="/satellite"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md hover:bg-muted"
                >
                  Satellite
                </Link>

                <Link
                  href="/viewpoints"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md hover:bg-muted"
                >
                  Viewpoints
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-md hover:bg-muted"
                >
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}