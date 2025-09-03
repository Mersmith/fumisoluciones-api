import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../shared/models/producto.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://127.0.0.1:8000/api/productos';

  constructor(private http: HttpClient) { }

  getProductos(buscar: string = '', orden: string = 'desc', page: number = 1): Observable<any> {
    let url = `${this.apiUrl}?orden=${orden}&page=${page}`;
    if (buscar) {
      url += `&buscar=${buscar}`;
    }
    return this.http.get<any>(url);
  }
}
