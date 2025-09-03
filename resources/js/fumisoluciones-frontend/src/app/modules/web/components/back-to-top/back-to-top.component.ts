import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css']
})
export class BackToTopComponent {
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
