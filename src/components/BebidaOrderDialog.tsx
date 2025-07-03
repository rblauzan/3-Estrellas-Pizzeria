"use client"
import { useState } from "react"
import { X, Coffee } from "lucide-react"
import type { Bebida } from "../types"

interface BebidaOrderDialogProps {
  bebida: Bebida
  onAdd: () => void
}

export function BebidaOrderDialog({ bebida, onAdd }: BebidaOrderDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleAdd = () => {
    onAdd()
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => { setIsOpen(true); }}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
      >
        Agregar
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Coffee className="h-6 w-6" />
                  {bebida.nombre}
                </h2>
                <p className="text-blue-100 mt-1 text-sm">{bebida.tamaño}</p>
              </div>
              <button
                onClick={() => { setIsOpen(false); }}
                className="text-white hover:text-blue-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 bg-gray-50">
            <div className="text-center mb-6">
              <div className="bg-blue-100 rounded-full p-8 mx-auto w-32 h-32 flex items-center justify-center mb-4">
                <Coffee className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¡Bebida refrescante!</h3>
              <p className="text-gray-600">
                Perfecta para acompañar tu pizza. Bebidas seleccionadas de la mejor calidad.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-blue-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-blue-600">${bebida.precio.toFixed(2)}</span>
                <span className="text-sm text-gray-500">{bebida.tamaño}</span>
              </div>
              <button
                onClick={handleAdd}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
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
