import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosListComponent } from './servicios.component';

describe('ServiciosListComponent', () => {
  let component: ServiciosListComponent;
  let fixture: ComponentFixture<ServiciosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiciosListComponent]
    });
    fixture = TestBed.createComponent(ServiciosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
