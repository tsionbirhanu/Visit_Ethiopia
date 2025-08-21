"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, Instagram, Facebook, MessageCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type Package = {
  id: number;
  name: string;
};

type Language = {
  id: number;
  code: string;
  name: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    travelerNumber: "1",
    date: "",
    timeAvailable: "",
    languages: [] as string[],
    packageId: "",
    specialInterests: [] as string[],
    additionalNote: "",
  });

  const [packages, setPackages] = useState<Package[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [languageError, setLanguageError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packagesRes = await fetch("/api/packages");
        if (packagesRes.ok) {
          const packagesData = await packagesRes.json();
          setPackages(packagesData);
        } else {
          console.error("Failed to fetch packages:", packagesRes.statusText);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languagesRes = await fetch("/api/language");
        if (languagesRes.ok) {
          const languagesData = await languagesRes.json();
          if (Array.isArray(languagesData)) {
            setLanguages(languagesData);
            setLanguageError(null);
          } else {
            console.error("Languages data is not an array");
            setLanguageError("Failed to load languages. Please refresh the page.");
          }
        } else {
          console.error("Failed to fetch languages:", languagesRes.statusText);
          setLanguageError("Failed to load languages. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
        setLanguageError("Error loading languages. Please check your connection.");
      }
    };
    fetchLanguages();
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.languages.includes(languageCode);
      return {
        ...prev,
        languages: alreadySelected
          ? prev.languages.filter((code) => code !== languageCode)
          : [...prev.languages, languageCode],
      };
    });
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => {
      const isSelected = prev.specialInterests.includes(interest);
      return {
        ...prev,
        specialInterests: isSelected
          ? prev.specialInterests.filter((i) => i !== interest)
          : [...prev.specialInterests, interest],
      };
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      alert("Please enter your email");
      return false;
    }
    if (!formData.packageId) {
      alert("Please select a package");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      phone_number: formData.phoneNumber || null,
      traveler_number: formData.travelerNumber ? parseInt(formData.travelerNumber) : 1,
      time_available: formData.timeAvailable || "FEW_HOURS",
      date_time: formData.date ? new Date(formData.date).toISOString() : new Date().toISOString(),
      special_interest: formData.specialInterests.length > 0 
        ? formData.specialInterests[0].toUpperCase().replace(/ /g, "_")
        : "OTHER",
      Additional_note: formData.additionalNote || "",
      packageId: parseInt(formData.packageId),
      language_codes: formData.languages,
      Additional_preference: formData.specialInterests.join(", "),
      role: "USER" 
    };

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        try {
          await fetch("/api/send_email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...dataToSend,
              package_selection: [formData.packageId],
              date_time: dataToSend.date_time
            }),
          });
        } catch (emailError) {
          console.error("Email sending failed, but form was submitted:", emailError);
        }

        alert("Thank you for your submission! We will contact you soon.");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          travelerNumber: "1",
          date: "",
          timeAvailable: "",
          languages: [],
          packageId: "",
          specialInterests: [],
          additionalNote: "",
        });
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`An error occurred: ${error instanceof Error ? error.message : "Please try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const interests = [
    "Food",
    "Culture",
    "Music",
    "History",
    "Markets",
    "Coffee",
    "Other",
  ];
  const travelerOptions = ["1", "2", "3-5", "6-10", "10+"];
  const timeOptions = [
    { value: "FEW_HOURS", label: "Few hours" },
    { value: "HALF_DAY", label: "Half day" },
    { value: "FULL_DAY", label: "Full day" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-20 pb-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Ready to explore Ethiopia with a local? We&apos;d love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
                <a
                  href="mailto:visitopiacontact@gmail.com"
                  className="text-amber-600 hover:text-amber-700 transition-colors font-medium"
                >
                  visitopiacontact@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Call/WhatsApp</h3>
                <a
                  href="tel:+251905093496"
                  className="text-amber-600 hover:text-amber-700 transition-colors font-medium"
                >
                  +251 905 093 496
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Follow Us</h3>
                <div className="flex justify-center space-x-3">
                  <a
                    href="#"
                    className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-white" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-lg text-amber-700 italic font-medium">
              &quot;We reply fast, because adventures don&apos;t like waiting.&quot;
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plan Your Visitopia Experience
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us about your travel plans and we&apos;ll match you with the
              perfect local guide for an authentic Ethiopian adventure.
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-semibold">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-semibold">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phoneNumber" className="text-gray-700 font-semibold">
                      Phone Number (WhatsApp if available)
                    </Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
                      }
                      className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="+251 900 000 000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="travelerNumber" className="text-gray-700 font-semibold">
                      Number of Travelers
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, travelerNumber: value }))
                      }
                      value={formData.travelerNumber}
                    >
                      <SelectTrigger className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Select number of travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        {travelerOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option === "1" ? "1 Traveler" : `${option} Travelers`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-700 font-semibold mb-2">
                    Preferred Date & Time
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="date" className="sr-only">
                        Preferred Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, date: e.target.value }))
                        }
                        className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timeAvailable" className="sr-only">
                        Time Available
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, timeAvailable: value }))
                        }
                        value={formData.timeAvailable}
                      >
                        <SelectTrigger className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                          <SelectValue placeholder="Select time available" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="package" className="text-gray-700 font-semibold">
                    Package Selection *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, packageId: value }))
                    }
                    value={formData.packageId}
                    required
                  >
                    <SelectTrigger className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                      <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent>
                      {packages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id.toString()}>
                          {pkg.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-gray-700 font-semibold">
                    Language Preference
                  </Label>
                  {languageError ? (
                    <div className="mt-2 text-red-500 text-sm">{languageError}</div>
                  ) : (
                    <div className="mt-2 space-y-2 max-h-60 overflow-y-auto p-2 border rounded-lg">
                      {languages.map((language) => (
                        <div key={language.code} className="flex items-center space-x-2">
                          <Checkbox
                            id={`lang-${language.code}`}
                            checked={formData.languages.includes(language.code)}
                            onCheckedChange={() => handleLanguageChange(language.code)}
                            className="border-gray-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                          />
                          <Label
                            htmlFor={`lang-${language.code}`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {language.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-gray-700 font-semibold">
                    Special Interests
                  </Label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={`interest-${interest}`}
                          checked={formData.specialInterests.includes(interest)}
                          onCheckedChange={() => handleInterestChange(interest)}
                          className="border-gray-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                        />
                        <Label
                          htmlFor={`interest-${interest}`}
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalNote" className="text-gray-700 font-semibold">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="additionalNote"
                    value={formData.additionalNote}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, additionalNote: e.target.value }))
                    }
                    placeholder="Anything you'd like us to know..."
                    className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500 min-h-[100px]"
                  />
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send My Request"}
                  </Button>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Don&apos;t worry, your details are safe with us. We&apos;ll only use them to plan your adventure.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}