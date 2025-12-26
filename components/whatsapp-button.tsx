"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const handleClick = () => {
    const message = "Hello PetJoy! I'd like to inquire about your services."
    const whatsappNumber = "910000000000"
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="whatsapp-float"
      title="Chat with PetJoy on WhatsApp"
      aria-label="Chat with PetJoy on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="whatsapp-badge">Chat</span>
    </button>
  )
}
