"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, MapPin } from "lucide-react";
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
const heroImages = [
  "/images/Lalibela4.jpg",
  "/images/hamer.png",
  "/images/addis.png",
  "/images/fox.jpg",
  "/images/tana.jpg",
  "/images/dallol.jpg",
];

export default function HomePage() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
        const response = await fetch("/api/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();
        setPackages(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch packages"
        );
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

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      clearInterval(imageInterval);
    };
  }, []);


  const howItWorksAnimation = useScrollAnimation();
  const benefitsAnimation = useScrollAnimation();
  const packagesAnimation = useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section id="hero" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentImageIndex === index ? "opacity-100" : "opacity-0"
              }`}>
              <Image
                src={src || "/placeholder.svg"}
                alt={`Ethiopia landscape ${index + 1}`}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                quality={100}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
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
        id="how-it-works"
        ref={howItWorksAnimation.ref}
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
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
              3 Simple Steps to Your Authentic Ethiopian Experience
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/6 right-1/6 top-16 h-1 bg-amber-200 transform -translate-y-1/2"></div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div
                className={`relative group transition-all duration-700 delay-100 ${
                  howItWorksAnimation.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}>
                <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative z-10 w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300 shadow-md">
                    <Clock className="w-10 h-10 text-amber-800" />
                    <span className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Tell us how much time you have
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                   Share your schedule and we&apos;ll plan the perfect experience
                  </p>
                </div>
              </div>
              <div
                className={`relative group transition-all duration-700 delay-200 ${
                  howItWorksAnimation.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}>
                <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative z-10 w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300 shadow-md">
                    <Users className="w-10 h-10 text-amber-800" />
                    <span className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    We match you with a local guide
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get paired with someone who fits your interests perfectly.
                  </p>
                </div>
              </div>
              <div
                className={`relative group transition-all duration-700 delay-300 ${
                  howItWorksAnimation.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}>
                <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative z-10 w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300 shadow-md">
                    <MapPin className="w-10 h-10 text-amber-800" />
                    <span className="absolute -top-2 -right-2 bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Explore together and create memories
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                   Enjoy stories, culture and moments you&apos;ll remember forever
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              onClick={() => scrollToSection("packages")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      <section
        ref={benefitsAnimation.ref}
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
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
            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/food-experience.jpeg"
                  alt="Authentic Ethiopian food experience"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Authentic Food Experiences
                </h3>
                <p className="text-gray-600 text-sm">
                  Shows you where the real food is cooked and coffee is poured
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/hidden-streets.jpeg"
                  alt="Hidden streets of Ethiopia"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Hidden Local Spots
                </h3>
                <p className="text-gray-600 text-sm">
                  Walks you through hidden streets, local markets, favorite
                  hangouts
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/cultural-stories.jpeg"
                  alt="Ethiopian cultural stories"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Cultural Stories
                </h3>
                <p className="text-gray-600 text-sm">
                  Introduces traditions & stories not found in guidebooks
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/stress-free.jpeg"
                  alt="Stress-free travel planning"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Stress-Free Planning
                </h3>
                <p className="text-gray-600 text-sm">
                  Handles small details so you focus on the experience
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/personalized.png"
                  alt="Personalized travel experience"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Personalized Experience
                </h3>
                <p className="text-gray-600 text-sm">
                  Adapts to your mood: slow, lively, foodie, cultural, or mixed
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/insider-view.jpeg"
                  alt="Insider's view of Ethiopia"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
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
        className={`py-20 bg-gray-50 transition-all duration-1000 ${
          packagesAnimation.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Packages
            </h2>
            <p className="text-gray-600 text-lg">
              Choose your perfect experience
            </p>
          </div>

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

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => {
              const priceKeys = Object.keys(pkg.Price).filter(
                (key) => key !== "Regular"
              );
              const isPopular = index === 1;

              return (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 relative ${
                    isPopular
                      ? "bg-gradient-to-br from-amber-600 to-amber-800 transform scale-105"
                      : ""
                  }`}>
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3
                      className={`text-lg font-bold mb-2 tracking-wide ${
                        isPopular ? "text-white" : "text-gray-900"
                      }`}>
                      {pkg.name}
                    </h3>

                    <div className="mb-6 space-y-2">
                      <div>
                        <span
                          className={`text-4xl font-extrabold ${
                            isPopular ? "text-white" : "text-amber-800"
                          }`}>
                          {pkg.Price.Regular}
                        </span>
                        <p
                          className={`text-sm ${
                            isPopular ? "text-amber-100" : "text-gray-500"
                          }`}>
                          Basic package
                        </p>
                      </div>

                      {priceKeys.map((key) => (
                        <div
                          key={key}
                          className={`mt-3 p-3 rounded-lg ${
                            isPopular ? "bg-white/10" : "bg-amber-50"
                          }`}>
                          <span
                            className={`text-2xl font-bold ${
                              isPopular ? "text-white" : "text-amber-800"
                            }`}>
                            {pkg.Price[key]}
                          </span>
                          <p
                            className={`text-xs ${
                              isPopular ? "text-amber-100" : "text-amber-600"
                            }`}>
                            {key}
                          </p>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-4 mb-8 text-left">
                      {pkg.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 ${
                              isPopular ? "bg-white/20" : "bg-amber-100"
                            }`}>
                            <div
                              className={`w-2 h-2 rounded-full ${
                                isPopular ? "bg-white" : "bg-amber-600"
                              }`}></div>
                          </div>
                          <span
                            className={
                              isPopular ? "text-white" : "text-gray-700"
                            }>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isPopular
                          ? "bg-white text-amber-800 hover:bg-amber-50"
                          : "bg-amber-800 hover:bg-amber-900 text-white"
                      }`}>
                      Book Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
