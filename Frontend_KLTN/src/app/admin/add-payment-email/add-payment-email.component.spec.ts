import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentEmailComponent } from './add-payment-email.component';

describe('AddPaymentEmailComponent', () => {
  let component: AddPaymentEmailComponent;
  let fixture: ComponentFixture<AddPaymentEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPaymentEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPaymentEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
