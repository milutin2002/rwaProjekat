import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import * as CommentActions from '../../store/comment/comment.action';
import { comment } from '../../models/comment';
import { selectCommentUserComment } from '../../store/comment/comment.selection';
import { user } from '../../models/user';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnChanges {
editMode:boolean=false;
c:comment | null=null;
u:user | null=null;
content:string= '';
rating:number=0;
faStar = faStar;
isLoggedIn:boolean=false;
@Input()campgroundId:number=0;

ngOnChanges(changes: SimpleChanges): void {
    this.editMode=false;
    this.content='';
      this.rating=0;
}

constructor(private store:Store<AppState>,private route:Router){
    this.editMode=false;
    this.store.select(selectCommentUserComment).subscribe(c=>{
      this.c=c.userComment;
      this.u=c.user;
      if(this.u){
        this.isLoggedIn=true;
      }
      else{
        this.isLoggedIn=false;
      }
    });
  }

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

setRating(rate: number) {
    this.rating=rate;
}

onSubmit() {
  if(!this.isLoggedIn){
      this.route.navigate(["/"]);
      return;
  }
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
}
