
import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import type { CartItem } from "../types"
import { agregados } from "../data/menu"

interface CartModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  cart: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onSendToWhatsApp: () => void
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
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const agregadosPrice = item.agregados.reduce((sum, agregado) => {
        const agregadoItem = agregados.find((a) => a.nombre === agregado)
        return sum + (agregadoItem?.precio || 0)
      }, 0)
      return total + (item.precio + agregadosPrice) * item.cantidad
    }, 0)
  }

  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                Tu Carrito
              </h2>
              <p className="text-gray-600 mt-1">
                {cart.length === 0 ? "Tu carrito está vacío" : `${totalItems} productos en tu carrito`}
              </p>
            </div>
            <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600 p-1">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">No hay productos en tu carrito</p>
                <button
                  onClick={() => {
                    onOpenChange(false)
                    onOpenMenu()
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
                >
                  Ver Menú
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.nombre}</h3>
                        {item.agregados.length > 0 && (
                          <p className="text-sm text-gray-600">Con: {item.agregados.join(", ")}</p>
                        )}
                        <p className="text-lg font-bold text-red-600">
                          $
                          {(
                            item.precio +
                            item.agregados.reduce((sum, agregado) => {
                              const agregadoItem = agregados.find((a) => a.nombre === agregado)
                              return sum + (agregadoItem?.precio || 0)
                            }, 0)
                          ).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.cantidad - 1)}
                          className="border border-gray-300 hover:bg-gray-100 p-1 rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.cantidad}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
                          className="border border-gray-300 hover:bg-gray-100 p-1 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Total: ${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <button
                    onClick={onSendToWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition-colors font-medium"
                  >
                    Ordenar por WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
