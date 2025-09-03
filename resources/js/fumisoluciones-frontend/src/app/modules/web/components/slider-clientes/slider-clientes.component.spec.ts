import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderClientesComponent } from './slider-clientes.component';

describe('SliderClientesComponent', () => {
  let component: SliderClientesComponent;
  let fixture: ComponentFixture<SliderClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderClientesComponent]
    });
    fixture = TestBed.createComponent(SliderClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
