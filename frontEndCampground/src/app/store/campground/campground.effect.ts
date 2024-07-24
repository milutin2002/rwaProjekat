import { Injectable } from "@angular/core";
import { createEffect,Actions, ofType } from "@ngrx/effects";
import * as CampgroundActions from './campground.action';
import { map, mergeMap } from "rxjs";
import { CampgroundService } from "../../../service/campground.service";
@Injectable()
export class CampgroundEffects{
    constructor(private actions$:Actions,private campgroundService:CampgroundService){

    }
    loadCampgrounds=createEffect(()=>this.actions$.pipe(ofType(CampgroundActions.loadCampgrounds),mergeMap(()=>this.campgroundService.getCampgrounds().pipe(map((camps)=>CampgroundActions.loadCampgroundsSuccess({campgrounds:camps}))))))
    addCampground=createEffect(()=>this.actions$.pipe(ofType(CampgroundActions.addCampground),mergeMap((d)=>this.campgroundService.addCampground(d.formData).pipe(map((camp)=>CampgroundActions.addCampgroundSuccess({campground:camp}))))))
    deleteCampground=createEffect(()=>this.actions$.pipe(ofType(CampgroundActions.deleteCampground),mergeMap((d)=>this.campgroundService.deleteCampground(d.id).pipe(map(id=>CampgroundActions.deleteCampgroundSuccess({id:id}))))))
    updateCampground=createEffect(()=>this.actions$.pipe(ofType(CampgroundActions.updateCampground),mergeMap(d=>this.campgroundService.updateCampground(d.formData).pipe(map(camp=>CampgroundActions.updateCampgroundSuccess({campground:camp}))))))
}