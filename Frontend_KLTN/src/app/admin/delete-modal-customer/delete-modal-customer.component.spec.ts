import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalCustomerComponent } from './delete-modal-customer.component';

describe('DeleteModalCustomerComponent', () => {
  let component: DeleteModalCustomerComponent;
  let fixture: ComponentFixture<DeleteModalCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteModalCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
