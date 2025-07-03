/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useState } from "react"
import { Pizza, X, Coffee, Utensils,AlertCircle, Clock } from "lucide-react"
import { PizzaOrderDialog } from "./PizzaOrderDialog"
import { BebidaOrderDialog } from "./BebidaOrderDialog"
import { todasLasPizzas, bebidas } from "../data/menu"
import type { Pizzas as PizzaType, Bebida } from "../types"

interface MenuModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddPizza: (pizza: PizzaType, selectedAgregados: string[]) => void
  onAddBebida: (bebida: Bebida) => void
}

export function MenuModal({ isOpen, onOpenChange, onAddPizza, onAddBebida }: MenuModalProps) {
  const [activeTab, setActiveTab] = useState<"pizzas" | "bebidas">("pizzas")

  if (!isOpen) return null

  const tabs = [
    { key: "pizzas", label: "Pizzas", icon: Pizza, color: "red" },
    { key: "bebidas", label: "Bebidas", icon: Coffee, color: "blue" },
  ]
    // Separar pizzas normales y familiares
    const pizzasNormales = todasLasPizzas.filter((pizza) => !pizza.esFamiliar)
    const pizzasFamiliares = todasLasPizzas.filter((pizza) => pizza.esFamiliar)
  
 // Función dummy para pizzas familiares (no se usa porque se maneja en PizzaOrderDialog)
 const handleFamiliarPizza = () => {
  // Esta función no se ejecuta porque PizzaOrderDialog maneja las pizzas familiares internamente
}
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 sm:gap-3">
                  <Utensils className="h-6 w-6 sm:h-8 sm:w-8" />
                  <span className="hidden sm:inline">Menú Completo - 3 Estrellas</span>
                  <span className="sm:hidden">Menú 3 Estrellas</span>
                </h2>
                <p className="text-orange-100 mt-1 sm:mt-2 text-sm sm:text-lg hidden sm:block">
                  Descubre todas nuestras deliciosas opciones
                </p>
              </div>
              <button
                onClick={() => { onOpenChange(false); }}
                className="text-white hover:text-orange-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all flex-shrink-0"
              >
                <X className="h-6 w-6 sm:h-7 sm:w-7" />
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
                    onClick={() => { setActiveTab(tab.key as any); }}
                    className={`flex-1 py-3 sm:py-4 px-2 sm:px-6 text-center font-semibold transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base ${
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
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

           {/* Content */}
           <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-gray-50">
            {activeTab === "pizzas" && (
              <div className="space-y-8">
                {/* Pizzas Normales */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Pizza className="h-6 w-6 text-red-600" />
                    Pizzas Individuales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {pizzasNormales.map((pizza, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-red-100"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src={pizza.imagen || "/placeholder.svg"}
                              alt={pizza.nombre}
                              width={80}
                              height={80}
                              className="rounded-xl border-2 border-red-200 w-16 h-16 sm:w-20 sm:h-20 object-cover"
                            />
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1">
                              <Pizza className="h-2 w-2 sm:h-3 sm:w-3" />
                            </div>
                          </div>
                          <div className="flex-1 flex flex-col min-w-0">
                            <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-lg truncate">
                              {pizza.nombre}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed flex-1 line-clamp-2">
                              {pizza.descripcion}
                            </p>
                            <div className="flex items-end justify-between">
                              <span className="text-lg sm:text-2xl font-bold text-red-600">
                                ${pizza.precio.toFixed(2)}
                              </span>
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
                </div>

                {/* Pizzas Familiares */}
                {pizzasFamiliares.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Pizza className="h-6 w-6 text-orange-600" />
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Pizzas Familiares</h3>
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>

                    {/* Aviso especial para pizzas familiares */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-4 mb-6 rounded-r-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            ¡Pedido con Anticipación!
                          </h4>
                          <p className="text-orange-700 text-sm leading-relaxed">
                            <strong>Las pizzas familiares requieren pedido con 1 día de anticipación.</strong>
                            <br />
                            Son pizzas extra grandes preparadas especialmente para compartir en familia.
                            <br />📞 Al hacer clic en "Solicitar" se abrirá WhatsApp para coordinar tu pedido.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {pizzasFamiliares.map((pizza, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-orange-200 relative overflow-hidden"
                        >
                          {/* Badge de pizza familiar */}
                          <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-3 py-1 rounded-bl-lg text-xs font-bold">
                            FAMILIAR
                          </div>

                          <div className="flex items-start gap-3 sm:gap-4 mt-2">
                            <div className="relative flex-shrink-0">
                              <img
                                src={pizza.imagen || "/placeholder.svg"}
                                alt={pizza.nombre}
                                width={80}
                                height={80}
                                className="rounded-xl border-2 border-orange-200 w-16 h-16 sm:w-20 sm:h-20 object-cover"
                              />
                              <div className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full p-1">
                                <Pizza className="h-2 w-2 sm:h-3 sm:w-3" />
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col min-w-0">
                              <h4 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-lg truncate">
                                {pizza.nombre}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2 leading-relaxed flex-1 line-clamp-2">
                                {pizza.descripcion}
                              </p>

                              {/* Información adicional */}
                              <div className="bg-orange-50 rounded-lg p-2 mb-3 border border-orange-200">
                                <div className="flex items-center gap-2 text-xs text-orange-700">
                                  <Clock className="h-3 w-3" />
                                  <span className="font-medium">Pedido con 1 día de anticipación</span>
                                </div>
                                <div className="text-xs text-orange-600 mt-1">
                                  📏 Tamaño: 45cm • 👨‍👩‍👧‍👦 Para 4-6 personas
                                </div>
                              </div>

                              <div className="flex items-end justify-between">
                                <span className="text-lg sm:text-2xl font-bold text-orange-600">
                                  ${pizza.precio.toFixed(2)}
                                </span>
                                <PizzaOrderDialog pizza={pizza} onAdd={handleFamiliarPizza} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "bebidas" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {bebidas.map((bebida, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-blue-100"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={`/placeholder.svg?height=80&width=80&text=${encodeURIComponent(bebida.nombre)}`}
                          alt={bebida.nombre}
                          width={80}
                          height={80}
                          className="rounded-xl border-2 border-blue-200 w-16 h-16 sm:w-20 sm:h-20 object-cover"
                        />
                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                          <Coffee className="h-2 w-2 sm:h-3 sm:w-3" />
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col min-w-0">
                        <h3 className="font-bold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-lg truncate">
                          {bebida.nombre}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 flex-1">{bebida.tamaño}</p>
                        <div className="flex items-end justify-between">
                          <span className="text-lg sm:text-2xl font-bold text-blue-600">
                            ${bebida.precio.toFixed(2)}
                          </span>
                          <BebidaOrderDialog bebida={bebida} onAdd={() => { onAddBebida(bebida); }} />
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
