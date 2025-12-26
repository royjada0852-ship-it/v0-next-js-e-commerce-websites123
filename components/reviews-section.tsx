"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { User, X, Star } from "lucide-react"

type Review = {
  id: string
  name: string
  rating: number
  comment: string
  avatar_url?: string
  created_at: string
}

export function ReviewsSection() {
  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    review: "",
  })
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    fetchReviews()
  }, [isClient])

  const fetchReviews = async () => {
    try {
      const supabase = createClient()
      if (!supabase) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) throw error
      setReviews(data || [])
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const supabase = createClient()
      if (!supabase) {
        alert("Database connection not available")
        setSubmitting(false)
        return
      }

      if (!formData.name || !formData.review || rating === 0) {
        alert("Please fill in all fields and provide a rating")
        setSubmitting(false)
        return
      }

      const { data, error } = await supabase
        .from("reviews")
        .insert([
          {
            name: formData.name,
            rating: rating,
            comment: formData.review,
            avatar_url: null,
          },
        ])
        .select()

      if (error) throw error

      alert("Review submitted successfully! Thank you for your feedback.")
      setShowModal(false)
      setFormData({ name: "", review: "" })
      setRating(0)

      fetchReviews()
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Failed to submit review. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="reviewsSection" className="my-20 md:my-24">
      <h3 className="mb-8 md:mb-10 text-3xl md:text-4xl lg:text-5xl font-bold text-center animate-fade-up">
        Customer <span className="text-gradient">Reviews</span>
      </h3>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
        </div>
      ) : (
        <div className="reviews-scroll overflow-x-auto pb-6 -mx-4 px-4">
          <div className="flex gap-4 md:gap-6" id="reviewsGrid">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-500 w-full py-12">No reviews yet. Be the first to write one!</p>
            ) : (
              reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="review-card bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 min-w-[300px] md:min-w-[350px] flex-shrink-0 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0">
                      {review.avatar_url ? (
                        <img
                          src={review.avatar_url || "/placeholder.svg"}
                          alt={review.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 md:w-7 md:h-7" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="font-bold text-gray-800 text-base md:text-lg truncate">{review.name}</h5>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base line-clamp-4">{review.comment}</p>
                  <p className="text-xs md:text-sm text-gray-400 mt-4">
                    {new Date(review.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="text-center mt-8 md:mt-10">
        <button
          onClick={() => setShowModal(true)}
          className="btn-gradient px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-bold hover:scale-105 transition-transform"
        >
          Write a Review
        </button>
      </div>

      {showModal && (
        <div
          className="modal-overlay fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-soft-fade"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-content bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slide-up-fade"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-xl md:text-2xl font-bold text-gray-800">Submit Your Review</h5>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 text-sm md:text-base">Your Name</label>
                <input
                  type="text"
                  className="form-input w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 outline-none text-sm md:text-base"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 text-sm md:text-base">Rating</label>
                <div className="flex gap-2 text-3xl md:text-4xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`cursor-pointer transition-all hover:scale-125 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                      onClick={() => setRating(star)}
                    >
                      <Star size={32} className={star <= rating ? "fill-yellow-400" : ""} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700 text-sm md:text-base">Review</label>
                <textarea
                  className="form-input w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 outline-none text-sm md:text-base"
                  rows={4}
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  required
                />
              </div>

              <button
                className="btn-gradient w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg disabled:opacity-50 hover:scale-105 transition-transform"
                type="submit"
                disabled={submitting || rating === 0}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
