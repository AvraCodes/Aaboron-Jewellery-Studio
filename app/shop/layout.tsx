import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Handcrafted Jewellery | Aaboron Studio",
  description: "Browse handmade clay jewellery, earthy terracotta sets, and antique oxidised earrings sculpted by Kolkata artisans. Pan-India shipping available.",
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
