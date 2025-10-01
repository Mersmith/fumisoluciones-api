import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuPaginaService {
  private apiUrl = 'http://127.0.0.1:8000/api/menu-paginas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(data: { menu_id: number, pagina_id: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  delete(data: { menu_id: number, pagina_id: number }): Observable<any> {
    return this.http.request<any>('delete', this.apiUrl, { body: data });
  }
}
