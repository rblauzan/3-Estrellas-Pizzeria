export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  agregados: string[];
  tipo: "pizza" | "bebida" | "postre";
}

export interface Pizza {
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

export interface Postre {
  nombre: string;
  descripcion: string;
  precio: number;
}

export interface Agregado {
  nombre: string;
  precio: number;
}
