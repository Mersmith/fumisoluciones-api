import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slider-principal',
  templateUrl: './slider-principal.component.html',
  styleUrls: ['./slider-principal.component.css']
})
export class SliderPrincipalComponent implements OnInit, OnDestroy {
  slides = [
    {
      image: 'https://www.centromedicoosi.com/wp-content/uploads/2024/08/Banner-OSI-Home--2048x640.jpg',
      title: 'Muévete sin dolor y vive mejor',
      descripcion: 'Nuestros tratamientos combinan diversas especialidades para una mejor y más rápida recuperación.',
      nombre_link: 'Reserva',
      link: '#',
    },
    /*{
      image: 'https://www.centromedicoosi.com/wp-content/uploads/2024/08/Banner-OSI-Home--2048x640.jpg',
      title: 'Sana colita de rana.',
      descripcion: 'Nuestros tratamientos combinan diversas especialidades para una mejor y más rápida recuperación.',
      nombre_link: 'Más informes',
      link: '#',
    },*/
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
