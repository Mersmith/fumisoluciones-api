import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminLayoutModule } from './layout/admin-layout.module';


@NgModule({
  declarations: [
    ProductosComponent,
    ContactoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLayoutModule
  ]
})
export class AdminModule { }
