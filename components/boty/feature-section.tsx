"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Hand, Flame, Palette, Heart } from "lucide-react"

const features = [
  {
    icon: Hand,
    title: "Hand-shaped",
    description: "[PLACEHOLDER: detail about hand-forming process]"
  },
  {
    icon: Flame,
    title: "Kiln-fired",
    description: "[PLACEHOLDER: detail about firing / curing process]"
  },
  {
    icon: Palette,
    title: "Hand-painted",
    description: "[PLACEHOLDER: detail about glazing / painting]"
  },
  {
    icon: Heart,
    title: "Made with care",
    description: "[PLACEHOLDER: detail about the making philosophy]"
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
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Bento Grid — layout kept exactly as template */}
        <div
          ref={bentoRef}
          className="grid md:grid-cols-4 mb-20 md:grid-rows-[300px_300px] gap-6"
        >
          {/* Left Large Block — Video with Overlay Card */}
          <div
            className={`relative rounded-3xl overflow-hidden bg-card h-[500px] md:h-auto md:col-span-2 md:row-span-2 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            {/* [PLACEHOLDER: bento video 1 — jewellery making process] */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              {/* [PLACEHOLDER: bento video 1 src] */}
            </video>
            {/* Overlay Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-white p-6 shadow-lg rounded-xl">
              <div className="flex items-start gap-3">
                <div>
                  <h3 className="text-xl text-foreground mb-2 font-medium">
                    Each piece, <span>made once</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    [PLACEHOLDER: short description of the making process]
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Right — Craft philosophy */}
          <div
            className={`rounded-3xl p-6 md:p-8 flex flex-col justify-center md:col-span-2 relative overflow-hidden transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {/* [PLACEHOLDER: bento image 1 — e.g. close-up of clay work / pendant detail] */}
            <Image
              src="/placeholder.jpg"
              alt="[PLACEHOLDER: jewellery craft detail]"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-stone-900/50 z-0" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl text-white mb-2">
                Slow craft
              </h3>
              <h3 className="text-2xl md:text-3xl text-white/70 mb-4">
                Quiet luxury
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Hand className="w-4 h-4 flex-shrink-0" />
                  <span>Hand-shaped from clay</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Flame className="w-4 h-4 flex-shrink-0" />
                  <span>Kiln-fired for durability</span>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Palette className="w-4 h-4 flex-shrink-0" />
                  <span>Hand-painted, one at a time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right — Process video */}
          <div
            className={`rounded-3xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden bg-card md:col-span-2 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* [PLACEHOLDER: bento video 2 — e.g. oxidising / finishing] */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
            >
              {/* [PLACEHOLDER: bento video 2 src] */}
            </video>
            <div className="absolute inset-0 bg-transparent" />
            <div className="relative z-10 flex flex-col justify-center h-full text-left items-start">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3">
                <Flame className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-sans text-base mb-1 text-black">
                Fired &amp; finished
              </h3>
              <h3 className="text-2xl md:text-3xl mb-2 text-black">
                [PLACEHOLDER: process headline]
              </h3>
            </div>
          </div>
        </div>

        {/* Maker Story — two-column */}
        <div
          ref={videoSectionRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center my-0 py-20"
        >
          {/* Video */}
          <div
            className={`relative aspect-[4/5] rounded-3xl overflow-hidden bg-card boty-shadow transition-all duration-700 ease-out ${
              isVideoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* [PLACEHOLDER: bento video 3 — maker portrait / studio footage] */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              {/* [PLACEHOLDER: bento video 3 src] */}
            </video>
          </div>

          {/* Content */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ease-out ${
              isVideoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className={`text-sm tracking-[0.3em] uppercase text-primary mb-4 block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
              The Maker
            </span>
            <h2 className={`font-serif text-4xl leading-tight text-foreground mb-6 text-balance md:text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
              [PLACEHOLDER: maker story headline]
            </h2>
            <p className={`text-lg text-muted-foreground leading-relaxed mb-10 max-w-md ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
              [PLACEHOLDER: 2–3 sentence maker story — who you are, why you make jewellery, what drives you]
            </p>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group p-5 boty-transition hover:scale-[1.02] rounded-md bg-white"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-3 group-hover:bg-primary/20 boty-transition bg-stone-50">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
