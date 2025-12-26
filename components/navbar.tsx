"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] px-2 md:px-4 py-3">
        <div className="container mx-auto">
          <div className="navbar-glass rounded-2xl px-4 md:px-8 py-3 md:py-4">
            <div className="flex items-center justify-between">

              {/* Logo */}
              <Link
                href="/"
                onClick={handleLinkClick}
                className="flex items-center gap-3 group"
              >
                <Image
                  src="/image/logo.jpg"
                  alt="PetJoy Logo"
                  width={48}
                  height={48}
                  priority
                  className="rounded-full object-cover transition-transform group-hover:scale-105"
                />
                <span className="text-gradient text-xl md:text-2xl font-extrabold">
                  PetJoy
                </span>
              </Link>

              {/* Mobile Toggle */}
              <button
                aria-label="Toggle menu"
                className="lg:hidden p-2 text-gray-700 hover:text-primary"
                onClick={() => setIsOpen(prev => !prev)}
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>

              {/* Desktop Menu */}
              <ul className="hidden lg:flex items-center gap-8">
                {NAV_ITEMS.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[280px] bg-white z-[999]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}
      >
        <div className="p-8 flex flex-col gap-6">
          <span className="text-xl font-bold text-gradient mb-4">
            Menu
          </span>

          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="text-lg nav-link"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </aside>

      {/* Spacer to prevent content hiding behind fixed navbar */}
      <div className="h-[90px]" />
    </>
  )
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Pets", href: "/pets" },
  { label: "Accessories", href: "/accessories" },
  { label: "Food", href: "/food" },
  { label: "Pet Care", href: "/pet-care" },
  { label: "Supplements", href: "/supplements" },
  { label: "About", href: "/#about" },
  { label: "Get Help", href: "/#help" },
]

