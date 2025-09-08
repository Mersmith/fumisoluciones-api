import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-componente-slider-clientes',
  templateUrl: './componente-slider-clientes.component.html',
  styleUrls: ['./componente-slider-clientes.component.css']
})
export class ComponenteSliderClientesComponent implements OnInit {
  clientes = [
    { logo: 'http://127.0.0.1:8000/imagenes/clientes/clientes-1.jpg', nombre: 'Fumisoluciones' },
    { logo: 'http://127.0.0.1:8000/imagenes/clientes/clientes-2.jpg', nombre: 'Fumisoluciones' },
    { logo: 'http://127.0.0.1:8000/imagenes/clientes/clientes-3.jpg', nombre: 'Fumisoluciones' },
    { logo: 'http://127.0.0.1:8000/imagenes/clientes/clientes-4.jpg', nombre: 'Fumisoluciones' },
    { logo: 'http://127.0.0.1:8000/imagenes/clientes/clientes-5.jpg', nombre: 'Fumisoluciones' },
    { logo: 'http://127.0.0.1:8000/imagenes/clientes/clientes-6.jpg', nombre: 'Fumisoluciones' },
    { logo: 'http://127.0.0.1:8000/imagenes/clientes/clientes-7.jpg', nombre: 'Fumisoluciones' },
    { logo: 'http://127.0.0.1:8000/imagenes/clientes/clientes-8.jpg', nombre: 'Fumisoluciones' },
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
    this.visibleSlides = window.innerWidth <= 600 ? 2 : 4;
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
