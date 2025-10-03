export interface Pagina {
  id: number;
  titulo: string;
  slug: string;
  imagen?: string | null;
  descripcion?: string | null;
  created_at?: string;
  updated_at?: string;
}