"use client"

import { useState } from "react"
import { Check, Loader2, AlertCircle } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const nextErrors: FormErrors = {}
    if (!name.trim()) {
      nextErrors.name = "Please enter your name"
    } else if (name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters"
    }

    if (!email.trim()) {
      nextErrors.email = "Please enter your email address"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address"
    }

    if (!message.trim()) {
      nextErrors.message = "Please enter your message"
    } else if (message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters"
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 700)
  }

  const handleNameChange = (val: string) => {
    setName(val)
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }))
    }
  }

  const handleEmailChange = (val: string) => {
    setEmail(val)
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }))
    }
  }

  const handleMessageChange = (val: string) => {
    setMessage(val)
    if (errors.message) {
      setErrors((prev) => ({ ...prev, message: undefined }))
    }
  }

  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card/75 backdrop-blur-md border border-border/40 rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-12 boty-shadow card-hover-lift">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm tracking-[0.3em] uppercase text-primary font-medium block">
                  Get in touch
                </span>
                <span className="text-foreground/30 text-xs">·</span>
                <span className="font-bengali text-xl sm:text-2xl text-primary font-medium select-none leading-none tracking-wide">
                  যোগাযোগ
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">Contact</h1>
              <p className="text-muted-foreground leading-relaxed text-base">
                Have a question about a piece, sizing, materials, or custom orders? Send us a message below and we will personally get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="flex items-center gap-3 bg-primary/10 border border-primary/25 rounded-2xl px-6 py-5">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-foreground font-medium">Thank you — your message has reached us. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition disabled:opacity-50 ${
                      errors.name
                        ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                        : "border-border/60 focus:ring-1 focus:ring-primary"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition disabled:opacity-50 ${
                      errors.email
                        ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                        : "border-border/60 focus:ring-1 focus:ring-primary"
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    disabled={isSubmitting}
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition resize-none disabled:opacity-50 ${
                      errors.message
                        ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                        : "border-border/60 focus:ring-1 focus:ring-primary"
                    }`}
                    placeholder="Tell us about your enquiry — whether regarding a piece, sizing, or styling advice..."
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 boty-transition text-sm tracking-wide shadow-sm flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
