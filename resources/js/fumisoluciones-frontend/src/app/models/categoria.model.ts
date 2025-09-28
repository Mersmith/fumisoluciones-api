export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  descripcion?: string;
  tipo: 'producto' | 'servicio';
  imagen?: string;
}