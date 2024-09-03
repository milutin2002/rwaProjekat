import { Injectable } from "@angular/core";
import { createEffect,Actions, ofType } from "@ngrx/effects";
import * as CampgroundActions from './campground.action';
import { catchError, filter, map, mergeMap, of } from "rxjs";
import { CampgroundService } from "../../service/campground.service";
import {CommentService} from '../../service/comment.service';
import * as CommentActions from '../comment/comment.action';
@Injectable()
export class CampgroundEffects{
    constructor(private actions$:Actions,private campgroundService:CampgroundService,private commentService:CommentService){

    }
    loadCampgrounds=createEffect(()=>this.actions$.pipe(ofType(CampgroundActions.loadCampgrounds),mergeMap((a)=>this.campgroundService.getCampgrounds(a.admin,a.page,a.pageSize).pipe(map((camps)=>CampgroundActions.loadCampgroundsSuccess({campgrounds:camps}))))))
    addCampground=createEffect(()=>this.actions$.pipe(ofType(CampgroundActions.addCampground),mergeMap((d)=>this.campgroundService.addCampground(d.formData).pipe(map((camp)=>CampgroundActions.addCampgroundSuccess({campground:camp}))))))
    deleteCampground=createEffect(()=>this.actions$.pipe(ofType(CampgroundActions.deleteCampground),mergeMap((d)=>this.campgroundService.deleteCampground(d.id).pipe(map(id=>CampgroundActions.deleteCampgroundSuccess({id:id}))))))
    updateCampground=createEffect(()=>this.actions$.pipe(ofType(CampgroundActions.updateCampground),filter(d=>{
        return d.formData!=undefined;
    }),mergeMap((d)=>{
        return this.campgroundService.updateCampground(d.formData).pipe(map((camp)=>
            {
                return CampgroundActions.updateCampgroundSuccess({campground:camp})}),catchError(error => {
        return of(CampgroundActions.updateCampgroundFailure({ error }));
    }))})));
    selectCampground=createEffect(()=>this.actions$.pipe(ofType(CampgroundActions.selectCampgrounds),mergeMap((d)=>this.commentService.getComments(d.campground).pipe(map(r=>CommentActions.loadCommentsSuccess({comments:r.comments}))))))
}