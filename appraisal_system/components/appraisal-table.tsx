"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import type { FilterOptions } from "./search-filter-bar"
import { AppraisalFormDialog } from "./appraisal-form-dialog"
import { useMobile } from "@/hooks/use-mobile"

export interface AppraisalItem {
  id: string
  name: string
  trainingType: string
  installation: string
}

interface AppraisalTableProps {
  items: AppraisalItem[]
  searchQuery: string
  filterOptions: FilterOptions
  appraisalType?: "mentor" | "hoi" | "central" | "department"
}

export function AppraisalTable({ items, searchQuery, filterOptions, appraisalType = "mentor" }: AppraisalTableProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<AppraisalItem | null>(null)
  const isMobile = useMobile()

  // Filter items based on search query and filter options
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.trainingType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.installation.toLowerCase().includes(searchQuery.toLowerCase())

      // Training type filter
      const matchesTrainingType =
        filterOptions.trainingTypes.length === 0 || filterOptions.trainingTypes.includes(item.trainingType)

      // Installation filter
      const matchesInstallation =
        filterOptions.installations.length === 0 || filterOptions.installations.includes(item.installation)

      return matchesSearch && matchesTrainingType && matchesInstallation
    })
  }, [items, searchQuery, filterOptions])

  const handleRadioChange = (id: string) => {
    setSelectedItem(id)
  }

  const handleEdit = (id: string) => {
    console.log("Edit item:", id)
    // Implement edit functionality
  }

  const handleView = (id: string) => {
    console.log("View item:", id)
    // Implement view functionality
  }

  const handleAppraisalForm = (item: AppraisalItem) => {
    setCurrentItem(item)
    setFormOpen(true)
  }

  // Mobile card view
  if (isMobile) {
    return (
      <>
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-3">
                  <input
                    type="radio"
                    className="mr-3"
                    checked={selectedItem === item.id}
                    onChange={() => handleRadioChange(item.id)}
                  />
                  <div className="font-medium">{item.name}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Training Type:</span>
                    <div>{item.trainingType}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Installation:</span>
                    <div>{item.installation}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="default"
                    className="bg-black text-white rounded-md w-full"
                    onClick={() => handleAppraisalForm(item)}
                  >
                    Appraisal Form
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="default"
                      className="bg-purple-600 text-white rounded-md"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="default"
                      className="bg-red-600 text-white rounded-md"
                      onClick={() => handleView(item.id)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-4 text-center text-gray-500">No results found</div>
          )}
        </div>

        <AppraisalFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          formType={appraisalType}
          traineeName={currentItem?.name}
        />
      </>
    )
  }

  // Desktop table view
  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    <ChevronLeft className="transform rotate-90" size={16} />
                  </div>
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Training Type</span>
                    <ChevronLeft className="transform rotate-90" size={16} />
                  </div>
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Installation</span>
                    <ChevronLeft className="transform rotate-90" size={16} />
                  </div>
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-1">
                    <span>Progress</span>
                    <ChevronLeft className="transform rotate-90" size={16} />
                  </div>
                </th>
                <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="mr-3"
                          checked={selectedItem === item.id}
                          onChange={() => handleRadioChange(item.id)}
                        />
                        <div>{item.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.trainingType}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.installation}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="default"
                        className="bg-black text-white rounded-md"
                        onClick={() => handleAppraisalForm(item)}
                      >
                        Appraisal Form
                      </Button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="default"
                          className="bg-purple-600 text-white rounded-md"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="default"
                          className="bg-red-600 text-white rounded-md"
                          onClick={() => handleView(item.id)}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AppraisalFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        formType={appraisalType}
        traineeName={currentItem?.name}
      />
    </>
  )
}
