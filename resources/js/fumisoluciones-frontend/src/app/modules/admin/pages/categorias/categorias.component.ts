import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      nombre: [''],
      descripcion: [''],
      tipo: ['producto'], // valor por defecto
      imagen: [null]
    });
  }

  ngOnInit() {
    this.loadCategorias();
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
    }
  }

  submit() {
    const formData = new FormData();
    formData.append('categoria_id', this.form.get('categoria_id')?.value);
    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('tipo', this.form.get('tipo')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    if (this.form.get('imagen')?.value) {
      formData.append('imagen', this.form.get('imagen')?.value);
    }

    this.categoriasService.createCategoria(formData).subscribe(res => {
      console.log('Categoria creado', res);
      this.form.reset(); // limpiar form al guardar
    });
  }

  editCategoria(cat: Categoria) {
    this.form.patchValue(cat);
  }

  deleteCategoria(id: number) {
    if (confirm('¿Seguro de eliminar?')) {
      this.categoriasService.deleteCategoria(id).subscribe(() => {
        this.loadCategorias();
      });
    }
  }

}
