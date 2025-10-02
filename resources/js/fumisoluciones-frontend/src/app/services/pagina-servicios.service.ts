import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginaServicio } from '../models/pagina-servicio.model';

@Injectable({
  providedIn: 'root'
})
export class PaginaServiciosService {
  private apiUrl = 'http://127.0.0.1:8000/api/pagina-servicios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PaginaServicio[]> {
    return this.http.get<PaginaServicio[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  create(data: any): Observable<PaginaServicio> {
    return this.http.post<PaginaServicio>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, data: any): Observable<PaginaServicio> {
    return this.http.put<PaginaServicio>(`${this.apiUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 422) {
      return throwError(() => ({
        type: 'validation',
        errors: error.error.errors
      }));
    }
    return throwError(() => ({
      type: 'unknown',
      message: 'Error en la petición.'
    }));
  }
}
