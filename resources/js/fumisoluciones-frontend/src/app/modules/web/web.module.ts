import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { WebLayoutModule } from './layout/web-layout.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ExperienciaComponent } from './pages/experiencia/experiencia.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ComponenteTrabajosComponent } from './components/componente-trabajos/componente-trabajos.component';
import { ComponenteCallToActionComponent } from './components/componente-call-to-action/componente-call-to-action.component';
import { ComponenteSliderPrincipalComponent } from './components/componente-slider-principal/componente-slider-principal.component';
import { ComponenteOfrecemosComponent } from './components/componente-ofrecemos/componente-ofrecemos.component';
import { ComponenteServiciosComponent } from './components/componente-servicios/componente-servicios.component';
import { ComponenteSliderClientesComponent } from './components/componente-slider-clientes/componente-slider-clientes.component';
import { ComponenteBannerComponent } from './components/componente-banner/componente-banner.component';
import { ComponenteMisionComponent } from './components/componente-mision/componente-mision.component';
import { PaginaSeguridadComponent } from './pages/pagina-seguridad/pagina-seguridad.component';
import { ComponenteCotizacionComponent } from './components/componente-cotizacion/componente-cotizacion.component';

@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    ContactoComponent,
    ServiciosComponent,
    NosotrosComponent,
    ExperienciaComponent,
    ProductoComponent,
    ComponenteTrabajosComponent,
    ComponenteCallToActionComponent,
    ComponenteSliderPrincipalComponent,
    ComponenteOfrecemosComponent,
    ComponenteServiciosComponent,
    ComponenteSliderClientesComponent,
    ComponenteBannerComponent,
    ComponenteMisionComponent,
    PaginaSeguridadComponent,
    ComponenteCotizacionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    WebRoutingModule,
    WebLayoutModule
  ]
})
export class WebModule { }
