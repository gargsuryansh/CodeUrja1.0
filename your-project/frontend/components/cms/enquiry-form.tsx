"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { saveEnquiryFormSection } from "@/app/actions"

interface EnquiryFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function EnquiryForm({ onSubmit, initialData }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "Contact Us",
    subtitle: initialData?.subtitle || "We'd love to hear from you. Fill out the form below.",
    recipientEmail: initialData?.recipientEmail || "",
    fields: initialData?.fields || [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel", required: false },
      { name: "message", label: "Message", type: "textarea", required: true },
    ],
    submitButtonText: initialData?.submitButtonText || "Send Message",
    successMessage: initialData?.successMessage || "Thank you! Your message has been sent.",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFieldChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const updatedFields = [...prev.fields]
      updatedFields[index] = {
        ...updatedFields[index],
        [field]: value,
      }
      return {
        ...prev,
        fields: updatedFields,
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call server action to save data
      const result = await saveEnquiryFormSection(formData)

      // Pass data to parent component
      onSubmit(formData)
    } catch (error) {
      console.error("Error saving enquiry form section:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="title" className="text-white">
            Form Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Contact Us"
            required
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="subtitle" className="text-white">
            Form Subtitle
          </Label>
          <Textarea
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="We'd love to hear from you. Fill out the form below."
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            rows={2}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="recipientEmail" className="text-white">
            Recipient Email
          </Label>
          <Input
            id="recipientEmail"
            name="recipientEmail"
            type="email"
            value={formData.recipientEmail}
            onChange={handleChange}
            placeholder="contact@example.com"
            required
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
          <p className="text-sm text-slate-400">Enquiries will be sent to this email address</p>
        </div>

        <div className="space-y-4">
          <Label className="text-white text-lg">Form Fields</Label>

          {formData.fields.map((field, index) => (
            <div key={index} className="space-y-3 p-4 border border-slate-700 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`field-${index}-name`} className="text-white">
                    Field Name
                  </Label>
                  <Input
                    id={`field-${index}-name`}
                    value={field.name}
                    onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                    placeholder="name"
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={`field-${index}-label`} className="text-white">
                    Field Label
                  </Label>
                  <Input
                    id={`field-${index}-label`}
                    value={field.label}
                    onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                    placeholder="Name"
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`field-${index}-type`} className="text-white">
                    Field Type
                  </Label>
                  <select
                    id={`field-${index}-type`}
                    value={field.type}
                    onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                    className="bg-slate-700 border border-slate-600 text-white rounded-md p-2"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="textarea">Textarea</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 mt-8">
                  <Checkbox
                    id={`field-${index}-required`}
                    checked={field.required}
                    onCheckedChange={(checked) => handleFieldChange(index, "required", checked === true)}
                  />
                  <Label htmlFor={`field-${index}-required`} className="text-white font-normal">
                    Required field
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="submitButtonText" className="text-white">
            Submit Button Text
          </Label>
          <Input
            id="submitButtonText"
            name="submitButtonText"
            value={formData.submitButtonText}
            onChange={handleChange}
            placeholder="Send Message"
            required
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="successMessage" className="text-white">
            Success Message
          </Label>
          <Textarea
            id="successMessage"
            name="successMessage"
            value={formData.successMessage}
            onChange={handleChange}
            placeholder="Thank you! Your message has been sent."
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            rows={2}
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-slate-900 hover:bg-gray-200">
        {isSubmitting ? "Saving..." : "Save Enquiry Form"}
      </Button>
    </form>
  )
}

