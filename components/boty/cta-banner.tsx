"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, Gem, Palette, Clock } from "lucide-react"

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
          className={`rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden min-h-[440px] border border-amber-300/25 ring-1 ring-inset ring-amber-400/10 shadow-2xl transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Background Photography */}
          <Image
            src="/images/products/handmade-jewellery/handmade-03.jpg"
            alt="Handcrafted festive jewellery backdrop"
            fill
            className="object-cover object-center opacity-30 filter saturate-[1.2] brightness-75 scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Intricate Multi-layer Lighting & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e2115]/95 via-[#182a1d]/90 to-[#221c17]/95 z-0" />
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none z-0" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/25 blur-3xl pointer-events-none z-0" />

          {/* Intricate Geometric / Alpana Filigree Vector Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20 text-amber-200 z-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <defs>
              <pattern
                id="ornate-filigree"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
                <circle cx="40" cy="40" r="16" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.8" />
                <path d="M40 8 L40 72 M8 40 L72 40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <path d="M20 20 L60 60 M20 60 L60 20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.4" />
                <circle cx="40" cy="12" r="2" fill="currentColor" opacity="0.5" />
                <circle cx="40" cy="68" r="2" fill="currentColor" opacity="0.5" />
                <circle cx="12" cy="40" r="2" fill="currentColor" opacity="0.5" />
                <circle cx="68" cy="40" r="2" fill="currentColor" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ornate-filigree)" />
          </svg>

          {/* Decorative Corner Filigrees */}
          <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-amber-300/40 rounded-tl-lg pointer-events-none z-0" />
          <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-amber-300/40 rounded-tr-lg pointer-events-none z-0" />
          <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-amber-300/40 rounded-bl-lg pointer-events-none z-0" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-amber-300/40 rounded-br-lg pointer-events-none z-0" />

          {/* Content Layout */}
          <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Copy & Action */}
            <div className="md:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-300/25 text-amber-200 text-xs tracking-[0.2em] uppercase font-medium backdrop-blur-md mb-6">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Bespoke Craft · নিজস্ব নকশা</span>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-2 leading-[1.1] tracking-tight">
                Something special
              </h3>
              <h4 className="font-accent italic text-3xl sm:text-4xl lg:text-5xl text-amber-200/90 mb-6 font-normal">
                in mind?
              </h4>

              <p className="text-stone-200/90 text-base sm:text-lg leading-relaxed mb-8 max-w-md font-light">
                Commission a custom piece — made exactly the way you imagine it. From personalized clay colors to hand-carved oxidised motifs, we bring your vision to life.
              </p>

              <Link
                href="/custom-orders"
                className="group inline-flex items-center gap-3 bg-amber-100 hover:bg-white text-stone-900 px-8 py-4 rounded-full text-sm font-medium tracking-wide boty-transition shadow-lg shadow-black/30 hover:scale-[1.02]"
              >
                <span>Enquire about custom orders</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
              </Link>
            </div>

            {/* Right Column: Intricate Artisanal Feature Card */}
            <div className="md:col-span-5 hidden md:flex justify-end">
              <div className="p-6 rounded-2xl bg-white/5 border border-amber-300/20 backdrop-blur-md shadow-2xl max-w-xs w-full space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <Image
                    src="/images/logo/aaboron-logo.png"
                    alt="Aaboron Logo Emblem"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-amber-300/40"
                  />
                  <div>
                    <h5 className="font-display text-white text-base leading-tight">Aaboron Atelier</h5>
                    <span className="font-bengali text-xs text-amber-200/75 select-none">অনন্য রূপায়ন</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-stone-300/90">
                  <div className="flex items-center gap-2.5">
                    <Gem className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>One-of-a-kind bespoke handmade ornaments</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Palette className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Custom color palette, beads &amp; clay sculpting</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Dispatched in 7–10 days with gifting box</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
