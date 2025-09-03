import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { WebLayoutModule } from './layout/web-layout.module'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ agregar esto

@NgModule({
  declarations: [
    InicioComponent,
    ProductosComponent,
    ContactoComponent,
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
