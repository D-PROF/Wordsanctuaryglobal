"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, ChevronUp, ChevronDown } from "lucide-react"
import { RoleGuard } from "@/components/role-guard"
import { useMobile } from "@/hooks/use-mobile"

interface Trainee {
  id: string
  name: string
  email: string
  progress: number
  installation: string
  phoneNumber: string
  department: string
  trainingType: string
}

export default function TraineesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<keyof Trainee>("installation")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const isMobile = useMobile()

  // Sample data
  const trainees: Trainee[] = [
    {
      id: "1",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 75,
      installation: "KWASU",
      phoneNumber: "+2348132286990",
      department: "Power and Sound",
      trainingType: "Executive Assistant",
    },
    {
      id: "2",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 50,
      installation: "FUTA",
      phoneNumber: "+2348132286990",
      department: "Choir",
      trainingType: "Assistant HOD",
    },
    {
      id: "3",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 25,
      installation: "Gospel Empire",
      phoneNumber: "+2348132286990",
      department: "Ushering",
      trainingType: "HOD",
    },
    {
      id: "4",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 25,
      installation: "UNILORIN",
      phoneNumber: "+2348132286990",
      department: "Finance",
      trainingType: "Executive Assistant",
    },
    {
      id: "5",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 40,
      installation: "UNIBADAN",
      phoneNumber: "+2348132286990",
      department: "Media",
      trainingType: "HOD",
    },
    {
      id: "6",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 60,
      installation: "UNIABUJA",
      phoneNumber: "+2348132286990",
      department: "SID",
      trainingType: "Executive Assistant",
    },
    {
      id: "7",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 80,
      installation: "KWASU",
      phoneNumber: "+2348132286990",
      department: "Power and Sound",
      trainingType: "Minister",
    },
    {
      id: "8",
      name: "Word Sanctuary",
      email: "wordsanctuary@gmail.com",
      progress: 30,
      installation: "ABUJA",
      phoneNumber: "+2348132286990",
      department: "Choir",
      trainingType: "Assistant HOD",
    },
  ]

  // Count trainees by training type
  const counts = {
    total: trainees.length,
    execAsst: trainees.filter((t) => t.trainingType === "Executive Assistant").length,
    asstHOD: trainees.filter((t) => t.trainingType === "Assistant HOD").length,
    hod: trainees.filter((t) => t.trainingType === "HOD").length,
    minister: trainees.filter((t) => t.trainingType === "Minister").length,
    pastor: trainees.filter((t) => t.trainingType === "Pastor").length,
  }

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Handle sort
  const handleSort = (column: keyof Trainee) => {
    if (sortBy === column) {
      // If already sorting by this column, toggle direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // If sorting by a new column, set it and default to ascending
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  // Filter and sort trainees
  const filteredAndSortedTrainees = useMemo(() => {
    // First filter
    const filtered = trainees.filter(
      (trainee) =>
        trainee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.installation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.trainingType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trainee.phoneNumber.includes(searchQuery),
    )

    // Then sort
    return [...filtered].sort((a, b) => {
      const valueA = a[sortBy]
      const valueB = b[sortBy]

      // Handle string comparison
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      // Handle number comparison
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA
      }

      return 0
    })
  }, [trainees, searchQuery, sortBy, sortDirection])

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "border-indigo-200 border-l-indigo-500"
    if (progress < 60) return "border-indigo-200 border-l-indigo-500 border-t-indigo-500"
    return "border-indigo-200 border-l-indigo-500 border-t-indigo-500 border-r-indigo-500"
  }

  // Render sort indicator
  const renderSortIndicator = (column: keyof Trainee) => {
    if (sortBy !== column) return null

    return sortDirection === "asc" ? (
      <ChevronUp className="inline h-4 w-4" />
    ) : (
      <ChevronDown className="inline h-4 w-4" />
    )
  }

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        <Sidebar userRole="admin" />

        <div className="flex-1 overflow-auto pt-16 md:pt-0">
          <main className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h1 className="text-xl md:text-2xl font-bold">Trainee List</h1>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-10 w-full md:w-64 rounded-full"
                  />
                </div>
                <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700">
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Stats - Scrollable on mobile */}
            <div className="overflow-x-auto pb-2 mb-4">
              <div className="flex space-x-4 min-w-max border-b pb-4">
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.total}</span> Trainees
                </div>
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.execAsst}</span> Exec Asst.
                </div>
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.asstHOD}</span> Asst. HOD
                </div>
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.hod}</span> HOD
                </div>
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.minister}</span> Minister
                </div>
                <div className="text-indigo-600 font-bold">
                  <span className="text-2xl">{counts.pastor}</span> Pastor
                </div>
                <div className="ml-auto flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value as keyof Trainee)}
                    className="border rounded p-1 text-sm"
                  >
                    <option value="installation">Installation</option>
                    <option value="name">Name</option>
                    <option value="trainingType">Training Type</option>
                    <option value="progress">Progress</option>
                    <option value="department">Department</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile card view */}
            {isMobile ? (
              <div className="space-y-4">
                {filteredAndSortedTrainees.map((trainee) => (
                  <div key={trainee.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center mb-3">
                      <input type="checkbox" className="mr-2" />
                      <div className="flex-shrink-0 h-10 w-10 mr-3">
                        <Image
                          className="h-10 w-10 rounded-full"
                          src="/placeholder.svg?height=40&width=40"
                          alt=""
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{trainee.name}</div>
                        <div className="text-sm text-gray-500">{trainee.email}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <div className="text-xs text-gray-500">Progress</div>
                        <div className="w-12 h-12 rounded-full border-4 relative flex items-center justify-center text-xs">
                          <div
                            className={`absolute inset-0 rounded-full border-4 ${getProgressColor(trainee.progress)}`}
                            style={{
                              clipPath: `polygon(0 0, ${trainee.progress}% 0, ${trainee.progress}% 100%, 0 100%)`,
                            }}
                          ></div>
                          <span className="relative z-10">{trainee.progress}%</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Installation</div>
                        <div>{trainee.installation}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Department</div>
                        <div>{trainee.department}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Training Type</div>
                        <div>{trainee.trainingType}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="default"
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs py-1 px-2 rounded"
                      >
                        View
                      </Button>
                      <Button
                        variant="default"
                        className="bg-black hover:bg-gray-800 text-white text-xs py-1 px-2 rounded"
                      >
                        Appraisal Report
                      </Button>
                      <Button
                        variant="default"
                        className="bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="default"
                        className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded"
                      >
                        Deny
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Desktop table view */
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input type="checkbox" className="mr-2" />
                          Basic Info
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("progress")}
                        >
                          Progress {renderSortIndicator("progress")}
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("installation")}
                        >
                          Installation {renderSortIndicator("installation")}
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("phoneNumber")}
                        >
                          Phone number {renderSortIndicator("phoneNumber")}
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("department")}
                        >
                          Department {renderSortIndicator("department")}
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("trainingType")}
                        >
                          Training type {renderSortIndicator("trainingType")}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredAndSortedTrainees.map((trainee) => (
                        <tr key={trainee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <input type="checkbox" className="mr-2" />
                              <div className="flex-shrink-0 h-10 w-10">
                                <Image
                                  className="h-10 w-10 rounded-full"
                                  src="/placeholder.svg?height=40&width=40"
                                  alt=""
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{trainee.name}</div>
                                <div className="text-sm text-gray-500">{trainee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="w-12 h-12 rounded-full border-4 relative flex items-center justify-center text-xs">
                              <div
                                className={`absolute inset-0 rounded-full border-4 ${getProgressColor(trainee.progress)}`}
                                style={{
                                  clipPath: `polygon(0 0, ${trainee.progress}% 0, ${trainee.progress}% 100%, 0 100%)`,
                                }}
                              ></div>
                              <span className="relative z-10">{trainee.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainee.installation}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainee.phoneNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainee.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trainee.trainingType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button
                                variant="default"
                                className="bg-orange-500 hover:bg-orange-600 text-white text-xs py-1 px-2 rounded"
                              >
                                View
                              </Button>
                              <Button
                                variant="default"
                                className="bg-black hover:bg-gray-800 text-white text-xs py-1 px-2 rounded"
                              >
                                Appraisal Report
                              </Button>
                              <Button
                                variant="default"
                                className="bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded"
                              >
                                Approve
                              </Button>
                              <Button
                                variant="default"
                                className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded"
                              >
                                Deny
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </RoleGuard>
  )
}
