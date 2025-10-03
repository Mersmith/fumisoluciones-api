import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../../../models/categoria.model';
import { CategoriasService } from '../../../../services/categorias.service';
import { slugify } from '../../../../utils/slugify';
import { handleBackendErrors } from '../../../../utils/handleBackendErrors';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  form: FormGroup;
  categorias: Categoria[] = [];
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
  ) {
    this.form = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      slug: ['', Validators.required],
      tipo: ['', Validators.required],
      descripcion: [''],
      imagen: [null]
    });
  }

  ngOnInit() {
    this.loadCategorias();

    this.form.get('nombre')?.valueChanges.subscribe(nombre => {
      if (nombre) {
        this.form.patchValue({ slug: slugify(nombre) }, { emitEvent: false });
      }
    });
  }

  loadCategorias() {
    this.categoriasService.getCategorias().subscribe(res => {
      this.categorias = res;
    });
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
      error: (err) => handleBackendErrors(err, this.form)
    });
  }

  editCategoria(cat: Categoria) {
    this.categoriasService.getCategoria(cat.id).subscribe(res => {
      this.form.patchValue({
        id: res.id,
        nombre: res.nombre,
        slug: res.slug,
        tipo: res.tipo,
        descripcion: res.descripcion,
        imagen: null
      });

      this.imagePreview = res.imagen ? `http://127.0.0.1:8000/storage/${res.imagen}` : null;
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
      slug: '',
      tipo: '',
      descripcion: '',
      imagen: null
    });
    this.imagePreview = null;
  }

}
