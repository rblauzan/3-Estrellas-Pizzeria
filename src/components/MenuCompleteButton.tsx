import { Menu, Utensils } from "lucide-react"

interface MenuCompleteButtonProps {
  onMenuOpen: () => void
}

export function MenuCompleteButton({ onMenuOpen }: MenuCompleteButtonProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Utensils className="h-8 w-8 text-white" />
              <h3 className="text-2xl font-bold text-white">¿Quieres ver más opciones?</h3>
              <Menu className="h-8 w-8 text-white" />
            </div>
            <p className="text-orange-100 mb-6 text-lg">
              Descubre nuestro menú completo con pizzas, dulces, bebidas y postres
            </p>
            <button
              onClick={onMenuOpen}
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <Menu className="h-5 w-5" />
              Ver Menú Completo
              <Utensils className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
