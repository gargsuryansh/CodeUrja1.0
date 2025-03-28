"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash } from "lucide-react"
import { saveFooterSection } from "@/app/actions"

interface FooterFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function FooterForm({ onSubmit, initialData }: FooterFormProps) {
  const [formData, setFormData] = useState({
    logo: initialData?.logo || "Your Brand",
    tagline: initialData?.tagline || "Your company tagline goes here",
    columns: initialData?.columns || [
      {
        title: "Company",
        links: [
          { label: "About", url: "/about" },
          { label: "Careers", url: "/careers" },
          { label: "Contact", url: "/contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", url: "/blog" },
          { label: "Documentation", url: "/docs" },
          { label: "Help Center", url: "/help" },
        ],
      },
    ],
    bottomText: initialData?.bottomText || `© ${new Date().getFullYear()} Your Company. All rights reserved.`,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleColumnChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedColumns = [...prev.columns]
      updatedColumns[index] = {
        ...updatedColumns[index],
        [field]: value,
      }
      return {
        ...prev,
        columns: updatedColumns,
      }
    })
  }

  const handleLinkChange = (columnIndex: number, linkIndex: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedColumns = [...prev.columns]
      const updatedLinks = [...updatedColumns[columnIndex].links]
      updatedLinks[linkIndex] = {
        ...updatedLinks[linkIndex],
        [field]: value,
      }
      updatedColumns[columnIndex] = {
        ...updatedColumns[columnIndex],
        links: updatedLinks,
      }
      return {
        ...prev,
        columns: updatedColumns,
      }
    })
  }

  const addColumn = () => {
    setFormData((prev) => ({
      ...prev,
      columns: [...prev.columns, { title: "", links: [{ label: "", url: "" }] }],
    }))
  }

  const removeColumn = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      columns: prev.columns.filter((_, i) => i !== index),
    }))
  }

  const addLink = (columnIndex: number) => {
    setFormData((prev) => {
      const updatedColumns = [...prev.columns]
      updatedColumns[columnIndex] = {
        ...updatedColumns[columnIndex],
        links: [...updatedColumns[columnIndex].links, { label: "", url: "" }],
      }
      return {
        ...prev,
        columns: updatedColumns,
      }
    })
  }

  const removeLink = (columnIndex: number, linkIndex: number) => {
    setFormData((prev) => {
      const updatedColumns = [...prev.columns]
      updatedColumns[columnIndex] = {
        ...updatedColumns[columnIndex],
        links: updatedColumns[columnIndex].links.filter((_, i) => i !== linkIndex),
      }
      return {
        ...prev,
        columns: updatedColumns,
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Call server action
      const result = await saveFooterSection(formData)

      // Pass data to parent component
      onSubmit(formData)
    } catch (error) {
      console.error("Error saving footer section:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="logo" className="text-white">
            Logo Text
          </Label>
          <Input
            id="logo"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            placeholder="Your Brand"
            required
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tagline" className="text-white">
            Tagline
          </Label>
          <Textarea
            id="tagline"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="Your company tagline goes here"
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            rows={2}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-white text-lg">Footer Columns</Label>
            <Button
              type="button"
              onClick={addColumn}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Column
            </Button>
          </div>

          {formData.columns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-3 p-4 border border-slate-700 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">Column {columnIndex + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeColumn(columnIndex)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`column-${columnIndex}-title`} className="text-white">
                  Title
                </Label>
                <Input
                  id={`column-${columnIndex}-title`}
                  value={column.title}
                  onChange={(e) => handleColumnChange(columnIndex, "title", e.target.value)}
                  placeholder="Company"
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Links</Label>
                  <Button
                    type="button"
                    onClick={() => addLink(columnIndex)}
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Link
                  </Button>
                </div>

                {column.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="grid grid-cols-2 gap-4 p-3 bg-slate-800 rounded-md">
                    <div className="grid gap-2">
                      <Label htmlFor={`column-${columnIndex}-link-${linkIndex}-label`} className="text-white text-sm">
                        Label
                      </Label>
                      <Input
                        id={`column-${columnIndex}-link-${linkIndex}-label`}
                        value={link.label}
                        onChange={(e) => handleLinkChange(columnIndex, linkIndex, "label", e.target.value)}
                        placeholder="About"
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`column-${columnIndex}-link-${linkIndex}-url`} className="text-white text-sm">
                          URL
                        </Label>
                        <Button
                          type="button"
                          onClick={() => removeLink(columnIndex, linkIndex)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 h-6 w-6 p-0"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                      <Input
                        id={`column-${columnIndex}-link-${linkIndex}-url`}
                        value={link.url}
                        onChange={(e) => handleLinkChange(columnIndex, linkIndex, "url", e.target.value)}
                        placeholder="/about"
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bottomText" className="text-white">
            Bottom Text
          </Label>
          <Textarea
            id="bottomText"
            name="bottomText"
            value={formData.bottomText}
            onChange={handleChange}
            placeholder={`© ${new Date().getFullYear()} Your Company. All rights reserved.`}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            rows={2}
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-white text-slate-900 hover:bg-gray-200">
        {isSubmitting ? "Saving..." : "Save Footer"}
      </Button>
    </form>
  )
}

