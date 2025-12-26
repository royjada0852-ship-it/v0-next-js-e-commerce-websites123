"use client"

import { PetsCareGrid } from "@/components/pets-care-grid"
import { SearchBar } from "@/components/search-bar"
import { Sparkles, Heart, Package } from "lucide-react"

export default function PetsCarePage() {
  return (
    <main className="container mx-auto px-4">
      <section className="hero-section my-8 p-12 rounded-3xl relative overflow-hidden">
        <div className="absolute top-16 right-32 text-white/20 floating-icon">
          <Package size={40} />
        </div>
        <div className="absolute top-32 right-60 text-white/15 floating-icon" style={{ animationDelay: "1.4s" }}>
          <Heart size={32} />
        </div>
        <div className="absolute bottom-28 left-32 text-white/20 floating-icon" style={{ animationDelay: "1.6s" }}>
          <Sparkles size={36} />
        </div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white animate-slide-up-fade leading-tight">
            🧴 Pet Care Products
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-4 animate-soft-fade" style={{ animationDelay: "0.2s" }}>
            Premium grooming and care products for your beloved pets.
          </p>
        </div>
      </section>

      <div className="animate-soft-fade stagger-1">
        <SearchBar />
      </div>

      <section className="mt-8 mb-12 animate-soft-fade stagger-2">
        <h3 className="mb-6 text-2xl font-bold">✨ Available Care Products</h3>
        <PetsCareGrid />
      </section>
    </main>
  )
}
