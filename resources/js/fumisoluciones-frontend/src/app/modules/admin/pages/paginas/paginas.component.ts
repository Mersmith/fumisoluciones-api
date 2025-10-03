import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginaService } from '../../../../services/pagina.service';
import { Pagina } from '../../../../models/pagina.model';
import { slugify } from '../../../../utils/slugify';
import { handleBackendErrors } from '../../../../utils/handleBackendErrors';

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
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private paginaService: PaginaService
  ) {
    this.form = this.fb.group({
      id: [null],
      titulo: ['', Validators.required],
      slug: ['', Validators.required],
      descripcion: [''],
      imagen: [null],
    });
  }

  ngOnInit(): void {
    this.loadData();
    this.form.get('titulo')?.valueChanges.subscribe(titulo => {
      if (titulo) {
        this.form.patchValue({ slug: slugify(titulo) }, { emitEvent: false });
      }
    });
  }

  loadData(page: number = 1) {
    this.paginaService.getAll(this.buscar, page).subscribe(res => {
      this.paginas = res.data;
      this.pagination = res;
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
      error: (err) => handleBackendErrors(err, this.form)
    });
  }

  editPagina(pag: Pagina) {
    this.paginaService.get(pag.id).subscribe(res => {
      this.form.patchValue({
        id: pag.id,
        titulo: pag.titulo,
        slug: pag.slug,
        descripcion: pag.descripcion,
        imagen: null
      });

      this.imagePreview = res.imagen ? `http://127.0.0.1:8000/storage/${res.imagen}` : null;
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  deletePagina(id: number) {
    if (confirm('¿Seguro de eliminar?')) {
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

    this.imagePreview = null;
  }
}
