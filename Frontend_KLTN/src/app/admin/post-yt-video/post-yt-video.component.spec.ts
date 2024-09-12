import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostYtVideoComponent } from './post-yt-video.component';

describe('PostYtVideoComponent', () => {
  let component: PostYtVideoComponent;
  let fixture: ComponentFixture<PostYtVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostYtVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostYtVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
