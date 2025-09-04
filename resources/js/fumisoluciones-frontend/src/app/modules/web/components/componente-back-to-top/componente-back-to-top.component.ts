import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-componente-back-to-top',
  templateUrl: './componente-back-to-top.component.html',
  styleUrls: ['./componente-back-to-top.component.css']
})
export class ComponenteBackToTopComponent {
  isVisible = false;

  // Detecta el scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = window.scrollY > 200; // aparece después de 200px
  }

  // Vuelve al top
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
