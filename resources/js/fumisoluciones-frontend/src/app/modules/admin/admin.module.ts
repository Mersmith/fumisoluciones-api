import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminLayoutModule } from './layout/admin-layout.module';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MenusComponent } from './pages/menus/menus.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { PaginasServiciosComponent } from './pages/paginas-servicios/paginas-servicios.component';
import { PaginasComponent } from './pages/paginas/paginas.component';
import { MenuPaginasComponent } from './pages/menu-paginas/menu-paginas.component';

@NgModule({
  declarations: [
    ProductosComponent,
    ContactoComponent,
    CategoriasComponent,
    MenusComponent,
    ServiciosComponent,
    PaginasServiciosComponent,
    PaginasComponent,
    MenuPaginasComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
