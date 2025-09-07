import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cotizacion } from '../../../models/cotizacion.model';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private apiUrl = 'http://127.0.0.1:8000/api/cotizaciones';

  constructor(private http: HttpClient) { }

  createCotizacion(cotizacion: Cotizacion): Observable<Cotizacion> {
    return this.http.post<Cotizacion>(this.apiUrl, cotizacion);
  }
}
