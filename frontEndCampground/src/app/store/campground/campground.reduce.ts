import {createReducer,on} from '@ngrx/store';
import { campground } from '../../../models/campground';
import * as Actions from './campground.action';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface CampgroundState{
    campgrounds:campground[],
    selectCampground:number
};
export const initialState:CampgroundState={
    campgrounds:[],
    selectCampground:0
};
export const campgroundReducer=createReducer(initialState,on(Actions.selectCampgrounds,(state,{campgroundId})=>{
    return {
        ...state,
        selectCampground:campgroundId
    }
}))