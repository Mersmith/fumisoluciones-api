import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://127.0.0.1:8000/api/categorias';

  constructor(private http: HttpClient) { }

  getCategorias(tipo?: 'producto' | 'servicio'): Observable<Categoria[]> {
    let url = this.apiUrl;
    if (tipo) {
      url += `?tipo=${tipo}`;
    }
    return this.http.get<Categoria[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createCategoria(formData: FormData): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, formData)
      .pipe(catchError(this.handleError));
  }

  updateCategoria(id: number, formData: FormData): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/${id}?_method=PUT`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

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
