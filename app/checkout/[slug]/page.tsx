import { notFound } from "next/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { getProductBySlug } from "@/lib/supabase/queries-server"

export const dynamic = "force-dynamic"

interface CheckoutPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="text-gradient">Checkout</span>
        </h1>
        <CheckoutForm product={product} />
      </div>
    </main>
  )
}
