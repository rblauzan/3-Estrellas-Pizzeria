export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  agregados: string[];
  tipo: "pizza" | "bebida";
}

export interface Pizzas {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export interface Bebida {
  nombre: string;
  precio: number;
  tamaño: string;
}

export interface Agregado {
  nombre: string;
  precio: number;
}
