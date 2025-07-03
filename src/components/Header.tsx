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
            <Pizza className="h-8 w-8" />
            <h1 className="text-2xl font-bold">3 Estrellas Pizzería</h1>
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { href: "#inicio", label: "Inicio" },
              { href: "#menu", label: "Menú" },
              { href: "#contacto", label: "Contacto" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative text-orange-100 hover:text-white transition-colors duration-200 font-medium group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-3">
            <button
              onClick={onCartOpen}
              className="relative border border-white border-opacity-30 text-white hover:bg-white hover:text-red-600 bg-transparent  rounded-xl transition-colors  px-4 py-2.5 duration-300 flex items-center group hover:scale-105"
            >
              <ShoppingCart className="h-6 w-6 mr-2" />
              Carrito
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-red-800 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
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
