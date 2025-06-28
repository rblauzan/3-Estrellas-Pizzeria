"use client"
import { useState } from "react"
import type { CartItem, Pizza, Bebida, Postre } from "../types"
import { agregados } from "../data/menu"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (
    item: Pizza | Bebida | Postre,
    tipo: "pizza" | "bebida" | "postre",
    selectedAgregados: string[] = [],
  ) => {
    const id = `${item.nombre}-${Date.now()}`
    const newItem: CartItem = {
      id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: 1,
      agregados: selectedAgregados,
      tipo,
    }
    setCart((prev) => [...prev, newItem])
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, cantidad: newQuantity } : item)))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const agregadosPrice = item.agregados.reduce((sum, agregado) => {
        const agregadoItem = agregados.find((a) => a.nombre === agregado)
        return sum + (agregadoItem?.precio || 0)
      }, 0)
      return total + (item.precio + agregadosPrice) * item.cantidad
    }, 0)
  }

  const formatWhatsAppMessage = () => {
    if (cart.length === 0) return ""

    let message = "¡Hola! Quisiera hacer el siguiente pedido desde 3 Estrellas Pizzería:\n\n"

    cart.forEach((item) => {
      message += `• ${item.cantidad} ${item.nombre}`
      if (item.agregados.length > 0) {
        message += ` con agregado de ${item.agregados.join(", ")}`
      }
      message += `\n`
    })

    message += `\nTotal: $${getTotalPrice().toFixed(2)}\n\n¡Gracias!`
    return encodeURIComponent(message)
  }

  const sendToWhatsApp = () => {
    const message = formatWhatsAppMessage()
    const phoneNumber = "1234567890" // Reemplazar con el número real
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    sendToWhatsApp,
  }
}
