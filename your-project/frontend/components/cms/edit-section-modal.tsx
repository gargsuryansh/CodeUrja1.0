"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { HeroForm } from "@/components/cms/hero-form"
import { FeaturesForm } from "@/components/cms/features-form"
import { TestimonialsForm } from "@/components/cms/testimonials-form"
import { CTAForm } from "@/components/cms/cta-form"

interface EditSectionModalProps {
  section: string
  data: any
  onClose: () => void
  onSave: (data: any) => void
}

export function EditSectionModal({ section, data, onClose, onSave }: EditSectionModalProps) {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  const handleSave = (updatedData: any) => {
    onSave(updatedData)
    setIsOpen(false)
  }

  // Get human-readable section name
  const getSectionName = (section: string) => {
    const nameMap: Record<string, string> = {
      hero: "Hero Section",
      features: "Features",
      testimonials: "Testimonials",
      cta: "Call to Action",
    }

    return nameMap[section] || section
  }

  const renderForm = () => {
    switch (section) {
      case "hero":
        return <HeroForm onSubmit={handleSave} initialData={data} />
      case "features":
        return <FeaturesForm onSubmit={handleSave} initialData={data} />
      case "testimonials":
        return <TestimonialsForm onSubmit={handleSave} initialData={data} />
      case "cta":
        return <CTAForm onSubmit={handleSave} initialData={data} />
      default:
        return <div>Unknown section type</div>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit {getSectionName(section)}</DialogTitle>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  )
}

