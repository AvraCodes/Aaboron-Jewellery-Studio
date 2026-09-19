"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, Minus, Plus, ChevronDown, Hand, Heart, PackageCheck, Shield, Check, ShoppingBag } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"
import { getProductById, products } from "@/lib/products"

const benefits = [
  { icon: Hand, label: "Handcrafted" },
  { icon: Heart, label: "Made to Order" },
  { icon: PackageCheck, label: "Carefully Packed" },
  { icon: Shield, label: "Secure Checkout" }
]

type AccordionSection = "description" | "materials" | "care" | "shipping"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId) ?? products.find((p) => p.isActive)

  const { addItem } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product?.variants?.[0]
  )
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState<AccordionSection | null>("description")
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  if (!product) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-40 pb-20 text-center text-muted-foreground">
          Product not found.
        </div>
        <Footer />
      </main>
    )
  }

  const toggleAccordion = (section: AccordionSection) => {
    setOpenAccordion(openAccordion === section ? null : section)
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.tagline,
      price: product.price,
      image: product.image,
      variant: selectedVariant,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const accordionItems: { key: AccordionSection; title: string; content: string }[] = [
    { key: "description", title: "Description", content: product.description },
    { key: "materials", title: "Materials & Dimensions", content: `${product.materials}\n\n${product.dimensions}` },
    { key: "care", title: "Care Instructions", content: product.care },
    { key: "shipping", title: "Shipping & Returns", content: product.leadTime + "\n\nHandmade with care in small batches. Due to hygiene considerations with jewellery, we accept replacements only for items damaged during transit. Please contact support@aaboron.in within 48 hours of delivery." },
  ]

  return (
    <main className="min-h-screen bg-transparent">
      <Header />

      <div className="pt-24 sm:pt-32 pb-24 sm:pb-28 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary boty-transition mb-6 sm:mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
            {/* Product Image */}
            <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-card/75 backdrop-blur-md border border-border/40 boty-shadow card-hover-lift">
              <Image
                src={product.image || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-primary mb-2 block font-medium">
                  Aaboron
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 sm:mb-3">
                  {product.name}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground italic mb-4 sm:mb-6">
                  {product.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="text-2xl sm:text-3xl font-medium text-foreground">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Variant Selector */}
              {product.variants.length > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Select Option
                  </label>
                  <div className="flex gap-2 sm:gap-3 flex-wrap">
                    {product.variants.map((variant) => (
                      <button
                        key={variant}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm boty-transition boty-shadow ${
                          selectedVariant === variant
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-foreground hover:bg-card/80"
                        }`}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6 sm:mb-8">
                <label className="text-sm font-medium text-foreground mb-2 sm:mb-3 block">Quantity</label>
                <div className="inline-flex items-center gap-3 sm:gap-4 bg-card rounded-full px-2 py-1.5 sm:py-2 boty-shadow">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-foreground text-sm sm:text-base">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background flex items-center justify-center text-foreground/60 hover:text-foreground boty-transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Lead Time Note */}
              <p className="text-xs sm:text-sm text-muted-foreground mb-6 italic">
                {product.leadTime}
              </p>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full text-sm tracking-wide boty-transition boty-shadow ${
                    isAdded
                      ? "bg-primary/80 text-primary-foreground"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.01]"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      Added to Cart
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-10">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.label}
                    className="flex flex-col items-center gap-1.5 sm:gap-2 p-3 sm:p-4 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 text-center card-hover-lift"
                  >
                    <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-[11px] sm:text-xs text-muted-foreground text-center font-medium">{benefit.label}</span>
                  </div>
                ))}
              </div>

              {/* Accordion */}
              <div className="border-t border-border/50">
                {accordionItems.map((item) => (
                  <div key={item.key} className="border-b border-border/50">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(item.key)}
                      className="w-full flex items-center justify-between py-5 text-left"
                    >
                      <span className="font-medium text-foreground">{item.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground boty-transition ${
                          openAccordion === item.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden boty-transition ${
                        openAccordion === item.key ? "max-h-96 pb-5" : "max-h-0"
                      }`}
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border/50 p-3 sm:p-4 px-4 sm:px-6 flex items-center justify-between gap-4 boty-shadow">
        <div className="flex flex-col min-w-0">
          <p className="font-serif text-sm text-foreground font-medium truncate">{product.name}</p>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-semibold text-foreground">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide boty-transition boty-shadow ${
            isAdded
              ? "bg-primary/80 text-primary-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Added
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </>
          )}
        </button>
      </div>

      <Footer />
    </main>
  )
}
