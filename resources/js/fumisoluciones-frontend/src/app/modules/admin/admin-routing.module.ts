import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MenusComponent } from './pages/menus/menus.component';
import { PaginasComponent } from './pages/paginas/paginas.component';
import { MenuPaginasComponent } from './pages/menu-paginas/menu-paginas.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PaginasServiciosComponent } from './pages/paginas-servicios/paginas-servicios.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,  // layout principal
    children: [
      { path: 'menus', component: MenusComponent },
      { path: 'paginas', component: PaginasComponent },
      { path: 'menu-paginas', component: MenuPaginasComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'servicios', component: ServiciosComponent },
      { path: 'paginas-servicios', component: PaginasServiciosComponent },
      { path: 'contacto', component: ContactoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
