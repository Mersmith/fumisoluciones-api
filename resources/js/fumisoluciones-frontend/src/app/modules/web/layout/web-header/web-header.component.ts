import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../../../models/menu.model';
import { MenuService } from '../../../../services/menu.service';

@Component({
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.css']
})
export class WebHeaderComponent implements OnInit {
  menuOpen = false;
  menuItems: MenuItem[] = [];

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.getWebMenu().subscribe(res => {
      console.log(res);

      // Menús fijos al inicio
      const fixedMenusStart: MenuItem[] = [
        { children: [], label: 'Inicio', icon: 'fa-solid fa-house', route: '/' },
        { children: [], label: 'Nosotros', icon: 'fa-solid fa-user-group', route: '/nosotros' }
      ];

      // Menús fijos al final
      const fixedMenusEnd: MenuItem[] = [
        { children: [], label: 'Tienda', icon: 'fa-solid fa-box-open', route: '/productos' },
        { children: [], label: 'Contacto', icon: 'fa-solid fa-envelope', route: '/contacto' }
      ];

      // Concatenar: inicio + dinámicos + final
      this.menuItems = [...fixedMenusStart, ...res, ...fixedMenusEnd];

      console.log(this.menuItems);
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
