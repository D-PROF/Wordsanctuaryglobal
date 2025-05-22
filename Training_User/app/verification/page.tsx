"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Verification() {
  const [code, setCode] = useState(["", "", "", ""])
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]
  const router = useRouter()

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Move to next input if current input is filled
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.every((digit) => digit !== "")) {
      router.push("/select-training")
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-purple-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">Account Verification</h1>
        <p className="mb-8 text-center text-sm text-gray-600">4-digit verification code has been sent to your email.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-8 flex justify-center space-x-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                className="h-14 w-14 rounded-md border border-gray-300 text-center text-xl focus:border-purple-500 focus:outline-none"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputMode="numeric"
                pattern="[0-9]"
              />
            ))}
          </div>

          <div className="mb-8 text-center text-sm">
            <span className="text-gray-600">Didn't receive the code. </span>
            <Link href="#" className="text-purple-600 hover:underline">
              Resend it
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-indigo-900 py-2 text-white hover:bg-indigo-800 focus:outline-none"
          >
            Enter Code
          </button>
        </form>
      </div>
    </div>
  )
}
