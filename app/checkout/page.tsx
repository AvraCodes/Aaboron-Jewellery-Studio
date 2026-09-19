"use client"

/**
 * Razorpay Standard Checkout (public-key-only flow).
 *
 * PLACEHOLDER — before going live:
 * 1. Replace RAZORPAY_KEY_ID with your actual Razorpay key_id (from the Razorpay dashboard).
 * 2. For production, create orders server-side via a Next.js API route using your key_secret
 *    before opening the Razorpay modal. The current flow skips server-side order creation
 *    (suitable only for testing / early-stage use).
 */

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ShieldCheck } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"
import { useCart } from "@/components/boty/cart-context"

const RAZORPAY_KEY_ID = "[PLACEHOLDER: your Razorpay key_id]"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any
  }
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isPaying, setIsPaying] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Load Razorpay checkout script
  useEffect(() => {
    if (document.getElementById("razorpay-script")) {
      setIsScriptLoaded(true)
      return
    }
    const script = document.createElement("script")
    script.id = "razorpay-script"
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => setIsScriptLoaded(true)
    document.body.appendChild(script)
  }, [])

  const handlePayment = () => {
    if (!isScriptLoaded) return
    if (!name || !email || !phone) {
      alert("Please fill in all fields before proceeding.")
      return
    }

    setIsPaying(true)

    const options = {
      key: RAZORPAY_KEY_ID,
      // Amount in paise (1 INR = 100 paise)
      amount: subtotal * 100,
      currency: "INR",
      name: "Aaboron Jewellery Studio",
      description: `${items.length} ${items.length === 1 ? "item" : "items"}`,
      image: "/images/logo/aaboron-logo.png",
      prefill: { name, email, contact: phone },
      theme: { color: "#4F5B3A" },
      handler: () => {
        clearCart()
        setIsSuccess(true)
        setIsPaying(false)
      },
      modal: {
        ondismiss: () => setIsPaying(false),
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-40 pb-20 text-center max-w-md mx-auto px-6">
          <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" strokeWidth={1} />
          <h1 className="font-serif text-4xl text-foreground mb-4">Order placed</h1>
          <p className="text-muted-foreground mb-8">
            Thank you, {name}. You will receive a confirmation email at {email} shortly.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm tracking-wide boty-transition hover:bg-primary/90"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground boty-transition mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="font-serif text-4xl text-foreground mb-12">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Details */}
            <div>
              <h2 className="font-medium text-foreground mb-6 text-lg">Your Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="checkout-name" className="text-sm text-muted-foreground block mb-1.5">Full Name</label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="checkout-email" className="text-sm text-muted-foreground block mb-1.5">Email</label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="text-sm text-muted-foreground block mb-1.5">Phone</label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                    placeholder="+91 00000 00000"
                    required
                  />
                </div>
              </div>
              {/* [PLACEHOLDER: shipping address fields — add once shipping policy is defined] */}
              <p className="text-xs text-muted-foreground mt-4 italic">
                Shipping address will be confirmed upon order confirmation.
              </p>

              <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                Payments are processed securely via Razorpay. We never store your card details.
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h2 className="font-medium text-foreground mb-6 text-lg">Order Summary</h2>

              {items.length === 0 ? (
                <p className="text-muted-foreground">Your cart is empty.</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.variant ?? ''}`} className="flex gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={item.image || "/placeholder.jpg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-foreground text-sm">{item.name}</p>
                          {item.variant && (
                            <p className="text-xs text-muted-foreground">{item.variant}</p>
                          )}
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-foreground text-sm flex-shrink-0">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-4 mb-8 space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>Calculated at next step</span>
                    </div>
                    <div className="flex justify-between font-medium text-foreground text-base pt-2 border-t border-border/50">
                      <span>Total</span>
                      <span>₹{subtotal}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={isPaying || !isScriptLoaded}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 boty-transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isPaying ? "Opening payment..." : `Pay ₹${subtotal}`}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
