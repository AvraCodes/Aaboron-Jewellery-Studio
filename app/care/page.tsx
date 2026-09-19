import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function CarePage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <div className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-card/75 backdrop-blur-md border border-border/40 rounded-3xl p-8 sm:p-12 boty-shadow">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm tracking-[0.3em] uppercase text-primary font-medium block">
                  Looking after your piece
                </span>
                <span className="text-foreground/30 text-xs">·</span>
                <span className="font-bengali text-xl sm:text-2xl text-primary font-medium select-none leading-none tracking-wide">
                  যত্ন ও পরামর্শ
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Care Guide
              </h1>
              <p className="text-muted-foreground leading-relaxed text-base">
                Handcrafted artisanal jewellery is built to last, but benefits from mindful handling. Here is how to keep your clay and oxidised pieces radiant and pristine for years to come.
              </p>
            </div>

            <div className="space-y-8 text-foreground">
              <section className="p-6 rounded-2xl bg-background/50 border border-border/40">
                <h2 className="font-serif text-2xl text-foreground mb-2">Clay Pendants &amp; Earrings</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Our clay pieces are cured for strength and sealed with a protective matte finish, but they are not waterproof. Avoid wearing them while showering, swimming, or sleeping. Gently wipe down with a soft, dry microfibre cloth after wearing to remove skin oils and ambient dust.
                </p>
              </section>

              <section className="p-6 rounded-2xl bg-background/50 border border-border/40">
                <h2 className="font-serif text-2xl text-foreground mb-2">Oxidised Earrings</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Oxidised metal pieces possess an intentional antique patina that deepens naturally over time. Keep them away from moisture, perfumes, hairsprays, and harsh chemical cleaners. Never use abrasive silver polish dips, as this will strip away the deliberate vintage finish.
                </p>
              </section>

              <section className="p-6 rounded-2xl bg-background/50 border border-border/40">
                <h2 className="font-serif text-2xl text-foreground mb-2">Storage</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Store each piece separately in the cotton pouch provided, or inside an airtight zip-lock bag. Keeping them dry and away from direct sunlight prevents humidity damage and protects hand-painted botanical motifs from accidental scratches.
                </p>
              </section>

              <section className="p-6 rounded-2xl bg-background/50 border border-border/40">
                <h2 className="font-serif text-2xl text-foreground mb-2">General Tips</h2>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  Always make jewellery the last touch when getting dressed and the first item removed at the end of the day. Avoid dropping pieces onto hard tiled or concrete floors, and handle earring backings with gentle pressure.
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
