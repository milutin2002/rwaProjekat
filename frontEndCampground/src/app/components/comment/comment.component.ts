import { Component, Input } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import * as CommentActions from '../../store/comment/comment.action';
import { comment } from '../../../models/comment';
import { selectCommentUserComment } from '../../store/comment/comment.selection';
import { user } from '../../../models/user';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  c:comment | null=null;
  u:user | null=null;
  constructor(private store:Store<AppState>){
    this.store.select(selectCommentUserComment).subscribe(c=>{
      console.log("Doslo je do promene");
      this.c=c.userComment;
      this.u=c.user;
    });
  }
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
