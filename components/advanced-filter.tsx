"use client"

import { useState } from "react"
import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react"

export interface AdvancedFilterOptions {
  searchTerm: string
  categories: string[]
  priceRange: { min: number; max: number }
  productTypes: string[]
  purposes: string[]
  sortBy: "price_asc" | "price_desc" | "name" | "newest"
}

interface AdvancedFilterProps {
  onFilterChange: (filters: AdvancedFilterOptions) => void
  availableCategories?: string[]
  availableProductTypes?: string[]
  availablePurposes?: string[]
  showCategoryPills?: boolean
  showProductTypes?: boolean
  showPurposes?: boolean
  maxPrice?: number
}

export function AdvancedFilter({
  onFilterChange,
  availableCategories = [],
  availableProductTypes = [],
  availablePurposes = [],
  showCategoryPills = true,
  showProductTypes = true,
  showPurposes = true,
  maxPrice = 50000,
}: AdvancedFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: maxPrice })
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([])
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<AdvancedFilterOptions["sortBy"]>("newest")
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = () => {
    onFilterChange({
      searchTerm,
      categories: selectedCategories,
      priceRange,
      productTypes: selectedProductTypes,
      purposes: selectedPurposes,
      sortBy,
    })
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    onFilterChange({
      searchTerm: value,
      categories: selectedCategories,
      priceRange,
      productTypes: selectedProductTypes,
      purposes: selectedPurposes,
      sortBy,
    })
  }

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]
    setSelectedCategories(newCategories)

    onFilterChange({
      searchTerm,
      categories: newCategories,
      priceRange,
      productTypes: selectedProductTypes,
      purposes: selectedPurposes,
      sortBy,
    })
  }

  const toggleProductType = (type: string) => {
    const newTypes = selectedProductTypes.includes(type)
      ? selectedProductTypes.filter((t) => t !== type)
      : [...selectedProductTypes, type]
    setSelectedProductTypes(newTypes)

    onFilterChange({
      searchTerm,
      categories: selectedCategories,
      priceRange,
      productTypes: newTypes,
      purposes: selectedPurposes,
      sortBy,
    })
  }

  const togglePurpose = (purpose: string) => {
    const newPurposes = selectedPurposes.includes(purpose)
      ? selectedPurposes.filter((p) => p !== purpose)
      : [...selectedPurposes, purpose]
    setSelectedPurposes(newPurposes)

    onFilterChange({
      searchTerm,
      categories: selectedCategories,
      priceRange,
      productTypes: selectedProductTypes,
      purposes: newPurposes,
      sortBy,
    })
  }

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max })
  }

  const applyPriceFilter = () => {
    handleFilterChange()
  }

  const handleSortChange = (value: AdvancedFilterOptions["sortBy"]) => {
    setSortBy(value)
    onFilterChange({
      searchTerm,
      categories: selectedCategories,
      priceRange,
      productTypes: selectedProductTypes,
      purposes: selectedPurposes,
      sortBy: value,
    })
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setPriceRange({ min: 0, max: maxPrice })
    setSelectedProductTypes([])
    setSelectedPurposes([])
    setSortBy("newest")

    onFilterChange({
      searchTerm: "",
      categories: [],
      priceRange: { min: 0, max: maxPrice },
      productTypes: [],
      purposes: [],
      sortBy: "newest",
    })
  }

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCategories.length > 0 ||
    priceRange.min !== 0 ||
    priceRange.max !== maxPrice ||
    selectedProductTypes.length > 0 ||
    selectedPurposes.length > 0 ||
    sortBy !== "newest"

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
            onChange={(e) => handleSearchChange(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => handleSearchChange("")} className="clear-btn" aria-label="Clear search">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      {showCategoryPills && availableCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategories.includes(category)
                  ? "bg-primary-teal text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Filter Toggle and Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="filter-card hover:border-primary-teal transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary-teal" />
            <span className="text-sm font-medium">Advanced Filters</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as AdvancedFilterOptions["sortBy"])}
            className="form-select text-sm px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 space-y-6 slide-down">
          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange(Number(e.target.value), priceRange.max)}
                  onBlur={applyPriceFilter}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20"
                />
              </div>
              <span className="text-gray-500">-</span>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange(priceRange.min, Number(e.target.value))}
                  onBlur={applyPriceFilter}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-primary-teal focus:ring-2 focus:ring-primary-teal/20"
                />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
            </div>
          </div>

          {/* Product Types Filter */}
          {showProductTypes && availableProductTypes.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Product Type</label>
              <div className="flex flex-wrap gap-2">
                {availableProductTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleProductType(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedProductTypes.includes(type)
                        ? "bg-primary-teal text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Purpose/Usage Filter */}
          {showPurposes && availablePurposes.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Purpose / Usage</label>
              <div className="flex flex-wrap gap-2">
                {availablePurposes.map((purpose) => (
                  <button
                    key={purpose}
                    onClick={() => togglePurpose(purpose)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedPurposes.includes(purpose)
                        ? "bg-primary-teal text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {purpose}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
