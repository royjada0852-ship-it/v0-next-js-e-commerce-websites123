import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "PawHaven — Find Your Perfect Pet Companion",
  description:
    "Your trusted destination for pets, accessories, and pet care essentials. Find your perfect companion at PawHaven.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icons/icon.png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased min-h-screen`}>
        <Navbar />
        <div className="pt-24">{children}</div>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
