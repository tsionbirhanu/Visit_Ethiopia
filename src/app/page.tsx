"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Clock, Users, MapPin, Check, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Image from "next/image";
import { useRouter } from "next/navigation";

const heroImages = [
  "/images/tour.jpg",
  "/images/happy-day-ethiopian-tours.jpg",
  "/images/harar_ethiopia_photography_tours.png",
  "/images/IMG_2974.png",
  "/images/Tour-Company-In-Ethiopia-Tour-and-Travel-in-Ethiopiaf.jpg",
  "/images/tmket.jpg",
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const taglines = [
    "12 Hours. One Adventure. Let's Go.",
    "Adventure Starts With a Hello.",
    "Meet Locals, Make Memories.",
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleCircleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  const howItWorksAnimation = useScrollAnimation();
  const benefitsAnimation = useScrollAnimation();
  const packagesAnimation = useScrollAnimation();

  const getActiveCircleIndex = () => {
    return currentIndex % 3;
  };

  const getCurrentTagline = () => {
    return taglines[currentIndex % 3];
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section id="hero" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentIndex === index ? "opacity-100" : "opacity-0"
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
            {getCurrentTagline()}
          </p>
          <Button
            onClick={() => scrollToSection("experience-options")}
            className="bg-white text-amber-900 hover:bg-amber-50 w-fit px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            Find My Local Friend
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() =>
                handleCircleSelect(index + Math.floor(currentIndex / 3) * 3)
              }
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                getActiveCircleIndex() === index
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`View slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        ref={howItWorksAnimation.ref}
        className={`py-20 bg-gradient-to-br from-amber-50 to-orange-50 transition-all duration-1000 ${
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
                    Tell Us Your Timeframe
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Whether you have a few hours or a full day, we shape the
                    experience to fit your schedule.
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
                    Match With a Local Guide
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We connect you with someone who knows how to turn your time
                    into unforgettable stories.
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
                    Go Live the Experience
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    From traditional coffee ceremonies to spontaneous street
                    explorations, your guide handles the plan, you live it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button
              onClick={() => scrollToSection("experience-options")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      <section
        ref={benefitsAnimation.ref}
        className={`py-20 bg-white/95 transition-all duration-1000 ${
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
        id="experience-options"
        ref={packagesAnimation.ref}
        className={`py-20 bg-gradient-to-b from-amber-50 to-orange-50 transition-all duration-1000 ${
          packagesAnimation.isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Experience
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We offer different ways to explore Ethiopia with our local guides
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Guide Packages Box */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group h-full">
              <CardHeader className="pb-4 pt-8">
                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                  Explore With a Local Friend
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300">
                    <Users className="w-10 h-10 text-amber-800" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Just you and your guide, discovering the city together. No
                    extras, no fixed script, only real conversations and
                    authentic experiences at your pace.
                  </p>
                  <div className="space-y-2 text-sm text-gray-700 text-left">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
                      <span>Half-day, full-day, and multi-day options</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
                      <span>Flexible scheduling</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
                      <span>Personalized itinerary</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4 flex flex-col">
                <div className="w-full flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-amber-800">
                    Starts from $30 USD
                  </span>
                  <Button
                    onClick={() => router.push("/packages")}
                    className="py-3 rounded-xl font-semibold transition-all duration-300 bg-amber-800 hover:bg-amber-900 text-white hover:scale-105 group/btn">
                    View Guide Packages
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </CardFooter>
            </Card>

            {/* Complete Experience Packages Box */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group h-full">
              <CardHeader className="pb-4 pt-8">
                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                  The Complete Adventure
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 group-hover:scale-110 transition-all duration-300">
                    <MapPin className="w-10 h-10 text-amber-800" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    A full journey that includes meals, transport and cultural
                    highlights. Perfect if you want to see, taste and feel
                    everything Ethiopia has to offer in one planned experience.
                  </p>
                  <div className="space-y-2 text-sm text-gray-700 text-left">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
                      <span>All-inclusive experiences</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
                      <span>Meals and transportation included</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
                      <span>Try Us For Free option available</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4 flex flex-col">
                <div className="w-full flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-amber-800">
                    Starts from $70 USD
                  </span>
                  <Button
                    onClick={() => router.push("/packages")}
                    className="py-3 rounded-xl font-semibold transition-all duration-300 bg-amber-800 hover:bg-amber-900 text-white hover:scale-105 group/btn">
                    View Complete Packages
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Not sure which option is right for you?
            </p>
            <Button
              onClick={() => router.push("/contact")}
              className="bg-white text-amber-800 hover:bg-amber-50 px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Talk to Our Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
