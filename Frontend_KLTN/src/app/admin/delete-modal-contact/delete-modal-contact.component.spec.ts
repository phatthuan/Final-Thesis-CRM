import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalContactComponent } from './delete-modal-contact.component';

describe('DeleteModalContactComponent', () => {
  let component: DeleteModalContactComponent;
  let fixture: ComponentFixture<DeleteModalContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModalContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteModalContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
