import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteSliderClientesComponent } from './componente-slider-clientes.component';

describe('ComponenteSliderClientesComponent', () => {
  let component: ComponenteSliderClientesComponent;
  let fixture: ComponentFixture<ComponenteSliderClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteSliderClientesComponent]
    });
    fixture = TestBed.createComponent(ComponenteSliderClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
