"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const scrollToSection = (sectionId: string) => {
    if (pathname !== "/") {
      window.location.href = `/#${sectionId}`
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navLinks = [
    { name: "Home", id: "hero", type: "scroll" },
    { name: "Packages", id: "packages", type: "scroll" },
    { name: "About Us", href: "/about", type: "route" },
    { name: "Contact", href: "/contact", type: "route" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-amber-200 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 ml-4">
            <Link href="/">
              <Image
                src="/images/logo2.png"
                alt="Visitopia - Moments Made With Locals"
                width={140}
                height={36}
                className="h-9 w-auto hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:block mr-6">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.type === "scroll" ? (
                    <button
                      onClick={() => scrollToSection(link.id!)}
                      className="text-amber-900 hover:text-orange-500 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ) : (
                    <Link
                      href={link.href!}
                      className="text-amber-900 hover:text-orange-500 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden mr-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-900 hover:text-orange-500 p-2 rounded-lg hover:bg-amber-50 transition-all duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-amber-200 shadow-lg">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.type === "scroll" ? (
                    <button
                      onClick={() => scrollToSection(link.id!)}
                      className="text-amber-900 hover:text-orange-500 hover:bg-amber-50 block px-4 py-3 text-base font-medium w-full text-left transition-all duration-200 rounded-lg"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.href!}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-amber-900 hover:text-orange-500 hover:bg-amber-50 block px-4 py-3 text-base font-medium w-full text-left transition-all duration-200 rounded-lg"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
