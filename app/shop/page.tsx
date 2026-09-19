"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, SlidersHorizontal, X } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"
import { products, CATEGORIES, type Category } from "@/lib/products"

const ALL = "all" as const
type FilterValue = Category | typeof ALL

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<FilterValue>(ALL)
  const [showFilters, setShowFilters] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredProducts = selectedCategory === ALL
    ? products.filter((p) => p.isActive)
    : products.filter((p) => p.category === selectedCategory && p.isActive)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current)
      }
    }
  }, [])

  // Reset animation when category changes
  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [selectedCategory])

  const categories: { value: FilterValue; label: string }[] = [
    { value: ALL, label: "All" },
    ...CATEGORIES,
  ]

  return (
    <main className="min-h-screen bg-transparent">
      <Header />

      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-sm tracking-[0.3em] uppercase text-primary font-medium block">
                Our Collection
              </span>
              <span className="text-foreground/30 text-xs">·</span>
              <span className="font-bengali text-xl sm:text-2xl text-primary font-medium select-none leading-none tracking-wide">
                সমগ্র সংগ্রহ
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance">
              Shop All Pieces
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Handcrafted jewellery made to order. Each piece is one of a kind.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border/50">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden inline-flex items-center gap-2 text-sm text-foreground"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Desktop Categories */}
            <div className="hidden lg:flex items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm boty-transition ${
                    selectedCategory === category.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground/70 hover:text-foreground boty-shadow"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}
            </span>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-background">
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-serif text-2xl text-foreground">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setShowFilters(false)}
                    className="p-2 text-foreground/70 hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category.value)
                        setShowFilters(false)
                      }}
                      className={`w-full px-6 py-4 rounded-2xl text-left boty-transition ${
                        selectedCategory === category.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground boty-shadow"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div
            ref={gridRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isVisible={isVisible}
              />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-16 text-muted-foreground">
                Products coming soon.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

function ProductCard({
  product,
  index,
  isVisible
}: {
  product: typeof products[0]
  index: number
  isVisible: boolean
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addItem } = useCart()

  return (
    <Link
      href={`/product/${product.id}`}
      className={`group transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="bg-card/75 backdrop-blur-md border border-border/40 hover:border-primary/40 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl boty-transition group-hover:scale-[1.02]">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          {/* Skeleton */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-muted via-muted/50 to-muted animate-pulse transition-opacity duration-500 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />

          <Image
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            fill
            className={`object-cover boty-transition group-hover:scale-105 transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs tracking-wide ${
                product.badge === "New"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              {product.badge}
            </span>
          )}
          {/* Quick add button */}
          <button
            type="button"
            className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 boty-transition boty-shadow hover:bg-primary hover:text-primary-foreground group/btn"
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
            <ShoppingBag className="w-5 h-5 text-foreground group-hover/btn:text-primary-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="font-serif text-xl text-foreground mb-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{product.tagline}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-foreground">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
