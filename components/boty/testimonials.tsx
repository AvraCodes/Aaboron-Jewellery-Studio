"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sen",
    location: "Kolkata",
    text: "The clay pendant is so lightweight and the hand-painted detailing is breathtaking. Wore it for Durga Puja and received so many compliments. Truly crafted with care.",
    product: "Terracotta Blossom Clay Set"
  },
  {
    id: 2,
    name: "Ananya Roy",
    location: "Bengaluru",
    text: "Delicate, vintage, and doesn't hurt my sensitive ears even after 10 hours of wear. The oxidised silver finish looks genuine and heirloom-quality.",
    product: "Delicate Floral Oxidised Jhumkis"
  },
  {
    id: 3,
    name: "Sneha Mukherjee",
    location: "Mumbai",
    text: "The choker fits gracefully and the texture of the materials is so satisfying to touch. You can feel the intention behind every bead. Packaging was like receiving a gift.",
    product: "Classic Crafted Choker Set"
  },
  {
    id: 4,
    name: "Debalina Das",
    location: "Delhi",
    text: "The earthy terracotta colours are so warm and authentic. It feels like carrying a small piece of Bengal's soil and artistic soul wherever I travel.",
    product: "Sonartari Clay Jewellery Set"
  },
  {
    id: 5,
    name: "Rupsha Banerjee",
    location: "Pune",
    text: "Stunning statement earrings! Lightweight yet remarkably ornate. They catch the light with an antique subtlety that outshines commercial jewellery.",
    product: "Statement Festive Oxidised Earrings"
  },
  {
    id: 6,
    name: "Meenakshi Iyer",
    location: "Chennai",
    text: "Exquisite hand-painted mandala work on clay. Durable yet feather-light. Aaboron has become my favorite destination for slow, mindful gifts.",
    product: "Floral Mandala Clay Earrings"
  },
  {
    id: 7,
    name: "Tanushree Guha",
    location: "Hyderabad",
    text: "The organic clay finish feels so tactile and grounded compared to plastic fast-fashion pieces. Real artisan devotion in every curve.",
    product: "Earth & Petal Clay Set"
  },
  {
    id: 8,
    name: "Sharmila Bose",
    location: "Kolkata",
    text: "Antique finish is immaculate and looks like a timeless piece passed down through generations. Such proud Bengali heritage in modern design.",
    product: "Heritage Jhumki Oxidised Danglers"
  },
  {
    id: 9,
    name: "Arpita Paul",
    location: "London, UK",
    text: "Ordered for my sister's wedding in India. She fell in love immediately! The artisanal charm and unhurried craftsmanship shine through.",
    product: "Festive Heritage Jewellery Set"
  }
]

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div
    className="rounded-3xl p-6 bg-card/70 backdrop-blur-md border border-border/40 mb-4 flex-shrink-0 boty-shadow boty-transition hover:bg-card/85"
  >
    {/* Stars */}
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-amber-500/80 text-sm">★</span>
      ))}
    </div>

    {/* Quote */}
    <p className="text-foreground/85 leading-relaxed mb-4 text-pretty font-medium text-lg font-serif tracking-wide">
      &ldquo;{testimonial.text}&rdquo;
    </p>

    {/* Author */}
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-foreground text-base font-accent tracking-wide">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
      </div>
      <span className="text-xs tracking-wide text-primary/80 bg-primary/10 px-2.5 py-1 rounded-full whitespace-nowrap font-medium">
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
    <section className="py-24 bg-transparent overflow-hidden pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className={`text-sm tracking-[0.3em] uppercase text-primary block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
              Kind Words
            </span>
            <span className="text-foreground/30 text-xs">·</span>
            <span className="font-bengali text-xl sm:text-2xl text-primary font-medium select-none leading-none tracking-wide">
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
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/70 to-transparent z-10 pointer-events-none" />

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
