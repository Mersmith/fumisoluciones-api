import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebLayoutComponent } from './web-layout/web-layout.component';
import { WebHeaderComponent } from './web-header/web-header.component';
import { RouterModule } from '@angular/router';
import { WebFooterComponent } from './web-footer/web-footer.component';
import { BackToTopComponent } from '../components/back-to-top/back-to-top.component';
import { WhatsappButtonComponent } from '../components/whatsapp-button/whatsapp-button.component';

@NgModule({
  declarations: [
    WebLayoutComponent,
    WebHeaderComponent,
    WebFooterComponent,
    BackToTopComponent,
    WhatsappButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    WebLayoutComponent,
    WebHeaderComponent,
    WebFooterComponent,
    BackToTopComponent,
    WhatsappButtonComponent,
  ]
})
export class WebLayoutModule { }
