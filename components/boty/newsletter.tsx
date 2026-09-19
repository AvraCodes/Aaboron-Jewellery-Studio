"use client"

import React, { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="py-14 sm:py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl leading-tight text-primary-foreground mb-3 sm:mb-4 text-balance">
            New pieces, first
          </h2>
          <p className="text-sm sm:text-lg text-primary-foreground/85 mb-8 sm:mb-10 leading-relaxed max-w-lg mx-auto">
            Subscribe to hear about new collections, behind-the-scenes moments, and early access to limited pieces.
          </p>

          {isSubscribed ? (
            <div className="inline-flex items-center gap-3 bg-primary-foreground/15 backdrop-blur-sm rounded-full px-6 sm:px-8 py-3.5 sm:py-4">
              <Check className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground text-sm sm:text-base font-medium">You&apos;re on the list — thank you.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-5 py-3.5 sm:px-6 sm:py-4 text-sm sm:text-base text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-primary-foreground/40 boty-transition"
                required
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-medium tracking-wide boty-transition hover:bg-primary-foreground/90 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
              </button>
            </form>
          )}

          <p className="text-xs sm:text-sm text-primary-foreground/60 mt-4 sm:mt-6">
            Unsubscribe anytime. No noise, just new work.
          </p>
        </div>
      </div>
    </section>
  )
}
