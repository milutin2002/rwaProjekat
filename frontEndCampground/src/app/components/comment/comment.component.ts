import { Component, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import * as CommentActions from '../../store/comment/comment.action';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  constructor(private store:Store<AppState>){}
setRating(rate: number) {
    this.rating=rate;
}
onSubmit() {
  this.store.dispatch(CommentActions.addComment({comment:{campgroundId:this.campgroundId,content:this.content,rating:this.rating}}));
}
@Input()campgroundId:number=0;
content:string= '';
rating:number=0;
faStar = faStar;
}
