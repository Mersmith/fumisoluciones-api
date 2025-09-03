import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { RouterModule } from '@angular/router'; // <-- IMPORTAR

@NgModule({
  declarations: [AdminLayoutComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AdminLayoutComponent,
    AdminHeaderComponent
  ]
})
export class AdminLayoutModule { }
