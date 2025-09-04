import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLayoutComponent } from './web-layout/web-layout.component';
import { WebHeaderComponent } from './web-header/web-header.component';
import { RouterModule } from '@angular/router';
import { WebFooterComponent } from './web-footer/web-footer.component';
import { ComponenteBackToTopComponent } from '../components/componente-back-to-top/componente-back-to-top.component';
import { ComponenteWhatsappButtonComponent } from '../components/componente-whatsapp-button/componente-whatsapp-button.component';

@NgModule({
  declarations: [
    WebLayoutComponent,
    WebHeaderComponent,
    WebFooterComponent,
    ComponenteBackToTopComponent,
    ComponenteWhatsappButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    WebLayoutComponent,
    WebHeaderComponent,
    WebFooterComponent,
    ComponenteBackToTopComponent,
    ComponenteWhatsappButtonComponent,
  ]
})
export class WebLayoutModule { }
