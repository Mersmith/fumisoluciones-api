import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteBackToTopComponent } from './componente-back-to-top.component';

describe('ComponenteBackToTopComponent', () => {
  let component: ComponenteBackToTopComponent;
  let fixture: ComponentFixture<ComponenteBackToTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteBackToTopComponent]
    });
    fixture = TestBed.createComponent(ComponenteBackToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
