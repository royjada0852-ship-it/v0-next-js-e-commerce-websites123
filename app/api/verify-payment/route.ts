import { NextResponse } from "next/server"
import crypto from "crypto"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerDetails, productName, amount } =
      await request.json()

    // Verify Razorpay signature to prevent unauthorized order creation
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("[v0] Razorpay secret not configured")
      return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 500 })
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    if (generatedSignature !== razorpay_signature) {
      console.error("[v0] Payment signature verification failed")
      return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 400 })
    }

    // Store order in database
    const supabase = await createClient()
    if (!supabase) {
      console.error("[v0] Database not available")
      return NextResponse.json({ success: false, error: "Database error" }, { status: 500 })
    }

    // Create or get customer
    let customerId
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("email", customerDetails.email)
      .single()

    if (existingCustomer) {
      customerId = existingCustomer.id
      // Update customer details
      await supabase
        .from("customers")
        .update({
          full_name: customerDetails.fullName,
          phone: customerDetails.mobile,
          address: customerDetails.house,
          city: customerDetails.city,
          state: customerDetails.state,
          zip_code: customerDetails.pinCode,
        })
        .eq("id", customerId)
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert([
          {
            email: customerDetails.email,
            full_name: customerDetails.fullName,
            phone: customerDetails.mobile,
            address: customerDetails.house,
            city: customerDetails.city,
            state: customerDetails.state,
            zip_code: customerDetails.pinCode,
          },
        ])
        .select()
        .single()

      if (customerError || !newCustomer) {
        console.error("[v0] Error creating customer:", customerError)
        return NextResponse.json({ success: false, error: "Failed to save customer" }, { status: 500 })
      }
      customerId = newCustomer.id
    }

    // Create order
    const shippingAddress = `${customerDetails.house}, ${customerDetails.city}, ${customerDetails.state} - ${customerDetails.pinCode}`

    const { error: orderError } = await supabase.from("orders").insert([
      {
        customer_id: customerId,
        total_amount: amount,
        status: "completed",
        payment_id: razorpay_payment_id,
        payment_status: "paid",
        shipping_address: shippingAddress,
      },
    ])

    if (orderError) {
      console.error("[v0] Error creating order:", orderError)
    }

    // Send email notification
    try {
      await fetch(`${request.url.replace("/verify-payment", "/send-order-email")}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails,
          productName,
          amount,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
        }),
      })
    } catch (emailError) {
      console.error("[v0] Error sending email:", emailError)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error verifying payment:", error)
    return NextResponse.json({ success: false, error: "Payment verification failed" }, { status: 500 })
  }
}
