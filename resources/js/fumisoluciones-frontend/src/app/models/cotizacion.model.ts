export interface Cotizacion {
  id?: number;          // opcional al crear un nuevo contacto
  nombre: string;
  correo: string;
  telefono: string;
  detalle: string;
  created_at?: string;  // opcional, lo envía Laravel
  updated_at?: string;  // opcional, lo envía Laravel
}
