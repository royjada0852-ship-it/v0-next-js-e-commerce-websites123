import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerDetails, productName, amount, paymentId, orderId } = body

    const emailContent = `
New Order Placed - PawHaven

Order Details:
Order ID: ${orderId}
Payment ID: ${paymentId}

Customer Information:
Name: ${customerDetails.fullName}
Mobile: ${customerDetails.mobile}
Email: ${customerDetails.email}

Delivery Address:
${customerDetails.house}
${customerDetails.city}, ${customerDetails.state}
PIN Code: ${customerDetails.pinCode}

Product Details:
Product Name: ${productName}
Amount Paid: ₹${amount}

Date & Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
    `

    console.log("[v0] Order notification to royjada0852@gmail.com:")
    console.log(emailContent)

    // To implement actual email sending, you can use services like:
    // - Resend (recommended for Next.js)
    // - SendGrid
    // - AWS SES
    // - Nodemailer with SMTP
    //
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'PawHaven <orders@pawhaven.com>',
    //   to: 'royjada0852@gmail.com',
    //   subject: `New Order - ${orderId}`,
    //   text: emailContent
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error sending order email:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
