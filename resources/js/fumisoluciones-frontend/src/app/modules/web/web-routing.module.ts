import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLayoutComponent } from './layout/web-layout/web-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ExperienciaComponent } from './pages/experiencia/experiencia.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { PaginaSeguridadComponent } from './pages/pagina-seguridad/pagina-seguridad.component';

const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'experiencia', component: ExperienciaComponent },
      { path: 'servicios', component: ServiciosComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'producto/:id', component: ProductoComponent }, // 👈 detalle
      { path: 'contacto', component: ContactoComponent },
      { path: 'seguridad', component: PaginaSeguridadComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
