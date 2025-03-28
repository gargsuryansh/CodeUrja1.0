"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { saveCTASection } from "@/app/actions"

interface CTAFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function CTAForm({ onSubmit, initialData }: CTAFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "Ready to get started?",
    subtitle: initialData?.subtitle || "Join thousands of satisfied customers today.",
    primaryButtonText: initialData?.primaryButtonText || "Get Started",
    primaryButtonLink: initialData?.primaryButtonLink || "#",
    secondaryButtonText: initialData?.secondaryButtonText || "Learn More",
    secondaryButtonLink: initialData?.secondaryButtonLink || "#",
    backgroundColor: initialData?.backgroundColor || "#1e293b",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call server action to save data
      const result = await saveCTASection(formData)

      // Pass data to parent component
      onSubmit(formData)
    } catch (error) {
      console.error("Error saving CTA section:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="title" className="text-white">
            CTA Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ready to get started?"
            required
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subtitle" className="text-white">
            CTA Subtitle
          </Label>
          <Textarea
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Join thousands of satisfied customers today."
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="primaryButtonText" className="text-white">
              Primary Button Text
            </Label>
            <Input
              id="primaryButtonText"
              name="primaryButtonText"
              value={formData.primaryButtonText}
              onChange={handleChange}
              placeholder="Get Started"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="primaryButtonLink" className="text-white">
              Primary Button Link
            </Label>
            <Input
              id="primaryButtonLink"
              name="primaryButtonLink"
              value={formData.primaryButtonLink}
              onChange={handleChange}
              placeholder="#"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="secondaryButtonText" className="text-white">
              Secondary Button Text
            </Label>
            <Input
              id="secondaryButtonText"
              name="secondaryButtonText"
              value={formData.secondaryButtonText}
              onChange={handleChange}
              placeholder="Learn More"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="secondaryButtonLink" className="text-white">
              Secondary Button Link
            </Label>
            <Input
              id="secondaryButtonLink"
              name="secondaryButtonLink"
              value={formData.secondaryButtonLink}
              onChange={handleChange}
              placeholder="#"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="backgroundColor" className="text-white">
            Background Color
          </Label>
          <div className="flex gap-2">
            <Input
              id="backgroundColor"
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleChange}
              placeholder="#1e293b"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
            <div
              className="w-10 h-10 rounded border border-slate-600"
              style={{ backgroundColor: formData.backgroundColor }}
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-slate-900 hover:bg-gray-200">
        {isSubmitting ? "Saving..." : "Save CTA Section"}
      </Button>
    </form>
  )
}

