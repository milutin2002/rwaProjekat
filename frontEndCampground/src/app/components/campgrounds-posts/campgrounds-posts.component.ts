import { Component } from '@angular/core';
import { CampgroundService } from '../../../service/campground.service';
import { campground } from '../../../models/campground';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { CampgroundState } from '../../store/campground/campground.reduce';
import { selectCampgrounds } from '../../store/campground/campground.action';

@Component({
  selector: 'app-campgrounds-posts',
  templateUrl: './campgrounds-posts.component.html',
  styleUrl: './campgrounds-posts.component.scss'
})
export class CampgroundsPostsComponent {
  campgrounds$:Observable<campground[]>=of([]);
  constructor(private service:CampgroundService,private store:Store<CampgroundState>){
    this.campgrounds$=service.getCampgrounds();
  }
  select(campgroundSelected:campground){
    console.log("Poslao sam id");
    console.log(campgroundSelected);
    this.store.dispatch(selectCampgrounds({campground:campgroundSelected}));
  }
}
