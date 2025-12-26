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
    <nav className="fixed top-0 left-0 right-0 z-50 px-2 md:px-4 py-3">
      <div className="container mx-auto relative">
        <div className="navbar-glass rounded-2xl px-4 md:px-8 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group z-50" onClick={handleLinkClick}>
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

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex lg:flex-row lg:items-center gap-6">
              <li>
                <Link href="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pets" className="nav-link">
                  Pets
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="nav-link">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/food" className="nav-link">
                  Food
                </Link>
              </li>
              <li>
                <Link href="/pet-care" className="nav-link">
                  Pet Care
                </Link>
              </li>
              <li>
                <Link href="/supplements" className="nav-link">
                  Supplements
                </Link>
              </li>
              <li>
                <Link href="/#about" className="nav-link">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#help" className="nav-link">
                  Get Help
                </Link>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 hover:text-primary transition-colors p-2 z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay - only render when open */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md lg:hidden z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-[280px] bg-white shadow-2xl
          flex flex-col gap-6 p-8 pt-20
          transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          lg:hidden z-40
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="mb-4 border-b pb-4">
          <span className="text-xl font-bold text-gradient">Menu</span>
        </div>
        <Link href="/" className="nav-link block text-lg" onClick={handleLinkClick}>
          Home
        </Link>
        <Link href="/pets" className="nav-link block text-lg" onClick={handleLinkClick}>
          Pets
        </Link>
        <Link href="/accessories" className="nav-link block text-lg" onClick={handleLinkClick}>
          Accessories
        </Link>
        <Link href="/food" className="nav-link block text-lg" onClick={handleLinkClick}>
          Food
        </Link>
        <Link href="/pet-care" className="nav-link block text-lg" onClick={handleLinkClick}>
          Pet Care
        </Link>
        <Link href="/supplements" className="nav-link block text-lg" onClick={handleLinkClick}>
          Supplements
        </Link>
        <Link href="/#about" className="nav-link block text-lg" onClick={handleLinkClick}>
          About
        </Link>
        <Link href="/#help" className="nav-link block text-lg" onClick={handleLinkClick}>
          Get Help
        </Link>
      </div>
    </nav>
  )
}
