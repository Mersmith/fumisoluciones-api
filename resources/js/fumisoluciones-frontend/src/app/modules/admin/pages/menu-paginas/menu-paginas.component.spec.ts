import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPaginasComponent } from './menu-paginas.component';

describe('MenuPaginasComponent', () => {
  let component: MenuPaginasComponent;
  let fixture: ComponentFixture<MenuPaginasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuPaginasComponent]
    });
    fixture = TestBed.createComponent(MenuPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
