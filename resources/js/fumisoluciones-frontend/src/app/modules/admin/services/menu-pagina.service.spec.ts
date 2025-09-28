import { TestBed } from '@angular/core/testing';

import { MenuPaginaService } from './menu-pagina.service';

describe('MenuPaginaService', () => {
  let service: MenuPaginaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuPaginaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
