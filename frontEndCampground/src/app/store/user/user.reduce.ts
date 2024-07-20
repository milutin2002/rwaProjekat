import {createReducer,on} from '@ngrx/store';
import { campground } from '../../../models/campground';
import * as Actions from './user.action';
import { Action } from 'rxjs/internal/scheduler/Action';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { user } from '../../../models/user';

export interface UserState{
    user:user | null
}
export const initialState:UserState={user:null}
export const userReducer=createReducer(initialState,on(Actions.loadUserSuccess,(state,{user})=>{
    return {
        ...state,
        user:user
    }
}));