import { Categoria } from './categoria.model';

export interface Servicio {
  id: number;
  categoria_id: number;
  nombre: string;
  slug?: string;
  imagen?: string | null;
  descripcion?: string | null;
  contenido: string[];
  created_at?: string;
  updated_at?: string;
  categoria?: Categoria;
}