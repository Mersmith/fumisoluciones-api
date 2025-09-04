import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteSliderPrincipalComponent } from './componente-slider-principal.component';

describe('ComponenteSliderPrincipalComponent', () => {
  let component: ComponenteSliderPrincipalComponent;
  let fixture: ComponentFixture<ComponenteSliderPrincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteSliderPrincipalComponent]
    });
    fixture = TestBed.createComponent(ComponenteSliderPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
