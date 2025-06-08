"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AssessmentInstructions } from "../../components/AssessmentInstructions"
import { AssessmentQuestion } from "../../components/AssessmentQuestion"

interface Assessment {
  id: string
  title: string
  question: string
  timeLimit: number
  completed: boolean
}

export default function Assessment() {
  const [assessments, setAssessments] = useState<Assessment[]>([])

  // Set role-specific assessments based on the user's role
  useEffect(() => {
    const userRole = localStorage.getItem("userRole") || "worker"

    let roleAssessments: Assessment[] = []

    switch (userRole) {
      case "worker":
        roleAssessments = [
          {
            id: "worker-perspective-assignment",
            title: "PERSPECTIVE I ASSIGNMENT",
            question: "What is Perspective to you?",
            timeLimit: 300,
            completed: false,
          },
          {
            id: "worker-bad-assistant",
            title: "BAD ASSISTANT ASSIGNMENT",
            question: "Describe the characteristics of a bad assistant and how to avoid them.",
            timeLimit: 300,
            completed: false,
          },
          {
            id: "worker-perspective-test",
            title: "PERSPECTIVE I TEST",
            question: "Explain the importance of perspective in leadership roles.",
            timeLimit: 600,
            completed: false,
          },
          {
            id: "worker-perspective-exam",
            title: "PERSPECTIVE I EXAM",
            question: "Write a comprehensive essay on how perspective influences decision-making in ministry.",
            timeLimit: 1200,
            completed: false,
          },
          {
            id: "worker-bad-assistant-test",
            title: "BAD ASSISTANT TEST",
            question: "Analyze scenarios of poor assistance and provide solutions.",
            timeLimit: 600,
            completed: false,
          },
          {
            id: "worker-bad-assistant-exam",
            title: "BAD ASSISTANT EXAM",
            question: "Comprehensive evaluation of assistant qualities and improvement strategies.",
            timeLimit: 1200,
            completed: false,
          },
        ]
        break
      case "executive-assistant":
        roleAssessments = [
          {
            id: "exec-assistant-perspective-assignment",
            title: "PERSPECTIVE I ASSIGNMENT",
            question: "What is Perspective to you?",
            timeLimit: 300,
            completed: false,
          },
          {
            id: "exec-assistant-bad-assistant",
            title: "BAD ASSISTANT ASSIGNMENT",
            question: "Describe the characteristics of a bad assistant and how to avoid them.",
            timeLimit: 300,
            completed: false,
          },
          {
            id: "exec-assistant-perspective-test",
            title: "PERSPECTIVE I TEST",
            question: "Explain the importance of perspective in leadership roles.",
            timeLimit: 600,
            completed: false,
          },
          {
            id: "exec-assistant-perspective-exam",
            title: "PERSPECTIVE I EXAM",
            question: "Write a comprehensive essay on how perspective influences decision-making in ministry.",
            timeLimit: 1200,
            completed: false,
          },
          {
            id: "exec-assistant-bad-assistant-test",
            title: "BAD ASSISTANT TEST",
            question: "Analyze scenarios of poor assistance and provide solutions.",
            timeLimit: 600,
            completed: false,
          },
          {
            id: "exec-assistant-bad-assistant-exam",
            title: "BAD ASSISTANT EXAM",
            question: "Comprehensive evaluation of assistant qualities and improvement strategies.",
            timeLimit: 1200,
            completed: false,
          },
        ]
        break
      case "assistant-hod":
        roleAssessments = [
          {
            id: "assistant-hod-perspective-assignment",
            title: "PERSPECTIVE I ASSIGNMENT",
            question: "What is Perspective to you?",
            timeLimit: 300,
            completed: false,
          },
          {
            id: "assistant-hod-bad-assistant",
            title: "BAD ASSISTANT ASSIGNMENT",
            question: "Describe the characteristics of a bad assistant and how to avoid them.",
            timeLimit: 300,
            completed: false,
          },
          {
            id: "assistant-hod-perspective-test",
            title: "PERSPECTIVE I TEST",
            question: "Explain the importance of perspective in leadership roles.",
            timeLimit: 600,
            completed: false,
          },
          {
            id: "assistant-hod-perspective-exam",
            title: "PERSPECTIVE I EXAM",
            question: "Write a comprehensive essay on how perspective influences decision-making in ministry.",
            timeLimit: 1200,
            completed: false,
          },
          {
            id: "assistant-hod-bad-assistant-test",
            title: "BAD ASSISTANT TEST",
            question: "Analyze scenarios of poor assistance and provide solutions.",
            timeLimit: 600,
            completed: false,
          },
          {
            id: "assistant-hod-bad-assistant-exam",
            title: "BAD ASSISTANT EXAM",
            question: "Comprehensive evaluation of assistant qualities and improvement strategies.",
            timeLimit: 1200,
            completed: false,
          },
        ]
        break
      case "hod":
        roleAssessments = [
          {
            id: "hod-perspective-assignment",
            title: "PERSPECTIVE I ASSIGNMENT",
            question: "What is Perspective to you?",
            timeLimit: 300,
            completed: false,
          },
          {
            id: "hod-bad-assistant",
            title: "BAD ASSISTANT ASSIGNMENT",
            question: "Describe the characteristics of a bad assistant and how to avoid them.",
            timeLimit: 300,
            completed: false,
          },
          {
            id: "hod-perspective-test",
            title: "PERSPECTIVE I TEST",
            question: "Explain the importance of perspective in leadership roles.",
            timeLimit: 600,
            completed: false,
          },
          {
            id: "hod-perspective-exam",
            title: "PERSPECTIVE I EXAM",
            question: "Write a comprehensive essay on how perspective influences decision-making in ministry.",
            timeLimit: 1200,
            completed: false,
          },
          {
            id: "hod-bad-assistant-test",
            title: "BAD ASSISTANT TEST",
            question: "Analyze scenarios of poor assistance and provide solutions.",
            timeLimit: 600,
            completed: false,
          },
          {
            id: "hod-bad-assistant-exam",
            title: "BAD ASSISTANT EXAM",
            question: "Comprehensive evaluation of assistant qualities and improvement strategies.",
            timeLimit: 1200,
            completed: false,
          },
        ]
        break
      case "minister":
        roleAssessments = [
          {
            id: "minister-perspective-assignment",
            title: "PERSPECTIVE I ASSIGNMENT",
            question: "What is Perspective to you?",
            timeLimit: 300,
            completed: false,
          },
          {
            id: "minister-bad-assistant",
            title: "BAD ASSISTANT ASSIGNMENT",
            question: "Describe the characteristics of a bad assistant and how to avoid them.",
            timeLimit: 300,
            completed: false,
          },
          {
            id: "minister-perspective-test",
            title: "PERSPECTIVE I TEST",
            question: "Explain the importance of perspective in leadership roles.",
            timeLimit: 600,
            completed: false,
          },
          {
            id: "minister-perspective-exam",
            title: "PERSPECTIVE I EXAM",
            question: "Write a comprehensive essay on how perspective influences decision-making in ministry.",
            timeLimit: 1200,
            completed: false,
          },
          {
            id: "minister-bad-assistant-test",
            title: "BAD ASSISTANT TEST",
            question: "Analyze scenarios of poor assistance and provide solutions.",
            timeLimit: 600,
            completed: false,
          },
          {
            id: "minister-bad-assistant-exam",
            title: "BAD ASSISTANT EXAM",
            question: "Comprehensive evaluation of assistant qualities and improvement strategies.",
            timeLimit: 1200,
            completed: false,
          },
        ]
        break
      default:
        roleAssessments = []
    }

    setAssessments(roleAssessments)
  }, [])

  // Load completed assessments from localStorage with role-specific key
  useEffect(() => {
    const userRole = localStorage.getItem("userRole") || "worker"
    const completed = localStorage.getItem(`completedAssessments_${userRole}`)
    if (completed && assessments.length > 0) {
      const completedIds = JSON.parse(completed)
      setAssessments((prev) =>
        prev.map((assessment) => ({
          ...assessment,
          completed: completedIds.includes(assessment.id),
        })),
      )
    }
  }, [assessments.length])

  const [currentView, setCurrentView] = useState<"list" | "instructions" | "question">("list")
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)

  const handleAssessmentClick = (assessment: Assessment) => {
    if (!assessment.completed) {
      setSelectedAssessment(assessment)
      setCurrentView("instructions")
    }
  }

  const handleStartAssessment = () => {
    setCurrentView("question")
  }

  const handleSubmitAssessment = (answer: string) => {
    if (selectedAssessment) {
      const userRole = localStorage.getItem("userRole") || "worker"

      // Mark assessment as completed
      const updatedAssessments = assessments.map((assessment) =>
        assessment.id === selectedAssessment.id ? { ...assessment, completed: true } : assessment,
      )
      setAssessments(updatedAssessments)

      // Save to localStorage with role-specific key
      const completedIds = updatedAssessments.filter((a) => a.completed).map((a) => a.id)
      localStorage.setItem(`completedAssessments_${userRole}`, JSON.stringify(completedIds))

      // Save the answer with role-specific key
      const answers = JSON.parse(localStorage.getItem(`assessmentAnswers_${userRole}`) || "{}")
      answers[selectedAssessment.id] = {
        answer,
        submittedAt: new Date().toISOString(),
        userRole,
      }
      localStorage.setItem(`assessmentAnswers_${userRole}`, JSON.stringify(answers))

      // Return to list view
      setCurrentView("list")
      setSelectedAssessment(null)
    }
  }

  const handleViolation = () => {
    if (selectedAssessment) {
      // Mark as completed due to violation
      handleSubmitAssessment("Assessment terminated due to screen minimization or focus loss.")
    }
  }

  if (currentView === "instructions" && selectedAssessment) {
    return <AssessmentInstructions title={selectedAssessment.title} onStartAssessment={handleStartAssessment} />
  }

  if (currentView === "question" && selectedAssessment) {
    return (
      <AssessmentQuestion
        title={selectedAssessment.title}
        question={selectedAssessment.question}
        timeLimit={selectedAssessment.timeLimit}
        onSubmit={handleSubmitAssessment}
        onViolation={handleViolation}
      />
    )
  }

  // Filter out completed assessments
  const availableAssessments = assessments.filter((assessment) => !assessment.completed)

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="fixed h-full w-16 bg-white shadow-md md:w-64">
          <div className="flex h-16 items-center justify-center border-b">
            <img src="/images/word-sanctuary-logo-black.png" alt="Word Sanctuary" className="h-8 w-auto md:h-10" />
            <span className="ml-2 hidden text-lg font-semibold md:block">Word Sanctuary</span>
          </div>

          <nav className="mt-6">
            <Link href="/select-training" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <span className="hidden md:block">Dashboard</span>
            </Link>

            <Link href="/assessment" className="flex items-center px-4 py-3 text-purple-600 bg-purple-100">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-200 text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <span className="hidden md:block">Assessment</span>
            </Link>

            <Link href="/settings" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span className="hidden md:block">Settings</span>
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="ml-16 flex-1 md:ml-64">
          <div className="p-4 md:p-8">
            <div className="rounded-lg bg-white p-6 shadow-md max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold text-center mb-2">Assessment</h1>
              <p className="text-center text-gray-600 mb-2">Kindly select the applicable assessment topic to answer.</p>
              <p className="text-center text-gray-600 mb-8">
                Please note that the answers should be carefully filled in to avoid any error.
              </p>

              {availableAssessments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-lg">All assessments have been completed!</p>
                  <p className="text-gray-500 mt-2">Check back later for new assessments.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {availableAssessments.map((assessment) => (
                    <button
                      key={assessment.id}
                      onClick={() => handleAssessmentClick(assessment)}
                      className="w-full p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-center font-semibold text-gray-800 transition-colors"
                    >
                      {assessment.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
