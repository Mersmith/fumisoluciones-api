import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteWhatsappButtonComponent } from './componente-whatsapp-button.component';

describe('ComponenteWhatsappButtonComponent', () => {
  let component: ComponenteWhatsappButtonComponent;
  let fixture: ComponentFixture<ComponenteWhatsappButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteWhatsappButtonComponent]
    });
    fixture = TestBed.createComponent(ComponenteWhatsappButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
