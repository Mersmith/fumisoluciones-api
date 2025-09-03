import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Producto } from '../../../../models/producto.model';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-web-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  buscarControl: FormControl = new FormControl('');
  orden: string = 'desc';
  paginaActual: number = 1;
  totalPaginas: number = 1;

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.buscarControl.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe(() => {
      this.paginaActual = 1; // reset page
      this.cargarProductos();
    });

    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.getProductos(this.buscarControl.value, this.orden, this.paginaActual)
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
}
