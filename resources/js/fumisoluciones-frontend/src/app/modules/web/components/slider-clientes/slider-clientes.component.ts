import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-slider-clientes',
  templateUrl: './slider-clientes.component.html',
  styleUrls: ['./slider-clientes.component.css']
})
export class SliderClientesComponent implements OnInit {
  clientes = [
    { logo: 'https://www.fumisolucionesac.com/assets/img/recent-photos/recent-photos-1.jpg', nombre: 'Cliente 1' },
    { logo: 'https://www.fumisolucionesac.com/assets/img/recent-photos/recent-photos-2.jpg', nombre: 'Cliente 2' },
    { logo: 'https://www.fumisolucionesac.com/assets/img/recent-photos/recent-photos-3.jpg', nombre: 'Cliente 3' },
    { logo: 'https://www.fumisolucionesac.com/assets/img/recent-photos/recent-photos-4.jpg', nombre: 'Cliente 4' },
    { logo: 'https://www.fumisolucionesac.com/assets/img/recent-photos/recent-photos-5.jpg', nombre: 'Cliente 5' },
    { logo: 'https://www.fumisolucionesac.com/assets/img/recent-photos/recent-photos-6.jpg', nombre: 'Cliente 6' },
    { logo: 'https://www.fumisolucionesac.com/assets/img/recent-photos/recent-photos-7.jpg', nombre: 'Cliente 7' },
    { logo: 'https://www.fumisolucionesac.com/assets/img/recent-photos/recent-photos-8.jpg', nombre: 'Cliente 8' },
  ];

  loopClientes: any[] = [];
  currentIndex = 0;
  visibleSlides = 4; // default desktop
  slideWidth = 100 / this.visibleSlides;
  transitioning = true;

  ngOnInit(): void {
    this.updateVisibleSlides();

    // duplicamos al inicio y al final
    this.loopClientes = [
      ...this.clientes.slice(-this.visibleSlides),
      ...this.clientes,
      ...this.clientes.slice(0, this.visibleSlides)
    ];

    // arrancamos desde la primera posición real
    this.currentIndex = this.visibleSlides;

    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleSlides();
  }

  updateVisibleSlides() {
    this.visibleSlides = window.innerWidth <= 768 ? 2 : 4;
    this.slideWidth = 100 / this.visibleSlides;
  }

  nextSlide() {
    this.transitioning = true;
    this.currentIndex++;

    // cuando llega al final, resetea
    if (this.currentIndex >= this.clientes.length + this.visibleSlides) {
      setTimeout(() => {
        this.transitioning = false;
        this.currentIndex = this.visibleSlides;
      }, 500);
    }
  }

  prevSlide() {
    this.transitioning = true;
    this.currentIndex--;

    // cuando llega al inicio, resetea
    if (this.currentIndex < this.visibleSlides) {
      setTimeout(() => {
        this.transitioning = false;
        this.currentIndex = this.clientes.length + this.visibleSlides - 1;
      }, 500);
    }
  }
}
