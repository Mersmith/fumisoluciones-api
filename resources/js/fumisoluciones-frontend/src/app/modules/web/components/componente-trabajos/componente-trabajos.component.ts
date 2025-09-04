import { Component } from '@angular/core';

interface Trabajo {
  imagen: string;
  categoria: string;
}

@Component({
  selector: 'app-componente-trabajos',
  templateUrl: './componente-trabajos.component.html',
  styleUrls: ['./componente-trabajos.component.css']
})
export class ComponenteTrabajosComponent {
  trabajos: Trabajo[] = [
    { imagen: 'https://www.fumisolucionesac.com/assets/img/gallery/fumi-1.jpg', categoria: 'Fumigación' },
    { imagen: 'https://www.fumisolucionesac.com/assets/img/gallery/fumi-2.jpg', categoria: 'Fumigación' },
    { imagen: 'https://www.fumisolucionesac.com/assets/img/gallery/fumi-3.jpg', categoria: 'Fumigación' },
    { imagen: 'https://www.fumisolucionesac.com/assets/img/gallery/home-1.jpg', categoria: 'Desinfección' },
    { imagen: 'https://www.fumisolucionesac.com/assets/img/gallery/home-2.jpg', categoria: 'Desinfección' },
    { imagen: 'https://www.fumisolucionesac.com/assets/img/gallery/home-3.jpg', categoria: 'Desinfección' },
    { imagen: 'https://www.fumisolucionesac.com/assets/img/gallery/vacation-1.jpg', categoria: 'Sanitización' },
    { imagen: 'https://www.fumisolucionesac.com/assets/img/gallery/beach-2.jpg', categoria: 'Sanitización' },
    { imagen: 'https://www.fumisolucionesac.com/assets/img/gallery/beach-3.jpg', categoria: 'Sanitización' },
  ];

  categorias: string[] = [];
  selectedCategoria: string = 'Todos';

  constructor() {
    // Agregar "Todos" al inicio y luego las categorías únicas
    const cats = Array.from(new Set(this.trabajos.map(t => t.categoria)));
    this.categorias = ['Todos', ...cats];
  }

  // Cambiar categoría
  selectCategoria(cat: string) {
    this.selectedCategoria = cat;
  }

  // Filtrar trabajos por categoría o mostrar todos
  get trabajosFiltrados() {
    if (this.selectedCategoria === 'Todos') {
      return this.trabajos;
    }
    return this.trabajos.filter(t => t.categoria === this.selectedCategoria);
  }
}
