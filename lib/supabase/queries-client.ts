"use client"

import { createClient } from "./client"

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  image_url: string | null
  category_id: string | null
  product_type: "pet" | "accessory" | "pet_care" | "supplement" | "food"
  sub_category: string | null
  stock_quantity: number
  is_featured: boolean
  breed: string | null
  age: string | null
  size: string | null
  color: string | null
  weight: string | null
  created_at: string
}

export async function submitContactRequest(formData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const supabase = createClient()
  if (!supabase) return { success: false, error: "Supabase not initialized" }

  const { error } = await supabase.from("contact_requests").insert([formData])

  if (error) {
    console.error("[v0] Error submitting contact request:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
