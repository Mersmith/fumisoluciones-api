export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  tipo: 'producto' | 'servicio';
  descripcion?: string;
  imagen?: string;
}