import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCatalogComponent } from './service-catalog.component';

describe('ServiceCatalogComponent', () => {
  let component: ServiceCatalogComponent;
  let fixture: ComponentFixture<ServiceCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceCatalogComponent]
    });
    fixture = TestBed.createComponent(ServiceCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
