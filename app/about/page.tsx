import Image from "next/image"
import { Heart, Award, Users, Shield, Sparkles, Star } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 pb-12">
      <section className="bg-gradient-to-br from-yellow-400/20 via-pink-300/10 to-transparent backdrop-blur-sm border border-yellow-400/20 rounded-3xl p-12 mt-8 shadow-xl text-center relative overflow-hidden animate-slide-up-fade">
        <div className="absolute top-8 right-16 text-yellow-400/20 floating-icon">
          <Sparkles size={40} />
        </div>
        <div className="absolute top-20 left-16 text-pink-400/20 floating-icon" style={{ animationDelay: "1.2s" }}>
          <Star size={32} />
        </div>
        <div className="absolute bottom-8 right-24 text-blue-400/20 floating-icon" style={{ animationDelay: "1.8s" }}>
          <Heart size={36} />
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4 animate-slide-up-fade">
            About <span className="text-gradient">Dogify</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-soft-fade" style={{ animationDelay: "0.2s" }}>
            We bring love, joy, and cute paws to your home. Our mission is to connect pets with families who will
            cherish them forever.
          </p>
        </div>
      </section>

      <section className="my-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-soft-fade stagger-1">
          <h2 className="text-4xl font-bold">
            Our <span className="text-gradient">Story</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Dogify was founded with a simple belief: every pet deserves a loving home, and every family deserves the joy
            of a furry companion. What started as a small passion project has grown into a trusted platform connecting
            thousands of pets with their forever families.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We work with verified breeders and shelters to ensure all our pets are healthy, vaccinated, and ready for
            their new homes. Our commitment to transparency and quality has made us the go-to destination for pet
            adoption.
          </p>
        </div>
        <div className="relative animate-soft-fade stagger-2">
          <Image
            src="/image/image1.jpg"
            alt="Our Story"
            width={600}
            height={400}
            className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      <section className="my-20 animate-soft-fade stagger-2">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why <span className="text-gradient">Choose Us</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Heart,
              title: "Trusted Sellers",
              description: "All our partners are verified and trusted pet sellers with excellent track records.",
              color: "from-pink-400 to-pink-300",
            },
            {
              icon: Shield,
              title: "Healthy Pets",
              description: "Every pet is health-checked, vaccinated, and comes with proper documentation.",
              color: "from-blue-400 to-blue-300",
            },
            {
              icon: Award,
              title: "Quality Guarantee",
              description: "We guarantee the health and quality of all pets listed on our platform.",
              color: "from-yellow-400 to-yellow-300",
            },
            {
              icon: Users,
              title: "Lifetime Support",
              description: "Get expert guidance and support throughout your pet's life journey.",
              color: "from-green-400 to-green-300",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className={`feature-card stagger-${idx + 1}`}>
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="my-20 bg-gradient-to-br from-yellow-400/20 via-pink-300/10 to-transparent backdrop-blur-sm border border-yellow-400/20 rounded-3xl p-12 text-center shadow-xl animate-soft-fade stagger-3">
        <h2 className="text-4xl font-bold mb-6">
          Join the <span className="text-gradient">Dogify Family</span>
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Ready to find your perfect companion? Browse our collection of adorable pets waiting for their forever homes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/pet-shop" className="btn-gradient px-8 py-4 rounded-xl font-semibold text-lg">
            Browse Pets
          </a>
          <a href="/contact" className="btn-outline px-8 py-4 rounded-xl font-semibold text-lg">
            Contact Us
          </a>
        </div>
      </section>
    </main>
  )
}
