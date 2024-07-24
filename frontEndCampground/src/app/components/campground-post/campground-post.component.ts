import { Component, EventEmitter, Input, Output } from '@angular/core';
import { campground } from '../../../models/campground';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { deleteCampground, selectCampgrounds } from '../../store/campground/campground.action';
import { selectCampgroundObject } from '../../store/campground/campground.selection';
import { MatDialog } from '@angular/material/dialog';
import { EditAddCampgroundComponent } from '../edit-add-campground/edit-add-campground.component';

@Component({
  selector: 'app-campground-post',
  templateUrl: './campground-post.component.html',
  styleUrl: './campground-post.component.scss'
})
export class CampgroundPostComponent {
updateCampground() {
    this.dialog.open(EditAddCampgroundComponent,{data:{...this.campground}});
}
deleteCampground(id:number) {
  this.store.dispatch(deleteCampground({id:id}));
}
  constructor(private store:Store<AppState>,private dialog: MatDialog){
    store.select(selectCampgroundObject).subscribe(b=>{
      if(b.deleted && this.campground){
        if(this.campground.id==b.deleted){
          this.campground=null;
        }
      }
    })
  }
@Input()campground: campground|null=null;
imageUrl:string="http://localhost:3000/";
  selectCampground(id:number | undefined){
    if(id){
      this.store.dispatch(selectCampgrounds({campground:id}));
    }
  }
}
