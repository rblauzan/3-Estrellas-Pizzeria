"use client"

import { useState } from "react"
import { Pizza, X, Coffee, Utensils } from "lucide-react"
import { PizzaOrderDialog } from "./PizzaOrderDialog"
import { todasLasPizzas, bebidas } from "../data/menu"
import type { Pizza as PizzaType, Bebida, Postre } from "../types"

interface MenuModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddPizza: (pizza: PizzaType, selectedAgregados: string[]) => void
  onAddBebida: (bebida: Bebida) => void
  onAddPostre: (postre: Postre) => void
}

export function MenuModal({ isOpen, onOpenChange, onAddPizza, onAddBebida }: MenuModalProps) {
  const [activeTab, setActiveTab] = useState<"pizzas" | "bebidas" | "postres">("pizzas")

  if (!isOpen) return null

  const tabs = [
    { key: "pizzas", label: "Pizzas", icon: Pizza, color: "red" },
    { key: "bebidas", label: "Bebidas", icon: Coffee, color: "blue" }
  ]

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Utensils className="h-8 w-8" />
                  Menú Completo - 3 Estrellas
                </h2>
                <p className="text-orange-100 mt-2 text-lg">Descubre todas nuestras deliciosas opciones</p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="text-white hover:text-orange-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.key
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      isActive
                        ? `border-b-3 ${
                            tab.color === "red"
                              ? "border-red-500 text-red-600 bg-red-50"
                              : tab.color === "blue"
                                ? "border-blue-500 text-blue-600 bg-blue-50"
                                : "border-amber-500 text-amber-600 bg-amber-50"
                          }`
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {activeTab === "pizzas" && (
              <div className="grid md:grid-cols-2 gap-6">
                {todasLasPizzas.map((pizza, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-red-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={pizza.imagen || "/placeholder.svg"}
                          alt={pizza.nombre}
                          width={100}
                          height={100}
                          className="rounded-xl flex-shrink-0 border-2 border-red-200"
                        />
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5">
                          <Pizza className="h-3 w-3" />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-bold text-gray-800 mb-2 text-lg">{pizza.nombre}</h3>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-1">{pizza.descripcion}</p>
                        <div className="flex items-end justify-between">
                          <span className="text-2xl font-bold text-red-600">${pizza.precio.toFixed(2)}</span>
                          <PizzaOrderDialog
                            pizza={pizza}
                            onAdd={(selectedAgregados) => onAddPizza(pizza, selectedAgregados)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "bebidas" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bebidas.map((bebida, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-blue-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={`/placeholder.svg?height=80&width=80&text=${encodeURIComponent(bebida.nombre)}`}
                          alt={bebida.nombre}
                          width={80}
                          height={80}
                          className="rounded-xl flex-shrink-0 border-2 border-blue-200"
                        />
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1.5">
                          <Coffee className="h-3 w-3" />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-bold text-gray-800 mb-2 text-lg">{bebida.nombre}</h3>
                        <p className="text-sm text-gray-600 mb-4 flex-1">{bebida.tamaño}</p>
                        <div className="flex items-end justify-between">
                          <span className="text-2xl font-bold text-blue-600">${bebida.precio.toFixed(2)}</span>
                          <button
                            onClick={() => onAddBebida(bebida)}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            Agregar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
