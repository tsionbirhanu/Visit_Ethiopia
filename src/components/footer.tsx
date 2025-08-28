"use client"

import { Facebook, Instagram, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {

  return (
    <footer id="contact" className="bg-gradient-to-br from-amber-900 to-amber-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/images/logo2.png"
              alt="Visitopia"
              width={150}
              height={32}
              className="h-8 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-white text-sm leading-relaxed max-w-md">
              Connecting travelers with local guides for authentic Ethiopian experiences. Real people, real places, real
              experiences.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white hover:text-orange-400 text-sm transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-white hover:text-orange-400 text-sm transition-colors duration-200"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white hover:text-orange-400 text-sm transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-orange-400 text-sm transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.instagram.com/visitopia_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-400 hover:scale-110 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61579353634690"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-400 hover:scale-110 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://t.me/visitopia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-400 hover:scale-110 transition-all duration-200"
                aria-label="Twitter"
              >
                <Send size={20} />
              </a>
            </div>
            <p className="text-white text-sm italic">
              &quot;Find us where the coffee is rich and the stories are even richer.&quot;
            </p>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center">
          <p className="text-white text-sm font-medium mb-2">
            Visitopia — Real People, Real Places, Real Experiences
          </p>
          <p className="text-white text-xs">© 2025 Visitopia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
