import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModalLeadComponent } from './update-modal-lead.component';

describe('UpdateModalLeadComponent', () => {
  let component: UpdateModalLeadComponent;
  let fixture: ComponentFixture<UpdateModalLeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateModalLeadComponent]
    });
    fixture = TestBed.createComponent(UpdateModalLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
