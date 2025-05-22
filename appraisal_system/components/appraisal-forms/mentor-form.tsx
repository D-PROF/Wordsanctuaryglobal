"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"

interface MentorFormProps {
  traineeName?: string
  onClose: () => void
}

export function MentorForm({ traineeName = "Word Sanctuary", onClose }: MentorFormProps) {
  const [recommendation, setRecommendation] = useState("")
  const [topicsCount, setTopicsCount] = useState("")
  const [characterComment, setCharacterComment] = useState("")
  const [attendanceComment, setAttendanceComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const isMobile = useMobile()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Appraisal submitted",
        description: "The mentor appraisal has been submitted successfully",
      })

      onClose()
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting the appraisal",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formWidth = isMobile ? "w-full" : "max-w-md mx-auto"

  return (
    <div className={`bg-white rounded-lg p-4 md:p-6 ${formWidth}`}>
      <div className="flex justify-center mb-4">
        <Image
          src="/images/word-sanctuary-logo-black.png"
          alt="Word Sanctuary Logo"
          width={80}
          height={40}
          className="h-10 md:h-12 w-auto"
        />
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Mentor Appraisal Form</h2>
      <p className="text-xs md:text-sm text-center mb-4 md:mb-6">
        Kindly select the appropriate Appraisal type to access the list and form
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <Input id="name" value={traineeName} disabled className="bg-gray-200" />
        </div>

        <div>
          <label htmlFor="recommendation" className="block text-sm font-medium text-gray-700 mb-1">
            Level of recommendation of the nominee? High or Low?
          </label>
          <Input
            id="recommendation"
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-1">
            Number of mentoring topics you have taught the nominee?
          </label>
          <Input id="topics" value={topicsCount} onChange={(e) => setTopicsCount(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="character" className="block text-sm font-medium text-gray-700 mb-1">
            Briefly comment on the character(morals) and readiness (spiritually) of the nominee
          </label>
          <Textarea
            id="character"
            value={characterComment}
            onChange={(e) => setCharacterComment(e.target.value)}
            required
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="attendance" className="block text-sm font-medium text-gray-700 mb-1">
            Does he/she miss mentoring classes? If yes, why?
          </label>
          <Input
            id="attendance"
            value={attendanceComment}
            onChange={(e) => setAttendanceComment(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button type="submit" className="bg-black hover:bg-gray-800 text-white px-8" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}
