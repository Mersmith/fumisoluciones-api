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
    { imagen: 'http://127.0.0.1:8000/imagenes/servicio/servicio-11.jpg', categoria: 'Fumigación' },
    { imagen: 'http://127.0.0.1:8000/imagenes/servicio/servicio-12.jpg', categoria: 'Fumigación' },
    { imagen: 'http://127.0.0.1:8000/imagenes/servicio/servicio-13.jpg', categoria: 'Fumigación' },
    { imagen: 'http://127.0.0.1:8000/imagenes/servicio/servicio-14.jpg', categoria: 'Desinfección' },
    { imagen: 'http://127.0.0.1:8000/imagenes/servicio/servicio-15.jpg', categoria: 'Desinfección' },
    { imagen: 'http://127.0.0.1:8000/imagenes/servicio/servicio-16.jpg', categoria: 'Desinfección' },
    { imagen: 'http://127.0.0.1:8000/imagenes/servicio/servicio-17.jpg', categoria: 'Sanitización' },
    { imagen: 'http://127.0.0.1:8000/imagenes/servicio/servicio-18.jpg', categoria: 'Sanitización' },
    { imagen: 'http://127.0.0.1:8000/imagenes/servicio/servicio-19.jpg', categoria: 'Sanitización' },
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
