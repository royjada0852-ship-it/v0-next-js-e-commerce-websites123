"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Pet, Accessory } from "@/lib/types"
import { PetCard } from "./pet-card"
import { AccessoryCard } from "./accessory-card"

interface ProductsGridProps {
  type: "pets" | "accessories"
  limit?: number
}

export function ProductsGrid({ type, limit }: ProductsGridProps) {
  const [items, setItems] = useState<Pet[] | Accessory[]>([])
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // <CHANGE> Mark component as client-side only after hydration
    setIsClient(true)
  }, [])

  useEffect(() => {
    async function fetchData() {
      if (!isClient) return

      const supabase = createClient()
      if (!supabase) {
        setLoading(false)
        return
      }

      setLoading(true)

      if (type === "pets") {
        const query = supabase.from("pets").select("*").order("rating", { ascending: false })

        if (limit) {
          query.limit(limit)
        }

        const { data } = await query
        setItems((data as Pet[]) || [])
      } else {
        const query = supabase.from("accessories").select("*").order("rating", { ascending: false })

        if (limit) {
          query.limit(limit)
        }

        const { data } = await query
        setItems((data as Accessory[]) || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [type, limit, isClient])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="product-card p-6 animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {type === "pets"
        ? (items as Pet[]).map((pet) => <PetCard key={pet.id} pet={pet} />)
        : (items as Accessory[]).map((accessory) => <AccessoryCard key={accessory.id} accessory={accessory} />)}
    </div>
  )
}
