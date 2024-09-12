import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModalContactComponent } from './update-modal-contact.component';

describe('UpdateModalContactComponent', () => {
  let component: UpdateModalContactComponent;
  let fixture: ComponentFixture<UpdateModalContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateModalContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateModalContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
