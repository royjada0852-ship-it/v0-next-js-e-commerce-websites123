"use client"

import { useState } from "react"
import { ShoppingBag } from "lucide-react"
import { initiateRazorpayPayment } from "@/lib/razorpay"
import type { Product } from "@/lib/supabase/queries-client"

interface BuyNowButtonProps {
  product: Product
  className?: string
}

export function BuyNowButton({ product, className = "" }: BuyNowButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBuyNow = async () => {
    setIsProcessing(true)

    try {
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(product.price * 100),
          currency: "INR",
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        alert("Failed to create order. Please try again.")
        setIsProcessing(false)
        return
      }

      const options = {
        key: orderData.razorpay_key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Dogify",
        description: product.name,
        order_id: orderData.order_id,
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#14b8a6",
        },
        handler: async (response: any) => {
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              customer_info: {
                name: "Customer Name",
                email: "customer@example.com",
                phone: "1234567890",
                address: "Customer Address",
              },
              items: [
                {
                  product_id: product.id,
                  quantity: 1,
                  price: product.price,
                },
              ],
            }),
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            alert("Payment successful! Your order has been placed.")
          } else {
            alert("Payment verification failed. Please contact support.")
          }

          setIsProcessing(false)
        },
      }

      await initiateRazorpayPayment(options)
    } catch (error) {
      console.error("[v0] Payment error:", error)
      alert("Payment failed. Please try again.")
      setIsProcessing(false)
    }
  }

  return (
    <button
      onClick={handleBuyNow}
      disabled={isProcessing || product.stock_quantity === 0}
      className={`btn-gradient flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isProcessing ? (
        "Processing..."
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" />
          Buy Now
        </>
      )}
    </button>
  )
}
