import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../../../models/categoria.model';
import { Servicio } from '../../../../models/servicio.model';
import { CategoriasService } from '../../../admin/services/categorias.service';
import { ServiciosService } from '../../../admin/services/servicios.service';

@Component({
  selector: 'app-admin-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  form: FormGroup;
  categorias: Categoria[] = [];
  servicios: Servicio[] = [];
  pagination: any = {};
  buscar: string = '';
  filtroCategoria: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private serviciosService: ServiciosService
  ) {
    this.form = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      slug: ['', Validators.required],
      categoria_id: ['', Validators.required],
      imagen: [null],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoriasService.getCategorias('servicio').subscribe(data => {
      this.categorias = data;
    });

    this.loadServicios();

    this.form.get('nombre')?.valueChanges.subscribe(nombre => {
      if (nombre) {
        this.form.patchValue({ slug: this.slugify(nombre) }, { emitEvent: false });
      }
    });
  }

  loadServicios(page: number = 1) {
    this.serviciosService.getServicios(
      this.buscar,
      'desc',
      page,
      this.filtroCategoria ?? undefined
    ).subscribe(res => {
      this.servicios = res.data;
      this.pagination = res;
    });
  }

  aplicarFiltros() {
    this.loadServicios(1);
  }

  slugify(text: string): string {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ imagen: file });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('slug', this.form.get('slug')?.value);
    formData.append('categoria_id', this.form.get('categoria_id')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    if (this.form.get('imagen')?.value) {
      formData.append('imagen', this.form.get('imagen')?.value);
    }

    const id = this.form.get('id')?.value;

    const request$ = id
      ? this.serviciosService.updateServicio(id, formData)
      : this.serviciosService.createServicio(formData);

    request$.subscribe({
      next: (res) => {
        console.log('Servicio guardada', res);
        this.resetForm();
        this.loadServicios(this.pagination.current_page);
      },
      error: (err) => this.handleBackendErrors(err)
    });
  }

  handleBackendErrors(err: any) {
    if (err.type === 'validation') {

      Object.keys(err.errors).forEach(field => {
        const control = this.form.get(field);
        if (control) {
          control.setErrors({ backend: err.errors[field][0] });
        }
      });
    } else {
      alert(err.message || 'Error inesperado. Intenta de nuevo.');
    }
  }

  editServicio(serv: Servicio) {
    this.form.patchValue({
      id: serv.id,
      nombre: serv.nombre,
      slug: serv.slug,
      categoria_id: serv.categoria_id,
      descripcion: serv.descripcion,
      imagen: null
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteServicio(id: number) {
    if (confirm('¿Seguro de eliminar?')) {
      this.serviciosService.deleteServicio(id).subscribe(() => {
        this.loadServicios(this.pagination.current_page);
      });
    }
  }

  resetForm() {
    this.form.reset({
      id: null,
      nombre: '',
      categoria_id: '',
      slug: '',
      descripcion: '',
      tipo: '',
      imagen: null
    });
  }

}
