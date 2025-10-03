import { Component, OnInit } from '@angular/core';
import { ContactosService } from '../../../../services/contactos.service';
import { Contacto } from '../../../../models/contacto.model';

@Component({
  selector: 'app-admin-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  contactos: Contacto[] = [];
  pagination: any = {};
  buscar: string = '';
  contactoAbiertoId: number | null = null;

  constructor(private contactosService: ContactosService) { }

  ngOnInit(): void {
    this.loadContactos();
  }

  loadContactos(page: number = 1) {
    this.contactosService.getContactos(this.buscar, 'desc', page).subscribe(res => {
      this.contactos = res.data;
      this.pagination = res;
    });
  }

  aplicarFiltros() {
    this.loadContactos(1);
  }

  toggleVerContacto(contactoId: number) {
    this.contactoAbiertoId = this.contactoAbiertoId === contactoId ? null : contactoId;
  }

  isContactoAbierto(contactoId: number): boolean {
    return this.contactoAbiertoId === contactoId;
  }
}
