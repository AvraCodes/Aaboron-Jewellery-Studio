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
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <div className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="bg-card/75 backdrop-blur-md border border-border/40 rounded-3xl p-8 sm:p-12 boty-shadow">
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
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="custom-name" className="text-sm text-muted-foreground block mb-1.5 font-medium">Name</label>
                  <input
                    id="custom-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-background/70 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="custom-email" className="text-sm text-muted-foreground block mb-1.5 font-medium">Email</label>
                  <input
                    id="custom-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-background/70 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="custom-details" className="text-sm text-muted-foreground block mb-1.5 font-medium">Tell me about your piece</label>
                  <textarea
                    id="custom-details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                    rows={6}
                    className="w-full bg-background/70 backdrop-blur-sm border border-border/60 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary boty-transition resize-none"
                    placeholder="Describe the piece you envision—desired colors, motifs, shapes, outfit pairing, or any specific details..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-4 rounded-full font-medium hover:bg-primary/90 boty-transition text-sm tracking-wide shadow-sm"
                >
                  Send Custom Enquiry
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
