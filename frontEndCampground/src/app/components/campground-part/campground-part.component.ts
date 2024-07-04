import { Component, OnInit } from '@angular/core';
import { campground } from '../../../models/campground';
import {CampgroundState} from '../../store/campground/campground.reduce'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
@Component({
  selector: 'app-campground-part',
  templateUrl: './campground-part.component.html',
  styleUrl: './campground-part.component.scss'
})
export class CampgroundPartComponent implements OnInit{
campground: campground | null=null;
  constructor(private store:Store<AppState>){

  }
  ngOnInit(): void {
    this.store.subscribe(x=>{
      this.campground=x.campgrounds.selectCampground;
      console.log(this.campground);
    });
  }
}
