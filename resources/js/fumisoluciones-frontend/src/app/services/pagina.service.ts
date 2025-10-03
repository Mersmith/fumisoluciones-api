import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pagina } from '../models/pagina.model';
import { Paginated } from '../models/paginated.model';
import { handleHttpError } from '../utils/handleHttpError';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {
  private apiUrl = 'http://127.0.0.1:8000/api/paginas';

  constructor(private http: HttpClient) { }

  getAllWeb(): Observable<Pagina[]> {
    return this.http.get<Pagina[]>(`${this.apiUrl}/web`)
      .pipe(catchError(handleHttpError));
  }

  getAll(buscar: string = '', page: number = 1): Observable<Paginated<Pagina>> {
    let url = `${this.apiUrl}?page=${page}`;
    if (buscar) {
      url += `&buscar=${buscar}`;
    }
    return this.http.get<Paginated<Pagina>>(url)
      .pipe(catchError(handleHttpError));
  }

  get(id: number): Observable<Pagina> {
    return this.http.get<Pagina>(`${this.apiUrl}/${id}`)
      .pipe(catchError(handleHttpError));
  }

  getPaginaBySlug(slug: string): Observable<Pagina> {
    return this.http.get<Pagina>(`${this.apiUrl}/slug/${slug}`);
  }

  create(formData: FormData): Observable<Pagina> {
    return this.http.post<Pagina>(this.apiUrl, formData)
      .pipe(catchError(handleHttpError));
  }

  update(id: number, formData: FormData): Observable<Pagina> {
    return this.http.post<Pagina>(`${this.apiUrl}/${id}?_method=PUT`, formData)
      .pipe(catchError(handleHttpError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(handleHttpError));
  }
}
