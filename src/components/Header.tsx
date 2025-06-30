import { Pizza, ShoppingCart } from "lucide-react";
import type { CartItem } from "../types";

interface HeaderProps {
  cart: CartItem[];
  onCartOpen: () => void;
}

export function Header({ cart, onCartOpen }: HeaderProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pizza className="h-10 w-10" />
            <h1 className="text-xl font-bold">Pizzeria 3 Estrellas</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a
              href="#inicio"
              className="hover:text-orange-200 transition-colors"
            >
              Inicio
            </a>
            <a href="#menu" className="hover:text-orange-200 transition-colors">
              Menú
            </a>
            <a
              href="#contacto"
              className="hover:text-orange-200 transition-colors"
            >
              Contacto
            </a>
          </nav>
          <div className="flex items-center space-x-2">
            <button
              onClick={onCartOpen}
              className="relative border border-white text-white hover:bg-white hover:text-red-600 bg-transparent px-4 py-2 rounded-md transition-colors flex items-center"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Carrito
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
