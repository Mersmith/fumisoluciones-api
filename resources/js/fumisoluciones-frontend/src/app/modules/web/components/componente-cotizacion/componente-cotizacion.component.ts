import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../../services/cotizacion.service';
import { Cotizacion } from '../../../../models/cotizacion.model';

@Component({
  selector: 'app-componente-cotizacion',
  templateUrl: './componente-cotizacion.component.html',
  styleUrls: ['./componente-cotizacion.component.css']
})
export class ComponenteCotizacionComponent implements OnInit {
  nuevaCotizacion: Cotizacion = {
    nombre: '',
    correo: '',
    telefono: '',
    detalle: '',
  };
  mostrar = false;

  constructor(
    private cotizacionService: CotizacionService
  ) { }

  ngOnInit(): void {
    // Abre después de 3 segundos
    setTimeout(() => {
      this.mostrar = true;

      // Cierra después de otros 3 segundos
      setTimeout(() => {
        this.mostrar = false;
      }, 3000);

    }, 3000);
  }

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
