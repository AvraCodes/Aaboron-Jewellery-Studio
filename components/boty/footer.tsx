"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"

const footerLinks = {
  shop: [
    { name: "All Jewellery", href: "/shop" },
    { name: "Clay Pendants", href: "/shop?category=clay-pendants" },
    { name: "Clay Earrings", href: "/shop?category=clay-earrings" },
    { name: "Handmade Jewellery", href: "/shop?category=handmade-jewellery" },
    { name: "Oxidised Earrings", href: "/shop?category=oxidised-earrings" },
  ],
  help: [
    { name: "Care Guide", href: "/care" },
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "Custom Orders", href: "/custom-orders" },
    { name: "Contact", href: "/contact" },
  ],
  about: [
    { name: "About", href: "/about" },
  ]
}

export function Footer() {
  return (
    <footer className="bg-card pt-20 pb-10 relative overflow-hidden">
      {/* Giant Background Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <span className="font-display text-[100px] sm:text-[140px] md:text-[200px] lg:text-[260px] xl:text-[300px] font-bold text-white/20 whitespace-nowrap leading-none tracking-tight">
          Aaboron
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo/aaboron-logo.png"
                alt="Aaboron Jewellery Studio"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full object-cover shadow-sm ring-1 ring-border/50"
              />
              <h2 className="font-display text-3xl text-foreground">Aaboron</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Handmade jewellery shaped with intention. Rooted in Bengal&apos;s timeless craft traditions, each piece is made to order.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/aaboron_jewellery"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/40 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/40 boty-transition boty-shadow"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 group-hover:scale-110 group-hover:text-primary boty-transition" />
              </a>
              <a
                href="https://facebook.com/aaboron.jewellery"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/40 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/40 boty-transition boty-shadow"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 group-hover:scale-110 group-hover:text-primary boty-transition" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground boty-transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Aaboron Jewellery Studio. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/shipping" className="text-sm text-muted-foreground hover:text-foreground boty-transition">
                Shipping &amp; Returns
              </Link>
              <Link href="/care" className="text-sm text-muted-foreground hover:text-foreground boty-transition">
                Care Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
