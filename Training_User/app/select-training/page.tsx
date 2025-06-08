"use client"

import { useRouter } from "next/navigation"

export default function SelectTraining() {
  const router = useRouter()

  const handleFormSelection = (userType: string) => {
    // Store the user's role in localStorage for assessment tracking
    localStorage.setItem("userRole", userType)
    router.push(`/interview-questions?role=${userType}`)
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-purple-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Select Training</h1>

        <div className="flex flex-col space-y-4">
          <div className="text-center">
            <p className="mb-2 text-sm text-gray-600">If user is a worker</p>
            <button
              onClick={() => handleFormSelection("worker")}
              className="w-full rounded bg-indigo-900 py-2 text-white hover:bg-indigo-800 focus:outline-none"
            >
              Exco Form
            </button>
          </div>

          <div className="text-center">
            <p className="mb-2 text-sm text-gray-600">If user is an Executive Assistant</p>
            <button
              onClick={() => handleFormSelection("executive-assistant")}
              className="w-full rounded bg-indigo-900 py-2 text-white hover:bg-indigo-800 focus:outline-none"
            >
              Asst. HOD Form
            </button>
          </div>

          <div className="text-center">
            <p className="mb-2 text-sm text-gray-600">If user is an Assistant HOD</p>
            <button
              onClick={() => handleFormSelection("assistant-hod")}
              className="w-full rounded bg-indigo-900 py-2 text-white hover:bg-indigo-800 focus:outline-none"
            >
              HOD Form
            </button>
          </div>

          <div className="text-center">
            <p className="mb-2 text-sm text-gray-600">If user is a HOD</p>
            <button
              onClick={() => handleFormSelection("hod")}
              className="w-full rounded bg-indigo-900 py-2 text-white hover:bg-indigo-800 focus:outline-none"
            >
              Minister Form
            </button>
          </div>

          <div className="text-center">
            <p className="mb-2 text-sm text-gray-600">If user is a Minister</p>
            <button
              onClick={() => handleFormSelection("minister")}
              className="w-full rounded bg-indigo-900 py-2 text-white hover:bg-indigo-800 focus:outline-none"
            >
              Pastor Form
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
