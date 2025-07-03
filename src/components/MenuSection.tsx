"use client"

import { Pizza } from "lucide-react"
import { PizzaOrderDialog } from "./PizzaOrderDialog"
import { pizzasDestacadas } from "../data/menu"
import type { Pizzas  } from "../types"

interface MenuSectionProps {
  onMenuOpen: () => void
  onAddToCart: (pizza: Pizzas, selectedAgregados: string[]) => void
}

export function MenuSection({ onAddToCart }: MenuSectionProps) {
  return (
    <section id="menu" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Pizza className="h-8 w-8 text-red-600" />
            <h2 className="text-4xl font-bold text-gray-800">Nuestras Pizzas Favoritas</h2>
            <Pizza className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-xl text-gray-600">Preparadas con amor y los mejores ingredientes</p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pizzasDestacadas.map((pizza, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-red-100 hover:border-red-200 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className="relative mb-4">
                    <img
                      src={pizza.imagen || "/placeholder.svg"}
                      alt={pizza.nombre}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto border-4 border-red-200"
                    />
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2">
                      <Pizza className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{pizza.nombre}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed min-h-[3rem]">{pizza.descripcion}</p>
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-red-100">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-red-600">${pizza.precio.toFixed(2)}</span>
                    <p className="text-xs text-gray-500">por pizza</p>
                  </div>
                  <div className="flex items-end">
                    <PizzaOrderDialog
                      pizza={pizza}
                      onAdd={(selectedAgregados) => onAddToCart(pizza, selectedAgregados)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <div className="bg-white rounded-lg p-6 shadow-md border border-red-200 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">🍕 Pizzas Artesanales</h3>
            <p className="text-gray-600">
              Nuestras pizzas son preparadas con masa fresca diaria, ingredientes premium y horneadas en horno de leña
              tradicional para lograr el sabor auténtico italiano.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
