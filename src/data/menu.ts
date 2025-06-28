import type { Pizza, Bebida, Postre, Agregado } from "../types"

export const pizzasDestacadas: Pizza[] = [
  {
    nombre: "Margherita Clásica",
    descripcion: "Salsa de tomate, mozzarella fresca, albahaca y aceite de oliva",
    precio: 14.99,
    imagen: "/placeholder.svg?height=150&width=150",
  },
  {
    nombre: "Pepperoni Supreme",
    descripcion: "Pepperoni, mozzarella, salsa especial y orégano",
    precio: 16.99,
    imagen: "/placeholder.svg?height=150&width=150",
  },
  {
    nombre: "Cuatro Quesos",
    descripcion: "Mozzarella, parmesano, gorgonzola y ricotta",
    precio: 18.99,
    imagen: "/placeholder.svg?height=150&width=150",
  },
  {
    nombre: "Hawaiana",
    descripcion: "Jamón, piña, mozzarella y salsa de tomate",
    precio: 15.99,
    imagen: "/placeholder.svg?height=150&width=150",
  },
]

export const todasLasPizzas: Pizza[] = [
  ...pizzasDestacadas,
  {
    nombre: "Vegetariana",
    descripcion: "Pimientos, champiñones, cebolla, tomate y aceitunas",
    precio: 16.99,
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    nombre: "Carnívora",
    descripcion: "Pepperoni, salchicha, jamón, tocino y carne molida",
    precio: 21.99,
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    nombre: "BBQ Chicken",
    descripcion: "Pollo a la parrilla, salsa BBQ, cebolla morada y cilantro",
    precio: 19.99,
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    nombre: "Mediterránea",
    descripcion: "Aceitunas, tomates secos, queso feta, espinacas y orégano",
    precio: 18.99,
    imagen: "/placeholder.svg?height=100&width=100",
  },
]

export const bebidas: Bebida[] = [
  { nombre: "Coca-Cola", precio: 2.99, tamaño: "500ml" },
  { nombre: "Sprite", precio: 2.99, tamaño: "500ml" },
  { nombre: "Agua Natural", precio: 1.99, tamaño: "500ml" },
  { nombre: "Jugo de Naranja", precio: 3.99, tamaño: "500ml" },
  { nombre: "Cerveza Nacional", precio: 4.99, tamaño: "355ml" },
  { nombre: "Vino Tinto", precio: 12.99, tamaño: "Copa" },
]

export const postres: Postre[] = [
  { nombre: "Tiramisu", descripcion: "Postre italiano tradicional", precio: 6.99 },
  { nombre: "Gelato", descripcion: "Helado artesanal (vainilla, chocolate, fresa)", precio: 4.99 },
  { nombre: "Cannoli", descripcion: "Dulce siciliano relleno de ricotta", precio: 5.99 },
  { nombre: "Panna Cotta", descripcion: "Postre cremoso con frutos rojos", precio: 5.99 },
]

export const agregados: Agregado[] = [
  { nombre: "Jamón", precio: 2.0 },
  { nombre: "Pepperoni", precio: 2.5 },
  { nombre: "Champiñones", precio: 1.5 },
  { nombre: "Pimientos", precio: 1.5 },
  { nombre: "Cebolla", precio: 1.0 },
  { nombre: "Aceitunas", precio: 1.5 },
  { nombre: "Queso Extra", precio: 2.0 },
  { nombre: "Tocino", precio: 2.5 },
]
