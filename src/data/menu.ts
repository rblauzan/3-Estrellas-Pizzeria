import type { Pizza, Bebida, Postre, Agregado } from "../types"

export const pizzasDestacadas: Pizza[] = [
  {
    nombre: "Napolitana Clásica",
    descripcion: "Salsa de tomate, queso gouda, albahaca y aceite de oliva",
    precio: 3.50,
    imagen: "/Napoles.jpg?height=150&width=150",
  },
  {
    nombre: "Jamón Supreme",
    descripcion: "Jamón, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 4.50,
    imagen: "/placeholder.svg?height=150&width=150",
  },
  {
    nombre: "Cebolla Supreme",
    descripcion: "Cebolla, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 4.00,
    imagen: "/placeholder.svg?height=150&width=150",
  },
  {
    nombre: "Hawaiana Supreme",
    descripcion: "Jamón, piña, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 4.90,
    imagen: "/placeholder.svg?height=150&width=150",
  },
]

export const todasLasPizzas: Pizza[] = [
  ...pizzasDestacadas,
  {
    nombre: "Familiar Napolitana",
    descripcion: "Salsa de tomate, queso gouda, albahaca y aceite de oliva",
    precio: 6.20,
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    nombre: "Familiar Mixta",
    descripcion: "Jamón, cebolla confitada, pimineto y piña",
    precio: 8.20,
    imagen: "/placeholder.svg?height=100&width=100",
  }
]

export const bebidas: Bebida[] = [
  { nombre: "Refresco de Cola", precio: 0.95, tamaño: "355ml" },
  { nombre: "Refresco de Naranja", precio: 0.95, tamaño: "355ml" },
  { nombre: "Refresco de Limón ", precio: 0.95, tamaño: "355ml" },
  { nombre: "Refresco de Mate", precio: 0.95, tamaño: "355ml" },
  { nombre: "Malta Importada", precio: 1.20, tamaño: "355ml" },
  { nombre: "Cerveza Importada", precio: 1.20, tamaño: "355ml" },
]

export const postres: Postre[] = [
  { nombre: "Roscón Premium Chocolate", descripcion: "Más grande y exclusivo con extra de chocolate", precio: 8.00 },
  { nombre: "Roscón Supreme ", descripcion: "Un paso arriba con toques extra de chocolate", precio: 4.99 },
  { nombre: "Roscón Pasión de Azúcar ", descripcion: "Estilo tradicional de mini delicia, azúcar y decoración simple", precio: 5.99 },
  { nombre: "Roscón Mini Delicia", descripcion: "El más pequeño, sencillo y tradicional", precio: 5.99 },
]

export const agregados: Agregado[] = [
  { nombre: "Jamón", precio: 0.75 },
  { nombre: "Pimientos", precio: 0.50 },
  { nombre: "Cebolla Confitada", precio: 0.50 },
  { nombre: "Queso Extra", precio: 0.75 },
]
