"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Mail, Phone, MapPin, Send, Sparkles, Heart, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [statusMessage, setStatusMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")

    const supabase = createClient()
    if (!supabase) {
      setStatus("error")
      setStatusMessage("Database connection not available. Please try again later.")
      setTimeout(() => {
        setStatus("idle")
        setStatusMessage("")
      }, 5000)
      return
    }

    const { error } = await supabase.from("contacts").insert(formData)

    if (error) {
      setStatus("error")
      setStatusMessage("Something went wrong. Please try again.")
    } else {
      setStatus("success")
      setStatusMessage("Message sent successfully! We'll get back to you soon.")
      setFormData({ name: "", email: "", subject: "", message: "" })
    }

    setTimeout(() => {
      setStatus("idle")
      setStatusMessage("")
    }, 5000)
  }

  return (
    <main className="container mx-auto px-4 pb-12">
      <section className="bg-gradient-to-br from-yellow-400/20 via-pink-300/10 to-transparent backdrop-blur-sm border border-yellow-400/20 rounded-3xl p-12 mt-8 shadow-xl text-center relative overflow-hidden animate-slide-up-fade">
        <div className="absolute top-10 right-20 text-yellow-400/20 floating-icon">
          <MessageCircle size={40} />
        </div>
        <div className="absolute top-24 left-20 text-pink-400/20 floating-icon" style={{ animationDelay: "1.3s" }}>
          <Sparkles size={32} />
        </div>
        <div className="absolute bottom-10 right-32 text-blue-400/20 floating-icon" style={{ animationDelay: "1.7s" }}>
          <Heart size={36} />
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-slide-up-fade">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto animate-soft-fade" style={{ animationDelay: "0.2s" }}>
            Have questions about our pets or services? We'd love to hear from you!
          </p>
        </div>
      </section>

      <div className="my-16 grid lg:grid-cols-3 gap-8">
        {[
          {
            icon: Phone,
            title: "Call Us",
            info: ["9263810276", "6204408318"],
            color: "from-blue-400 to-blue-300",
          },
          {
            icon: Mail,
            title: "Email Us",
            info: ["support@dogify.com", "info@dogify.com"],
            color: "from-pink-400 to-pink-300",
          },
          {
            icon: MapPin,
            title: "Visit Us",
            info: ["123 Pet Street", "Pet City, PC 12345"],
            color: "from-yellow-400 to-yellow-300",
          },
        ].map((contact, idx) => {
          const Icon = contact.icon
          return (
            <div key={contact.title} className={`feature-card stagger-${idx + 1}`}>
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{contact.title}</h3>
              {contact.info.map((line) => (
                <p key={line} className="text-gray-600">
                  {line}
                </p>
              ))}
            </div>
          )
        })}
      </div>

      <section className="max-w-3xl mx-auto animate-soft-fade stagger-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/60">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Send us a <span className="text-gradient">Message</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none resize-none"
                placeholder="Tell us how we can help you..."
              />
            </div>

            {statusMessage && (
              <div
                className={`p-4 rounded-xl ${status === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full btn-gradient px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={20} />
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
