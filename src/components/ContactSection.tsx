import { Phone, Clock, Pizza, Flame, Heart } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contacto" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              ¿Por qué elegir 3 Estrellas?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-red-600 rounded-full p-2">
                  <Pizza className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Ingredientes Frescos
                  </h3>
                  <p className="text-gray-600">
                    Seleccionamos los mejores ingredientes locales cada día
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-red-600 rounded-full p-2">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Masa Fresca del día
                  </h3>
                  <p className="text-gray-600">
                    Masa crujiente y perfectamente horneada
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-red-600 rounded-full p-2">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Recetas Familiares de la abuela
                  </h3>
                  <p className="text-gray-600">
                    Recetas transmitidas por generaciones de pizzeros
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Contáctanos
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="text-gray-700">+53 52502962</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-600" />
                <div className="text-gray-700">
                  <p>Sábado - Jueves: 12:00 PM - 8:30 PM</p>
                  <p className="text-sm text-gray-500">
                    Delivery hasta las 8:30 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
