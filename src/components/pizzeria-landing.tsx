"use client";
import { useState } from "react";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { MenuSection } from "../components/MenuSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { MenuModal } from "../components/MenuModal";
import { CartModal } from "../components/CartModal";
import { useCart } from "../hooks/useCart";
import type { Pizzas, Bebida } from "../types";
import { MenuCompleteButton } from "./MenuCompleteButton";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity, sendToWhatsApp, isLoaded } = useCart()

  const handleAddPizza = (pizza: Pizzas, selectedAgregados: string[]) => {
    addToCart(pizza, "pizza", selectedAgregados);
  };

  const handleAddBebida = (bebida: Bebida) => {
    addToCart(bebida, "bebida");
  };

  // Mostrar loading mientras se carga el carrito
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <Header cart={cart} onCartOpen={() => { setIsCartOpen(true); }} />

      <HeroSection
        onMenuOpen={() => { setIsMenuOpen(true); }}
        onCartOpen={() => { setIsCartOpen(true); }}
      />

      <MenuSection
        onMenuOpen={() => { setIsMenuOpen(true); }}
        onAddToCart={handleAddPizza}
      />
      
      <MenuCompleteButton onMenuOpen={() => { setIsMenuOpen(true); }} />

      <ContactSection />

      <Footer />

      <MenuModal
        isOpen={isMenuOpen}
        onOpenChange={setIsMenuOpen}
        onAddPizza={handleAddPizza}
        onAddBebida={handleAddBebida}
      />

      <CartModal
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onSendToWhatsApp={sendToWhatsApp}
        onOpenMenu={() => { setIsMenuOpen(true); }}
      />
    </div>
  );
}
