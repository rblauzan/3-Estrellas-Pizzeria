import { Phone, MapPin, Clock, Pizza, Flame, Heart } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contacto" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Por qué elegir 3 Estrellas?</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-red-600 rounded-full p-2">
                  <Pizza className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Ingredientes Frescos</h3>
                  <p className="text-gray-600">Seleccionamos los mejores ingredientes locales cada día</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-red-600 rounded-full p-2">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Horno de Leña</h3>
                  <p className="text-gray-600">Cocinamos en horno tradicional de leña para el sabor auténtico</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-red-600 rounded-full p-2">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Recetas Familiares</h3>
                  <p className="text-gray-600">Recetas transmitidas por generaciones desde Italia</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contáctanos</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-600" />
                <span className="text-gray-700">Av. Principal 123, Centro, Ciudad</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="text-gray-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-600" />
                <div className="text-gray-700">
                  <p>Lun - Dom: 11:00 AM - 11:00 PM</p>
                  <p className="text-sm text-gray-500">Delivery hasta las 10:30 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md transition-colors flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                Llamar para Ordenar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
