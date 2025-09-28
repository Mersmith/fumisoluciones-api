import { Component } from '@angular/core';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[]; // subniveles
}

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.css']
})
export class WebHeaderComponent {
  menuOpen = false;

  menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'fa-solid fa-house',
      route: '/'
    },
    {
      label: 'Nosotros',
      icon: 'fa-solid fa-user-group',
      route: '/nosotros'
    },
    {
      label: 'Saneamiento ambiental',
      icon: 'fa-solid fa-leaf',
      children: [
        {
          label: 'Fumigación',
          icon: 'fa-solid fa-bug',
          route: '/seguridad'
        },
        {
          label: 'Limpieza',
          icon: 'fa-solid fa-soap',
          route: '/seguridad'
        },
        {
          label: 'Desinsectación',
          icon: 'fa-solid fa-soap',
          route: '/seguridad'
        },
        {
          label: 'Desratización',
          icon: 'fa-solid fa-soap',
          route: '/seguridad'
        },
        {
          label: 'Desinfección',
          icon: 'fa-solid fa-soap',
          route: '/seguridad'
        },
        {
          label: 'Limpieza y Desinfección de Reservorios',
          icon: 'fa-solid fa-soap',
          route: '/seguridad'
        },
        {
          label: 'Planes Oparativos de Saneamiento',
          icon: 'fa-solid fa-soap',
          route: '/seguridad'
        },
        {
          label: 'Limpieza de ambientes',
          icon: 'fa-solid fa-soap',
          route: '/seguridad'
        }
      ]
    },
    {
      label: 'Extintores',
      icon: 'fa-solid fa-fire-extinguisher',
      children: [
        {
          label: 'Venta de extintores',
          icon: 'fa-solid fa-store',
          children: [
            {
              label: 'Extintores PQS',
              icon: 'fa-solid fa-fire',
              route: '/seguridad'
            },
            {
              label: 'Extintores CO₂',
              icon: 'fa-solid fa-wind',
              route: '/seguridad'
            },
            {
              label: 'Extintores Halotrón',
              icon: 'fa-solid fa-wind',
              route: '/seguridad'
            },
            {
              label: 'Extintores de Espuma',
              icon: 'fa-solid fa-wind',
              route: '/seguridad'
            },
            {
              label: 'Extintores Clase D',
              icon: 'fa-solid fa-wind',
              route: '/seguridad'
            },
            {
              label: 'Extintores Agua Prezurizada',
              icon: 'fa-solid fa-wind',
              route: '/seguridad'
            },
            {
              label: 'Extintores de Demineralizada',
              icon: 'fa-solid fa-wind',
              route: '/seguridad'
            },
            {
              label: 'Extintores Acetato de Potasio',
              icon: 'fa-solid fa-wind',
              route: '/seguridad'
            }
          ]
        },
        {
          label: 'Recarga de extintores',
          icon: 'fa-solid fa-rotate',
          route: '/seguridad'
        },
        {
          label: 'Mantenimientos de extintores',
          icon: 'fa-solid fa-rotate',
          route: '/seguridad'
        }
      ]
    },
    {
      label: 'Seguiridad',
      icon: 'fa-solid fa-shield-halved',
      route: '/seguridad'
    },
    {
      label: 'Servicios',
      icon: 'fa-solid fa-gears',
      route: '/servicios'
    },
    {
      label: 'Tienda',
      icon: 'fa-solid fa-box-open',
      route: '/productos'
    },
    {
      label: 'Contacto',
      icon: 'fa-solid fa-envelope',
      route: '/contacto'
    }
  ];


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
