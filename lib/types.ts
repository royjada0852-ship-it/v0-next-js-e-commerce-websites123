export interface Pet {
  id: string
  name: string
  category: "dog" | "cat" | "bird" | "rabbit"
  breed: string
  age: number
  gender: "male" | "female"
  price: number
  rating: number
  description: string
  image_url: string
  featured: boolean
  created_at: string
}

export interface Accessory {
  id: string
  name: string
  description: string
  price: number
  rating: number
  image_url: string
  category: "toy" | "bed" | "collar" | "cleaning" | "grooming" | "other"
  created_at: string
}

export interface Food {
  id: string
  name: string
  description: string
  price: number
  rating: number
  image_url: string
  age_group: "puppy" | "kitten" | "adult" | "senior" | "all"
  pet_type: "dog" | "cat" | "bird" | "rabbit" | "all"
  created_at: string
}

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  avatar_url: string
  created_at: string
}
