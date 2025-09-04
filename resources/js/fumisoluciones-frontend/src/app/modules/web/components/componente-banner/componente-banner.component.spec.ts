import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteBannerComponent } from './componente-banner.component';

describe('ComponenteBannerComponent', () => {
  let component: ComponenteBannerComponent;
  let fixture: ComponentFixture<ComponenteBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponenteBannerComponent]
    });
    fixture = TestBed.createComponent(ComponenteBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
