import { Injectable } from "@angular/core";
import { createEffect,Actions, ofType } from "@ngrx/effects";
import * as UserActions from './user.action';
import { map, mergeMap } from "rxjs";
import { UserService } from "../../service/user-service.service";
@Injectable()
export class UserEffects{
    constructor(private actions$:Actions,private userService:UserService){

    }
    loadUser=createEffect(()=>this.actions$.pipe(ofType(UserActions.loadUser),mergeMap(()=>this.userService.getProfile().pipe(map(user=>UserActions.loadUserSuccess({user:user}))))));
    updateUser=createEffect(()=>this.actions$.pipe(ofType(UserActions.updateUser),mergeMap((d)=>this.userService.updateProfile(d.data).pipe(map(user=>UserActions.loadUserSuccess({user:user}))))));
}