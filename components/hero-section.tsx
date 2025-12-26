import Link from "next/link"
import { Bone, Heart, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="hero-section my-8 relative overflow-hidden">
      <div className="absolute top-16 right-24 text-white/15 floating-icon">
        <Bone size={48} />
      </div>
      <div className="absolute top-32 right-56 text-white/12 floating-icon" style={{ animationDelay: "1s" }}>
        <Sparkles size={32} />
      </div>
      <div className="absolute bottom-20 left-24 text-white/15 floating-icon" style={{ animationDelay: "2s" }}>
        <Heart size={40} />
      </div>
      <div className="absolute bottom-32 right-32 text-white/10 floating-icon" style={{ animationDelay: "1.5s" }}>
        <Sparkles size={36} />
      </div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="hero-heading text-5xl md:text-6xl lg:text-7xl font-extrabold mb-7 leading-[1.1] text-white tracking-tight">
          Welcome To Your
          <br />
          Pet's Second Home!
        </h1>
        <p className="hero-subtext text-xl md:text-2xl text-white/95 mb-10 leading-relaxed font-medium max-w-xl">
          Love pets? We do too. Step into a world full of care and cute companions.
        </p>
        <div className="flex gap-6 mt-10 flex-wrap animate-soft-fade" style={{ animationDelay: "0.7s" }}>
          <Link
            href="#shop"
            className="btn-gradient px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-block"
          >
            Explore Pets
          </Link>
          <Link
            href="#help"
            className="px-12 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white/15 backdrop-blur-md text-white border-2 border-white/40 hover:bg-white/25 hover:-translate-y-1 hover:scale-105 inline-block"
          >
            Need Help?
          </Link>
        </div>
      </div>
    </section>
  )
}
