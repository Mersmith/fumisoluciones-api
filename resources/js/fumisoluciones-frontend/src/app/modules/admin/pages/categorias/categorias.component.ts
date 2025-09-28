import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
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
      descripcion: ['', Validators.required],
      tipo: ['producto', Validators.required],
      imagen: [null] // la imagen la puedes dejar opcional
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
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // fuerza mostrar errores
      return;
    }
  
    const formData = new FormData();
    formData.append('nombre', this.form.get('nombre')?.value);
    formData.append('tipo', this.form.get('tipo')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    if (this.form.get('imagen')?.value) {
      formData.append('imagen', this.form.get('imagen')?.value);
    }
  
    const id = this.form.get('id')?.value;
  
    if (id) {
      this.categoriasService.updateCategoria(id, formData).subscribe(res => {
        console.log('Categoria actualizada', res);
        this.form.reset();
        this.loadCategorias();
      });
    } else {
      this.categoriasService.createCategoria(formData).subscribe(res => {
        console.log('Categoria creada', res);
        this.form.reset();
        this.loadCategorias();
      });
    }
  }


  editCategoria(cat: Categoria) {
    this.form.patchValue({
      id: cat.id,
      nombre: cat.nombre,
      descripcion: cat.descripcion,
      tipo: cat.tipo,
      imagen: null // 👈 opcional, no cargamos la imagen anterior
    });
  }


  deleteCategoria(id: number) {
    if (confirm('¿Seguro de eliminar?')) {
      this.categoriasService.deleteCategoria(id).subscribe(() => {
        this.loadCategorias();
      });
    }
  }

}
