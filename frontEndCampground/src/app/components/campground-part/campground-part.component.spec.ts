import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampgroundPartComponent } from './campground-part.component';

describe('CampgroundPartComponent', () => {
  let component: CampgroundPartComponent;
  let fixture: ComponentFixture<CampgroundPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampgroundPartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CampgroundPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
