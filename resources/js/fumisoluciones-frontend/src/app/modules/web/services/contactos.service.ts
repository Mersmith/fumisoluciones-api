import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../../../models/contacto.model';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  private apiUrl = 'http://127.0.0.1:8000/api/contactos';

  constructor(private http: HttpClient) { }

  createContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(this.apiUrl, contacto);
  }
}
