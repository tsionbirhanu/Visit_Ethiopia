"use client";

import { useState, useEffect } from "react";
import { Users, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AboutPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "/images/tour.jpg",
    "/images/happy-day-ethiopian-tours.jpg",
    "/images/images (4).jpeg",
    "/images/IMG_2974.png",
    "/images/Tour-Company-In-Ethiopia-Tour-and-Travel-in-Ethiopiaf.jpg",
    "/images/tmket.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const workSteps = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Tell Us Your Timeframe",
      description:
        "Whether you have a few hours or a full day, you let us know how much time you want to spend exploring. We design experiences that fit your schedule, so nothing feels rushed and nothing is wasted.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Match With a Local Guide",
      description:
        "We pair you with a local who knows the city and enjoys sharing their culture. Every guide has their own focus: some on food, some on music, others on history, so you get a match that feels natural.",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Go Live the Experience",
      description:
        "From a traditional coffee ceremony to a street market walk, from hidden jazz bars to quiet neighborhoods, your guide takes care of the details. You just show up, explore and enjoy a real slice of Ethiopian life.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImages[currentImageIndex] || "/placeholder.svg"}
            alt="Ethiopian culture and landscapes"
            fill
            className="object-cover transition-opacity duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              About us
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto opacity-90">
              Connecting hearts through authentic Ethiopian experiences
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Why Visitopia Exists
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Visitopia makes travel in Ethiopia personal. Instead of generic
              tours, we connect you with locals who show you real culture, food
              and everyday life.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              You don&apos;t just see Ethiopia, you experience it with someone
              who lives it.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            How We Work
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {workSteps.map((step, index) => (
              <div key={index} className="group text-center">
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/Et.jpg?height=500&width=600"
                alt="Ethiopian coffee ceremony"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why We Started
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Because Ethiopia has more than monuments and museums. It has
                  people, traditions, flavors and moments worth sharing.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  And because every traveler deserves a real connection, not
                  just a checklist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
