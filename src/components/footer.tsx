"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      id="contact"
      className=" bg-white text-amber-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Image
              src="/images/logo2.png"
              alt="Visitopia"
              width={150}
              height={32} 
              className="h-8 w-auto mb-4 "
            />
            <p className="text-amber-900 text-sm leading-relaxed max-w-md">
              Connecting travelers with local guides for authentic Ethiopian experiences. 
              Skip the tourist trail and step into the heart of Ethiopian life.
            </p>
          </div>
          <div>
            <h3 className="text-amber-900 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("packages")}
                  className="text-amber-900 hover:text-amber-950 text-sm transition-colors duration-200">
                  Packages
                </button>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-amber-900 hover:text-amber-950 text-sm transition-colors duration-200">
                  Terms & Privacy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-amber-900 font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 hover:text-amber-950 hover:scale-110 transition-transform duration-200"
                aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 hover:text-amber-950 hover:scale-110 transition-transform duration-200"
                aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-900 hover:text-amber-950 hover:scale-110 transition-transform duration-200"
                aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-amber-900 text-sm">
              Email:{" "}
              <a
                href="mailto:hello@visitopia.com"
                className="underline hover:text-amber-300"
              >
                hello@visitopia.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-amber-950 mt-8 pt-8 text-center">
          <p className="text-amber-900 text-sm">
            © 2025 Visitopia. All rights reserved. Moments Made With Locals.
          </p>
        </div>
      </div>
    </footer>
  );
}
