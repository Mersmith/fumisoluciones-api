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
            }
          ]
        },
        {
          label: 'Recarga de extintores',
          icon: 'fa-solid fa-rotate',
          route: '/seguridad'
        }
      ]
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
