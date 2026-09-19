import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Custom Jewellery Commissions | Aaboron Studio",
  description: "Commission a bespoke handmade jewellery piece crafted to your personal vision, ensemble colors, and botanical motifs. Crafted in 7–10 working days.",
}

export default function CustomOrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
