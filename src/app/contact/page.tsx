"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone, Instagram, Facebook, MessageCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: "",
    preferredDate: "",
    timeAvailable: "",
    language: "",
    package: "",
    specialInterests: [] as string[],
    additionalNotes: "",
  })

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      specialInterests: checked
        ? [...prev.specialInterests, interest]
        : prev.specialInterests.filter((i) => i !== interest),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const interests = ["Food", "Culture", "Music", "History", "Markets", "Coffee", "Other"]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Contact Info Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Ready to explore Ethiopia with a local? We&apos;d love to hear from you!
            </p>
          </div>

          {/* Contact Information Cards */}
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

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Plan Your Visitopia Experience</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tell us about your travel plans and we&apos;ll match you with the perfect local guide for an authentic
              Ethiopian adventure.
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-700 font-semibold">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
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
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-semibold">
                      Phone Number (WhatsApp if available)
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="travelers" className="text-gray-700 font-semibold">
                      Number of Travelers
                    </Label>
                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, travelers: value }))}>
                      <SelectTrigger className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Select number of travelers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Traveler</SelectItem>
                        <SelectItem value="2">2 Travelers</SelectItem>
                        <SelectItem value="3-5">3-5 Travelers</SelectItem>
                        <SelectItem value="6-10">6-10 Travelers</SelectItem>
                        <SelectItem value="10+">10+ Travelers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="preferredDate" className="text-gray-700 font-semibold">
                      Preferred Date & Time
                    </Label>
                    <Input
                      id="preferredDate"
                      type="datetime-local"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, preferredDate: e.target.value }))}
                      className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeAvailable" className="text-gray-700 font-semibold">
                      Time Available
                    </Label>
                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, timeAvailable: value }))}>
                      <SelectTrigger className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Select time available" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="few-hours">Few hours</SelectItem>
                        <SelectItem value="half-day">Half day</SelectItem>
                        <SelectItem value="full-day">Full day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="language" className="text-gray-700 font-semibold">
                      Language Preference
                    </Label>
                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}>
                      <SelectTrigger className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Select language preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="amharic">Amharic</SelectItem>
                        <SelectItem value="oromo">Oromo</SelectItem>
                        <SelectItem value="tigrinya">Tigrinya</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="package" className="text-gray-700 font-semibold">
                      Package Selection
                    </Label>
                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, package: value }))}>
                      <SelectTrigger className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="essential">Essential Pass</SelectItem>
                        <SelectItem value="explorer">Explorer Day</SelectItem>
                        <SelectItem value="cultural">Full Cultural Immersion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-700 font-semibold">Special Interests</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.specialInterests.includes(interest)}
                          onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                          className="border-gray-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                        />
                        <Label htmlFor={interest} className="text-sm text-gray-700">
                          {interest}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalNotes" className="text-gray-700 font-semibold">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, additionalNotes: e.target.value }))}
                    placeholder="Anything you'd like us to know..."
                    className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500 min-h-[100px]"
                  />
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Send My Request
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
  )
}
