import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categoria } from '../models/categoria.model';
import { handleHttpError } from '../utils/handleHttpError';

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
      catchError(handleHttpError)
    );
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`).pipe(
      catchError(handleHttpError)
    );
  }

  createCategoria(formData: FormData): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, formData).pipe(
      catchError(handleHttpError)
    );
  }

  updateCategoria(id: number, formData: FormData): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/${id}?_method=PUT`, formData).pipe(
      catchError(handleHttpError)
    );
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(handleHttpError)
    );
  }
}
