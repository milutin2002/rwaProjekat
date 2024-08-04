import { Injectable } from "@angular/core";
import { createEffect,Actions, ofType } from "@ngrx/effects";
import * as CommentActions from './comment.action';
import { CommentService } from "../../../service/comment.service";
import { map, mergeMap } from "rxjs";

@Injectable()
export class CommentEffects{
    constructor(private  actions$:Actions,private commentService:CommentService){}
    addComment=createEffect(()=>this.actions$.pipe(ofType(CommentActions.addComment),mergeMap((d)=>this.commentService.postComment(d.comment).pipe(map(comment=>CommentActions.addCommentSuccess({comment:comment}))))));
    updateComment=createEffect(()=>this.actions$.pipe(ofType(CommentActions.updateComment),mergeMap((d)=>this.commentService.updateComment(d.comment).pipe(map(c=>CommentActions.updateCommentSuccess({comment:c}))))));
    deleteComment=createEffect(()=>this.actions$.pipe(ofType(CommentActions.deleteComment),mergeMap((d)=>this.commentService.deleteComment(d.id).pipe(map(d=>CommentActions.deleteCommentSuccess({id:d}))))));
}