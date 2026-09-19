"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingBag } from "lucide-react"
import { CartDrawer } from "./cart-drawer"
import { useCart } from "./cart-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setIsOpen, itemCount } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 pt-3 sm:pt-4">
      <nav className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 backdrop-blur-md rounded-2xl py-0 my-0 animate-scale-fade-in bg-[rgba(255,255,255,0.7)] border border-border/40 shadow-sm" style={{ boxShadow: 'rgba(0, 0, 0, 0.06) 0px 10px 40px' }}>
        <div className="flex items-center justify-between h-[60px] sm:h-[68px]">
          {/* Left Side: Brand Logo & Wordmark */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <Image
              src="/images/logo/aaboron-logo.png"
              alt="Aaboron Jewellery Studio"
              width={44}
              height={44}
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover shadow-xs ring-1 ring-primary/25 group-hover:scale-105 boty-transition"
              priority
            />
            <span className="font-display text-xl sm:text-3xl tracking-wide text-foreground group-hover:text-primary whitespace-nowrap boty-transition">
              Aaboron
            </span>
          </Link>

          {/* Right Side: Navigation & Cart Action */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/shop"
                className="text-sm font-medium tracking-wide text-foreground/75 hover:text-primary boty-transition"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium tracking-wide text-foreground/75 hover:text-primary boty-transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium tracking-wide text-foreground/75 hover:text-primary boty-transition"
              >
                Contact
              </Link>
            </nav>

            {/* Cart Button with Animated Counter Badge */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-foreground/80 hover:text-primary boty-transition group flex items-center"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 boty-transition" />
              <span
                className={`ml-1.5 px-1.5 py-0.5 text-xs font-semibold rounded-full boty-transition ${
                  itemCount > 0
                    ? "bg-primary text-primary-foreground min-w-[20px] text-center shadow-xs animate-pulse-soft"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {itemCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden p-2 text-foreground/80 hover:text-primary boty-transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <CartDrawer />

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden boty-transition ${
            isMenuOpen ? "max-h-64 pb-5" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-3 pt-3 border-t border-border/40">
            <Link
              href="/shop"
              className="text-base font-medium tracking-wide text-foreground/80 hover:text-primary py-1 boty-transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-base font-medium tracking-wide text-foreground/80 hover:text-primary py-1 boty-transition"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-base font-medium tracking-wide text-foreground/80 hover:text-primary py-1 boty-transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
