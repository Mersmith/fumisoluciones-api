import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteOfrecemosComponent } from './componente-ofrecemos.component';

describe('ComponenteOfrecemosComponent', () => {
  let component: ComponenteOfrecemosComponent;
  let fixture: ComponentFixture<ComponenteOfrecemosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteOfrecemosComponent]
    });
    fixture = TestBed.createComponent(ComponenteOfrecemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
