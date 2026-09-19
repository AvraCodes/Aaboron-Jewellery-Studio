"use client"

import { useState } from "react"
import { Check, Loader2, AlertCircle } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

interface FormErrors {
  name?: string
  email?: string
  details?: string
}

export default function CustomOrdersPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState("")
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

    if (!details.trim()) {
      nextErrors.details = "Please describe what piece you envision"
    } else if (details.trim().length < 10) {
      nextErrors.details = "Please provide more details (at least 10 characters)"
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

  const handleDetailsChange = (val: string) => {
    setDetails(val)
    if (errors.details) {
      setErrors((prev) => ({ ...prev, details: undefined }))
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
                  Something made just for you
                </span>
                <span className="text-foreground/30 text-xs">·</span>
                <span className="font-bengali text-xl sm:text-2xl text-primary font-medium select-none leading-none tracking-wide">
                  কাস্টম গহনা
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Custom Orders
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-3 text-base">
                If you have a particular vision in mind—a tailored color palette to match a festive ensemble, personal botanical motifs, or a one-of-a-kind clay pendant—we would be honored to sculpt it for you.
              </p>
              <p className="text-sm text-primary/80 bg-primary/10 px-4 py-2.5 rounded-xl inline-block">
                Turnaround: 7–10 working days from design alignment to dispatch. Custom pieces start from ₹199.
              </p>
            </div>

            {submitted ? (
              <div className="flex items-center gap-3 bg-primary/10 border border-primary/25 rounded-2xl px-6 py-5">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-foreground font-medium">Your custom enquiry has been received — we will review your notes and get in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="custom-name" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="custom-name"
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "custom-name-error" : undefined}
                    className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition disabled:opacity-50 ${
                      errors.name
                        ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                        : "border-border/60 focus:ring-1 focus:ring-primary"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="custom-name-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="custom-email" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="custom-email"
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "custom-email-error" : undefined}
                    className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition disabled:opacity-50 ${
                      errors.email
                        ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                        : "border-border/60 focus:ring-1 focus:ring-primary"
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p id="custom-email-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="custom-details" className="text-sm text-muted-foreground block mb-1.5 font-medium">
                    Tell me about your piece <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="custom-details"
                    value={details}
                    onChange={(e) => handleDetailsChange(e.target.value)}
                    disabled={isSubmitting}
                    rows={6}
                    aria-invalid={!!errors.details}
                    aria-describedby={errors.details ? "custom-details-error" : undefined}
                    className={`w-full bg-background/70 backdrop-blur-sm border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none boty-transition resize-none disabled:opacity-50 ${
                      errors.details
                        ? "border-destructive ring-1 ring-destructive/40 bg-destructive/5"
                        : "border-border/60 focus:ring-1 focus:ring-primary"
                    }`}
                    placeholder="Describe the piece you envision—desired colors, motifs, shapes, outfit pairing, or any specific details..."
                  />
                  {errors.details && (
                    <p id="custom-details-error" className="text-xs text-destructive mt-1.5 flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      {errors.details}
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
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <span>Send Custom Enquiry</span>
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
