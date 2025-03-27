"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { saveNavbarSection } from "@/app/actions"

interface NavbarFormProps {
  onSubmit: (data: any) => void
  initialData?: any
}

export function NavbarForm({ onSubmit, initialData }: NavbarFormProps) {
  const [formData, setFormData] = useState({
    logo: initialData?.logo || "Your Brand",
    menuItems: initialData?.menuItems || [
      { label: "Home", url: "/" },
      { label: "About", url: "/about" },
      { label: "Contact", url: "/contact" }
    ],
    ctaButton: initialData?.ctaButton || {
      label: "Get Started",
      url: "/get-started"
    },
    showCta: initialData?.showCta !== undefined ? initialData.showCta : true
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleMenuItemChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updatedMenuItems = [...prev.menuItems]
      updatedMenuItems[index] = {
        ...updatedMenuItems[index],
        [field]: value
      }
      return {
        ...prev,
        menuItems: updatedMenuItems
      }
    })
  }
  
  const handleCtaChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      ctaButton: {
        ...prev.ctaButton,
        [field]: value
      }
    }))
  }
  
  const addMenuItem = () => {
    setFormData(prev => ({
      ...prev,
      menuItems: [...prev.menuItems, { label: "", url: "" }]
    }))
  }
  
  const removeMenuItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      menuItems: prev.menuItems.filter((_, i) => i !== index)
    }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Call server action  => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Call server action
      const result = await saveNavbarSection(formData)
      
      // Pass data to parent component
      onSubmit(formData)
    } catch (error) {
      console.error("Error saving navbar section:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
  \
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="logo" className="text-white">Logo Text</Label>
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
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-white text-lg">Menu Items</Label>
            <Button 
              type="button" 
              onClick={addMenuItem}
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Menu Item
            </Button>
          </div>
          
          {formData.menuItems.map((item, index) => (
            <div key={index} className="space-y-3 p-4 border border-slate-700 rounded-md">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">Menu Item {index + 1}</h4>
                <Button
                  type="button"
                  onClick={() => removeMenuItem(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`menu-${index}-label`} className="text-white">Label</Label>
                  <Input
                    id={`menu-${index}-label`}
                    value={item.label}
                    onChange={(e) => handleMenuItemChange(index, "label", e.target.value)}
                    placeholder="Home"
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor={`menu-${index}-url`} className="text-white">URL</Label>
                  <Input
                    id={`menu-${index}-url`}
                    value={item.url}
                    onChange={(e) => handleMenuItemChange(index, "url", e.target.value)}
                    placeholder="/"
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showCta"
              checked={formData.showCta}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, showCta: checked === true }))
              }
            />
            <Label 
              htmlFor="showCta"
              className="text-white font-normal"
            >
              Show CTA Button
            </Label>
          </div>
          
          {formData.showCta && (
            <div className="space-y-3 p-4 border border-slate-700 rounded-md">
              <h4 className="text-white font-medium">CTA Button</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cta-label" className="text-white">Label</Label>
                  <Input
                    id="cta-label"
                    value={formData.ctaButton.label}
                    onChange={(e) => handleCtaChange("label", e.target.value)}
                    placeholder="Get Started"
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="cta-url" className="text-white">URL</Label>
                  <Input
                    id="cta-url"
                    value={formData.ctaButton.url}
                    onChange={(e) => handleCtaChange("url", e.target.value)}
                    placeholder="/get-started"
                    required
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-white text-slate-900 hover:bg-gray-200"
      >
        {isSubmitting ? "Saving..." : "Save Navigation Bar"}
      </Button>
    </form>
  )
}

