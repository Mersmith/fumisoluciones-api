import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contacto } from '../models/contacto.model';
import { Paginated } from '../models/paginated.model';
import { handleHttpError } from '../utils/handleHttpError';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private apiUrl = 'http://127.0.0.1:8000/api/contactos';

  constructor(private http: HttpClient) {}

  getContactos(
    buscar: string = '',
    orden: string = 'desc',
    page: number = 1
  ): Observable<Paginated<Contacto>> {
    let url = `${this.apiUrl}?orden=${orden}&page=${page}`;

    if (buscar) {
      url += `&buscar=${buscar}`;
    }

    return this.http.get<Paginated<Contacto>>(url)
      .pipe(catchError(handleHttpError));
  }

  getAll(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.apiUrl)
      .pipe(catchError(handleHttpError));
  }

  getContacto(id: number): Observable<Contacto> {
    return this.http.get<Contacto>(`${this.apiUrl}/${id}`)
      .pipe(catchError(handleHttpError));
  }

  createContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(this.apiUrl, contacto)
      .pipe(catchError(handleHttpError));
  }

  updateContacto(id: number, contacto: Contacto): Observable<Contacto> {
    return this.http.put<Contacto>(`${this.apiUrl}/${id}`, contacto)
      .pipe(catchError(handleHttpError));
  }

  deleteContacto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(handleHttpError));
  }
}
