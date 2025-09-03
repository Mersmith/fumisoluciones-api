export interface Servicio {
  id: number;
  nombre: string;
  created_at?: string;  // opcional, lo envía Laravel
  updated_at?: string;  // opcional, lo envía Laravel
}
