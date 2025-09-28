import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MenusComponent } from './pages/menus/menus.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,  // layout principal
    children: [
      { path: 'menus', component: MenusComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'contacto', component: ContactoComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
