"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"
import { RoleGuard } from "@/components/role-guard"
import { X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

interface PermissionSection {
  name: string
  isOpen: boolean
  permissions: { id: string; label: string; checked: boolean }[]
}

export default function RoleAssignmentPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const [permissionSections, setPermissionSections] = useState<PermissionSection[]>([
    {
      name: "APPRAISALS",
      isOpen: true,
      permissions: [
        { id: "give-appraisals", label: "Give appraisals", checked: true },
        { id: "view-appraisals", label: "View appraisals", checked: true },
        { id: "assign-appraisals", label: "Assign appraisals", checked: true },
        { id: "edit-appraisals", label: "Edit appraisals", checked: true },
        { id: "delete-appraisals", label: "Delete appraisals", checked: true },
        { id: "approve-appraisals", label: "Approve appraisals", checked: true },
      ],
    },
    {
      name: "ASSESSMENTS",
      isOpen: true,
      permissions: [
        { id: "create-assessment", label: "Create assessment", checked: true },
        { id: "edit-assessment", label: "Edit assessment", checked: true },
        { id: "delete-assessment", label: "Delete assessment", checked: true },
        { id: "view-assessment", label: "View assessment", checked: true },
        { id: "view-answers", label: "View answers to assessments", checked: true },
        { id: "mark-assessment", label: "Mark assessment", checked: true },
      ],
    },
    {
      name: "RESULTS",
      isOpen: true,
      permissions: [
        { id: "view-results", label: "View Results", checked: true },
        { id: "calculate-results", label: "Calculate all Results", checked: true },
        { id: "delete-results", label: "Delete Results", checked: true },
      ],
    },
    {
      name: "USERS",
      isOpen: true,
      permissions: [
        { id: "update-user", label: "Update user information", checked: true },
        { id: "delete-users", label: "Delete users", checked: true },
        { id: "search-users", label: "Search for users", checked: true },
        { id: "add-users", label: "Add users", checked: true },
      ],
    },
    {
      name: "INTERVIEW",
      isOpen: true,
      permissions: [
        { id: "create-interview", label: "Create interview form", checked: true },
        { id: "edit-interview", label: "Edit interview form", checked: true },
        { id: "delete-interview", label: "Delete interview form", checked: true },
        { id: "view-interview", label: "View interview form responses", checked: true },
      ],
    },
  ])

  const toggleSection = (index: number) => {
    setPermissionSections((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], isOpen: !updated[index].isOpen }
      return updated
    })
  }

  const togglePermission = (sectionIndex: number, permissionIndex: number) => {
    setPermissionSections((prev) => {
      const updated = [...prev]
      updated[sectionIndex].permissions[permissionIndex].checked =
        !updated[sectionIndex].permissions[permissionIndex].checked
      return updated
    })
  }

  const clearInput = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter("")
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validate inputs
    if (!name.trim()) {
      setError("Please enter a name")
      return
    }

    if (!email.trim()) {
      setError("Please enter an email address")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      // Collect all selected permissions
      const selectedPermissions = permissionSections.flatMap((section) =>
        section.permissions.filter((p) => p.checked).map((p) => ({ section: section.name, id: p.id, label: p.label })),
      )

      // In a real app, you would send this data to your backend
      console.log("Assigning role to:", { name, email, permissions: selectedPermissions })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      setSuccess(true)
      toast({
        title: "Role assigned successfully",
        description: `Permissions have been assigned to ${name}`,
      })

      // Reset form
      setName("")
      setEmail("")
    } catch (err) {
      setError("An error occurred while assigning the role. Please try again.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="flex h-screen bg-gray-50">
        <Sidebar userRole="admin" />

        <div className="flex-1 overflow-auto">
          <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Admin Role Assignment</h1>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-500 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertTitle className="text-green-700">Success</AlertTitle>
                <AlertDescription className="text-green-600">
                  Role has been successfully assigned to {name}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="Enter the full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  {name && (
                    <button
                      type="button"
                      onClick={() => clearInput(setName)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter the email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  {email && (
                    <button
                      type="button"
                      onClick={() => clearInput(setEmail)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-4">Permission</h2>

                <div className="space-y-4">
                  {permissionSections.map((section, sectionIndex) => (
                    <div key={section.name} className="border-b pb-4">
                      <button
                        type="button"
                        className="flex items-center justify-between w-full text-left font-medium"
                        onClick={() => toggleSection(sectionIndex)}
                      >
                        {section.name}
                        <ChevronDown
                          className={`transition-transform ${section.isOpen ? "transform rotate-180" : ""}`}
                          size={16}
                        />
                      </button>

                      {section.isOpen && (
                        <div className="mt-2 ml-4 space-y-2">
                          {section.permissions.map((permission, permissionIndex) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={permission.id}
                                checked={permission.checked}
                                onCheckedChange={() => togglePermission(sectionIndex, permissionIndex)}
                              />
                              <Label htmlFor={permission.id}>{permission.label}</Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSubmitting}>
                  {isSubmitting ? "Assigning..." : "Assign Role"}
                </Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}
