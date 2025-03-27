"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sendEnquiry } from "@/app/actions"

interface EnquiryFormSectionProps {
  data: {
    title: string
    subtitle: string
    recipientEmail: string
    fields: Array<{
      name: string
      label: string
      type: string
      required: boolean
    }>
    submitButtonText: string
    successMessage: string
  }
}

export function EnquiryFormSection({ data }: EnquiryFormSectionProps) {
  const [formState, setFormState] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // Add recipient email to the form data
      const enquiryData = {
        ...formState,
        recipientEmail: data.recipientEmail,
      }

      const result = await sendEnquiry(enquiryData)

      if (result.success) {
        setIsSuccess(true)
        setFormState({})
      } else {
        setErrorMessage(result.message || "Failed to send enquiry. Please try again.")
      }
    } catch (error) {
      console.error("Error sending enquiry:", error)
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{data.title}</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {data.subtitle}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-lg space-y-6 mt-8">
          {isSuccess ? (
            <div className="rounded-lg bg-green-50 p-6 text-center">
              <p className="text-green-800 font-medium">{data.successMessage}</p>
              <Button className="mt-4" onClick={() => setIsSuccess(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {data.fields.map((field, index) => (
                <div key={index} className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {field.type === "textarea" ? (
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={formState[field.name] || ""}
                      onChange={handleChange}
                      required={field.required}
                      className="min-h-[120px]"
                    />
                  ) : (
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formState[field.name] || ""}
                      onChange={handleChange}
                      required={field.required}
                    />
                  )}
                </div>
              ))}

              {errorMessage && <div className="rounded-lg bg-red-50 p-3 text-red-800 text-sm">{errorMessage}</div>}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : data.submitButtonText}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

