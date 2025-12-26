import { createClient as createServerClient } from "./server"
import { createClient as createBrowserClient } from "./client"

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

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
}

// Server-side queries
export async function getProductsByType(type: string, limit?: number) {
  const supabase = await createServerClient()
  if (!supabase) return []

  let query = supabase.from("products").select("*").eq("product_type", type).order("created_at", { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }
  return data as Product[]
}

export async function getFeaturedProducts(type?: string, limit = 6) {
  const supabase = await createServerClient()
  if (!supabase) return []

  let query = supabase.from("products").select("*").eq("is_featured", true).order("created_at", { ascending: false })

  if (type) {
    query = query.eq("product_type", type)
  }

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) {
    console.error("[v0] Error fetching featured products:", error)
    return []
  }
  return data as Product[]
}

export async function getProductsBySubCategory(subCategory: string) {
  const supabase = await createServerClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("sub_category", subCategory)
    .order("name", { ascending: true })

  if (error) {
    console.error("[v0] Error fetching products by subcategory:", error)
    return []
  }
  return data as Product[]
}

export async function searchProducts(searchTerm: string, productType?: string) {
  const supabase = await createServerClient()
  if (!supabase) return []

  let query = supabase.from("products").select("*").or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)

  if (productType) {
    query = query.eq("product_type", productType)
  }

  const { data, error } = await query
  if (error) {
    console.error("[v0] Error searching products:", error)
    return []
  }
  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const supabase = await createServerClient()
  if (!supabase) return null

  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single()

  if (error) {
    console.error("[v0] Error fetching product by slug:", error)
    return null
  }
  return data as Product
}

// Client-side queries
export async function searchProductsClient(searchTerm: string, productType?: string) {
  const supabase = createBrowserClient()
  if (!supabase) return []

  let query = supabase.from("products").select("*").or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)

  if (productType) {
    query = query.eq("product_type", productType)
  }

  const { data, error } = await query
  if (error) {
    console.error("[v0] Error searching products:", error)
    return []
  }
  return data as Product[]
}

export async function submitContactRequest(formData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const supabase = createBrowserClient()
  if (!supabase) return { success: false, error: "Supabase not initialized" }

  const { error } = await supabase.from("contact_requests").insert([formData])

  if (error) {
    console.error("[v0] Error submitting contact request:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
