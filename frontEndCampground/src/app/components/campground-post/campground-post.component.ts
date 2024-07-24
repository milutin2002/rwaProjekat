import { Component, EventEmitter, Input, Output } from '@angular/core';
import { campground } from '../../../models/campground';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { deleteCampground, selectCampgrounds } from '../../store/campground/campground.action';

@Component({
  selector: 'app-campground-post',
  templateUrl: './campground-post.component.html',
  styleUrl: './campground-post.component.scss'
})
export class CampgroundPostComponent {
deleteCampground(id:number) {
  this.store.dispatch(deleteCampground({id:id}));
}
  constructor(private store:Store<AppState>){}
@Input()campground: campground|null=null;
imageUrl:string="http://localhost:3000/";
  selectCampground(id:number | undefined){
    if(id){
      this.store.dispatch(selectCampgrounds({campground:id}));
    }
  }
}
