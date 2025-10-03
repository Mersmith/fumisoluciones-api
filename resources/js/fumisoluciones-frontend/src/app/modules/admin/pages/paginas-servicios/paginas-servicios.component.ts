import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginaServiciosService } from '../../../../services/pagina-servicios.service';
import { PaginaServicio } from '../../../../models/pagina-servicio.model';
import { PaginaService } from '../../../../services/pagina.service';
import { ServiciosService } from '../../../../services/servicios.service';

@Component({
  selector: 'app-paginas-servicios',
  templateUrl: './paginas-servicios.component.html'
})
export class PaginasServiciosComponent implements OnInit {
  paginaServicios: PaginaServicio[] = [];
  form!: FormGroup;
  editingId: number | null = null;
  paginas: any[] = [];
  servicios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private paginaService: PaginaService,
    private serviciosService: ServiciosService,
    private service: PaginaServiciosService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      pagina_id: ['', Validators.required],
      servicio_id: ['', Validators.required],
    });

    this.load();
    this.loadPaginas();
    this.loadServicios();
  }

  load() {
    this.service.getAll().subscribe(res => {
      this.paginaServicios = Array.isArray(res) ? res : [];
    });
  }

  loadPaginas() {
    this.paginaService.getAllWeb().subscribe(res => {
      this.paginas = Array.isArray(res) ? res : [];
    });
  }

  loadServicios() {
    this.serviciosService.getServicios().subscribe(res => {
      this.servicios = Array.isArray(res.data) ? res.data : [];
    });
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.value;

    if (this.editingId) {
      this.service.update(this.editingId, data).subscribe(() => {
        this.load();
        this.reset();
      });
    } else {
      this.service.create(data).subscribe(() => {
        this.load();
        this.reset();
      });
    }
  }

  edit(item: PaginaServicio) {
    this.editingId = item.id;
    this.form.patchValue({
      pagina_id: item.pagina_id,
      servicio_id: item.servicio_id
    });
  }

  delete(id: number) {
    if (confirm('¿Seguro de eliminar?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }  

  reset() {
    this.form.reset({
      pagina_id: '',
      servicio_id: ''
    });
    this.editingId = null;
  }
}
