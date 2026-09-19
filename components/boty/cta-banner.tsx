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
    <section className="py-14 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={bannerRef}
          className={`rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 relative overflow-hidden min-h-[380px] sm:min-h-[420px] border border-stone-700/30 shadow-2xl transition-all duration-700 ease-out bg-[#221c17]/90 card-hover-lift ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Subtle Crafting Video Layer inside the Card */}
          {isVisible ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/videos/artisanal-poster.webp"
              className="absolute inset-0 w-full h-full object-cover opacity-20 filter saturate-[1.2] brightness-75 pointer-events-none"
            >
              <source src="/videos/artisanal-jewellery.webm" type="video/webm" />
              <source src="/videos/artisanal-jewellery.mp4" type="video/mp4" />
            </video>
          ) : (
            <Image
              src="/videos/artisanal-poster.webp"
              alt="Artisanal Jewellery Workshop"
              fill
              sizes="100vw"
              className="object-cover opacity-20 filter saturate-[1.2] brightness-75 pointer-events-none"
            />
          )}

          {/* Deep Earthy Gradients: Terracotta & Forest Moss */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#291a14]/95 via-[#1d2719]/90 to-[#1b1915]/95 z-0" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#c46243]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#4F5B3A]/30 blur-3xl pointer-events-none" />
          </div>

          {/* Content Layout */}
          <div className="relative z-10 grid md:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left Column */}
            <div className="md:col-span-7 text-left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#d9a07a] font-medium block mb-3 sm:mb-4">
                Custom Orders
              </span>

              <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl text-white mb-1.5 sm:mb-2 leading-[1.1] tracking-tight">
                Something special
              </h3>
              <h4 className="font-accent italic text-2xl sm:text-4xl lg:text-5xl text-[#eedac5] mb-4 sm:mb-6 font-normal">
                in mind?
              </h4>

              <p className="text-stone-200/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md font-light">
                Commission a custom piece — made exactly the way you imagine it. From hand-sculpted terracotta hues to bespoke oxidised metal designs, we shape each order individually.
              </p>

              <Link
                href="/custom-orders"
                className="group inline-flex items-center justify-center gap-3 bg-[#ede6dc] hover:bg-white text-stone-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-medium tracking-wide boty-transition shadow-lg shadow-black/30 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              >
                <span>Commission a custom piece</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-primary boty-transition" />
              </Link>
            </div>

            {/* Right Column: Natural Craft Snapshot */}
            <div className="md:col-span-5 hidden md:flex justify-end">
              <div className="relative w-64 h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-1 hover:rotate-0 boty-transition">
                <Image
                  src="/images/products/clay-jewellery/clay-02.webp"
                  alt="Artisanal clay jewellery in making"
                  fill
                  sizes="256px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">Shaped by Hand</p>
                  <p className="text-white/70 text-xs font-light">One-of-a-kind bespoke commissions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
