import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebHeaderComponent } from './header/web-header/web-header.component';
import { AdminHeaderComponent } from './header/admin-header/admin-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    WebHeaderComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    WebHeaderComponent,
    AdminHeaderComponent
  ]
})
export class SharedModule {}
