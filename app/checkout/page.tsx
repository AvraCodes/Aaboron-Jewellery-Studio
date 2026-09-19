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
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")
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
    if (!name || !email || !phone || !address || !city || !pincode) {
      alert("Please fill in all contact and shipping address details before proceeding.")
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
      <main className="min-h-screen bg-transparent">
        <Header />
        <div className="pt-40 pb-20 text-center max-w-md mx-auto px-6">
          <div className="bg-card/75 backdrop-blur-md border border-border/40 rounded-3xl p-8 boty-shadow">
            <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" strokeWidth={1} />
            <h1 className="font-serif text-3xl text-foreground mb-3">Thank you for your order</h1>
            <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
              Your handmade jewellery order has been received and will be crafted with care. We will send updates to {email}.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-full text-sm font-medium hover:bg-primary/90 boty-transition"
            >
              Continue Browsing
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-transparent">
      <Header />

      <div className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary boty-transition mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="font-serif text-4xl text-foreground mb-10">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact & Shipping Details */}
            <div className="bg-card/75 backdrop-blur-md border border-border/40 rounded-3xl p-8 boty-shadow">
              <h2 className="font-serif text-2xl text-foreground mb-6">Contact &amp; Shipping</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="checkout-name" className="text-sm text-muted-foreground block mb-1.5 font-medium">Full Name</label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background/70 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-email" className="text-sm text-muted-foreground block mb-1.5 font-medium">Email</label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background/70 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="text-sm text-muted-foreground block mb-1.5 font-medium">Phone</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-background/70 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="checkout-address" className="text-sm text-muted-foreground block mb-1.5 font-medium">Delivery Address</label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-background/70 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                    placeholder="Flat / House No., Street, Landmark"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-city" className="text-sm text-muted-foreground block mb-1.5 font-medium">City</label>
                    <input
                      id="checkout-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-background/70 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                      placeholder="Kolkata"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-pincode" className="text-sm text-muted-foreground block mb-1.5 font-medium">PIN Code</label>
                    <input
                      id="checkout-pincode"
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-background/70 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                      placeholder="700001"
                      required
                    />
                  </div>
                </div>
              </div>

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
