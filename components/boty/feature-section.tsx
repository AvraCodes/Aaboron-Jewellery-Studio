"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Hand, Flame, Palette, Heart } from "lucide-react"

const features = [
  {
    icon: Hand,
    title: "Hand-shaped",
    description: "Individually sculpted by hand from raw, alluvial clay and terracotta."
  },
  {
    icon: Flame,
    title: "Kiln-fired",
    description: "Slow-baked and naturally cured for enduring strength and featherlight wear."
  },
  {
    icon: Palette,
    title: "Hand-painted",
    description: "Intricate floral and folk motifs hand-brushed with artisan pigments and sealed."
  },
  {
    icon: Heart,
    title: "Made with care",
    description: "Rooted in meditative Bengal craft, honoring imperfection and soul in every curve."
  }
]

export function FeatureSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const bentoRef = useRef<HTMLDivElement>(null)
  const videoSectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVideoVisible(true)
      },
      { threshold: 0.1 }
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true)
      },
      { threshold: 0.1 }
    )

    if (bentoRef.current) observer.observe(bentoRef.current)
    if (videoSectionRef.current) videoObserver.observe(videoSectionRef.current)
    if (headerRef.current) headerObserver.observe(headerRef.current)

    return () => {
      if (bentoRef.current) observer.unobserve(bentoRef.current)
      if (videoSectionRef.current) videoObserver.unobserve(videoSectionRef.current)
      if (headerRef.current) headerObserver.unobserve(headerRef.current)
    }
  }, [])

  return (
    <section className="py-14 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid */}
        <div
          ref={bentoRef}
          className="grid grid-cols-1 md:grid-cols-4 mb-14 sm:mb-20 md:grid-rows-[300px_300px] gap-4 sm:gap-6"
        >
          {/* Left Large Block — Video with Overlay Card */}
          <div
            className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-card h-[360px] sm:h-[450px] md:h-auto md:col-span-2 md:row-span-2 transition-all duration-700 ease-out border border-border/40 card-hover-lift ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            {isVisible ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/videos/artisanal-poster.webp"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/artisanal-jewellery.webm" type="video/webm" />
                <source src="/videos/artisanal-jewellery.mp4" type="video/mp4" />
              </video>
            ) : (
              <Image
                src="/videos/artisanal-poster.webp"
                alt="Artisanal Jewellery"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            )}
            {/* Translucent Overlay Card */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-card/85 backdrop-blur-md p-4 sm:p-6 shadow-lg rounded-2xl border border-border/40">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl text-foreground mb-1 font-serif font-medium">
                    Each piece, <span className="font-script text-primary text-2xl sm:text-3xl font-normal">made once</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Formed by human touch, no two pieces are ever identical. Every curve carries the rhythm of the artisan&apos;s hands.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right — Craft philosophy */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-center md:col-span-2 min-h-[220px] sm:min-h-[280px] relative overflow-hidden transition-all duration-700 ease-out border border-border/40 card-hover-lift ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <Image
              src="/images/products/clay-jewellery/clay-02.webp"
              alt="Aaboron handcrafted clay jewellery details"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[1px] z-0" />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-4xl text-white mb-1 font-serif">
                Slow craft
              </h3>
              <h4 className="text-xl sm:text-3xl text-white/70 mb-3 sm:mb-4 font-script">
                Quiet luxury
              </h4>
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                  <Hand className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-amber-200" />
                  <span>Hand-shaped from clay</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-amber-200" />
                  <span>Kiln-fired for durability</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm">
                  <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-amber-200" />
                  <span>Hand-painted, one at a time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right — Process video */}
          <div
            className={`rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-center min-h-[200px] sm:min-h-[260px] relative overflow-hidden bg-card md:col-span-2 transition-all duration-700 ease-out border border-border/40 card-hover-lift ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {isVisible ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/videos/terracotta-poster.webp"
                className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
              >
                <source src="/videos/terracotta-jewellery.webm" type="video/webm" />
                <source src="/videos/terracotta-jewellery.mp4" type="video/mp4" />
              </video>
            ) : (
              <Image
                src="/videos/terracotta-poster.webp"
                alt="Terracotta Jewellery"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover scale-[1.02]"
              />
            )}
            <div className="absolute inset-0 bg-stone-900/65 backdrop-blur-[1px]" />
            <div className="relative z-10 flex flex-col justify-center h-full text-left items-start">
              <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 rounded-full bg-amber-400/20">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              </div>
              <h3 className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-1 text-white/80">
                Fired &amp; Finished
              </h3>
              <h4 className="text-xl sm:text-3xl mb-1 sm:mb-2 text-white font-serif">
                Sculpted for timeless grace
              </h4>
            </div>
          </div>
        </div>

        {/* Maker Story — two-column */}
        <div
          ref={videoSectionRef}
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-stretch my-0 py-10 sm:py-16 lg:py-20"
        >
          {/* Maker Image with subtle badge */}
          <div className="flex w-full">
            <div
              className={`relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-card boty-shadow transition-all duration-700 ease-out border border-border/40 card-hover-lift ${
                isVideoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <Image
                src="/images/products/clay-jewellery/clay-01.webp"
                alt="Aaboron Artisan Jewellery Studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 text-white">
                <span className="font-bengali text-lg sm:text-2xl block text-amber-200/90 mb-1 select-none">
                  হাতে তৈরি শিল্প
                </span>
                <p className="font-serif text-lg sm:text-2xl">The intimate touch of Bengal terracotta</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            ref={headerRef}
            className={`flex flex-col justify-between h-full transition-all duration-700 ease-out ${
              isVideoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className={`text-xs sm:text-sm tracking-[0.3em] uppercase text-primary block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
                  The Maker
                </span>
                <span className="text-foreground/30 text-xs">·</span>
                <span className="font-bengali text-lg sm:text-2xl text-primary font-medium select-none leading-none tracking-wide">
                  আমাদের গল্প
                </span>
              </div>
              <h2 className={`font-serif text-3xl sm:text-5xl lg:text-6xl leading-tight text-foreground mb-4 sm:mb-5 text-balance ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
                Born from earth, shaped by devotion
              </h2>
              <p className={`text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
                Aaboron was founded in Kolkata with a simple desire: to bring the poetic warmth of Bengal&apos;s terracotta and artisanal metalcraft into everyday adornments. Each creation is born from slow, meditative craftsmanship—celebrating natural textures and the quiet luxury of genuine handmade art.
              </p>
            </div>

            {/* Feature Cards — Translucent & Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-4 sm:p-5 boty-transition hover:scale-[1.02] rounded-2xl bg-card/75 backdrop-blur-md border border-border/40 hover:border-primary/40 shadow-xs card-hover-lift flex flex-col justify-center"
                >
                  <div className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full mb-2.5 sm:mb-3 group-hover:bg-primary/20 boty-transition bg-primary/10">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 boty-transition" />
                  </div>
                  <h3 className="font-medium text-foreground text-sm sm:text-base mb-1 group-hover:text-primary boty-transition">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
