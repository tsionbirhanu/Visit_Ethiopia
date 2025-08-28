"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Users, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface Package {
  id: number;
  name: string;
  inclusions: string[];
  Price: {
    Regular: string;
    [key: string]: string;
  };
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const fullExperienceAnimation = useScrollAnimation();
  const guideOnlyAnimation = useScrollAnimation();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const processedData = data.map((pkg: any) => {
          let inclusions: string[] = [];

          if (Array.isArray(pkg.inclusions)) {
            inclusions = pkg.inclusions;
          } else if (typeof pkg.inclusions === "string") {
            try {
              const cleanedString = pkg.inclusions
                .replace(/\n/g, "")
                .replace(/,\s*\]/g, "]")
                .replace(/,\s*$/g, "");

              const parsed = JSON.parse(cleanedString);
              if (Array.isArray(parsed)) {
                inclusions = parsed;
              }
            } catch (e) {
              console.warn(
                `Failed to parse inclusions for package ${pkg.id}:`,
                e
              );
              inclusions = [pkg.inclusions];
            }
          }

          let priceData = pkg.Price;
          if (typeof pkg.Price === "string") {
            priceData = { Regular: pkg.Price };
          }

          return {
            ...pkg,
            inclusions,
            Price: priceData,
          };
        });

        setPackages(processedData);
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

  const handlePackageSelect = (packageId: number) => {
    localStorage.setItem("selectedPackage", packageId.toString());
    router.push("/contact");
  };

  const fullExperiencePackages = packages.filter((pkg) => {
    const name = pkg.name.trim().toLowerCase();
    return [
      "explorer day",
      "essential pass",
      "full cultural immersion",
    ].includes(name);
  });

  const guideOnlyPackages = packages.filter((pkg) =>
    ["Half-Day Guide", "Day Guide", "Full Experience Guide"].includes(pkg.name)
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative py-20 bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-10"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
              <MapPin className="w-10 h-10 text-amber-700" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Our Packages
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Choose from our carefully crafted adventures or create your own
            journey with a local guide
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() =>
                fullExperienceAnimation.ref.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              View Complete Packages
            </Button>
            <Button
              onClick={() =>
                guideOnlyAnimation.ref.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg rounded-full font-semibold shadow-md hover:shadow-xl transition-all duration-300">
              Explore Guide Options
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div
            ref={fullExperienceAnimation.ref}
            className={`mb-20 transition-all duration-1000 ${
              fullExperienceAnimation.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                <MapPin className="w-8 h-8 text-amber-700" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Complete Adventure
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                A full journey that includes meals, transport and cultural
                highlights. Perfect if you want to see, taste and feel
                everything Ethiopia has to offer in one planned experience.
              </p>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                <p className="mt-4 text-gray-600">Loading our experiences...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-600 font-medium">
                    Error loading packages
                  </p>
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
              {fullExperiencePackages.map((pkg, index) => {
                const priceKeys = Object.keys(pkg.Price).filter(
                  (key) => key !== "Regular"
                );

                return (
                  <div
                    key={pkg.id}
                    className={`relative group transition-all duration-700 delay-${
                      (index + 1) * 100
                    } ${
                      fullExperienceAnimation.isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}>
                    <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group bg-white border border-gray-100 hover:border-amber-200 hover:scale-105">
                      <CardHeader className="pb-4 pt-6">
                        <CardTitle className="text-xl font-bold text-center text-gray-900 group-hover:text-amber-800 transition-colors">
                          {pkg.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex-1 pb-6">
                        <div className="text-center mb-6">
                          <div className="text-4xl font-bold mb-1 text-amber-800">
                            {pkg.Price.Regular}
                          </div>
                        </div>

                        {priceKeys.length > 0 && (
                          <div className="mb-6 space-y-3">
                            {priceKeys.map((key) => (
                              <div
                                key={key}
                                className="p-3 rounded-lg text-center bg-amber-50 border border-amber-100 group-hover:bg-amber-100 transition-colors">
                                <div className="text-xl font-bold text-amber-800">
                                  {pkg.Price[key]}
                                </div>
                                <div className="text-xs font-medium text-amber-600">
                                  {key}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm text-gray-900 mb-2">
                            What&apos;s included:
                          </h4>
                          <ul className="space-y-2">
                            {pkg.inclusions.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <Check className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-amber-600" />
                                <span className="text-sm text-gray-700">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>

                      <CardFooter className="pt-4">
                        <Button
                          onClick={() => handlePackageSelect(pkg.id)}
                          className="w-full py-3 rounded-xl font-semibold transition-all duration-300 bg-amber-800 hover:bg-amber-900 text-white hover:shadow-lg group-hover:scale-105">
                          Book Now
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            ref={guideOnlyAnimation.ref}
            className={`transition-all duration-1000 ${
              guideOnlyAnimation.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                <Users className="w-8 h-8 text-amber-700" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explore With a Local Friend
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Just you and your guide, discovering the city together. No
                extras, no fixed script, only real conversations and authentic
                experiences at your pace.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {guideOnlyPackages.map((pkg, index) => {
                const priceKeys = Object.keys(pkg.Price).filter(
                  (key) => key !== "Regular"
                );

                return (
                  <div
                    key={pkg.id}
                    className={`relative group transition-all duration-700 delay-${
                      (index + 1) * 100
                    } ${
                      guideOnlyAnimation.isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}>
                    <Card className="relative overflow-hidden  shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group bg-white border border-gray-100 hover:border-amber-200 hover:scale-105">
                      <CardHeader className="pb-4 pt-6">
                        <CardTitle className="text-xl font-bold text-center text-gray-900 group-hover:text-amber-800 transition-colors">
                          {pkg.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex-1 pb-6">
                        {/* Enhanced Price Display with bolder styling */}
                        <div className="mb-6 space-y-3">
                          <div className="p-4 rounded-lg text-center bg-amber-100 border-2 border-amber-200 group-hover:bg-amber-200 group-hover:border-amber-300 transition-colors">
                            <div className="text-2xl font-bold text-amber-900">
                              {pkg.Price.Regular}
                            </div>
                            <div className="text-sm font-semibold text-amber-700">
                              Standard Rate
                            </div>
                          </div>
                        </div>

                        {priceKeys.length > 0 && (
                          <div className="mb-6 space-y-3">
                            {priceKeys.map((key) => (
                              <div
                                key={key}
                                className="p-3 rounded-lg text-center bg-amber-50 border border-amber-100 group-hover:bg-amber-100 transition-colors">
                                <div className="text-xl font-bold text-amber-800">
                                  {pkg.Price[key]}
                                </div>
                                <div className="text-xs font-medium text-amber-600">
                                  {key}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm text-gray-900 mb-2">
                            What&apos;s included:
                          </h4>
                          <ul className="space-y-2">
                            {pkg.inclusions.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <Check className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-amber-600" />
                                <span className="text-sm text-gray-700">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>

                      <CardFooter className="pt-4">
                        <Button
                          onClick={() => handlePackageSelect(pkg.id)}
                          className="w-full py-3 rounded-xl font-semibold transition-all duration-300 bg-amber-800 hover:bg-amber-900 text-white hover:shadow-lg group-hover:scale-105">
                          Book Now
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
