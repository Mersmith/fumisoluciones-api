import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../models/producto.model';
import { handleHttpError } from '../utils/handleHttpError';
import { Paginated } from '../models/paginated.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://127.0.0.1:8000/api/productos';

  constructor(private http: HttpClient) { }

  getProductos(
    buscar: string = '',
    orden: string = 'desc',
    page: number = 1,
    categoriaId?: number
  ): Observable<Paginated<Producto>> {
    let url = `${this.apiUrl}?orden=${orden}&page=${page}`;
  
    if (buscar) {
      url += `&buscar=${buscar}`;
    }
  
    if (categoriaId) {
      url += `&categoria_id=${categoriaId}`;
    }
  
    return this.http.get<Paginated<Producto>>(url).pipe(
      catchError(handleHttpError)
    );
  }
  
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`)
      .pipe(catchError(handleHttpError));
  }

  createProducto(formData: FormData): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, formData)
      .pipe(catchError(handleHttpError));
  }

  updateProducto(id: number, formData: FormData): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/${id}?_method=PUT`, formData)
      .pipe(catchError(handleHttpError));
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(handleHttpError));
  }
}
