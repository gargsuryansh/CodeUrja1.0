"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"
import { saveWhyChooseUsSection } from "@/app/actions"

interface WhyChooseUsFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function WhyChooseUsForm({ onSubmit, initialData }: WhyChooseUsFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "Why Choose Us",
    subtitle: initialData?.subtitle || "Reasons to work with our company",
    reasons: initialData?.reasons || [{ title: "", description: "", icon: "Star" }],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleReasonChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedReasons = [...prev.reasons]
      updatedReasons[index] = {
        ...updatedReasons[index],
        [field]: value,
      }
      return {
        ...prev,
        reasons: updatedReasons,
      }
    })
  }

  const addReason = () => {
    setFormData((prev) => ({
      ...prev,
      reasons: [...prev.reasons, { title: "", description: "", icon: "Star" }],
    }))
  }

  const removeReason = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      reasons: prev.reasons.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call server action to save data
      const result = await saveWhyChooseUsSection(formData)

      // Pass data to parent component
      onSubmit(formData)
    } catch (error) {
      console.error("Error saving Why Choose Us section:", error)
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
            placeholder="Why Choose Us"
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
            placeholder="Reasons to work with our company"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            rows={2}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-white text-lg">Reasons</Label>
            <Button
              type="button"
              onClick={addReason}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Reason
            </Button>
          </div>

          {formData.reasons.map((reason, index) => (
            <div key={index} className="space-y-3 p-4 border border-slate-700 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">Reason {index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeReason(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`reason-${index}-title`} className="text-white">
                  Title
                </Label>
                <Input
                  id={`reason-${index}-title`}
                  value={reason.title}
                  onChange={(e) => handleReasonChange(index, "title", e.target.value)}
                  placeholder="Reason title"
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`reason-${index}-description`} className="text-white">
                  Description
                </Label>
                <Textarea
                  id={`reason-${index}-description`}
                  value={reason.description}
                  onChange={(e) => handleReasonChange(index, "description", e.target.value)}
                  placeholder="Reason description"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  rows={2}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`reason-${index}-icon`} className="text-white">
                  Icon
                </Label>
                <Input
                  id={`reason-${index}-icon`}
                  value={reason.icon}
                  onChange={(e) => handleReasonChange(index, "icon", e.target.value)}
                  placeholder="Icon name (e.g., Star, Shield, Award)"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-slate-900 hover:bg-gray-200">
        {isSubmitting ? "Saving..." : "Save Why Choose Us Section"}
      </Button>
    </form>
  )
}

