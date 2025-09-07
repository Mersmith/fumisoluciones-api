import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaSeguridadComponent } from './pagina-seguridad.component';

describe('PaginaSeguridadComponent', () => {
  let component: PaginaSeguridadComponent;
  let fixture: ComponentFixture<PaginaSeguridadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginaSeguridadComponent]
    });
    fixture = TestBed.createComponent(PaginaSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
