/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
 
 
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use client"
import { useState, useEffect } from "react"
import type { CartItem, Pizzas, Bebida } from "../types"
import { agregados } from "../data/menu"
interface DeliveryInfo {
  nombre: string
  telefono: string
  direccion: string
  fecha: string
  hora: string
  notas?: string
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("pizzeria-cart")
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("pizzeria-cart", JSON.stringify(cart))
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }
    }
  }, [cart, isLoaded])

  const addToCart = (
    item: Pizzas | Bebida ,
    tipo: "pizza" | "bebida",
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

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const agregadosPrice = item.agregados.reduce((sum, agregado) => {
        const agregadoItem = agregados.find((a) => a.nombre === agregado)
        return sum + (agregadoItem?.precio ?? 0)
      }, 0)
      return total + (item.precio + agregadosPrice) * item.cantidad
    }, 0)
  }

  const formatWhatsAppMessage = (deliveryInfo: DeliveryInfo) => {
    if (cart.length === 0) return ""

    let message = "🍕 *PEDIDO - 3 ESTRELLAS PIZZERÍA* 🍕\n\n"
    message += "📋 *DETALLE DEL PEDIDO:*\n"
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"

    // Agrupar por tipo
    const pizzas = cart.filter((item) => item.tipo === "pizza")
    const bebidas = cart.filter((item) => item.tipo === "bebida")

    // Pizzas
    if (pizzas.length > 0) {
      message += "🍕 *PIZZAS:*\n"
      pizzas.forEach((item) => {
        const agregadosPrice = item.agregados.reduce((sum, agregado) => {
          const agregadoItem = agregados.find((a) => a.nombre === agregado)
          return sum + (agregadoItem?.precio ?? 0)
        }, 0)
        const itemTotal = (item.precio + agregadosPrice) * item.cantidad

         
        message += `• ${item.cantidad}x ${item.nombre}\n`
        message += `  💰 $${item.precio.toFixed(2)} c/u`

        if (item.agregados.length > 0) {
          message += `\n  🧀 Agregados: ${item.agregados.join(", ")}`
          message += `\n  💰 +$${agregadosPrice.toFixed(2)} agregados`
        }
        message += `\n  💵 *Subtotal: $${itemTotal.toFixed(2)}*\n\n`
      })
    }

    // Bebidas
    if (bebidas.length > 0) {
      message += "🥤 *BEBIDAS:*\n"
      bebidas.forEach((item) => {
        const itemTotal = item.precio * item.cantidad
        // Buscar la medida de la bebida en los datos
        const bebidaData = bebidas.find((b: any) => b.nombre === item.nombre)
        const medida = bebidaData?.tamaño ?? ""

        message += `• ${item.cantidad}x ${item.nombre}`
        if (medida) {
          message += ` (${medida})`
        }
        message += `\n  💰 $${item.precio.toFixed(2)} c/u`
        message += `\n  💵 *Subtotal: $${itemTotal.toFixed(2)}*\n\n`
      })
    }
    message += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"
    message += `💰 *TOTAL GENERAL: $${getTotalPrice().toFixed(2)}*\n\n`
    // Información del cliente y entrega
    message += "👤 *INFORMACIÓN DEL CLIENTE:*\n"
    message += `• Nombre: ${deliveryInfo.nombre}\n`
    message += `• Teléfono: ${deliveryInfo.telefono}\n\n`
    message += "📍 *INFORMACIÓN DE ENTREGA:*\n"
    message += `• Dirección: ${deliveryInfo.direccion}\n`
    message += `• Fecha: ${deliveryInfo.fecha}\n`
    message += `• Hora: ${deliveryInfo.hora}\n`

    if (deliveryInfo.notas) {
      message += `• Notas: ${deliveryInfo.notas}\n`
    }

    message += `\n✅ *PEDIDO COMPLETO CON TODA LA INFORMACIÓN*\n\n`
    message += "¡Gracias por elegir 3 Estrellas Pizzería! 🌟🌟🌟"

    return encodeURIComponent(message)
  }
    const sendToWhatsApp = (deliveryInfo: DeliveryInfo) => {
    const message = formatWhatsAppMessage(deliveryInfo)
    const phoneNumber = "1234567890" // Reemplazar con el número real
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")

    // Vaciar el carrito después de enviar el pedido
    clearCart()
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    sendToWhatsApp,
    isLoaded,
  }
}
