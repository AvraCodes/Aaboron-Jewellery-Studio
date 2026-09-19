"use client"

import { useEffect, useRef, useState } from "react"
import { Hand, PackageCheck, ShieldCheck, Gift } from "lucide-react"

const badges = [
  {
    icon: Hand,
    title: "Handcrafted",
    description: "Shaped by hand, one piece at a time"
  },
  {
    icon: PackageCheck,
    title: "Made to Order",
    description: "Freshly made for you after each order"
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description: "UPI, cards and netbanking via Razorpay"
  },
  {
    icon: Gift,
    title: "Gift Ready",
    description: "Thoughtfully packaged, ready for gifting"
  }
]

export function TrustBadges() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section className="py-12 sm:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className={`group bg-card/75 backdrop-blur-md border border-border/40 hover:border-primary/40 hover:shadow-xl p-4 sm:p-6 lg:p-8 text-center rounded-2xl sm:rounded-3xl card-hover-lift boty-transition ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="inline-flex items-center justify-center size-12 sm:size-16 rounded-full bg-primary/10 group-hover:bg-primary/20 boty-transition mb-2.5 sm:mb-4">
                <badge.icon className="text-primary group-hover:scale-110 boty-transition size-6 sm:size-8" strokeWidth={1.3} />
              </div>
              <h3 className="font-serif text-foreground mb-1 sm:mb-2 text-base sm:text-xl lg:text-2xl group-hover:text-primary boty-transition font-medium">{badge.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-snug sm:leading-relaxed">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
