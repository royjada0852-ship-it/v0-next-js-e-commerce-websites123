"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

export function HealthSupport() {
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    issue: "",
  })

  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.ownerName || !formData.petName || !formData.issue) {
      alert("Please fill all fields")
      return
    }

    const text = `Hi PetJoy team 👋\nName: ${formData.ownerName}\nPet: ${formData.petName}\nIssue: ${formData.issue}\nPlease help urgently.`
    window.open(`https://wa.me/910000000000?text=${encodeURIComponent(text)}`, "_blank")

    setFormData({ ownerName: "", petName: "", issue: "" })
  }

  return (
    <section ref={sectionRef} id="help" className="my-24 pt-6">
      <h3
        className={`mb-12 text-4xl md:text-5xl font-bold text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        Pet Health & <span className="text-gradient">Emergency Support</span>
      </h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div
          className={`help-card bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h5 className="text-2xl font-bold mb-4 text-gray-800">Need immediate help?</h5>
          <p className="text-gray-600 mb-6 leading-relaxed font-medium">
            For health emergencies, contact us on WhatsApp and provide details about your pet. If it&apos;s
            life-threatening, call your nearest vet or emergency rescue first.
          </p>
          <div className="space-y-3">
            <p className="flex items-center gap-3">
              <strong className="text-gray-800">Support Line:</strong>{" "}
              <a
                href="https://wa.me/910000000000"
                className="text-primary font-bold hover:underline transition-all"
                target="_blank"
                rel="noreferrer"
              >
                +91 00000 00000
              </a>
            </p>
            <p className="flex items-center gap-3">
              <strong className="text-gray-800">WhatsApp Support:</strong>{" "}
              <a
                href="https://wa.me/910000000000"
                className="text-[#4318ff] font-semibold hover:underline transition-all hover:translate-x-1"
                target="_blank"
                rel="noreferrer"
              >
                +91 00000 00000
              </a>
            </p>
          </div>
        </div>

        <div
          className={`help-card bg-gradient-to-br from-yellow-50 to-orange-50 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h5 className="text-2xl font-bold mb-4 text-gray-800">Send details & get quick advice</h5>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-2 font-semibold text-gray-700">Your Name</label>
              <input
                className="form-input w-full"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-2 font-semibold text-gray-700">Pet Name</label>
              <input
                className="form-input w-full"
                value={formData.petName}
                onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-2 font-semibold text-gray-700">Issue / Brief Description</label>
              <textarea
                className="form-input w-full"
                rows={3}
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="btn-gradient px-6 py-3 rounded-full font-bold flex-1 hover:-translate-y-1 transition-all duration-300 active:translate-y-0"
              >
                Get Help on WhatsApp
              </button>
              <button
                type="button"
                className="btn-outline px-6 py-3 rounded-full font-bold flex-1 hover:-translate-y-1 transition-all duration-300 active:translate-y-0"
                onClick={() => (window.location.href = "tel:+910000000000")}
              >
                Call Helpline
              </button>
            </div>
            <small className="text-gray-500 block mt-3 text-center font-medium">
              We will forward your message to our support team and respond ASAP.
            </small>
          </form>
        </div>
      </div>
    </section>
  )
}
