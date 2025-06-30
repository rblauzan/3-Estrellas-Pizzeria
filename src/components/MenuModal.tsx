import { useState } from "react";
import { Pizza, X } from "lucide-react";
import { PizzaOrderDialog } from "./PizzaOrderDialog";
import { todasLasPizzas, bebidas, postres } from "../data/menu";
import type { Pizza as PizzaType, Bebida, Postre } from "../types";

interface MenuModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPizza: (pizza: PizzaType, selectedAgregados: string[]) => void;
  onAddBebida: (bebida: Bebida) => void;
  onAddPostre: (postre: Postre) => void;
}

export function MenuModal({
  isOpen,
  onOpenChange,
  onAddPizza,
  onAddBebida,
  onAddPostre,
}: MenuModalProps) {
  const [activeTab, setActiveTab] = useState<"pizzas" | "bebidas" | "postres">(
    "pizzas"
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-red-600 flex items-center gap-2">
                <Pizza className="h-6 w-6" />
                Menú Completo - 3 Estrellas
              </h2>
              <p className="text-gray-600 mt-1">
                Descubre todas nuestras deliciosas opciones
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex">
              {[
                { key: "pizzas", label: "Pizzas" },
                { key: "bebidas", label: "Bebidas" },
                { key: "postres", label: "Postres" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                    activeTab === tab.key
                      ? "border-b-2 border-red-600 text-red-600 bg-red-50"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "pizzas" && (
              <div className="grid md:grid-cols-2 gap-4">
                {todasLasPizzas.map((pizza, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={pizza.imagen || "/placeholder.svg"}
                        alt={pizza.nombre}
                        width={80}
                        height={80}
                        className="rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {pizza.nombre}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {pizza.descripcion}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-red-600">
                            ${pizza.precio.toFixed(2)}
                          </span>
                          <PizzaOrderDialog
                            pizza={pizza}
                            onAdd={(selectedAgregados) =>
                              onAddPizza(pizza, selectedAgregados)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "bebidas" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bebidas.map((bebida, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {bebida.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {bebida.tamaño}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-600">
                        ${bebida.precio.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onAddBebida(bebida)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "postres" && (
              <div className="grid md:grid-cols-2 gap-4">
                {postres.map((postre, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {postre.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {postre.descripcion}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-600">
                        ${postre.precio.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onAddPostre(postre)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
