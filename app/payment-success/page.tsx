"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, Home } from "lucide-react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)

  const orderId = searchParams.get("orderId")
  const paymentId = searchParams.get("paymentId")
  const productName = searchParams.get("product")
  const amount = searchParams.get("amount")

  useEffect(() => {
    setMounted(true)
    // Prevent back button from going to checkout
    window.history.pushState(null, "", window.location.href)
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href)
    }
  }, [])

  const formattedAmount = amount
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(Number(amount))
    : "N/A"

  if (!mounted) return null

  return (
    <main className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center animate-slide-up-fade">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-teal-100 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-16 h-16 text-primary-green" />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-gradient">Payment Successful!</h1>
          <p className="text-xl text-gray-600 mb-8">Thank you for your order</p>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Order Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold text-sm">{orderId || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-semibold text-sm">{paymentId || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-semibold">{productName || "N/A"}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-900 font-bold">Amount Paid:</span>
                <span className="font-bold text-primary-green text-xl">{formattedAmount}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-900 text-left">
                A confirmation email with order details has been sent to your registered email address. Our team will
                contact you shortly regarding delivery.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-coral-500 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-coral-600 transition-all shadow-lg"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href="/pets"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-green text-primary-green px-8 py-4 rounded-xl font-bold hover:bg-primary-green hover:text-white transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
