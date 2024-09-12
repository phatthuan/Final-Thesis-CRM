import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertLeadToCustomerModalComponent } from './convert-lead-to-customer-modal.component';

describe('ConvertLeadToCustomerModalComponent', () => {
  let component: ConvertLeadToCustomerModalComponent;
  let fixture: ComponentFixture<ConvertLeadToCustomerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvertLeadToCustomerModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConvertLeadToCustomerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
