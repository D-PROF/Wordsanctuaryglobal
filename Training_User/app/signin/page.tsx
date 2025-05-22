"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export default function SignIn() {
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && isValidEmail(email)) {
      router.push("/verification")
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-purple-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <img src="/images/word-sanctuary-logo-black.png" alt="Word Sanctuary" className="h-16 w-auto" />
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold text-purple-900">Sign in</h1>
        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your email address to receive a one-time passcode
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-xs text-gray-500">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className={`w-full rounded border ${
                email && !isValidEmail(email) ? "border-red-500" : "border-gray-300"
              } px-3 py-2 focus:border-purple-500 focus:outline-none`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {email && !isValidEmail(email) && (
              <p className="mt-1 text-xs text-red-500">Please enter a valid email address</p>
            )}
          </div>

          <div className="mb-4 text-center text-xs">
            <span className="text-gray-500">New to the existing process? </span>
            <Link href="#" className="text-purple-600 hover:underline">
              Register
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-indigo-900 py-2 text-white hover:bg-indigo-800 focus:outline-none"
          >
            Get Code
          </button>
        </form>
      </div>
    </div>
  )
}
