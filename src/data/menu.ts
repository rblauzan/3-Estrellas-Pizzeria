import type { Pizzas, Bebida, Agregado } from "../types";

export const pizzasDestacadas: Pizzas[] = [
  {
    nombre: "Jamón Supreme",
    descripcion:
      "Jamón, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 7.55,
    imagen: "/pizzasection/Jamon.png?height=150&width=150",
  },
  {
    nombre: "Cebolla Supreme",
    descripcion:
      "Cebolla, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 7.50,
    imagen: "/pizzasection/Cebolla.png?height=150&width=150",
  },
  {
    nombre: "Hawaiana Supreme",
    descripcion:
      "Jamón, piña, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 7.50,
    imagen: "/pizzasection/Hawaiana.png?height=150&width=150",
  },
  {
    nombre: "Familiar Mixta",
    descripcion: "Jamón, cebolla confitada, salsa de tomate, pimineto y piña",
    precio: 10.75,
    imagen: "/pizzasection/FamiliarMixta.jpg?height=100&width=100",
  },
];

export const todasLasPizzas: Pizzas[] = [
  {
    nombre: "Napolitana Supreme",
    descripcion:
      "Queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 5.25,
    imagen: "/pizzasection/Napoles.png?height=150&width=150",
  },
  {
    nombre: "Jamón Supreme",
    descripcion:
      "Jamón, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 7.55,
    imagen: "/pizzasection/Jamon.png?height=150&width=150",
  },
  {
    nombre: "Cebolla Supreme",
    descripcion:
      "Cebolla, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 7.50,
    imagen: "/pizzasection/Cebolla.png?height=150&width=150",
  },
  {
    nombre: "Hawaiana Supreme",
    descripcion:
      "Jamón, piña, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 7.60,
    imagen: "/pizzasection/Hawaiana.png?height=150&width=150",
  },
  {
    nombre: "Pimiento Supreme",
    descripcion:
      "Pimiento, queso gouda, salsa de tomate, albahaca y aceite de oliva",
    precio: 7.60,
    imagen: "/pizzasection/Hawaiana.png?height=150&width=150",
  },
  {
    nombre: "Familiar Napolitana",
    descripcion:
      "Salsa de tomate, queso gouda, albahaca y aceite de oliva",
    precio: 10.00,
    imagen: "/pizzasection/FamiliarNapoles.jpg?height=100&width=100",
    esFamiliar: true,
  },
  {
    nombre: "Familiar Mixta",
    descripcion:
      "Salsa de tomate, queso gouda, jamón, cebolla confitada, pimiento, piña, albahaca y aceite de oliva",
    precio: 10.75,
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
  { nombre: "Jamón", precio: 1.10 },
  { nombre: "Pimientos", precio: 0.75 },
  { nombre: "Cebolla Confitada", precio: 0.75 },
  { nombre: "Queso Extra", precio: 1.10 },
  { nombre: "Piña Glaseada", precio: 0.75 },
];
