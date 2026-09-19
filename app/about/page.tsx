import Image from "next/image"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-card boty-shadow">
              {/* [PLACEHOLDER: maker portrait or studio image] */}
              <Image
                src="/placeholder.jpg"
                alt="[PLACEHOLDER: maker portrait]"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div>
              <span className="text-sm tracking-[0.3em] uppercase text-primary mb-4 block">The maker</span>
              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                [PLACEHOLDER: about headline — e.g. Made slowly, with intention.]
              </h1>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>[PLACEHOLDER: paragraph 1 — who you are and how you started]</p>
                <p>[PLACEHOLDER: paragraph 2 — your process and what makes your work distinct]</p>
                <p>[PLACEHOLDER: paragraph 3 — what you want people to feel wearing your pieces]</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
