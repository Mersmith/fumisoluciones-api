import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteCallToActionComponent } from './componente-call-to-action.component';

describe('ComponenteCallToActionComponent', () => {
  let component: ComponenteCallToActionComponent;
  let fixture: ComponentFixture<ComponenteCallToActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteCallToActionComponent]
    });
    fixture = TestBed.createComponent(ComponenteCallToActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
