"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // [PLACEHOLDER: wire up to a form service — e.g. Formspree, Resend, or a Next.js API route]
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">Get in touch</span>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Contact</h1>
            <p className="text-muted-foreground leading-relaxed">
              [PLACEHOLDER: contact intro — e.g. Have a question about a piece, or want to know more about custom orders?]
            </p>
          </div>

          {submitted ? (
            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-6 py-5">
              <Check className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-foreground">Thank you — I will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="text-sm text-muted-foreground block mb-1.5">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm text-muted-foreground block mb-1.5">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="text-sm text-muted-foreground block mb-1.5">Message</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition resize-none"
                  placeholder="[PLACEHOLDER: e.g. Your question or enquiry]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 boty-transition text-sm tracking-wide"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
