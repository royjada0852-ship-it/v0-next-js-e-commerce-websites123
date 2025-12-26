"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MessageCircle } from "lucide-react"
import type { Pet } from "@/lib/types"

interface PetCardProps {
  pet: Pet
}

export function PetCard({ pet }: PetCardProps) {
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
    const message = `Hi! I'm interested in adopting:\n\n*${pet.name}*\nBreed: ${pet.breed}\nAge: ${pet.age} ${pet.age === 1 ? "year" : "years"}\nGender: ${pet.gender}\nPrice: ₹${pet.price.toFixed(2)}\n\nPlease provide more details.`
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
      <div className="relative mb-5 overflow-hidden rounded-2xl h-56">
        <Image
          src={pet.image_url || "/placeholder.svg"}
          alt={pet.name}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
        />
        {pet.featured && (
          <span className="absolute top-4 left-4 bg-[#ffc700] text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg animate-pulse">
            Featured
          </span>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-[#4318ff] transition-colors duration-300">
          {pet.name}
        </h4>
        <p className="text-sm text-gray-600 font-medium">
          {pet.breed} • {pet.age} {pet.age === 1 ? "year" : "years"} • {pet.gender}
        </p>

        <div className="star-rating flex items-center gap-1 text-yellow-400 text-lg">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-300 hover:scale-125 hover:rotate-12"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {i < Math.floor(pet.rating) ? "★" : "☆"}
            </span>
          ))}
          <span className="text-sm text-gray-600 ml-1.5 font-medium">({pet.rating})</span>
        </div>

        <div className="flex items-center justify-between pt-5">
          <span className="text-2xl font-bold text-[#4318ff] group-hover:scale-110 transition-transform duration-300 inline-block">
            ₹{pet.price.toFixed(2)}
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
