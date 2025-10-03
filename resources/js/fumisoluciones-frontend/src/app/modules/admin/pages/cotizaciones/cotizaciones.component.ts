import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../../../../services/cotizacion.service';
import { Cotizacion } from '../../../../models/cotizacion.model';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {
  cotizaciones: Cotizacion[] = [];
  pagination: any = {};
  buscar: string = '';
  cotizacionAbiertaId: number | null = null;

  constructor(private cotizacionService: CotizacionService) { }

  ngOnInit(): void {
    this.loadCotizaciones();
  }

  loadCotizaciones(page: number = 1) {
    this.cotizacionService.getCotizaciones(this.buscar, 'desc', page).subscribe(res => {
      this.cotizaciones = res.data;
      this.pagination = res;
    });
  }

  aplicarFiltros() {
    this.loadCotizaciones(1);
  }

  toggleVerCotizacion(cotizacionId: number) {
    this.cotizacionAbiertaId = this.cotizacionAbiertaId === cotizacionId ? null : cotizacionId;
  }

  isCotizacionAbierta(cotizacionId: number): boolean {
    return this.cotizacionAbiertaId === cotizacionId;
  }
}
