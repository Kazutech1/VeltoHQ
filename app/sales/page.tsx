"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

interface Sale {
  id: number
  product: string
  quantity: number
  unitPrice: number
  totalPrice: number
  date: string
}

export default function Sales() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [sales, setSales] = useState<Sale[]>([
    {
      id: 1,
      product: "Office Desk",
      quantity: 2,
      unitPrice: 45000,
      totalPrice: 90000,
      date: "2024-01-15",
    },
    {
      id: 2,
      product: "Laptop Computer",
      quantity: 1,
      unitPrice: 350000,
      totalPrice: 350000,
      date: "2024-01-14",
    },
    {
      id: 3,
      product: "Office Chair",
      quantity: 5,
      unitPrice: 25000,
      totalPrice: 125000,
      date: "2024-01-13",
    },
    {
      id: 4,
      product: "Projector",
      quantity: 1,
      unitPrice: 120000,
      totalPrice: 120000,
      date: "2024-01-12",
    },
    {
      id: 5,
      product: "Printer Paper",
      quantity: 10,
      unitPrice: 2500,
      totalPrice: 25000,
      date: "2024-01-11",
    },
  ])

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0)

  const handleAddSale = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const product = formData.get("product") as string
    const quantity = Number.parseInt(formData.get("quantity") as string)
    const unitPrice = Number.parseInt(formData.get("unitPrice") as string)
    const date = formData.get("date") as string

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (product && quantity && unitPrice && date) {
      const newSale: Sale = {
        id: sales.length + 1,
        product,
        quantity,
        unitPrice,
        totalPrice: quantity * unitPrice,
        date,
      }

      setSales([newSale, ...sales])
      setIsAddModalOpen(false)

      toast({
        title: "Sale Recorded",
        description: `Sale of ${quantity} ${product}(s) for ₦${(quantity * unitPrice).toLocaleString()} recorded successfully.`,
      })

      // Reset form
      e.currentTarget.reset()
    }

    setIsLoading(false)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sales Tracking</h1>
            <p className="text-gray-600">Monitor your sales performance and revenue</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Sale
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Record New Sale</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddSale} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sale-product">Product</Label>
                  <Input id="sale-product" name="product" placeholder="Enter product name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sale-quantity">Quantity</Label>
                  <Input id="sale-quantity" name="quantity" type="number" placeholder="Enter quantity" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sale-price">Unit Price (₦)</Label>
                  <Input id="sale-price" name="unitPrice" type="number" placeholder="Enter unit price" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sale-date">Date</Label>
                  <Input id="sale-date" name="date" type="date" required />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Recording..." : "Record Sale"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Revenue Summary */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₦{totalRevenue.toLocaleString()}</div>
            <p className="text-gray-600 mt-1">From {sales.length} sales transactions</p>
          </CardContent>
        </Card>

        {/* Date Range Filter */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Sales History</CardTitle>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Input type="date" className="w-40" />
                <span className="text-gray-500">to</span>
                <Input type="date" className="w-40" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast({ title: "Filter Applied", description: "Date range filter would be applied here" })
                  }
                >
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.product}</TableCell>
                    <TableCell>{sale.quantity}</TableCell>
                    <TableCell>₦{sale.unitPrice.toLocaleString()}</TableCell>
                    <TableCell className="font-medium text-green-600">₦{sale.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
