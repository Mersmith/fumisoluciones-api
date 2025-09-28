import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../../../app/models/categoria.model'; // 👈 usa solo esta

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://127.0.0.1:8000/api/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  createCategoria(formData: FormData): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, formData);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
