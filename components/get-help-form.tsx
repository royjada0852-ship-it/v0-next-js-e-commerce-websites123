"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { submitContactRequest } from "@/lib/supabase/queries-client"

export function GetHelpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    const result = await submitContactRequest(formData)

    if (result.success) {
      setSubmitStatus("success")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } else {
      setSubmitStatus("error")
    }

    setIsSubmitting(false)
  }

  return (
    <div className="help-card max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-3">Get Help</h3>
        <p className="text-gray-600 text-lg">Send us your requirements and we'll get back to you</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="form-input"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="tel"
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={5}
          className="form-input resize-none"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gradient w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <Send className="w-5 h-5" />
        </button>

        {submitStatus === "success" && (
          <p className="text-green-600 text-center font-medium">Message sent successfully! We'll contact you soon.</p>
        )}
        {submitStatus === "error" && (
          <p className="text-red-600 text-center font-medium">Failed to send message. Please try again.</p>
        )}
      </form>
    </div>
  )
}
