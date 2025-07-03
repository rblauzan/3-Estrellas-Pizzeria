import { Menu, Sparkles, Utensils } from "lucide-react";

interface MenuCompleteButtonProps {
  onMenuOpen: () => void;
}

export function MenuCompleteButton({ onMenuOpen }: MenuCompleteButtonProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Utensils className="h-8 w-8 text-white" />
                <h3 className="text-2xl font-bold text-white">
                  ¿Quieres ver más opciones?
                </h3>
                <Menu className="h-8 w-8 text-white" />
              </div>
              <p className="text-white mb-8 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                Descubre nuestro menú completo con pizzas y bebidas 
              </p>
              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
                <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                  <div className="bg-red-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <Utensils className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-red-700 mb-1">+8 Pizzas</h4>
                  <p className="text-red-600 text-sm">Sabores únicos</p>
                </div>
                <br></br>
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                  <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-xl">🥤</span>
                  </div>
                  <h4 className="font-bold text-blue-700 mb-1">6 Bebidas</h4>
                  <p className="text-blue-600 text-sm">Refrescantes</p>
                </div>
              </div>
              <button
                onClick={onMenuOpen}
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <Menu className="h-5 w-5" />
                Ver Menú Completo
                <Utensils className="h-5 w-5" />
              </button>
                {/* Shine effect */}
                <div className="absolute inset-0 -top-1 -left-1 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
              {/* Secondary info */}
              <p className="text-white text-sm mt-4 flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" />
                Personaliza tus pizzas con agregados premium
                <Sparkles className="h-4 w-4" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
