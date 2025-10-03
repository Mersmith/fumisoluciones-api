import { Servicio } from './servicio.model';

export interface Contacto {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  detalle: string;
  servicio_id: number;
  servicio?: Servicio;   // <-- relación cargada
  created_at?: string;
  updated_at?: string;
}
