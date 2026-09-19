"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "./cart-context"
import { products, CATEGORIES, type Category } from "@/lib/products"

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("clay-pendants")
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory && p.isActive
  )
  const displayedProducts = filteredProducts.slice(0, 4)

  const handleCategoryChange = (category: Category) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true)
      setTimeout(() => {
        setSelectedCategory(category)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 300)
    }
  }

  useEffect(() => {
    const gridObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) gridObserver.observe(gridRef.current)
    if (headerRef.current) headerObserver.observe(headerRef.current)

    return () => {
      if (gridRef.current) gridObserver.unobserve(gridRef.current)
      if (headerRef.current) headerObserver.unobserve(headerRef.current)
    }
  }, [])

  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className={`text-sm tracking-[0.3em] uppercase text-primary block ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.2s', animationFillMode: 'forwards' } : {}}>
              Our Collection
            </span>
            <span className="text-foreground/30 text-xs">·</span>
            <span className="font-bengali text-xl sm:text-2xl text-primary font-medium select-none leading-none tracking-wide">
              গ্যালারি
            </span>
          </div>
          <h2 className={`font-display leading-tight text-foreground mb-4 text-balance text-5xl md:text-7xl ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.4s', animationFillMode: 'forwards' } : {}}>
            Made by hand
          </h2>
          <p className={`text-lg text-muted-foreground max-w-md mx-auto ${headerVisible ? 'animate-blur-in opacity-0' : 'opacity-0'}`} style={headerVisible ? { animationDelay: '0.6s', animationFillMode: 'forwards' } : {}}>
            <span className="font-accent italic block text-base text-foreground/80 mb-0.5">Slow-crafted ornaments of Bengal —</span>
            Each piece is shaped slowly, with care, one at a time.
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto px-2">
          <div className="inline-flex flex-wrap sm:flex-nowrap justify-center bg-card/80 backdrop-blur-md rounded-full p-1 gap-1 border border-border/40 max-w-full">
            {CATEGORIES.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategoryChange(category.value)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - Centered Responsive Layout */}
        <div
          ref={gridRef}
          className="flex flex-wrap justify-center gap-3 sm:gap-6 max-w-6xl mx-auto w-full"
        >
          {displayedProducts.map((product, index) => (
            <div
              key={`${selectedCategory}-${product.id}`}
              className={`w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] max-w-[270px] flex-shrink-0 transition-all duration-500 ease-out flex flex-col ${
                isVisible && !isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ transitionDelay: isTransitioning ? '0ms' : `${index * 80}ms` }}
            >
              <Link
                href={`/product/${product.id}`}
                className="group block h-full"
              >
                <div className="bg-card/75 backdrop-blur-md border border-border/40 hover:border-primary/40 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-xl card-hover-lift boty-transition group-hover:scale-[1.01] flex flex-col h-full items-center text-center">
                  {/* Image */}
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover boty-transition group-hover:scale-105"
                    />
                    {/* Badge */}
                    {product.badge && (
                      <span
                        className={`absolute top-2.5 left-2.5 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs tracking-wide ${
                          product.badge === "New"
                            ? "bg-primary/15 text-primary font-medium"
                            : "bg-accent text-accent-foreground"
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                    {/* Quick add button — accessible on touch and hover */}
                    <button
                      type="button"
                      className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-90 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 boty-transition boty-shadow hover:bg-primary hover:text-primary-foreground group/btn"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        addItem({
                          id: product.id,
                          name: product.name,
                          description: product.tagline,
                          price: product.price,
                          image: product.image,
                        })
                      }}
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground group-hover/btn:text-primary-foreground group-hover:text-primary transition-colors" />
                    </button>
                  </div>

                  {/* Info - Center Aligned */}
                  <div className="p-3 sm:p-5 text-center flex flex-col flex-grow items-center justify-between">
                    <div>
                      <h3 className="font-serif text-sm sm:text-lg text-foreground mb-1 group-hover:text-primary boty-transition line-clamp-1 font-medium">{product.name}</h3>
                      <p className="text-[11px] sm:text-xs text-muted-foreground mb-2 sm:mb-3 line-clamp-1">{product.tagline}</p>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1.5 border-t border-border/20 w-full">
                      <span className="font-semibold text-foreground text-sm sm:text-base">₹{product.price.toLocaleString("en-IN")}</span>
                      {product.originalPrice && (
                        <span className="text-[11px] sm:text-xs text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="w-full text-center py-16 text-muted-foreground">
              Products coming soon.
            </div>
          )}
        </div>

        {/* View All in Category Button */}
        <div className="text-center mt-12">
          <Link
            href={`/shop?category=${selectedCategory}`}
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-foreground hover:text-background hover:border-foreground"
          >
            Explore all {CATEGORIES.find((c) => c.value === selectedCategory)?.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
