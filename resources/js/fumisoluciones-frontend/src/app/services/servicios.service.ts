import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Servicio } from '../models/servicio.model';
import { Paginated } from '../models/paginated.model';
import { handleHttpError } from '../utils/handleHttpError';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'http://127.0.0.1:8000/api/servicios';

  constructor(private http: HttpClient) { }

  getServiciosWeb(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/web`)
      .pipe(catchError(handleHttpError));
  }

  getServicios(
    buscar: string = '',
    orden: string = 'desc',
    page: number = 1,
    categoriaId?: number
  ): Observable<Paginated<Servicio>> {
    let url = `${this.apiUrl}?orden=${orden}&page=${page}`;

    if (buscar) {
      url += `&buscar=${buscar}`;
    }

    if (categoriaId) {
      url += `&categoria_id=${categoriaId}`;
    }

    return this.http.get<Paginated<Servicio>>(url)
      .pipe(catchError(handleHttpError));
  }

  getServicio(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${id}`)
      .pipe(catchError(handleHttpError));
  }

  createServicio(formData: FormData): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, formData)
      .pipe(catchError(handleHttpError));
  }

  updateServicio(id: number, formData: FormData): Observable<Servicio> {
    return this.http.post<Servicio>(`${this.apiUrl}/${id}?_method=PUT`, formData)
      .pipe(catchError(handleHttpError));
  }

  deleteServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(handleHttpError));
  }
}
