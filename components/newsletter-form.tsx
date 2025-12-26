"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Mail } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [isClient, setIsClient] = useState(false)

  // <CHANGE> Mark component as client-side only after hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isClient) return

    setStatus("loading")

    const supabase = createClient()
    if (!supabase) {
      setStatus("error")
      setMessage("Database connection not available. Please try again later.")
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
      return
    }

    const { error } = await supabase.from("newsletter_subscribers").insert({ email })

    if (error) {
      setStatus("error")
      setMessage(error.code === "23505" ? "You're already subscribed!" : "Something went wrong. Please try again.")
    } else {
      setStatus("success")
      setMessage("Thanks for subscribing! Check your inbox for pet tips.")
      setEmail("")
    }

    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 5000)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border border-gray-100 rounded-[32px] p-12 shadow-xl">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4318ff] to-[#6c5ce7] rounded-full mb-6 shadow-lg">
          <Mail className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-4xl font-bold mb-4 tracking-tight">
          Get <span className="text-gradient">Pet Tips</span> & Updates
        </h3>
        <p className="text-gray-600 mb-8 text-lg font-medium">
          Subscribe to our newsletter for expert pet care tips and exclusive offers!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-[#4318ff] focus:ring-4 focus:ring-blue-100 outline-none transition-all text-base"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-gradient px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all disabled:opacity-50 text-base"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p className={`mt-5 text-base font-semibold ${status === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
