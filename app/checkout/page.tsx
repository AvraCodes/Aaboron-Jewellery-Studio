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
import { ChevronLeft, ShieldCheck, Loader2, AlertCircle } from "lucide-react"
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

interface CheckoutErrors {
  name?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  pincode?: string
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")
  const [errors, setErrors] = useState<CheckoutErrors>({})
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

  const validate = (): boolean => {
    const nextErrors: CheckoutErrors = {}

    if (!name.trim()) {
      nextErrors.name = "Full name is required"
    } else if (name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters"
    }

    if (!email.trim()) {
      nextErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address"
    }

    if (!phone.trim()) {
      nextErrors.phone = "Phone number is required"
    } else if (!/^\+?[0-9\s-]{10,14}$/.test(phone.trim())) {
      nextErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (!address.trim()) {
      nextErrors.address = "Delivery address is required"
    }

    if (!city.trim()) {
      nextErrors.city = "City is required"
    }

    if (!pincode.trim()) {
      nextErrors.pincode = "PIN code is required"
    } else if (!/^\d{6}$/.test(pincode.trim())) {
      nextErrors.pincode = "Please enter a 6-digit PIN code"
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handlePayment = () => {
    if (!validate()) {
      // Smooth scroll to top of form
      const formEl = document.getElementById("checkout-form-container")
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      return
    }

    if (!isScriptLoaded) return

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

    try {
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch {
      setIsPaying(false)
    }
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

      <div className="pt-24 sm:pt-32 pb-24 sm:pb-28 lg:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary boty-transition mb-6 sm:mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-8 sm:mb-10">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Contact & Shipping Details */}
            <div id="checkout-form-container" className="bg-card/75 backdrop-blur-md border border-border/40 rounded-2xl sm:rounded-3xl p-5 sm:p-8 boty-shadow">
              <h2 className="font-serif text-2xl text-foreground mb-6">Contact &amp; Shipping</h2>
              
              {Object.keys(errors).length > 0 && (
                <div className="mb-5 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Please correct the highlighted fields below before proceeding to payment.</span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="checkout-name" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
                    }}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "checkout-name-error" : undefined}
                    className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition ${
                      errors.name
                        ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                        : "border-border/60 focus:ring-1 focus:ring-primary"
                    }`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p id="checkout-name-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-email" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                      }}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "checkout-email-error" : undefined}
                      className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition ${
                        errors.email
                          ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                          : "border-border/60 focus:ring-1 focus:ring-primary"
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p id="checkout-email-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="checkout-phone" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
                      }}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "checkout-phone-error" : undefined}
                      className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition ${
                        errors.phone
                          ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                          : "border-border/60 focus:ring-1 focus:ring-primary"
                      }`}
                      placeholder="9876543210"
                    />
                    {errors.phone && (
                      <p id="checkout-phone-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="checkout-address" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                    Delivery Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value)
                      if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }))
                    }}
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? "checkout-address-error" : undefined}
                    className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition ${
                      errors.address
                        ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                        : "border-border/60 focus:ring-1 focus:ring-primary"
                    }`}
                    placeholder="Flat / House No., Street, Landmark"
                  />
                  {errors.address && (
                    <p id="checkout-address-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-city" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                      City <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value)
                        if (errors.city) setErrors((prev) => ({ ...prev, city: undefined }))
                      }}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? "checkout-city-error" : undefined}
                      className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition ${
                        errors.city
                          ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                          : "border-border/60 focus:ring-1 focus:ring-primary"
                      }`}
                      placeholder="Kolkata"
                    />
                    {errors.city && (
                      <p id="checkout-city-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="checkout-pincode" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                      PIN Code <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="checkout-pincode"
                      type="text"
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value)
                        if (errors.pincode) setErrors((prev) => ({ ...prev, pincode: undefined }))
                      }}
                      aria-invalid={!!errors.pincode}
                      aria-describedby={errors.pincode ? "checkout-pincode-error" : undefined}
                      className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition ${
                        errors.pincode
                          ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                          : "border-border/60 focus:ring-1 focus:ring-primary"
                      }`}
                      placeholder="700001"
                    />
                    {errors.pincode && (
                      <p id="checkout-pincode-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Payments are processed securely via Razorpay. We never store your card details.</span>
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
                            sizes="64px"
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
                    className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 boty-transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isPaying ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Opening payment...</span>
                      </>
                    ) : (
                      <span>Pay ₹{subtotal}</span>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Pay Bar */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-card/95 backdrop-blur-md border-t border-border/40 p-3 sm:p-4 boty-shadow">
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            <div>
              <span className="text-xs text-muted-foreground block leading-tight">Total Amount</span>
              <span className="font-serif text-lg font-medium text-foreground">₹{subtotal}</span>
            </div>
            <button
              type="button"
              onClick={handlePayment}
              disabled={isPaying || !isScriptLoaded}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 boty-transition flex items-center gap-2 disabled:opacity-60 flex-shrink-0 shadow-sm"
            >
              {isPaying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Opening...</span>
                </>
              ) : (
                <span>Pay ₹{subtotal}</span>
              )}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
