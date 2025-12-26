"use client"

import Link from "next/link"
import {
  Heart,
  Shield,
  Headphones,
  Award,
  Package,
  Dog,
  ShoppingBag,
  Pill,
  Sparkles,
  Users,
  TrendingUp,
  Clock,
  Apple,
} from "lucide-react"
import { GetHelpForm } from "@/components/get-help-form"
import { IconBadge } from "@/components/icon-badge"
import { CategoryCard } from "@/components/category-card"

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 pb-12 overflow-x-hidden">
      <section className="hero-section relative z-10 animate-scale-in group">
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-white/10 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse delay-1000" />

        <div className="relative z-10 max-w-4xl">
          <h1 className="hero-heading text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            The Joy of{" "}
            <span className="text-accent inline-block hover:scale-105 transition-transform duration-300">
              Parenthood
            </span>{" "}
            Simplified
          </h1>
          <p className="hero-subtext text-white/90 text-lg md:text-2xl mb-10 leading-relaxed font-medium">
            Discover a curated world of happiness for your four-legged family. Welcome to the new PetJoy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href="/pets"
              className="btn-gradient text-center px-10 py-5 text-lg md:text-xl rounded-2xl inline-block transition-all duration-300 transform hover:-translate-y-1"
            >
              Meet New Friends
            </Link>
            <Link
              href="#about"
              className="btn-outline bg-white/10 backdrop-blur-sm text-center text-white border-white px-8 py-4 text-base md:text-lg rounded-xl inline-block hover:bg-white hover:text-primary"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="my-16 md:my-24">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Start Your <span className="text-gradient">Shopping Journey</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to provide the best life for your furry companions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          <Link
            href="/pets"
            className="group relative overflow-hidden bg-white rounded-[40px] p-8 md:p-14 shadow-2xl hover:shadow-[0_32px_64px_-16px_rgba(81,45,168,0.25)] transition-all duration-500 border border-gray-100/50"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:translate-x-2">
              <Dog size={160} />
            </div>
            <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <IconBadge icon={Dog} bgColor="bg-primary/10" iconColor="text-primary" size="xl" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 group-hover:text-primary transition-colors tracking-tight">
                Pet Boutique
              </h3>
              <p className="text-gray-600 text-xl mb-10 leading-relaxed font-medium">
                Find your perfect match among our healthy and happy companions.
              </p>
              <div className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-2xl font-bold group-hover:bg-primary-dark transition-all transform group-hover:translate-x-2 shadow-lg shadow-primary/20">
                Explore Pets <TrendingUp size={22} />
              </div>
            </div>
          </Link>

          <Link
            href="/accessories"
            className="group relative overflow-hidden bg-white rounded-[40px] p-8 md:p-14 shadow-2xl hover:shadow-[0_32px_64px_-16px_rgba(251,146,60,0.25)] transition-all duration-500 border border-gray-100/50"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:translate-x-2">
              <ShoppingBag size={160} />
            </div>
            <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="mb-8 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <IconBadge icon={ShoppingBag} bgColor="bg-accent/10" iconColor="text-accent" size="xl" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 group-hover:text-accent transition-colors tracking-tight">
                Luxury Accessories
              </h3>
              <p className="text-gray-600 text-xl mb-10 leading-relaxed font-medium">
                Premium gear, toys, and essentials for every pet personality.
              </p>
              <div className="inline-flex items-center gap-3 bg-accent text-gray-900 px-10 py-4 rounded-2xl font-bold group-hover:bg-accent/80 transition-all transform group-hover:translate-x-2 shadow-lg shadow-accent/20">
                Shop Gear <ShoppingBag size={22} />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="my-20">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white/40 backdrop-blur-xl rounded-[40px] p-12 shadow-2xl border border-white/50 animate-float">
          <div className="space-y-6">
            <h2 className="text-4xl font-black mb-6">
              Why <span className="text-gradient">PetJoy?</span>
            </h2>
            <p className="text-gray-700 text-xl leading-relaxed font-medium">
              We believe every tail-wag and purr is a moment worth celebrating. PetJoy is your premium partner in
              creating lifelong bonds and healthy, happy lives.
            </p>
            <ul className="text-gray-700 space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <Shield className="text-primary-green mt-1 flex-shrink-0" size={20} />
                <span>Trusted Pet Sellers & Breeders</span>
              </li>
              <li className="flex items-start gap-3">
                <Award className="text-primary-green mt-1 flex-shrink-0" size={20} />
                <span>Verified and Healthy Pets</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="text-primary-green mt-1 flex-shrink-0" size={20} />
                <span>Complete Pet Care Solutions</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <IconBadge
              icon={Dog}
              bgColor="bg-gradient-to-br from-teal-50 to-green-50"
              iconColor="text-teal-600"
              size="xl"
            />
          </div>
        </div>
      </section>

      <section className="my-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Shop by <span className="text-gradient">Category</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <CategoryCard title="Pets" href="/pets" icon={Dog} bgColor="bg-teal-50" iconColor="text-teal-600" />
          <CategoryCard
            title="Accessories"
            href="/accessories"
            icon={ShoppingBag}
            bgColor="bg-orange-50"
            iconColor="text-orange-600"
          />
          <CategoryCard
            title="Pet Care"
            href="/pet-care"
            icon={Sparkles}
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <CategoryCard
            title="Supplements"
            href="/supplements"
            icon={Pill}
            bgColor="bg-rose-50"
            iconColor="text-rose-600"
          />
          <CategoryCard title="Food" href="/food" icon={Apple} bgColor="bg-purple-50" iconColor="text-purple-600" />
        </div>
      </section>

      <section className="my-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Pet Care <span className="text-gradient">Essentials</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex justify-center mb-4">
              <IconBadge icon={Sparkles} bgColor="bg-blue-50" iconColor="text-blue-600" size="lg" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-center">Grooming</h3>
            <p className="text-gray-600 text-center">Premium shampoos, conditioners, and grooming tools</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex justify-center mb-4">
              <IconBadge icon={Pill} bgColor="bg-rose-50" iconColor="text-rose-600" size="lg" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-center">Health</h3>
            <p className="text-gray-600 text-center">Supplements and medicines for optimal pet health</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all">
            <div className="flex justify-center mb-4">
              <IconBadge icon={Package} bgColor="bg-amber-50" iconColor="text-amber-600" size="lg" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-center">Nutrition</h3>
            <p className="text-gray-600 text-center">Quality food and treats for your furry friends</p>
          </div>
        </div>
      </section>

      {/* Trust & Safety Badges */}
      <section className="my-20">
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trust & <span className="text-gradient">Safety</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <IconBadge icon={Shield} bgColor="bg-white" iconColor="text-primary-green" size="lg" />
              </div>
              <h3 className="font-bold text-lg mb-2">100% Secure</h3>
              <p className="text-gray-600">Safe payment gateway with Razorpay</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <IconBadge icon={Award} bgColor="bg-white" iconColor="text-primary-green" size="lg" />
              </div>
              <h3 className="font-bold text-lg mb-2">Certified Breeders</h3>
              <p className="text-gray-600">All pets from verified sources</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <IconBadge icon={Package} bgColor="bg-white" iconColor="text-primary-green" size="lg" />
              </div>
              <h3 className="font-bold text-lg mb-2">Safe Delivery</h3>
              <p className="text-gray-600">Secure packaging and handling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Help Section */}
      <section id="help" className="my-20">
        <GetHelpForm />
      </section>

      {/* Help & Support Section */}
      <section className="my-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Help & <span className="text-gradient">Support</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="feature-card">
            <div className="flex justify-center mb-4">
              <IconBadge icon={Headphones} bgColor="bg-teal-100" iconColor="text-teal-600" size="md" />
            </div>
            <h3 className="font-bold text-xl mb-2">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock assistance for all your pet care needs</p>
          </div>
          <div className="feature-card" style={{ animationDelay: "0.1s" }}>
            <div className="flex justify-center mb-4">
              <IconBadge icon={Shield} bgColor="bg-green-100" iconColor="text-green-600" size="md" />
            </div>
            <h3 className="font-bold text-xl mb-2">Health Guarantee</h3>
            <p className="text-gray-600">All pets come with health certificates and guarantees</p>
          </div>
          <div className="feature-card" style={{ animationDelay: "0.2s" }}>
            <div className="flex justify-center mb-4">
              <IconBadge icon={Heart} bgColor="bg-rose-100" iconColor="text-rose-600" size="md" />
            </div>
            <h3 className="font-bold text-xl mb-2">Post-Adoption Care</h3>
            <p className="text-gray-600">Continuous support and guidance after you bring your pet home</p>
          </div>
          <div className="feature-card" style={{ animationDelay: "0.3s" }}>
            <div className="flex justify-center mb-4">
              <IconBadge icon={Clock} bgColor="bg-orange-100" iconColor="text-orange-600" size="md" />
            </div>
            <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and safe delivery of products to your doorstep</p>
          </div>
        </div>
      </section>

      <section className="my-20">
        <h2 className="text-4xl font-black text-center mb-16 tracking-tight">
          Explore the <span className="text-gradient">PetJoy Universe</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <IconBadge icon={Award} bgColor="bg-white" iconColor="text-teal-600" size="lg" />
            </div>
            <h3 className="font-bold text-2xl mb-3">Quality Assured</h3>
            <p className="text-gray-700 leading-relaxed">
              Every pet and product goes through rigorous quality checks to ensure the best for your family
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <IconBadge icon={Users} bgColor="bg-white" iconColor="text-orange-600" size="lg" />
            </div>
            <h3 className="font-bold text-2xl mb-3">Expert Guidance</h3>
            <p className="text-gray-700 leading-relaxed">
              Our team of pet experts is always ready to help you make the right choices for your pets
            </p>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <IconBadge icon={TrendingUp} bgColor="bg-white" iconColor="text-rose-600" size="lg" />
            </div>
            <h3 className="font-bold text-2xl mb-3">Trusted by Thousands</h3>
            <p className="text-gray-700 leading-relaxed">
              Join thousands of happy pet parents who trust PetJoy for all their pet needs
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
