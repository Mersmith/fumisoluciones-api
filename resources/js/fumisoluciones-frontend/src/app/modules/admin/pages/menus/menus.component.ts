import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { PaginaService } from '../../services/pagina.service';
import { MenuPaginaService } from '../../services/menu-pagina.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  menus: any[] = [];
  paginas: any[] = [];
  menuPaginas: any[] = [];

  newMenu = { label: '', route: '', icon: '', parent_id: null, orden: 0 };
  newPagina = { titulo: '', slug: '', descripcion: '', imagen: '', contenido: '{}' };
  newMenuPagina = { menu_id: null, pagina_id: null };

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
    this.menuService.create(this.newMenu).subscribe(() => {
      this.loadData();
      this.newMenu = { label: '', route: '', icon: '', parent_id: null, orden: 0 }; // reset
    });
  }

  deleteMenu(id: number) {
    this.menuService.delete(id).subscribe(() => this.loadData());
  }

  // CRUD Paginas
  addPagina() {
    // Si el contenido está como objeto, convertirlo a string JSON
    if (typeof this.newPagina.contenido !== 'string') {
      this.newPagina.contenido = JSON.stringify(this.newPagina.contenido || {});
    }

    this.paginaService.create(this.newPagina).subscribe(() => {
      this.loadData();
      // Reiniciar formulario con contenido como string
      this.newPagina = { titulo: '', slug: '', descripcion: '', imagen: '', contenido: '{}' };
    });
  }


  deletePagina(id: number) {
    this.paginaService.delete(id).subscribe(() => this.loadData());
  }

  // CRUD MenuPaginas
  addMenuPagina() {
    this.menuPaginaService.create(this.newMenuPagina).subscribe(() => this.loadData());
  }

  deleteMenuPagina(id: number) {
    this.menuPaginaService.delete(id).subscribe(() => this.loadData());
  }
}
