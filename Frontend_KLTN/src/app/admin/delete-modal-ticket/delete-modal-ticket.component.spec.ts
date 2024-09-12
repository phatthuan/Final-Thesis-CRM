import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalTicketComponent } from './delete-modal-ticket.component';

describe('DeleteModalTicketComponent', () => {
  let component: DeleteModalTicketComponent;
  let fixture: ComponentFixture<DeleteModalTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteModalTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
