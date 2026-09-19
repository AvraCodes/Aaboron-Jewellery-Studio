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

export const metadata: Metadata = {
  title: 'Artisnal Gallery — Handmade Jewellery',
  description: 'Handcrafted clay pendants, clay earrings, and oxidised jewellery. Made with care, one piece at a time.',
  generator: 'v0.app',
  keywords: ['handmade jewellery', 'clay pendants', 'clay earrings', 'oxidised earrings', 'artisanal jewellery', 'handcrafted'],
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
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F4EF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${sugarMagic.variable} ${vielotta.variable} ${ypsilanti.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
