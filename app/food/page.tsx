"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { AdvancedFilter, type AdvancedFilterOptions } from "@/components/advanced-filter"
import type { Product } from "@/lib/supabase/queries-client"
import { createClient } from "@/lib/supabase/client"

const FOOD_CATEGORIES = ["Dog Food", "Cat Food", "Bird Food", "Small Pet Food", "Treats"]
const FOOD_PURPOSES = ["Puppy/Kitten", "Adult", "Senior", "Grain-Free", "Special Diet"]

export default function FoodPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all")

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const supabase = createClient()
    if (!supabase) return

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("product_type", "food")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setProducts(data)
      setFilteredProducts(data)
    }
    setLoading(false)
  }

  const handleFilterChange = (filters: AdvancedFilterOptions) => {
    let filtered = [...products]

    // Apply search filter
    if (filters.searchTerm.trim()) {
      const searchLower = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.sub_category?.toLowerCase().includes(searchLower),
      )
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => {
        const subCat = p.sub_category || ""
        return filters.categories.some((cat) => {
          const catLower = cat.toLowerCase().replace(" ", "_")
          return subCat.toLowerCase().includes(catLower)
        })
      })
    }

    // Apply subcategory filter
    if (activeSubCategory !== "all") {
      filtered = filtered.filter((p) => p.sub_category === activeSubCategory)
    }

    // Apply price range filter
    filtered = filtered.filter((p) => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max)

    // Apply sorting
    switch (filters.sortBy) {
      case "price_asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    setFilteredProducts(filtered)
  }

  const subCategories = [
    { id: "all", label: "All Food", icon: "🍽️" },
    { id: "dog_food", label: "Dog Food", icon: "🐕" },
    { id: "cat_food", label: "Cat Food", icon: "🐈" },
    { id: "bird_food", label: "Bird Food", icon: "🦜" },
    { id: "small_pet_food", label: "Small Pet Food", icon: "🐹" },
    { id: "treats", label: "Treats", icon: "🦴" },
  ]

  const handleSubCategoryClick = (subCategoryId: string) => {
    setActiveSubCategory(subCategoryId)
    if (subCategoryId === "all") {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter((p) => p.sub_category === subCategoryId))
    }
  }

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="hero-section mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Premium Pet Food</h1>
        <p className="text-white/90 text-lg">
          Quality nutrition for every pet - from puppies to seniors, we have it all
        </p>
      </div>

      {/* Category Pills */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {subCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSubCategoryClick(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeSubCategory === cat.id
                  ? "bg-gradient-to-r from-primary-teal to-secondary-green text-white shadow-lg scale-105"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md hover:scale-105"
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <AdvancedFilter
        onFilterChange={handleFilterChange}
        availableCategories={FOOD_CATEGORIES}
        availablePurposes={FOOD_PURPOSES}
        showCategoryPills={true}
        showProductTypes={false}
        showPurposes={true}
        maxPrice={4000}
      />

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading food products...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <>
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">No food products found. Try adjusting your filters.</p>
        </div>
      )}
    </main>
  )
}
