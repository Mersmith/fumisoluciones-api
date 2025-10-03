import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleHttpError } from '../utils/handleHttpError';
import { MenuPagina } from '../models/menu-pagina.model';

@Injectable({
  providedIn: 'root'
})
export class MenuPaginaService {
  private apiUrl = 'http://127.0.0.1:8000/api/menu-paginas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(handleHttpError)
    );
  }

  create(data: { menu_id: number; pagina_id: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data).pipe(
      catchError(handleHttpError)
    );
  }

  update(id: number, data: any): Observable<MenuPagina> {
    return this.http.put<MenuPagina>(`${this.apiUrl}/${id}`, data).pipe(
      catchError(handleHttpError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(handleHttpError)
    );
  }
}
