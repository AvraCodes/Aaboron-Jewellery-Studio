"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image: string
  variant?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string, variant?: string) => void
  updateQuantity: (id: string, quantity: number, variant?: string) => void
  clearCart: () => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = "aaboron-cart"

function isSameItem(a: CartItem, b: Omit<CartItem, "quantity">): boolean {
  return a.id === b.id && a.variant === b.variant
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch {
      // storage unavailable or corrupt — start empty
    }
    setHydrated(true)
  }, [])

  // Persist to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable — silently ignore
    }
  }, [items, hydrated])

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems(currentItems => {
      const existing = currentItems.find(item => isSameItem(item, newItem))
      if (existing) {
        return currentItems.map(item =>
          isSameItem(item, newItem)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...currentItems, { ...newItem, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (id: string, variant?: string) => {
    setItems(currentItems =>
      currentItems.filter(item => !(item.id === id && item.variant === variant))
    )
  }

  const updateQuantity = (id: string, quantity: number, variant?: string) => {
    if (quantity < 1) {
      removeItem(id, variant)
      return
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id && item.variant === variant ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
