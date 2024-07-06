import { Component, OnInit } from '@angular/core';
import { campground } from '../../../models/campground';
import {CampgroundState} from '../../store/campground/campground.reduce'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectCampgrounds } from '../../store/campground/campground.action';
import { selectCampgroundObject } from '../../store/campground/campground.selection';
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
    this.store.select(selectCampgroundObject).subscribe(x=>{
      let c=x;
      console.log(c);
      if(c){
        this.campground=c;
      }
    });
  }
}
