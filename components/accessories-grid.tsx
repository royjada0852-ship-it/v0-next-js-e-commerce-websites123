"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Accessory } from "@/lib/types"
import { AccessoryCard } from "./accessory-card"

export function AccessoriesGrid() {
  const [accessories, setAccessories] = useState<Accessory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    async function fetchAccessories() {
      const supabase = createClient()
      if (!supabase) {
        console.warn("[v0] Supabase client not available")
        setLoading(false)
        return
      }

      setLoading(true)

      let query = supabase.from("accessories").select("*").order("rating", { ascending: false })

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory)
      }

      const { data } = await query
      setAccessories(data || [])
      setLoading(false)
    }

    fetchAccessories()
  }, [selectedCategory])

  const categories = ["all", "toys", "beds", "collars", "bowls", "grooming"]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="product-card p-6 animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap animate-soft-fade">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold capitalize transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-[#4318FF] to-[#7A5AF8] text-white shadow-lg scale-105"
                : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
            }`}
          >
            {category === "all" ? "All" : category}
          </button>
        ))}
      </div>

      {accessories.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛍️</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No accessories found</h3>
          <p className="text-gray-600">Try selecting a different category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-soft-fade stagger-2">
          {accessories.map((accessory) => (
            <AccessoryCard key={accessory.id} accessory={accessory} />
          ))}
        </div>
      )}
    </div>
  )
}
