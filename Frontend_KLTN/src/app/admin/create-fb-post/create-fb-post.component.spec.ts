import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFbPostComponent } from './create-fb-post.component';

describe('CreateFbPostComponent', () => {
  let component: CreateFbPostComponent;
  let fixture: ComponentFixture<CreateFbPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFbPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateFbPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
