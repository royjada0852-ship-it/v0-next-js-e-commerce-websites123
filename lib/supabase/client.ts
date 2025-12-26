import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  // <CHANGE> Add null checks for environment variables during build time
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return null if env vars are missing (during build)
  if (!url || !key) {
    console.warn("[v0] Supabase credentials not available")
    return null as any
  }

  return createBrowserClient(url, key)
}
