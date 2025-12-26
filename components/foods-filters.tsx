"use client"

export function FoodsFilters() {
  return (
    <section className="mt-6">
      <div className="flex flex-wrap gap-4">
        <div className="filter-card">
          <label className="text-sm text-gray-400 mr-2">Category</label>
          <select className="form-select">
            <option value="All">All Categories</option>
            <option value="Dry Food">Dry Food</option>
            <option value="Wet Food">Wet Food</option>
            <option value="Puppy">Puppy</option>
            <option value="Adult">Adult</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>

        <div className="filter-card">
          <label className="text-sm text-gray-400 mr-2">Price</label>
          <select className="form-select">
            <option value="All">All Prices</option>
            <option value="budget">Budget (Under ₹500)</option>
            <option value="standard">Standard (₹500 — ₹1,000)</option>
            <option value="premium">Premium (₹1,000 — ₹2,000)</option>
            <option value="elite">Elite (Above ₹2,000)</option>
          </select>
        </div>

        <button className="btn btn-outline px-4 py-2 rounded-lg">Reset Filters</button>
      </div>
    </section>
  )
}
