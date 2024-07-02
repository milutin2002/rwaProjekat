import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundsPostsComponent } from './campgrounds-posts.component';

describe('CampgroundsPostsComponent', () => {
  let component: CampgroundsPostsComponent;
  let fixture: ComponentFixture<CampgroundsPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampgroundsPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampgroundsPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
