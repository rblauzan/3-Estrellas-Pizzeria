/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
"use client"

import { ShoppingCart, Plus, Minus, X, Trash2, PhoneIcon as WhatsApp, UtensilsCrossed } from "lucide-react"
import type { CartItem } from "../types"
import { agregados } from "../data/menu"
import { DeliveryInfoModal, type DeliveryInfo } from "./DeliveryInfoModal"
import { useState } from "react"

interface CartModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  cart: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onSendToWhatsApp: (deliveryInfo: DeliveryInfo) => void
  onOpenMenu: () => void
}

export function CartModal({
  isOpen,
  onOpenChange,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onSendToWhatsApp,
  onOpenMenu,
}: CartModalProps) {
  
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false)
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const agregadosPrice = item.agregados.reduce((sum, agregado) => {
        const agregadoItem = agregados.find((a) => a.nombre === agregado)
        return sum + (agregadoItem?.precio ?? 0)
      }, 0)
      return total + (item.precio + agregadosPrice) * item.cantidad
    }, 0)
  }

  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0)

  const handleSendToWhatsApp = () => {
    if (cart.length === 0) return
    setShowDeliveryInfo(true)
  }

  const handleDeliveryInfoConfirm = (deliveryInfo: DeliveryInfo) => {
    onSendToWhatsApp(deliveryInfo)
    setShowDeliveryInfo(false)
    onOpenChange(false) // Cerrar el modal del carrito
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <ShoppingCart className="h-8 w-8" />
                  Tu Carrito
                </h2>
                <p className="text-orange-100 mt-2 text-lg">
                  {cart.length === 0 ? "Tu carrito está vacío" : `${totalItems} productos seleccionados`}
                </p>
              </div>
              <button
                onClick={() => { onOpenChange(false); }}
                className="text-white hover:text-orange-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6">
                <div className="bg-gray-100 rounded-full p-8 mb-6">
                  <UtensilsCrossed className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Tu carrito está vacío</h3>
                <p className="text-gray-600 mb-8 text-center max-w-md">
                  ¡Explora nuestro delicioso menú y agrega tus pizzas y postres favoritos!
                </p>
                <button
                  onClick={() => {
                    onOpenChange(false)
                    onOpenMenu()
                  }}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Explorar Menú
                </button>
              </div>
            ) : (
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-start gap-4">
                        {/* Imagen del producto */}
                        <div className="relative">
                          <div
                            className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                              item.tipo === "pizza"
                                ? "bg-red-50 border-2 border-red-200"
                                : item.tipo === "bebida"
                                  ? "bg-blue-50 border-2 border-blue-200"
                                  : "bg-amber-50 border-2 border-amber-200"
                            }`}
                          >
                            {item.tipo === "pizza" && <span className="text-2xl">🍕</span>}
                            {item.tipo === "bebida" && <span className="text-2xl">🥤</span>}
                          </div>
                        </div>

                        {/* Contenido del producto */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-gray-800 text-lg">{item.nombre}</h3>
                            <button
                              onClick={() => { onRemoveItem(item.id); }}
                              className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-all"
                              title="Eliminar producto"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {item.agregados.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Agregados:</span> {item.agregados.join(", ")}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            {/* Precio unitario */}
                            <div className="text-left">
                              <p className="text-2xl font-bold text-gray-800">
                                $
                                {(
                                  item.precio +
                                  item.agregados.reduce((sum, agregado) => {
                                    const agregadoItem = agregados.find((a) => a.nombre === agregado)
                                    return sum + (agregadoItem?.precio ?? 0)
                                  }, 0)
                                ).toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">precio unitario</p>
                            </div>

                            {/* Controles de cantidad */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => { onUpdateQuantity(item.id, item.cantidad - 1); }}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-xl font-bold text-gray-800 min-w-[2rem] text-center">
                                {item.cantidad}
                              </span>
                              <button
                                onClick={() => { onUpdateQuantity(item.id, item.cantidad + 1); }}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumen y botón de pedido */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Total del Pedido</h3>
                      <p className="text-gray-600">{totalItems} productos</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold text-green-600">${getTotalPrice().toFixed(2)}</p>
                      <p className="text-sm text-gray-500">incluye agregados</p>
                    </div>
                  </div>

                  <button
                    onClick={handleSendToWhatsApp}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-4 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <WhatsApp className="h-6 w-6" />
                    Ordenar por WhatsApp
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Al hacer clic, se abrirá WhatsApp con tu pedido y el carrito se vaciará automáticamente
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal de información de entrega */}
      <DeliveryInfoModal
        isOpen={showDeliveryInfo}
        onClose={() => { setShowDeliveryInfo(false); }}
        onConfirm={handleDeliveryInfoConfirm}
        isFamiliar={false}
      />
    </>
  )
}
