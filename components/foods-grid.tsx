"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Food } from "@/lib/types"
import { FoodCard } from "./food-card"

export function FoodsGrid() {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPetType, setSelectedPetType] = useState<string>("all")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("all")

  useEffect(() => {
    async function fetchFoods() {
      const supabase = createClient()
      if (!supabase) {
        console.warn("[v0] Supabase client not available")
        setLoading(false)
        return
      }

      setLoading(true)

      let query = supabase.from("foods").select("*").order("rating", { ascending: false })

      if (selectedPetType !== "all") {
        query = query.eq("pet_type", selectedPetType)
      }

      if (selectedAgeGroup !== "all") {
        query = query.eq("age_group", selectedAgeGroup)
      }

      const { data } = await query
      setFoods(data || [])
      setLoading(false)
    }

    fetchFoods()
  }, [selectedPetType, selectedAgeGroup])

  const petTypes = [
    { value: "all", label: "All Pets", emoji: "🐾" },
    { value: "dog", label: "Dogs", emoji: "🐕" },
    { value: "cat", label: "Cats", emoji: "🐈" },
    { value: "bird", label: "Birds", emoji: "🦜" },
    { value: "rabbit", label: "Rabbits", emoji: "🐰" },
  ]
  const ageGroups = ["all", "puppy", "adult", "senior"]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-2 flex-wrap animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
      <div className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2">Pet Type:</p>
          <div className="flex gap-2 flex-wrap animate-soft-fade">
            {petTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedPetType(type.value)}
                className={`px-4 md:px-6 py-2 rounded-full font-semibold capitalize transition-all duration-300 text-sm md:text-base ${
                  selectedPetType === type.value
                    ? "bg-gradient-to-r from-[#4318FF] to-[#7A5AF8] text-white shadow-lg scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200"
                }`}
              >
                <span className="mr-1">{type.emoji}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2">Age Group:</p>
          <div className="flex gap-2 flex-wrap animate-soft-fade">
            {ageGroups.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAgeGroup(age)}
                className={`px-4 md:px-6 py-2 rounded-full font-semibold capitalize transition-all duration-300 text-sm md:text-base ${
                  selectedAgeGroup === age
                    ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-lg scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200"
                }`}
              >
                {age === "all" ? "All Ages" : age}
              </button>
            ))}
          </div>
        </div>
      </div>

      {foods.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No food products found</h3>
          <p className="text-gray-600">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-soft-fade stagger-2">
          {foods.map((food, index) => (
            <div key={food.id} className="animate-slide-up-fade" style={{ animationDelay: `${index * 50}ms` }}>
              <FoodCard food={food} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
