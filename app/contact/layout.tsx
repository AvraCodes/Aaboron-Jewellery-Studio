import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Aaboron Handmade Jewellery Studio",
  description: "Have a question about our handmade jewellery, custom sizing, materials, or order status? Get in touch with our Kolkata studio. We respond within 24 hours.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
