import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from '../../../../models/categoria.model';
import { CategoriasService } from '../../../admin/services/categorias.service';
import { ProductosService } from '../../../admin/services/productos.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  form: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private productosService: ProductosService
  ) {
    this.form = this.fb.group({
      categoria_id: [''],
      nombre: [''],
      descripcion: [''],
      imagen: [null]
    });
  }

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe(data => {
      this.categorias = data;
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

    this.productosService.createProducto(formData).subscribe(res => {
      console.log('Producto creado', res);
      this.form.reset(); // limpiar form al guardar
    });
  }
}
