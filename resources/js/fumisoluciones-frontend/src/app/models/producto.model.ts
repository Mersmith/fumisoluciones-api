import { Categoria } from './categoria.model';

export interface Producto {
  id: number;
  categoria_id: number;
  nombre: string;
  slug?: string;
  imagen?: string;
  descripcion?: string;
  created_at?: string;
  updated_at?: string;
  categoria?: Categoria;
}
