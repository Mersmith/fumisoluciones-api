import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from '../../../../models/producto.model';
import { CategoriasService } from '../../../admin/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
  ) {
    this.form = this.fb.group({
      nombre: [''],
      descripcion: [''],
      imagen: [null]
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
    formData.append('descripcion', this.form.get('descripcion')?.value);
    if (this.form.get('imagen')?.value) {
      formData.append('imagen', this.form.get('imagen')?.value);
    }

    this.categoriasService.createCategoria(formData).subscribe(res => {
      console.log('Categoria creado', res);
      this.form.reset(); // limpiar form al guardar
    });
  }

}
