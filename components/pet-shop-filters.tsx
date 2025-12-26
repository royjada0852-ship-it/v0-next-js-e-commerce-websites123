"use client"

export function PetShopFilters() {
  return (
    <section className="mt-6">
      <div className="flex flex-wrap gap-4">
        <div className="filter-card">
          <label className="text-sm text-gray-400 mr-2">Breed</label>
          <select className="form-select">
            <option value="All">All Breeds</option>
          </select>
        </div>

        <div className="filter-card">
          <label className="text-sm text-gray-400 mr-2">Price</label>
          <select className="form-select">
            <option value="All">All Prices</option>
            <option value="lt5">Under ₹5,000</option>
            <option value="5to20">₹5,000 — ₹20,000</option>
            <option value="gt20">Above ₹20,000</option>
          </select>
        </div>

        <button className="btn btn-outline px-4 py-2 rounded-lg">Reset Filters</button>
      </div>
    </section>
  )
}
