import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../../../models/producto.model';

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
  ): Observable<any> {
    let url = `${this.apiUrl}?orden=${orden}&page=${page}`;

    if (buscar) {
      url += `&buscar=${buscar}`;
    }

    if (categoriaId) {
      url += `&categoria_id=${categoriaId}`;
    }

    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createProducto(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData)
      .pipe(catchError(this.handleError));
  }

  updateProducto(id: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}?_method=PUT`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // 🔥 igual que en CategoriasService
  private handleError(error: HttpErrorResponse) {
    if (error.status === 422) {
      return throwError(() => ({
        type: 'validation',
        errors: error.error.errors
      }));
    }
    if (error.status === 500) {
      return throwError(() => ({
        type: 'server',
        message: 'Error en el servidor, intenta más tarde.'
      }));
    }
    return throwError(() => ({
      type: 'unknown',
      message: 'Error desconocido, revisa tu conexión.'
    }));
  }
}
