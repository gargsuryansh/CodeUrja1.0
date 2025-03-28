"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"
import { saveFaqSection } from "@/app/actions"

interface FaqFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function FaqForm({ onSubmit, initialData }: FaqFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "Frequently Asked Questions",
    subtitle: initialData?.subtitle || "Find answers to common questions about our services",
    faqs: initialData?.faqs || [{ question: "", answer: "" }],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFaqChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedFaqs = [...prev.faqs]
      updatedFaqs[index] = {
        ...updatedFaqs[index],
        [field]: value,
      }
      return {
        ...prev,
        faqs: updatedFaqs,
      }
    })
  }

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }))
  }

  const removeFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call server action to save data
      const result = await saveFaqSection(formData)

      // Pass data to parent component
      onSubmit(formData)
    } catch (error) {
      console.error("Error saving FAQ section:", error)
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
            placeholder="Frequently Asked Questions"
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
            placeholder="Find answers to common questions about our services"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            rows={2}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-white text-lg">FAQs</Label>
            <Button
              type="button"
              onClick={addFaq}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add FAQ
            </Button>
          </div>

          {formData.faqs.map((faq, index) => (
            <div key={index} className="space-y-3 p-4 border border-slate-700 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">FAQ {index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeFaq(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`faq-${index}-question`} className="text-white">
                  Question
                </Label>
                <Input
                  id={`faq-${index}-question`}
                  value={faq.question}
                  onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                  placeholder="Enter a question"
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`faq-${index}-answer`} className="text-white">
                  Answer
                </Label>
                <Textarea
                  id={`faq-${index}-answer`}
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                  placeholder="Enter the answer"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-slate-900 hover:bg-gray-200">
        {isSubmitting ? "Saving..." : "Save FAQ Section"}
      </Button>
    </form>
  )
}

