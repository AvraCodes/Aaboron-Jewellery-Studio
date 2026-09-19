import type { Metadata } from "next"
import { getProductById } from "@/lib/products"

interface Props {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return {
      title: "Handmade Jewellery Piece | Aaboron Studio",
      description: "Discover handcrafted clay pendants, terracotta sets, and oxidised earrings by Aaboron Jewellery Studio.",
    }
  }

  return {
    title: `${product.name} | Aaboron Jewellery Studio`,
    description: `${product.description} Handcrafted in Kolkata with natural materials and authentic artisanal care.`,
    openGraph: {
      title: `${product.name} — ₹${product.price}`,
      description: product.tagline || product.description,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  }
}

export default function ProductLayout({ children }: Props) {
  return children
}
