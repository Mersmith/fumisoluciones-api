import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteTrabajosComponent } from './componente-trabajos.component';

describe('ComponenteTrabajosComponent', () => {
  let component: ComponenteTrabajosComponent;
  let fixture: ComponentFixture<ComponenteTrabajosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteTrabajosComponent]
    });
    fixture = TestBed.createComponent(ComponenteTrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
