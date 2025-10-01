import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginaService } from '../../../../services/pagina.service';
import { Pagina } from '../../../../models/pagina.model';

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styleUrls: ['./paginas.component.css']
})
export class PaginasComponent implements OnInit {

  form: FormGroup;
  paginas: Pagina[] = [];
  pagination: any = {};
  buscar: string = '';

  constructor(
    private fb: FormBuilder,
    private paginaService: PaginaService
  ) {
    this.form = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      slug: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [null],
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.form.get('titulo')?.valueChanges.subscribe(titulo => {
      if (titulo) {
        this.form.patchValue({ slug: this.slugify(titulo) }, { emitEvent: false });
      }
    });
  }

  loadData(page: number = 1) {
    this.paginaService.getAll(this.buscar, page).subscribe(res => {
      this.paginas = res.data;
      this.pagination = res;
    });
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
    formData.append('titulo', this.form.get('titulo')?.value);
    formData.append('slug', this.form.get('slug')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    if (this.form.get('imagen')?.value) {
      formData.append('imagen', this.form.get('imagen')?.value);
    }


    const id = this.form.get('id')?.value;
    const request$ = id
      ? this.paginaService.update(id, formData)
      : this.paginaService.create(formData);

    request$.subscribe({
      next: () => {
        this.resetForm();
        this.loadData(this.pagination.current_page);
      },
      error: (err) => this.handleBackendErrors(err)
    });
  }

  editPagina(pag: Pagina) {
    this.form.patchValue({
      id: pag.id,
      titulo: pag.titulo,
      slug: pag.slug,
      descripcion: pag.descripcion,
      imagen: null
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  deletePagina(id: number) {
    if (confirm('¿Seguro de eliminar esta página?')) {
      this.paginaService.delete(id).subscribe(() => {
        this.loadData(this.pagination.current_page);
      });
    }
  }

  resetForm() {
    this.form.reset({
      id: null,
      titulo: '',
      slug: '',
      descripcion: '',
      imagen: null
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
}
