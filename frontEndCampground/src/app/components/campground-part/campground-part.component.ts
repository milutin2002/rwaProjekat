import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { campground } from '../../models/campground';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectCampgrounds } from '../../store/campground/campground.action';
import { selectCampgroundObject } from '../../store/campground/campground.selection';
import { GoogleMapsService } from '../../service/google-maps.service';
@Component({
  selector: 'app-campground-part',
  templateUrl: './campground-part.component.html',
  styleUrl: './campground-part.component.scss'
})
export class CampgroundPartComponent implements OnInit{
campground: campground | undefined=undefined;
currentSlideIndex: number = 0;

constructor(private store:Store<AppState>,private googleMapService:GoogleMapsService){

}

ngOnInit(): void {
  this.store.select(selectCampgroundObject).subscribe(x=>{
    this.campground=x.selected;
    this.currentSlideIndex=0;
  });
  this.googleMapService.loadGoogleMaps();
}
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
  
  
}
