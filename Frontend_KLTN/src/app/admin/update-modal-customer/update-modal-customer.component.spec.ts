import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModalCustomerComponent } from './update-modal-customer.component';

describe('UpdateModalCustomerComponent', () => {
  let component: UpdateModalCustomerComponent;
  let fixture: ComponentFixture<UpdateModalCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateModalCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateModalCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
