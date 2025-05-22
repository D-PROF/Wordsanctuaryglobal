"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface HOIFormProps {
  traineeName?: string
  onClose: () => void
}

export function HOIForm({ traineeName = "Word Sanctuary", onClose }: HOIFormProps) {
  const [recommendation, setRecommendation] = useState("")
  const [characterComment, setCharacterComment] = useState("")
  const [attendanceComment, setAttendanceComment] = useState("")
  const [duesComment, setDuesComment] = useState("")
  const [accuracyComment, setAccuracyComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Appraisal submitted",
        description: "The HOI appraisal has been submitted successfully",
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

  return (
    <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
      <div className="flex justify-center mb-4">
        <Image
          src="/images/word-sanctuary-logo-black.png"
          alt="Word Sanctuary Logo"
          width={80}
          height={40}
          className="h-12 w-auto"
        />
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Head of Installation Appraisal Form</h2>
      <p className="text-sm text-center mb-6">
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
          <label htmlFor="character" className="block text-sm font-medium text-gray-700 mb-1">
            Briefly comment on the character (morals) and readiness (spiritually and lifeClass) of the nominee
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
            Does he or she miss church services or departmental meetings? If yes, why?
          </label>
          <Input
            id="attendance"
            value={attendanceComment}
            onChange={(e) => setAttendanceComment(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="dues" className="block text-sm font-medium text-gray-700 mb-1">
            Is he/she owing dues?
          </label>
          <Input id="dues" value={duesComment} onChange={(e) => setDuesComment(e.target.value)} required />
        </div>

        <div>
          <label htmlFor="accuracy" className="block text-sm font-medium text-gray-700 mb-1">
            Kindly comment on the accuracy of the information in the interview form
          </label>
          <Textarea
            id="accuracy"
            value={accuracyComment}
            onChange={(e) => setAccuracyComment(e.target.value)}
            required
            rows={4}
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
