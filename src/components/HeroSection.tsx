
import { Flame, Heart, ShoppingCart, Star } from "lucide-react"

interface HeroSectionProps {
  onMenuOpen: () => void
  onCartOpen: () => void
}

export function HeroSection({ onMenuOpen, onCartOpen }: HeroSectionProps) {
  return (
    <section id="inicio" className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold leading-tight">
              Las Mejores Pizzas
              <span className="block text-orange-200">de la Ciudad</span>
            </h2>
            <p className="text-xl text-orange-100">
              En 3 Estrellas preparamos pizzas artesanales con ingredientes frescos y recetas tradicionales italianas
              desde 1985.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onMenuOpen}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center text-lg"
              >
                <Flame className="h-5 w-5 mr-2" />
                Ver Menú
              </button>
              <button
                onClick={onCartOpen}
                className="border border-white text-white hover:bg-white hover:text-red-600 bg-transparent px-6 py-3 rounded-md transition-colors flex items-center justify-center text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Ver Carrito
              </button>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-orange-100">4.8/5 - Más de 2,000 reseñas</span>
            </div>
          </div>
          <div className="relative">
          <img
              src="/placeholder.svg?height=400&width=500"
              alt="Pizza deliciosa"
              width={500}
              height={400}
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-red-600 rounded-full p-3 shadow-lg">
              <Heart className="h-6 w-6 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
