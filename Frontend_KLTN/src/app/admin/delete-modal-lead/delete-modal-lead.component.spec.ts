import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalLeadComponent } from './delete-modal-lead.component';

describe('DeleteModalLeadComponent', () => {
  let component: DeleteModalLeadComponent;
  let fixture: ComponentFixture<DeleteModalLeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteModalLeadComponent]
    });
    fixture = TestBed.createComponent(DeleteModalLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
