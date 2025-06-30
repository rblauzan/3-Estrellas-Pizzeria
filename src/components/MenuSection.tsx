import { PizzaOrderDialog } from "./PizzaOrderDialog";
import { pizzasDestacadas } from "../data/menu";
import type { Pizza } from "../types";

interface MenuSectionProps {
  onMenuOpen: () => void;
  onAddToCart: (pizza: Pizza, selectedAgregados: string[]) => void;
}

export function MenuSection({ onMenuOpen, onAddToCart }: MenuSectionProps) {
  return (
    <section id="menu" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nuestras Pizzas Favoritas
          </h2>
          <p className="text-xl text-gray-600">
            Preparadas con amor y los mejores ingredientes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pizzasDestacadas.map((pizza, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-4">
                <div className="text-center mb-4">
                  <img
                    src={pizza.imagen || "/placeholder.svg"}
                    alt={pizza.nombre}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {pizza.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {pizza.descripcion}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-red-600">
                    ${pizza.precio.toFixed(2)}
                  </span>
                  <PizzaOrderDialog
                    pizza={pizza}
                    onAdd={(selectedAgregados) =>
                      onAddToCart(pizza, selectedAgregados)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={onMenuOpen}
            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent px-6 py-3 rounded-md transition-colors text-lg"
          >
            Ver Menú Completo
          </button>
        </div>
      </div>
    </section>
  );
}
