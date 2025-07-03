import type { Pizzas, Bebida, Agregado } from "../types";

export const pizzasDestacadas: Pizzas[] = [
  {
    nombre: "Jamón Supreme",
    descripcion:
      "Jamón, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 4.5,
    imagen: "/pizzasection/Jamon.png?height=150&width=150",
  },
  {
    nombre: "Cebolla Supreme",
    descripcion:
      "Cebolla, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 4.0,
    imagen: "/pizzasection/Cebolla.png?height=150&width=150",
  },
  {
    nombre: "Hawaiana Supreme",
    descripcion:
      "Jamón, piña, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 4.9,
    imagen: "/pizzasection/Hawaiana.png?height=150&width=150",
  },
  {
    nombre: "Familiar Mixta",
    descripcion: "Jamón, cebolla confitada, salsa de tomate, pimineto y piña",
    precio: 8.2,
    imagen: "/pizzasection/FamiliarMixta.jpg?height=100&width=100",
  },
];

export const todasLasPizzas: Pizzas[] = [
  {
    nombre: "Napolitana Supreme",
    descripcion:
      "Queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 3.50,
    imagen: "/pizzasection/Napoles.png?height=150&width=150",
  },
  {
    nombre: "Jamón Supreme",
    descripcion:
      "Jamón, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 4.50,
    imagen: "/pizzasection/Jamon.png?height=150&width=150",
  },
  {
    nombre: "Cebolla Supreme",
    descripcion:
      "Cebolla, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 4.00,
    imagen: "/pizzasection/Cebolla.png?height=150&width=150",
  },
  {
    nombre: "Hawaiana Supreme",
    descripcion:
      "Jamón, piña, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 4.90,
    imagen: "/pizzasection/Hawaiana.png?height=150&width=150",
  },
  {
    nombre: "Familiar Napolitana",
    descripcion:
      "Salsa de tomate, queso gouda, albahaca y aceite de oliva",
    precio: 6.20,
    imagen: "/pizzasection/FamiliarNapoles.jpg?height=100&width=100",
    esFamiliar: true,
  },
  {
    nombre: "Familiar Mixta",
    descripcion:
      "Salsa de tomate, queso gouda, jamón, cebolla confitada, pimiento, piña, albahaca y aceite de oliva",
    precio: 8.20,
    imagen: "/pizzasection/FamiliarMixta.jpg?height=100&width=100",
    esFamiliar: true,
  },
];

export const bebidas: Bebida[] = [
  { nombre: "Refresco de Cola", precio: 0.95, tamaño: "355ml" },
  { nombre: "Refresco de Naranja", precio: 0.95, tamaño: "355ml" },
  { nombre: "Refresco de Limón ", precio: 0.95, tamaño: "355ml" },
  { nombre: "Refresco de Mate", precio: 0.95, tamaño: "355ml" },
  { nombre: "Refresco de Cola", precio: 0.95, tamaño: "1.5L" },
  { nombre: "Refresco de Naranja", precio: 0.95, tamaño: "1.5L" },
  { nombre: "Refresco de Limón ", precio: 0.95, tamaño: "1.5L" },
  { nombre: "Refresco de Mate", precio: 0.95, tamaño: "1.5L" },
  { nombre: "Malta Importada", precio: 1.2, tamaño: "355ml" },
  { nombre: "Cerveza Importada", precio: 1.2, tamaño: "355ml" },
];

export const agregados: Agregado[] = [
  { nombre: "Jamón", precio: 0.75 },
  { nombre: "Pimientos", precio: 0.5 },
  { nombre: "Cebolla Confitada", precio: 0.5 },
  { nombre: "Queso Extra", precio: 0.75 },
  { nombre: "Piña Glaseada", precio: 0.5 },
];
