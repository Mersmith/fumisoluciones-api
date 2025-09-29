import { Menu } from './menu.model';
import { Pagina } from './pagina.model';

export interface MenuPagina {
  id?: number;
  menu_id?: number;    // <-- opcional
  pagina_id?: number;  // <-- opcional
  created_at?: string;
  updated_at?: string;
  menu?: Menu;
  pagina?: Pagina;
}
