import { Component, OnInit } from '@angular/core';
import { PaginaService } from '../../../../services/pagina.service';
import { Pagina } from '../../../../models/pagina.model';

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styleUrls: ['./paginas.component.css']
})
export class PaginasComponent implements OnInit {

  paginas: Pagina[] = [];

  newPagina: Partial<Pagina> = { titulo: '', slug: '', descripcion: '', imagen: '', contenido: '{}' };

  constructor(
    private paginaService: PaginaService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.paginaService.getAll().subscribe(data => this.paginas = data);
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



}
