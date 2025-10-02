import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../../services/servicios.service';
import { Servicio } from '../../../../models/servicio.model';

@Component({
  selector: 'app-componente-servicios',
  templateUrl: './componente-servicios.component.html',
  styleUrls: ['./componente-servicios.component.css']
})
export class ComponenteServiciosComponent implements OnInit {
  servicios: Servicio[] = [];

  constructor(private serviciosService: ServiciosService) { }

  ngOnInit(): void {
    this.serviciosService.getServicios().subscribe({
      next: (data) => this.servicios = data,
      error: (err) => console.error('Error al cargar servicios', err)
    });
  }

}
