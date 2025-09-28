export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  descripcion?: string;   // puede ser null
  tipo: 'producto' | 'servicio';
  imagen?: string;        // puede ser null
}