import { Component, OnInit } from '@angular/core';
import { ContactosService } from '../../../../services/contactos.service';
import { Contacto } from '../../../../models/contacto.model';
import { ServiciosService } from '../../../../services/servicios.service';
import { Servicio } from '../../../../models/servicio.model';

@Component({
  selector: 'app-admin-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  contactos: Contacto[] = [];
  servicios: Servicio[] = [];
  pagination: any = {};
  buscar: string = '';
  filtroServicio: number | null = null;
  contactoAbiertoId: number | null = null;

  constructor(
    private contactosService: ContactosService,
    private serviciosService: ServiciosService
  ) { }

  ngOnInit(): void {
    this.serviciosService.getServiciosWeb().subscribe(data => {
      this.servicios = data;
    });

    this.loadContactos();
  }

  loadContactos(page: number = 1) {
    this.contactosService.getContactos(this.buscar,
      'desc',
      page,
      this.filtroServicio ?? undefined
    ).subscribe(res => {
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
