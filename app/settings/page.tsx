"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Building2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function Settings() {
  const [logoPreview, setLogoPreview] = useState<string | null>("/placeholder.svg?height=80&width=80")
  const [isLoading, setIsLoading] = useState(false)
  const [currency, setCurrency] = useState("ngn")
  const { toast } = useToast()
  const router = useRouter()

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

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const companyName = formData.get("companyName") as string
    const companyEmail = formData.get("companyEmail") as string

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (companyName && companyEmail) {
      // Update company data in localStorage
      const existingData = JSON.parse(localStorage.getItem("companySetup") || "{}")
      const updatedData = {
        ...existingData,
        name: companyName,
        email: companyEmail,
        currency,
        logo: logoPreview,
        lastUpdated: new Date().toISOString(),
      }

      localStorage.setItem("companySetup", JSON.stringify(updatedData))

      toast({
        title: "Settings Saved",
        description: "Your company settings have been updated successfully.",
      })
    }

    setIsLoading(false)
  }

  const handleResetToDefault = () => {
    // Reset form to default values
    setCurrency("ngn")
    setLogoPreview("/placeholder.svg?height=80&width=80")

    toast({
      title: "Settings Reset",
      description: "Settings have been reset to default values.",
    })
  }

  const handleDeleteCompany = () => {
    if (confirm("Are you sure you want to delete your company? This action cannot be undone.")) {
      // Clear all data
      localStorage.clear()

      toast({
        title: "Company Deleted",
        description: "Your company data has been permanently deleted.",
        variant: "destructive",
      })

      // Redirect to login
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
          <p className="text-gray-600">Manage your company information and preferences</p>
        </div>

        {/* Company Information */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Company Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveChanges} className="space-y-6">
              {/* Logo Section */}
              <div className="space-y-4">
                <Label>Company Logo</Label>
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 border-2 border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                    {logoPreview ? (
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Company logo"
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
                      Upload New Logo
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Company Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    name="companyName"
                    defaultValue="VeltoHQ Technologies"
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Company Email</Label>
                  <Input
                    id="company-email"
                    name="companyEmail"
                    type="email"
                    defaultValue="admin@veltohq.com"
                    className="h-11"
                    required
                  />
                </div>
              </div>

              {/* Currency Selection */}
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="h-11 max-w-xs">
                    <SelectValue />
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

              <Separator />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={handleResetToDefault}>
                  Reset to Default
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="shadow-sm border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center space-x-2">
              <Trash2 className="h-5 w-5" />
              <span>Danger Zone</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Delete Company</h3>
              <p className="text-sm text-gray-600 mb-4">
                Once you delete your company, there is no going back. Please be certain.
              </p>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleDeleteCompany}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Company
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
