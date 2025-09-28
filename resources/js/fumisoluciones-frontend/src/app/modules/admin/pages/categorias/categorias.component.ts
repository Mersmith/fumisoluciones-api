import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../../../models/categoria.model';
import { CategoriasService } from '../../../admin/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  form: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
  ) {
    this.form = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      slug: ['', Validators.required],   // 👈 nuevo campo
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      imagen: [null]
    });
  }

  ngOnInit() {
    this.loadCategorias();

    // 👀 Generar slug automáticamente cuando cambia el nombre
    this.form.get('nombre')?.valueChanges.subscribe(nombre => {
      if (nombre) {
        this.form.patchValue({ slug: this.slugify(nombre) }, { emitEvent: false });
      }
    });
  }

  loadCategorias() {
    this.categoriasService.getCategorias().subscribe(res => {
      this.categorias = res;
    });
  }

  // 🔑 Convierte el texto en slug
  slugify(text: string): string {
    return text
      .toString()
      .normalize("NFD")                // elimina acentos
      .replace(/[\u0300-\u036f]/g, "") // quita tildes
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')     // reemplaza espacios y símbolos por -
      .replace(/^-+|-+$/g, '');        // quita guiones al inicio/fin
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
    formData.append('tipo', this.form.get('tipo')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    if (this.form.get('imagen')?.value) {
      formData.append('imagen', this.form.get('imagen')?.value);
    }
  
    const id = this.form.get('id')?.value;
  
    const request$ = id
      ? this.categoriasService.updateCategoria(id, formData)
      : this.categoriasService.createCategoria(formData);
  
    request$.subscribe({
      next: (res) => {
        console.log('Categoría guardada', res);
        this.resetForm();
        this.loadCategorias();
      },
      error: (err) => this.handleBackendErrors(err) // 👈 usamos el mismo método
    });
  }
  
  handleBackendErrors(err: any) {
    if (err.type === 'validation') {
      // 🔹 Mapear errores de Laravel al form
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


  editCategoria(cat: Categoria) {
    this.form.patchValue({
      id: cat.id,
      nombre: cat.nombre,
      slug: cat.slug,  // 👈 lo cargamos
      descripcion: cat.descripcion,
      tipo: cat.tipo,
      imagen: null
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteCategoria(id: number) {
    if (confirm('¿Seguro de eliminar?')) {
      this.categoriasService.deleteCategoria(id).subscribe(() => {
        this.loadCategorias();
      });
    }
  }

  resetForm() {
    this.form.reset({
      id: null,
      nombre: '',
      slug: '',    // 👈 limpiar slug
      descripcion: '',
      tipo: '',
      imagen: null
    });
  }
}
