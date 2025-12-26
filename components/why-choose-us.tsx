import { Heart, Shield, Headphones, Truck, DollarSign, Sparkles } from "lucide-react"

export function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Quality Guarantee",
      desc: "All pets are health-checked and come with certification",
      color: "from-blue-400 to-blue-300",
      delay: "stagger-1",
    },
    {
      icon: Heart,
      title: "Ethical Sourcing",
      desc: "We partner only with certified and ethical breeders",
      color: "from-pink-400 to-pink-300",
      delay: "stagger-2",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      desc: "24/7 veterinary consultation and pet care advice",
      color: "from-purple-400 to-purple-300",
      delay: "stagger-3",
    },
    {
      icon: Truck,
      title: "Safe Delivery",
      desc: "Secure and comfortable transportation for your new friend",
      color: "from-green-400 to-green-300",
      delay: "stagger-4",
    },
    {
      icon: DollarSign,
      title: "Best Prices",
      desc: "Competitive pricing with quality never compromised",
      color: "from-yellow-400 to-yellow-300",
      delay: "stagger-5",
    },
    {
      icon: Sparkles,
      title: "Lifetime Support",
      desc: "Ongoing guidance for your pet's entire life journey",
      color: "from-orange-400 to-orange-300",
      delay: "stagger-6",
    },
  ]

  return (
    <section className="my-20 md:my-24">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 md:mb-5 animate-slide-up-fade">
        Why Choose <span className="text-gradient">Dogify</span>
      </h2>
      <p className="text-center text-gray-600 mb-12 md:mb-16 text-base md:text-lg max-w-2xl mx-auto font-medium animate-soft-fade stagger-1 px-4">
        We're committed to providing the best experience for you and your pets
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className={`feature-card group ${feature.delay} bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 animate-slide-up-fade`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 md:mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
              >
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800 group-hover:text-[#4318FF] transition-colors duration-300 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base text-center">{feature.desc}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
