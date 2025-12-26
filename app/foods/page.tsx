"use client"

import { FoodsGrid } from "@/components/foods-grid"
import { SearchBar } from "@/components/search-bar"
import { FoodsFilters } from "@/components/foods-filters"
import { Utensils, Heart, Sparkles } from "lucide-react"

export default function FoodsPage() {
  return (
    <main className="container mx-auto px-4 pb-12">
      <section className="hero-section my-6 md:my-8 p-6 md:p-12 rounded-2xl md:rounded-3xl relative overflow-hidden bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        <div className="absolute top-12 right-24 text-white/20 floating-icon hidden md:block">
          <Utensils size={40} />
        </div>
        <div
          className="absolute top-24 right-52 text-white/15 floating-icon hidden lg:block"
          style={{ animationDelay: "1.2s" }}
        >
          <Heart size={32} />
        </div>
        <div
          className="absolute bottom-20 left-28 text-white/20 floating-icon hidden md:block"
          style={{ animationDelay: "1.8s" }}
        >
          <Sparkles size={36} />
        </div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white animate-slide-up-fade leading-tight">
            🍖 Premium Pet Food <span className="text-yellow-400">— Live Store</span>
          </h1>
          <p
            className="text-base md:text-xl lg:text-2xl text-white/95 mb-4 animate-soft-fade"
            style={{ animationDelay: "0.2s" }}
          >
            Healthy, tasty, and vet-approved food for your beloved pets.
          </p>
        </div>
      </section>

      <div className="animate-soft-fade stagger-1">
        <SearchBar />
      </div>
      <div className="animate-soft-fade stagger-2">
        <FoodsFilters />
      </div>

      <section className="mt-8 mb-12 animate-soft-fade stagger-3">
        <h3 className="mb-6 text-xl md:text-2xl font-bold">🍛 Available Food Products</h3>
        <FoodsGrid />

        <div className="text-center mt-12">
          <p className="text-base md:text-lg text-yellow-600 font-semibold">
            🍽️ Start your healthy feeding journey from today!
          </p>
        </div>
      </section>
    </main>
  )
}
