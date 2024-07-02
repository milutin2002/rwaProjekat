import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundPostComponent } from './campground-post.component';

describe('CampgroundPostComponent', () => {
  let component: CampgroundPostComponent;
  let fixture: ComponentFixture<CampgroundPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampgroundPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampgroundPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
