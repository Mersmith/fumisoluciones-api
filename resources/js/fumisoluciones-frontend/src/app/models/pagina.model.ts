export interface Pagina {
  id?: number;
  titulo: string;
  slug: string;
  imagen?: string | null;
  descripcion?: string | null;
  contenido?: string; // JSON como string
  created_at?: string;
  updated_at?: string;
}