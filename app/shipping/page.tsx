import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <div className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-card/75 backdrop-blur-md border border-border/40 rounded-3xl p-8 sm:p-12 boty-shadow">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm tracking-[0.3em] uppercase text-primary font-medium block">
                  Before you order
                </span>
                <span className="text-foreground/30 text-xs">·</span>
                <span className="font-bengali text-xl sm:text-2xl text-primary font-medium select-none leading-none tracking-wide">
                  তথ্য ও নিয়মাবলী
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Shipping &amp; Returns
              </h1>
              <p className="text-muted-foreground leading-relaxed text-base">
                Everything you need to know about how your handmade pieces are packaged, dispatched, and protected along their journey to your doorstep.
              </p>
            </div>

            <div className="space-y-8 text-foreground">
              <section className="p-6 rounded-2xl bg-background/50 border border-border/40">
                <h2 className="font-serif text-2xl text-foreground mb-2">Processing &amp; Dispatch</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Ready-to-ship items (including our oxidised collection) are dispatched within 1–2 business days. Made-to-order and custom clay jewellery require 3–5 working days to allow for sculpt curing, hand-painting, and protective sealing before departure.
                </p>
              </section>

              <section className="p-6 rounded-2xl bg-background/50 border border-border/40">
                <h2 className="font-serif text-2xl text-foreground mb-2">Domestic Shipping</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  We ship pan-India via express logistics partners. Delivery across metro cities (Kolkata, Delhi, Mumbai, Bengaluru, Chennai, Hyderabad) generally takes 2–4 business days post-dispatch. Rest of India deliveries take 4–7 business days. Full tracking details are emailed immediately upon courier pickup.
                </p>
              </section>

              <section className="p-6 rounded-2xl bg-background/50 border border-border/40">
                <h2 className="font-serif text-2xl text-foreground mb-2">Returns &amp; Exchanges</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Because each piece is handmade in intimate batches or made to order, and due to personal hygiene considerations with jewellery, we cannot accept returns or exchanges for change of mind. Please review product dimensions and specifications before purchasing.
                </p>
              </section>

              <section className="p-6 rounded-2xl bg-background/50 border border-border/40">
                <h2 className="font-serif text-2xl text-foreground mb-2">Damaged or Transit Issues</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Every order is cushioned securely in shockproof, gift-ready packaging. In the unlikely case that your item arrives broken or damaged during transit, please notify us within 48 hours of delivery at support@aaboron.in with an unboxing video or photographs. We will promptly dispatch a priority replacement or issue a full refund.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
