"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

interface StaffMember {
  id: number
  name: string
  role: string
  salary: number
  isPaid: boolean
}

export default function Staff() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: 1,
      name: "John Doe",
      role: "Manager",
      salary: 250000,
      isPaid: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Accountant",
      salary: 180000,
      isPaid: true,
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Sales Rep",
      salary: 150000,
      isPaid: false,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      role: "Marketing",
      salary: 170000,
      isPaid: false,
    },
    {
      id: 5,
      name: "David Brown",
      role: "IT Support",
      salary: 160000,
      isPaid: true,
    },
  ])

  const togglePaymentStatus = (id: number) => {
    setStaff(
      staff.map((member) => {
        if (member.id === id) {
          const updatedMember = { ...member, isPaid: !member.isPaid }
          toast({
            title: "Payment Status Updated",
            description: `${member.name} marked as ${updatedMember.isPaid ? "paid" : "unpaid"}.`,
          })
          return updatedMember
        }
        return member
      }),
    )
  }

  const handleAddStaff = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const role = formData.get("role") as string
    const salary = Number.parseInt(formData.get("salary") as string)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (name && role && salary) {
      const newStaff: StaffMember = {
        id: staff.length + 1,
        name,
        role,
        salary,
        isPaid: false,
      }

      setStaff([...staff, newStaff])
      setIsAddModalOpen(false)

      toast({
        title: "Staff Added",
        description: `${name} has been added to the team successfully.`,
      })

      // Reset form
      e.currentTarget.reset()
    }

    setIsLoading(false)
  }

  const totalStaff = staff.length
  const totalPayroll = staff.reduce((sum, member) => sum + member.salary, 0)
  const paidStaff = staff.filter((member) => member.isPaid).length
  const unpaidStaff = staff.filter((member) => !member.isPaid).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
            <p className="text-gray-600">Manage your team and track salary payments</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddStaff} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="staff-name">Full Name</Label>
                  <Input id="staff-name" name="name" placeholder="Enter full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staff-role">Role</Label>
                  <Input id="staff-role" name="role" placeholder="Enter job role" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staff-salary">Monthly Salary (₦)</Label>
                  <Input id="staff-salary" name="salary" type="number" placeholder="Enter monthly salary" required />
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Staff"}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Staff</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalStaff}</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Payroll</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">₦{totalPayroll.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Paid This Month</CardTitle>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{paidStaff}</div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Unpaid This Month</CardTitle>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{unpaidStaff}</div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Table */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Monthly Salary</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Mark as Paid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell className="font-medium">₦{member.salary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={member.isPaid ? "default" : "destructive"}
                        className={member.isPaid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {member.isPaid ? "Paid" : "Unpaid"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch checked={member.isPaid} onCheckedChange={() => togglePaymentStatus(member.id)} />
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
