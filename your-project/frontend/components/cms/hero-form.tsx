"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { saveHeroSection } from "@/app/actions"

interface HeroFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function HeroForm({ onSubmit, initialData }: HeroFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    ctaText: initialData?.ctaText || "Get Started",
    ctaLink: initialData?.ctaLink || "#",
    imageUrl: initialData?.imageUrl || "/placeholder.svg",
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
      const result = await saveHeroSection(formData)

      // Pass data to parent component
      onSubmit(formData)
    } catch (error) {
      console.error("Error saving hero section:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="title" className="text-white">
            Hero Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a compelling title"
            required
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subtitle" className="text-white">
            Subtitle
          </Label>
          <Textarea
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Enter a subtitle or description"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="ctaText" className="text-white">
              CTA Button Text
            </Label>
            <Input
              id="ctaText"
              name="ctaText"
              value={formData.ctaText}
              onChange={handleChange}
              placeholder="Get Started"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ctaLink" className="text-white">
              CTA Button Link
            </Label>
            <Input
              id="ctaLink"
              name="ctaLink"
              value={formData.ctaLink}
              onChange={handleChange}
              placeholder="#"
              className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="imageUrl" className="text-white">
            Hero Image URL
          </Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="/images/hero.jpg"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-slate-900 hover:bg-gray-200">
        {isSubmitting ? "Saving..." : "Save Hero Section"}
      </Button>
    </form>
  )
}

