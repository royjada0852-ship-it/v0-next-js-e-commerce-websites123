import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import type { Product } from "@/lib/supabase/queries-client"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price)

  return (
    <div className="product-card group">
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100 rounded-t-xl">
        <Image
          src={product.image_url || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.is_featured && (
          <div className="absolute top-3 right-3 bg-accent-coral text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        {product.stock_quantity === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 group-hover:text-primary-green transition-colors">
          {product.name}
        </h3>
        {product.description && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>}
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-green">{formattedPrice}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-700">4.8</span>
          </div>
        </div>
        <Link
          href={`/checkout/${product.slug}`}
          className="block w-full bg-gradient-to-r from-orange-500 to-coral-500 text-white py-3 px-4 rounded-xl font-bold hover:from-orange-600 hover:to-coral-600 transition-all text-center shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          BUY NOW
        </Link>
      </div>
    </div>
  )
}
