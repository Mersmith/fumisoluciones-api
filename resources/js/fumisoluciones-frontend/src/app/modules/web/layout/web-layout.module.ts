import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLayoutComponent } from './web-layout/web-layout.component';
import { WebHeaderComponent } from './web-header/web-header.component';
import { RouterModule } from '@angular/router';
import { WebFooterComponent } from './web-footer/web-footer.component';

@NgModule({
  declarations: [
    WebLayoutComponent,
    WebHeaderComponent,
    WebFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    WebLayoutComponent,
    WebHeaderComponent,
    WebFooterComponent
  ]
})
export class WebLayoutModule { }
