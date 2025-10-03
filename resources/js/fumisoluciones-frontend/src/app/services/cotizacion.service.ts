import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cotizacion } from '../models/cotizacion.model';
import { Paginated } from '../models/paginated.model';
import { handleHttpError } from '../utils/handleHttpError';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private apiUrl = 'http://127.0.0.1:8000/api/cotizaciones';

  constructor(private http: HttpClient) { }

  getCotizaciones(buscar: string = '', orden: string = 'desc', page: number = 1): Observable<Paginated<Cotizacion>> {
    let url = `${this.apiUrl}?orden=${orden}&page=${page}`;
    if (buscar) {
      url += `&buscar=${buscar}`;
    }
    return this.http.get<Paginated<Cotizacion>>(url)
      .pipe(catchError(handleHttpError));
  }

  getCotizacion(id: number): Observable<Cotizacion> {
    return this.http.get<Cotizacion>(`${this.apiUrl}/${id}`)
      .pipe(catchError(handleHttpError));
  }

  createCotizacion(cotizacion: Cotizacion): Observable<Cotizacion> {
    return this.http.post<Cotizacion>(this.apiUrl, cotizacion)
      .pipe(catchError(handleHttpError));
  }

}
