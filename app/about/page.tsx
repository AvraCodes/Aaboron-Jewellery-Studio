import Image from "next/image"
import { Header } from "@/components/boty/header"
import { Footer } from "@/components/boty/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <Header />
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card/75 backdrop-blur-md border border-border/40 rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-12 boty-shadow card-hover-lift">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-card border border-border/40 shadow-sm">
                <Image
                  src="/images/products/clay-jewellery/clay-01.jpg"
                  alt="Aaboron Artisan Handcrafted Studio"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="font-bengali text-xl block text-amber-200/90 mb-1 select-none">
                    মাটির টান ও শিল্প
                  </span>
                  <p className="font-serif text-lg">Hand-kneaded clay, cured with patience</p>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm tracking-[0.3em] uppercase text-primary font-medium block">
                    The Maker
                  </span>
                  <span className="text-foreground/30 text-xs">·</span>
                  <span className="font-bengali text-xl sm:text-2xl text-primary font-medium select-none leading-none tracking-wide">
                    আমাদের কথা
                  </span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-6 leading-tight">
                  Handmade with intention, born in Bengal
                </h1>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
                  <p>
                    Aaboron began in Kolkata out of a deep reverence for Bengal&apos;s earthen craftsmanship—the timeless art of terracotta, hand-kneaded river clay, and vintage oxidised metalwork. What started as an intimate experiment on a sunlit studio table soon evolved into a conscious jewellery studio dedicated to wearable art.
                  </p>
                  <p>
                    Every single piece in our collection is shaped and painted by hand. We roll, sculpt, cure, and brush each bead, pendant, and drop with artisan pigments and natural protective seals. There are no industrial assembly lines or mass-manufactured molds here—every subtle contour is a testament to the artisan&apos;s touch and individual patience.
                  </p>
                  <p>
                    When you wear a piece from Aaboron, we hope you feel an intimate connection to the earth and the quiet dignity of slow craftsmanship. These are ornaments made not merely to decorate, but to accompany your moments with warmth, poise, and quiet grace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
