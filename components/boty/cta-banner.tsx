"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTABanner() {
  const [isVisible, setIsVisible] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (bannerRef.current) {
      observer.observe(bannerRef.current)
    }

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={bannerRef}
          className={`rounded-3xl p-12 md:p-16 flex flex-col justify-center relative overflow-hidden min-h-[400px] transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* [PLACEHOLDER: cta-banner background image — e.g. flat-lay of jewellery on a textured surface] */}
          <Image
            src="/placeholder.jpg"
            alt="[PLACEHOLDER: jewellery flat-lay]"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/60 z-0" />

          <div className="relative z-10 text-left max-w-2xl">
            <h3 className="text-4xl md:text-5xl text-white mb-4 lg:text-5xl">
              Something special
            </h3>
            <h3 className="text-3xl md:text-4xl lg:text-5xl text-white/70 mb-8">
              in mind?
            </h3>

            <p className="text-white/80 text-lg mb-8 max-w-sm">
              Commission a custom piece — made exactly the way you imagine it.
            </p>

            <Link
              href="/custom-orders"
              className="group inline-flex items-center gap-3 bg-white text-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-white/90 boty-shadow"
            >
              Enquire about custom orders
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
