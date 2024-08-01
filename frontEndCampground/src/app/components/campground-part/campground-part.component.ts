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
campground: campground | undefined=undefined;
currentSlideIndex: number = 0;
prevImage() {
  if (this.campground?.images?.length) {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.campground.images.length) % this.campground.images.length;
  }
}

nextImage() {
  if (this.campground?.images.length) {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.campground.images.length;
  }
}
  constructor(private store:Store<AppState>){

  }
  ngOnInit(): void {
    this.store.select(selectCampgroundObject).subscribe(x=>{
      this.campground=x.selected;
    });
  }
}
