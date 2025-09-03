import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLayoutComponent } from './web-layout/web-layout.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router'; // <-- IMPORTAR

@NgModule({
  declarations: [WebLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule // <-- AÑADIR
  ],
  exports: [
    WebLayoutComponent
  ]
})
export class WebLayoutModule { }
