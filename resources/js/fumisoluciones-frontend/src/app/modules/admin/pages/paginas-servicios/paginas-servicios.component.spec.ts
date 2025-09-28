import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginasServiciosComponent } from './paginas-servicios.component';

describe('PaginasServiciosComponent', () => {
  let component: PaginasServiciosComponent;
  let fixture: ComponentFixture<PaginasServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginasServiciosComponent]
    });
    fixture = TestBed.createComponent(PaginasServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
