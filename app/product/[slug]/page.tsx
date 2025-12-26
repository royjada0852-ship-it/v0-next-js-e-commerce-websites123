import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Package, Shield, Truck } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { BuyNowButton } from "@/components/buy-now-button"
import type { Product } from "@/lib/supabase/queries-server"

export const dynamic = "force-dynamic"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params
  const supabase = await createClient()

  if (!supabase) {
    return <div>Database not available</div>
  }

  const { data: product, error } = await supabase.from("products").select("*").eq("slug", slug).single()

  if (error || !product) {
    notFound()
  }

  const typedProduct = product as Product

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(typedProduct.price)

  return (
    <main className="container mx-auto px-4 py-12">
      <Link
        href={`/${typedProduct.product_type === "pet" ? "pets" : typedProduct.product_type === "accessory" ? "accessories" : typedProduct.product_type === "pet_care" ? "pet-care" : "supplements"}`}
        className="inline-flex items-center gap-2 text-primary-teal hover:text-primary-ocean mb-8 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to {typedProduct.product_type === "pet_care" ? "Pet Care" : typedProduct.product_type}s
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="relative w-full aspect-square">
            <Image
              src={typedProduct.image_url || "/placeholder.svg?height=600&width=600"}
              alt={typedProduct.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{typedProduct.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">4.8</span>
                <span className="text-gray-500">(245 reviews)</span>
              </div>
              {typedProduct.is_featured && (
                <span className="bg-coral-100 text-accent-coral px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </span>
              )}
            </div>
          </div>

          <div className="text-4xl font-bold text-primary-teal">{formattedPrice}</div>

          {typedProduct.description && (
            <div>
              <h3 className="font-bold text-xl mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{typedProduct.description}</p>
            </div>
          )}

          {/* Product Specs */}
          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-xl mb-4">Product Details</h3>
            {typedProduct.breed && (
              <div className="flex justify-between">
                <span className="text-gray-600">Breed:</span>
                <span className="font-semibold">{typedProduct.breed}</span>
              </div>
            )}
            {typedProduct.age && (
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span className="font-semibold">{typedProduct.age}</span>
              </div>
            )}
            {typedProduct.size && (
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-semibold">{typedProduct.size}</span>
              </div>
            )}
            {typedProduct.color && (
              <div className="flex justify-between">
                <span className="text-gray-600">Color:</span>
                <span className="font-semibold">{typedProduct.color}</span>
              </div>
            )}
            {typedProduct.weight && (
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-semibold">{typedProduct.weight}</span>
              </div>
            )}
            {typedProduct.sub_category && (
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-semibold capitalize">{typedProduct.sub_category}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Stock:</span>
              <span className={`font-semibold ${typedProduct.stock_quantity > 0 ? "text-green-600" : "text-red-600"}`}>
                {typedProduct.stock_quantity > 0 ? `${typedProduct.stock_quantity} Available` : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <BuyNowButton product={typedProduct} className="w-full py-4 text-lg" />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-teal-600" />
              <p className="text-sm text-gray-600 font-medium">Secure Payment</p>
            </div>
            <div className="text-center">
              <Truck className="w-8 h-8 mx-auto mb-2 text-teal-600" />
              <p className="text-sm text-gray-600 font-medium">Fast Delivery</p>
            </div>
            <div className="text-center">
              <Package className="w-8 h-8 mx-auto mb-2 text-teal-600" />
              <p className="text-sm text-gray-600 font-medium">Easy Returns</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
