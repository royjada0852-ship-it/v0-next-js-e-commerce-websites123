import Link from "next/link"
import { Dog, Cat, Bird, Rabbit } from "lucide-react"

const categories = [
  {
    name: "Dogs",
    icon: Dog,
    bgColor: "bg-[#D4F4DD]",
    iconColor: "text-green-600",
    link: "/pet-shop?category=dog",
  },
  {
    name: "Cats",
    icon: Cat,
    bgColor: "bg-[#FFF6CC]",
    iconColor: "text-yellow-600",
    link: "/pet-shop?category=cat",
  },
  {
    name: "Birds",
    icon: Bird,
    bgColor: "bg-[#FFE8CC]",
    iconColor: "text-orange-600",
    link: "/pet-shop?category=bird",
  },
  {
    name: "Rabbits",
    icon: Rabbit,
    bgColor: "bg-[#FFE8F5]",
    iconColor: "text-pink-600",
    link: "/pet-shop?category=rabbit",
  },
]

export function CategoryCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, idx) => {
        const Icon = category.icon
        return (
          <Link
            key={category.name}
            href={category.link}
            className={`category-card group ${category.bgColor} rounded-[28px] p-8 md:p-10 hover:-translate-y-3 transition-all duration-300 shadow-md hover:shadow-2xl border border-black/[0.06] animate-slide-up-fade stagger-${idx + 1}`}
          >
            <div className="flex flex-col items-center text-center">
              <Icon
                className={`category-icon w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-5 ${category.iconColor}`}
                strokeWidth={1.2}
              />
              <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{category.name}</h4>
              <p className="text-xs md:text-sm text-gray-600 font-medium">
                Find your perfect {category.name.toLowerCase()}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
