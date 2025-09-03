export interface Contacto {
  id?: number;          // opcional al crear un nuevo contacto
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  detalle: string;
  servicio_id: number;  // relación con servicios
  created_at?: string;  // opcional, lo envía Laravel
  updated_at?: string;  // opcional, lo envía Laravel
}
