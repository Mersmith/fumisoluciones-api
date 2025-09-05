import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Producto, Categoria } from '../../../../models/producto.model';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-web-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaSeleccionada: number | null = null;
  productos: Producto[] = [];
  buscarControl: FormControl = new FormControl('');
  orden: string = 'desc';
  paginaActual: number = 1;
  totalPaginas: number = 1;

  constructor(
    private categoriasService: CategoriasService,
    private productosService: ProductosService
  ) { }

  ngOnInit(): void {
    this.buscarControl.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe(() => {
      this.paginaActual = 1;
      this.cargarProductos();
      this.cargarCategorias();
    });

    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriasService.getCategorias().subscribe(res => {
      this.categorias = res;
    });
  }

  filtrarPorCategoria() {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService
      .getProductos(this.buscarControl.value, this.orden, this.paginaActual, this.categoriaSeleccionada ?? undefined)
      .subscribe({
        next: (res) => {
          this.productos = res.data;
          this.paginaActual = res.current_page;
          this.totalPaginas = res.last_page;
        },
        error: (err) => console.error(err)
      });
  }

  cambiarPagina(page: number) {
    if (page >= 1 && page <= this.totalPaginas) {
      this.paginaActual = page;
      this.cargarProductos();
    }
  }

  resetearFiltros() {
    this.buscarControl.setValue('');
    this.orden = 'desc';
    this.categoriaSeleccionada = null;
    this.paginaActual = 1;
    this.cargarProductos();
  }

}
