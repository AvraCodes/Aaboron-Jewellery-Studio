import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/boty/cart-context'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600']
});

const sugarMagic = localFont({
  src: './fonts/SugarMagicSerif-Medium.otf',
  variable: '--font-display',
  display: 'swap',
});

const vielotta = localFont({
  src: './fonts/Vielotta-Regular.otf',
  variable: '--font-serif',
  display: 'swap',
});

const ypsilanti = localFont({
  src: './fonts/Ypsilanti-Signature.otf',
  variable: '--font-script',
  display: 'swap',
});

const lipiPalash = localFont({
  src: './fonts/LipiPalash-Unicode.ttf',
  variable: '--font-bengali',
  display: 'swap',
});

const adrianaGabrielle = localFont({
  src: [
    {
      path: './fonts/AdrianaGabrielle-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/AdrianaGabrielle-Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-accent',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aaboron — Handmade Jewellery Studio',
  description: 'Aaboron (আবরণ) — Handmade artisanal jewellery shaped with intention. Rooted in Bengali craft, offering clay jewellery sets, handmade pendants, and oxidised earrings.',
  generator: 'v0.app',
  keywords: ['Aaboron', 'Aaboron Jewellery Studio', 'handmade jewellery', 'clay pendants', 'clay earrings', 'oxidised earrings', 'artisanal jewellery', 'handcrafted', 'Bengali jewellery'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/images/logo/aaboron-logo.png',
      },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F7F4EF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${sugarMagic.variable} ${vielotta.variable} ${ypsilanti.variable} ${lipiPalash.variable} ${adrianaGabrielle.variable} font-sans antialiased relative min-h-screen`}>
        {/* Full-Page Handcrafted Jewellery Background Video */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/videos/terracotta-poster.webp"
            className="w-full h-full object-cover opacity-[0.20] saturate-[1.15] filter"
          >
            <source src="/videos/terracotta-jewellery.webm" type="video/webm" />
            <source src="/videos/terracotta-jewellery.mp4" type="video/mp4" />
          </video>
          {/* Subtle warm earthy wash so text remains perfectly crisp and readable */}
          <div className="absolute inset-0 bg-background/60" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <CartProvider>
            {children}
          </CartProvider>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
