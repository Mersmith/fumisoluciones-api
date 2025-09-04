import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-componente-banner',
  templateUrl: './componente-banner.component.html',
  styleUrls: ['./componente-banner.component.css']
})
export class ComponenteBannerComponent {
  @Input() titulo: string = 'Nosotros';   // valor por defecto
  @Input() imagenUrl: string = 'https://www.centromedicoosi.com/wp-content/uploads/2024/06/banner-nosotros-1-2048x352.jpg';
}
