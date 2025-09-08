import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-componente-slider-principal',
  templateUrl: './componente-slider-principal.component.html',
  styleUrls: ['./componente-slider-principal.component.css']
})
export class ComponenteSliderPrincipalComponent implements OnInit, OnDestroy {
  slides = [
    {
      image: 'http://127.0.0.1:8000/imagenes/slider/slider-1.jpg',
      title: 'Fumigación Profesional',
      descripcion: 'Eliminamos plagas de forma rápida y segura, cuidando tu salud y protegiendo tus espacios.',
      nombre_link: 'Reserva',
      link: '#',
    },
    {
      image: 'http://127.0.0.1:8000/imagenes/slider/slider-2.jpg',
      title: 'Venta y Recarga de Extintores',
      descripcion: 'Extintores certificados, recarga inmediata y mantenimiento confiable para tu seguridad.',
      nombre_link: 'Más informes',
      link: '#',
    },
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
