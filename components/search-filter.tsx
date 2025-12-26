"use client"

import { useState } from "react"
import { Search, X, SlidersHorizontal } from "lucide-react"

interface SearchFilterProps {
  onSearch: (searchTerm: string) => void
  onFilter: (filters: FilterOptions) => void
  productType?: string
  showSubCategoryFilter?: boolean
  subCategories?: string[]
}

export interface FilterOptions {
  sortBy: "price_asc" | "price_desc" | "name" | "newest"
  subCategory?: string
}

export function SearchFilter({
  onSearch,
  onFilter,
  productType,
  showSubCategoryFilter = false,
  subCategories = [],
}: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<FilterOptions["sortBy"]>("newest")
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all")

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    onSearch(value)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    onSearch("")
  }

  const handleSortChange = (value: FilterOptions["sortBy"]) => {
    setSortBy(value)
    onFilter({ sortBy: value, subCategory: selectedSubCategory !== "all" ? selectedSubCategory : undefined })
  }

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value)
    onFilter({ sortBy, subCategory: value !== "all" ? value : undefined })
  }

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-box">
          <Search className="search-icon w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={handleClearSearch} className="clear-btn" aria-label="Clear search">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-3 items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="filter-card hover:border-primary-teal transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-primary-teal" />
          <span className="text-sm font-medium">Filters</span>
        </button>

        {showFilters && (
          <>
            {/* Sort By Filter */}
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as FilterOptions["sortBy"])}
              className="form-select text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>

            {/* Sub Category Filter (for Pet Care page) */}
            {showSubCategoryFilter && subCategories.length > 0 && (
              <select
                value={selectedSubCategory}
                onChange={(e) => handleSubCategoryChange(e.target.value)}
                className="form-select text-sm"
              >
                <option value="all">All Categories</option>
                {subCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            )}
          </>
        )}
      </div>
    </div>
  )
}
