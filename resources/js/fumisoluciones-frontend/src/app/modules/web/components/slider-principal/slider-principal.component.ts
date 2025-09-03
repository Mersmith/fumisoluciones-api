import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slider-principal',
  templateUrl: './slider-principal.component.html',
  styleUrls: ['./slider-principal.component.css']
})
export class SliderPrincipalComponent implements OnInit, OnDestroy {
  slides = [
    { image: 'https://www.fumisolucionesac.com/assets/img/slide/slide-1.jpg', title: 'Soluciones Integrales' },
    { image: 'https://www.fumisolucionesac.com/assets/img/slide/slide-2.jpg', title: 'Calidad y Confianza' },
    { image: 'https://www.fumisolucionesac.com/assets/img/slide/slide-3.jpg', title: 'Innovación y Servicio' },
  ];

  currentSlide = 0;
  autoSlideInterval: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval);
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // cambia cada 4s
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
