import { TestBed } from '@angular/core/testing';

import { PaginaServiciosService } from './pagina-servicios.service';

describe('PaginaServiciosService', () => {
  let service: PaginaServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginaServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
