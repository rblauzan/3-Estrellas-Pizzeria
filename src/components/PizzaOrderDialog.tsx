
import { useState } from "react"
import { X } from "lucide-react"
import type { Pizza } from "../types"
import { agregados } from "../data/menu"

interface PizzaOrderDialogProps {
  pizza: Pizza
  onAdd: (selectedAgregados: string[]) => void
}

export function PizzaOrderDialog({ pizza, onAdd }: PizzaOrderDialogProps) {
  const [selectedAgregados, setSelectedAgregados] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleAgregadoChange = (agregado: string, checked: boolean) => {
    if (checked) {
      setSelectedAgregados((prev) => [...prev, agregado])
    } else {
      setSelectedAgregados((prev) => prev.filter((a) => a !== agregado))
    }
  }

  const handleAdd = () => {
    onAdd(selectedAgregados)
    setSelectedAgregados([])
    setIsOpen(false)
  }

  const getTotalPrice = () => {
    const agregadosPrice = selectedAgregados.reduce((sum, agregado) => {
      const agregadoItem = agregados.find((a) => a.nombre === agregado)
      return sum + (agregadoItem?.precio || 0)
    }, 0)
    return pizza.precio + agregadosPrice
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
      >
        Agregar
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{pizza.nombre}</h2>
              <p className="text-gray-600 text-sm mt-1">{pizza.descripcion}</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <h4 className="font-semibold text-gray-900">Agregados disponibles:</h4>
            <div className="grid grid-cols-1 gap-3">
              {agregados.map((agregado) => (
                <label key={agregado.nombre} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAgregados.includes(agregado.nombre)}
                    onChange={(e) => handleAgregadoChange(agregado.nombre, e.target.checked)}
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">
                    {agregado.nombre} (+${agregado.precio.toFixed(2)})
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <span className="font-semibold text-lg">Total: ${getTotalPrice().toFixed(2)}</span>
              <button
                onClick={handleAdd}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
