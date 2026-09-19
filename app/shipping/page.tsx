import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function ShippingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">Before you order</span>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Shipping &amp; Returns</h1>
          </div>

          <div className="space-y-10 text-foreground">
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-3">Processing &amp; Dispatch</h2>
              <p className="text-muted-foreground leading-relaxed">
                [PLACEHOLDER: dispatch timeline — e.g. All pieces are made to order. Please allow X–X days before dispatch.]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-3">Shipping</h2>
              <p className="text-muted-foreground leading-relaxed">
                [PLACEHOLDER: shipping details — carriers, estimated delivery, costs, areas served]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-3">Returns &amp; Exchanges</h2>
              <p className="text-muted-foreground leading-relaxed">
                [PLACEHOLDER: returns policy — e.g. whether returns are accepted, conditions, timeframe, process]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-3">Damaged or Missing Orders</h2>
              <p className="text-muted-foreground leading-relaxed">
                [PLACEHOLDER: policy for damaged or lost parcels — e.g. contact us within X days with photos]
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
