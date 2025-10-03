import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuPaginaService } from '../../../../services/menu-pagina.service';
import { MenuService } from '../../../../services/menu.service';
import { PaginaService } from '../../../../services/pagina.service';
import { Menu } from '../../../../models/menu.model';
import { Pagina } from '../../../../models/pagina.model';
import { MenuPagina } from '../../../../models/menu-pagina.model';

@Component({
  selector: 'app-menu-paginas',
  templateUrl: './menu-paginas.component.html',
  styleUrls: ['./menu-paginas.component.css']
})
export class MenuPaginasComponent implements OnInit {
  form!: FormGroup;
  menuPaginas: MenuPagina[] = [];
  menus: Menu[] = [];
  paginas: Pagina[] = [];
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private menuPaginaService: MenuPaginaService,
    private menuService: MenuService,
    private paginaService: PaginaService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      menu_id: ['', Validators.required],
      pagina_id: ['', Validators.required]
    });

    this.load();
  }

  load() {
    this.menuPaginaService.getAll().subscribe(res => {
      this.menuPaginas = Array.isArray(res) ? res : [];
    });

    this.menuService.getAll().subscribe(res => {
      this.menus = Array.isArray(res) ? res : [];
    });

    this.paginaService.getAllWeb().subscribe(res => {
      this.paginas = Array.isArray(res) ? res : [];
    });
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.editingId) {
      this.menuPaginaService.update(this.editingId, data).subscribe(() => {
        this.load();
        this.reset();
      });
    } else {
      this.menuPaginaService.create(data).subscribe(() => {
        this.load();
        this.reset();
      });
    }
  }

  edit(item: MenuPagina) {
    this.editingId = item.id;
    this.form.patchValue({
      menu_id: item.menu_id,
      pagina_id: item.pagina_id
    });
  }

  delete(id: number) {
    if (confirm('¿Seguro de eliminar?')) {
      this.menuPaginaService.delete(id).subscribe(() => this.load());
    }
  }

  reset() {
    this.editingId = null;
    this.form.reset({
      menu_id: '',
      pagina_id: ''
    });
  }
}
