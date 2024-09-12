import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModalQuoteComponent } from './update-modal-quote.component';

describe('UpdateModalQuoteComponent', () => {
  let component: UpdateModalQuoteComponent;
  let fixture: ComponentFixture<UpdateModalQuoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateModalQuoteComponent]
    });
    fixture = TestBed.createComponent(UpdateModalQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
