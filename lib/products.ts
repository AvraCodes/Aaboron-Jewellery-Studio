export type Category =
  | 'clay-pendants'
  | 'clay-earrings'
  | 'handmade-jewellery'
  | 'oxidised-earrings'

export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: Category
  badge?: 'New' | 'Bestseller'
  /** Empty array = no variant picker shown */
  variants: string[]
  materials: string
  dimensions: string
  care: string
  leadTime: string
  isActive: boolean
}

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'clay-pendants', label: 'Clay Pendants' },
  { value: 'clay-earrings', label: 'Clay Earrings' },
  { value: 'handmade-jewellery', label: 'Handmade Jewellery' },
  { value: 'oxidised-earrings', label: 'Oxidised Earrings' },
]

export const products: Product[] = [
  {
    id: 'clay-pendant-01',
    name: '[PLACEHOLDER: Pendant Name]',
    tagline: '[PLACEHOLDER: short tagline]',
    description: '[PLACEHOLDER: product description]',
    price: 0,
    image: '/placeholder.jpg',
    category: 'clay-pendants',
    badge: 'New',
    variants: [],
    materials: '[PLACEHOLDER: materials]',
    dimensions: '[PLACEHOLDER: dimensions]',
    care: '[PLACEHOLDER: care instructions]',
    leadTime: '[PLACEHOLDER: dispatch note]',
    isActive: true,
  },
  {
    id: 'clay-earring-01',
    name: '[PLACEHOLDER: Earring Name]',
    tagline: '[PLACEHOLDER: short tagline]',
    description: '[PLACEHOLDER: product description]',
    price: 0,
    image: '/placeholder.jpg',
    category: 'clay-earrings',
    badge: 'Bestseller',
    variants: [],
    materials: '[PLACEHOLDER: materials]',
    dimensions: '[PLACEHOLDER: dimensions]',
    care: '[PLACEHOLDER: care instructions]',
    leadTime: '[PLACEHOLDER: dispatch note]',
    isActive: true,
  },
  {
    id: 'handmade-jewellery-01',
    name: '[PLACEHOLDER: Jewellery Name]',
    tagline: '[PLACEHOLDER: short tagline]',
    description: '[PLACEHOLDER: product description]',
    price: 0,
    image: '/placeholder.jpg',
    category: 'handmade-jewellery',
    variants: [],
    materials: '[PLACEHOLDER: materials]',
    dimensions: '[PLACEHOLDER: dimensions]',
    care: '[PLACEHOLDER: care instructions]',
    leadTime: '[PLACEHOLDER: dispatch note]',
    isActive: true,
  },
  {
    id: 'oxidised-earring-01',
    name: '[PLACEHOLDER: Earring Name]',
    tagline: '[PLACEHOLDER: short tagline]',
    description: '[PLACEHOLDER: product description]',
    price: 0,
    image: '/placeholder.jpg',
    category: 'oxidised-earrings',
    badge: 'New',
    variants: [],
    materials: '[PLACEHOLDER: materials]',
    dimensions: '[PLACEHOLDER: dimensions]',
    care: '[PLACEHOLDER: care instructions]',
    leadTime: '[PLACEHOLDER: dispatch note]',
    isActive: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id && p.isActive)
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category && p.isActive)
}
