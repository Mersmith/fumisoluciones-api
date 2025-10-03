import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Categoria } from '../../../../models/categoria.model';
import { Servicio } from '../../../../models/servicio.model';
import { CategoriasService } from '../../../../services/categorias.service';
import { ServiciosService } from '../../../../services/servicios.service';
import { slugify } from '../../../../utils/slugify';
import { handleBackendErrors } from '../../../../utils/handleBackendErrors';

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
  imagePreview: string | null = null;

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
      descripcion: [''],
      contenido: this.fb.array([]),
      imagen: [null]
    });
  }

  ngOnInit(): void {
    this.categoriasService.getCategorias('servicio').subscribe(data => {
      this.categorias = data;
    });

    this.loadServicios();

    this.form.get('nombre')?.valueChanges.subscribe(nombre => {
      if (nombre) {
        this.form.patchValue({ slug: slugify(nombre) }, { emitEvent: false });
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ imagen: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  get contenido(): FormArray {
    return this.form.get('contenido') as FormArray;
  }

  addContenido(item: string = '') {
    this.contenido.push(this.fb.control(item, Validators.required));
  }

  removeContenido(index: number) {
    this.contenido.removeAt(index);
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

    this.contenido.value.forEach((item: string, index: number) => {
      formData.append(`contenido[${index}]`, item);
    });

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
      error: (err) => handleBackendErrors(err, this.form)
    });
  }

  editServicio(serv: Servicio) {
    this.serviciosService.getServicio(serv.id).subscribe(res => {
      this.form.patchValue({
        id: serv.id,
        nombre: serv.nombre,
        slug: serv.slug,
        categoria_id: serv.categoria_id,
        descripcion: serv.descripcion,
        imagen: null
      });

      this.contenido.clear();
      if (serv.contenido && serv.contenido.length) {
        serv.contenido.forEach(item => this.addContenido(item));
      }
      this.imagePreview = res.imagen ? `http://127.0.0.1:8000/storage/${res.imagen}` : null;
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
      contenido: [],
      imagen: null
    });
    this.contenido.clear();
    this.imagePreview = null;
  }

}
