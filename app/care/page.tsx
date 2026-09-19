import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function CarePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">Looking after your piece</span>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Care Guide</h1>
            <p className="text-muted-foreground leading-relaxed">
              [PLACEHOLDER: care guide intro — e.g. Handmade clay jewellery is durable but benefits from a little love.]
            </p>
          </div>

          <div className="space-y-10 prose prose-sm max-w-none text-foreground">
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-3">Clay Pendants &amp; Earrings</h2>
              <p className="text-muted-foreground leading-relaxed">
                [PLACEHOLDER: care instructions for clay pieces — e.g. avoid prolonged exposure to water, store flat, etc.]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-3">Oxidised Earrings</h2>
              <p className="text-muted-foreground leading-relaxed">
                [PLACEHOLDER: care instructions for oxidised pieces — e.g. how to maintain the finish, what to avoid]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-3">Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                [PLACEHOLDER: storage advice — e.g. keep in the pouch provided, away from direct sunlight]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-3">General Tips</h2>
              <p className="text-muted-foreground leading-relaxed">
                [PLACEHOLDER: general jewellery care tips]
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
