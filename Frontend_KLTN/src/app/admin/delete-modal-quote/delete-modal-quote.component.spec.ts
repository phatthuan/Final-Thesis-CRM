import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalQuoteComponent } from './delete-modal-quote.component';

describe('DeleteModalQuoteComponent', () => {
  let component: DeleteModalQuoteComponent;
  let fixture: ComponentFixture<DeleteModalQuoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteModalQuoteComponent]
    });
    fixture = TestBed.createComponent(DeleteModalQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
