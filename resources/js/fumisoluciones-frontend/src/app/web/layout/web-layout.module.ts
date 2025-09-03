import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLayoutComponent } from './web-layout/web-layout.component';
import { WebHeaderComponent } from './web-header/web-header.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router'; // <-- IMPORTAR

@NgModule({
  declarations: [
    WebLayoutComponent,
    WebHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule // <-- AÑADIR
  ],
  exports: [
    WebLayoutComponent,
    WebHeaderComponent
  ]
})
export class WebLayoutModule { }
