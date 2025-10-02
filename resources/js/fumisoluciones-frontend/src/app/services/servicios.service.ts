import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'http://127.0.0.1:8000/api/servicios';

  constructor(private http: HttpClient) { }

  getServiciosWeb(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/web`)
      .pipe(catchError(this.handleError));
  }

  getServicios(
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

  getServicio(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createServicio(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData)
      .pipe(catchError(this.handleError));
  }

  updateServicio(id: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}?_method=PUT`, formData)
      .pipe(catchError(this.handleError));
  }

  deleteServicio(id: number): Observable<void> {
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
