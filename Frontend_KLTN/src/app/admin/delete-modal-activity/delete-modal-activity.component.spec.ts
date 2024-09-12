import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalActivityComponent } from './delete-modal-activity.component';

describe('DeleteModalActivityComponent', () => {
  let component: DeleteModalActivityComponent;
  let fixture: ComponentFixture<DeleteModalActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteModalActivityComponent]
    });
    fixture = TestBed.createComponent(DeleteModalActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
