"use client"

import { Instagram, Youtube, Phone } from "lucide-react"
import { useEffect, useRef } from "react"

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("footer-visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="footer-glass text-center mt-28 footer-animate rounded-t-[60px] !bg-primary/5 border-t border-primary/10"
    >
      <div className="mb-10 animate-footer-item" style={{ animationDelay: "0.1s" }}>
        <h3 className="text-5xl font-black mb-8 text-foreground">
          Let's <span className="text-gradient">Connect</span>
        </h3>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mb-10">
          <a
            href="tel:0000000000"
            className="footer-link flex items-center gap-4 text-foreground/80 hover:text-primary transition-all text-xl font-bold group animate-footer-item"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Phone size={28} />
            </div>
            +91 00000 00000
          </a>
          <a
            href="tel:0000000001"
            className="footer-link flex items-center gap-4 text-foreground/80 hover:text-primary transition-all text-xl font-bold group animate-footer-item"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Phone size={28} />
            </div>
            +91 00000 00001
          </a>
        </div>
      </div>

      <div className="flex justify-center gap-6 mb-12">
        <a
          href="https://www.instagram.com/dogify.world"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link p-5 bg-white/10 rounded-2xl hover:bg-orange-400 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-2xl animate-footer-item"
          style={{ animationDelay: "0.4s" }}
          aria-label="Instagram"
        >
          <Instagram size={32} />
        </a>
        <a
          href="https://youtube.com/@dogifyworld"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link p-5 bg-white/10 rounded-2xl hover:bg-orange-400 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-2xl animate-footer-item"
          style={{ animationDelay: "0.5s" }}
          aria-label="YouTube"
        >
          <Youtube size={32} />
        </a>
      </div>

      <div className="border-t border-foreground/5 pt-10 animate-footer-item" style={{ animationDelay: "0.6s" }}>
        <p className="text-foreground/60 text-lg font-medium">
          © 2025 <span className="text-gradient font-black uppercase tracking-widest">PetJoy</span>. Crafted for happy
          paws.
        </p>
      </div>
    </footer>
  )
}
