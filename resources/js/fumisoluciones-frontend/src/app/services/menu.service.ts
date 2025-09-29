import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model'; // importa tu modelo

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://127.0.0.1:8000/api/menus';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  get(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`);
  }

  create(data: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, data);
  }

  update(id: number, data: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
