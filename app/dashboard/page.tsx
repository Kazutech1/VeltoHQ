"use client"

import { Bell, Search, User, TrendingUp, TrendingDown, Package, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TrialBanner } from "@/components/trial-banner"

export default function Dashboard() {
  const summaryCards = [
    {
      title: "Total Revenue",
      value: "₦2,450,000",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Total Expenses",
      value: "₦1,200,000",
      change: "+8.2%",
      trend: "up",
      icon: TrendingDown,
      color: "text-red-600",
    },
    {
      title: "Inventory Value",
      value: "₦850,000",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: "Net Profit",
      value: "₦1,250,000",
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <TrialBanner />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryCards.map((card, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{card.title}</CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                <div className="flex items-center space-x-1 mt-1">
                  {card.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs font-medium ${card.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {card.change}
                  </span>
                  <span className="text-xs text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { product: "Office Supplies", amount: "₦45,000", time: "2 hours ago" },
                  { product: "Software License", amount: "₦120,000", time: "4 hours ago" },
                  { product: "Marketing Materials", amount: "₦25,000", time: "6 hours ago" },
                  { product: "Equipment Rental", amount: "₦80,000", time: "1 day ago" },
                ].map((sale, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{sale.product}</p>
                      <p className="text-sm text-gray-500">{sale.time}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {sale.amount}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { product: "Printer Paper", stock: "5 units", status: "critical" },
                  { product: "Ink Cartridges", stock: "12 units", status: "low" },
                  { product: "USB Cables", stock: "8 units", status: "low" },
                  { product: "Notebooks", stock: "15 units", status: "medium" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{item.product}</p>
                      <p className="text-sm text-gray-500">{item.stock} remaining</p>
                    </div>
                    <Badge
                      variant={item.status === "critical" ? "destructive" : "secondary"}
                      className={
                        item.status === "critical"
                          ? "bg-red-100 text-red-800"
                          : item.status === "low"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
