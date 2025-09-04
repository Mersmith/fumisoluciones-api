import { Component } from '@angular/core';

@Component({
  selector: 'app-componente-whatsapp-button',
  templateUrl: './componente-whatsapp-button.component.html',
  styleUrls: ['./componente-whatsapp-button.component.css']
})
export class ComponenteWhatsappButtonComponent {
  phoneNumber = '51987654321'; // 👈 tu número con código de país (ejemplo: Perú 51)
  message = 'Hola, quiero más información sobre sus servicios.';

  openWhatsApp() {
    const url = `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`;
    window.open(url, '_blank');
  }
}
