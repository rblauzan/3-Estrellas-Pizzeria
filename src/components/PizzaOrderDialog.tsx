"use client";
import { useState } from "react";
import {
  X,
  Pizza,
  Clock,
  AlertCircle
} from "lucide-react";
import type { Pizzas as PizzaType } from "../types";
import { agregados } from "../data/menu";
import {DeliveryInfoModal} from "./DeliveryInfoModal";

interface PizzaOrderDialogProps {
  pizza: PizzaType;
  onAdd: (selectedAgregados: string[]) => void;
}
interface DeliveryInfo {
  nombre: string;
  telefono: string;
  direccion: string;
  fecha: string;
  hora: string;
  notas?: string;
}

export function PizzaOrderDialog({ pizza, onAdd }: PizzaOrderDialogProps) {
  const [selectedAgregados, setSelectedAgregados] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);

  const handleAgregadoChange = (agregado: string, checked: boolean) => {
    if (checked) {
      setSelectedAgregados((prev) => [...prev, agregado]);
    } else {
      setSelectedAgregados((prev) => prev.filter((a) => a !== agregado));
    }
  };

  const handleAdd = () => {
    if (pizza.esFamiliar) {
      // Para pizzas familiares, mostrar formulario de entrega
      setShowDeliveryInfo(true)
    } else {
      // Para pizzas normales, agregar al carrito
      onAdd(selectedAgregados)
      setSelectedAgregados([])
      setIsOpen(false)
    }
  }

  const handleDeliveryInfoConfirm = (deliveryInfo: DeliveryInfo) => {
    // Enviar pizza familiar por WhatsApp con información completa
    handleFamiliarPizzaOrder(deliveryInfo)
    setShowDeliveryInfo(false)
    setSelectedAgregados([])
    setIsOpen(false)
  }

  const handleFamiliarPizzaOrder = (deliveryInfo: DeliveryInfo) => {
    const agregadosPrice = selectedAgregados.reduce((sum, agregado) => {
      const agregadoItem = agregados.find((a) => a.nombre === agregado);
      return sum + (agregadoItem?.precio ?? 0);
    }, 0);
    const totalPrice = pizza.precio + agregadosPrice;

    let message = "🍕 *PEDIDO PIZZA FAMILIAR - 3 ESTRELLAS PIZZERÍA* 🍕\n\n";
    message += "👤 *INFORMACIÓN DEL CLIENTE:*\n"
    message += `• Nombre: ${deliveryInfo.nombre}\n`
    message += "📍 *INFORMACIÓN DE ENTREGA:*\n"
    message += `• Dirección: ${deliveryInfo.direccion}\n`
    message += `• Fecha: ${deliveryInfo.fecha}\n`
    message += `• Hora: ${deliveryInfo.hora}\n`

    if (deliveryInfo.notas) {
      message += `• Notas: ${deliveryInfo.notas}\n`
    }

    message += `\n⏰ *IMPORTANTE:*\n`
    message += "• Pizza familiar con 1 día de anticipación ✅\n"
    message += "• Todos los datos proporcionados ✅\n\n"

    if (selectedAgregados.length > 0) {
      message += `\n🧀 *Agregados solicitados:*\n`;
      selectedAgregados.forEach((agregado) => {
        const agregadoItem = agregados.find((a) => a.nombre === agregado);
        if (agregadoItem) {
          message += `• ${agregado} (+$${agregadoItem.precio.toFixed(2)})\n`;
        }
      });
      message += `💰 Costo agregados: $${agregadosPrice.toFixed(2)}\n`;
    }

    message += `\n💵 *TOTAL: $${totalPrice.toFixed(2)}*\n\n`;
   
    message += "¡Gracias por elegir 3 Estrellas Pizzería! 🌟🌟🌟";

    const phoneNumber = "52502962";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const getTotalPrice = () => {
    const agregadosPrice = selectedAgregados.reduce((sum, agregado) => {
      const agregadoItem = agregados.find((a) => a.nombre === agregado);
      return sum + (agregadoItem?.precio ?? 0);
    }, 0);
    return pizza.precio + agregadosPrice;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className={`transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 px-4 py-2 rounded-lg ${
          pizza.esFamiliar
            ? "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
            : "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
        }`}
      >
        {pizza.esFamiliar ? "Solicitar" : "Agregar"}
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div
            className={`text-white p-4 sm:p-6 ${
              pizza.esFamiliar
                ? "bg-gradient-to-r from-orange-600 to-yellow-600"
                : "bg-gradient-to-r from-red-600 to-orange-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
                  <Pizza className="h-5 w-5 sm:h-6 sm:w-6" />
                  {pizza.nombre}
                  {pizza.esFamiliar && (
                    <Clock className="h-5 w-5 text-yellow-200" />
                  )}
                </h2>
                <p
                  className={`mt-1 text-xs sm:text-sm ${
                    pizza.esFamiliar ? "text-orange-100" : "text-orange-100"
                  }`}
                >
                  {pizza.descripcion}
                </p>
                {pizza.esFamiliar && (
                  <div className="mt-2 text-xs text-yellow-200 font-medium">
                    📏 45cm • 👨‍👩‍👧‍👦 Para 6-8 personas
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className={`p-2 rounded-full transition-all ${
                  pizza.esFamiliar
                    ? "text-white hover:text-orange-200 hover:bg-white hover:bg-opacity-20"
                    : "text-white hover:text-orange-200 hover:bg-white hover:bg-opacity-20"
                }`}
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 bg-gray-50">
            {/* Aviso especial para pizzas familiares */}
            {pizza.esFamiliar && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-4 mb-6 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-orange-800 mb-1 flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      Pedido con Anticipación
                    </h4>
                    <p className="text-orange-700 text-xs leading-relaxed">
                    Esta pizza requiere <strong>1 día de anticipación</strong>. Después de seleccionar agregados,
                    completarás la información de entrega.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-4 text-lg">
                Agregados disponibles:
              </h4>
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
                {agregados.map((agregado) => (
                  <label
                    key={agregado.nombre}
                    className={`flex items-center space-x-3 cursor-pointer bg-white p-3 rounded-lg border transition-all ${
                      pizza.esFamiliar
                        ? "border-orange-200 hover:border-orange-300 hover:bg-orange-50"
                        : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAgregados.includes(agregado.nombre)}
                      onChange={(e) => {
                        handleAgregadoChange(agregado.nombre, e.target.checked);
                      }}
                      className={`w-5 h-5 border-gray-300 rounded focus:ring-2 ${
                        pizza.esFamiliar
                          ? "text-orange-600 focus:ring-orange-500"
                          : "text-red-600 focus:ring-red-500"
                      }`}
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {agregado.nombre}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          pizza.esFamiliar ? "text-orange-600" : "text-red-600"
                        }`}
                      >
                        +${agregado.precio.toFixed(2)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div
              className={`bg-white rounded-xl p-4 sm:p-6 shadow-md border-2 ${
                pizza.esFamiliar ? "border-orange-200" : "border-red-200"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`text-2xl sm:text-3xl font-bold ${
                    pizza.esFamiliar ? "text-orange-600" : "text-red-600"
                  }`}
                >
                  ${getTotalPrice().toFixed(2)}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  precio total
                </span>
              </div>
              <button
                onClick={handleAdd}
                className={`w-full py-3 rounded-xl transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  pizza.esFamiliar
                    ? "bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white"
                    : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                }`}
              >              
              {pizza.esFamiliar ? "Continuar con Entrega" : "Agregar al Carrito"}
              </button>
            </div>
          </div>
        </div>
      </div>
       {/* Modal de información de entrega */}
       <DeliveryInfoModal
        isOpen={showDeliveryInfo}
        onClose={() => { setShowDeliveryInfo(false); }}
        onConfirm={handleDeliveryInfoConfirm}
        isFamiliar={pizza.esFamiliar}
      />
    </>
  );
}
