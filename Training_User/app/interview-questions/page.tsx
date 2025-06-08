"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function InterviewQuestions() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "worker"
  const [formColor, setFormColor] = useState("bg-purple-100")
  const [headerText, setHeaderText] = useState("Interview Questions")
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [formData, setFormData] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Set different colors based on role
  useEffect(() => {
    switch (role) {
      case "worker":
        setFormColor("bg-purple-50") // Dashboard color - purple
        setHeaderText("EXECUTIVE ASSISTANTS' INTERVIEW FORM")
        break
      case "executive-assistant":
        setFormColor("bg-gray-50") // Test/Exam color - gray
        setHeaderText("ASSISTANT HODS' TRAINING INTERVIEW")
        break
      case "assistant-hod":
        setFormColor("bg-purple-50") // Assignment color - purple (similar to dashboard)
        setHeaderText("HODS' TRAINING INTERVIEW")
        break
      case "hod":
        setFormColor("bg-gray-50") // Settings color - gray (similar to test/exam)
        setHeaderText("MINISTER'S TRAINING INTERVIEW FORM")
        break
      case "minister":
        setFormColor("bg-purple-50") // Dashboard color - purple
        setHeaderText("PASTOR'S TRAINING INTERVIEW FORM")
        break
      default:
        setFormColor("bg-purple-50")
        setHeaderText("Interview Questions")
    }
  }, [role])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const errors = {}
    const requiredFields = document.querySelectorAll("input[required], textarea[required], select[required]")

    requiredFields.forEach((field) => {
      const name = field.getAttribute("name")

      // Skip validation for follow-up questions when the related yes/no question is "no"
      if (name === "relationshipDetails" && formData["inRelationship"] === "no") {
        return
      }
      if (name === "relationshipWith" && formData["inRelationship"] === "no") {
        return
      }
      if (name === "challengesDetails" && formData["hasChallenges"] === "no") {
        return
      }
      // For HOD form
      if (name === "mentorAware" && formData["inRelationship"] === "no") {
        return
      }

      if (!formData[name] || formData[name].trim() === "") {
        errors[name] = "This field is required"
      }
    })

    if (!profilePicture) {
      errors["profilePicture"] = "Profile picture is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (validateForm()) {
      // Create form data object that would be sent to backend
      const completeFormData = {
        role,
        profilePicture,
        ...formData,
      }

      // Log the form data to console (for demonstration)
      console.log("Form submitted with data:", completeFormData)

      // Show success message
      alert(`${headerText} submitted successfully!`)

      // You can add navigation logic here if needed
      // router.push('/thank-you');
    } else {
      // Scroll to the first error
      const firstErrorField = document.querySelector(".error-message")
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" })
      }

      alert("Please fill in all required fields")
    }

    setIsSubmitting(false)
  }

  // Function to get the focus color based on role
  const getFocusColor = () => {
    switch (role) {
      case "worker":
        return "focus:border-purple-500" // Dashboard color
      case "executive-assistant":
        return "focus:border-gray-500" // Test/Exam color
      case "assistant-hod":
        return "focus:border-purple-500" // Assignment color
      case "hod":
        return "focus:border-gray-500" // Settings color
      case "minister":
        return "focus:border-purple-500" // Dashboard color
      default:
        return "focus:border-purple-500"
    }
  }

  // Function to get the button color based on role
  const getButtonColor = () => {
    switch (role) {
      case "worker":
        return "bg-purple-600 hover:bg-purple-700" // Dashboard color
      case "executive-assistant":
        return "bg-gray-600 hover:bg-gray-700" // Test/Exam color
      case "assistant-hod":
        return "bg-purple-600 hover:bg-purple-700" // Assignment color
      case "hod":
        return "bg-gray-600 hover:bg-gray-700" // Settings color
      case "minister":
        return "bg-purple-600 hover:bg-purple-700" // Dashboard color
      default:
        return "bg-purple-600 hover:bg-purple-700"
    }
  }

  const focusColor = getFocusColor()
  const buttonColor = getButtonColor()

  useEffect(() => {
    // Clear relationship details when "inRelationship" changes to "no"
    if (formData["inRelationship"] === "no") {
      setFormData((prev) => ({
        ...prev,
        relationshipDetails: "",
        relationshipWith: "",
        mentorAware: "", // For HOD form
      }))
    }

    // Clear challenges details when "hasChallenges" changes to "no"
    if (formData["hasChallenges"] === "no") {
      setFormData((prev) => ({
        ...prev,
        challengesDetails: "",
      }))
    }
  }, [formData["inRelationship"], formData["hasChallenges"]])

  // Add this useEffect after the existing useEffects
  useEffect(() => {
    // Store the user's role in localStorage for assessment tracking
    localStorage.setItem("userRole", role)
  }, [role])

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
            <Link href="/select-training" className="flex items-center px-4 py-3 text-purple-600 bg-purple-100">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-200 text-purple-600">
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

            <Link href="/assessment" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100">
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
            <div className={`rounded-lg ${formColor} p-6 shadow-md`}>
              <h1 className="mb-2 text-xl font-bold text-gray-800">{headerText}</h1>
              <p className="mb-6 text-sm text-gray-600">
                Kindly fill out the information correctly and accurately.
                <br />
                Please note that the information given should be carefully filled out.
                <br />
                <span className="text-red-500 font-medium">Fields marked with * are required.</span>
              </p>

              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <input
                    type="file"
                    id="profile-picture"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setProfilePicture(event.target.result.toString())
                            // Clear profile picture error if it exists
                            if (formErrors["profilePicture"]) {
                              setFormErrors({
                                ...formErrors,
                                profilePicture: null,
                              })
                            }
                          }
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                  />
                  <label
                    htmlFor="profile-picture"
                    className={`flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 ${
                      formErrors["profilePicture"] ? "border-red-500" : "border-dashed border-gray-300"
                    } bg-white hover:border-purple-500`}
                  >
                    {profilePicture ? (
                      <div className="h-full w-full overflow-hidden rounded-lg">
                        <img
                          src={profilePicture || "/placeholder.svg"}
                          alt="Profile Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-auto h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                          />
                        </svg>
                        <p className="mt-1 text-xs text-gray-500">
                          Upload your Picture <span className="text-red-500">*</span>
                        </p>
                      </div>
                    )}
                  </label>
                  {formErrors["profilePicture"] && (
                    <p className="mt-1 text-xs text-red-500 error-message">{formErrors["profilePicture"]}</p>
                  )}
                  {profilePicture && (
                    <button
                      type="button"
                      onClick={() => setProfilePicture(null)}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Regular form fields for worker, executive-assistant, assistant-hod roles */}
                  {role !== "hod" && role !== "minister" && role !== "executive-assistant" && (
                    <>
                      {role === "worker" && (
                        <>
                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              1. Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              className={`w-full rounded-md border ${
                                formErrors["fullName"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["fullName"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["fullName"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              2. Gender <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="gender"
                              className={`w-full rounded-md border ${
                                formErrors["gender"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["gender"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["gender"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              3. Telegram phone number/ username <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="telegram"
                              className={`w-full rounded-md border ${
                                formErrors["telegram"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["telegram"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["telegram"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              4. Installation <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="installation"
                              className={`w-full rounded-md border ${
                                formErrors["installation"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["installation"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["installation"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              5. Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="address"
                              className={`w-full rounded-md border ${
                                formErrors["address"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["address"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["address"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              6. Single or married? <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="maritalStatus"
                              className={`w-full rounded-md border ${
                                formErrors["maritalStatus"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["maritalStatus"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["maritalStatus"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              7. Occupation <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="occupation"
                              className={`w-full rounded-md border ${
                                formErrors["occupation"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["occupation"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["occupation"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              8. How long have you been a worker? <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="workerDuration"
                              className={`w-full rounded-md border ${
                                formErrors["workerDuration"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["workerDuration"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["workerDuration"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              9. Department <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="department"
                              className={`w-full rounded-md border ${
                                formErrors["department"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["department"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["department"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              10. Dues status <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="duesStatus"
                              className={`w-full rounded-md border ${
                                formErrors["duesStatus"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["duesStatus"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["duesStatus"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              11. How has being a worker influenced you? <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="workerInfluence"
                              className={`w-full rounded-md border ${
                                formErrors["workerInfluence"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              rows={3}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["workerInfluence"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["workerInfluence"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              12. What has changed in your life since you joined the church{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="lifeChanges"
                              className={`w-full rounded-md border ${
                                formErrors["lifeChanges"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              rows={3}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["lifeChanges"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["lifeChanges"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              13. Number of life class topics/ name of life class teacher/ what is your consistency in
                              Life Class <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="lifeClass"
                              className={`w-full rounded-md border ${
                                formErrors["lifeClass"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              rows={3}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["lifeClass"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["lifeClass"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              14. Are you born again? If yes, when and where? <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="bornAgain"
                              className={`w-full rounded-md border ${
                                formErrors["bornAgain"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              rows={3}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["bornAgain"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["bornAgain"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              15. How many souls have you brought to the church this year{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="soulsWon"
                              className={`w-full rounded-md border ${
                                formErrors["soulsWon"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["soulsWon"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["soulsWon"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              16. Who is your mentor/ what is your consistency in Mentoring{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="mentorConsistency"
                              className={`w-full rounded-md border ${
                                formErrors["mentorConsistency"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              rows={3}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["mentorConsistency"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">
                                {formErrors["mentorConsistency"]}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              17. What does Word Sanctuary mean to you <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="wordSanctuaryMeaning"
                              className={`w-full rounded-md border ${
                                formErrors["wordSanctuaryMeaning"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              rows={3}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["wordSanctuaryMeaning"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">
                                {formErrors["wordSanctuaryMeaning"]}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              18. What is your future in Word Sanctuary <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="futureInWordSanctuary"
                              className={`w-full rounded-md border ${
                                formErrors["futureInWordSanctuary"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              rows={3}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["futureInWordSanctuary"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">
                                {formErrors["futureInWordSanctuary"]}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              19. Are you in a relationship? <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="inRelationship"
                              className={`w-full rounded-md border ${
                                formErrors["inRelationship"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            >
                              <option value="">Select an option</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                            {formErrors["inRelationship"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["inRelationship"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              20. With who/how long{" "}
                              {formData["inRelationship"] === "yes" && <span className="text-red-500">*</span>}
                            </label>
                            <input
                              type="text"
                              name="relationshipDetails"
                              className={`w-full rounded-md border ${
                                formErrors["relationshipDetails"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required={formData["inRelationship"] === "yes"}
                              onChange={handleInputChange}
                            />
                            {formErrors["relationshipDetails"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">
                                {formErrors["relationshipDetails"]}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              21. When did you join the church <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="joinDate"
                              className={`w-full rounded-md border ${
                                formErrors["joinDate"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            />
                            {formErrors["joinDate"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["joinDate"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              22. Are you ready for this training? <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="readyForTraining"
                              className={`w-full rounded-md border ${
                                formErrors["readyForTraining"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            >
                              <option value="">Select an option</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                            {formErrors["readyForTraining"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">
                                {formErrors["readyForTraining"]}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              24. How has the executives&apos; Forum being a blessing to your installation?{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="forumBlessing"
                              className={`w-full rounded-md border ${
                                formErrors["forumBlessing"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              rows={3}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["forumBlessing"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["forumBlessing"]}</p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              25. Observations on things to improve in your: <span className="text-red-500">*</span>
                            </label>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              1. Department <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="departmentImprovements"
                              className={`w-full rounded-md border ${
                                formErrors["departmentImprovements"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none mb-2`}
                              rows={2}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["departmentImprovements"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">
                                {formErrors["departmentImprovements"]}
                              </p>
                            )}

                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              2. Forum <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="forumImprovements"
                              className={`w-full rounded-md border ${
                                formErrors["forumImprovements"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none mb-2`}
                              rows={2}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["forumImprovements"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">
                                {formErrors["forumImprovements"]}
                              </p>
                            )}

                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              3. Church <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="churchImprovements"
                              className={`w-full rounded-md border ${
                                formErrors["churchImprovements"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              rows={2}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["churchImprovements"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">
                                {formErrors["churchImprovements"]}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              26. How can you be of help to move your department/installation forward?{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="helpMovingForward"
                              className={`w-full rounded-md border ${
                                formErrors["helpMovingForward"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              rows={3}
                              required
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["helpMovingForward"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">
                                {formErrors["helpMovingForward"]}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              27. Do you have any challenges you are facing presently?{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="hasChallenges"
                              className={`mb-3 w-full rounded-md border ${
                                formErrors["hasChallenges"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              required
                              onChange={handleInputChange}
                            >
                              <option value="">Select an option</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                            {formErrors["hasChallenges"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">{formErrors["hasChallenges"]}</p>
                            )}

                            <label className="mb-1 block text-sm font-medium text-gray-700">
                              If so, are you open to sharing them?{" "}
                              {formData["hasChallenges"] === "yes" && <span className="text-red-500">*</span>}
                            </label>
                            <textarea
                              name="challengesDetails"
                              className={`w-full rounded-md border ${
                                formErrors["challengesDetails"] ? "border-red-500" : "border-gray-300"
                              } p-2 ${focusColor} focus:outline-none`}
                              rows={3}
                              required={formData["hasChallenges"] === "yes"}
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors["challengesDetails"] && (
                              <p className="mt-1 text-xs text-red-500 error-message">
                                {formErrors["challengesDetails"]}
                              </p>
                            )}
                          </div>
                        </>
                      )}

                      {/* REMOVE THIS SECTION */}
                    </>
                  )}

                  {role === "assistant-hod" && (
                    <>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          1. Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          className={`w-full rounded-md border ${
                            formErrors["fullName"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["fullName"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["fullName"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          2. Gender <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="gender"
                          className={`w-full rounded-md border ${
                            formErrors["gender"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["gender"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["gender"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          3. Telegram phone number/ username <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="telegram"
                          className={`w-full rounded-md border ${
                            formErrors["telegram"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["telegram"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["telegram"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          4. Installation <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="installation"
                          className={`w-full rounded-md border ${
                            formErrors["installation"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["installation"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["installation"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          5. Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          className={`w-full rounded-md border ${
                            formErrors["address"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["address"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["address"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          6. Single or married? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="maritalStatus"
                          className={`w-full rounded-md border ${
                            formErrors["maritalStatus"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["maritalStatus"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["maritalStatus"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          7. Occupation <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          className={`w-full rounded-md border ${
                            formErrors["occupation"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["occupation"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["occupation"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          8. Leadership Position (how long) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="leadershipPosition"
                          className={`w-full rounded-md border ${
                            formErrors["leadershipPosition"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["leadershipPosition"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["leadershipPosition"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          9. Department (with previous departments) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="departmentWithPrevious"
                          className={`w-full rounded-md border ${
                            formErrors["departmentWithPrevious"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["departmentWithPrevious"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["departmentWithPrevious"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          10. Dues status <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="duesStatus"
                          className={`w-full rounded-md border ${
                            formErrors["duesStatus"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["duesStatus"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["duesStatus"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          11. How has this position influenced you? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="positionInfluence"
                          className={`w-full rounded-md border ${
                            formErrors["positionInfluence"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["positionInfluence"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["positionInfluence"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          12. What has changed in your life since you joined the church{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="lifeChanges"
                          className={`w-full rounded-md border ${
                            formErrors["lifeChanges"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["lifeChanges"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["lifeChanges"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          13. Number of life class topics/ name of life class teacher/ what is your consistency in Life
                          Class <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="lifeClass"
                          className={`w-full rounded-md border ${
                            formErrors["lifeClass"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["lifeClass"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["lifeClass"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          14. Are you born again? If yes, when and where? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="bornAgain"
                          className={`w-full rounded-md border ${
                            formErrors["bornAgain"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["bornAgain"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["bornAgain"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          15. How many souls have you brought to the church this year{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="soulsWon"
                          className={`w-full rounded-md border ${
                            formErrors["soulsWon"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["soulsWon"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["soulsWon"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          16. How many life class students do you have? Mention three{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="lifeClassStudents"
                          className={`w-full rounded-md border ${
                            formErrors["lifeClassStudents"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["lifeClassStudents"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["lifeClassStudents"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          17. Who is your mentor/ what is your consistency in Mentoring{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="mentorConsistency"
                          className={`w-full rounded-md border ${
                            formErrors["mentorConsistency"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["mentorConsistency"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["mentorConsistency"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          18. What does Word Sanctuary mean to you <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="wordSanctuaryMeaning"
                          className={`w-full rounded-md border ${
                            formErrors["wordSanctuaryMeaning"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["wordSanctuaryMeaning"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["wordSanctuaryMeaning"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          19. What is your future in Word Sanctuary <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="futureInWordSanctuary"
                          className={`w-full rounded-md border ${
                            formErrors["futureInWordSanctuary"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["futureInWordSanctuary"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["futureInWordSanctuary"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          20. Are you in a relationship? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="inRelationship"
                          className={`w-full rounded-md border ${
                            formErrors["inRelationship"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["inRelationship"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["inRelationship"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          21. With who/how long{" "}
                          {formData["inRelationship"] === "yes" && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type="text"
                          name="relationshipDetails"
                          className={`w-full rounded-md border ${
                            formErrors["relationshipDetails"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required={formData["inRelationship"] === "yes"}
                          onChange={handleInputChange}
                        />
                        {formErrors["relationshipDetails"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["relationshipDetails"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          22. When did you join the church <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="joinDate"
                          className={`w-full rounded-md border ${
                            formErrors["joinDate"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["joinDate"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["joinDate"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          23. Are you ready for this training? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="readyForTraining"
                          className={`w-full rounded-md border ${
                            formErrors["readyForTraining"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["readyForTraining"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["readyForTraining"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          24. How has the Assistant HODs Forum been a blessing to your installation?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="assistantHodForumBlessing"
                          className={`w-full rounded-md border ${
                            formErrors["assistantHodForumBlessing"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["assistantHodForumBlessing"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["assistantHodForumBlessing"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          25. Observations on things to improve in your: <span className="text-red-500">*</span>
                        </label>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          1. Department <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="departmentImprovements"
                          className={`w-full rounded-md border ${
                            formErrors["departmentImprovements"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none mb-2`}
                          rows={2}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["departmentImprovements"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["departmentImprovements"]}
                          </p>
                        )}

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          2. Forum <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="forumImprovements"
                          className={`w-full rounded-md border ${
                            formErrors["forumImprovements"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none mb-2`}
                          rows={2}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["forumImprovements"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["forumImprovements"]}</p>
                        )}

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          3. Church <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="churchImprovements"
                          className={`w-full rounded-md border ${
                            formErrors["churchImprovements"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={2}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["churchImprovements"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["churchImprovements"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          26. How can you be of help to move your department/installation forward?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="helpMovingForward"
                          className={`w-full rounded-md border ${
                            formErrors["helpMovingForward"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["helpMovingForward"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["helpMovingForward"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          27. Do you have any challenges you are facing presently?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="hasChallenges"
                          className={`mb-3 w-full rounded-md border ${
                            formErrors["hasChallenges"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["hasChallenges"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["hasChallenges"]}</p>
                        )}

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          If so, are you open to sharing them?{" "}
                          {formData["hasChallenges"] === "yes" && <span className="text-red-500">*</span>}
                        </label>
                        <textarea
                          name="challengesDetails"
                          className={`w-full rounded-md border ${
                            formErrors["challengesDetails"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required={formData["hasChallenges"] === "yes"}
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["challengesDetails"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["challengesDetails"]}</p>
                        )}
                      </div>
                    </>
                  )}

                  {role === "executive-assistant" && (
                    <>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          1. Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          className={`w-full rounded-md border ${
                            formErrors["fullName"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["fullName"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["fullName"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          2. Gender <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="gender"
                          className={`w-full rounded-md border ${
                            formErrors["gender"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["gender"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["gender"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          3. Telegram phone number/ username <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="telegram"
                          className={`w-full rounded-md border ${
                            formErrors["telegram"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["telegram"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["telegram"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          4. Installation <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="installation"
                          className={`w-full rounded-md border ${
                            formErrors["installation"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["installation"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["installation"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          5. Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          className={`w-full rounded-md border ${
                            formErrors["address"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["address"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["address"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          6. Single or married? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="maritalStatus"
                          className={`w-full rounded-md border ${
                            formErrors["maritalStatus"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["maritalStatus"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["maritalStatus"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          7. Occupation <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          className={`w-full rounded-md border ${
                            formErrors["occupation"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["occupation"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["occupation"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          8. Leadership Position (how long) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="leadershipPosition"
                          className={`w-full rounded-md border ${
                            formErrors["leadershipPosition"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["leadershipPosition"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["leadershipPosition"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          9. Department <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="department"
                          className={`w-full rounded-md border ${
                            formErrors["department"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["department"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["department"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          10. Dues status <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="duesStatus"
                          className={`w-full rounded-md border ${
                            formErrors["duesStatus"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["duesStatus"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["duesStatus"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          11. How has this position influenced you? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="positionInfluence"
                          className={`w-full rounded-md border ${
                            formErrors["positionInfluence"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["positionInfluence"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["positionInfluence"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          12. What has changed in your life since you joined the church{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="lifeChanges"
                          className={`w-full rounded-md border ${
                            formErrors["lifeChanges"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["lifeChanges"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["lifeChanges"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          13. Number of life class topics/ name of life class teacher/ what is your consistency in Life
                          Class <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="lifeClass"
                          className={`w-full rounded-md border ${
                            formErrors["lifeClass"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["lifeClass"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["lifeClass"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          14. Are you born again? If yes, when and where? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="bornAgain"
                          className={`w-full rounded-md border ${
                            formErrors["bornAgain"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["bornAgain"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["bornAgain"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          15. How many souls have you brought to the church this year{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="soulsWon"
                          className={`w-full rounded-md border ${
                            formErrors["soulsWon"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["soulsWon"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["soulsWon"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          16. How many life class students do you have? Mention three{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="lifeClassStudents"
                          className={`w-full rounded-md border ${
                            formErrors["lifeClassStudents"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["lifeClassStudents"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["lifeClassStudents"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          17. Who is your mentor/ what is your consistency in Mentoring{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="mentorConsistency"
                          className={`w-full rounded-md border ${
                            formErrors["mentorConsistency"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["mentorConsistency"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["mentorConsistency"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          18. What does Word Sanctuary mean to you <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="wordSanctuaryMeaning"
                          className={`w-full rounded-md border ${
                            formErrors["wordSanctuaryMeaning"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["wordSanctuaryMeaning"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["wordSanctuaryMeaning"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          19. What is your future in Word Sanctuary <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="futureInWordSanctuary"
                          className={`w-full rounded-md border ${
                            formErrors["futureInWordSanctuary"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["futureInWordSanctuary"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["futureInWordSanctuary"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          20. Are you in a relationship? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="inRelationship"
                          className={`w-full rounded-md border ${
                            formErrors["inRelationship"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["inRelationship"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["inRelationship"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          21. With who/how long{" "}
                          {formData["inRelationship"] === "yes" && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type="text"
                          name="relationshipDetails"
                          className={`w-full rounded-md border ${
                            formErrors["relationshipDetails"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required={formData["inRelationship"] === "yes"}
                          onChange={handleInputChange}
                        />
                        {formErrors["relationshipDetails"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["relationshipDetails"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          22. When did you join the church <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="joinDate"
                          className={`w-full rounded-md border ${
                            formErrors["joinDate"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["joinDate"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["joinDate"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          23. Are you ready for this training? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="readyForTraining"
                          className={`w-full rounded-md border ${
                            formErrors["readyForTraining"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["readyForTraining"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["readyForTraining"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          24. How has the executives&apos; Forum being a blessing to your installation?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="forumBlessing"
                          className={`w-full rounded-md border ${
                            formErrors["forumBlessing"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["forumBlessing"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["forumBlessing"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          25. Observations on things to improve in your: <span className="text-red-500">*</span>
                        </label>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          1. Department <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="departmentImprovements"
                          className={`w-full rounded-md border ${
                            formErrors["departmentImprovements"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none mb-2`}
                          rows={2}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["departmentImprovements"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["departmentImprovements"]}
                          </p>
                        )}

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          2. Forum <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="forumImprovements"
                          className={`w-full rounded-md border ${
                            formErrors["forumImprovements"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none mb-2`}
                          rows={2}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["forumImprovements"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["forumImprovements"]}</p>
                        )}

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          3. Church <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="churchImprovements"
                          className={`w-full rounded-md border ${
                            formErrors["churchImprovements"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={2}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["churchImprovements"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["churchImprovements"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          26. How can you be of help to move your department/installation forward?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="helpMovingForward"
                          className={`w-full rounded-md border ${
                            formErrors["helpMovingForward"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["helpMovingForward"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["helpMovingForward"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          27. Do you have any challenges you are facing presently?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="hasChallenges"
                          className={`mb-3 w-full rounded-md border ${
                            formErrors["hasChallenges"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["hasChallenges"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["hasChallenges"]}</p>
                        )}

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          If so, are you open to sharing them?{" "}
                          {formData["hasChallenges"] === "yes" && <span className="text-red-500">*</span>}
                        </label>
                        <textarea
                          name="challengesDetails"
                          className={`w-full rounded-md border ${
                            formErrors["challengesDetails"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required={formData["hasChallenges"] === "yes"}
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["challengesDetails"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["challengesDetails"]}</p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Minister specific form fields */}
                  {role === "minister" && (
                    <>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          1. Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          className={`w-full rounded-md border ${
                            formErrors["fullName"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["fullName"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["fullName"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          2. Date of birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          className={`w-full rounded-md border ${
                            formErrors["dateOfBirth"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["dateOfBirth"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["dateOfBirth"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          3. Telegram phone number/username <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="telegram"
                          className={`w-full rounded-md border ${
                            formErrors["telegram"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["telegram"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["telegram"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          4. State of Origin <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="stateOfOrigin"
                          className={`w-full rounded-md border ${
                            formErrors["stateOfOrigin"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["stateOfOrigin"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["stateOfOrigin"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          5. Single or married? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="maritalStatus"
                          className={`w-full rounded-md border ${
                            formErrors["maritalStatus"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["maritalStatus"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["maritalStatus"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          6. Highest academic qualification? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="highestQualification"
                          className={`w-full rounded-md border ${
                            formErrors["highestQualification"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["highestQualification"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["highestQualification"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          7. When did you join Word Sanctuary? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="joinDate"
                          className={`w-full rounded-md border ${
                            formErrors["joinDate"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["joinDate"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["joinDate"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          8. What month and year did you become minister? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="ministerDate"
                          className={`w-full rounded-md border ${
                            formErrors["ministerDate"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["ministerDate"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["ministerDate"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          9. How many departments have you administered? Mention the departments and corresponding
                          installation <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="departmentsAdministered"
                          className={`w-full rounded-md border ${
                            formErrors["departmentsAdministered"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["departmentsAdministered"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["departmentsAdministered"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          10. Mention the Centrals you have headed previously, if any{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="centralsHeaded"
                          className={`w-full rounded-md border ${
                            formErrors["centralsHeaded"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["centralsHeaded"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["centralsHeaded"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          11. List the centrals you've assisted in <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="centralsAssisted"
                          className={`w-full rounded-md border ${
                            formErrors["centralsAssisted"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["centralsAssisted"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["centralsAssisted"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          12. How well are the departments under you functioning presently in terms of number and
                          finances? Mention specifics <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="departmentsFunctioning"
                          className={`w-full rounded-md border ${
                            formErrors["departmentsFunctioning"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["departmentsFunctioning"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["departmentsFunctioning"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          13. Have you started an installation before? Mention the name(s){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="installationsStarted"
                          className={`w-full rounded-md border ${
                            formErrors["installationsStarted"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["installationsStarted"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["installationsStarted"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          14. Have you headed installations before? How many and mention them{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="installationsHeaded"
                          className={`w-full rounded-md border ${
                            formErrors["installationsHeaded"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["installationsHeaded"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["installationsHeaded"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          15. What creativity did you bring to the installation? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="creativityBrought"
                          className={`w-full rounded-md border ${
                            formErrors["creativityBrought"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["creativityBrought"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["creativityBrought"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          16. How did you meet the installation (amount of money and number of people) and how did you
                          leave it? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="installationMetAndLeft"
                          className={`w-full rounded-md border ${
                            formErrors["installationMetAndLeft"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["installationMetAndLeft"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["installationMetAndLeft"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          17. Which installation are you serving presently? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="currentInstallation"
                          className={`w-full rounded-md border ${
                            formErrors["currentInstallation"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["currentInstallation"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["currentInstallation"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          18. Who is your mentor? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="mentor"
                          className={`w-full rounded-md border ${
                            formErrors["mentor"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["mentor"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["mentor"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          19. How many topics have you taken in your mentoring class?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="mentoringTopics"
                          className={`w-full rounded-md border ${
                            formErrors["mentoringTopics"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["mentoringTopics"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["mentoringTopics"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          20. How many life class students do you have? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lifeClassStudents"
                          className={`w-full rounded-md border ${
                            formErrors["lifeClassStudents"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["lifeClassStudents"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["lifeClassStudents"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          21. How many mentees do you have? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="mentees"
                          className={`w-full rounded-md border ${
                            formErrors["mentees"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["mentees"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["mentees"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          22. How much are you owing in minister's forum due? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="forumDuesOwing"
                          className={`w-full rounded-md border ${
                            formErrors["forumDuesOwing"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["forumDuesOwing"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["forumDuesOwing"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          23. Are you a student or worker? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          className={`w-full rounded-md border ${
                            formErrors["occupation"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["occupation"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["occupation"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          24. Where / what work do you do <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="workPlace"
                          className={`w-full rounded-md border ${
                            formErrors["workPlace"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["workPlace"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["workPlace"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          25. How much have you given this year? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="amountGiven"
                          className={`w-full rounded-md border ${
                            formErrors["amountGiven"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["amountGiven"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["amountGiven"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          26. How many souls have you brought to church this year?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="soulsWon"
                          className={`w-full rounded-md border ${
                            formErrors["soulsWon"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["soulsWon"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["soulsWon"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          27. Are you in a relationship? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="inRelationship"
                          className={`w-full rounded-md border ${
                            formErrors["inRelationship"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["inRelationship"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["inRelationship"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          28. With who and for how long{" "}
                          {formData["inRelationship"] === "yes" && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type="text"
                          name="relationshipDetails"
                          className={`w-full rounded-md border ${
                            formErrors["relationshipDetails"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required={formData["inRelationship"] === "yes"}
                          onChange={handleInputChange}
                        />
                        {formErrors["relationshipDetails"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["relationshipDetails"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          29. Is your mentor/head of installation aware{" "}
                          {formData["inRelationship"] === "yes" && <span className="text-red-500">*</span>}
                        </label>
                        <select
                          name="mentorAware"
                          className={`w-full rounded-md border ${
                            formErrors["mentorAware"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required={formData["inRelationship"] === "yes"}
                          onChange={handleInputChange}
                          disabled={formData["inRelationship"] !== "yes"}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["mentorAware"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["mentorAware"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          30. Observations on things to be improved in your installation, central and the system{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="improvementObservations"
                          className={`w-full rounded-md border ${
                            formErrors["improvementObservations"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["improvementObservations"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["improvementObservations"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          31. How can you be of help to move the system/ your installation to the next Level{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="helpMovingForward"
                          className={`w-full rounded-md border ${
                            formErrors["helpMovingForward"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["helpMovingForward"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["helpMovingForward"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          32. Is there anything we can do to move your installation to the next level{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="installationHelp"
                          className={`w-full rounded-md border ${
                            formErrors["installationHelp"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["installationHelp"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["installationHelp"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          33. Do you have any challenges? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="hasChallenges"
                          className={`mb-3 w-full rounded-md border ${
                            formErrors["hasChallenges"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["hasChallenges"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["hasChallenges"]}</p>
                        )}

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          If so, are you open to sharing them?{" "}
                          {formData["hasChallenges"] === "yes" && <span className="text-red-500">*</span>}
                        </label>
                        <textarea
                          name="challengesDetails"
                          className={`w-full rounded-md border ${
                            formErrors["challengesDetails"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required={formData["hasChallenges"] === "yes"}
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["challengesDetails"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["challengesDetails"]}</p>
                        )}
                      </div>
                    </>
                  )}

                  {/* HOD specific form fields */}
                  {role === "hod" && (
                    <>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          1. Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          className={`w-full rounded-md border ${
                            formErrors["fullName"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["fullName"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["fullName"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          2. Date of birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          className={`w-full rounded-md border ${
                            formErrors["dateOfBirth"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["dateOfBirth"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["dateOfBirth"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          3. Telegram phone number/username <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="telegram"
                          className={`w-full rounded-md border ${
                            formErrors["telegram"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["telegram"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["telegram"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          4. State of origin? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="stateOfOrigin"
                          className={`w-full rounded-md border ${
                            formErrors["stateOfOrigin"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["stateOfOrigin"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["stateOfOrigin"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          5. Single or married? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="maritalStatus"
                          className={`w-full rounded-md border ${
                            formErrors["maritalStatus"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["maritalStatus"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["maritalStatus"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          6. Highest academic qualification <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="highestQualification"
                          className={`w-full rounded-md border ${
                            formErrors["highestQualification"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["highestQualification"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["highestQualification"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          7. When did you join Word Sanctuary? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="joinDate"
                          className={`w-full rounded-md border ${
                            formErrors["joinDate"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["joinDate"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["joinDate"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          8. What month and year did you become HOD? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="hodDate"
                          className={`w-full rounded-md border ${
                            formErrors["hodDate"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["hodDate"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["hodDate"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          9. List the departments you have led (for each, state the number you met and the number you
                          left)? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="departmentsLed"
                          className={`w-full rounded-md border ${
                            formErrors["departmentsLed"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["departmentsLed"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["departmentsLed"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          10. List the centrals you've ever worked under <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="centralsWorkedUnder"
                          className={`w-full rounded-md border ${
                            formErrors["centralsWorkedUnder"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["centralsWorkedUnder"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["centralsWorkedUnder"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          11. Are you in a relationship? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="inRelationship"
                          className={`w-full rounded-md border ${
                            formErrors["inRelationship"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["inRelationship"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["inRelationship"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          12. If yes with who{" "}
                          {formData["inRelationship"] === "yes" && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type="text"
                          name="relationshipDetails"
                          className={`w-full rounded-md border ${
                            formErrors["relationshipDetails"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required={formData["inRelationship"] === "yes"}
                          onChange={handleInputChange}
                        />
                        {formErrors["relationshipDetails"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["relationshipDetails"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          13. Is your mentor and your installation head aware?{" "}
                          {formData["inRelationship"] === "yes" && <span className="text-red-500">*</span>}
                        </label>
                        <select
                          name="mentorAware"
                          className={`w-full rounded-md border ${
                            formErrors["mentorAware"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required={formData["inRelationship"] === "yes"}
                          onChange={handleInputChange}
                          disabled={formData["inRelationship"] !== "yes"}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["mentorAware"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["mentorAware"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          14. How has the department improved you <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="departmentImprovement"
                          className={`w-full rounded-md border ${
                            formErrors["departmentImprovement"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["departmentImprovement"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["departmentImprovement"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          15. Which department are you heading presently and what has changed since you became HOD?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="currentDepartmentChanges"
                          className={`w-full rounded-md border ${
                            formErrors["currentDepartmentChanges"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["currentDepartmentChanges"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["currentDepartmentChanges"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          16. How many people are you leading presently? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="peopleLeading"
                          className={`w-full rounded-md border ${
                            formErrors["peopleLeading"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["peopleLeading"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["peopleLeading"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          17. How much money do you have in your department's account?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="departmentFunds"
                          className={`w-full rounded-md border ${
                            formErrors["departmentFunds"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["departmentFunds"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["departmentFunds"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          18. Briefly state your leadership experience: stating the department you have worked in, the
                          leaders you worked with and for how long <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="leadershipExperience"
                          className={`w-full rounded-md border ${
                            formErrors["leadershipExperience"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["leadershipExperience"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["leadershipExperience"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          19. Which installation are you serving presently? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="currentInstallation"
                          className={`w-full rounded-md border ${
                            formErrors["currentInstallation"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["currentInstallation"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["currentInstallation"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          20. Who is your mentor? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="mentor"
                          className={`w-full rounded-md border ${
                            formErrors["mentor"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["mentor"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["mentor"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          21. How many topics have you taken in your mentoring class?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="mentoringTopics"
                          className={`w-full rounded-md border ${
                            formErrors["mentoringTopics"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["mentoringTopics"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["mentoringTopics"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          22. How many life class students do you have? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lifeClassStudents"
                          className={`w-full rounded-md border ${
                            formErrors["lifeClassStudents"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["lifeClassStudents"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["lifeClassStudents"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          23. How many of them are not in town? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="studentsOutOfTown"
                          className={`w-full rounded-md border ${
                            formErrors["studentsOutOfTown"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["studentsOutOfTown"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["studentsOutOfTown"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          24. How many are on GLOBAL? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="studentsOnGlobal"
                          className={`w-full rounded-md border ${
                            formErrors["studentsOnGlobal"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["studentsOnGlobal"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["studentsOnGlobal"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          25. How many are on Tape Division? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="studentsOnTapeDivision"
                          className={`w-full rounded-md border ${
                            formErrors["studentsOnTapeDivision"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["studentsOnTapeDivision"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["studentsOnTapeDivision"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          26. How much are you owing in dues (department and forum)?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="duesOwing"
                          className={`w-full rounded-md border ${
                            formErrors["duesOwing"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["duesOwing"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["duesOwing"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          27. Are you a student or worker? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="occupation"
                          className={`w-full rounded-md border ${
                            formErrors["occupation"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["occupation"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["occupation"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          28. How much have you given this year? <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="amountGiven"
                          className={`w-full rounded-md border ${
                            formErrors["amountGiven"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["amountGiven"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["amountGiven"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          29. How many souls have you brought to church this year?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="soulsWon"
                          className={`w-full rounded-md border ${
                            formErrors["soulsWon"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        />
                        {formErrors["soulsWon"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["soulsWon"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          30. When on break, how do you spiritually manage yourself in the vision (for campus church
                          HODs)? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="spiritualManagement"
                          className={`w-full rounded-md border ${
                            formErrors["spiritualManagement"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["spiritualManagement"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["spiritualManagement"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          31. Observation on things to improve in your department, installation, central and forum{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="improvementObservations"
                          className={`w-full rounded-md border ${
                            formErrors["improvementObservations"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["improvementObservations"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["improvementObservations"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          32. How can you be of help to move your installation to the next level{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="helpMovingInstallation"
                          className={`w-full rounded-md border ${
                            formErrors["helpMovingInstallation"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["helpMovingInstallation"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["helpMovingInstallation"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          33. What innovation/ creativity have you added to your department{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="innovationCreativity"
                          className={`w-full rounded-md border ${
                            formErrors["innovationCreativity"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["innovationCreativity"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">
                            {formErrors["innovationCreativity"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          34. Is there anything we can do to move your department to the next level{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="departmentHelp"
                          className={`w-full rounded-md border ${
                            formErrors["departmentHelp"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["departmentHelp"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["departmentHelp"]}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          35. Do you have any challenges? <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="hasChallenges"
                          className={`mb-3 w-full rounded-md border ${
                            formErrors["hasChallenges"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          required
                          onChange={handleInputChange}
                        >
                          <option value="">Select an option</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        {formErrors["hasChallenges"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["hasChallenges"]}</p>
                        )}

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          If so, are you open to share them?{" "}
                          {formData["hasChallenges"] === "yes" && <span className="text-red-500">*</span>}
                        </label>
                        <textarea
                          name="challengesDetails"
                          className={`w-full rounded-md border ${
                            formErrors["challengesDetails"] ? "border-red-500" : "border-gray-300"
                          } p-2 ${focusColor} focus:outline-none`}
                          rows={3}
                          required={formData["hasChallenges"] === "yes"}
                          onChange={handleInputChange}
                        ></textarea>
                        {formErrors["challengesDetails"] && (
                          <p className="mt-1 text-xs text-red-500 error-message">{formErrors["challengesDetails"]}</p>
                        )}
                      </div>
                    </>
                  )}

                  {/* ... rest of the code ... */}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 text-white ${buttonColor} rounded-md hover:opacity-90`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
