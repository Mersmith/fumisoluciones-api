import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLayoutComponent } from './web-layout/web-layout.component';
import { WebHeaderComponent } from './web-header/web-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    WebLayoutComponent,
    WebHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    WebLayoutComponent,
    WebHeaderComponent
  ]
})
export class WebLayoutModule { }
