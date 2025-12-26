"use client"

import { Search, X } from "lucide-react"
import { useState } from "react"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <section className="mt-8">
      <div className="search-container">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            id="searchInput"
            type="text"
            placeholder="Search by name or breed..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="clear-btn" aria-label="Clear search">
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
