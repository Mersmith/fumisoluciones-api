import { Component, OnInit } from '@angular/core';
import { MenuPaginaService } from '../../../../services/menu-pagina.service';
import { MenuPagina } from '../../../../models/menu-pagina.model';
import { PaginaService } from '../../../../services/pagina.service';
import { MenuService } from '../../../../services/menu.service';
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

  menuPaginas: MenuPagina[] = [];

  newMenuPagina: Partial<MenuPagina> = { menu_id: undefined, pagina_id: undefined };

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
    this.paginaService.getAll().subscribe(data => this.paginas = data);
  }

  // CRUD MenuPaginas
  addMenuPagina() {
    this.menuPaginaService.create(this.newMenuPagina as MenuPagina).subscribe(() => this.loadData());
  }

  deleteMenuPagina(id: number) {
    this.menuPaginaService.delete(id).subscribe(() => this.loadData());
  }
}
