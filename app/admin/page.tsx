"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Users, UserCheck, Trash2, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Mock data for users
const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210", qualification: "B.Tech", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543211", qualification: "M.Tech", status: "active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "9876543212", qualification: "MBA", status: "inactive" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", phone: "9876543213", qualification: "B.Sc", status: "active" },
  { id: 5, name: "David Brown", email: "david@example.com", phone: "9876543214", qualification: "M.Sc", status: "inactive" },
]

export default function AdminPage() {
  const [mounted, setMounted] = useState(false)
  const [users, setUsers] = useState(initialUsers)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className={`border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-all duration-700 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/images/imili-logo.avif"
              alt="Imili Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              imli
            </span>
          </div>
          <h1 className="text-base sm:text-lg font-semibold text-foreground">
            Admin Portal
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 transition-all duration-700 delay-100 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Card>
            <CardContent className="flex items-center gap-4 py-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-semibold text-foreground">{totalUsers}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 py-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-semibold text-foreground">{activeUsers}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div
          className={`transition-all duration-700 delay-200 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden sm:table-cell">Email</TableHead>
                        <TableHead className="hidden md:table-cell">Phone</TableHead>
                        <TableHead className="hidden lg:table-cell">Qualification</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                          <TableCell className="hidden md:table-cell">{user.phone}</TableCell>
                          <TableCell className="hidden lg:table-cell">{user.qualification}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                user.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Questions Tab */}
            <TabsContent value="questions">
              <Card>
                <CardHeader>
                  <CardTitle>Question Management</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-8 gap-4">
                  <p className="text-muted-foreground text-center">
                    Manage all your test questions, add new ones, edit existing questions, and organize sections.
                  </p>
                  <Link href="/admin/questions">
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Manage Questions
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`py-6 text-center transition-all duration-700 delay-300 ease-out ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-muted-foreground text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
          imli
        </p>
      </footer>
    </div>
  )
}
