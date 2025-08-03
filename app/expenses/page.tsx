"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Filter } from "lucide-react"
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

interface Expense {
  id: number
  title: string
  category: string
  amount: number
  date: string
}

export default function Expenses() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      title: "Office Rent",
      category: "Rent",
      amount: 150000,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Internet & Phone Bills",
      category: "Utilities",
      amount: 25000,
      date: "2024-01-14",
    },
    {
      id: 3,
      title: "Marketing Campaign",
      category: "Marketing",
      amount: 75000,
      date: "2024-01-13",
    },
    {
      id: 4,
      title: "Office Supplies",
      category: "Supplies",
      amount: 18000,
      date: "2024-01-12",
    },
    {
      id: 5,
      title: "Software Subscriptions",
      category: "Software",
      amount: 45000,
      date: "2024-01-11",
    },
  ])

  const categories = ["all", "Rent", "Utilities", "Marketing", "Supplies", "Software"]
  const filteredExpenses =
    selectedCategory === "all" ? expenses : expenses.filter((expense) => expense.category === selectedCategory)

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" })

  const handleAddExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const category = formData.get("category") as string
    const amount = Number.parseInt(formData.get("amount") as string)
    const date = formData.get("date") as string

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (title && category && amount && date) {
      const newExpense: Expense = {
        id: expenses.length + 1,
        title,
        category,
        amount,
        date,
      }

      setExpenses([newExpense, ...expenses])
      setIsAddModalOpen(false)

      toast({
        title: "Expense Added",
        description: `${title} expense of ₦${amount.toLocaleString()} has been recorded.`,
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
            <h1 className="text-2xl font-bold text-gray-900">Expense Management</h1>
            <p className="text-gray-600">Track and manage your business expenses</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="expense-title">Expense Title</Label>
                  <Input id="expense-title" name="title" placeholder="Enter expense title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expense-category">Category</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rent">Rent</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Supplies">Supplies</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expense-amount">Amount (₦)</Label>
                  <Input id="expense-amount" name="amount" type="number" placeholder="Enter amount" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expense-date">Date</Label>
                  <Input id="expense-date" name="date" type="date" required />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Expense"}
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

        {/* Summary Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Total Expenses This Month</CardTitle>
            <p className="text-sm text-gray-600">{currentMonth}</p>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">₦{totalExpenses.toLocaleString()}</div>
            <p className="text-gray-600 mt-1">From {expenses.length} expense entries</p>
          </CardContent>
        </Card>

        {/* Expenses Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Expense History</CardTitle>
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
                  <TableHead>Expense Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{expense.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-red-600">₦{expense.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
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
