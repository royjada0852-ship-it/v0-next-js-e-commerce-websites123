"use client"

export function AccessoriesFilters() {
  return (
    <section className="mt-6">
      <div className="flex flex-wrap gap-4">
        <div className="filter-card">
          <label className="text-sm text-gray-400 mr-2">Category</label>
          <select className="form-select">
            <option value="All">All</option>
            <option value="Toys">Toys</option>
            <option value="Beds">Beds</option>
            <option value="Collars">Collars</option>
            <option value="Grooming">Grooming</option>
            <option value="Food">Food</option>
          </select>
        </div>

        <div className="filter-card">
          <label className="text-sm text-gray-400 mr-2">Price</label>
          <select className="form-select">
            <option value="All">All Prices</option>
            <option value="lt500">Under ₹500</option>
            <option value="500to1500">₹500 — ₹1500</option>
            <option value="gt1500">Above ₹1500</option>
          </select>
        </div>

        <button className="btn btn-outline px-4 py-2 rounded-lg">Reset Filters</button>
      </div>
    </section>
  )
}
