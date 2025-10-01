import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://127.0.0.1:8000/api/menus';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  get(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  create(data: any): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, data).pipe(catchError(this.handleError));
  }

  update(id: number, data: any): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${id}`, data).pipe(catchError(this.handleError));
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
