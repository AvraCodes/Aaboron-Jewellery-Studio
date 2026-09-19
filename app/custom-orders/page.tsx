"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function CustomOrdersPage() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [details, setDetails] = useState("")

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
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">Something made just for you</span>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Custom Orders</h1>
            <p className="text-muted-foreground leading-relaxed mb-4">
              [PLACEHOLDER: custom order intro — e.g. If you have a piece in mind — a specific colour, shape, or something personal — get in touch and we can make it together.]
            </p>
            <p className="text-muted-foreground leading-relaxed">
              [PLACEHOLDER: turnaround and pricing note for custom work]
            </p>
          </div>

          {submitted ? (
            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-6 py-5">
              <Check className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-foreground">Your enquiry has been received — I will be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="custom-name" className="text-sm text-muted-foreground block mb-1.5">Name</label>
                <input
                  id="custom-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="custom-email" className="text-sm text-muted-foreground block mb-1.5">Email</label>
                <input
                  id="custom-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="custom-details" className="text-sm text-muted-foreground block mb-1.5">Tell me about your piece</label>
                <textarea
                  id="custom-details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                  rows={6}
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition resize-none"
                  placeholder="[PLACEHOLDER: e.g. Describe the piece you have in mind — colours, shape, occasion, any references]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 boty-transition text-sm tracking-wide"
              >
                Send Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
