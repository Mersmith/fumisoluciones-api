import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Menu, MenuItem } from '../models/menu.model';
import { handleHttpError } from '../utils/handleHttpError';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://127.0.0.1:8000/api/menus';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl).pipe(
      catchError(handleHttpError)
    );
  }

  getWebMenu(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/web`).pipe(
      catchError(handleHttpError)
    );
  }

  get(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`).pipe(
      catchError(handleHttpError)
    );
  }

  create(formData: FormData): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, formData).pipe(
      catchError(handleHttpError)
    );
  }

  update(id: number, formData: FormData): Observable<Menu> {
    return this.http.post<Menu>(`${this.apiUrl}/${id}?_method=PUT`, formData).pipe(
      catchError(handleHttpError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(handleHttpError)
    );
  }
}
