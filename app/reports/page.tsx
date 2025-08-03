"use client"

import { Download, TrendingUp, DollarSign, CreditCard, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useToast } from "@/hooks/use-toast"

export default function Reports() {
  const { toast } = useToast()

  const monthlyData = [
    { month: "Jan", revenue: 2200000, expenses: 1100000 },
    { month: "Feb", revenue: 2800000, expenses: 1300000 },
    { month: "Mar", revenue: 2100000, expenses: 1200000 },
    { month: "Apr", revenue: 3200000, expenses: 1400000 },
    { month: "May", revenue: 2900000, expenses: 1250000 },
    { month: "Jun", revenue: 3500000, expenses: 1500000 },
  ]

  const expenseCategories = [
    { name: "Rent", value: 150000, color: "#3B82F6" },
    { name: "Utilities", value: 75000, color: "#10B981" },
    { name: "Marketing", value: 120000, color: "#F59E0B" },
    { name: "Supplies", value: 85000, color: "#EF4444" },
    { name: "Software", value: 95000, color: "#8B5CF6" },
  ]

  const summaryStats = [
    {
      title: "Net Profit",
      value: "₦1,250,000",
      change: "+15.3%",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Total Sales",
      value: "₦2,450,000",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      title: "Total Expenses",
      value: "₦1,200,000",
      change: "+8.2%",
      icon: CreditCard,
      color: "text-red-600",
    },
    {
      title: "Salary Paid",
      value: "₦760,000",
      change: "+5.1%",
      icon: Users,
      color: "text-purple-600",
    },
  ]

  const handleExport = (type: string) => {
    toast({
      title: "Export Started",
      description: `Your ${type} report is being generated and will be downloaded shortly.`,
    })

    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `${type} report has been downloaded successfully.`,
      })
    }, 2000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => handleExport("All Reports")}>
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryStats.map((stat, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-medium text-green-600">{stat.change}</span>
                  <span className="text-xs text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue vs Expenses Chart */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Monthly Revenue vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(value: number) => [`₦${value.toLocaleString()}`, ""]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                  <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expenses by Category Pie Chart */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`₦${value.toLocaleString()}`, "Amount"]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Export Options */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-transparent"
                onClick={() => handleExport("PDF")}
              >
                <Download className="h-4 w-4" />
                <span>Export as PDF</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-transparent"
                onClick={() => handleExport("CSV")}
              >
                <Download className="h-4 w-4" />
                <span>Export as CSV</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-transparent"
                onClick={() => handleExport("Financial Summary")}
              >
                <Download className="h-4 w-4" />
                <span>Export Financial Summary</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-transparent"
                onClick={() => handleExport("Staff Report")}
              >
                <Download className="h-4 w-4" />
                <span>Export Staff Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
