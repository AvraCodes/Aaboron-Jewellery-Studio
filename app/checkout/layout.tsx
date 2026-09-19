import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Secure Checkout | Aaboron Handmade Jewellery Studio",
  description: "Complete your order securely with Razorpay. Safe payment options and pan-India insured shipping for your handcrafted Aaboron jewellery.",
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
