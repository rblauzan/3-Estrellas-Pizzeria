import { useState } from "react";
import type React from "react";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  User,
  AlertCircle,
} from "lucide-react";

export interface DeliveryInfo {
  nombre: string;
  direccion: string;
  fecha: string;
  hora: string;
  notas?: string;
}

interface DeliveryInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (info: DeliveryInfo) => void;
  isFamiliar?: boolean;
}

export function DeliveryInfoModal({
  isOpen,
  onClose,
  onConfirm,
  isFamiliar = false,
}: DeliveryInfoModalProps) {
  const [formData, setFormData] = useState<DeliveryInfo>({
    nombre: "",
    direccion: "",
    fecha: "",
    hora: "",
    notas: "",
  });

  const [errors, setErrors] = useState<Partial<DeliveryInfo>>({});

  const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DeliveryInfo> = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.direccion.trim())
      newErrors.direccion = "La dirección es requerida";
    if (!formData.fecha) newErrors.fecha = "La fecha es requerida";
    if (!formData.hora) newErrors.hora = "La hora es requerida";

    // Validación especial para pizzas familiares
    if (isFamiliar) {
      const selectedDate = new Date(formData.fecha);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      if (selectedDate < tomorrow) {
        newErrors.fecha =
          "Las pizzas familiares requieren mínimo 1 día de anticipación";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onConfirm(formData);
      // Resetear formulario
      setFormData({
        nombre: "",
        direccion: "",
        fecha: "",
        hora: "",
        notas: "",
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      nombre: "",
      direccion: "",
      fecha: "",
      hora: "",
      notas: "",
    });
    setErrors({});
    onClose();
  };

  // Obtener fecha mínima (mañana para pizzas familiares, hoy para normales)
  const getMinDate = () => {
    const date = new Date();
    if (isFamiliar) {
      date.setDate(date.getDate() + 1);
    }
    return date.toISOString().split("T")[0];
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div
            className={`text-white p-6 ${
              isFamiliar
                ? "bg-gradient-to-r from-orange-600 to-yellow-600"
                : "bg-gradient-to-r from-red-600 to-orange-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <MapPin className="h-6 w-6" />
                  Información de Entrega
                </h2>
                <p
                  className={`mt-1 text-sm ${
                    isFamiliar ? "text-orange-100" : "text-orange-100"
                  }`}
                >
                  {isFamiliar
                    ? "Completa los datos para tu pizza familiar"
                    : "Completa los datos para tu pedido"}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:text-orange-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Aviso para pizzas familiares */}
            {isFamiliar && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-4 rounded-r-lg mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-orange-800 mb-1 text-sm">
                      Pedido con Anticipación
                    </h4>
                    <p className="text-orange-700 text-xs">
                      Las pizzas familiares requieren{" "}
                      <strong>mínimo 1 día de anticipación</strong>. Selecciona
                      una fecha a partir de mañana.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Nombre completo *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => {
                  handleInputChange("nombre", e.target.value);
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                  errors.nombre
                    ? "border-red-300 focus:ring-red-500"
                    : isFamiliar
                    ? "border-orange-300 focus:ring-orange-500"
                    : "border-red-300 focus:ring-red-500"
                }`}
                placeholder="Tu nombre completo"
              />
              {errors.nombre && (
                <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                Dirección completa *
              </label>
              <textarea
                value={formData.direccion}
                onChange={(e) => {
                  handleInputChange("direccion", e.target.value);
                }}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all resize-none ${
                  errors.direccion
                    ? "border-red-300 focus:ring-red-500"
                    : isFamiliar
                    ? "border-orange-300 focus:ring-orange-500"
                    : "border-red-300 focus:ring-red-500"
                }`}
                placeholder="Calle, número, colonia, referencias..."
              />
              {errors.direccion && (
                <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>
              )}
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Fecha *
                </label>
                <input
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => {
                    handleInputChange("fecha", e.target.value);
                  }}
                  min={getMinDate()}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                    errors.fecha
                      ? "border-red-300 focus:ring-red-500"
                      : isFamiliar
                      ? "border-orange-300 focus:ring-orange-500"
                      : "border-red-300 focus:ring-red-500"
                  }`}
                />
                {errors.fecha && (
                  <p className="text-red-500 text-xs mt-1">{errors.fecha}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-2" />
                  Hora *
                </label>
                <input
                  type="time"
                  value={formData.hora}
                  onChange={(e) => {
                    handleInputChange("hora", e.target.value);
                  }}
                  min="11:00"
                  max="22:30"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                    errors.hora
                      ? "border-red-300 focus:ring-red-500"
                      : isFamiliar
                      ? "border-orange-300 focus:ring-orange-500"
                      : "border-red-300 focus:ring-red-500"
                  }`}
                />
                {errors.hora && (
                  <p className="text-red-500 text-xs mt-1">{errors.hora}</p>
                )}
              </div>
            </div>

            {/* Notas adicionales */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas adicionales (opcional)
              </label>
              <textarea
                value={formData.notas}
                onChange={(e) => {
                  handleInputChange("notas", e.target.value);
                }}
                rows={2}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all resize-none ${
                  isFamiliar
                    ? "border-orange-300 focus:ring-orange-500"
                    : "border-red-300 focus:ring-red-500"
                }`}
                placeholder="Instrucciones especiales, referencias adicionales..."
              />
            </div>

            {/* Horario de servicio */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Horario de Entrega
              </h4>
              <p className="text-sm text-gray-600">
                <strong>Sábado - Jueves:</strong> 12:00 AM - 8:30 PM
                <br />
                <span className="text-xs text-gray-500">
                  {isFamiliar
                    ? "Pizzas familiares: Pedido con 1 día de anticipación"
                    : "Entrega el mismo día"}
                </span>
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg transition-all duration-200 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`flex-1 text-white py-3 rounded-lg transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isFamiliar
                    ? "bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700"
                    : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                }`}
              >
                Confirmar Pedido
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
