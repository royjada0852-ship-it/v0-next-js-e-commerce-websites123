"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { Pet } from "@/lib/types"
import { PetCard } from "@/components/pet-card"
import { Search, X, SlidersHorizontal, Heart, PawPrint, Sparkles } from "lucide-react"
import { LoadingPage } from "@/components/loading-page"

export default function PetShopPage() {
  const searchParams = useSearchParams()
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [selectedGender, setSelectedGender] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    async function fetchPets() {
      const supabase = createClient()
      if (!supabase) {
        console.warn("[v0] Supabase client not available")
        setLoading(false)
        return
      }

      setLoading(true)

      let query = supabase.from("pets").select("*")

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory)
      }

      if (selectedGender !== "all") {
        query = query.eq("gender", selectedGender)
      }

      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map(Number)
        query = query.gte("price", min)
        if (max) {
          query = query.lte("price", max)
        }
      }

      if (sortBy === "price-low") {
        query = query.order("price", { ascending: true })
      } else if (sortBy === "price-high") {
        query = query.order("price", { ascending: false })
      } else if (sortBy === "rating") {
        query = query.order("rating", { ascending: false })
      } else {
        query = query.order("created_at", { ascending: false })
      }

      const { data } = await query
      setPets(data || [])
      setLoading(false)
    }

    fetchPets()
  }, [selectedCategory, selectedGender, priceRange, sortBy])

  const filteredPets = pets.filter(
    (pet) =>
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading && pets.length === 0) {
    return <LoadingPage />
  }

  return (
    <main className="container mx-auto px-4 pb-12">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4318FF] via-[#5B2FE8] to-[#7A5AF8] rounded-2xl md:rounded-3xl mt-6 md:mt-8 shadow-2xl">
        <div className="absolute top-8 right-12 text-white/10 floating-icon hidden md:block">
          <Heart size={48} />
        </div>
        <div
          className="absolute top-20 right-32 text-white/8 floating-icon hidden lg:block"
          style={{ animationDelay: "1.2s" }}
        >
          <PawPrint size={36} />
        </div>
        <div
          className="absolute bottom-12 left-16 text-white/10 floating-icon hidden md:block"
          style={{ animationDelay: "2s" }}
        >
          <Sparkles size={40} />
        </div>

        <div className="relative z-10 p-6 md:p-12 animate-slide-up-fade">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 text-white leading-tight">
            Pet Shopping <span className="text-yellow-300">— Find Your Perfect Companion</span>
          </h1>
          <p className="text-white/95 text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed font-medium">
            Browse our collection of adorable pets looking for their forever homes. Filter by category, gender, and
            price to find your new best friend!
          </p>
        </div>
      </section>

      <div className="my-6 md:my-8 animate-soft-fade stagger-1">
        <p className="text-sm font-semibold text-gray-600 mb-3">Quick Filter by Category:</p>
        <div className="flex gap-2 flex-wrap">
          {[
            { value: "all", label: "All Pets", emoji: "🐾" },
            { value: "dog", label: "Dogs", emoji: "🐕" },
            { value: "cat", label: "Cats", emoji: "🐈" },
            { value: "bird", label: "Birds", emoji: "🦜" },
            { value: "rabbit", label: "Rabbits", emoji: "🐰" },
          ].map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 md:px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                selectedCategory === cat.value
                  ? "bg-gradient-to-r from-[#4318FF] to-[#7A5AF8] text-white shadow-lg scale-105"
                  : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200"
              }`}
            >
              <span className="mr-1">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="my-6 md:my-8 space-y-6 animate-soft-fade stagger-1">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/60">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="text-yellow-500" />
            <h3 className="text-lg md:text-xl font-bold">Search & Filter</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none text-sm md:text-base"
              >
                <option value="all">All Pets</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="bird">Birds</option>
                <option value="rabbit">Rabbits</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none text-sm md:text-base"
              >
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none text-sm md:text-base"
              >
                <option value="all">All Prices</option>
                <option value="0-8300">Under ₹8,300</option>
                <option value="8300-24900">₹8,300 - ₹24,900</option>
                <option value="24900-41500">₹24,900 - ₹41,500</option>
                <option value="41500-999999">₹41,500+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none text-sm md:text-base"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or breed..."
              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none text-sm md:text-base"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm md:text-base">
          Showing <span className="font-semibold text-yellow-600">{filteredPets.length}</span>{" "}
          {filteredPets.length === 1 ? "pet" : "pets"}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="product-card p-6 animate-pulse">
              <div className="bg-gray-200 h-56 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : filteredPets.length === 0 ? (
        <div className="text-center py-20 animate-soft-fade">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No pets found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-soft-fade stagger-2">
          {filteredPets.map((pet, index) => (
            <div key={pet.id} className="animate-slide-up-fade" style={{ animationDelay: `${index * 50}ms` }}>
              <PetCard pet={pet} />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
