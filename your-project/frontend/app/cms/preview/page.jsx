"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Edit, Eye } from "lucide-react"
import { EditSectionModal } from "@/components/cms/edit-section-modal"

// Import preview components
import { HeroSection } from "@/components/preview/hero-section"
import { FeaturesSection } from "@/components/preview/features-section"
import { TestimonialsSection } from "@/components/preview/testimonials-section"
import { CTASection } from "@/components/preview/cta-section"

export default function PreviewPage() {
  const router = useRouter()
  const [pageData, setPageData] = useState(null)
  const [editSection, setEditSection] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Get form data from localStorage
    const savedData = localStorage.getItem("cmsFormData")
    if (savedData) {
      setPageData(JSON.parse(savedData))
    } else {
      // If no data, redirect back to create page
      router.push("/cms/create")
    }
  }, [router])

  const handleEditSection = (section) => {
    setEditSection(section)
    setIsModalOpen(true)
  }

  const handleSectionUpdate = (section, data) => {
    setPageData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: data,
      },
    }))

    // Save updated data to localStorage
    localStorage.setItem(
      "cmsFormData",
      JSON.stringify({
        ...pageData,
        sections: {
          ...pageData.sections,
          [section]: data,
        },
      }),
    )

    setIsModalOpen(false)
  }

  const handleFinish = async () => {
    try {
      // Example API call - replace with your actual implementation
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pageData),
      })

      if (response.ok) {
        // Clear form data from localStorage
        localStorage.removeItem("cmsFormData")
        // Redirect back to CMS
        router.push("/cms")
      } else {
        console.error("Failed to save page")
      }
    } catch (error) {
      console.error("Error saving page:", error)
    }
  }

  if (!pageData) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">Loading...</div>
  }

  // Get the sections for the current page type
  const sections = pageData.sections || {}

  // Render a section based on its type
  const renderSection = (sectionType, sectionData) => {
    switch (sectionType) {
      case "hero":
        return <HeroSection data={sectionData} />
      case "features":
        return <FeaturesSection data={sectionData} />
      case "testimonials":
        return <TestimonialsSection data={sectionData} />
      case "cta":
        return <CTASection data={sectionData} />
      default:
        return <div>Unknown section type: {sectionType}</div>
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
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Preview navbar */}
      <div className="sticky top-0 z-50 bg-slate-800 border-b border-slate-700">
        <div className="container max-w-7xl py-4 px-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => router.push("/cms/create")}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                <Eye className="mr-2 h-4 w-4" />
                Preview Mode
              </Button>

              <Button onClick={handleFinish} className="bg-white text-slate-900 hover:bg-gray-200">
                <Check className="mr-2 h-4 w-4" />
                Finish
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Page preview */}
      <div className="bg-white text-slate-900">
        {/* Page sections */}
        {Object.entries(sections).map(([sectionType, sectionData]) => (
          <div key={sectionType} className="relative group">
            <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                onClick={() => handleEditSection(sectionType)}
                className="bg-slate-900 text-white hover:bg-slate-800"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit {getSectionName(sectionType)}
              </Button>
            </div>
            {renderSection(sectionType, sectionData)}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editSection && (
        <EditSectionModal
          section={editSection}
          data={sections[editSection]}
          onClose={() => setIsModalOpen(false)}
          onSave={(data) => handleSectionUpdate(editSection, data)}
        />
      )}
    </div>
  )
}

