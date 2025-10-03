import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginaServicio } from '../models/pagina-servicio.model';
import { handleHttpError } from '../utils/handleHttpError';

@Injectable({
  providedIn: 'root'
})
export class PaginaServiciosService {
  private apiUrl = 'http://127.0.0.1:8000/api/pagina-servicios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PaginaServicio[]> {
    return this.http.get<PaginaServicio[]>(this.apiUrl).pipe(
      catchError(handleHttpError)
    );
  }

  get(id: number): Observable<PaginaServicio> {
    return this.http.get<PaginaServicio>(`${this.apiUrl}/${id}`).pipe(
      catchError(handleHttpError)
    );
  }

  create(data: any): Observable<PaginaServicio> {
    return this.http.post<PaginaServicio>(this.apiUrl, data).pipe(
      catchError(handleHttpError)
    );
  }

  update(id: number, data: any): Observable<PaginaServicio> {
    return this.http.put<PaginaServicio>(`${this.apiUrl}/${id}`, data).pipe(
      catchError(handleHttpError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(handleHttpError)
    );
  }
}
