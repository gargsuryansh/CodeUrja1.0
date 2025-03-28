"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"
import { saveTestimonialsSection } from "@/app/actions"

interface TestimonialsFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function TestimonialsForm({ onSubmit, initialData }: TestimonialsFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "What Our Customers Say",
    subtitle: initialData?.subtitle || "Testimonials from our happy users",
    testimonials: initialData?.testimonials || [{ quote: "", author: "", role: "", avatarUrl: "" }],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTestimonialChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedTestimonials = [...prev.testimonials]
      updatedTestimonials[index] = {
        ...updatedTestimonials[index],
        [field]: value,
      }
      return {
        ...prev,
        testimonials: updatedTestimonials,
      }
    })
  }

  const addTestimonial = () => {
    setFormData((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, { quote: "", author: "", role: "", avatarUrl: "" }],
    }))
  }

  const removeTestimonial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call server action to save data
      const result = await saveTestimonialsSection(formData)

      // Pass data to parent component
      onSubmit(formData)
    } catch (error) {
      console.error("Error saving testimonials section:", error)
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
            placeholder="What Our Customers Say"
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
            placeholder="Testimonials from our happy users"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            rows={2}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-white text-lg">Testimonials</Label>
            <Button
              type="button"
              onClick={addTestimonial}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Testimonial
            </Button>
          </div>

          {formData.testimonials.map((testimonial, index) => (
            <div key={index} className="space-y-3 p-4 border border-slate-700 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">Testimonial {index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeTestimonial(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`testimonial-${index}-quote`} className="text-white">
                  Quote
                </Label>
                <Textarea
                  id={`testimonial-${index}-quote`}
                  value={testimonial.quote}
                  onChange={(e) => handleTestimonialChange(index, "quote", e.target.value)}
                  placeholder="Customer testimonial"
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`testimonial-${index}-author`} className="text-white">
                  Author
                </Label>
                <Input
                  id={`testimonial-${index}-author`}
                  value={testimonial.author}
                  onChange={(e) => handleTestimonialChange(index, "author", e.target.value)}
                  placeholder="Customer name"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`testimonial-${index}-role`} className="text-white">
                  Role/Company
                </Label>
                <Input
                  id={`testimonial-${index}-role`}
                  value={testimonial.role}
                  onChange={(e) => handleTestimonialChange(index, "role", e.target.value)}
                  placeholder="CEO at Company"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`testimonial-${index}-avatar`} className="text-white">
                  Avatar URL
                </Label>
                <Input
                  id={`testimonial-${index}-avatar`}
                  value={testimonial.avatarUrl}
                  onChange={(e) => handleTestimonialChange(index, "avatarUrl", e.target.value)}
                  placeholder="/images/avatar.jpg"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-slate-900 hover:bg-gray-200">
        {isSubmitting ? "Saving..." : "Save Testimonials Section"}
      </Button>
    </form>
  )
}

