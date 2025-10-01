import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pagina } from '../models/pagina.model';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {
  private apiUrl = 'http://127.0.0.1:8000/api/paginas';

  constructor(private http: HttpClient) {}

  getAll(buscar: string = '', page: number = 1): Observable<any> {
    let url = `${this.apiUrl}?page=${page}`;
    if (buscar) {
      url += `&buscar=${buscar}`;
    }
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  get(id: number): Observable<Pagina> {
    return this.http.get<Pagina>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  create(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData).pipe(catchError(this.handleError));
  }

  update(id: number, formData: FormData): Observable<any> {
    console.log(id, formData);
    return this.http.post<any>(`${this.apiUrl}/${id}?_method=PUT`, formData)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
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
