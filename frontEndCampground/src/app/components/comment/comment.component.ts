import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class CommentComponent implements OnChanges {
edit() {
  if(this.c){
    this.editMode=true;
    this.content=this.c.content;
    this.rating=this.c.rating;
  }
}
deleteComment(id:number) {
  this.store.dispatch(CommentActions.deleteComment({id:id}));
}
  editMode:boolean=false;
  c:comment | null=null;
  u:user | null=null;
  constructor(private store:Store<AppState>){
    this.editMode=false;
    this.store.select(selectCommentUserComment).subscribe(c=>{
      console.log("Doslo je do promene");
      console.log(c);
      this.c=c.userComment;
      this.u=c.user;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.editMode=false;
    this.content='';
      this.rating=0;
  }
setRating(rate: number) {
    this.rating=rate;
}
onSubmit() {
  if(!this.editMode){
    this.store.dispatch(CommentActions.addComment({comment:{campgroundId:this.campgroundId,content:this.content,rating:this.rating}}));
  }
  else{
    if(this.c){
      this.store.dispatch(CommentActions.updateComment({comment:{id:this.c.id,data:this.c.data,content:this.content,rating:this.rating,user:null,userId:this.c.userId}}));
      this.content='';
      this.rating=0;
      this.editMode=false;
    }
  }
}
@Input()campgroundId:number=0;
content:string= '';
rating:number=0;
faStar = faStar;
}
