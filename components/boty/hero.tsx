"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-transparent">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover"
        >
          <source src="/videos/handcrafted-jewellery.mp4" type="video/mp4" />
        </video>
        {/* Soft overlay and bottom fade gradient */}
        <div className="absolute inset-0 bg-background/25" />
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full pt-28 pb-14 sm:pt-32 sm:pb-20 lg:py-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="w-full lg:max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2.5 mb-6 px-4 py-1.5 rounded-full bg-background/60 backdrop-blur-md border border-border/40 animate-float shadow-xs">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-foreground/85 font-medium">
                Handmade Jewellery Studio
              </span>
              <span className="text-foreground/40 font-light">·</span>
              <span className="font-bengali text-lg sm:text-2xl text-primary font-medium select-none leading-none tracking-wide">
                বাংলা ঐতিহ্য
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl leading-[1.08] mb-5 text-balance text-black">
              <span className="font-display block animate-blur-in opacity-0 font-semibold" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>Crafted with</span>
              <span className="font-script text-primary block animate-blur-in opacity-0 text-6xl sm:text-8xl xl:text-9xl font-normal pt-1" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>intention.</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto lg:mx-0 text-black animate-blur-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <span className="font-accent italic text-foreground/80 block text-base mb-1">Rooted in Bengal&apos;s timeless artisanal heritage —</span>
              Each piece is shaped by hand, unhurried, considered, and quietly yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-blur-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] boty-shadow w-full sm:w-auto"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 boty-transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
