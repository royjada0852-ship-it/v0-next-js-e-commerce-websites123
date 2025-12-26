"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"
import { AdvancedFilter, type AdvancedFilterOptions } from "@/components/advanced-filter"
import type { Product } from "@/lib/supabase/queries-client"
import { createClient } from "@/lib/supabase/client"

const PET_CATEGORIES = ["Dogs", "Cats", "Birds", "Rabbits"]
const PET_PURPOSES = ["Family Pet", "Guard Dog", "Companion", "Show Quality"]
// </CHANGE>

export default function PetsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const supabase = createClient()
    if (!supabase) return

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("product_type", "pet")
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
          p.breed?.toLowerCase().includes(searchLower),
      )
    }

    // Apply category filter (by breed type)
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => {
        const breed = p.breed || ""
        return filters.categories.some((cat) => breed.toLowerCase().includes(cat.toLowerCase()))
      })
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
  // </CHANGE>

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="hero-section mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Find Your Perfect Pet</h1>
        <p className="text-white/90 text-lg">Browse our collection of healthy, verified pets from trusted breeders</p>
      </div>

      <AdvancedFilter
        onFilterChange={handleFilterChange}
        availableCategories={PET_CATEGORIES}
        availablePurposes={PET_PURPOSES}
        showCategoryPills={true}
        showProductTypes={false}
        showPurposes={true}
        maxPrice={50000}
      />
      {/* </CHANGE> */}

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading pets...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">No pets found. Try adjusting your filters.</p>
        </div>
      )}
    </main>
  )
}
