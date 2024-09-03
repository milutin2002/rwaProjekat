import { Component } from '@angular/core';
import { campground } from '../../models/campground';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {  selectCampgrounds } from '../../store/campground/campground.action';
import { selectCampgroundList } from '../../store/campground/campground.selection';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-campgrounds-posts',
  templateUrl: './campgrounds-posts.component.html',
  styleUrl: './campgrounds-posts.component.scss'
})
export class CampgroundsPostsComponent {
  campgrounds$:Observable<campground[]>=of([]);
  
  constructor(private store:Store<AppState>){
    this.campgrounds$=this.store.select(selectCampgroundList);
  }
  
  select(campgroundSelected:number){
    this.store.dispatch(selectCampgrounds({campground:campgroundSelected}));
  }
}
