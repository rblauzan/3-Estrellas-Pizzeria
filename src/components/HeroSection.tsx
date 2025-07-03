/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Menu, Heart, ShoppingCart, Star } from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";

interface HeroSectionProps {
  onMenuOpen: () => void;
  onCartOpen: () => void;
}

export function HeroSection({ onMenuOpen, onCartOpen }: HeroSectionProps) {
  // Array de imágenes para el carrusel
  const carouselImages = [
    "/carrousel/Carrousel-1.jpg?height=400&width=500&text=Pizza+Napolitana Clásica",
    "/carrousel/Carrousel-2.jpg?height=400&width=500&text=Pizza+Jamón Supreme",
    "/carrousel/Carrousel-3.jpg?height=400&width=500&text=Pizza+Cebolla Supreme",
    "/carrousel/Carrousel-4.jpg?height=400&width=500&text=Pizza+Hawaiana Supreme",
    "/carrousel/Carrousel-5.jpg?height=400&width=500&text=Pizza+Familiar Napolitana",
    "/carrousel/Carrousel-6.jpg?height=400&width=500&text=Pizza+Familiar Mixta",
  ];

  return (
    <section
      id="inicio"
      className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold leading-tight">
              Las Mejores Pizzas
              <span className="block text-orange-200">de la Ciudad</span>
            </h2>
            <p className="text-xl text-orange-100">
              En 3 Estrellas preparamos pizzas artesanales con ingredientes
              frescos y recetas tradicionales inspiradas en la cocina de la
              abuela cubana a tu hogar. Nos encargamos de romper la rutina y
              conectar corazones para unir a la familia desde la distancia. 
              Ademas podrás encontrar dulces exquisitos y bebidas refrescantes.
            </p>
            <p className="text-4xl text-orange-100">
              <strong>
                Sorprende a tu familia en Cuba con nuestros sabores!
              </strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={onMenuOpen}
                className="group relative bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Menu className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                <span className="relative z-10">Ver Menú</span>
              </button>
              <button
                onClick={onCartOpen}
                className="group relative border-2 border-white text-white hover:bg-white hover:text-red-600 bg-transparent px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                <span className="relative z-10">Ver Carrito</span>
              </button>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-orange-100">
                4.8/5 - Más de 2,000 reseñas
              </span>
            </div>
          </div>

          {/* Carrusel de imágenes */}
          <div className="relative h-96 lg:h-[400px]">
            <ImageCarousel
              images={carouselImages}
              autoPlay={true}
              autoPlayInterval={3000}
            />
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-red-600 rounded-full p-3 shadow-lg z-10">
              <Heart className="h-6 w-6 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
