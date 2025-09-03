import { Component, OnInit } from '@angular/core';
import { ContactosService } from '../../../core/services/contactos.service';
import { ServiciosService } from '../../../core/services/servicios.service';
import { Contacto } from '../../../shared/models/contacto.model';
import { Servicio } from '../../../shared/models/servicio.model';

@Component({
  selector: 'app-web-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  nuevoContacto: Contacto = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    detalle: '',
    servicio_id: 0 // inicia vacío
  };

  servicios: Servicio[] = []; // lista dinámica

  constructor(
    private contactosService: ContactosService,
    private serviciosService: ServiciosService
  ) { }

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios() {
    this.serviciosService.getServicios().subscribe({
      next: (res) => {
        this.servicios = res;
      },
      error: (err) => console.error('Error al cargar servicios:', err)
    });
  }

  guardarContacto() {
    if (this.nuevoContacto.servicio_id === 0) {
      alert('Por favor selecciona un servicio válido.');
      return;
    }

    this.contactosService.createContacto(this.nuevoContacto).subscribe({
      next: (res) => {
        console.log('Contacto creado:', res);
      },
      error: (err) => {
        console.error('Error al crear contacto:', err);
      }
    });
  }
}
