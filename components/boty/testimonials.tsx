"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "[PLACEHOLDER: customer name]",
    location: "[PLACEHOLDER: city]",
    text: "[PLACEHOLDER: customer review — what they loved about the piece]",
    product: "[PLACEHOLDER: product name]"
  },
  {
    id: 2,
    name: "[PLACEHOLDER: customer name]",
    location: "[PLACEHOLDER: city]",
    text: "[PLACEHOLDER: customer review — what they loved about the piece]",
    product: "[PLACEHOLDER: product name]"
  },
  {
    id: 3,
    name: "[PLACEHOLDER: customer name]",
    location: "[PLACEHOLDER: city]",
    text: "[PLACEHOLDER: customer review — what they loved about the piece]",
    product: "[PLACEHOLDER: product name]"
  },
  {
    id: 4,
    name: "[PLACEHOLDER: customer name]",
    location: "[PLACEHOLDER: city]",
    text: "[PLACEHOLDER: customer review — what they loved about the piece]",
    product: "[PLACEHOLDER: product name]"
  },
  {
    id: 5,
    name: "[PLACEHOLDER: customer name]",
    location: "[PLACEHOLDER: city]",
    text: "[PLACEHOLDER: customer review — what they loved about the piece]",
    product: "[PLACEHOLDER: product name]"
  },
  {
    id: 6,
    name: "[PLACEHOLDER: customer name]",
    location: "[PLACEHOLDER: city]",
    text: "[PLACEHOLDER: customer review — what they loved about the piece]",
    product: "[PLACEHOLDER: product name]"
  },
  {
    id: 7,
    name: "[PLACEHOLDER: customer name]",
    location: "[PLACEHOLDER: city]",
    text: "[PLACEHOLDER: customer review — what they loved about the piece]",
    product: "[PLACEHOLDER: product name]"
  },
  {
    id: 8,
    name: "[PLACEHOLDER: customer name]",
    location: "[PLACEHOLDER: city]",
    text: "[PLACEHOLDER: customer review — what they loved about the piece]",
    product: "[PLACEHOLDER: product name]"
  },
  {
    id: 9,
    name: "[PLACEHOLDER: customer name]",
    location: "[PLACEHOLDER: city]",
    text: "[PLACEHOLDER: customer review — what they loved about the piece]",
    product: "[PLACEHOLDER: product name]"
  }
]

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div
    className="rounded-3xl p-6 bg-white mb-4 flex-shrink-0"
    style={{
      boxShadow: "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"
    }}
  >
    {/* Quote */}
    <p className="text-foreground/80 leading-relaxed mb-4 text-pretty font-medium text-xl font-serif tracking-wide">
      &ldquo;{testimonial.text}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-foreground text-base font-accent tracking-wide">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
      </div>
      <span className="text-xs tracking-wide text-primary/70 bg-primary/5 px-2 py-1 rounded-full whitespace-nowrap">
        {testimonial.product}
      </span>
    </div>
  </div>
)

export function Testimonials() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)

  const column1 = [testimonials[0], testimonials[3], testimonials[6]]
  const column2 = [testimonials[1], testimonials[4], testimonials[7]]
  const column3 = [testimonials[2], testimonials[5], testimonials[8]]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-24 bg-background overflow-hidden pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className={`text-sm tracking-[0.3em] uppercase text-primary block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
              Kind Words
            </span>
            <span className="text-foreground/30 text-xs">·</span>
            <span className="font-bengali text-xs tracking-widest text-primary/75 font-medium select-none">
              অনুভূতি
            </span>
          </div>
          <h2 className={`font-display text-4xl leading-tight text-foreground text-balance md:text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            Words from our collectors
          </h2>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

          {/* Mobile — Single Column */}
          <div className="md:hidden h-[600px]">
            <div className="relative overflow-hidden h-full">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <TestimonialCard key={`mobile-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>

          {/* Desktop — Three Columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 h-[600px]">
            {/* Column 1 — Scrolling Down */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...column1, ...column1].map((testimonial, index) => (
                  <TestimonialCard key={`col1-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Column 2 — Scrolling Up */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-up hover:animate-scroll-up-slow">
                {[...column2, ...column2].map((testimonial, index) => (
                  <TestimonialCard key={`col2-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>

            {/* Column 3 — Scrolling Down */}
            <div className="relative overflow-hidden">
              <div className="animate-scroll-down hover:animate-scroll-down-slow">
                {[...column3, ...column3].map((testimonial, index) => (
                  <TestimonialCard key={`col3-${testimonial.id}-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-down {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        @keyframes scroll-up {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }

        .animate-scroll-down {
          animation: scroll-down 30s linear infinite;
        }

        .animate-scroll-up {
          animation: scroll-up 30s linear infinite;
        }

        .animate-scroll-down-slow {
          animation: scroll-down 60s linear infinite;
        }

        .animate-scroll-up-slow {
          animation: scroll-up 60s linear infinite;
        }
      `}</style>
    </section>
  )
}
