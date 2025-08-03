"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function CompanySetup() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currency, setCurrency] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const companyName = formData.get("companyName") as string
    const companyEmail = formData.get("companyEmail") as string

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (companyName && companyEmail && currency) {
      // Store company setup in localStorage
      const companyData = {
        name: companyName,
        email: companyEmail,
        currency,
        logo: logoPreview,
        setupCompleted: true,
        setupDate: new Date().toISOString(),
      }

      localStorage.setItem("companySetup", JSON.stringify(companyData))

      toast({
        title: "Setup Complete!",
        description: "Your company profile has been created successfully.",
      })

      router.push("/dashboard")
    } else {
      toast({
        title: "Setup Failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's set up your company profile</h1>
          <p className="text-gray-600">Complete your business information to get started with VeltoHQ</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl text-center">Company Information</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Logo Upload */}
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    {logoPreview ? (
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Label
                      htmlFor="logo-upload"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                      Choose Logo
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name *</Label>
                <Input
                  id="company-name"
                  name="companyName"
                  type="text"
                  placeholder="Enter your company name"
                  className="h-11"
                  required
                />
              </div>

              {/* Company Email */}
              <div className="space-y-2">
                <Label htmlFor="company-email">Company Email *</Label>
                <Input
                  id="company-email"
                  name="companyEmail"
                  type="email"
                  placeholder="company@example.com"
                  className="h-11"
                  required
                />
              </div>

              {/* Currency Selection */}
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency *</Label>
                <Select value={currency} onValueChange={setCurrency} required>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ngn">Nigerian Naira (₦)</SelectItem>
                    <SelectItem value="usd">US Dollar ($)</SelectItem>
                    <SelectItem value="eur">Euro (€)</SelectItem>
                    <SelectItem value="gbp">British Pound (£)</SelectItem>
                    <SelectItem value="cad">Canadian Dollar (C$)</SelectItem>
                    <SelectItem value="aud">Australian Dollar (A$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-medium mt-8"
                disabled={isLoading}
              >
                {isLoading ? "Setting up..." : "Save and Continue"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-600 mt-6">
          You can always update this information later in Settings
        </p>
      </div>
    </div>
  )
}
