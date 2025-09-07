import { Component } from '@angular/core';
import { CotizacionService } from '../../services/cotizacion.service';
import { Cotizacion } from '../../../../models/cotizacion.model';

@Component({
  selector: 'app-componente-cotizacion',
  templateUrl: './componente-cotizacion.component.html',
  styleUrls: ['./componente-cotizacion.component.css']
})
export class ComponenteCotizacionComponent {
  nuevaCotizacion: Cotizacion = {
    nombre: '',
    correo: '',
    telefono: '',
    detalle: '',
  };

  constructor(
    private cotizacionService: CotizacionService
  ) { }

  guardarCotizacion() {

    this.cotizacionService.createCotizacion(this.nuevaCotizacion).subscribe({
      next: (res) => {
        console.log('Cotizacion creado:', res);

        const mensaje = `Hola, soy ${this.nuevaCotizacion.nombre}, quiero ${this.nuevaCotizacion.detalle}`;

        const numero = "51960335525";

        window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`, '_blank');
      },
      error: (err) => {
        console.error('Error al crear cotización:', err);
      }
    });
  }

}
