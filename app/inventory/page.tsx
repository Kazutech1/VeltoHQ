"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  category: string
  quantity: number
  unitPrice: number
  totalValue: number
}

export default function Inventory() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Office Desk",
      category: "Furniture",
      quantity: 25,
      unitPrice: 45000,
      totalValue: 1125000,
    },
    {
      id: 2,
      name: "Laptop Computer",
      category: "Electronics",
      quantity: 12,
      unitPrice: 350000,
      totalValue: 4200000,
    },
    {
      id: 3,
      name: "Printer Paper",
      category: "Supplies",
      quantity: 5,
      unitPrice: 2500,
      totalValue: 12500,
    },
    {
      id: 4,
      name: "Office Chair",
      category: "Furniture",
      quantity: 30,
      unitPrice: 25000,
      totalValue: 750000,
    },
    {
      id: 5,
      name: "Projector",
      category: "Electronics",
      quantity: 8,
      unitPrice: 120000,
      totalValue: 960000,
    },
  ])

  const categories = ["all", "Electronics", "Furniture", "Supplies"]
  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const totalInventoryValue = products.reduce((sum, product) => sum + product.totalValue, 0)
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0)

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("productName") as string
    const category = formData.get("category") as string
    const quantity = Number.parseInt(formData.get("quantity") as string)
    const unitPrice = Number.parseInt(formData.get("unitPrice") as string)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (name && category && quantity && unitPrice) {
      const newProduct: Product = {
        id: products.length + 1,
        name,
        category,
        quantity,
        unitPrice,
        totalValue: quantity * unitPrice,
      }

      setProducts([...products, newProduct])
      setIsAddModalOpen(false)

      toast({
        title: "Product Added",
        description: `${name} has been added to inventory successfully.`,
      })

      // Reset form
      e.currentTarget.reset()
    }

    setIsLoading(false)
  }

  const handleDeleteProduct = (id: number) => {
    const product = products.find((p) => p.id === id)
    setProducts(products.filter((p) => p.id !== id))

    toast({
      title: "Product Deleted",
      description: `${product?.name} has been removed from inventory.`,
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600">Manage your products and stock levels</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" name="productName" placeholder="Enter product name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Supplies">Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" name="quantity" type="number" placeholder="Enter quantity" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit-price">Unit Price (₦)</Label>
                  <Input id="unit-price" name="unitPrice" type="number" placeholder="Enter unit price" required />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Product"}
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Total Inventory Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">₦{totalInventoryValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{totalItems} units</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Products</CardTitle>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={product.quantity < 10 ? "text-red-600 font-medium" : ""}>
                        {product.quantity}
                      </span>
                    </TableCell>
                    <TableCell>₦{product.unitPrice.toLocaleString()}</TableCell>
                    <TableCell className="font-medium">₦{product.totalValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            toast({ title: "Edit Product", description: "Edit functionality would open here" })
                          }
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
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
