import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteServiciosComponent } from './componente-servicios.component';

describe('ComponenteServiciosComponent', () => {
  let component: ComponenteServiciosComponent;
  let fixture: ComponentFixture<ComponenteServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteServiciosComponent]
    });
    fixture = TestBed.createComponent(ComponenteServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
