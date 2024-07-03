import { Component } from '@angular/core';
import { CampgroundService } from '../../../service/campground.service';
import { campground } from '../../../models/campground';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-campgrounds-posts',
  templateUrl: './campgrounds-posts.component.html',
  styleUrl: './campgrounds-posts.component.scss'
})
export class CampgroundsPostsComponent {
  campgrounds$:Observable<campground[]>=of([]);
  constructor(private service:CampgroundService){
    this.campgrounds$=service.getCampgrounds();
  }
  selectCampground(campground:campground){
    console.log(campground);
  }
}
