import { Pagina } from './pagina.model';
import { Servicio } from './servicio.model';

export interface PaginaServicio {
  id: number;
  pagina_id: number;
  servicio_id: number;
  pagina?: Pagina;
  servicio?: Servicio;
}
