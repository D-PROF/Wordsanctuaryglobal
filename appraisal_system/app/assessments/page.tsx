"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { RoleGuard } from "@/components/role-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Plus } from "lucide-react"

export default function AssessmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userRole, setUserRole] = useState<string>("leadership")

  useEffect(() => {
    // Get user role from localStorage
    const storedUserRole = localStorage.getItem("userRole")
    if (storedUserRole) {
      setUserRole(storedUserRole)
    }
  }, [])

  return (
    <RoleGuard allowedRoles={["leadership", "admin", "superadmin"]}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar userRole={userRole} />

        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Assessments</h1>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search assessments"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 rounded-full"
                  />
                </div>
                {(userRole === "admin" || userRole === "superadmin") && (
                  <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700">
                    <Plus size={16} className="mr-2" />
                    Create Assessment
                  </Button>
                )}
              </div>
            </div>

            <Card className="w-full">
              <CardContent className="flex items-center justify-center h-64 p-6">
                <p className="text-gray-500 text-lg text-center">Assessment content will be displayed here.</p>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}
