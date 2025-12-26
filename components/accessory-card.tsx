"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import type { Accessory } from "@/lib/types"
import { MessageCircle } from "lucide-react"

interface AccessoryCardProps {
  accessory: Accessory
}

export function AccessoryCard({ accessory }: AccessoryCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleBuyOnWhatsApp = () => {
    const message = `Hi! I'm interested in purchasing:\n\n*${accessory.name}*\nPrice: ₹${accessory.price.toFixed(2)}\nCategory: Pet Accessory\n\nPlease provide more details.`
    const whatsappUrl = `https://wa.me/919263810276?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div
      ref={cardRef}
      className={`product-card p-7 group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="relative mb-5 overflow-hidden rounded-2xl h-48">
        <Image
          src={accessory.image_url || "/placeholder.svg"}
          alt={accessory.name}
          width={300}
          height={300}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
        />
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-bold text-gray-800 tracking-tight group-hover:text-[#4318ff] transition-colors duration-300">
          {accessory.name}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-2 font-medium">{accessory.description}</p>

        <div className="star-rating flex items-center gap-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="text-base inline-block transition-all duration-300 hover:scale-125 hover:rotate-12"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {i < Math.floor(accessory.rating) ? "★" : "☆"}
            </span>
          ))}
          <span className="text-xs text-gray-600 ml-1.5 font-medium">({accessory.rating})</span>
        </div>

        <div className="flex items-center justify-between pt-5">
          <span className="text-xl font-bold text-[#4318ff] group-hover:scale-110 transition-transform duration-300 inline-block">
            ₹{accessory.price.toFixed(2)}
          </span>
          <button
            onClick={handleBuyOnWhatsApp}
            className="btn-gradient px-5 py-2.5 rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:-translate-y-1 active:translate-y-0"
          >
            <MessageCircle size={18} className="group-hover:animate-bounce" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
