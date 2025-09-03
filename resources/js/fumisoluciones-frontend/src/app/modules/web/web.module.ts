import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { WebLayoutModule } from './layout/web-layout.module'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SliderPrincipalComponent } from './components/slider-principal/slider-principal.component';
import { OfrecemosComponent } from './components/ofrecemos/ofrecemos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { SliderClientesComponent } from './components/slider-clientes/slider-clientes.component'; // ✅ agregar esto

@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    ContactoComponent,
    SliderPrincipalComponent,
    OfrecemosComponent,
    ServiciosComponent,
    SliderClientesComponent,
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
