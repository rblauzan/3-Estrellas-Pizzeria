import { Pizza } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Pizza className="h-6 w-6" />
              <h3 className="text-xl font-bold">3 Estrellas Pizzería</h3>
            </div>
            <p className="text-gray-300">
              Sirviendo las mejores pizzas artesanales. Tres estrellas de
              calidad en cada bocado.
            </p>
          </div>
          <div>
            <div className="space-y-2"></div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <p className="text-gray-300 mb-4">
              Mantente al día con nuestras ofertas especiales
            </p>
            <div className="flex space-x-4">
              <button className="border border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent px-3 py-1 rounded text-sm transition-colors">
                Facebook
              </button>
              <button className="border border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent px-3 py-1 rounded text-sm transition-colors">
                Instagram
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} 3 Estrellas Pizzería. Todos los
            derechos reservados.
          </p>
          <span className="text-gray-400"> By © Edmundo Technology</span>
        </div>
      </div>
    </footer>
  );
}
