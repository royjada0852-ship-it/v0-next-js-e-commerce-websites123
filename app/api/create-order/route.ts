import { NextResponse } from "next/server"
import Razorpay from "razorpay"

export async function POST(request: Request) {
  try {
    const { amount, productId, productName, customerDetails } = await request.json()

    // Check if Razorpay credentials are configured (Set these in the Vercel/v0 project settings)
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("[v0] Razorpay credentials not configured")
      return NextResponse.json(
        { success: false, error: "Payment gateway not configured. Please add Razorpay credentials." },
        { status: 500 },
      )
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    // Create Razorpay order (amount must be in smallest currency unit, e.g., Paise for INR)
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert INR to Paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        productId,
        productName,
        customerName: customerDetails.fullName,
        customerEmail: customerDetails.email,
      },
    })

    return NextResponse.json({
      success: true,
      order,
      keyId: process.env.RAZORPAY_KEY_ID,
    })
  } catch (error) {
    console.error("[v0] Error creating Razorpay order:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}
