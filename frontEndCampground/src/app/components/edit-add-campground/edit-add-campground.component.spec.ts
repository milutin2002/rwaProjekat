import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddCampgroundComponent } from './edit-add-campground.component';

describe('EditAddCampgroundComponent', () => {
  let component: EditAddCampgroundComponent;
  let fixture: ComponentFixture<EditAddCampgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAddCampgroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAddCampgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
