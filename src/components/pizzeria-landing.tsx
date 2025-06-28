"use client"
import { useState } from "react"
import { Header } from "../components/Header"
import { HeroSection } from "../components/HeroSection"
import { MenuSection } from "../components/MenuSection"
import { ContactSection } from "../components/ContactSection"
import { Footer } from "../components/Footer"
import { MenuModal } from "../components/MenuModal"
import { CartModal } from "../components/CartModal"
import { useCart } from "../hooks/useCart"
import type { Pizza, Bebida, Postre } from "../types"

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { cart, addToCart, removeFromCart, updateQuantity, sendToWhatsApp } = useCart()

  const handleAddPizza = (pizza: Pizza, selectedAgregados: string[]) => {
    addToCart(pizza, "pizza", selectedAgregados)
  }

  const handleAddBebida = (bebida: Bebida) => {
    addToCart(bebida, "bebida")
  }

  const handleAddPostre = (postre: Postre) => {
    addToCart(postre, "postre")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <Header cart={cart} onCartOpen={() => setIsCartOpen(true)} />

      <HeroSection onMenuOpen={() => setIsMenuOpen(true)} onCartOpen={() => setIsCartOpen(true)} />

      <MenuSection onMenuOpen={() => setIsMenuOpen(true)} onAddToCart={handleAddPizza} />

      <ContactSection />

      <Footer />

      <MenuModal
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        onAddPizza={handleAddPizza}
        onAddBebida={handleAddBebida}
        onAddPostre={handleAddPostre}
      />

      <CartModal
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onSendToWhatsApp={sendToWhatsApp}
        onOpenMenu={() => setIsMenuOpen(true)}
      />
    </div>
  )
}
