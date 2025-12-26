"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { IconBadge } from "./icon-badge"

interface CategoryCardProps {
  title: string
  href: string
  icon: LucideIcon
  bgColor?: string
  iconColor?: string
}

export function CategoryCard({ title, href, icon, bgColor, iconColor }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary-teal/30 hover:-translate-y-1"
    >
      <div className="flex justify-center mb-4">
        <IconBadge icon={icon} bgColor={bgColor} iconColor={iconColor} size="lg" />
      </div>
      <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary-teal transition-colors">{title}</h3>
    </Link>
  )
}
