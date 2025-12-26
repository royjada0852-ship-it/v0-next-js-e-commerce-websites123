import { createClient } from "./server"

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

export async function getProductsByType(type: string, limit?: number) {
  const supabase = await createClient()
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
  const supabase = await createClient()
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
  const supabase = await createClient()
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
  const supabase = await createClient()
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
  const supabase = await createClient()
  if (!supabase) return null

  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single()

  if (error) {
    console.error("[v0] Error fetching product by slug:", error)
    return null
  }
  return data as Product
}

export async function getPetCareProducts(limit?: number) {
  return getProductsByType("pet_care", limit)
}

export async function getAccessories(limit?: number) {
  return getProductsByType("accessory", limit)
}

export async function getSupplements(limit?: number) {
  return getProductsByType("supplement", limit)
}

export async function getFoodProducts(limit?: number) {
  return getProductsByType("food", limit)
}

export async function getPetCareProductsByCategory(category: string) {
  return getProductsBySubCategory(category)
}

export async function getFoodProductsByCategory(category: string) {
  return getProductsBySubCategory(category)
}
