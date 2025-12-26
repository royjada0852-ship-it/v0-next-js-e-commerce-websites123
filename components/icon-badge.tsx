"use client"

import type { LucideIcon } from "lucide-react"

interface IconBadgeProps {
  icon: LucideIcon
  bgColor?: string
  iconColor?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function IconBadge({
  icon: Icon,
  bgColor = "bg-teal-50",
  iconColor = "text-teal-600",
  size = "md",
}: IconBadgeProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
    xl: "w-24 h-24",
  }

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
    xl: 44,
  }

  return (
    <div
      className={`${sizeClasses[size]} ${bgColor} rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110`}
    >
      <Icon className={iconColor} size={iconSizes[size]} strokeWidth={1.5} />
    </div>
  )
}
