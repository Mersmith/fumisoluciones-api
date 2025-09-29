import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../../services/menu.service';
import { PaginaService } from '../../../../services/pagina.service';
import { MenuPaginaService } from '../../../../services/menu-pagina.service';
import { Menu } from '../../../../models/menu.model';
import { Pagina } from '../../../../models/pagina.model';
import { MenuPagina } from '../../../../models/menu-pagina.model';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  menus: Menu[] = [];
  paginas: Pagina[] = [];
  menuPaginas: MenuPagina[] = [];

  newMenu: Partial<Menu> = { label: '', route: '', icon: '', parent_id: undefined, orden: 0 };
  newPagina: Partial<Pagina> = { titulo: '', slug: '', descripcion: '', imagen: '', contenido: '{}' };
  newMenuPagina: Partial<MenuPagina> = { menu_id: undefined, pagina_id: undefined };

  constructor(
    private menuService: MenuService,
    private paginaService: PaginaService,
    private menuPaginaService: MenuPaginaService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.menuService.getAll().subscribe(data => this.menus = data);
    this.paginaService.getAll().subscribe(data => this.paginas = data);
    this.menuPaginaService.getAll().subscribe(data => this.menuPaginas = data);
  }

  // CRUD Menus
  addMenu() {
    this.menuService.create(this.newMenu as Menu).subscribe(() => {
      this.loadData();
      this.newMenu = { label: '', route: '', icon: '', parent_id: null, orden: 0 };
    });
  }

  deleteMenu(id: number) {
    this.menuService.delete(id).subscribe(() => this.loadData());
  }

  // CRUD Paginas
  addPagina() {
    if (typeof this.newPagina.contenido !== 'string') {
      this.newPagina.contenido = JSON.stringify(this.newPagina.contenido || {});
    }

    this.paginaService.create(this.newPagina as Pagina).subscribe(() => {
      this.loadData();
      this.newPagina = { titulo: '', slug: '', descripcion: '', imagen: '', contenido: '{}' };
    });
  }

  deletePagina(id: number) {
    this.paginaService.delete(id).subscribe(() => this.loadData());
  }

  // CRUD MenuPaginas
  addMenuPagina() {
    this.menuPaginaService.create(this.newMenuPagina as MenuPagina).subscribe(() => this.loadData());
  }

  deleteMenuPagina(id: number) {
    this.menuPaginaService.delete(id).subscribe(() => this.loadData());
  }
}
