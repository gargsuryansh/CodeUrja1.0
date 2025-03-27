"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

// Import existing forms
import { HeroForm } from "@/components/cms/hero-form"
import { FeaturesForm } from "@/components/cms/features-form"
import { TestimonialsForm } from "@/components/cms/testimonials-form"
import { CTAForm } from "@/components/cms/cta-form"

// Page type definitions
const pageTypes = {
  home: {
    name: "Home Page",
    sections: ["hero", "features", "testimonials", "cta"],
  },
  about: {
    name: "About Page",
    sections: ["hero", "features", "testimonials"],
  },
  contact: {
    name: "Contact Page",
    sections: ["hero", "cta"],
  },
  blog: {
    name: "Blog Page",
    sections: ["hero", "features"],
  },
  ecommerce: {
    name: "E-commerce Page",
    sections: ["hero", "features", "cta"],
  },
}

export default function CreatePage() {
  const router = useRouter()
  const [pageType, setPageType] = useState("home")
  const [activeTab, setActiveTab] = useState("")
  const [formData, setFormData] = useState({})

  // Initialize sections based on page type
  const sections = pageTypes?.sections || []

  // Set active tab to first section when page type changes
  const handlePageTypeChange = (value ) => {
    setPageType(value)
    const newSections = pageTypes?.sections || []
    setActiveTab(newSections[0] || "")
  }

  // Initialize active tab if not set
  if (!activeTab && sections.length > 0) {
    setActiveTab(sections[0])
  }

  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  const handleSectionSubmit = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }))

    // Move to next tab if available
    const currentIndex = sections.indexOf(section)
    if (currentIndex < sections.length - 1) {
      setActiveTab(sections[currentIndex + 1])
    }
  }

  const goToPreview = () => {
    // Save form data to localStorage for the preview page to access
    localStorage.setItem(
      "cmsFormData",
      JSON.stringify({
        pageType,
        sections: formData,
      }),
    )
    router.push("/cms/preview")
  }

  const isTabComplete = (tab) => {
    return formData[tab] !== undefined
  }

  const areAllSectionsComplete = () => {
    return sections.every((section) => formData[section] !== undefined)
  }

  // Get the form component for a section
  const getSectionForm = (section) => {
    switch (section) {
      case "hero":
        return <HeroForm onSubmit={(data) => handleSectionSubmit("hero", data)} initialData={formData.hero} />
      case "features":
        return (
          <FeaturesForm onSubmit={(data) => handleSectionSubmit("features", data)} initialData={formData.features} />
        )
      case "testimonials":
        return (
          <TestimonialsForm
            onSubmit={(data) => handleSectionSubmit("testimonials", data)}
            initialData={formData.testimonials}
          />
        )
      case "cta":
        return <CTAForm onSubmit={(data) => handleSectionSubmit("cta", data)} initialData={formData.cta} />
      default:
        return <div>Unknown section type</div>
    }
  }

  // Get human-readable section name
  const getSectionName = (section) => {
    const nameMap = {
      hero: "Hero Section",
      features: "Features",
      testimonials: "Testimonials",
      cta: "Call to Action",
    }

    return nameMap[section] || section
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <div className="flex-1 container max-w-5xl py-8">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => router.push("/cms")}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to CMS
          </Button>
        </div>

        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Create New Page</CardTitle>
            <CardDescription className="text-slate-400">Select a page type and fill out each section</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Label htmlFor="pageType" className="text-white mb-2 block">
                Page Type
              </Label>
              <Select value={pageType} onValueChange={handlePageTypeChange}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select page type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600 text-white">
                  {Object.entries(pageTypes).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {sections.length > 0 && (
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-2 sm:grid-cols-4 bg-slate-700">
                  {sections.map((section) => (
                    <TabsTrigger
                      key={section}
                      value={section}
                      className="data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                    >
                      {getSectionName(section)}
                      {isTabComplete(section) && <Check className="ml-2 h-4 w-4 text-green-500" />}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {sections.map((section) => (
                  <TabsContent key={section} value={section} className="mt-6">
                    {getSectionForm(section)}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                const currentIndex = sections.indexOf(activeTab)
                if (currentIndex > 0) {
                  setActiveTab(sections[currentIndex - 1])
                }
              }}
              disabled={sections.indexOf(activeTab) === 0}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Previous
            </Button>

            <Button
              onClick={goToPreview}
              disabled={!areAllSectionsComplete()}
              className="bg-white text-slate-900 hover:bg-gray-200"
            >
              Preview
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

