import { Component, OnInit } from '@angular/core';
import { MenuPaginaService } from '../../../../services/menu-pagina.service';
import { MenuService } from '../../../../services/menu.service';
import { PaginaService } from '../../../../services/pagina.service';
import { Menu } from '../../../../models/menu.model';
import { Pagina } from '../../../../models/pagina.model';

@Component({
  selector: 'app-menu-paginas',
  templateUrl: './menu-paginas.component.html',
  styleUrls: ['./menu-paginas.component.css']
})
export class MenuPaginasComponent implements OnInit {
  menus: Menu[] = [];
  paginas: Pagina[] = [];
  menuPaginas: any[] = [];

  newMenuPagina: { menu_id?: number, pagina_id?: number } = {};

  constructor(
    private menuPaginaService: MenuPaginaService,
    private menuService: MenuService,
    private paginaService: PaginaService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.menuPaginaService.getAll().subscribe(data => this.menuPaginas = data);
    this.menuService.getAll().subscribe(data => this.menus = data);
    this.paginaService.getAll().subscribe(res => this.paginas = res.data || res); // 👈 si es paginado
  }

  addMenuPagina() {
    if (!this.newMenuPagina.menu_id || !this.newMenuPagina.pagina_id) {
      alert("Selecciona un menú y una página");
      return;
    }
    this.menuPaginaService.create(this.newMenuPagina as any).subscribe(() => {
      this.newMenuPagina = {};
      this.loadData();
    });
  }

  deleteMenuPagina(menu_id: number, pagina_id: number) {
    if (confirm('¿Seguro de eliminar esta relación?')) {
      this.menuPaginaService.delete({ menu_id, pagina_id }).subscribe(() => {
        this.loadData();
      });
    }
  }
}
