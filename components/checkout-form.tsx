"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import type { Product } from "@/lib/supabase/queries-client"

interface CheckoutFormProps {
  product: Product
}

export function CheckoutForm({ product }: CheckoutFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    house: "",
    city: "",
    state: "",
    pinCode: "",
    termsAccepted: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.house.trim()) newErrors.house = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = "PIN code is required"
    } else if (!/^[0-9]{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "Please enter a valid 6-digit PIN code"
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Create Razorpay order
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: product.price,
          productId: product.id,
          productName: product.name,
          customerDetails: formData,
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create order")
      }

      // Load Razorpay script
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        const options = {
          key: orderData.keyId,
          amount: orderData.order.amount,
          currency: orderData.order.currency,
          name: "PawHaven",
          description: product.name,
          order_id: orderData.order.id,
          handler: async (response: any) => {
            // Verify payment
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customerDetails: formData,
                productName: product.name,
                amount: product.price,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyData.success) {
              router.push(
                `/payment-success?orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}&product=${encodeURIComponent(product.name)}&amount=${product.price}`,
              )
            } else {
              alert("Payment verification failed. Please contact support.")
              setIsLoading(false)
            }
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.mobile,
          },
          theme: {
            color: "#059669",
          },
          modal: {
            ondismiss: () => {
              setIsLoading(false)
            },
          },
        }

        const razorpay = new (window as any).Razorpay(options)
        razorpay.open()
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : false

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <div className="bg-white rounded-3xl p-8 shadow-lg h-fit sticky top-24">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <div className="flex gap-4 mb-6">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={product.image_url || "/placeholder.svg?height=100&width=100"}
              alt={product.name}
              fill
              className="object-contain rounded-xl"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
          </div>
        </div>
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Quantity</span>
            <span className="font-semibold">1</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">{formattedPrice}</span>
          </div>
          <div className="border-t pt-3 flex justify-between text-lg">
            <span className="font-bold">Total Amount</span>
            <span className="font-bold text-primary-green text-2xl">{formattedPrice}</span>
          </div>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`form-input ${errors.fullName ? "border-red-500" : ""}`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-semibold mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`form-input ${errors.mobile ? "border-red-500" : ""}`}
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "border-red-500" : ""}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="house" className="block text-sm font-semibold mb-2">
              Complete Delivery Address *
            </label>
            <textarea
              id="house"
              name="house"
              value={formData.house}
              onChange={handleChange}
              className={`form-input min-h-[100px] ${errors.house ? "border-red-500" : ""}`}
              placeholder="House/Flat No., Street, Area"
              rows={3}
            />
            {errors.house && <p className="text-red-500 text-sm mt-1">{errors.house}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-semibold mb-2">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`form-input ${errors.city ? "border-red-500" : ""}`}
                placeholder="Enter city"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-semibold mb-2">
                State *
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`form-input ${errors.state ? "border-red-500" : ""}`}
                placeholder="Enter state"
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="pinCode" className="block text-sm font-semibold mb-2">
              PIN Code *
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className={`form-input ${errors.pinCode ? "border-red-500" : ""}`}
              placeholder="Enter 6-digit PIN code"
              maxLength={6}
            />
            {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode}</p>}
          </div>

          <div className="flex items-start gap-3 pt-4">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mt-1 w-5 h-5 text-primary-green border-gray-300 rounded focus:ring-primary-green"
            />
            <label htmlFor="termsAccepted" className="text-sm text-gray-700">
              I agree to the terms and conditions, privacy policy, and confirm that all details provided are accurate. *
            </label>
          </div>
          {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-coral-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-coral-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>Proceed to Payment</>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
