"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Clock,
  Users,
  MapPin,
  Coffee,
  Map,
  Heart,
  Shield,
  Utensils,
  Camera,
} from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Image from "next/image";

interface Package {
  id: number;
  name: string;
  inclusions: string[];
  Price: {
    Regular: string;
    [key: string]: string;
  };
}

export default function HomePage() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const taglines = [
    "12 Hours. One Adventure. Let's Go.",
    "Adventure Starts With a Hello.",
    "Meet Locals, Make Memories.",
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        setPackages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch packages');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getPriceOption = (pkg: Package) => {
    const keys = Object.keys(pkg.Price).filter(key => key !== "Regular");
    return keys.length > 0 ? keys[0] : "";
  };

  const aboutAnimation = useScrollAnimation();
  const howItWorksAnimation = useScrollAnimation();
  const benefitsAnimation = useScrollAnimation();
  const packagesAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section
        id="hero"
        className="relative h-screen bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-cover bg-center">
          <Image
            src="/images/Lalibela4.jpg"
            alt="Lalibela, Ethiopia"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl">
            You Landed in Ethiopia.
            <br />
            Don&apos;t Just Sit There.
          </h1>
          <p className="text-2xl text-white/90 mb-8 max-w-lg transition-opacity duration-500 font-light">
            {taglines[currentTagline]}
          </p>
          <Button
            onClick={() => scrollToSection("packages")}
            className="bg-white text-amber-900 hover:bg-amber-50 w-fit px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
           Find My Local Friend
          </Button>
        </div>

        <div className="absolute bottom-8 left-6 md:left-12 flex space-x-3">
          <button className="w-3 h-3 bg-white rounded-full"></button>
          <button className="w-3 h-3 bg-white/50 rounded-full"></button>
          <button className="w-3 h-3 bg-white/50 rounded-full"></button>
        </div>
      </section>

      <section
        id="about"
        ref={aboutAnimation.ref}
        className={`py-20 bg-white transition-all duration-1000 ${
          aboutAnimation.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What Visitopia Is
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Visitopia connects travelers with local guides for real, human
                experiences in Ethiopia.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                You tell us how much time you have, we match you with someone
                who knows the city like the back of their hand. Together, you
                skip the typical tourist trail and step straight into the heart
                of Ethiopian life.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center">
                <Coffee className="w-16 h-16 text-amber-800" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        ref={howItWorksAnimation.ref}
        className={`py-20 bg-amber-50 transition-all duration-1000 ${
          howItWorksAnimation.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              3 Quick Steps to Your Ethiopian Adventure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className={`text-center group transition-all duration-700 delay-100 ${
                howItWorksAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 group-hover:scale-110 transition-all duration-300 shadow-md">
                <Clock className="w-8 h-8 text-amber-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Tell Us Your Timeframe
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you have a few hours or a full day, we shape the
                experience to fit your schedule perfectly.
              </p>
            </div>

            <div
              className={`text-center group transition-all duration-700 delay-200 ${
                howItWorksAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 group-hover:scale-110 transition-all duration-300 shadow-md">
                <Users className="w-8 h-8 text-amber-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Match With a Local Guide
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We connect you with someone who knows how to turn your time into
                unforgettable stories and memories.
              </p>
            </div>

            <div
              className={`text-center group transition-all duration-700 delay-300 ${
                howItWorksAnimation.isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}>
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-100 group-hover:scale-110 transition-all duration-300 shadow-md">
                <MapPin className="w-8 h-8 text-amber-800" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Go Live the Experience
              </h3>
              <p className="text-gray-600 leading-relaxed">
                From traditional coffee ceremonies to spontaneous street
                explorations, your guide handles everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={benefitsAnimation.ref}
        className={`py-20 bg-white transition-all duration-1000 ${
          benefitsAnimation.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You Get
            </h2>
            <p className="text-gray-600 text-lg">
              Real experiences, not rehearsed tours
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-6 h-6 text-amber-800" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Authentic Food Experiences
                </h3>
                <p className="text-gray-600 text-sm">
                  Shows you where the real food is cooked and coffee is poured
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Map className="w-6 h-6 text-amber-800" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Hidden Local Spots
                </h3>
                <p className="text-gray-600 text-sm">
                  Walks you through hidden streets, local markets, favorite
                  hangouts
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-amber-800" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Cultural Stories
                </h3>
                <p className="text-gray-600 text-sm">
                  Introduces traditions & stories not found in guidebooks
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-amber-800" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Stress-Free Planning
                </h3>
                <p className="text-gray-600 text-sm">
                  Handles small details so you focus on the experience
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-amber-800" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Personalized Experience
                </h3>
                <p className="text-gray-600 text-sm">
                  Adapts to your mood: slow, lively, foodie, cultural, or mixed
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-6 h-6 text-amber-800" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Insider&apos;s View
                </h3>
                <p className="text-gray-600 text-sm">
                  Insider&apos;s view of Ethiopia, not a rehearsed tour
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      
     <section
        id="packages"
        ref={packagesAnimation.ref}
        className={`py-20 bg-amber-50 transition-all duration-1000 ${
          packagesAnimation.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Packages</h2>
          <p className="text-xl text-gray-600 mb-16 text-center">
            Choose the perfect experience for your Ethiopian adventure
          </p>

          {loading && (
            <div className="text-center py-12">
              <p>Loading packages...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-500">
              <p>{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const priceOption = getPriceOption(pkg);
              return (
                <Card 
                  key={pkg.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {pkg.name}
                    </h3>
                    
                    <ul className="space-y-3 mb-6">
                      {pkg.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="w-4 h-4 mt-1 mr-2 text-amber-600 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mb-6">
                      <div className="text-3xl font-bold text-amber-800">
                        {pkg.Price.Regular}
                      </div>
                      {priceOption && (
                        <div className="mt-2 p-3 bg-amber-100 rounded-lg">
                          <div className="font-semibold text-amber-800">
                            {priceOption}: {pkg.Price[priceOption]}
                          </div>
                        </div>
                      )}
                    </div>

                    <Button className="w-full bg-amber-800 hover:bg-amber-900 text-white rounded-lg py-6 text-lg">
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
