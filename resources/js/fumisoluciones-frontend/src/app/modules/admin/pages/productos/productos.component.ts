import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../../../models/categoria.model';
import { Producto } from '../../../../models/producto.model';
import { CategoriasService } from '../../../../services/categorias.service';
import { ProductosService } from '../../../../services/productos.service';
import { slugify } from '../../../../utils/slugify';
import { handleBackendErrors } from '../../../../utils/handleBackendErrors';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  form: FormGroup;
  categorias: Categoria[] = [];
  productos: Producto[] = [];
  pagination: any = {};
  buscar: string = '';
  filtroCategoria: number | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private productosService: ProductosService
  ) {
    this.form = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      slug: ['', Validators.required],
      categoria_id: ['', Validators.required],
      descripcion: [''],
      imagen: [null]
    });
  }

  ngOnInit(): void {
    this.categoriasService.getCategorias('producto').subscribe(data => {
      this.categorias = data;
    });

    this.loadProductos();

    this.form.get('nombre')?.valueChanges.subscribe(nombre => {
      if (nombre) {
        this.form.patchValue({ slug: slugify(nombre) }, { emitEvent: false });
      }
    });
  }

  loadProductos(page: number = 1) {
    this.productosService.getProductos(
      this.buscar,
      'desc',
      page,
      this.filtroCategoria ?? undefined
    ).subscribe(res => {
      this.productos = res.data;
      this.pagination = res;
    });
  }

  aplicarFiltros() {
    this.loadProductos(1);
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
    formData.append('categoria_id', this.form.get('categoria_id')?.value);
    formData.append('descripcion', this.form.get('descripcion')?.value);
    if (this.form.get('imagen')?.value) {
      formData.append('imagen', this.form.get('imagen')?.value);
    }

    const id = this.form.get('id')?.value;

    const request$ = id
      ? this.productosService.updateProducto(id, formData)
      : this.productosService.createProducto(formData);

    request$.subscribe({
      next: (res) => {
        console.log('Producto guardada', res);
        this.resetForm();
        this.loadProductos(this.pagination.current_page);
      },
      error: (err) => handleBackendErrors(err, this.form)
    });
  }

  editProducto(prod: Producto) {
    this.productosService.getProducto(prod.id).subscribe(res => {
      this.form.patchValue({
        id: res.id,
        nombre: res.nombre,
        slug: res.slug,
        categoria_id: res.categoria_id,
        descripcion: res.descripcion,
        imagen: null
      });
      this.imagePreview = res.imagen ? `http://127.0.0.1:8000/storage/${res.imagen}` : null;
    });
  }

  cancelEdit() {
    this.resetForm();
  }

  deleteProducto(id: number) {
    if (confirm('¿Seguro de eliminar?')) {
      this.productosService.deleteProducto(id).subscribe(() => {
        this.loadProductos(this.pagination.current_page);
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
    this.imagePreview = null;
  }

}
