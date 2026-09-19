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
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className={`group bg-card/70 backdrop-blur-md border border-border/40 hover:border-primary/40 hover:shadow-md p-6 lg:p-8 text-center rounded-2xl boty-transition ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <badge.icon className="text-primary/75 group-hover:text-primary group-hover:scale-105 boty-transition mb-4 mx-auto size-12" strokeWidth={1.2} />
              <h3 className="font-serif text-foreground mb-2 text-2xl group-hover:text-primary boty-transition">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
