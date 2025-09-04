import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteMisionComponent } from './componente-mision.component';

describe('ComponenteMisionComponent', () => {
  let component: ComponenteMisionComponent;
  let fixture: ComponentFixture<ComponenteMisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteMisionComponent]
    });
    fixture = TestBed.createComponent(ComponenteMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
