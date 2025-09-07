import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteCotizacionComponent } from './componente-cotizacion.component';

describe('ComponenteCotizacionComponent', () => {
  let component: ComponenteCotizacionComponent;
  let fixture: ComponentFixture<ComponenteCotizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteCotizacionComponent]
    });
    fixture = TestBed.createComponent(ComponenteCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
