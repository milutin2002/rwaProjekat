import { Component } from '@angular/core';
import { CampgroundService } from '../../../service/campground.service';
import { campground } from '../../../models/campground';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { CampgroundState } from '../../store/campground/campground.reduce';
import { loadCampgrounds, selectCampgrounds } from '../../store/campground/campground.action';
import { selectCampgroundList } from '../../store/campground/campground.selection';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-campgrounds-posts',
  templateUrl: './campgrounds-posts.component.html',
  styleUrl: './campgrounds-posts.component.scss'
})
export class CampgroundsPostsComponent {
  campgrounds$:Observable<campground[]>=of([]);
  constructor(private service:CampgroundService,private store:Store<AppState>){
    this.store.dispatch(loadCampgrounds());
    this.campgrounds$=this.store.select(selectCampgroundList);
  }
  select(campgroundSelected:number){
    console.log("Poslao sam id");
    console.log(campgroundSelected);
    this.store.dispatch(selectCampgrounds({campground:campgroundSelected}));
  }
}
