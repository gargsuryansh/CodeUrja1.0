"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"
import { saveFeaturesSection } from "@/app/actions"

interface FeaturesFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function FeaturesForm({ onSubmit, initialData }: FeaturesFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "Features",
    subtitle: initialData?.subtitle || "What makes our product special",
    features: initialData?.features || [{ title: "", description: "", icon: "Zap" }],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFeatureChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.features]
      updatedFeatures[index] = {
        ...updatedFeatures[index],
        [field]: value,
      }
      return {
        ...prev,
        features: updatedFeatures,
      }
    })
  }

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { title: "", description: "", icon: "Zap" }],
    }))
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call server action to save data
      const result = await saveFeaturesSection(formData)

      // Pass data to parent component
      onSubmit(formData)
    } catch (error) {
      console.error("Error saving features section:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="title" className="text-white">
            Section Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Features"
            required
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subtitle" className="text-white">
            Section Subtitle
          </Label>
          <Textarea
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="What makes our product special"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            rows={2}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-white text-lg">Features</Label>
            <Button
              type="button"
              onClick={addFeature}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Feature
            </Button>
          </div>

          {formData.features.map((feature, index) => (
            <div key={index} className="space-y-3 p-4 border border-slate-700 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">Feature {index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeFeature(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`feature-${index}-title`} className="text-white">
                  Title
                </Label>
                <Input
                  id={`feature-${index}-title`}
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                  placeholder="Feature title"
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`feature-${index}-description`} className="text-white">
                  Description
                </Label>
                <Textarea
                  id={`feature-${index}-description`}
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                  placeholder="Feature description"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  rows={2}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`feature-${index}-icon`} className="text-white">
                  Icon
                </Label>
                <Input
                  id={`feature-${index}-icon`}
                  value={feature.icon}
                  onChange={(e) => handleFeatureChange(index, "icon", e.target.value)}
                  placeholder="Icon name (e.g., Zap, Star, Shield)"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-slate-900 hover:bg-gray-200">
        {isSubmitting ? "Saving..." : "Save Features Section"}
      </Button>
    </form>
  )
}

