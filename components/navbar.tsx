"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-2 md:px-4 py-3">
      <div className="container mx-auto relative">
        <div className="navbar-glass rounded-2xl px-4 md:px-8 py-3 md:py-4">
          <div className="flex justify-between items-center relative z-20">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group" onClick={handleLinkClick}>
              <div className="relative">
                <Image
                  src="/image/logo.jpg"
                  alt="PetJoy Logo"
                  width={50}
                  height={50}
                  className="rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-gradient text-xl md:text-2xl font-extrabold tracking-tight">PetJoy</span>
            </Link>

            <button
              className="lg:hidden text-gray-700 hover:text-primary transition-colors p-2 relative z-[110]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-md lg:hidden z-[101]"
                onClick={() => setIsOpen(false)}
              />
            )}

            <ul
              className={`
              lg:flex lg:static lg:flex-row lg:bg-transparent lg:p-0 lg:shadow-none lg:w-auto
              fixed top-0 right-0 h-screen w-[280px] bg-white p-8 shadow-2xl flex flex-col gap-6 
              transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-[105]
              ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full lg:translate-x-0 lg:opacity-100"}
            `}
            >
              <li className="lg:hidden mb-4 border-b pb-4">
                <span className="text-xl font-bold text-gradient">Menu</span>
              </li>
              <li>
                <Link href="/" className="nav-link block text-lg lg:text-base" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pets" className="nav-link block text-lg lg:text-base" onClick={handleLinkClick}>
                  Pets
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="nav-link block text-lg lg:text-base" onClick={handleLinkClick}>
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/food" className="nav-link block text-lg lg:text-base" onClick={handleLinkClick}>
                  Food
                </Link>
              </li>
              <li>
                <Link href="/pet-care" className="nav-link block text-lg lg:text-base" onClick={handleLinkClick}>
                  Pet Care
                </Link>
              </li>
              <li>
                <Link href="/supplements" className="nav-link block text-lg lg:text-base" onClick={handleLinkClick}>
                  Supplements
                </Link>
              </li>
              <li>
                <Link href="/#about" className="nav-link block text-lg lg:text-base" onClick={handleLinkClick}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/#help" className="nav-link block text-lg lg:text-base" onClick={handleLinkClick}>
                  Get Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
