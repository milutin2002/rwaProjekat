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
}