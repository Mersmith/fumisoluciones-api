import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SharedModule } from '../../shared/shared.module'; // IMPORTANTE
import { RouterModule } from '@angular/router'; // <-- IMPORTAR

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule // <-- AÑADIR
  ],
  exports: [
    AdminLayoutComponent
  ]
})
export class AdminLayoutModule { }
