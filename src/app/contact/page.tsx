"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { toast } from "sonner" 
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

type Package = {
  id: number
  name: string
}

type Language = {
  id: number
  code: string
  name: string
}

const formSchema = z.object({
  name: z.string().min(1, { message: "Full Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true
        const phoneRegex = /^\+?[0-9\s-()]{7,20}$/
        return phoneRegex.test(value)
      },
      { message: "Invalid phone number format." }
    ),
  travelerNumber: z.string().default("1"),
  date: z.string().optional(),
  time: z.string().optional(),
  timeAvailable: z.string().optional(),
  languages: z.array(z.string()).optional(),
  packageId: z.string().min(1, { message: "Package selection is required." }),
  specialInterests: z.array(z.string()).default([]),
  additionalNote: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  const [languageError, setLanguageError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      travelerNumber: "1",
      date: "",
      time: "",
      timeAvailable: "",
      languages: [],
      packageId: "",
      specialInterests: [],
      additionalNote: "",
    },
  })

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packagesRes = await fetch("/api/packages")
        if (packagesRes.ok) {
          const packagesData = await packagesRes.json()
          setPackages(packagesData)
        } else {
          console.error("Failed to fetch packages:", packagesRes.statusText)
        }
      } catch (error) {
        console.error("Error fetching packages:", error)
      }
    }
    fetchPackages()
  }, [])

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languagesRes = await fetch("/api/language")
        if (languagesRes.ok) {
          const languagesData = await languagesRes.json()
          if (Array.isArray(languagesData)) {
            setLanguages(languagesData)
            setLanguageError(null)
          } else {
            console.error("Languages data is not an array")
            setLanguageError(
              "Failed to load languages. Please refresh the page."
            )
          }
        } else {
          console.error("Failed to fetch languages:", languagesRes.statusText)
          setLanguageError("Failed to load languages. Please try again later.")
        }
      } catch (error) {
        console.error("Error fetching languages:", error)
        setLanguageError(
          "Error loading languages. Please check your connection."
        )
      }
    }
    fetchLanguages()
  }, [])

  const onSubmit = async (data: FormValues) => {
    let combinedDateTime = null
    if (data.date && data.time) {
      const date = new Date(data.date)
      const [hours, minutes] = data.time.split(":").map(Number)
      date.setHours(hours, minutes, 0, 0)
      combinedDateTime = date.toISOString()
    } else if (data.date) {
      combinedDateTime = new Date(data.date).toISOString()
    } else {
      combinedDateTime = new Date().toISOString()
    }

    const dataToSend = {
      name: data.name,
      email: data.email,
      phone_number: data.phoneNumber || null,
      traveler_number: data.travelerNumber
        ? parseInt(data.travelerNumber)
        : 1,
      time_available: data.timeAvailable || "FEW_HOURS",
      date_time: combinedDateTime,
      special_interest:
        data.specialInterests.length > 0
          ? data.specialInterests[0].toUpperCase().replace(/ /g, "_")
          : "OTHER",
      Additional_note: data.additionalNote || "",
      packageId: parseInt(data.packageId),
      language_codes: data.languages,
      Additional_preference: data.specialInterests.join(", "),
      role: "USER",
    }

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      const result = await response.json()

      if (response.ok) {
        try {
          await fetch("/api/send_email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...dataToSend,
              package_selection: [data.packageId],
              date_time: dataToSend.date_time,
            }),
          })
        } catch (emailError) {
          console.error(
            "Email sending failed, but form was submitted:",
            emailError
          )
        }

        toast.success("✅ Request Sent Successfully!", {
          description: "Thank you for your submission! We will contact you soon.",
        })

        reset()
      } else {
        throw new Error(result.error || "Submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("⚠️ Submission Failed", {
        description: `An error occurred: ${
          error instanceof Error ? error.message : "Please try again."
        }`,
      })
    }
  }

  const interests = [
    "Food",
    "Culture",
    "Music",
    "History",
    "Markets",
    "Coffee",
    "Other",
  ]
  const travelerOptions = ["1", "2", "3-5", "6-10", "10+"]
  const timeOptions = [
    { value: "FEW_HOURS", label: "Few hours" },
    { value: "HALF_DAY", label: "Half day" },
    { value: "FULL_DAY", label: "Full day" },
  ]

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
              Ready to explore Ethiopia with a local? We&apos;d love to hear
              from you!
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
                  className="text-amber-600 hover:text-amber-700 transition-colors font-medium">
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
                  className="text-amber-600 hover:text-amber-700 transition-colors font-medium">
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
                    className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                    <Instagram className="w-4 h-4 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                    <Facebook className="w-4 h-4 text-white" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-lg text-amber-700 italic font-medium">
              &quot;We reply fast, because adventures don&apos;t like
              waiting.&quot;
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-gray-700 font-semibold">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Enter your full name"
                      className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-semibold">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="your.email@gmail.com"
                      className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="phoneNumber"
                      className="text-gray-700 font-semibold">
                      Phone Number (WhatsApp if available)
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      {...register("phoneNumber")}
                      className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      placeholder="+251 900 000 000"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="travelerNumber"
                      className="text-gray-700 font-semibold">
                      Number of Travelers
                    </Label>
                    <Controller
                      name="travelerNumber"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}>
                          <SelectTrigger className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                            <SelectValue placeholder="Select number of travelers" />
                          </SelectTrigger>
                          <SelectContent>
                            {travelerOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option === "1"
                                  ? "1 Traveler"
                                  : `${option} Travelers`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-700 font-semibold mb-2">
                    Preferred Date & Time
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="date" className="sr-only">
                        Preferred Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        {...register("date")}
                        className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="sr-only">
                        Preferred Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        {...register("time")}
                        className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timeAvailable" className="sr-only">
                        Time Available
                      </Label>
                      <Controller
                        name="timeAvailable"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}>
                            <SelectTrigger className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                              <SelectValue placeholder="Select time available" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="package"
                    className="text-gray-700 font-semibold">
                    Package Selection *
                  </Label>
                  <Controller
                    name="packageId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                          <SelectValue placeholder="Select a package" />
                        </SelectTrigger>
                        <SelectContent>
                          {packages.map((pkg) => (
                            <SelectItem
                              key={pkg.id}
                              value={pkg.id.toString()}>
                              {pkg.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.packageId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.packageId.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-gray-700 font-semibold">
                    Language Preference
                  </Label>
                  {languageError ? (
                    <div className="mt-2 text-red-500 text-sm">
                      {languageError}
                    </div>
                  ) : (
                    <Controller
                      name="languages"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => field.onChange([value])}
                          value={field.value[0] || ""}>
                          <SelectTrigger className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500">
                            <SelectValue placeholder="Select preferred languages">
                              {field.value.length > 0
                                ? languages.find((l) => l.code === field.value[0])?.name || ""
                                : "Select languages"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="max-h-60 overflow-y-auto">
                            {languages.map((language) => (
                              <SelectItem
                                key={language.code}
                                value={language.code}>
                                {language.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  )}
                </div>

                <div>
                  <Label className="text-gray-700 font-semibold">
                    Special Interests
                  </Label>
                  <Controller
                    name="specialInterests"
                    control={control}
                    render={({ field }) => (
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {interests.map((interest) => (
                          <div
                            key={interest}
                            className="flex items-center space-x-2">
                            <Checkbox
                              id={`interest-${interest}`}
                              checked={field.value.includes(interest)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, interest])
                                  : field.onChange(
                                      field.value.filter(
                                        (value) => value !== interest
                                      )
                                    )
                              }}
                              className="border-gray-300 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                            />
                            <Label
                              htmlFor={`interest-${interest}`}
                              className="text-sm font-medium text-gray-700 cursor-pointer">
                              {interest}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <Label
                    htmlFor="additionalNote"
                    className="text-gray-700 font-semibold">
                    Additional Notes
                  </Label>
                  <Textarea
                    id="additionalNote"
                    {...register("additionalNote")}
                    placeholder="Anything you'd like us to know..."
                    className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500 min-h-[100px]"
                  />
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send My Request"}
                  </Button>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Don&apos;t worry, your details are safe with us. We&apos;ll
                    only use them to plan your adventure.
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