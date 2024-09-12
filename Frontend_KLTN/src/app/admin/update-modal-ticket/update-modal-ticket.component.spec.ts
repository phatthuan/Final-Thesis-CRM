import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModalTicketComponent } from './update-modal-ticket.component';

describe('UpdateModalTicketComponent', () => {
  let component: UpdateModalTicketComponent;
  let fixture: ComponentFixture<UpdateModalTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateModalTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateModalTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
